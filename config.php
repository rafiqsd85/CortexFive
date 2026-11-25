<?php
declare(strict_types=1);

/**
 * Application configuration.
 * Database defaults are the InfinityFree account.
 * For local XAMPP or php -S testing, override with SS_DB_HOST, SS_DB_PORT,
 * SS_DB_NAME, SS_DB_USER and SS_DB_PASSWORD. An empty environment value is a valid override.
 *
 * Use a chat/instruction model (not a "decider" model).
 * openrouter/free automatically routes to an available free chat model.
 */
function ss_env(string $key, string $default): string
{
    $value = getenv($key);
    return $value === false ? $default : $value;
}

if (!defined('SS_DB_HOST')) {
    define('SS_DB_HOST', ss_env('SS_DB_HOST', 'sql105.infinityfree.com'));
}
if (!defined('SS_DB_PORT')) {
    define('SS_DB_PORT', ss_env('SS_DB_PORT', '3306'));
}
if (!defined('SS_DB_NAME')) {
    define('SS_DB_NAME', ss_env('SS_DB_NAME', 'if0_43531885_scholarship_db'));
}
if (!defined('SS_DB_USER')) {
    define('SS_DB_USER', ss_env('SS_DB_USER', 'if0_43531885'));
}
if (!defined('SS_DB_PASSWORD')) {
    define('SS_DB_PASSWORD', ss_env('SS_DB_PASSWORD', 'jDok0Kaxcg'));
}

if (!defined('OPENROUTER_API_KEY')) {
    define('OPENROUTER_API_KEY', ss_env('OPENROUTER_API_KEY', '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'));
}
if (!defined('OPENROUTER_MODEL')) {
    // Auto-routes to a working free chat model. Alternatives:
    // nvidia/nemotron-3.5-lightning:free
    // baidu/ernie-5.5-flash-preview:free
    define('OPENROUTER_MODEL', ss_env('OPENROUTER_MODEL', 'openrouter/free'));
}
if (!defined('OPENROUTER_BASE_URL')) {
    define('OPENROUTER_BASE_URL', ss_env('OPENROUTER_BASE_URL', 'https://openrouter.ai/api/v1/chat/completions'));
}
