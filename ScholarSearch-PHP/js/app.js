
const departments = ["All", "CSE", "EEE", "CE", "BBA", "English"];
const interestOptions = ["research", "project", "leadership", "volunteer", "sports", "women", "rural", "startup"];

let scholarships = [];
let profile = { cgpa: 3.5, department: "CSE", needBased: false, gender: "All", minAmount: 0, search: "", interests: [] };

const translations = {
  "Home":"হোম", "Finder":"খুঁজুন", "Almost there":"প্রায় হয়ে গেছে", "How it works":"কীভাবে কাজ করে",
  "Language":"ভাষা", "Appearance":"দেখার ধরন", "Light":"লাইট", "Dark":"ডার্ক", "Night":"নাইট",
  "☀ Light":"☀ লাইট", "◐ Dark":"◐ ডার্ক", "✦ Night":"✦ নাইট",
  "Your profile":"আপনার প্রোফাইল", "CGPA":"সিজিপিএ", "Department":"বিভাগ", "Gender":"লিঙ্গ",
  "Prefer not to say":"বলতে চাই না", "Female":"নারী", "Male":"পুরুষ", "I need financial support":"আমার আর্থিক সহায়তা দরকার",
  "Minimum amount":"সর্বনিম্ন অর্থ", "Interests":"আগ্রহ", "Any amount":"যেকোনো পরিমাণ", "Need-based":"প্রয়োজনভিত্তিক",
  "Details":"বিস্তারিত", "Less":"কম দেখুন", "matches":"টি মিল", "almost":"টি কাছাকাছি", "days left":"দিন বাকি", "Closed":"সময় শেষ", "Min CGPA":"সর্বনিম্ন সিজিপিএ",
  "Set your profile and see every scholarship you qualify for, scored and explained.":"আপনার প্রোফাইল দিন এবং যোগ্য বৃত্তিগুলো স্কোর ও ব্যাখ্যাসহ দেখুন।",
  "Search by name, provider or keyword…":"নাম, প্রদানকারী বা শব্দ দিয়ে খুঁজুন…", "Nothing here yet — try nudging your profile.":"এখানে কিছু নেই—প্রোফাইলের তথ্য একটু বদলে দেখুন।",
  "Your matches":"আপনার জন্য মিল", "Your CGPA":"আপনার সিজিপিএ", "Open the finder →":"ফাইন্ডার খুলুন →",
  "Find my scholarships":"আমার বৃত্তি খুঁজুন", "How it works":"কীভাবে কাজ করে", "How it":"কীভাবে",
  "Almost":"প্রায়", "there":"হয়ে গেছে", "Four simple steps from profile to application.":"প্রোফাইল থেকে আবেদন পর্যন্ত চারটি সহজ ধাপ।",
  "Scholarship Finder — ScholarSearch":"বৃত্তি অনুসন্ধান — ScholarSearch", "Almost there — ScholarSearch":"প্রায় হয়ে গেছে — ScholarSearch",
  "How it works — ScholarSearch":"কীভাবে কাজ করে — ScholarSearch", "ScholarSearch — Find scholarships made for you":"ScholarSearch — আপনার জন্য বৃত্তি খুঁজুন",
  "ScholarSearch · Made for students in Bangladesh":"ScholarSearch · বাংলাদেশের শিক্ষার্থীদের জন্য",
  "You match":"আপনার সঙ্গে মিলেছে", "awards worth":"বৃত্তি, মোট", "and almost":"এবং কাছাকাছি",
  "Try it — your CGPA":"চেষ্টা করুন — আপনার সিজিপিএ", "matches":"টি মিল",
  "By the numbers":"সংখ্যায়", "A whole sky of":"সম্ভাবনার", "opportunity":"বিশাল দুনিয়া",
  "scholarships listed":"টি বৃত্তি তালিকাভুক্ত", "trusted providers":"টি নির্ভরযোগ্য প্রদানকারী", "total funding":"মোট তহবিল", "largest single award":"সর্বোচ্চ একক বৃত্তি",
  "Pick your path":"আপনার পথ বেছে নিন", "Scholarships for every department":"প্রতিটি বিভাগের জন্য বৃত্তি", "Any department":"যেকোনো বিভাগ", "Explore →":"দেখুন →",
  "What it does":"যা যা আছে", "More than a list":"শুধু তালিকার চেয়েও বেশি", "Closing soon":"শিগগিরই শেষ", "Don't miss these deadlines":"আবেদনের শেষ তারিখ মিস করবেন না",
  "The next scholarships to close. Check if you qualify before time runs out.":"যেসব বৃত্তির সময়সীমা শিগগির শেষ হবে। সময় থাকতে যোগ্যতা যাচাই করুন।",
  "See all matches":"সব মিল দেখুন", "Your scholarship is":"আপনার বৃত্তি", "out there":"অপেক্ষা করছে", "Two minutes. One profile. Every award that fits you.":"দুই মিনিট। একটি প্রোফাইল। আপনার উপযোগী সব বৃত্তি।", "Start finding →":"খোঁজা শুরু করুন →",
  "Share your profile":"প্রোফাইল দিন", "We score every award":"আমরা প্রতিটি বৃত্তির স্কোর করি", "Chase the near misses":"কাছাকাছি বৃত্তিগুলো দেখুন", "Apply before the deadline":"সময়সীমার আগে আবেদন করুন"
  ,"Every scholarship ":"প্রতিটি বৃত্তি ", "deserve":"প্রাপ্য", "found in seconds.":"খুঁজে নিন কয়েক সেকেন্ডে।",
  "Tell us your CGPA and department. We check ":"আপনার সিজিপিএ ও বিভাগ জানান। আমরা যাচাই করি ",
  " awards from ":"টি বৃত্তি, ", " providers, explain why each fits, and show the ones you're just a step away from.":"টি প্রদানকারীর কাছ থেকে, প্রতিটির উপযোগিতা ব্যাখ্যা করি এবং যেগুলো পেতে আর এক ধাপ বাকি সেগুলোও দেখাই।",
  "Code, AI & software":"কোড, এআই ও সফটওয়্যার", "Power & electronics":"বিদ্যুৎ ও ইলেকট্রনিক্স", "Bridges & cities":"সেতু ও নগর", "Business & startups":"ব্যবসা ও স্টার্টআপ", "Literature & language":"সাহিত্য ও ভাষা", "Open to everyone":"সবার জন্য উন্মুক্ত",
  "Match score":"মিলের স্কোর", "Every award gets a score out of 99 based on your CGPA, department, need and interests.":"সিজিপিএ, বিভাগ, আর্থিক প্রয়োজন ও আগ্রহ অনুযায়ী প্রতিটি বৃত্তি ৯৯-এর মধ্যে স্কোর পায়।",
  "Plain reasons":"সহজ ব্যাখ্যা", "See in one sentence why a scholarship fits you — no fine print hunting.":"একটি বাক্যে জানুন কেন বৃত্তিটি আপনার উপযোগী—জটিল শর্ত খুঁজতে হবে না।",
  "Near misses":"কাছাকাছি সুযোগ", "Within 0.25 CGPA? We show what's missing so you know what to work on.":"সিজিপিএর ব্যবধান ০.২৫-এর মধ্যে? কী ঘাটতি আছে দেখিয়ে দেব, যাতে আপনি প্রস্তুতি নিতে পারেন।",
  "Deadline radar":"সময়সীমার খবর", "Days left on every card, urgent ones glow in coral.":"প্রতিটি কার্ডে বাকি দিনের হিসাব থাকে, জরুরি সময়সীমা আলাদা করে দেখানো হয়।",
  "Need-based help":"আর্থিক প্রয়োজনভিত্তিক সহায়তা", "Tick financial support and unlock awards made for you.":"আর্থিক সহায়তা বেছে নিলে আপনার জন্য উপযোগী বৃত্তিগুলো দেখুন।",
  "Private":"গোপনীয়", "Nothing you enter is saved on a server — only in your browser.":"আপনার দেওয়া তথ্য সার্ভারে জমা হয় না—শুধু আপনার ব্রাউজারে থাকে।",
  "CGPA, department, need and interests — nothing is stored on a server.":"সিজিপিএ, বিভাগ, আর্থিক প্রয়োজন ও আগ্রহ—কোনো তথ্য সার্ভারে জমা হয় না।",
  "Start at 70, plus up to 15 for CGPA above the bar, 8 for a department-specific award, 7 for need-based fit and 4 per matching interest.":"স্কোর ৭০ থেকে শুরু। প্রয়োজনের চেয়ে বেশি সিজিপিএতে সর্বোচ্চ ১৫, বিভাগভিত্তিক বৃত্তিতে ৮, আর্থিক প্রয়োজনে ৭ এবং মেলা প্রতিটি আগ্রহে ৪ পয়েন্ট যোগ হয়।",
  "If you're within 0.25 CGPA or miss one or two rules, it shows in Almost there with what's missing.":"সিজিপিএর ব্যবধান ০.২৫-এর মধ্যে থাকলে বা এক-দুটি শর্ত না মিললে, কী বাকি আছে তা ‘প্রায় হয়ে গেছে’ পাতায় দেখানো হয়।",
  "Each card shows days left, so the urgent ones stand out in coral.":"প্রতিটি কার্ডে সময়সীমা পর্যন্ত বাকি দিন দেখা যায়, তাই জরুরি বৃত্তি সহজে চোখে পড়ে।",
  "Your CGPA ":"আপনার সিজিপিএ ", " clears the ":" পূরণ করে; প্রয়োজনীয় মান ", " bar":"", "it's built for ":"এটি উপযোগী ", " students":" শিক্ষার্থীদের জন্য", "it supports students with financial need":"এটি আর্থিক সহায়তাপ্রার্থী শিক্ষার্থীদের পাশে থাকে",
  "So close — ":"প্রায় মিলে গেছে — ", ". Fix this and it's yours to chase.":"। এটি ঠিক করলে আপনি আবেদন করতে পারবেন।"
};
const sourceTextNodes = new WeakMap();
const translate = (value) => localStorage.getItem("ss_language") === "bn" ? (translations[value] || value) : value;

