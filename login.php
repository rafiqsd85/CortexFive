<?php
declare(strict_types=1);
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/db.php';

if (current_user()) { header('Location: dashboard.php'); exit; }
$next = 'dashboard.php';
$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!verify_csrf($_POST['csrf_token'] ?? null)) {
        $error = 'Your sign-in form expired. Please try again.';
    } else {
        $identifier = trim((string)($_POST['username'] ?? ''));
        $password = (string)($_POST['password'] ?? '');
        try {
            $stmt = db()->prepare('SELECT id, username, display_name, role, password_hash FROM app_users WHERE username = ? OR email = ? LIMIT 1');
            $stmt->execute([$identifier, $identifier]);
            $user = $stmt->fetch();
            if ($user && password_verify($password, $user['password_hash'])) {
                sign_in_user($user);
                header('Location: ' . $next); exit;
            }
            $error = 'We could not sign you in with those details.';
        } catch (RuntimeException $e) {
            $error = $e->getMessage();
        } catch (Throwable $e) {
            $error = 'Could not connect to or initialize MySQL. Start MySQL in XAMPP, confirm the connection settings in includes/db.php, and allow the database user to create app_users and bookmarks.';
        }
    }
}
?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#11152e"><title>Sign in · ScholarSearch</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body class="auth-page" data-auth-page="login">
<main class="login-shell">
  <header class="login-top">
    <a class="login-brand" href="index.php"><span class="login-mark">✦</span><span>Scholar<span>Search</span><small>YOUR NEXT CHAPTER STARTS HERE</small></span></a>
    <div class="login-tools"><a href="index.php">← Back to site</a>
      <div class="site-toggles" aria-label="Display preferences">
        <button type="button" id="loginLanguageToggle" class="preference-icon-button language-toggle" aria-label="Switch language" title="Switch language"><svg class="preference-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"></path></svg><span class="language-code" aria-hidden="true">EN</span></button>
        <button type="button" id="loginThemeToggle" class="preference-icon-button theme-control" data-mode="light" aria-label="Change color theme" title="Change color theme"><svg class="preference-icon theme-icon-light" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"></path></svg><svg class="preference-icon theme-icon-dark" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z"></path><path d="M17.5 3v3m-1.5-1.5h3"></path></svg><svg class="preference-icon theme-icon-night" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z"></path><path d="m17.5 3 .5 1.5 1.5.5-1.5.5-.5 1.5L17 5.5l-1.5-.5 1.5-.5.5-1.5Z"></path></svg></button>
      </div>
    </div>
  </header>
  <section class="login-card">
    <aside class="login-story">
      <div class="story-orbit" aria-hidden="true"><span class="story-star s1">✦</span><span class="story-star s2">✧</span><span class="story-star s3">✦</span><div class="story-cap">🎓</div><div class="story-ring"></div></div>
      <p class="login-kicker">A CLEARER WAY FORWARD</p>
      <h1>Your ambition<br><em>deserves support.</em></h1>
      <p class="story-copy">Sign in to find scholarships that fit your journey, save the right opportunities, and plan your next step.</p>
      <div class="story-points"><span><b>01</b> Discover awards that fit</span><span><b>02</b> Keep your shortlist close</span><span><b>03</b> See what to work toward</span></div>
      <div class="story-foot">Made for students in Bangladesh <span>·</span> আপনার স্বপ্ন, আপনার পথ</div>
    </aside>
    <section class="login-form-side">
      <div class="form-heading"><span class="form-kicker">WELCOME BACK</span><h2>Sign in</h2><p>Continue your scholarship search.</p></div>
      <?php if ($error): ?><div class="login-error" role="alert"><?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?></div><?php endif; ?>
      <form method="post" class="login-form" autocomplete="on">
        <input type="hidden" name="csrf_token" value="<?= htmlspecialchars(csrf_token(), ENT_QUOTES, 'UTF-8') ?>">
        <input type="hidden" name="next" value="<?= htmlspecialchars($next, ENT_QUOTES, 'UTF-8') ?>">
        <label for="username">Username or email</label><div class="login-input"><span aria-hidden="true">♙</span><input id="username" name="username" placeholder="Enter your username or email" required autocomplete="username" autofocus></div>
        <label for="password">Password</label><div class="login-input"><span aria-hidden="true">♙</span><input id="password" name="password" type="password" placeholder="Enter your password" required autocomplete="current-password"><button type="button" id="showPassword" aria-label="Show password">◉</button></div>
        <button class="login-submit" type="submit"><span>Sign in to ScholarSearch</span><b aria-hidden="true">→</b></button>
      </form>
      <div class="demo-access"><p>DEMO ACCESS <span>·</span> SELECT TO FILL</p><div class="demo-account-list">
        <button type="button" data-username="student" data-password="student123"><span class="demo-avatar">S</span><span><b>Student account 01</b><small>student · student123</small></span><span class="demo-arrow">↗</span></button>
        <button type="button" data-username="student2" data-password="student2123"><span class="demo-avatar advisor">S</span><span><b>Student account 02</b><small>student2 · student2123</small></span><span class="demo-arrow">↗</span></button>
      </div></div>
      <div class="login-options"><a class="login-signup-link" href="register.php">Create a student account <span aria-hidden="true">→</span></a><a href="forgot-password.php">Forgot password?</a></div>
      <p class="login-security"><span>▣</span> Your profile stays private and is only used to personalize your search.</p>
    </section>
  </section>
  <footer class="login-footer">© <?= date('Y') ?> ScholarSearch <span>·</span> Find a future worth funding.</footer>
