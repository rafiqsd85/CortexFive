
const departments = ["All", "CSE", "EEE", "CE", "BBA", "English"];
const interestOptions = ["research", "project", "leadership", "volunteer", "sports", "women", "rural", "startup"];

let scholarships = [];
let dataLoadError = "";
let profile = { cgpa: 3.5, department: "CSE", needBased: false, gender: "All", minAmount: 0, search: "", interests: [] };
const savedIds = new Set();
const profileStorageKey = `ss_profile_${document.body.dataset.userId || "guest"}`;
const compareKey = `ss_compare_${document.body.dataset.userId || "guest"}`;
let compareIds = new Set();
try { compareIds = new Set(JSON.parse(localStorage.getItem(compareKey) || "[]").map(Number)); } catch (_) { compareIds = new Set(); }

const translations = {
  "Home":"হোম", "Finder":"বৃত্তি খুঁজুন", "🔎 Finder":"🔎 বৃত্তি খুঁজুন", "Almost there":"যোগ্যতার কাছাকাছি", "✨ Almost there":"✨ প্রায় যোগ্য", "How it works":"কীভাবে কাজ করে", "How it":"কীভাবে", "works":"কাজ করে", "Your":"আপনার জন্য", "you":"",
  "Language":"ভাষা", "Appearance":"দেখার ধরন", "Light":"হালকা", "Dark":"গাঢ়", "Night":"রাতের থিম", "☀️ Light":"☀️ হালকা", "◐️ Dark":"◐️ গাঢ়", "🌙 Night":"🌙 রাতের থিম",
  "All":"সব বিভাগ", "English":"ইংরেজি", "research":"গবেষণা", "project":"প্রকল্প", "leadership":"নেতৃত্ব", "volunteer":"স্বেচ্ছাসেবা", "sports":"খেলাধুলা", "women":"নারী", "rural":"গ্রামীণ", "startup":"নতুন উদ্যোগ",
  "Gap analyzer":"যোগ্যতার ব্যবধান", "☆ Bookmarks":"☆ সংরক্ষিত", "⇄ Compare":"⇄ তুলনা", "Bookmarks":"সংরক্ষিত বৃত্তি", "Compare":"তুলনা করুন", "Sign in":"সাইন ইন", "Sign out":"সাইন আউট",
  "YOUR SHORTLIST":"আপনার সংরক্ষিত তালিকা", "Saved":"সংরক্ষিত", "scholarships":"বৃত্তি", "Keep the opportunities you care about in one place.":"আপনার পছন্দের সুযোগগুলো এক জায়গায় রাখুন।",
  "YOUR COLLECTION":"আপনার সংগ্রহ", "Opportunities worth keeping":"সংরক্ষণ করার মতো সুযোগ", "Find more scholarships →":"আরও বৃত্তি খুঁজুন →", "Your shortlist is ready":"আপনার তালিকা তৈরি", "Save scholarships from Finder and they will appear here.":"ফাইন্ডার থেকে বৃত্তি সংরক্ষণ করুন, এখানে দেখা যাবে।", "Explore scholarships →":"বৃত্তি দেখুন →",
  "MAKE A CLEAR CHOICE":"সঠিকটি বেছে নিন", "Select up to three scholarships from Finder to compare them side by side.":"ফাইন্ডার থেকে সর্বোচ্চ তিনটি বৃত্তি বেছে পাশাপাশি তুলনা করুন।", "SIDE BY SIDE":"পাশাপাশি তুলনা", "What matters to you?":"আপনার কাছে কোনটি গুরুত্বপূর্ণ?", "Back to Finder →":"ফাইন্ডারে ফিরুন →", "Start a comparison":"তুলনা শুরু করুন", "Choose up to three scholarships in Finder, then compare their requirements and details here.":"ফাইন্ডারে সর্বোচ্চ তিনটি বৃত্তি বেছে নিন, তারপর এখানে শর্ত ও বিবরণ তুলনা করুন।", "Open Finder →":"ফাইন্ডার খুলুন →", "Details":"বিবরণ", "Amount":"অর্থের পরিমাণ", "Minimum CGPA":"সর্বনিম্ন সিজিপিএ", "Department":"বিভাগ", "Need based":"আর্থিক প্রয়োজনভিত্তিক", "Yes":"হ্যাঁ", "No":"না", "Deadline":"শেষ তারিখ", "Description":"বিবরণ",
  "A PLAN FOR YOUR NEXT STEP":"পরবর্তী ধাপের পরিকল্পনা", "Eligibility":"যোগ্যতা", "gap analyzer":"ব্যবধান বিশ্লেষক", "See exactly what is missing, including CGPA distance, and focus on the scholarships you can work toward.":"সিজিপিএসহ কোন শর্তগুলো বাকি তা দেখুন এবং যেসব বৃত্তির জন্য প্রস্তুতি নিতে পারবেন সেগুলোতে মনোযোগ দিন।", "BASED ON YOUR PROFILE":"আপনার প্রোফাইল অনুযায়ী", "Your gap, made clear.":"যোগ্যতার ব্যবধান স্পষ্টভাবে দেখুন।", "Update my profile →":"প্রোফাইল আপডেট করুন →", "Opportunities analyzed":"বিশ্লেষণ করা সুযোগ", "Already eligible":"ইতিমধ্যে যোগ্য", "Within reach":"কাছাকাছি সুযোগ", "NEXT BEST STEPS":"পরবর্তী পদক্ষেপ", "Requirements to work toward":"যে শর্তগুলো পূরণে কাজ করবেন", "Show":"দেখান", "All gaps":"সব ব্যবধান", "Within 0.25 CGPA":"০.২৫ সিজিপিএর মধ্যে", "Department gaps":"বিভাগের শর্ত", "No gaps match this filter":"এই ফিল্টারে কোনো ব্যবধান নেই", "Try another filter or update your profile.":"অন্য ফিল্টার দিন বা প্রোফাইল আপডেট করুন।", "CGPA gap":"সিজিপিএ ব্যবধান", "No CGPA gap":"সিজিপিএ ব্যবধান নেই", "Raise CGPA by":"সিজিপিএ বাড়াতে হবে", "Saved for later.":"পরে দেখার জন্য সংরক্ষিত।",
  "ScholarSearch assistant":"ScholarSearch সহায়ক", "Answers from your scholarship list":"আপনার বৃত্তির তালিকা থেকে উত্তর দেয়", "AI-powered · grounded in your scholarship list":"এআই-চালিত · বৃত্তির তালিকাভিত্তিক", "Hi! Ask me about matches, eligibility, deadlines, or a scholarship by name.":"মিল, যোগ্যতা, শেষ তারিখ বা বৃত্তির নাম সম্পর্কে প্রশ্ন করুন।", "Hi! Ask me about matches, eligibility, deadlines, funding, or a scholarship by name. I use your profile and the live scholarship catalogue.":"মিল, যোগ্যতা, শেষ তারিখ, অর্থায়ন বা বৃত্তির নাম জিজ্ঞাসা করুন। আমি আপনার প্রোফাইল ও লাইভ বৃত্তির তালিকা ব্যবহার করি।", "Ask about scholarships…":"বৃত্তি সম্পর্কে জিজ্ঞাসা করুন…", "Ask ScholarSearch":"ScholarSearch-কে জিজ্ঞাসা করুন", "Matches for me":"আমার মিল", "Upcoming deadlines":"আসন্ন শেষ তারিখ", "Improve eligibility":"যোগ্যতা উন্নত করুন",

  "Dashboard":"ড্যাশবোর্ড", "YOUR SCHOLARSHIP JOURNEY":"আপনার বৃত্তির যাত্রা", "Welcome back, ":"আবার স্বাগতম, ", "Your student dashboard brings your next steps together.":"আপনার শিক্ষার্থী ড্যাশবোর্ডে পরবর্তী পদক্ষেপগুলো একসাথে পাবেন।", "Find scholarships":"বৃত্তি খুঁজুন", "Current matches":"বর্তমান মিল", "based on your profile":"আপনার প্রোফাইল অনুযায়ী", "Saved scholarships":"সংরক্ষিত বৃত্তি", "in your personal shortlist":"আপনার ব্যক্তিগত তালিকায়", "Comparing":"তুলনা করছেন", "of 3 side-by-side slots":"পাশাপাশি তুলনার ৩টির মধ্যে", "Profile CGPA":"প্রোফাইলের সিজিপিএ", "set your department":"বিভাগ নির্বাচন করুন", "YOUR WORKSPACE":"আপনার কর্মক্ষেত্র", "Plan your next move":"পরবর্তী পদক্ষেপ ঠিক করুন", "All your tools, in one place":"সব সরঞ্জাম এক জায়গায়", "DISCOVER":"খুঁজুন", "Scholarship finder":"বৃত্তি অনুসন্ধান", "See awards matched to your CGPA, department and interests.":"সিজিপিএ, বিভাগ ও আগ্রহের সঙ্গে মেলা বৃত্তি দেখুন।", "Explore matches":"মিলগুলো দেখুন", "YOUR SHORTLIST":"আপনার সংরক্ষিত তালিকা", "Bookmarks":"সংরক্ষিত বৃত্তি", "Keep promising scholarships close and revisit them anytime.":"সম্ভাবনাময় বৃত্তি সংরক্ষণ করুন এবং যেকোনো সময় ফিরে দেখুন।", "View saved awards":"সংরক্ষিত বৃত্তি দেখুন", "YOUR NEXT STEP":"আপনার পরবর্তী পদক্ষেপ", "Eligibility gap analyzer":"যোগ্যতার ব্যবধান বিশ্লেষক", "Understand what is missing and how far you are from qualifying.":"কোন শর্তগুলো বাকি এবং যোগ্য হতে কতটা দূর তা জানুন।", "See your opportunities":"সুযোগগুলো দেখুন", "DECIDE WITH CONFIDENCE":"নিশ্চিতভাবে সিদ্ধান্ত নিন", "Compare scholarships":"বৃত্তি তুলনা", "Compare up to three awards, requirements and deadlines side by side.":"সর্বোচ্চ তিনটি বৃত্তির শর্ত ও শেষ তারিখ পাশাপাশি তুলনা করুন।", "Open comparison":"তুলনা খুলুন", "A GOOD PLACE TO START":"শুরু করার ভালো জায়গা", "Matched for your profile":"আপনার প্রোফাইলের সঙ্গে মিলেছে", "See all matches →":"সব মিল দেখুন →", "Need a hand?":"সাহায্য দরকার?", "Ask a question →":"প্রশ্ন করুন →", "No matches yet":"এখনো কোনো মিল নেই", "Update your CGPA or profile preferences in Finder to explore more awards.":"আরও বৃত্তি দেখতে ফাইন্ডারে সিজিপিএ বা পছন্দ আপডেট করুন।", "Update profile →":"প্রোফাইল আপডেট করুন →",
  "🌐️ English":"🇬🇧 English", "🌐️ বাংলা":"🇧🇩 বাংলা", "🇬🇧 English":"🇬🇧 English", "🇧🇩 বাংলা":"🇧🇩 বাংলা", "☀️ Light":"☀️ হালকা", "◐️ Dark":"◐️ গাঢ়", "🌙 Night":"🌙 রাতের থিম",
  "Your profile":"আপনার প্রোফাইল", "CGPA":"সিজিপিএ", "CGPA help":"আপনার সিজিপিএ লিখুন। এর ভিত্তিতে আপনার জন্য উপযুক্ত ও কাছাকাছি বৃত্তিগুলো দেখানো হবে।", "Department":"বিভাগ", "Gender":"লিঙ্গ",
  "Prefer not to say":"উল্লেখ করতে চাই না", "Female":"নারী", "Male":"পুরুষ", "I need financial support":"আমার আর্থিক সহায়তা প্রয়োজন",
  "Minimum amount":"ন্যূনতম বৃত্তির পরিমাণ", "Interests":"আগ্রহ", "Any amount":"যেকোনো পরিমাণ", "Need-based":"আর্থিক প্রয়োজনভিত্তিক",
  "Details":"বিস্তারিত", "Less":"সংক্ষেপে দেখুন", "matches":"বৃত্তি", "almost":"কাছাকাছি সুযোগ", "days left":"দিন বাকি", "Closed":"আবেদনের সময় শেষ", "Min CGPA":"সর্বনিম্ন সিজিপিএ",
  "CGPA helps us compare your academic result with each scholarship requirement.":"আপনার সিজিপিএর সঙ্গে প্রতিটি বৃত্তির ন্যূনতম শর্ত মিলিয়ে দেখতে এটি ব্যবহার করা হয়।",
  "Set your profile and see every scholarship you qualify for, scored and explained.":"আপনার শিক্ষাগত তথ্য দিন। যোগ্য বৃত্তিগুলো মিলের স্কোর ও কারণসহ দেখুন।",
  "Search by name, provider or keyword…":"নাম, প্রদানকারী বা শব্দ দিয়ে খুঁজুন…", "Nothing here yet — try nudging your profile.":"এখানে কিছু নেই—প্রোফাইলের তথ্য একটু বদলে দেখুন।",
  "Your matches":"আপনার জন্য মিল", "Your CGPA":"আপনার সিজিপিএ", "Open the finder →":"ফাইন্ডার খুলুন →",
  "Find my scholarships":"আমার বৃত্তি খুঁজুন", "How it works":"কীভাবে কাজ করে", "How it":"কীভাবে",
  "Almost":"যোগ্যতার", "there":"কাছাকাছি", "Four simple steps from profile to application.":"প্রোফাইল থেকে আবেদন পর্যন্ত চারটি সহজ ধাপ।",
  "Scholarship Finder — ScholarSearch":"বৃত্তি অনুসন্ধান — ScholarSearch", "Almost there — ScholarSearch":"যোগ্যতার কাছাকাছি — ScholarSearch",
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
  "Share your profile":"প্রোফাইলের তথ্য দিন", "We score every award":"প্রতিটি বৃত্তির উপযোগিতা যাচাই করি", "Chase the near misses":"কাছাকাছি সুযোগগুলোর জন্য প্রস্তুতি নিন", "Apply before the deadline":"শেষ তারিখের আগে আবেদন করুন",
  "Every scholarship":"আপনার জন্য উপযুক্ত", "deserve":"বৃত্তি", "found in seconds.":"মুহূর্তেই খুঁজে নিন।",
  "Tell us your CGPA and department. We check":"আপনার সিজিপিএ ও বিভাগ জানান। আমরা যাচাই করি",
  "awards from":"টি বৃত্তি, ", "providers, explain why each fits, and show the ones you're just a step away from.":"টি প্রদানকারীর তালিকা থেকে উপযুক্ত বৃত্তি ও তার কারণ দেখাই; কাছাকাছি সুযোগগুলোও তুলে ধরি।",
  "Code, AI & software":"কোড, এআই ও সফটওয়্যার", "Power & electronics":"বিদ্যুৎ ও ইলেকট্রনিক্স", "Bridges & cities":"সেতু ও নগর", "Business & startups":"ব্যবসা ও স্টার্টআপ", "Literature & language":"সাহিত্য ও ভাষা", "Open to everyone":"সবার জন্য উন্মুক্ত",
  "Match score":"মিলের স্কোর", "Every award gets a score out of 99 based on your CGPA, department, need and interests.":"সিজিপিএ, বিভাগ, আর্থিক প্রয়োজন ও আগ্রহ অনুযায়ী প্রতিটি বৃত্তি ৯৯-এর মধ্যে স্কোর পায়।",
  "Plain reasons":"সহজ ব্যাখ্যা", "See in one sentence why a scholarship fits you — no fine print hunting.":"একটি বাক্যে জানুন কেন বৃত্তিটি আপনার উপযোগী—জটিল শর্ত খুঁজতে হবে না।",
  "Near misses":"কাছাকাছি সুযোগ", "Within 0.25 CGPA? We show what's missing so you know what to work on.":"সিজিপিএর ব্যবধান ০.২৫-এর মধ্যে? কী ঘাটতি আছে দেখিয়ে দেব, যাতে আপনি প্রস্তুতি নিতে পারেন।",
  "Deadline radar":"সময়সীমার খবর", "Days left on every card, urgent ones glow in coral.":"প্রতিটি কার্ডে বাকি দিনের হিসাব থাকে, জরুরি সময়সীমা আলাদা করে দেখানো হয়।",
  "Need-based help":"আর্থিক প্রয়োজনভিত্তিক সহায়তা", "Tick financial support and unlock awards made for you.":"আর্থিক সহায়তা বেছে নিলে আপনার জন্য উপযোগী বৃত্তিগুলো দেখুন।",
  "Private":"গোপনীয়", "Nothing you enter is saved on a server — only in your browser.":"আপনার দেওয়া তথ্য সার্ভারে জমা হয় না—শুধু আপনার ব্রাউজারে থাকে।",
  "CGPA, department, need and interests — nothing is stored on a server.":"সিজিপিএ, বিভাগ, আর্থিক প্রয়োজন ও আগ্রহ—কোনো তথ্য সার্ভারে জমা হয় না।",
  "Start at 70, plus up to 15 for CGPA above the bar, 8 for a department-specific award, 7 for need-based fit and 4 per matching interest.":"স্কোর ৭০ থেকে শুরু। প্রয়োজনের চেয়ে বেশি সিজিপিএতে সর্বোচ্চ ১৫, বিভাগভিত্তিক বৃত্তিতে ৮, আর্থিক প্রয়োজনে ৭ এবং মেলা প্রতিটি আগ্রহে ৪ পয়েন্ট যোগ হয়।",
  "If you're within 0.25 CGPA or miss one or two rules, it shows in Almost there with what's missing.":"সিজিপিএর ব্যবধান ০.২৫-এর মধ্যে হলে অথবা এক–দুটি শর্ত বাকি থাকলে, ‘যোগ্যতার কাছাকাছি’ পাতায় বিস্তারিত দেখুন।",
  "Each card shows days left, so the urgent ones stand out in coral.":"প্রতিটি কার্ডে সময়সীমা পর্যন্ত বাকি দিন দেখা যায়, তাই জরুরি বৃত্তি সহজে চোখে পড়ে।",
  "Your CGPA ":"আপনার সিজিপিএ ", " clears the ":" পূরণ করে; প্রয়োজনীয় মান ", " bar":"", "it's built for ":"এটি উপযোগী ", " students":" শিক্ষার্থীদের জন্য", "it supports students with financial need":"এটি আর্থিক সহায়তাপ্রার্থী শিক্ষার্থীদের পাশে থাকে",
  "So close — ":"প্রায় মিলে গেছে — ", ". Fix this and it's yours to chase.":"। এটি ঠিক করলে আপনি আবেদন করতে পারবেন।"
};
Object.assign(translations, {
  "All":"সব", "Light":"উজ্জ্বল", "Night":"রাত", "matches":"বৃত্তি", "Your matches":"আপনার উপযোগী বৃত্তি", "Find my scholarships":"আমার জন্য বৃত্তি খুঁজুন",
  "Open the finder →":"বৃত্তি খুঁজুন →", "Four simple steps from profile to application.":"প্রোফাইল তৈরি থেকে আবেদন পর্যন্ত—চারটি সহজ ধাপ।",
  "Try it — your CGPA":"আপনার সিজিপিএ দিয়ে দেখুন", "See all matches":"সব উপযুক্ত বৃত্তি দেখুন",
  "CGPA helps us compare your academic result with each scholarship requirement.":"আপনার সিজিপিএ প্রতিটি বৃত্তির ন্যূনতম শর্তের সঙ্গে মিলিয়ে দেখতে সাহায্য করে।",
  "Set your profile and see every scholarship you qualify for, scored and explained.":"আপনার শিক্ষাগত তথ্য দিন। যোগ্য বৃত্তিগুলো মিলের স্কোর ও কারণসহ দেখুন।",
  "Your student dashboard brings your next steps together.":"পরবর্তী করণীয়গুলো আপনার শিক্ষার্থী ড্যাশবোর্ডে একসঙ্গে দেখুন।",
  "Your":"আপনার", "Almost":"যোগ্যতার", "there":"কাছাকাছি"
});
Object.assign(translations, {
  "Create your account":"অ্যাকাউন্ট তৈরি করুন", "SCHOLARSEARCH FOR STUDENTS":"শিক্ষার্থীদের জন্য ScholarSearch",
  "Save scholarships, compare opportunities, and keep your next steps together.":"বৃত্তি সংরক্ষণ ও তুলনা করুন, আর পরবর্তী করণীয়গুলো এক জায়গায় রাখুন।",
  "Full name":"পুরো নাম", "Username":"ব্যবহারকারীর নাম", "Email address":"ইমেইল ঠিকানা", "Password":"পাসওয়ার্ড",
  "Confirm password":"পাসওয়ার্ড নিশ্চিত করুন", "Use 3–32 letters, numbers, dots, hyphens or underscores.":"৩–৩২টি অক্ষর ব্যবহার করুন; সংখ্যা, ডট, হাইফেন ও আন্ডারস্কোর চলবে।",
  "Choose at least 10 characters.":"কমপক্ষে ১০ অক্ষরের পাসওয়ার্ড দিন।", "Confirm new password":"নতুন পাসওয়ার্ড নিশ্চিত করুন",
  "Create student account":"শিক্ষার্থী অ্যাকাউন্ট তৈরি করুন", "Already have an account? Sign in":"আগে থেকেই অ্যাকাউন্ট আছে? সাইন ইন করুন",
  "Create an account":"অ্যাকাউন্ট তৈরি করুন", "ACCOUNT RECOVERY":"অ্যাকাউন্ট পুনরুদ্ধার", "Forgot your password?":"পাসওয়ার্ড ভুলে গেছেন?",
  "Enter the email address linked to your account. We’ll send a secure link to reset your password.":"আপনার অ্যাকাউন্টে যুক্ত ইমেইল ঠিকানাটি দিন। পাসওয়ার্ড বদলানোর নিরাপদ লিংক পাঠানো হবে।",
  "Send reset link":"রিসেট লিংক পাঠান", "If that email is linked to an account, we will send a password reset link shortly.":"এই ইমেইলটি কোনো অ্যাকাউন্টের সঙ্গে যুক্ত থাকলে, শিগগিরই পাসওয়ার্ড বদলানোর লিংক পাঠানো হবে।",
  "Back to sign in":"সাইন ইনে ফিরুন", "SECURE ACCOUNT RECOVERY":"নিরাপদ অ্যাকাউন্ট পুনরুদ্ধার", "Choose a new password":"নতুন পাসওয়ার্ড দিন",
  "Use at least 10 characters. This reset link can only be used once and expires after 60 minutes.":"কমপক্ষে ১০ অক্ষর ব্যবহার করুন। রিসেট লিংকটি একবারই ব্যবহার করা যাবে এবং ৬০ মিনিট পর মেয়াদ শেষ হবে।",
  "New password":"নতুন পাসওয়ার্ড", "Update password":"পাসওয়ার্ড আপডেট করুন", "Your password has been updated. You can now sign in.":"আপনার পাসওয়ার্ড আপডেট হয়েছে। এখন সাইন ইন করতে পারবেন।",
  "This reset link is invalid or has expired. Request a new link to continue.":"এই রিসেট লিংকটি সঠিক নয় বা মেয়াদ শেষ হয়েছে। নতুন লিংক নিন।",
  "Your form expired. Please try again.":"ফর্মটির মেয়াদ শেষ হয়েছে। আবার চেষ্টা করুন।", "Enter your name (2 to 120 characters).":"আপনার নাম লিখুন (২–১২০ অক্ষর)।",
  "Choose a username with 3–32 letters, numbers, dots, hyphens or underscores.":"৩–৩২টি অক্ষরের ব্যবহারকারীর নাম দিন; সংখ্যা, ডট, হাইফেন ও আন্ডারস্কোর চলবে।",
  "Enter a valid email address.":"সঠিক ইমেইল ঠিকানা লিখুন।", "Your password must be at least 10 characters long.":"পাসওয়ার্ড কমপক্ষে ১০ অক্ষরের হতে হবে।",
  "The passwords do not match.":"পাসওয়ার্ড দুটি মেলেনি।", "That username or email is already registered.":"এই ব্যবহারকারীর নাম বা ইমেইল দিয়ে ইতিমধ্যে অ্যাকাউন্ট খোলা হয়েছে।",
  "We could not create your account. Check that MySQL is running and try again.":"অ্যাকাউন্ট তৈরি করা যায়নি। MySQL চালু আছে কি না দেখে আবার চেষ্টা করুন।",
  "We could not process the request right now. Please try again later.":"এই মুহূর্তে অনুরোধটি সম্পন্ন করা যায়নি। পরে আবার চেষ্টা করুন।",
  "We could not update your password right now. Please try again.":"এই মুহূর্তে পাসওয়ার্ড আপডেট করা যায়নি। আবার চেষ্টা করুন।"
});
Object.assign(translations, {
  "Added to saved scholarships":"সংরক্ষিত বৃত্তিতে যোগ হয়েছে", "Removed from saved scholarships":"সংরক্ষিত বৃত্তি থেকে সরানো হয়েছে",
  "Added to comparison":"তুলনার তালিকায় যোগ হয়েছে", "Removed from comparison":"তুলনার তালিকা থেকে সরানো হয়েছে",
  "Scholarship shortcuts":"বৃত্তির শর্টকাট", "Range: 2.00–4.00":"সীমা: ২.০০–৪.০০",
  "Enter a CGPA from 2.00 to 4.00.":"সিজিপিএ ২.০০ থেকে ৪.০০-এর মধ্যে লিখুন।"
});
const sourceTextNodes = new WeakMap();
const translate = (value) => isBangla() && Object.prototype.hasOwnProperty.call(translations, value) ? translations[value] : value;

