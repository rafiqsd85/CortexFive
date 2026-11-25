<?php
declare(strict_types=1);
require_once __DIR__ . '/../includes/db.php';
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
try {
    $rows = db()->query('SELECT id, name, provider, min_cgpa, department, need_based, gender, amount_bdt, deadline, description FROM scholarships ORDER BY id')->fetchAll();
    foreach ($rows as &$row) {
        $row['id'] = (int)$row['id'];
        $row['min_cgpa'] = (float)$row['min_cgpa'];
        $row['amount_bdt'] = (int)$row['amount_bdt'];
    }
    unset($row);
    echo json_encode($rows, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);
} catch (Throwable $e) {
    http_response_code(503);
    $message = $e instanceof RuntimeException ? $e->getMessage() : 'Scholarship database unavailable. Start MySQL and check includes/db.php connection settings.';
    echo json_encode(['error' => $message], JSON_UNESCAPED_UNICODE);
}
