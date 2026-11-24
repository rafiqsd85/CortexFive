
<?php

// CORTEX SCHOLARMATE
// Main Entry Point
// Developed by CortexFive

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

date_default_timezone_set('Asia/Dhaka');

define('APP_NAME', 'Cortex ScholarMate');
define('APP_VERSION', '1.0.0');

$homePage = __DIR__ . '/home/index.php';

if (file_exists($homePage)) {
    header('Location: home/index.php');
    exit;
}

http_response_code(503);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta name="description"
          content="Cortex ScholarMate - AI-Powered Scholarship Finder">

    <title><?php echo APP_NAME; ?> | Setup</title>

    <link rel="stylesheet" href="assets/css/index.css">
</head>

<body>

    <main class="setup-container">

        <section class="setup-card">

            <div class="logo">CS</div>

            <h1>Cortex <span>ScholarMate</span></h1>

            <p class="subtitle">
                AI-Powered Scholarship Finder
            </p>

            <p class="tagline">
                Find Your Opportunity. Fund Your Future.
            </p>

            <div class="status">
                <span class="status-dot"></span>
                Project Under Development
            </div>

            <div class="footer">
                Developed by <strong>CortexFive</strong>
                <span>Version <?php echo APP_VERSION; ?></span>
            </div>

        </section>

    </main>

</body>
</html>