function translateContent(root) {
  const languageNodes = [];
  if (root.matches?.("[data-language-en][data-language-bn]")) languageNodes.push(root);
  languageNodes.push(...(root.querySelectorAll?.("[data-language-en][data-language-bn]") || []));
  for (const el of languageNodes) {
    el.textContent = el.getAttribute(isBangla() ? "data-language-bn" : "data-language-en");
  }
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let textNode;
  while ((textNode = walker.nextNode())) {
    const parent = textNode.parentElement;
    if (!parent || parent.closest("script, style, [data-live], .preference-control, [data-language-en][data-language-bn]")) continue;
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
  document.querySelectorAll(".theme-control").forEach((themeControl) => { themeControl.dataset.mode = theme; });
  const languageToggle = document.getElementById("languageToggle");
  if (languageToggle) {
    const label = lang === "bn" ? "ভাষা বদলান। বর্তমানে বাংলা।" : "Switch language. Currently English.";
    const code = languageToggle.querySelector(".language-code");
    if (code) code.textContent = lang === "bn" ? "বাং" : "EN";
    languageToggle.setAttribute("aria-label", label); languageToggle.title = label;
  }
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    const modeNames = lang === "bn" ? {light:"উজ্জ্বল", dark:"গাঢ়", night:"রাত"} : {light:"Light", dark:"Dark", night:"Night"};
    const label = lang === "bn" ? `বর্তমান থিম: ${modeNames[theme]}। বদলাতে চাপ দিন।` : `Theme: ${modeNames[theme]}. Tap to change.`;
    themeToggle.setAttribute("aria-label", label); themeToggle.title = label;
  }
  translateContent(document.body);
  document.querySelectorAll("[placeholder]").forEach((el) => {
    if (!el.dataset.originalPlaceholder) el.dataset.originalPlaceholder = el.placeholder;
    el.placeholder = translate(el.dataset.originalPlaceholder);
  });
  const cgpaHint = document.getElementById("cgpaRangeHint");
  if (cgpaHint) cgpaHint.textContent = translate(document.getElementById("cgpaNumber")?.getAttribute("aria-invalid") === "true" ? "Enter a CGPA from 2.00 to 4.00." : "Range: 2.00–4.00");
  updateSelectionShortcuts();
}

