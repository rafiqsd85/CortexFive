<?php
declare(strict_types=1);
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/db.php';

$page = 'reset';
$pageTitle = 'Choose a new password · ScholarSearch';
$pageDesc = 'Choose a new password for your ScholarSearch account.';
$token = trim((string)($_POST['token'] ?? $_GET['token'] ?? ''));
$error = '';
$success = '';
$validToken = preg_match('/^[a-f0-9]{64}$/i', $token) === 1;
if ($_SERVER['REQUEST_METHOD'] !== 'POST' && $validToken) {
    try {
        $check = db()->prepare('SELECT 1 FROM password_reset_tokens WHERE token_hash = ? AND expires_at > UTC_TIMESTAMP() LIMIT 1');
        $check->execute([hash('sha256', $token)]);
        $validToken = (bool)$check->fetchColumn();
    } catch (Throwable $e) {
        $validToken = false;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $password = (string)($_POST['password'] ?? '');
    $confirm = (string)($_POST['confirm_password'] ?? '');
    if (!verify_csrf($_POST['csrf_token'] ?? null)) {
        $error = 'Your form expired. Please try again.';
    } elseif (!$validToken) {
        $error = 'This reset link is invalid or has expired. Request a new link to continue.';
    } elseif (strlen($password) < 10 || strlen($password) > 1024) {
        $error = 'Your password must be at least 10 characters long.';
    } elseif (!hash_equals($password, $confirm)) {
        $error = 'The passwords do not match.';
    } else {
        try {
            $pdo = db();
            $pdo->beginTransaction();
            $find = $pdo->prepare('SELECT user_id FROM password_reset_tokens WHERE token_hash = ? AND expires_at > UTC_TIMESTAMP() LIMIT 1 FOR UPDATE');
            $find->execute([hash('sha256', $token)]);
            $userId = $find->fetchColumn();
            if (!$userId) {
                $pdo->rollBack();
                $error = 'This reset link is invalid or has expired. Request a new link to continue.';
                $validToken = false;
            } else {
                $update = $pdo->prepare('UPDATE app_users SET password_hash = ? WHERE id = ?');
                $update->execute([password_hash($password, PASSWORD_DEFAULT), (int)$userId]);
                $remove = $pdo->prepare('DELETE FROM password_reset_tokens WHERE user_id = ?');
                $remove->execute([(int)$userId]);
                $pdo->commit();
                $success = 'Your password has been updated. You can now sign in.';
                $validToken = false;
            }
        } catch (Throwable $e) {
            if (isset($pdo) && $pdo->inTransaction()) $pdo->rollBack();
            $error = 'We could not update your password right now. Please try again.';
        }
    }
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST' && !$validToken) {
    $error = 'This reset link is invalid or has expired. Request a new link to continue.';
}
header('Cache-Control: no-store, max-age=0');
header('Referrer-Policy: no-referrer');

require __DIR__ . '/includes/header.php';
?>
<main class="account-flow-page">
  <section class="account-flow-card">
    <p class="account-flow-kicker">SECURE ACCOUNT RECOVERY</p>
    <h1>Choose a new password</h1>
    <p>Use at least 10 characters. This reset link can only be used once and expires after 60 minutes.</p>
    <?php if ($error): ?><div class="account-flow-alert" role="alert"><?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?></div><?php endif; ?>
    <?php if ($success): ?><div class="account-flow-notice" role="status"><?= htmlspecialchars($success, ENT_QUOTES, 'UTF-8') ?></div><?php endif; ?>
    <?php if ($validToken && !$success): ?>
    <form class="account-flow-form" method="post" autocomplete="on">
      <input type="hidden" name="csrf_token" value="<?= htmlspecialchars(csrf_token(), ENT_QUOTES, 'UTF-8') ?>">
      <input type="hidden" name="token" value="<?= htmlspecialchars($token, ENT_QUOTES, 'UTF-8') ?>">
      <label for="password">New password</label>
      <input id="password" name="password" type="password" autocomplete="new-password" minlength="10" required>
      <label for="confirm_password">Confirm new password</label>
      <input id="confirm_password" name="confirm_password" type="password" autocomplete="new-password" minlength="10" required>
      <button type="submit">Update password <span aria-hidden="true">→</span></button>
    </form>
    <?php endif; ?>
    <div class="account-flow-links"><a href="login.php">Back to sign in</a><?php if (!$validToken): ?><a href="forgot-password.php">Request another link</a><?php endif; ?></div>
  </section>
</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
