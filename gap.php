<?php
$page = 'gap';
$pageTitle = 'Eligibility gap analyzer — ScholarSearch';
$pageDesc = 'See how far you are from meeting each scholarship requirement.';
require __DIR__ . '/includes/header.php';
?>
<section class="night-sky page-hero">
  <div class="container"><p class="kicker">A PLAN FOR YOUR NEXT STEP</p><h1>Eligibility <em class="shine">gap analyzer</em></h1><p class="sub">See exactly what is missing, including CGPA distance, and focus on the scholarships you can work toward.</p></div>
  <svg class="wave" viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0 80C240 20 480 120 720 70s480-60 720 10v40H0Z"></path></svg>
</section>
<section class="container gap-page">
  <div class="gap-intro"><div><span class="gap-icon">⌁</span><p class="section-label">BASED ON YOUR PROFILE</p><h2>Your gap, made clear.</h2><p id="gapProfileSummary">Calculating from your saved profile…</p></div><a class="btn btn-primary" href="finder.php">Update my profile →</a></div>
  <div class="gap-stats"><article><span>Opportunities analyzed</span><strong id="gapTotal">—</strong></article><article><span>Already eligible</span><strong id="gapEligible">—</strong></article><article><span>Within reach</span><strong id="gapReachable">—</strong></article></div>
  <div class="saved-heading"><div><p class="section-label">NEXT BEST STEPS</p><h2>Requirements to work toward</h2></div><label class="gap-filter">Show <select id="gapFilter"><option value="all">All gaps</option><option value="near">Within 0.25 CGPA</option><option value="dept">Department gaps</option></select></label></div>
  <div id="gapGrid" class="gap-grid"></div>
</section>
<?php require __DIR__ . '/includes/footer.php'; ?>