function bindPreferences() {
  const updateLanguage = (language) => {
    localStorage.setItem("ss_language", language); applyPreferences();
    if (["finder", "almost"].includes(document.body.dataset.page)) {
      const panel = document.getElementById("profilePanel");
      if (panel) { delete panel.dataset.ready; delete panel.dataset.controlsBound; }
      renderResults(document.body.dataset.page === "finder" ? "q" : "n"); applyPreferences();
    }
    if (document.body.dataset.page === "home") window.refreshScholarHome?.();
    if (document.body.dataset.page === "dashboard") renderDashboard();
    if (document.body.dataset.page === "bookmarks") renderSaved();
    if (document.body.dataset.page === "compare") renderCompare();
    if (document.body.dataset.page === "gap") renderGapAnalyzer();
  };
  document.getElementById("languageToggle")?.addEventListener("click", () => {
    updateLanguage((localStorage.getItem("ss_language") || "en") === "en" ? "bn" : "en");
  });
  document.getElementById("themeToggle")?.addEventListener("click", () => {
    const themes = ["light", "dark", "night"];
    const current = localStorage.getItem("ss_theme") || "light";
    localStorage.setItem("ss_theme", themes[(themes.indexOf(current) + 1) % themes.length]);
    applyPreferences();
  });
  const menuButton = document.getElementById("mobileMenuToggle");
  const siteHeader = document.querySelector(".pill-nav");
  const setMobileMenu = (open) => {
    if (!menuButton || !siteHeader) return;
    siteHeader.classList.toggle("menu-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  };
  menuButton?.addEventListener("click", () => setMobileMenu(menuButton.getAttribute("aria-expanded") !== "true"));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") setMobileMenu(false); });
  document.addEventListener("click", (event) => {
    if (siteHeader?.classList.contains("menu-open") && !siteHeader.contains(event.target)) setMobileMenu(false);
  });
}

const isBangla = () => localStorage.getItem("ss_language") === "bn";
const bnNumber = (n) => Number(n).toLocaleString("bn-BD");
const tk = (n) => "৳" + Number(n).toLocaleString(isBangla() ? "bn-BD" : "en-US");
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
  if (isBangla()) {
    if (m.status === "saved") return "পরে দেখার জন্য সংরক্ষিত।";
    if (m.status === "near_miss") {
      const reasons = m.shortfalls.map(reason => {
        const cgpa = reason.match(/^CGPA ([\d.]+) short \(needs ([\d.]+)\)$/);
        if (cgpa) return `সিজিপিএ আরও ${bnNumber(cgpa[1])} বাড়িয়ে ${bnNumber(cgpa[2])} করতে হবে`;
        const dept = reason.match(/^For (.+) students$/);
        if (dept) return `${dept[1]} বিভাগের শিক্ষার্থীদের জন্য`;
        if (reason === "Requires financial need") return "আর্থিক প্রয়োজনের শর্ত পূরণ করতে হবে";
        const gender = reason.match(/^Only for (Female|Male) applicants$/);
        if (gender) return `শুধু ${gender[1] === "Female" ? "নারী" : "পুরুষ"} আবেদনকারীদের জন্য`;
        return reason;
      });
      return `এই বৃত্তির জন্য ${reasons.join(" এবং ")}।`;
    }
    const parts = [`আপনার সিজিপিএ ${bnNumber(p.cgpa)} বৃত্তিটির ন্যূনতম ${bnNumber(m.min_cgpa)} শর্ত পূরণ করে`];
    if (m.department !== "All" && String(m.department).split(";").includes(p.department)) parts.push(`${p.department} বিভাগের শিক্ষার্থীদের জন্য বৃত্তিটি উন্মুক্ত`);
    if (m.need_based === "yes") parts.push("আর্থিক সহায়তাপ্রার্থীরা আবেদন করতে পারবেন");
    return parts.join("। ") + "।";
  }
  if (m.status === "saved") return translate("Saved for later.");
  if (m.status === "near_miss") return `So close — ${m.shortfalls.join(" · ")}. Fix this and it's yours to chase.`;
  const bits = [`Your CGPA ${p.cgpa.toFixed(2)} clears the ${m.min_cgpa.toFixed(2)} bar`];
  if (m.department !== "All" && String(m.department).split(";").includes(p.department)) bits.push(`it's built for ${p.department}`);
  if (m.need_based === "yes") bits.push("it supports students with financial need");
  return bits.join(", ") + ".";
}

function loadProfile() {
  try { const raw = localStorage.getItem(profileStorageKey) || (!Number(document.body.dataset.userId) ? localStorage.getItem("ss_profile") : null); if (raw) profile = { ...profile, ...JSON.parse(raw) }; } catch (_) {}
}
function saveProfile() {
  try { localStorage.setItem(profileStorageKey, JSON.stringify(profile)); } catch (_) {}
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
  const bookmarked = savedIds.has(Number(m.id));
  const compared = compareIds.has(Number(m.id));
  return `<article class="card rise card-lift" data-scholarship-id="${Number(m.id)}" style="--d:${Math.min(i,10)*0.05}s">
    <div class="card-top">${ringSVG(m.score, near ? "n" : "q")}
      <div><p class="provider">${escapeHtml(m.provider)}</p><h3>${escapeHtml(m.name)}</h3></div>
    </div>
    <div class="tags">${tags.join("")}</div>
    <p class="reason ${near ? "near" : ""}">✦ ${escapeHtml(explain(m, profile))}</p>
    <p class="details">${escapeHtml(m.description)}</p>
    <div class="card-foot">
      <span class="${dl < 30 ? "urgent" : "ok"}">${dl > 0 ? dl + " " + translate("days left") : translate("Closed")} · ${m.deadline}</span>
      <div class="card-actions"><button type="button" class="bookmark-btn ${bookmarked ? "is-saved" : ""}" data-bookmark="${Number(m.id)}" aria-pressed="${bookmarked}" title="${bookmarked ? "Remove bookmark" : "Save scholarship"}">${bookmarked ? "★" : "☆"}</button><button type="button" class="compare-btn ${compared ? "is-selected" : ""}" data-compare="${Number(m.id)}" aria-pressed="${compared}">⇄ Compare</button><button type="button" class="details-btn">${translate("Details")}</button></div>
    </div>
  </article>`;
}

function profilePanelHTML() {
  const deptBtns = departments.map(d =>
    `<button type="button" class="chip ${profile.department===d?"on":""}" data-dept="${d}" aria-pressed="${profile.department===d}">${d}</button>`
  ).join("");
  const interestBtns = interestOptions.map(t =>
    `<button type="button" class="chip-sm ${profile.interests.includes(t)?"on":""}" data-interest="${t}" aria-pressed="${profile.interests.includes(t)}">${t}</button>`
  ).join("");
  const amounts = [0,10000,20000,30000,50000].map(v =>
    `<option value="${v}" ${profile.minAmount===v?"selected":""}>${v ? tk(v)+"+" : "Any amount"}</option>`
  ).join("");
  return `<aside class="panel rise">
    <h2>Your profile</h2>
    <p class="cgpa-help">CGPA helps us compare your academic result with each scholarship requirement.</p>
    <label>CGPA <span class="cgpa-val" id="cgpaVal">${profile.cgpa.toFixed(2)}</span></label>
    <div class="cgpa-input-row"><input type="range" min="2" max="4" step="0.01" value="${profile.cgpa}" id="cgpa" aria-label="Adjust CGPA" /><input type="text" inputmode="decimal" enterkeyhint="done" autocomplete="off" autocapitalize="off" spellcheck="false" maxlength="5" value="${profile.cgpa.toFixed(2)}" id="cgpaNumber" aria-label="Enter CGPA from 2.00 to 4.00" aria-describedby="cgpaRangeHint" aria-invalid="false" /></div>
    <small id="cgpaRangeHint" class="cgpa-range-hint" data-live="true">Range: 2.00–4.00</small>
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
  const cgpaNumber = document.getElementById("cgpaNumber");
  const cgpaLabel = document.getElementById("cgpaVal");
  const cgpaHint = document.getElementById("cgpaRangeHint");
  const setCgpaError = (invalid) => {
    if (cgpaNumber) {
      cgpaNumber.setAttribute("aria-invalid", String(invalid));
      cgpaNumber.classList.toggle("is-invalid", invalid);
    }
    if (cgpaHint) {
      cgpaHint.classList.toggle("is-invalid", invalid);
      cgpaHint.textContent = translate(invalid ? "Enter a CGPA from 2.00 to 4.00." : "Range: 2.00–4.00");
    }
  };
  const updateCgpaValue = (value, updateText, immediate = false) => {
    const n = Number(value);
    if (!Number.isFinite(n)) return;
    profile.cgpa = n;
    if (cgpa) cgpa.value = n;
    if (updateText && cgpaNumber) cgpaNumber.value = n.toFixed(2);
    if (cgpaLabel) cgpaLabel.textContent = n.toFixed(2);
    saveProfile();
    if (immediate) flushScheduledResults(onChange); else scheduleResults(onChange, 180);
  };
  const normalizeCgpa = value => value
    .replace(/[০-৯]/g, digit => String("০১২৩৪৫৬৭৮৯".indexOf(digit)))
    .replace(/[,.٫،]/g, ".");
  const commitCgpaText = () => {
    if (!cgpaNumber) return;
    const raw = normalizeCgpa(cgpaNumber.value.trim());
    if (!raw) {
      cgpaNumber.value = profile.cgpa.toFixed(2);
      setCgpaError(false);
      flushScheduledResults(onChange);
      return;
    }
    if (!/^\d(?:\.\d{0,2})?$/.test(raw) || Number(raw) < 2 || Number(raw) > 4) {
      setCgpaError(true);
      return;
    }
    setCgpaError(false);
    const n = Number(raw);
    updateCgpaValue(n, true, true);
  };
  if (cgpa) cgpa.addEventListener("input", () => { setCgpaError(false); updateCgpaValue(cgpa.value, true); });
  if (cgpa) cgpa.addEventListener("change", () => flushScheduledResults(onChange));
  if (cgpaNumber) cgpaNumber.addEventListener("input", () => {
    const raw = normalizeCgpa(cgpaNumber.value.trim());
    if (!raw) { setCgpaError(false); return; }
    if (!/^\d(?:\.\d{0,2})?$/.test(raw) || Number(raw) < 2 || Number(raw) > 4) { setCgpaError(true); return; }
    setCgpaError(false);
    updateCgpaValue(Number(raw), false);
  });
  if (cgpaNumber) {
    cgpaNumber.addEventListener("focus", () => window.requestAnimationFrame(() => cgpaNumber.select()));
    cgpaNumber.addEventListener("blur", commitCgpaText);
    cgpaNumber.addEventListener("keydown", event => { if (event.key === "Enter") { event.preventDefault(); cgpaNumber.blur(); } });
  }
  document.querySelectorAll("[data-dept]").forEach(btn => btn.addEventListener("click", () => {
    profile.department = btn.dataset.dept;
    document.querySelectorAll("[data-dept]").forEach(chip => {
      const selected = chip.dataset.dept === profile.department;
      chip.classList.toggle("on", selected); chip.setAttribute("aria-pressed", String(selected));
    });
    saveProfile(); onChange();
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
    document.querySelectorAll("[data-interest]").forEach(chip => {
      const selected = profile.interests.includes(chip.dataset.interest);
      chip.classList.toggle("on", selected); chip.setAttribute("aria-pressed", String(selected));
    });
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

function updateSelectionShortcuts() {
  const shortcuts = document.getElementById("selectionShortcuts");
  if (shortcuts) shortcuts.setAttribute("aria-label", translate("Scholarship shortcuts"));
  const savedCount = document.getElementById("savedShortcutCount");
  const compareCount = document.getElementById("compareShortcutCount");
  const format = value => Number(value).toLocaleString(isBangla() ? "bn-BD" : "en-US");
  if (savedCount) savedCount.textContent = format(savedIds.size);
  if (compareCount) compareCount.textContent = `${format(compareIds.size)} / ${isBangla() ? "৩" : "3"}`;
  const savedLink = document.querySelector(".saved-shortcut");
  if (savedLink) savedLink.setAttribute("aria-label", `${translate("View saved awards")}: ${format(savedIds.size)}`);
  const compareLink = document.querySelector(".compare-shortcut");
  if (compareLink) compareLink.setAttribute("aria-label", `${translate("Open comparison")}: ${format(compareIds.size)}`);
}

function ensureSelectionShortcuts(root) {
  if (!root?.parentElement) return;
  let shortcuts = document.getElementById("selectionShortcuts");
  if (!shortcuts) {
    shortcuts = document.createElement("nav");
    shortcuts.id = "selectionShortcuts";
    shortcuts.className = "selection-shortcuts";
    shortcuts.setAttribute("aria-label", translate("Scholarship shortcuts"));
    shortcuts.innerHTML = `<a class="selection-shortcut saved-shortcut" href="bookmarks.php">
      <span class="selection-shortcut-icon" aria-hidden="true">☆</span><span class="selection-shortcut-copy"><b>Bookmarks</b><small>View saved awards</small></span>
      <span class="selection-shortcut-count" id="savedShortcutCount" data-live="true">0</span><span class="selection-shortcut-arrow" aria-hidden="true">→</span>
    </a><a class="selection-shortcut compare-shortcut" href="compare.php">
      <span class="selection-shortcut-icon" aria-hidden="true">⇄</span><span class="selection-shortcut-copy"><b>Compare</b><small>Open comparison</small></span>
      <span class="selection-shortcut-count" id="compareShortcutCount" data-live="true">0 / 3</span><span class="selection-shortcut-arrow" aria-hidden="true">→</span>
    </a>`;
    root.parentElement.insertBefore(shortcuts, root);
    translateContent(shortcuts);
  } else if (shortcuts.parentElement !== root.parentElement) {
    root.parentElement.insertBefore(shortcuts, root);
  }
  updateSelectionShortcuts();
}

let selectionToastTimer = 0;
function showSelectionToast(type, added) {
  let toast = document.getElementById("selectionToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "selectionToast";
    toast.className = "selection-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }
  const bookmark = type === "bookmark";
  const message = bookmark
    ? (added ? "Added to saved scholarships" : "Removed from saved scholarships")
    : (added ? "Added to comparison" : "Removed from comparison");
  const action = bookmark ? "View saved awards" : "Open comparison";
  const href = bookmark ? "bookmarks.php" : "compare.php";
  toast.innerHTML = `<span>${translate(message)}</span><a href="${href}">${translate(action)} <span aria-hidden="true">→</span></a>`;
  toast.classList.add("is-visible");
  window.clearTimeout(selectionToastTimer);
  selectionToastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 5200);
}

function persistCompare() {
  localStorage.setItem(compareKey, JSON.stringify([...compareIds]));
  const badge = document.getElementById("compareCount"); if (badge) badge.textContent = compareIds.size;
  updateSelectionShortcuts();
}
function refreshFeatureCounts() {
  const saved = document.getElementById("bookmarkCount"); if (saved) saved.textContent = savedIds.size;
  persistCompare();
  updateSelectionShortcuts();
}
async function toggleBookmark(id, button) {
  const token = document.querySelector('meta[name="csrf-token"]')?.content || "";
  button.disabled = true;
  try {
    const response = await fetch("api/bookmarks.php", {method:"POST", headers:{"Content-Type":"application/json", "X-CSRF-Token":token}, body:JSON.stringify({scholarship_id:id})});
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Could not update bookmark.");
    result.saved ? savedIds.add(id) : savedIds.delete(id);
    if (document.body.dataset.page === "bookmarks") renderSaved();
    else { button.classList.toggle("is-saved", result.saved); button.setAttribute("aria-pressed", String(result.saved)); button.textContent = result.saved ? "★" : "☆"; button.title = result.saved ? "Remove bookmark" : "Save scholarship"; }
    refreshFeatureCounts();
    showSelectionToast("bookmark", result.saved);
  } catch (error) { window.alert(error.message); }
  finally { button.disabled = false; }
}
function bindCardTools(root) {
  ensureSelectionShortcuts(root);
  root.querySelectorAll("[data-bookmark]").forEach(button => button.addEventListener("click", () => toggleBookmark(Number(button.dataset.bookmark), button)));
  root.querySelectorAll("[data-compare]").forEach(button => button.addEventListener("click", () => {
    const id = Number(button.dataset.compare);
    const added = !compareIds.has(id);
    if (!added) compareIds.delete(id);
    else if (compareIds.size >= 3) { window.alert("Compare up to three scholarships at a time."); return; }
    else compareIds.add(id);
    persistCompare();
    document.querySelectorAll(`[data-compare="${id}"]`).forEach(control => { const active = compareIds.has(id); control.classList.toggle("is-selected", active); control.setAttribute("aria-pressed", String(active)); });
    showSelectionToast("compare", added);
  }));
}

async function loadBookmarks() {
  if (!Number(document.body.dataset.userId)) return;
  try {
    const response = await fetch("api/bookmarks.php", {headers:{"Accept":"application/json"}});
    if (response.ok) (await response.json()).forEach(id => savedIds.add(Number(id)));
  } catch (_) { /* The rest of the finder remains usable if bookmarks are offline. */ }
}
function renderSaved() {
  const grid = document.getElementById("savedGrid"); if (!grid) return;
  const items = scholarships.filter(item => savedIds.has(Number(item.id)));
  grid.innerHTML = items.length ? items.map((item, i) => cardHTML({...item, status:"saved", score:70}, i)).join("") : '<div class="empty saved-empty"><span>☆</span><h3>Your shortlist is ready</h3><p>Save scholarships from Finder and they will appear here.</p><a class="btn btn-primary" href="finder.php">Explore scholarships →</a></div>';
  bindDetailsButtons(grid); bindCardTools(grid); translateContent(grid); refreshFeatureCounts();
}
function renderCompare() {
  const container = document.getElementById("compareContent"); if (!container) return;
  const items = [...compareIds].map(id => scholarships.find(s => Number(s.id) === id)).filter(Boolean).slice(0, 3);
  if (!items.length) {
    container.innerHTML = '<div class="empty compare-empty"><span>⇄</span><h3>Start a comparison</h3><p>Choose up to three scholarships in Finder, then compare their requirements and details here.</p><a class="btn btn-primary" href="finder.php">Open Finder →</a></div>';
    translateContent(container);
    return;
  }
  const rows = [["Award", x => x.name], ["Provider", x => x.provider], ["Amount", x => tk(x.amount_bdt)], ["Minimum CGPA", x => Number(x.min_cgpa).toFixed(2)], ["Department", x => String(x.department).replaceAll(";", " · ")], ["Need based", x => x.need_based === "yes" ? "Yes" : "No"], ["Gender", x => x.gender], ["Deadline", x => x.deadline], ["Description", x => x.description]];
  container.innerHTML = `<div class="compare-table-wrap"><table class="compare-table"><thead><tr><th>Details</th>${items.map(x => `<th><span class="compare-provider">${escapeHtml(x.provider)}</span><strong>${escapeHtml(x.name)}</strong><button type="button" class="compare-remove" data-remove-compare="${Number(x.id)}" aria-label="Remove ${escapeHtml(x.name)}">× Remove</button></th>`).join("")}</tr></thead><tbody>${rows.slice(2).map(([label, get]) => `<tr><th>${label}</th>${items.map(x => `<td>${escapeHtml(get(x))}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  translateContent(container);
  container.querySelectorAll("[data-remove-compare]").forEach(button => button.addEventListener("click", () => { compareIds.delete(Number(button.dataset.removeCompare)); persistCompare(); renderCompare(); }));
}
function renderGapAnalyzer() {
  const grid = document.getElementById("gapGrid"); if (!grid) return;
  const rows = scholarships.map(item => {
    const depts = String(item.department).split(";");
    const deptOk = item.department === "All" || profile.department === "All" || depts.includes(profile.department);
    const cgpaGap = Math.max(0, Number(item.min_cgpa) - profile.cgpa);
    const genderOk = item.gender === "All" || profile.gender === "All" || item.gender === profile.gender;
    const needOk = item.need_based === "no" || profile.needBased;
    const eligible = deptOk && cgpaGap === 0 && genderOk && needOk;
    const gaps = [];
    if (cgpaGap > 0) gaps.push(`Raise CGPA by ${cgpaGap.toFixed(2)} to ${Number(item.min_cgpa).toFixed(2)}`);
    if (!deptOk) gaps.push(`Open to ${depts.join(", ")} students`);
    if (!needOk) gaps.push("Financial need is required");
    if (!genderOk) gaps.push(`Applicants must be ${item.gender.toLowerCase()}`);
    return {...item, eligible, cgpaGap, gaps, deptOk};
  });
  const eligibleCount = rows.filter(x => x.eligible).length;
  const gapRows = rows.filter(x => !x.eligible).sort((a,b) => a.cgpaGap - b.cgpaGap || a.gaps.length - b.gaps.length || b.amount_bdt - a.amount_bdt);
  const reachable = gapRows.filter(x => x.cgpaGap <= .25 && x.gaps.length <= 2).length;
  const setText = (id, value) => { const node = document.getElementById(id); if (node) node.textContent = value; };
  setText("gapTotal", String(scholarships.length)); setText("gapEligible", String(eligibleCount)); setText("gapReachable", String(reachable));
  setText("gapProfileSummary", `Your current profile: CGPA ${profile.cgpa.toFixed(2)} · ${profile.department} · ${profile.needBased ? "financial support selected" : "need-based support off"}.`);
  const draw = () => {
    const mode = document.getElementById("gapFilter")?.value || "all";
    const filtered = gapRows.filter(x => mode === "all" || (mode === "near" && x.cgpaGap <= .25) || (mode === "dept" && !x.deptOk));
    grid.innerHTML = filtered.length ? filtered.map((item, i) => {
      const width = Math.max(8, Math.min(100, item.cgpaGap / .5 * 100));
      return `<article class="gap-card" style="--d:${Math.min(i,8)*.04}s"><div class="gap-card-top"><div><p class="provider">${escapeHtml(item.provider)}</p><h3>${escapeHtml(item.name)}</h3></div><span class="gap-amount">${tk(item.amount_bdt)}</span></div><div class="gap-meter-label"><span>CGPA gap</span><b>${item.cgpaGap === 0 ? "No CGPA gap" : item.cgpaGap.toFixed(2)}</b></div><div class="gap-meter"><i style="width:${width}%"></i></div><ul>${item.gaps.map(g => `<li>${escapeHtml(g)}</li>`).join("")}</ul></article>`;
    }).join("") : '<div class="empty"><h3>No gaps match this filter</h3><p>Try another filter or update your profile.</p></div>';
  };
  const filter = document.getElementById("gapFilter"); if (filter && !filter.dataset.bound) { filter.dataset.bound="1"; filter.addEventListener("change", draw); }
  draw(); translateContent(document.querySelector(".gap-page"));
}
function initChatbot() {
  if (document.getElementById("scholar-chat")) return;
  const chatHistory = [];
  let busy = false;
  const wrapper = document.createElement("div");
  wrapper.id = "scholar-chat";
  wrapper.className = "scholar-chat";
  wrapper.innerHTML = `<section class="chat-panel" id="chatPanel" hidden aria-label="Scholarship assistant">
    <header>
      <span class="chat-avatar">✦</span>
      <div>
        <b>ScholarSearch assistant</b>
        <small>AI-powered · grounded in your scholarship list</small>
      </div>
      <button type="button" class="chat-close" aria-label="Close assistant">×</button>
    </header>
    <div class="chat-log" id="chatLog" aria-live="polite">
      <p class="chat-message bot">Hi! Ask me about matches, eligibility, deadlines, funding, or a scholarship by name. I use your profile and the live scholarship catalogue.</p>
      <div class="chat-suggestions" id="chatSuggestions">
        <button type="button" data-q="What scholarships match my profile?">Matches for me</button>
        <button type="button" data-q="Which deadlines are coming soon?">Upcoming deadlines</button>
        <button type="button" data-q="How can I improve my eligibility?">Improve eligibility</button>
      </div>
    </div>
    <form id="chatForm">
      <input id="chatInput" placeholder="Ask about scholarships…" autocomplete="off" required maxlength="1500">
      <button type="submit" aria-label="Send message" id="chatSendBtn">↑</button>
    </form>
  </section>
  <button type="button" id="chatToggle" class="chat-toggle" aria-label="Open scholarship assistant"><span>✦</span><b>Ask ScholarSearch</b></button>`;
  document.body.append(wrapper);
  translateContent(wrapper);

  const panel = document.getElementById("chatPanel");
  const log = document.getElementById("chatLog");
  const field = document.getElementById("chatInput");
  const sendBtn = document.getElementById("chatSendBtn");

  document.getElementById("chatToggle").addEventListener("click", () => {
    panel.hidden = !panel.hidden;
    if (!panel.hidden) field.focus();
  });
  wrapper.querySelector(".chat-close").addEventListener("click", () => { panel.hidden = true; });

  log.querySelectorAll("#chatSuggestions button").forEach(btn => {
    btn.addEventListener("click", () => {
      field.value = btn.dataset.q || btn.textContent;
      document.getElementById("chatForm").requestSubmit();
    });
  });

  document.getElementById("chatForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const question = field.value.trim();
    if (!question || busy) return;
    busy = true;
    sendBtn.disabled = true;
    field.disabled = true;
    const suggestions = document.getElementById("chatSuggestions");
    if (suggestions) suggestions.remove();

    addMessage("user", question);
    field.value = "";
    const typing = addTyping();

    try {
      const answer = await askAssistant(question, chatHistory);
      typing.remove();
      addMessage("bot", answer);
      chatHistory.push({ role: "user", content: question });
      chatHistory.push({ role: "assistant", content: answer });
      if (chatHistory.length > 12) chatHistory.splice(0, chatHistory.length - 12);
    } catch (err) {
      typing.remove();
      const fallback = localFallbackAnswer(question);
      if (window.console) console.warn("AI unavailable:", err && err.message);
      addMessage("bot", fallback);
    } finally {
      busy = false;
      sendBtn.disabled = false;
      field.disabled = false;
      field.focus();
    }
  });

  function addMessage(type, text) {
    const p = document.createElement("p");
    p.className = `chat-message ${type}`;
    p.textContent = text;
    log.append(p);
    log.scrollTop = log.scrollHeight;
    return p;
  }

  function addTyping() {
    const p = document.createElement("p");
    p.className = "chat-message bot chat-typing";
    p.innerHTML = `<span></span><span></span><span></span>`;
    log.append(p);
    log.scrollTop = log.scrollHeight;
    return p;
  }

  async function askAssistant(question, history) {
    const res = await fetch("api/chat.php", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        message: question,
        history: history.slice(-8),
        profile: {
          cgpa: profile.cgpa,
          department: profile.department,
          needBased: profile.needBased,
          gender: profile.gender
        }
      })
    });
    const rawText = await res.text();
    let data = {};
    try { data = JSON.parse(rawText); } catch (_) {
      throw new Error(res.ok ? "Invalid JSON from assistant" : `HTTP ${res.status}: ${rawText.slice(0, 160) || "empty response"}`);
    }
    if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
    if (!data.reply) throw new Error("Empty reply");
    return data.reply;
  }

  function localFallbackAnswer(question) {
    const q = question.toLowerCase();
    const matches = findMatches(profile);
    if (/deadline|closing|close soon|শেষ তারিখ/.test(q)) {
      const soon = scholarships.filter(s => daysLeft(s.deadline) >= 0).sort((a, b) => new Date(a.deadline) - new Date(b.deadline)).slice(0, 3);
      return soon.length
        ? `Upcoming deadlines: ${soon.map(s => `${s.name} (${s.deadline})`).join(" · ")}.`
        : "I could not find an upcoming deadline in the current list.";
    }
    if (/eligible|match|recommend|suggest|fit|মিল|যোগ্য/.test(q)) {
      return matches.qualified.length
        ? `Your profile currently matches ${matches.qualified.length} scholarships. A strong match is ${matches.qualified[0].name} from ${matches.qualified[0].provider}. You can refine this in Finder.`
        : "I do not see a current match yet. Check Almost there or use the eligibility gap analyzer to see the next requirements to work toward.";
    }
    const terms = q.split(/\s+/).filter(word => word.length > 2);
    const found = scholarships.filter(s => terms.some(word => `${s.name} ${s.provider} ${s.description}`.toLowerCase().includes(word))).slice(0, 3);
    return found.length
      ? `I found: ${found.map(s => `${s.name} (${tk(s.amount_bdt)}, deadline ${s.deadline})`).join(" · ")}.`
      : "I can help with scholarship matches, eligibility, deadlines, funding amounts, and award names. Try asking “What matches my profile?”";
  }
}

