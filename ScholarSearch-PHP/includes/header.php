<?php
if (!isset($pageTitle)) $pageTitle = 'ScholarSearch';
if (!isset($pageDesc)) $pageDesc = 'Find scholarships that fit you.';
if (!isset($page)) $page = 'home';
$nav = [
  'home' => ['index.php', 'Home'],
  'finder' => ['finder.php', 'Finder'],
  'almost' => ['almost.php', 'Almost there'],
  'how' => ['how-it-works.php', 'How it works'],
];
?><!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title><?= htmlspecialchars($pageTitle) ?></title>
  <meta name="description" content="<?= htmlspecialchars($pageDesc) ?>" />
  <link rel="stylesheet" href="css/styles.css" />
</head>
<body data-page="<?= htmlspecialchars($page) ?>">
<header class="pill-nav">
  <a class="brand" href="index.php">
    <span class="brand-icon">🎓</span>
    <span class="brand-text">Scholar<span style="color:var(--secondary)">Search</span></span>
  </a>
  <nav>
    <?php foreach ($nav as $key => [$href, $label]): ?>
      <a href="<?= $href ?>" class="<?= $page === $key ? 'active' : '' ?>"><?= htmlspecialchars($label) ?></a>
    <?php endforeach; ?>
  </nav>
  <div class="site-controls" aria-label="Display settings">
    <label class="visually-hidden" for="languageSelect">Language</label>
    <select id="languageSelect" aria-label="Language">
      <option value="en">🇬🇧 English</option><option value="bn">🇧🇩 বাংলা</option>
    </select>
    <label class="visually-hidden" for="themeSelect">Appearance</label>
    <select id="themeSelect" aria-label="Appearance">
      <option value="light">☀ Light</option><option value="dark">◐ Dark</option><option value="night">✦ Night</option>
    </select>
  </div>
</header>
