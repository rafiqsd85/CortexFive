<?php
declare(strict_types=1);

function app_base_url(): string
{
    $configured = trim((string)(getenv('SS_APP_URL') ?: ''));
    if ($configured !== '') {
        $parts = parse_url($configured);
        if (!is_array($parts) || !in_array(strtolower((string)($parts['scheme'] ?? '')), ['http', 'https'], true)
            || empty($parts['host']) || isset($parts['user']) || isset($parts['pass']) || isset($parts['query']) || isset($parts['fragment'])) return '';
        return rtrim($configured, '/');
    }

    $host = (string)($_SERVER['HTTP_HOST'] ?? 'localhost');
    if (!preg_match('/^[A-Za-z0-9.-]+(?::[0-9]{1,5})?$/', $host)) $host = 'localhost';
    $hostOnly = strtolower(preg_replace('/:\\d+$/', '', $host) ?: $host);
    if (!in_array($hostOnly, ['localhost', '127.0.0.1'], true)) return '';
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $path = str_replace('\\', '/', dirname((string)($_SERVER['SCRIPT_NAME'] ?? '/')));
    $path = $path === '/' || $path === '.' ? '' : '/' . trim($path, '/');
    return $scheme . '://' . $host . $path;
}

function send_password_reset_email(string $recipient, string $resetUrl): bool
{
    $from = trim((string)(getenv('SS_MAIL_FROM') ?: ''));
    if ($resetUrl === '' || !filter_var($recipient, FILTER_VALIDATE_EMAIL) || !filter_var($from, FILTER_VALIDATE_EMAIL)) return false;

    $subject = 'Reset your ScholarSearch password';
    $body = "We received a request to reset your ScholarSearch password.\n\n"
        . "Use the secure link below within 60 minutes to choose a new password:\n"
        . $resetUrl . "\n\n"
        . "If you did not request this change, you can ignore this email.\n";
    $headers = [
        'From: ScholarSearch <' . $from . '>',
        'Reply-To: ' . $from,
        'Content-Type: text/plain; charset=UTF-8',
        'X-Mailer: PHP/' . PHP_VERSION,
    ];
    return @mail($recipient, $subject, $body, implode("\r\n", $headers));
}

function can_show_development_reset_link(): bool
{
    $environment = strtolower((string)(getenv('SS_APP_ENV') ?: 'development'));
    if ($environment !== 'development') return false;
    if (filter_var(getenv('SS_SHOW_RESET_LINK') ?: false, FILTER_VALIDATE_BOOLEAN)) return true;
    $host = strtolower((string)($_SERVER['HTTP_HOST'] ?? ''));
    $host = preg_replace('/:\\d+$/', '', $host) ?: $host;
    return in_array($host, ['localhost', '127.0.0.1', '[::1]', '::1'], true);
}