function translateContent(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let textNode;
  while ((textNode = walker.nextNode())) {
    const parent = textNode.parentElement;
    if (!parent || parent.closest("script, style, [data-live]")) continue;
    if (!sourceTextNodes.has(textNode)) sourceTextNodes.set(textNode, textNode.nodeValue);
    const source = sourceTextNodes.get(textNode);
    const trimmed = source.trim();
    if (!trimmed) continue;
    const start = source.indexOf(trimmed), end = start + trimmed.length;
    textNode.nodeValue = source.slice(0, start) + translate(trimmed) + source.slice(end);
  }
}

function applyPreferences() {
  const lang = localStorage.getItem("ss_language") || "en";
  const theme = localStorage.getItem("ss_theme") || "light";
  document.documentElement.lang = lang;
  document.documentElement.dataset.theme = theme;
  const langSelect = document.getElementById("languageSelect");
  const themeSelect = document.getElementById("themeSelect");
  if (langSelect) langSelect.value = lang;
  if (themeSelect) themeSelect.value = theme;
  translateContent(document.body);
  document.querySelectorAll("[placeholder]").forEach((el) => {
    if (!el.dataset.originalPlaceholder) el.dataset.originalPlaceholder = el.placeholder;
    el.placeholder = translate(el.dataset.originalPlaceholder);
  });
}

