<?php
$page = 'dashboard';
$pageTitle = 'Student dashboard · ScholarSearch';
$pageDesc = 'Your scholarships, saved opportunities, comparisons and next steps.';
require __DIR__ . '/includes/header.php';
?>
<main class="dashboard-shell container">
  <section class="dashboard-welcome">
    <div><p class="kicker">YOUR SCHOLARSHIP JOURNEY</p><h1>Welcome back, <em class="shine"><?= htmlspecialchars(explode(' ', $signedInUser['display_name'])[0], ENT_QUOTES, 'UTF-8') ?></em></h1><p>Your student dashboard brings your next steps together.</p></div>
    <a class="btn btn-gold" href="finder.php">Find scholarships <span>→</span></a>
  </section>
  <section class="dashboard-metrics" aria-label="Scholarship overview">
    <article><span class="metric-icon">✦</span><div><small>Current matches</small><strong id="dashboardMatchCount">—</strong><span>based on your profile</span></div></article>
    <article><span class="metric-icon saved">☆</span><div><small>Saved scholarships</small><strong id="dashboardSavedCount">—</strong><span>in your personal shortlist</span></div></article>
    <article><span class="metric-icon compare">⇄</span><div><small>Comparing</small><strong id="dashboardCompareCount">—</strong><span>of 3 side-by-side slots</span></div></article>
    <article><span class="metric-icon gap">⌁</span><div><small>Profile CGPA</small><strong id="dashboardCgpa">—</strong><span id="dashboardDepartment">set your department</span></div></article>
  </section>
  <section class="dashboard-tools-section">
    <div class="dashboard-section-heading"><div><p class="section-label">YOUR WORKSPACE</p><h2>Plan your next move</h2></div><span>All your tools, in one place</span></div>
    <div class="dashboard-tools">
      <a class="dashboard-tool tool-finder" href="finder.php"><span class="tool-icon">⌕</span><span class="tool-eyebrow">DISCOVER</span><h3>Scholarship finder</h3><p>See awards matched to your CGPA, department and interests.</p><b>Explore matches <i>→</i></b></a>
      <a class="dashboard-tool tool-bookmarks" href="bookmarks.php"><span class="tool-icon">☆</span><span class="tool-eyebrow">YOUR SHORTLIST</span><h3>Bookmarks <span class="tool-count" id="dashboardBookmarkBadge">0</span></h3><p>Keep promising scholarships close and revisit them anytime.</p><b>View saved awards <i>→</i></b></a>
      <a class="dashboard-tool tool-gap" href="gap.php"><span class="tool-icon">⌁</span><span class="tool-eyebrow">YOUR NEXT STEP</span><h3>Eligibility gap analyzer</h3><p>Understand what is missing and how far you are from qualifying.</p><b>See your opportunities <i>→</i></b></a>
      <a class="dashboard-tool tool-compare" href="compare.php"><span class="tool-icon">⇄</span><span class="tool-eyebrow">DECIDE WITH CONFIDENCE</span><h3>Compare scholarships</h3><p>Compare up to three awards, requirements and deadlines side by side.</p><b>Open comparison <i>→</i></b></a>
    </div>
  </section>
  <section class="dashboard-recommendations">
    <div class="dashboard-section-heading"><div><p class="section-label">A GOOD PLACE TO START</p><h2>Matched for your profile</h2></div><a href="finder.php">See all matches →</a></div>
    <div class="dashboard-picks" id="dashboardPicks"><p class="muted">Loading your matches…</p></div>
  </section>
  <section class="dashboard-help"><span>✦</span><div><b>Need a hand?</b><p>Ask the ScholarSearch assistant about your matches, award rules or deadlines.</p></div><button type="button" id="openDashboardChat">Ask a question →</button></section>
</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