function renderDashboard() {
  if (dataLoadError) {
    ["dashboardMatchCount", "dashboardSavedCount", "dashboardCompareCount", "dashboardCgpa"].forEach(id => { const node = document.getElementById(id); if (node) node.textContent = "—"; });
    const picks = document.getElementById("dashboardPicks"); if (picks) picks.innerHTML = `<div class="empty"><h3>Scholarship database unavailable</h3><p>${escapeHtml(dataLoadError)}</p></div>`;
    return;
  }
  const matches = findMatches(profile);
  const setText = (id, value) => { const node = document.getElementById(id); if (node) node.textContent = value; };
  setText("dashboardMatchCount", matches.qualified.length);
  setText("dashboardSavedCount", savedIds.size); setText("dashboardBookmarkBadge", savedIds.size);
  setText("dashboardCompareCount", compareIds.size); setText("dashboardCgpa", profile.cgpa.toFixed(2));
  setText("dashboardDepartment", `${profile.department} · ${profile.needBased ? "financial support on" : "profile active"}`);
  const picks = document.getElementById("dashboardPicks");
  if (picks) {
    picks.innerHTML = matches.qualified.length ? matches.qualified.slice(0, 4).map((item, i) => `<a class="dashboard-pick" href="finder.php" style="--d:${i*.05}s"><span class="pick-score">${item.score}%</span><span><small>${escapeHtml(item.provider)}</small><b>${escapeHtml(item.name)}</b></span><strong>${tk(item.amount_bdt)}</strong><i>→</i></a>`).join("") : '<div class="empty"><h3>No matches yet</h3><p>Update your CGPA or profile preferences in Finder to explore more awards.</p><a class="btn btn-primary" href="finder.php">Update profile →</a></div>';
    translateContent(picks);
  }
  document.getElementById("openDashboardChat")?.addEventListener("click", () => document.getElementById("chatToggle")?.click());
}