function bindPreferences() {
  document.getElementById("languageSelect")?.addEventListener("change", (e) => {
    localStorage.setItem("ss_language", e.target.value); applyPreferences();
    if (["finder", "almost"].includes(document.body.dataset.page)) {
      const panel = document.getElementById("profilePanel");
      if (panel) { delete panel.dataset.ready; delete panel.dataset.controlsBound; }
      renderResults(document.body.dataset.page === "finder" ? "q" : "n"); applyPreferences();
    }
  });
  document.getElementById("themeSelect")?.addEventListener("change", (e) => {
    localStorage.setItem("ss_theme", e.target.value); applyPreferences();
  });
}

const tk = (n) => "৳" + Number(n).toLocaleString("en-US");
const daysLeft = (d) => Math.ceil((new Date(d).getTime() - Date.now()) / 86400000);

function findMatches(p, list = scholarships) {
  const qualified = [], near = [];
  const q = (p.search || "").trim().toLowerCase();
  for (const s of list) {
    if (p.minAmount > 0 && s.amount_bdt < p.minAmount) continue;
    const desc = (s.description || "").toLowerCase();
    if (q && ![s.name, s.provider, s.description].some((t) => String(t).toLowerCase().includes(q))) continue;
    const depts = String(s.department).split(";");
    const deptOk = s.department === "All" || p.department === "All" || depts.includes(p.department);
    const cgpaOk = p.cgpa >= s.min_cgpa;
    const diff = Math.round((s.min_cgpa - p.cgpa) * 100) / 100;
    const genderOk = s.gender === "All" || p.gender === "All" || s.gender === p.gender;
    const needOk = s.need_based === "no" || p.needBased;
    if (deptOk && cgpaOk && genderOk && needOk) {
      let score = 70 + Math.min(15, Math.trunc((p.cgpa - s.min_cgpa) * 25));
      if (s.department !== "All" && depts.includes(p.department)) score += 8;
      if (s.need_based === "yes" && p.needBased) score += 7;
      for (const i of p.interests) if (desc.includes(i.toLowerCase())) score += 4;
      qualified.push({ ...s, status: "qualified", score: Math.min(99, score), shortfalls: [] });
    } else {
      const sf = [];
      if (!cgpaOk) {
        if (diff > 0.25) continue;
        sf.push(`CGPA ${diff.toFixed(2)} short (needs ${s.min_cgpa.toFixed(2)})`);
      }
      if (!deptOk) sf.push(`For ${depts.join(", ")} students`);
      if (!needOk) sf.push("Requires financial need");
      if (!genderOk) sf.push(`Only for ${s.gender} applicants`);
      if (sf.length <= 2) near.push({ ...s, status: "near_miss", score: Math.max(45, 65 - Math.trunc(Math.max(0, diff) * 50)), shortfalls: sf });
    }
  }
  const by = (a, b) => b.score - a.score || b.amount_bdt - a.amount_bdt;
  return { qualified: qualified.sort(by), near: near.sort(by) };
}

