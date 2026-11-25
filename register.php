<?php
declare(strict_types=1);
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/db.php';

if (current_user()) { header('Location: dashboard.php'); exit; }
$page = 'register';
$pageTitle = 'Create your student account · ScholarSearch';
$pageDesc = 'Create a ScholarSearch student account to save and compare scholarships.';
$error = '';
$values = ['display_name' => '', 'username' => '', 'email' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    foreach ($values as $key => $_) $values[$key] = trim((string)($_POST[$key] ?? ''));
    $password = (string)($_POST['password'] ?? '');
    $confirm = (string)($_POST['confirm_password'] ?? '');
    $nameLength = preg_match_all('/./us', $values['display_name']);

    if (!verify_csrf($_POST['csrf_token'] ?? null)) {
        $error = 'Your form expired. Please try again.';
    } elseif ($nameLength === false || $nameLength < 2 || $nameLength > 120) {
        $error = 'Enter your name (2 to 120 characters).';
    } elseif (!preg_match('/^[A-Za-z0-9_.-]{3,32}$/', $values['username'])) {
        $error = 'Choose a username with 3–32 letters, numbers, dots, hyphens or underscores.';
    } elseif (!filter_var($values['email'], FILTER_VALIDATE_EMAIL) || strlen($values['email']) > 190) {
        $error = 'Enter a valid email address.';
    } elseif (strlen($password) < 10 || strlen($password) > 1024) {
        $error = 'Your password must be at least 10 characters long.';
    } elseif (!hash_equals($password, $confirm)) {
        $error = 'The passwords do not match.';
    } else {
        try {
            $pdo = db();
            $exists = $pdo->prepare('SELECT 1 FROM app_users WHERE username = ? OR email = ? LIMIT 1');
            $exists->execute([$values['username'], $values['email']]);
            if ($exists->fetchColumn()) {
                $error = 'That username or email is already registered.';
            } else {
                $insert = $pdo->prepare('INSERT INTO app_users (username, email, display_name, role, password_hash) VALUES (?, ?, ?, ?, ?)');
                $insert->execute([$values['username'], strtolower($values['email']), $values['display_name'], 'student', password_hash($password, PASSWORD_DEFAULT)]);
                sign_in_user([
                    'id' => (int)$pdo->lastInsertId(),
                    'username' => $values['username'],
                    'display_name' => $values['display_name'],
                    'role' => 'student',
                ]);
                header('Location: dashboard.php'); exit;
            }
        } catch (PDOException $e) {
            if ((string)$e->getCode() === '23000') $error = 'That username or email is already registered.';
            else $error = 'We could not create your account. Check that MySQL is running and try again.';
        } catch (Throwable $e) {
            $error = 'We could not create your account. Check that MySQL is running and try again.';
        }
    }
}

require __DIR__ . '/includes/header.php';
?>
<main class="account-flow-page">
  <section class="account-flow-card">
    <p class="account-flow-kicker">SCHOLARSEARCH FOR STUDENTS</p>
    <h1>Create your account</h1>
    <p>Save scholarships, compare opportunities, and keep your next steps together.</p>
    <?php if ($error): ?><div class="account-flow-alert" role="alert"><?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?></div><?php endif; ?>
    <form class="account-flow-form" method="post" autocomplete="on">
      <input type="hidden" name="csrf_token" value="<?= htmlspecialchars(csrf_token(), ENT_QUOTES, 'UTF-8') ?>">
      <label for="display_name">Full name</label>
      <input id="display_name" name="display_name" value="<?= htmlspecialchars($values['display_name'], ENT_QUOTES, 'UTF-8') ?>" autocomplete="name" maxlength="120" required>
      <label for="username">Username</label>
      <input id="username" name="username" value="<?= htmlspecialchars($values['username'], ENT_QUOTES, 'UTF-8') ?>" autocomplete="username" minlength="3" maxlength="32" pattern="[A-Za-z0-9_.-]+" required>
      <small>Use 3–32 letters, numbers, dots, hyphens or underscores.</small>
      <label for="email">Email address</label>
      <input id="email" name="email" type="email" value="<?= htmlspecialchars($values['email'], ENT_QUOTES, 'UTF-8') ?>" autocomplete="email" maxlength="190" required>
      <label for="password">Password</label>
      <input id="password" name="password" type="password" autocomplete="new-password" minlength="10" required>
      <small>Choose at least 10 characters.</small>
      <label for="confirm_password">Confirm password</label>
      <input id="confirm_password" name="confirm_password" type="password" autocomplete="new-password" minlength="10" required>
      <button type="submit">Create student account <span aria-hidden="true">→</span></button>
    </form>
    <div class="account-flow-links"><a href="login.php">Already have an account? Sign in</a><a href="forgot-password.php">Forgot password?</a></div>
  </section>
</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
