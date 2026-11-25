<?php
$page = 'home';
$pageTitle = 'ScholarSearch — Find scholarships made for you';
$pageDesc = 'Enter your CGPA and department to see the scholarships you qualify for and the ones you almost do.';
try {
  require_once __DIR__ . '/includes/db.php';
  $data = db()->query('SELECT id, name, provider, min_cgpa, department, need_based, gender, amount_bdt, deadline, description FROM scholarships')->fetchAll();
} catch (Throwable $e) {
  $data = json_decode(file_get_contents(__DIR__ . '/data/scholarships.json'), true) ?: [];
}
$count = count($data);
$providers = array_values(array_unique(array_map(fn($s) => $s['provider'], $data)));
$providerCount = count($providers);
$totalFunding = array_sum(array_map(fn($s) => $s['amount_bdt'], $data));
$largest = max(array_map(fn($s) => $s['amount_bdt'], $data));
$departments = ['All','CSE','EEE','CE','BBA','English'];
$deptMeta = [
  'CSE' => ['💻','Code, AI & software'], 'EEE' => ['⚡','Power & electronics'], 'CE' => ['🏗️','Bridges & cities'],
  'BBA' => ['📈','Business & startups'], 'English' => ['📚','Literature & language'], 'All' => ['🌏','Open to everyone'],
];
$counts = [];
foreach ($departments as $d) {
  $counts[$d] = count(array_filter($data, function($s) use ($d) {
    if ($d === 'All') return $s['department'] === 'All';
    return in_array($d, explode(';', $s['department']), true);
  }));
}
$soon = array_values(array_filter($data, fn($s) => strtotime($s['deadline']) > time()));
usort($soon, fn($a,$b) => strcmp($a['deadline'], $b['deadline']));
$soon = array_slice($soon, 0, 4);
require __DIR__ . '/includes/header.php';
?>
<section class="night-sky hero">
  <div class="aurora" style="left:-10%;top:-10%;height:420px;width:520px;background:var(--night-2)"></div>
  <div class="aurora" style="right:-5%;top:20%;height:360px;width:420px;background:color-mix(in oklab,var(--accent) 40%,transparent);animation-delay:-6s"></div>
  <div class="aurora" style="bottom:10%;left:30%;height:300px;width:500px;background:color-mix(in oklab,var(--success) 30%,transparent);animation-delay:-12s"></div>
  <div id="starsHome" aria-hidden="true"></div>
  <svg class="float-cap" viewBox="0 0 64 48" aria-hidden="true">
    <path d="M32 4 62 18 32 32 2 18Z" fill="var(--secondary)"/>
    <path d="M14 24v12c0 4 8 8 18 8s18-4 18-8V24L32 32Z" fill="color-mix(in oklab, var(--primary-foreground) 90%, transparent)"/>
    <path d="M56 20v14" stroke="var(--secondary)" stroke-width="2.5" fill="none"/>
    <circle cx="56" cy="36" r="3" fill="var(--accent)"/>
  </svg>
  <div class="container hero-grid">
    <div>
      <p class="kicker rise"><span data-language-en="✦ Scholarships for your next chapter" data-language-bn="✦ আপনার পরবর্তী অধ্যায়ের জন্য বৃত্তি">✦ Scholarships for your next chapter</span></p>
      <h1 class="rise" style="--d:.1s"><span data-language-en="Find scholarships" data-language-bn="আপনার জন্য">Find scholarships</span> <em class="shine" data-language-en="that fit your future." data-language-bn="উপযুক্ত বৃত্তি খুঁজুন।">that fit your future.</em></h1>
      <p class="lead rise" id="homeLead" data-awards="<?= (int)$count ?>" data-providers="<?= (int)$providerCount ?>" style="--d:.2s">Share your CGPA and department to explore <?= (int)$count ?> scholarships from <?= (int)$providerCount ?> providers. See why each one fits, plus the opportunities within reach.</p>
      <div class="hero-actions rise" style="--d:.3s">
        <a class="btn btn-gold" href="finder.php">Find my scholarships</a>
        <a class="btn btn-ghost" href="how-it-works.php">How it works</a>
      </div>
      <div class="try-box rise" style="--d:.4s">
        <div class="row"><span style="opacity:.8">Try it — your CGPA</span><span class="cgpa" id="homeCgpaLabel">3.50</span></div>
        <input type="range" min="2" max="4" step="0.01" value="3.5" id="homeCgpa" />
        <p id="homeMatchLine">Loading matches…</p>
      </div>
    </div>
    <div class="rise" style="--d:.3s">
      <div class="hero-orbit">
        <div class="orbit-ring inner">
          <span class="orbit-icon" style="left:50%;top:0%;--t:48s">💡</span>
          <span class="orbit-icon" style="left:100%;top:50%;--t:48s">🏆</span>
        </div>
        <div class="orbit-ring outer">
          <span class="orbit-icon" style="left:50%;top:0%;--t:72s">⭐</span>
          <span class="orbit-icon" style="left:100%;top:50%;--t:72s">🎓</span>
          <span class="orbit-icon" style="left:0%;top:50%;--t:72s">📜</span>
        </div>
        <div class="moon-core"></div>
        <div class="orbit-label">
          <div class="n" id="orbitMatches">—</div>
          <div class="t">matches</div>
        </div>
        <div class="orbit-cards" id="orbitCards"></div>
      </div>
    </div>
  </div>
  <svg class="wave" viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0 80C240 20 480 120 720 70s480-60 720 10v40H0Z"></path></svg>