function explain(m, p) {
  if (m.status === "near_miss") return `So close — ${m.shortfalls.join(" · ")}. Fix this and it's yours to chase.`;
  const bits = [`Your CGPA ${p.cgpa.toFixed(2)} clears the ${m.min_cgpa.toFixed(2)} bar`];
  if (m.department !== "All" && String(m.department).split(";").includes(p.department)) bits.push(`it's built for ${p.department}`);
  if (m.need_based === "yes") bits.push("it supports students with financial need");
  return bits.join(", ") + ".";
}

function loadProfile() {
  try { const raw = localStorage.getItem("ss_profile"); if (raw) profile = { ...profile, ...JSON.parse(raw) }; } catch (_) {}
}
function saveProfile() {
  try { localStorage.setItem("ss_profile", JSON.stringify(profile)); } catch (_) {}
}

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
}

function starsHTML() {
  let s = "";
  for (let i = 0; i < 90; i++) {
    const l = (i * 37) % 100, t = (i * 53) % 100, tt = 2 + (i % 5), d = (i % 7) * 0.4;
    s += `<span class="star" style="left:${l}%;top:${t}%;--t:${tt}s;--d:${d}s"></span>`;
  }
  s += `<span class="shooting" style="right:10%;top:12%"></span><span class="shooting" style="right:35%;top:6%;--d:3s"></span>`;
  return s;
}

function ringSVG(value, tone) {
  const c = 2 * Math.PI * 22;
  const stroke = tone === "q" ? "var(--success)" : "var(--secondary)";
  const off = c * (1 - value / 100);
  return `<div class="ring"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="none" stroke="var(--muted)" stroke-width="5"/>
    <circle cx="26" cy="26" r="22" fill="none" stroke="${stroke}" stroke-width="5" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${off}"/></svg>
    <span>${value}</span></div>`;
}

function cardHTML(m, i) {
  const dl = daysLeft(m.deadline);
  const near = m.status !== "qualified";
  const tags = [
    `<span class="tag gold">${tk(m.amount_bdt)}</span>`,
    `<span class="tag">${translate("Min CGPA")} ${Number(m.min_cgpa).toFixed(2)}</span>`,
    `<span class="tag">${escapeHtml(String(m.department).replaceAll(";"," · "))}</span>`,
  ];
  if (m.need_based === "yes") tags.push(`<span class="tag">${translate("Need-based")}</span>`);
  if (m.gender !== "All") tags.push(`<span class="tag">${escapeHtml(m.gender)}</span>`);
  return `<article class="card rise card-lift" style="--d:${Math.min(i,10)*0.05}s">
    <div class="card-top">${ringSVG(m.score, near ? "n" : "q")}
      <div><p class="provider">${escapeHtml(m.provider)}</p><h3>${escapeHtml(m.name)}</h3></div>
    </div>
    <div class="tags">${tags.join("")}</div>
    <p class="reason ${near ? "near" : ""}">✦ ${escapeHtml(explain(m, profile))}</p>
    <p class="details">${escapeHtml(m.description)}</p>
    <div class="card-foot">
      <span class="${dl < 30 ? "urgent" : "ok"}">${dl > 0 ? dl + " " + translate("days left") : translate("Closed")} · ${m.deadline}</span>
      <button type="button" class="details-btn" style="font-weight:600;color:var(--primary);text-decoration:underline;text-underline-offset:3px">${translate("Details")}</button>
    </div>
  </article>`;
}

