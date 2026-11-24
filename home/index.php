
<?php
// ==========================================
// CORTEX SCHOLARMATE
// Main Home Page
// Developed by CortexFive
// ==========================================

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

date_default_timezone_set('Asia/Dhaka');

$pageTitle = "Cortex ScholarMate | Find Your Scholarship";
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta name="description"
          content="Discover scholarships that match your academic profile with Cortex ScholarMate, an AI-powered scholarship finder.">

    <meta name="author" content="CortexFive">

    <title><?php echo htmlspecialchars($pageTitle); ?></title>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet">

    <!-- Main Home CSS -->
    <link rel="stylesheet" href="../assets/css/home.css">
</head>

<body>

    <!-- ======================================
         NAVBAR
    ======================================= -->

    <header class="header">

        <nav class="navbar container">

            <a href="index.php" class="brand">
                <span class="brand-logo">CS</span>

                <span class="brand-name">
                    Cortex<span>ScholarMate</span>
                </span>
            </a>

            <div class="nav-links">
                <a href="#home" class="nav-link active">Home</a>
                <a href="#features" class="nav-link">Features</a>
                <a href="#how-it-works" class="nav-link">How It Works</a>
                <a href="#about" class="nav-link">About</a>
            </div>

            <a href="../profile/profile.php" class="nav-button">
                Get Started
                <span>→</span>
            </a>

        </nav>

    </header>


    <!-- ======================================
         HERO SECTION
    ======================================= -->

    <main>

        <section class="hero" id="home">

            <div class="hero-glow glow-one"></div>
            <div class="hero-glow glow-two"></div>

            <div class="container hero-container">

                <div class="hero-content">

                    <div class="hero-badge">
                        <span class="badge-dot"></span>
                        AI-POWERED SCHOLARSHIP DISCOVERY
                    </div>

                    <h1>
                        Your Future Deserves
                        <span>Better Opportunities.</span>
                    </h1>

                    <p class="hero-description">
                        Discover scholarships that match your academic
                        profile, department, and financial needs.
                        Let AI help you find the right opportunity
                        for your future.
                    </p>

                    <div class="hero-actions">

                        <a href="../profile/profile.php" class="btn-primary">
                            Find My Scholarship
                            <span>→</span>
                        </a>

                        <a href="#how-it-works" class="btn-secondary">
                            Explore How It Works
                        </a>

                    </div>

                    <div class="hero-note">
                        <span class="note-icon">✦</span>
                        Smarter Discovery. Better Opportunities.
                    </div>

                </div>


                <!-- Hero Visual -->

                <div class="hero-visual">

                    <div class="visual-orbit orbit-one"></div>
                    <div class="visual-orbit orbit-two"></div>

                    <div class="main-visual-card">

                        <div class="visual-card-top">
                            <div>
                                <span class="visual-label">
                                    SCHOLARSHIP MATCHING
                                </span>

                                <h3>Your Opportunities</h3>
                            </div>

                            <span class="ai-icon">✦</span>
                        </div>

                        <div class="match-score">

                            <div class="score-circle">
                                <span>AI</span>
                            </div>

                            <div class="score-info">
                                <strong>Smart Matching</strong>
                                <span>Based on your profile</span>
                            </div>

                        </div>

                        <div class="visual-divider"></div>

                        <div class="scholarship-preview">

                            <div class="preview-icon purple">🎓</div>

                            <div class="preview-info">
                                <strong>Academic Excellence</strong>
                                <span>Merit-based opportunity</span>
                            </div>

                            <span class="preview-arrow">↗</span>

                        </div>

                        <div class="scholarship-preview">

                            <div class="preview-icon cyan">💡</div>

                            <div class="preview-info">
                                <strong>Future Innovators</strong>
                                <span>Technology scholarship</span>
                            </div>

                            <span class="preview-arrow">↗</span>

                        </div>

                        <div class="visual-footer">
                            <span class="live-dot"></span>
                            Intelligent Scholarship Discovery
                        </div>

                    </div>

                    <div class="floating-card floating-top">
                        <span>✦</span>
                        AI-Powered
                    </div>

                    <div class="floating-card floating-bottom">
                        <span>✓</span>
                        Personalized Matching
                    </div>

                </div>

            </div>

        </section>


        <!-- ======================================
             FEATURES SECTION
        ======================================= -->

        <section class="features section-padding" id="features">

            <div class="container">

                <div class="section-heading">

                    <span class="section-tag">WHY SCHOLARMATE?</span>

                    <h2>
                        Everything You Need to Find
                        <span>Your Opportunity</span>
                    </h2>

                    <p>
                        A smarter way to discover and understand
                        scholarship opportunities that fit your profile.
                    </p>

                </div>


                <div class="features-grid">

                    <article class="feature-card">

                        <div class="feature-icon purple-icon">🎯</div>

                        <h3>Personalized Matching</h3>

                        <p>
                            Find scholarships based on your CGPA,
                            department, and financial support needs.
                        </p>

                    </article>


                    <article class="feature-card">

                        <div class="feature-icon cyan-icon">✦</div>

                        <h3>AI-Powered Insights</h3>

                        <p>
                            Understand why a scholarship matches
                            your profile with AI-generated explanations.
                        </p>

                    </article>


                    <article class="feature-card">

                        <div class="feature-icon pink-icon">📋</div>

                        <h3>Application Guidance</h3>

                        <p>
                            Get helpful application steps and
                            checklists to organize your preparation.
                        </p>

                    </article>


                    <article class="feature-card">

                        <div class="feature-icon orange-icon">📊</div>

                        <h3>Eligibility Insights</h3>

                        <p>
                            Discover eligible and almost eligible
                            scholarships with clear criteria.
                        </p>

                    </article>


                    <article class="feature-card">

                        <div class="feature-icon green-icon">🌐</div>

                        <h3>Student Friendly</h3>

                        <p>
                            Explore scholarship information through
                            a simple and accessible interface.
                        </p>

                    </article>


                    <article class="feature-card">

                        <div class="feature-icon blue-icon">⬇</div>

                        <h3>Download Results</h3>

                        <p>
                            Keep your matched scholarship information
                            available for future reference.
                        </p>

                    </article>

                </div>

            </div>

        </section>


        <!-- ======================================
             HOW IT WORKS
        ======================================= -->

        <section class="how-section section-padding" id="how-it-works">

            <div class="container">

                <div class="section-heading">

                    <span class="section-tag">SIMPLE PROCESS</span>

                    <h2>
                        Your Scholarship Journey
                        <span>Starts Here</span>
                    </h2>

                    <p>
                        Three simple steps to discover opportunities
                        that match your profile.
                    </p>

                </div>


                <div class="steps-grid">

                    <article class="step-card">

                        <div class="step-number">01</div>

                        <div class="step-icon">👤</div>

                        <h3>Build Your Profile</h3>

                        <p>
                            Enter your academic information,
                            department, CGPA, and financial needs.
                        </p>

                    </article>


                    <article class="step-card">

                        <div class="step-number">02</div>

                        <div class="step-icon">🔍</div>

                        <h3>Discover Scholarships</h3>

                        <p>
                            Our matching system checks scholarship
                            requirements against your profile.
                        </p>

                    </article>


                    <article class="step-card">

                        <div class="step-number">03</div>

                        <div class="step-icon">🚀</div>

                        <h3>Explore Your Matches</h3>

                        <p>
                            Review your results, understand your
                            eligibility, and prepare to apply.
                        </p>

                    </article>

                </div>

            </div>

        </section>


        <!-- ======================================
             ABOUT SECTION
        ======================================= -->

        <section class="about-section section-padding" id="about">

            <div class="container about-container">

                <div class="about-content">

                    <span class="section-tag">ABOUT THE PROJECT</span>

                    <h2>
                        Making Scholarship
                        Discovery <span>Smarter.</span>
                    </h2>

                    <p>
                        Cortex ScholarMate is an AI-powered scholarship
                        discovery platform developed to help students
                        identify opportunities that align with their
                        academic qualifications and financial needs.
                    </p>

                    <p>
                        By combining eligibility-based matching with
                        AI-generated explanations, we aim to make
                        scholarship discovery easier and more
                        understandable for students.
                    </p>

                    <a href="#how-it-works" class="text-link">
                        Learn How It Works <span>→</span>
                    </a>

                </div>


                <div class="about-visual">

                    <div class="about-symbol">CS</div>

                    <div class="about-brand">
                        <span>CORTEX</span>
                        <strong>SCHOLARMATE</strong>
                        <small>AI-POWERED SCHOLARSHIP FINDER</small>
                    </div>

                    <div class="about-decoration decoration-one"></div>
                    <div class="about-decoration decoration-two"></div>

                </div>

            </div>

        </section>


        <!-- ======================================
             CALL TO ACTION
        ======================================= -->

        <section class="cta-section">

            <div class="container">

                <div class="cta-card">

                    <div class="cta-glow"></div>

                    <span class="section-tag">YOUR NEXT STEP STARTS NOW</span>

                    <h2>
                        Ready to Discover
                        <span>Your Opportunities?</span>
                    </h2>

                    <p>
                        Start with your academic profile and explore
                        scholarships that could support your future.
                    </p>

                    <a href="../profile/profile.php" class="btn-primary cta-button">
                        Get Started Now
                        <span>→</span>
                    </a>

                </div>

            </div>

        </section>

    </main>


    <!-- ======================================
         FOOTER
    ======================================= -->

    <footer class="footer">

        <div class="container footer-container">

            <div class="footer-brand">

                <a href="index.php" class="brand">
                    <span class="brand-logo">CS</span>

                    <span class="brand-name">
                        Cortex<span>ScholarMate</span>
                    </span>
                </a>

                <p>
                    Find Your Opportunity. Fund Your Future.
                </p>

            </div>


            <div class="footer-right">

                <div class="footer-links">
                    <a href="#home">Home</a>
                    <a href="#features">Features</a>
                    <a href="#how-it-works">How It Works</a>
                    <a href="#about">About</a>
                </div>

                <p>
                    © <?php echo date('Y'); ?> CortexFive.
                    All rights reserved.
                </p>

            </div>

        </div>

    </footer>

</body>
</html>
