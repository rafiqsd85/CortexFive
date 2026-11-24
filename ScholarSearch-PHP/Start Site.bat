@echo off
setlocal EnableDelayedExpansion
cd /d "%~dp0"

set "PHP="

REM 1) Already on PATH?
where php >nul 2>nul && set "PHP=php"

REM 2) Common XAMPP locations (Windows)
if not defined PHP if exist "C:\xampp\php\php.exe" set "PHP=C:\xampp\php\php.exe"
if not defined PHP if exist "C:\XAMPP\php\php.exe" set "PHP=C:\XAMPP\php\php.exe"
if not defined PHP if exist "D:\xampp\php\php.exe" set "PHP=D:\xampp\php\php.exe"
if not defined PHP if exist "D:\XAMPP\php\php.exe" set "PHP=D:\XAMPP\php\php.exe"
if not defined PHP if exist "%USERPROFILE%\xampp\php\php.exe" set "PHP=%USERPROFILE%\xampp\php\php.exe"

REM 3) Laragon / other common installs
if not defined PHP if exist "C:\laragon\bin\php\php-8.3.12-Win32-vs16-x64\php.exe" (
  for /d %%D in ("C:\laragon\bin\php\php-*") do if exist "%%D\php.exe" set "PHP=%%D\php.exe"
)
if not defined PHP if exist "C:\laragon\bin\php" (
  for /d %%D in ("C:\laragon\bin\php\php-*") do if exist "%%D\php.exe" set "PHP=%%D\php.exe"
)

if not defined PHP (
  echo.
  echo  Could not find php.exe
  echo.
  echo  XAMPP is running, but PHP is not on PATH.
  echo  Fix options:
  echo    1. Open this folder in Command Prompt and run:
  echo       "C:\xampp\php\php.exe" -S localhost:8080 router.php
  echo    2. Or copy the ScholarSearch-PHP folder into:
  echo       C:\xampp\htdocs\ScholarSearch
  echo       then open: http://localhost/ScholarSearch/
  echo.
  pause
  exit /b 1
)

echo.
echo  Using PHP: %PHP%
echo  Site:      http://localhost:8080
echo  Keep this window open. Press Ctrl+C to stop.
echo.
"%PHP%" -S localhost:8080 router.php
pause