function profilePanelHTML() {
  const deptBtns = departments.map(d =>
    `<button type="button" class="chip ${profile.department===d?"on":""}" data-dept="${d}">${d}</button>`
  ).join("");
  const interestBtns = interestOptions.map(t =>
    `<button type="button" class="chip-sm ${profile.interests.includes(t)?"on":""}" data-interest="${t}">${t}</button>`
  ).join("");
  const amounts = [0,10000,20000,30000,50000].map(v =>
    `<option value="${v}" ${profile.minAmount===v?"selected":""}>${v ? tk(v)+"+" : "Any amount"}</option>`
  ).join("");
  return `<aside class="panel rise">
    <h2>Your profile</h2>
    <label>CGPA <span class="cgpa-val" id="cgpaVal">${profile.cgpa.toFixed(2)}</span></label>
    <input type="range" min="2" max="4" step="0.01" value="${profile.cgpa}" id="cgpa" />
    <label>Department</label>
    <div class="chips" id="deptChips">${deptBtns}</div>
    <label>Gender</label>
    <select id="gender" class="field">
      <option value="All" ${profile.gender==="All"?"selected":""}>Prefer not to say</option>
      <option value="Female" ${profile.gender==="Female"?"selected":""}>Female</option>
      <option value="Male" ${profile.gender==="Male"?"selected":""}>Male</option>
    </select>
    <label class="need-row">I need financial support
      <input type="checkbox" id="needBased" ${profile.needBased?"checked":""} style="width:1.25rem;height:1.25rem;accent-color:var(--primary)" />
    </label>
    <label>Minimum amount</label>
    <select id="minAmount" class="field">${amounts}</select>
    <label>Interests</label>
    <div class="chips" id="interestChips">${interestBtns}</div>
  </aside>`;
}

function bindProfileControls(onChange) {
  const cgpa = document.getElementById("cgpa");
  if (cgpa) cgpa.addEventListener("input", () => {
    profile.cgpa = +cgpa.value;
    const el = document.getElementById("cgpaVal"); if (el) el.textContent = profile.cgpa.toFixed(2);
    saveProfile(); scheduleResults(onChange);
  });
  if (cgpa) cgpa.addEventListener("change", () => flushScheduledResults(onChange));
  document.querySelectorAll("[data-dept]").forEach(btn => btn.addEventListener("click", () => {
    profile.department = btn.dataset.dept; saveProfile(); onChange();
  }));
  const gender = document.getElementById("gender");
  if (gender) gender.addEventListener("change", () => { profile.gender = gender.value; saveProfile(); onChange(); });
  const need = document.getElementById("needBased");
  if (need) need.addEventListener("change", () => { profile.needBased = need.checked; saveProfile(); onChange(); });
  const minA = document.getElementById("minAmount");
  if (minA) minA.addEventListener("change", () => { profile.minAmount = +minA.value; saveProfile(); onChange(); });
  document.querySelectorAll("[data-interest]").forEach(btn => btn.addEventListener("click", () => {
    const t = btn.dataset.interest;
    profile.interests = profile.interests.includes(t) ? profile.interests.filter(x => x !== t) : [...profile.interests, t];
    saveProfile(); onChange();
  }));
}

let pendingResultsTimer = 0;
function scheduleResults(callback, delay = 140) {
  window.clearTimeout(pendingResultsTimer);
  pendingResultsTimer = window.setTimeout(callback, delay);
}
function flushScheduledResults(callback) {
  window.clearTimeout(pendingResultsTimer);
  pendingResultsTimer = 0;
  callback();
}

