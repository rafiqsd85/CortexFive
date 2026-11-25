<?php
$page = 'how';
$pageTitle = 'How it works — ScholarSearch';
$pageDesc = 'How ScholarSearch scores scholarships against your CGPA, department, need and interests.';
require __DIR__ . '/includes/header.php';
$steps = [
  ['01','Share your profile','CGPA, department, need and interests — nothing is stored on a server.'],
  ['02','We score every award','Start at 70, plus up to 15 for CGPA above the bar, 8 for a department-specific award, 7 for need-based fit and 4 per matching interest.'],
  ['03','Chase the near misses',"If you're within 0.25 CGPA or miss one or two rules, it shows in Almost there with what's missing."],
  ['04','Apply before the deadline','Each card shows days left, so the urgent ones stand out in coral.'],
];
?>
<section class="night-sky page-hero">
  <div class="container">
    <p class="kicker rise">কীভাবে কাজ করে</p>
    <h1 class="rise" style="--d:.1s">How it <em class="shine">works</em></h1>
    <p class="sub rise" style="--d:.2s">Four simple steps from profile to application.</p>
  </div>
  <svg class="wave" viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0 80C240 20 480 120 720 70s480-60 720 10v40H0Z"></path></svg>
</section>
<section class="container steps">
  <?php foreach ($steps as $i => [$n,$t,$d]): ?>
  <div class="rise step card-lift" style="--d:<?= $i*0.08 ?>s">
    <div class="n"><?= $n ?></div>
    <h3><?= htmlspecialchars($t) ?></h3>
    <p><?= htmlspecialchars($d) ?></p>
  </div>
  <?php endforeach; ?>
  <div style="grid-column:1/-1"><a href="finder.php" class="btn btn-primary">Open the finder →</a></div>
</section>
<?php require __DIR__ . '/includes/footer.php'; ?>
