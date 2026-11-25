<?php
if (!isset($pageTitle)) $pageTitle = 'ScholarSearch';
if (!isset($pageDesc)) $pageDesc = 'Find scholarships that fit you.';
if (!isset($page)) $page = 'home';
require_once __DIR__ . '/auth.php';
$signedInUser = current_user();
if (in_array($page, ['dashboard', 'finder', 'almost', 'bookmarks', 'compare', 'gap'], true) && !$signedInUser) {
  header('Location: login.php');
  exit;
}
$nav = $signedInUser ? [
  'dashboard' => ['dashboard.php', 'Dashboard'],
  'finder' => ['finder.php', '🔎 Finder'],
  'almost' => ['almost.php', '✨ Almost there'],
  'how' => ['how-it-works.php', 'How it works'],
] : [
  'home' => ['index.php', 'Home'],
  'how' => ['how-it-works.php', 'How it works'],
];
?><!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title><?= htmlspecialchars($pageTitle) ?></title>
  <meta name="description" content="<?= htmlspecialchars($pageDesc) ?>" />
  <?php if ($signedInUser): ?><meta name="csrf-token" content="<?= htmlspecialchars(csrf_token(), ENT_QUOTES, 'UTF-8') ?>" /><?php endif; ?>
  <link rel="stylesheet" href="css/styles.css" />
</head>
<body data-page="<?= htmlspecialchars($page) ?>" data-user-id="<?= (int)($signedInUser['id'] ?? 0) ?>">
<header class="pill-nav">
  <a class="brand" href="index.php">
    <span class="brand-icon">🎓</span>
    <span class="brand-text">Scholar<span style="color:var(--secondary)">Search</span></span>
  </a>
  <nav id="siteNavigation">
    <?php foreach ($nav as $key => [$href, $label]): ?>
      <a href="<?= $href ?>" class="<?= $page === $key ? 'active' : '' ?>"><?= htmlspecialchars($label) ?></a>
    <?php endforeach; ?>
  </nav>
  <div class="site-toggles" aria-label="Display preferences">
    <button type="button" id="languageToggle" class="preference-icon-button language-toggle" aria-label="Switch language" title="Switch language">
      <svg class="preference-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"></path></svg>
      <span class="language-code" aria-hidden="true">EN</span>
    </button>
    <button type="button" id="themeToggle" class="preference-icon-button theme-control" data-mode="light" aria-label="Change color theme" title="Change color theme">
      <svg class="preference-icon theme-icon-light" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"></path></svg>
      <svg class="preference-icon theme-icon-dark" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z"></path><path d="M17.5 3v3m-1.5-1.5h3"></path></svg>
      <svg class="preference-icon theme-icon-night" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z"></path><path d="m17.5 3 .5 1.5 1.5.5-1.5.5-.5 1.5L17 5.5l-1.5-.5 1.5-.5.5-1.5Z"></path></svg>
    </button>
  </div>
  <div class="account-nav">
    <?php if ($signedInUser): ?>
      <span class="account-name" title="Signed in as <?= htmlspecialchars($signedInUser['display_name'], ENT_QUOTES, 'UTF-8') ?>">👋 <?= htmlspecialchars($signedInUser['display_name'], ENT_QUOTES, 'UTF-8') ?></span>
      <a class="account-action" href="logout.php">Sign out</a>
    <?php else: ?>
      <a class="account-action" href="login.php">Sign in</a>
    <?php endif; ?>
  </div>
  <button type="button" id="mobileMenuToggle" class="mobile-menu-toggle" aria-label="Open navigation" aria-expanded="false" aria-controls="siteNavigation">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"></path></svg>
  </button>
</header>
