<?php
$page = 'compare';
$pageTitle = 'Compare scholarships — ScholarSearch';
$pageDesc = 'Compare scholarship requirements, funding and deadlines side by side.';
require __DIR__ . '/includes/header.php';
?>
<section class="night-sky page-hero">
  <div class="container"><p class="kicker">MAKE A CLEAR CHOICE</p><h1>Compare <em class="shine">scholarships</em></h1><p class="sub">Select up to three opportunities from Finder to compare them side by side.</p></div>
  <svg class="wave" viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0 80C240 20 480 120 720 70s480-60 720 10v40H0Z"></path></svg>
</section>
<section class="container compare-page"><div class="saved-heading"><div><p class="section-label">SIDE BY SIDE</p><h2>What matters to you?</h2></div><a class="btn btn-primary" href="finder.php">Back to Finder →</a></div><div id="compareContent" class="compare-content"><p class="muted">Loading your comparison…</p></div></section>
<?php require __DIR__ . '/includes/footer.php'; ?>
