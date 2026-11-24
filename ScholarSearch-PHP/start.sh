#!/usr/bin/env bash
cd "$(dirname "$0")"
if ! command -v php >/dev/null 2>&1; then
  echo "PHP is required. Install PHP 8+ and try again."
  exit 1
fi
echo "Starting ScholarSearch at http://localhost:8080"
echo "Keep this terminal open. Press Ctrl+C to stop."
php -S localhost:8080 router.php
