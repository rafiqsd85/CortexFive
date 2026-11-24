# ScholarSearch (PHP)

Full PHP port of ScholarSearch — same pages, all 136 scholarships, match scoring, near misses, and profile filters.

## Pages
- `/` Home
- `/finder.php` Matches
- `/almost.php` Near misses
- `/how-it-works.php` How scoring works

## Run (Windows)
Double-click **Start Site.bat** (needs PHP on PATH). Opens http://localhost:8080

**Share Link.bat** needs PHP + cloudflared.

## Run (Mac/Linux)
```bash
chmod +x start.sh
./start.sh
```
Or: `php -S localhost:8080 router.php`

## Notes
- Profile is stored only in the browser (localStorage), not on the server.
- Data file: `data/scholarships.json`


## XAMPP users (Windows)

XAMPP includes PHP, but often not on PATH, so `php` is not found.

**Option A — built-in server (this zip’s bat files):**
```bat
"C:\xampp\php\php.exe" -S localhost:8080 router.php
```
Then open http://localhost:8080

**Option B — Apache (no bat needed):**
1. Copy the whole `ScholarSearch-PHP` folder to `C:\xampp\htdocs\ScholarSearch`
2. Start **Apache** in XAMPP Control Panel
3. Open http://localhost/ScholarSearch/