</main>
<script>
(() => {
  const user = document.getElementById('username'), pass = document.getElementById('password');
  document.querySelectorAll('[data-username]').forEach((button) => button.addEventListener('click', () => {
    user.value = button.dataset.username; pass.value = button.dataset.password; pass.focus();
  }));
  document.getElementById('showPassword').addEventListener('click', (event) => {
    const visible = pass.type === 'password'; pass.type = visible ? 'text' : 'password';
    event.currentTarget.setAttribute('aria-label', visible ? 'Hide password' : 'Show password');
  });
  const themeToggle = document.getElementById('loginThemeToggle'), languageToggle = document.getElementById('loginLanguageToggle');
  const originals = new WeakMap();
  const copy = {"☀ Light":"☀ হালকা","◐ Dark":"◐ গাঢ়","✦ Night":"✦ রাতের থিম","← Back to site":"← সাইটে ফিরুন","YOUR NEXT CHAPTER STARTS HERE":"আপনার পরবর্তী অধ্যায় এখানেই শুরু","A CLEARER WAY FORWARD":"সামনের পথ হোক পরিষ্কার","Your ambition":"আপনার স্বপ্ন","deserves support.":"যথাযথ সহায়তায় এগিয়ে যাক।","Sign in to find scholarships that fit your journey, save the right opportunities, and plan your next step.":"আপনার যাত্রার উপযোগী বৃত্তি খুঁজতে, পছন্দের সুযোগ সংরক্ষণ করতে এবং পরবর্তী ধাপ ঠিক করতে সাইন ইন করুন।","Discover awards that fit":"উপযোগী বৃত্তি খুঁজুন","Keep your shortlist close":"পছন্দের তালিকা কাছে রাখুন","See what to work toward":"পরবর্তী লক্ষ্য ঠিক করুন","WELCOME BACK":"আবার স্বাগতম","Sign in":"সাইন ইন","Continue your scholarship search.":"বৃত্তি খোঁজা চালিয়ে যান।","Username or email":"ব্যবহারকারীর নাম বা ইমেইল","Enter your username or email":"ব্যবহারকারীর নাম বা ইমেইল লিখুন","Password":"পাসওয়ার্ড","Enter your password":"পাসওয়ার্ড লিখুন","Sign in to ScholarSearch":"ScholarSearch-এ সাইন ইন করুন","Create a student account":"শিক্ষার্থী হিসেবে নিবন্ধন করুন","Forgot password?":"পাসওয়ার্ড ভুলে গেছেন?","DEMO ACCESS":"ডেমো অ্যাক্সেস","SELECT TO FILL":"পূরণ করতে নির্বাচন করুন","Student account 01":"শিক্ষার্থী অ্যাকাউন্ট ০১","Student account 02":"শিক্ষার্থী অ্যাকাউন্ট ০২","Your profile stays private and is only used to personalize your search.":"আপনার প্রোফাইল গোপন থাকে এবং শুধু অনুসন্ধান ব্যক্তিগতকরণে ব্যবহৃত হয়।","Find a future worth funding.":"অর্থায়নের যোগ্য ভবিষ্যৎ খুঁজুন।"};
  const applyTheme = () => {
    const theme = localStorage.getItem('ss_theme') || 'light';
    document.documentElement.dataset.theme = theme; themeToggle.dataset.mode = theme;
    const lang = localStorage.getItem('ss_language') || 'en';
    const names = lang === 'bn' ? {light:'উজ্জ্বল', dark:'গাঢ়', night:'রাত'} : {light:'Light', dark:'Dark', night:'Night'};
    const label = lang === 'bn' ? `বর্তমান থিম: ${names[theme]}। বদলাতে চাপ দিন।` : `Theme: ${names[theme]}. Tap to change.`;
    themeToggle.setAttribute('aria-label', label); themeToggle.title = label;
  };
  const applyLanguage = () => {
    const lang = localStorage.getItem('ss_language') || 'en'; document.documentElement.lang = lang;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let node;
    while ((node = walker.nextNode())) { if (node.parentElement?.closest('.site-toggles')) continue; if (!originals.has(node)) originals.set(node, node.nodeValue); const source = originals.get(node), clean = source.trim(); if (!clean) continue; const at = source.indexOf(clean); node.nodeValue = source.slice(0, at) + (lang === 'bn' ? (copy[clean] || clean) : clean) + source.slice(at + clean.length); }
    document.querySelectorAll('[placeholder]').forEach(el => { if (!el.dataset.enPlaceholder) el.dataset.enPlaceholder = el.placeholder; const value = el.dataset.enPlaceholder; el.placeholder = lang === 'bn' ? (copy[value] || value) : value; });
    languageToggle.querySelector('.language-code').textContent = lang === 'bn' ? 'বাং' : 'EN';
    const label = lang === 'bn' ? 'ভাষা বদলান। বর্তমানে বাংলা।' : 'Switch language. Currently English.';
    languageToggle.setAttribute('aria-label', label); languageToggle.title = label;
    applyTheme();
  };
  languageToggle.addEventListener('click', () => { localStorage.setItem('ss_language', (localStorage.getItem('ss_language') || 'en') === 'en' ? 'bn' : 'en'); applyLanguage(); });
  themeToggle.addEventListener('click', () => { const themes = ['light','dark','night'], current = localStorage.getItem('ss_theme') || 'light'; localStorage.setItem('ss_theme', themes[(themes.indexOf(current) + 1) % themes.length]); applyTheme(); });
  applyLanguage();
})();
</script>
</body></html>