function renderResults(kind) {
  if (dataLoadError) {
    const count = document.getElementById("resultCount");
    const grid = document.getElementById("resultsGrid");
    if (count) count.textContent = "Unavailable";
    if (grid) grid.innerHTML = `<div class="empty"><h3>Scholarship database unavailable</h3><p>${escapeHtml(dataLoadError)}</p></div>`;
    return;
  }
  const r = findMatches(profile);
  const list = kind === "q" ? r.qualified : r.near;
  const panel = document.getElementById("profilePanel");
  const grid = document.getElementById("resultsGrid");
  const count = document.getElementById("resultCount");
  if (panel && !panel.dataset.ready) {
    panel.innerHTML = profilePanelHTML(); panel.dataset.ready = "1";
    translateContent(panel);
  }
  if (count) count.textContent = isBangla()
    ? `${bnNumber(list.length)}টি ${kind === "q" ? "বৃত্তি" : "কাছাকাছি সুযোগ"}`
    : `${list.length} ${kind === "q" ? "matches" : "almost"}`;
  if (grid) {
    grid.innerHTML = list.length
      ? list.map((m, i) => cardHTML(m, i)).join("")
      : `<p class="empty rise">${translate("Nothing here yet — try nudging your profile.")}</p>`;
    bindDetailsButtons(grid);
    bindCardTools(grid);
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
  const homeLead = document.getElementById("homeLead");
  const matchCount = document.getElementById("orbitMatches");
  const orbitCards = document.getElementById("orbitCards");
  function refreshHome() {
    if (dataLoadError) {
      if (cgpaLabel) cgpaLabel.textContent = profile.cgpa.toFixed(2);
      if (matchLine) matchLine.textContent = `Scholarship data unavailable: ${dataLoadError}`;
      if (matchCount) matchCount.textContent = "—";
      if (orbitCards) orbitCards.innerHTML = "";
      return;
    }
    const rr = findMatches(profile);
    const tot = rr.qualified.reduce((a, b) => a + b.amount_bdt, 0);
    if (homeLead) {
      const awardCount = Number(homeLead.dataset.awards || 0);
      const providerCount = Number(homeLead.dataset.providers || 0);
      homeLead.textContent = isBangla()
        ? `আপনার সিজিপিএ ও বিভাগ দিয়ে ${bnNumber(awardCount)}টি বৃত্তি খুঁজে দেখুন। ${bnNumber(providerCount)}টি প্রদানকারীর সুযোগের মধ্যে কোনগুলো আপনার জন্য উপযুক্ত, তা জানুন। কাছাকাছি সুযোগগুলোর জন্য কোন শর্ত বাকি, সেটিও দেখুন।`
        : `Share your CGPA and department to explore ${awardCount} scholarships from ${providerCount} providers. See why each one fits, plus the opportunities within reach.`;
    }
    if (cgpaLabel) cgpaLabel.textContent = profile.cgpa.toFixed(2);
    if (matchLine) matchLine.innerHTML = isBangla()
      ? `আপনার প্রোফাইলের সঙ্গে <b>${bnNumber(rr.qualified.length)}টি</b> বৃত্তি মেলে; মোট অনুদান <b>${tk(tot)}</b>। আরও <b>${bnNumber(rr.near.length)}টি</b> বৃত্তির জন্য কিছু শর্ত পূরণ করতে হবে।`
      : `You match <b>${rr.qualified.length}</b> awards worth <b>${tk(tot)}</b>, and almost ${rr.near.length} more.`;
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
  window.refreshScholarHome = refreshHome;
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
  if (["register", "forgot", "reset"].includes(document.body.dataset.page)) return;
  loadProfile();
  try {
    const res = await fetch("api/scholarships.php", {headers:{"Accept":"application/json"}});
    const payload = await res.json();
    if (!res.ok || !Array.isArray(payload)) throw new Error(payload.error || "Scholarship database unavailable.");
    scholarships = payload;
  } catch (error) {
    console.error(error);
    dataLoadError = error.message || "Could not load the scholarship database.";
    scholarships = [];
    document.querySelectorAll("#resultsGrid, #savedGrid, #gapGrid, #dashboardPicks").forEach(el => { el.innerHTML = '<div class="empty"><h3>We could not load scholarships</h3><p>Import the database files and refresh this page.</p></div>'; });
  }
  await loadBookmarks(); refreshFeatureCounts();
  const page = document.body.dataset.page;
  const starsPage = document.getElementById("starsPage");
  if (starsPage) starsPage.innerHTML = starsHTML();
  if (page === "home") initHome();
  if (page === "dashboard") renderDashboard();
  if (page === "finder") renderResults("q");
  if (page === "almost") renderResults("n");
  if (page === "bookmarks") renderSaved();
  if (page === "compare") renderCompare();
  if (page === "gap") renderGapAnalyzer();
  if (page === "how") initReveal();
  initChatbot();
}

boot();
