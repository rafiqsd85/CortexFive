<?php
declare(strict_types=1);

require_once __DIR__ . '/config.php';

function db(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) return $pdo;

    $host = SS_DB_HOST;
    $port = SS_DB_PORT;
    $name = SS_DB_NAME;
    $user = SS_DB_USER;
    $pass = SS_DB_PASSWORD;
    if (!preg_match('/^[A-Za-z0-9_]+$/', $name)) throw new RuntimeException('SS_DB_NAME must contain only letters, numbers and underscores.');
    if (!preg_match('/^[0-9]+$/', (string)$port)) throw new RuntimeException('SS_DB_PORT must be numeric.');
    $dsn = "mysql:host={$host};port={$port};dbname={$name};charset=utf8mb4";
    $options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, PDO::ATTR_EMULATE_PREPARES => false];
    try {
        $pdo = new PDO($dsn, $user, $pass, $options);
    } catch (PDOException $e) {
        throw new RuntimeException("Could not connect to MySQL database '{$name}' on {$host}. Import database/scholarship_db.sql in phpMyAdmin (or local MySQL) and check includes/config.php.", 0, $e);
    }
    ensure_app_tables($pdo);
    return $pdo;
}

function run_sql_dump(PDO $pdo, string $sql): void
{
    $statement = '';
    $quote = '';
    $lineComment = false;
    $blockComment = false;
    $length = strlen($sql);
    for ($i = 0; $i < $length; $i++) {
        $ch = $sql[$i];
        $next = $i + 1 < $length ? $sql[$i + 1] : '';
        if ($lineComment) {
            if ($ch === "\n") { $lineComment = false; $statement .= "\n"; }
            continue;
        }
        if ($blockComment) {
            if ($ch === '*' && $next === '/') { $blockComment = false; $statement .= ' '; $i++; }
            continue;
        }
        if ($quote !== '') {
            $statement .= $ch;
            if ($ch === '\\' && $next !== '') { $statement .= $next; $i++; continue; }
            if ($ch === $quote) {
                if ($next === $quote) { $statement .= $next; $i++; }
                else $quote = '';
            }
            continue;
        }
        if ($ch === '/' && $next === '*') { $blockComment = true; $i++; continue; }
        if ($ch === '#' || ($ch === '-' && $next === '-' && ($i + 2 >= $length || ctype_space($sql[$i + 2])))) { $lineComment = true; if ($ch === '-') $i++; continue; }
        if ($ch === "'" || $ch === '"' || $ch === '`') { $quote = $ch; $statement .= $ch; continue; }
        if ($ch === ';') {
            if (trim($statement) !== '') $pdo->exec(trim($statement));
            $statement = '';
            continue;
        }
        $statement .= $ch;
    }
    if (trim($statement) !== '') $pdo->exec(trim($statement));
}

function ensure_app_tables(PDO $pdo): void
{
    static $ready = false;
    if ($ready) return;
    try { $pdo->query('SELECT 1 FROM scholarships LIMIT 1'); }
    catch (Throwable $e) {
        $dump = __DIR__ . '/../database/scholarship_db.sql';
        $sql = is_file($dump) ? file_get_contents($dump) : false;
        if (!is_string($sql) || $sql === '') {
            throw new RuntimeException('Scholarship data is not installed. Import database/scholarship_db.sql into your MySQL database in phpMyAdmin.', 0, $e);
        }
        try {
            run_sql_dump($pdo, $sql);
            $pdo->query('SELECT 1 FROM scholarships LIMIT 1');
        } catch (Throwable $importError) {
            throw new RuntimeException('Could not install the supplied scholarship data automatically. Import database/scholarship_db.sql into your MySQL database in phpMyAdmin.', 0, $importError);
        }
    }
    $pdo->exec("CREATE TABLE IF NOT EXISTS app_users (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      username VARCHAR(80) NOT NULL,
      email VARCHAR(190) NULL,
      display_name VARCHAR(120) NOT NULL,
      role ENUM('student','advisor') NOT NULL DEFAULT 'student',
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id), UNIQUE KEY uq_app_users_username (username), UNIQUE KEY uq_app_users_email (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    if (!$pdo->query("SHOW COLUMNS FROM app_users LIKE 'email'")->fetch()) {
        $pdo->exec('ALTER TABLE app_users ADD COLUMN email VARCHAR(190) NULL AFTER username');
    }
    if (!$pdo->query("SHOW INDEX FROM app_users WHERE Key_name = 'uq_app_users_email'")->fetch()) {
        $pdo->exec('CREATE UNIQUE INDEX uq_app_users_email ON app_users (email)');
    }
    $pdo->exec("CREATE TABLE IF NOT EXISTS password_reset_tokens (
      token_hash CHAR(64) NOT NULL,
      user_id INT UNSIGNED NOT NULL,
      expires_at DATETIME NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (token_hash), KEY idx_password_reset_user (user_id), KEY idx_password_reset_expiry (expires_at),
      CONSTRAINT fk_password_reset_user FOREIGN KEY (user_id) REFERENCES app_users (id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    $pdo->exec("CREATE TABLE IF NOT EXISTS bookmarks (
      user_id INT UNSIGNED NOT NULL,
      scholarship_id INT(11) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (user_id, scholarship_id), KEY idx_bookmarks_scholarship (scholarship_id),
      CONSTRAINT fk_bookmarks_user FOREIGN KEY (user_id) REFERENCES app_users (id) ON DELETE CASCADE,
      CONSTRAINT fk_bookmarks_scholarship FOREIGN KEY (scholarship_id) REFERENCES scholarships (id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    $exists = $pdo->prepare('SELECT 1 FROM app_users WHERE username = ? LIMIT 1');
    $seed = $pdo->prepare('INSERT IGNORE INTO app_users (username, display_name, role, password_hash) VALUES (?, ?, ?, ?)');
    foreach ([['student', 'Amina Rahman', 'student', 'student123'], ['student2', 'Nadia Islam', 'student', 'student2123']] as [$username, $name, $role, $password]) {
        $exists->execute([$username]);
        if (!$exists->fetchColumn()) $seed->execute([$username, $name, $role, password_hash($password, PASSWORD_DEFAULT)]);
    }
    $ready = true;
}
