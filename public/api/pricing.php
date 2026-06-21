<?php
declare(strict_types=1);

$defaultMarket = 'CH';
$markets = [
  'CH' => [
    'country' => 'Switzerland',
    'currency' => 'CHF',
    'landingPage' => 1000,
    'businessWebsite' => 2000,
    'premiumWebsite' => 3500,
    'seoSetup' => 500,
    'maintenanceMonthly' => 100,
  ],
  'HU' => [
    'country' => 'Hungary',
    'currency' => 'HUF',
    'landingPage' => 149000,
    'businessWebsite' => 299000,
    'premiumWebsite' => 499000,
    'seoSetup' => 99000,
    'maintenanceMonthly' => 19900,
  ],
  'PL' => [
    'country' => 'Poland',
    'currency' => 'PLN',
    'landingPage' => 2500,
    'businessWebsite' => 4500,
    'premiumWebsite' => 8000,
    'seoSetup' => 1200,
    'maintenanceMonthly' => 250,
  ],
  'US' => [
    'country' => 'United States',
    'currency' => 'USD',
    'landingPage' => 1200,
    'businessWebsite' => 2500,
    'premiumWebsite' => 4500,
    'seoSetup' => 700,
    'maintenanceMonthly' => 150,
  ],
  'CA' => [
    'country' => 'Canada',
    'currency' => 'CAD',
    'landingPage' => 1500,
    'businessWebsite' => 3000,
    'premiumWebsite' => 5500,
    'seoSetup' => 850,
    'maintenanceMonthly' => 180,
  ],
  'AU' => [
    'country' => 'Australia',
    'currency' => 'AUD',
    'landingPage' => 1800,
    'businessWebsite' => 3500,
    'premiumWebsite' => 6500,
    'seoSetup' => 950,
    'maintenanceMonthly' => 200,
  ],
  'BR' => [
    'country' => 'Brazil',
    'currency' => 'BRL',
    'landingPage' => 2500,
    'businessWebsite' => 5000,
    'premiumWebsite' => 9000,
    'seoSetup' => 1500,
    'maintenanceMonthly' => 350,
  ],
  'DE' => [
    'country' => 'Germany',
    'currency' => 'EUR',
    'landingPage' => 900,
    'businessWebsite' => 1800,
    'premiumWebsite' => 3200,
    'seoSetup' => 500,
    'maintenanceMonthly' => 100,
  ],
  'AT' => [
    'country' => 'Austria',
    'currency' => 'EUR',
    'landingPage' => 900,
    'businessWebsite' => 1800,
    'premiumWebsite' => 3200,
    'seoSetup' => 500,
    'maintenanceMonthly' => 100,
  ],
  'FR' => [
    'country' => 'France',
    'currency' => 'EUR',
    'landingPage' => 900,
    'businessWebsite' => 1800,
    'premiumWebsite' => 3200,
    'seoSetup' => 500,
    'maintenanceMonthly' => 100,
  ],
  'ES' => [
    'country' => 'Spain',
    'currency' => 'EUR',
    'landingPage' => 700,
    'businessWebsite' => 1400,
    'premiumWebsite' => 2500,
    'seoSetup' => 400,
    'maintenanceMonthly' => 80,
  ],
  'IT' => [
    'country' => 'Italy',
    'currency' => 'EUR',
    'landingPage' => 700,
    'businessWebsite' => 1400,
    'premiumWebsite' => 2500,
    'seoSetup' => 400,
    'maintenanceMonthly' => 80,
  ],
  'GB' => [
    'country' => 'United Kingdom',
    'currency' => 'GBP',
    'landingPage' => 900,
    'businessWebsite' => 1800,
    'premiumWebsite' => 3200,
    'seoSetup' => 500,
    'maintenanceMonthly' => 100,
  ],
  'NL' => [
    'country' => 'Netherlands',
    'currency' => 'EUR',
    'landingPage' => 950,
    'businessWebsite' => 1900,
    'premiumWebsite' => 3500,
    'seoSetup' => 550,
    'maintenanceMonthly' => 110,
  ],
  'SE' => [
    'country' => 'Sweden',
    'currency' => 'SEK',
    'landingPage' => 12000,
    'businessWebsite' => 24000,
    'premiumWebsite' => 42000,
    'seoSetup' => 7000,
    'maintenanceMonthly' => 1200,
  ],
  'NO' => [
    'country' => 'Norway',
    'currency' => 'NOK',
    'landingPage' => 13000,
    'businessWebsite' => 26000,
    'premiumWebsite' => 45000,
    'seoSetup' => 7500,
    'maintenanceMonthly' => 1300,
  ],
  'DK' => [
    'country' => 'Denmark',
    'currency' => 'DKK',
    'landingPage' => 8500,
    'businessWebsite' => 17000,
    'premiumWebsite' => 30000,
    'seoSetup' => 5000,
    'maintenanceMonthly' => 850,
  ],
  'RO' => [
    'country' => 'Romania',
    'currency' => 'RON',
    'landingPage' => 2500,
    'businessWebsite' => 5000,
    'premiumWebsite' => 9000,
    'seoSetup' => 1500,
    'maintenanceMonthly' => 350,
  ],
  'CZ' => [
    'country' => 'Czech Republic',
    'currency' => 'CZK',
    'landingPage' => 25000,
    'businessWebsite' => 50000,
    'premiumWebsite' => 85000,
    'seoSetup' => 15000,
    'maintenanceMonthly' => 2500,
  ],
];

