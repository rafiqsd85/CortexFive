<?php
$page = 'almost';
$pageTitle = 'Almost there — ScholarSearch';
$pageDesc = 'Scholarships you are one small step away from, with exactly what is missing.';
require __DIR__ . '/includes/header.php';
?>
<section class="night-sky page-hero">
  <div id="starsPage" aria-hidden="true"></div>
  <div class="container">
    <p class="kicker rise"><span data-language-en="One step closer" data-language-bn="যোগ্যতার আরও কাছে">One step closer</span></p>
    <h1 class="rise" style="--d:.1s"><span data-language-en="Almost" data-language-bn="যোগ্যতার">Almost</span> <em class="shine" data-language-en="eligible" data-language-bn="কাছাকাছি">eligible</em></h1>
    <p class="sub rise" style="--d:.2s">Scholarships you are one small step away from, with exactly what is missing.</p>
  </div>
  <svg class="wave" viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0 80C240 20 480 120 720 70s480-60 720 10v40H0Z"></path></svg>
</section>
<section class="container results">
  <div id="profilePanel"></div>
  <div>
    <div class="search-bar rise">
      <input id="searchInput" placeholder="Search by name, provider or keyword…" />
      <span id="resultCount" class="badge near" data-live="true">— almost</span>
    </div>
    <div id="resultsGrid" class="cards"></div>
  </div>
</section>
<?php require __DIR__ . '/includes/footer.php'; ?>
