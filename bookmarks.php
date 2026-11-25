<?php
$page = 'bookmarks';
$pageTitle = 'Saved scholarships — ScholarSearch';
$pageDesc = 'Your personal scholarship shortlist.';
require __DIR__ . '/includes/header.php';
?>
<section class="night-sky page-hero">
  <div class="container"><p class="kicker">YOUR SHORTLIST</p><h1>Saved <em class="shine">scholarships</em></h1><p class="sub">Keep the opportunities you care about in one place.</p></div>
  <svg class="wave" viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0 80C240 20 480 120 720 70s480-60 720 10v40H0Z"></path></svg>
</section>
<section class="container saved-page"><div class="saved-heading"><div><p class="section-label">YOUR COLLECTION</p><h2>Opportunities worth keeping</h2></div><a class="btn btn-primary" href="finder.php">Find more scholarships →</a></div><div id="savedGrid" class="cards"><p class="muted">Loading your saved scholarships…</p></div></section>
<?php require __DIR__ . '/includes/footer.php'; ?>