$countryHeaders = [
  'HTTP_X_VERCEL_IP_COUNTRY',
  'HTTP_CF_IPCOUNTRY',
  'HTTP_X_COUNTRY_CODE',
  'HTTP_X_FORWARDED_COUNTRY',
  'HTTP_CLOUDFRONT_VIEWER_COUNTRY',
  'HTTP_X_GEO_COUNTRY',
  'HTTP_X_CLIENT_COUNTRY',
  'HTTP_X_COUNTRY',
  'HTTP_X_IP_COUNTRY',
  'HTTP_X_APPENGINE_COUNTRY',
  'HTTP_GEOIP_COUNTRY_CODE',
  'HTTP_FASTLY_CLIENT_COUNTRY',
  'HTTP_X_REAL_IP_COUNTRY',
];

function normalize_country_code(?string $countryCode): string {
  return strtoupper(substr(trim($countryCode ?? ''), 0, 2));
}

function get_edgescape_country(): string {
  $header = $_SERVER['HTTP_X_AKAMAI_EDGESCAPE'] ?? '';

  foreach (explode(',', $header) as $part) {
    $pair = array_map('trim', explode('=', $part, 2));

    if (count($pair) === 2 && strtolower($pair[0]) === 'country_code') {
      return normalize_country_code($pair[1]);
    }
  }

  return '';
}

function get_remote_ip(): string {
  $candidates = [
    $_SERVER['HTTP_CF_CONNECTING_IP'] ?? '',
    $_SERVER['HTTP_X_REAL_IP'] ?? '',
    explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '')[0] ?? '',
    $_SERVER['REMOTE_ADDR'] ?? '',
  ];

  foreach ($candidates as $candidate) {
    $ip = trim($candidate);

    if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
      return $ip;
    }
  }

  return '';
}

function lookup_country_from_ip(): string {
  $ip = get_remote_ip();

  if ($ip === '') {
    return '';
  }

  $context = stream_context_create([
    'http' => [
      'timeout' => 1.5,
      'ignore_errors' => true,
      'header' => "Accept: application/json\r\nUser-Agent: Websiteli pricing lookup\r\n",
    ],
  ]);
  $response = @file_get_contents('https://ipwho.is/' . rawurlencode($ip) . '?fields=success,country_code', false, $context);

  if (!is_string($response) || $response === '') {
    return '';
  }

  $data = json_decode($response, true);

  if (!is_array($data) || ($data['success'] ?? false) !== true) {
    return '';
  }

  return normalize_country_code($data['country_code'] ?? '');
}

function resolve_market(array $markets, string $defaultMarket, array $countryHeaders): string {
  $override = normalize_country_code($_GET['market'] ?? '');
  $isLocal = in_array($_SERVER['REMOTE_ADDR'] ?? '', ['127.0.0.1', '::1'], true);

  if ($isLocal && array_key_exists($override, $markets)) {
    return $override;
  }

  foreach ($countryHeaders as $header) {
    $market = normalize_country_code($_SERVER[$header] ?? '');

    if (array_key_exists($market, $markets)) {
      return $market;
    }
  }

  $akamaiMarket = get_edgescape_country();

  if (array_key_exists($akamaiMarket, $markets)) {
    return $akamaiMarket;
  }

  $ipMarket = lookup_country_from_ip();

  if (array_key_exists($ipMarket, $markets)) {
    return $ipMarket;
  }

  return $defaultMarket;
}

function format_price(int $amount, string $currency): string {
  return number_format($amount, 0, '.', ',') . ' ' . $currency;
}

$market = resolve_market($markets, $defaultMarket, $countryHeaders);
$pricing = $markets[$market];

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: private, no-store');
header('Vary: X-Vercel-IP-Country, CF-IPCountry, X-Country-Code, X-Forwarded-Country, CloudFront-Viewer-Country, X-Geo-Country, X-Client-Country, X-Country, X-IP-Country, X-AppEngine-Country, GeoIP-Country-Code, Fastly-Client-Country, X-Real-IP-Country, X-Akamai-Edgescape');

echo json_encode([
  'market' => $market,
  'country' => $pricing['country'],
  'currency' => $pricing['currency'],
  'plans' => [
    'landingPage' => 'from ' . format_price($pricing['landingPage'], $pricing['currency']),
    'businessWebsite' => 'from ' . format_price($pricing['businessWebsite'], $pricing['currency']),
    'premiumWebsite' => 'from ' . format_price($pricing['premiumWebsite'], $pricing['currency']),
    'seoSetup' => 'from ' . format_price($pricing['seoSetup'], $pricing['currency']),
    'maintenanceMonthly' => 'from ' . format_price($pricing['maintenanceMonthly'], $pricing['currency']) . '/month',
  ],
], JSON_UNESCAPED_SLASHES);
