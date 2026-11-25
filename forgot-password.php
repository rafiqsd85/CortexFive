<?php
declare(strict_types=1);
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/db.php';
require_once __DIR__ . '/includes/password_reset.php';

$page = 'forgot';
$pageTitle = 'Reset your password · ScholarSearch';
$pageDesc = 'Request a secure password reset link for your ScholarSearch account.';
$error = '';
$notice = '';
$email = '';
$developmentLink = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim((string)($_POST['email'] ?? ''));
    if (!verify_csrf($_POST['csrf_token'] ?? null)) {
        $error = 'Your form expired. Please try again.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = 'Enter a valid email address.';
    } else {
        try {
            $pdo = db();
            $lookup = $pdo->prepare('SELECT id, email FROM app_users WHERE email = ? LIMIT 1');
            $lookup->execute([$email]);
            $user = $lookup->fetch();
            if ($user) {
                $token = bin2hex(random_bytes(32));
                $tokenHash = hash('sha256', $token);
                $delete = $pdo->prepare('DELETE FROM password_reset_tokens WHERE user_id = ?');
                $delete->execute([(int)$user['id']]);
                $insert = $pdo->prepare('INSERT INTO password_reset_tokens (token_hash, user_id, expires_at) VALUES (?, ?, ?)');
                $insert->execute([$tokenHash, (int)$user['id'], gmdate('Y-m-d H:i:s', time() + 3600)]);
                $baseUrl = app_base_url();
                $resetUrl = $baseUrl !== '' ? $baseUrl . '/reset-password.php?token=' . rawurlencode($token) : '';
                if (!send_password_reset_email((string)$user['email'], $resetUrl)) {
                    if (can_show_development_reset_link()) $developmentLink = $resetUrl;
                    else {
                        $remove = $pdo->prepare('DELETE FROM password_reset_tokens WHERE token_hash = ?');
                        $remove->execute([$tokenHash]);
                    }
                }
            }
            $notice = 'If that email is linked to an account, we will send a password reset link shortly.';
            $email = '';
        } catch (Throwable $e) {
            $error = 'We could not process the request right now. Please try again later.';
        }
    }
}

require __DIR__ . '/includes/header.php';
?>
<main class="account-flow-page">
  <section class="account-flow-card">
    <p class="account-flow-kicker">ACCOUNT RECOVERY</p>
    <h1>Forgot your password?</h1>
    <p>Enter the email address linked to your account. We’ll send a secure link to reset your password.</p>
    <?php if ($error): ?><div class="account-flow-alert" role="alert"><?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?></div><?php endif; ?>
    <?php if ($notice): ?><div class="account-flow-notice" role="status"><?= htmlspecialchars($notice, ENT_QUOTES, 'UTF-8') ?></div><?php endif; ?>
    <?php if ($developmentLink): ?><div class="account-flow-dev-link"><b>Development reset link</b><a href="<?= htmlspecialchars($developmentLink, ENT_QUOTES, 'UTF-8') ?>"><?= htmlspecialchars($developmentLink, ENT_QUOTES, 'UTF-8') ?></a></div><?php endif; ?>
    <form class="account-flow-form" method="post">
      <input type="hidden" name="csrf_token" value="<?= htmlspecialchars(csrf_token(), ENT_QUOTES, 'UTF-8') ?>">
      <label for="email">Email address</label>
      <input id="email" name="email" type="email" value="<?= htmlspecialchars($email, ENT_QUOTES, 'UTF-8') ?>" autocomplete="email" maxlength="190" required>
      <button type="submit">Send reset link <span aria-hidden="true">→</span></button>
    </form>
    <div class="account-flow-links"><a href="login.php">Back to sign in</a><a href="register.php">Create an account</a></div>
  </section>
</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
