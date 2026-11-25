<?php
$page = 'finder';
$pageTitle = 'Scholarship Finder — ScholarSearch';
$pageDesc = 'Set your profile and see every scholarship you qualify for, scored and explained.';
require __DIR__ . '/includes/header.php';
?>
<section class="night-sky page-hero">
  <div id="starsPage" aria-hidden="true"></div>
  <div class="container">
    <p class="kicker rise"><span data-language-en="Scholarships picked for you" data-language-bn="আপনার উপযোগী বৃত্তি">Scholarships picked for you</span></p>
    <h1 class="rise" style="--d:.1s"><span data-language-en="Your best-fit" data-language-bn="আপনার উপযোগী">Your best-fit</span> <em class="shine" data-language-en="scholarships" data-language-bn="বৃত্তি">scholarships</em></h1>
    <p class="sub rise" style="--d:.2s">Set your profile and see every scholarship you qualify for, scored and explained.</p>
  </div>
  <svg class="wave" viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0 80C240 20 480 120 720 70s480-60 720 10v40H0Z"></path></svg>
</section>
<section class="container results">
  <div id="profilePanel"></div>
  <div>
    <div class="search-bar rise">
      <input id="searchInput" placeholder="Search by name, provider or keyword…" />
      <span id="resultCount" class="badge" data-live="true">— matches</span>
    </div>
    <div id="resultsGrid" class="cards"></div>
  </div>
</section>
<?php require __DIR__ . '/includes/footer.php'; ?>
