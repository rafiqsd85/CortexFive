
<?php
session_start();
date_default_timezone_set('Asia/Dhaka');

// Generate CSRF token
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

$errors = [];
$success = false;

$name = '';
$email = '';
$department = '';
$cgpa = '';
$financialSupport = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // CSRF verification
    if (
        empty($_POST['csrf_token']) ||
        !hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'])
    ) {
        $errors[] = 'Invalid request. Please refresh the page and try again.';
    }

    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $department = trim($_POST['department'] ?? '');
    $cgpa = trim($_POST['cgpa'] ?? '');
    $financialSupport = $_POST['financial_support'] ?? '';

    // Name validation
    if ($name === '') {
        $errors[] = 'Please enter your full name.';
    }

    // Email validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Please enter a valid email address.';
    }

    // Department validation
    if ($department === '') {
        $errors[] = 'Please enter your department.';
    }

    // CGPA validation
    if (
        $cgpa === '' ||
        !is_numeric($cgpa) ||
        (float)$cgpa < 0 ||
        (float)$cgpa > 4
    ) {
        $errors[] = 'CGPA must be between 0.00 and 4.00.';
    }

    // Financial support validation
    if (!in_array($financialSupport, ['yes', 'no'], true)) {
        $errors[] = 'Please select your financial support preference.';
    }

    // Save valid profile temporarily in session
    if (empty($errors)) {
        $_SESSION['student_profile'] = [
            'name' => $name,
            'email' => $email,
            'department' => $department,
            'cgpa' => number_format((float)$cgpa, 2, '.', ''),
            'financial_support' => $financialSupport,
            'created_at' => date('Y-m-d H:i:s')
        ];

        $success = true;
    }
}

function escape($value) {
    return htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8');
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta name="description"
          content="Create your student profile to discover scholarship opportunities with Cortex ScholarMate.">

    <title>Student Profile | Cortex ScholarMate</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet">

    <link rel="stylesheet" href="profile.css">
</head>

<body>

<header class="navbar">
    <a href="../home/index.php" class="brand">
        <span class="brand-icon">CS</span>
        <span>Cortex <strong>ScholarMate</strong></span>
    </a>

    <a href="../home/index.php" class="back-link">
        ← Back to Home
    </a>
</header>

<main class="page-container">

    <section class="intro-section">
        <span class="eyebrow">YOUR JOURNEY STARTS HERE</span>

        <h1>Create Your <span>Student Profile</span></h1>

        <p>
            Tell us a little about yourself. We'll use your academic
            information to find scholarship opportunities that match you.
        </p>
    </section>

    <section class="profile-card">

        <div class="card-heading">
            <div>
                <span class="step-label">STEP 01</span>
                <h2>Student Information</h2>
                <p>Enter your information accurately.</p>
            </div>

            <div class="step-icon">01</div>
        </div>

        <?php if ($success): ?>

            <div class="success-message">
                <div class="message-icon">✓</div>
                <div>
                    <h3>Profile information saved!</h3>
                    <p>
                        Your information is ready for the scholarship
                        matching stage.
                    </p>
                </div>
            </div>

            <div class="saved-profile">
                <h3>Your Submitted Information</h3>

                <div class="profile-detail">
                    <span>Full Name</span>
                    <strong><?= escape($name) ?></strong>
                </div>

                <div class="profile-detail">
                    <span>Email Address</span>
                    <strong><?= escape($email) ?></strong>
                </div>

                <div class="profile-detail">
                    <span>Department</span>
                    <strong><?= escape($department) ?></strong>
                </div>

                <div class="profile-detail">
                    <span>CGPA</span>
                    <strong><?= escape(number_format((float)$cgpa, 2)) ?>/4.00</strong>
                </div>

                <div class="profile-detail">
                    <span>Financial Support</span>
                    <strong><?= $financialSupport === 'yes' ? 'Yes' : 'No' ?></strong>
                </div>
            </div>

            <p class="temporary-note">
                Note: This information is currently stored in your PHP
                session. Database storage and scholarship matching
                will be connected in the next stages.
            </p>

            <a href="profile.php" class="submit-btn new-profile-btn">
                Create Another Profile
                <span>→</span>
            </a>

        <?php else: ?>

            <?php if (!empty($errors)): ?>
                <div class="error-message">
                    <strong>Please check the following:</strong>
                    <ul>
                        <?php foreach ($errors as $error): ?>
                            <li><?= escape($error) ?></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            <?php endif; ?>

            <form action="profile.php" method="POST" id="profileForm">

                <input type="hidden" name="csrf_token"
                       value="<?= escape($_SESSION['csrf_token']) ?>">

                <div class="form-group">
                    <label for="name">Full Name <span>*</span></label>

                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                        value="<?= escape($name) ?>"
                        maxlength="100"
                        required
                    >
                </div>

                <div class="form-group">
                    <label for="email">Email Address <span>*</span></label>

                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="example@email.com"
                        value="<?= escape($email) ?>"
                        maxlength="150"
                        required
                    >
                </div>

                <div class="form-group">
                    <label for="department">Department <span>*</span></label>

                    <input
                        type="text"
                        id="department"
                        name="department"
                        placeholder="e.g. Computer Science and Engineering"
                        value="<?= escape($department) ?>"
                        maxlength="150"
                        required
                    >

                    <small>Enter your current academic department.</small>
                </div>

                <div class="form-group">
                    <div class="label-row">
                        <label for="cgpa">Current CGPA <span>*</span></label>
                        <span class="cgpa-limit">Maximum 4.00</span>
                    </div>

                    <input
                        type="number"
                        id="cgpa"
                        name="cgpa"
                        placeholder="e.g. 3.85"
                        value="<?= escape($cgpa) ?>"
                        min="0"
                        max="4"
                        step="0.01"
                        required
                    >

                    <div class="cgpa-progress">
                        <div class="cgpa-progress-fill" id="cgpaProgress"></div>
                    </div>

                    <small id="cgpaFeedback">
                        Enter your latest CGPA on a 4.00 scale.
                    </small>
                </div>

                <div class="form-group">
                    <label>
                        Do you need financial support?
                        <span>*</span>
                    </label>

                    <div class="radio-options">

                        <label class="radio-card">
                            <input
                                type="radio"
                                name="financial_support"
                                value="yes"
                                <?= $financialSupport === 'yes' ? 'checked' : '' ?>
                                required
                            >

                            <span class="radio-content">
                                <strong>Yes, I do</strong>
                                <small>I need financial assistance.</small>
                            </span>
                        </label>

                        <label class="radio-card">
                            <input
                                type="radio"
                                name="financial_support"
                                value="no"
                                <?= $financialSupport === 'no' ? 'checked' : '' ?>
                            >

                            <span class="radio-content">
                                <strong>No, I don't</strong>
                                <small>I can apply without financial need.</small>
                            </span>
                        </label>

                    </div>
                </div>

                <div class="privacy-note">
                    <span>ⓘ</span>
                    Your information will be used to identify relevant
                    scholarship opportunities.
                </div>

                <button type="submit" class="submit-btn">
                    Find My Scholarships
                    <span>→</span>
                </button>

            </form>

        <?php endif; ?>

    </section>

    <p class="page-footer">
        Powered by <strong>CortexFive</strong> · Cortex ScholarMate
    </p>

</main>

<script src="profile.js"></script>

</body>
</html>