function bindDetailsButtons(root) {
  root.querySelectorAll(".details-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const art = btn.closest("article");
      const d = art.querySelector(".details");
      const open = d.style.display === "block";
      d.style.display = open ? "none" : "block";
      btn.textContent = translate(open ? "Details" : "Less");
    });
  });
}

function renderResults(kind) {
  const r = findMatches(profile);
  const list = kind === "q" ? r.qualified : r.near;
  const panel = document.getElementById("profilePanel");
  const grid = document.getElementById("resultsGrid");
  const count = document.getElementById("resultCount");
  if (panel && !panel.dataset.ready) {
    panel.innerHTML = profilePanelHTML(); panel.dataset.ready = "1";
    translateContent(panel);
  }
  if (count) count.textContent = `${list.length} ${translate(kind === "q" ? "matches" : "almost")}`;
  if (grid) {
    grid.innerHTML = list.length
      ? list.map((m, i) => cardHTML(m, i)).join("")
      : `<p class="empty rise">${translate("Nothing here yet — try nudging your profile.")}</p>`;
    bindDetailsButtons(grid);
    translateContent(grid);
  }
  if (panel && !panel.dataset.controlsBound) {
    bindProfileControls(() => renderResults(kind));
    panel.dataset.controlsBound = "1";
  }
  const search = document.getElementById("searchInput");
  if (search && !search._bound) {
    search._bound = true;
    search.value = profile.search || "";
    search.addEventListener("input", () => {
      profile.search = search.value; saveProfile(); scheduleResults(() => renderResults(kind), 120);
    });
  }
}

function initReveal() {
  document.querySelectorAll(".reveal").forEach(el => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
  });
}

function initHome() {
  const starsEl = document.getElementById("starsHome");
  if (starsEl) starsEl.innerHTML = starsHTML();
  const cgpaHome = document.getElementById("homeCgpa");
  const cgpaLabel = document.getElementById("homeCgpaLabel");
  const matchLine = document.getElementById("homeMatchLine");
  const matchCount = document.getElementById("orbitMatches");
  const orbitCards = document.getElementById("orbitCards");
  function refreshHome() {
    const rr = findMatches(profile);
    const tot = rr.qualified.reduce((a, b) => a + b.amount_bdt, 0);
    if (cgpaLabel) cgpaLabel.textContent = profile.cgpa.toFixed(2);
    if (matchLine) matchLine.innerHTML = `${translate("You match")} <b>${rr.qualified.length}</b> ${translate("awards worth")} <b>${tk(tot)}</b>, ${translate("and almost")} ${rr.near.length} ${translate("matches")}.`;
    if (matchCount) matchCount.textContent = rr.qualified.length;
    if (orbitCards) {
      orbitCards.innerHTML = rr.qualified.slice(0, 3).map((m, i) =>
        `<div class="orbit-card floaty" style="--d:${0.5+i*0.15}s;--t:${6+i}s;margin-left:${8+i*4}%">
          <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-right:.75rem">${escapeHtml(m.name)}</span>
          <span class="score">${m.score}%</span>
        </div>`
      ).join("");
    }
  }
  if (cgpaHome) {
    cgpaHome.value = profile.cgpa;
    cgpaHome.addEventListener("input", () => { profile.cgpa = +cgpaHome.value; saveProfile(); refreshHome(); });
  }
  document.querySelectorAll("[data-set-dept]").forEach(a => {
    a.addEventListener("click", () => { profile.department = a.dataset.setDept; saveProfile(); });
  });
  refreshHome();
  document.querySelectorAll("[data-counter]").forEach(el => {
    const to = +el.dataset.counter;
    const prefix = el.dataset.prefix || "";
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const k = Math.min(1, (t - t0) / 1400);
        el.textContent = prefix + Math.round(to * (1 - Math.pow(1 - k, 3))).toLocaleString("en-US");
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
  });
  initReveal();
}

async function boot() {
  applyPreferences(); bindPreferences();
  loadProfile();
  const res = await fetch("data/scholarships.json");
  scholarships = await res.json();
  const page = document.body.dataset.page;
  const starsPage = document.getElementById("starsPage");
  if (starsPage) starsPage.innerHTML = starsHTML();
  if (page === "home") initHome();
  if (page === "finder") renderResults("q");
  if (page === "almost") renderResults("n");
  if (page === "how") initReveal();
}

boot();
