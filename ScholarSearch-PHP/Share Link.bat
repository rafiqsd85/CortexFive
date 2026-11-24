@echo off
setlocal EnableDelayedExpansion
cd /d "%~dp0"

set "PHP="
where php >nul 2>nul && set "PHP=php"
if not defined PHP if exist "C:\xampp\php\php.exe" set "PHP=C:\xampp\php\php.exe"
if not defined PHP if exist "C:\XAMPP\php\php.exe" set "PHP=C:\XAMPP\php\php.exe"
if not defined PHP if exist "D:\xampp\php\php.exe" set "PHP=D:\xampp\php\php.exe"
if not defined PHP if exist "D:\XAMPP\php\php.exe" set "PHP=D:\XAMPP\php\php.exe"

where cloudflared >nul 2>nul || (
  echo cloudflared is required. Install Cloudflare Tunnel, then try again.
  pause
  exit /b 1
)

if not defined PHP (
  echo Could not find php.exe. Start the site with Start Site.bat first, or use XAMPP path.
  pause
  exit /b 1
)

echo Starting site + Cloudflare tunnel...
start "ScholarSearch" cmd /c ""%PHP%" -S localhost:8080 router.php"
timeout /t 2 /nobreak >nul
cloudflared tunnel --url http://localhost:8080
pause
