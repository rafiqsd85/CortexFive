<?php
// Router for: php -S 0.0.0.0:8080 router.php
$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
if ($uri === '/' || $uri === '') {
  require __DIR__ . '/index.php';
  return true;
}
$file = __DIR__ . $uri;
if ($uri !== '/' && file_exists($file) && !is_dir($file)) {
  return false; // serve static
}
if (str_ends_with($uri, '.php') && file_exists($file)) {
  require $file;
  return true;
}
http_response_code(404);
echo 'Not found';
return true;