</section>

<div class="marquee-wrap">
  <div class="marquee">
    <?php foreach (array_merge($providers, $providers) as $n): ?>
      <span>✦ <?= htmlspecialchars($n) ?></span>
    <?php endforeach; ?>
  </div>
</div>

<section class="section paper-grid">
  <div class="container">
    <div class="reveal"><p class="section-label">By the numbers</p><h2 class="section-title">A whole sky of <span class="ink-underline">opportunity</span></h2></div>
    <div class="stats">
      <div class="reveal stat-card"><div class="n"><span data-counter="<?= (int)$count ?>">0</span></div><div class="l">scholarships listed</div></div>
      <div class="reveal stat-card" style="--d:.1s"><div class="n"><span data-counter="<?= (int)$providerCount ?>">0</span></div><div class="l">trusted providers</div></div>
      <div class="reveal stat-card" style="--d:.2s"><div class="n"><span data-counter="<?= (int)$totalFunding ?>" data-prefix="৳">0</span></div><div class="l">total funding</div></div>
      <div class="reveal stat-card" style="--d:.3s"><div class="n"><span data-counter="<?= (int)$largest ?>" data-prefix="৳">0</span></div><div class="l">largest single award</div></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="reveal"><p class="section-label">Pick your path</p><h2 class="section-title">Scholarships for every department</h2></div>
    <div class="dept-grid">
      <?php foreach ($departments as $i => $d): $meta = $deptMeta[$d]; ?>
      <a class="reveal dept-card card-lift" style="--d:<?= $i * 0.08 ?>s" href="finder.php" data-set-dept="<?= htmlspecialchars($d) ?>">
        <div class="top"><span class="icon"><?= $meta[0] ?></span><span class="count"><?= (int)$counts[$d] ?></span></div>
        <h3><?= $d === 'All' ? 'Any department' : htmlspecialchars($d) ?></h3>
        <p><?= htmlspecialchars($meta[1]) ?></p>
        <span class="go">Explore →</span>
      </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<section class="section night-sky">
  <div class="container">
    <div class="reveal"><p class="section-label" style="color:var(--secondary)">What it does</p><h2 class="section-title">More than a list</h2></div>
    <div class="feat-grid">
      <?php
      $feats = [
        ['🎯','Match score','Every award gets a score out of 99 based on your CGPA, department, need and interests.'],
        ['💬','Plain reasons','See in one sentence why a scholarship fits you — no fine print hunting.'],
        ['🪜','Near misses',"Within 0.25 CGPA? We show what's missing so you know what to work on."],
        ['⏳','Deadline radar','Days left on every card, urgent ones glow in coral.'],
        ['🤝','Need-based help','Tick financial support and unlock awards made for you.'],
        ['🔒','Private','Nothing you enter is saved on a server — only in your browser.'],
      ];
      foreach ($feats as $i => [$e,$t,$d]): ?>
      <div class="reveal feat-card" style="--d:<?= ($i%3)*0.1 ?>s">
        <div class="e"><?= $e ?></div>
        <h3><?= htmlspecialchars($t) ?></h3>
        <p><?= htmlspecialchars($d) ?></p>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<section class="section">
  <div class="container deadline-grid">
    <div class="reveal">
      <p class="section-label">Closing soon</p>
      <h2 class="section-title">Don't miss these deadlines</h2>
      <p class="muted" style="margin-top:1rem">The next scholarships to close. Check if you qualify before time runs out.</p>
      <a href="finder.php" class="btn btn-primary" style="margin-top:1.5rem">See all matches</a>
    </div>
    <div class="timeline">
      <?php foreach ($soon as $i => $s): ?>
      <div class="reveal tl-card card-lift" style="--d:<?= $i*0.12 ?>s">
        <span class="dot"></span>
        <div class="row">
          <h3><?= htmlspecialchars($s['name']) ?></h3>
          <span class="amt">৳<?= number_format($s['amount_bdt']) ?></span>
        </div>
        <p class="sub"><?= htmlspecialchars($s['provider']) ?> · closes <?= htmlspecialchars($s['deadline']) ?></p>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="container">
    <div class="reveal cta-band">
      <h2>Your scholarship is <em class="shine">out there</em>.</h2>
      <p>Two minutes. One profile. Every award that fits you.</p>
      <a href="finder.php" class="btn btn-gold">Start finding →</a>
    </div>
  </div>
</section>
<?php require __DIR__ . '/includes/footer.php'; ?>
