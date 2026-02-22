// ============================================================
//  PUBG MOBILE — Jordan-Optimized PAC File  v3.0
//  هدف: تثبيت اللعب من الأردن، تسريع الاتصال، رفض غير الأردن
// ============================================================

// ================= PROXIES =================
// Proxy مباشر للـ Match (أقوى سيرفر، latency أقل)
var MATCH_JO_POOL = "PROXY 46.185.131.218:20001";

// Proxy للـ Lobby / Matchmaking / CDN
var LOBBY_POOL = [
  "PROXY 2.59.53.74:443",
  "PROXY 46.185.131.218:443",   // احتياطي
  "PROXY 176.29.153.95:9030"    // احتياطي
];

var BLOCK  = "PROXY 127.0.0.1:9";  // يقفل الاتصال
var DIRECT = "DIRECT";

// ================= الـ IPs الأردنية الحقيقية =================
// نطاقات مخصصة رسمياً لـ Jordan (ARIN/RIPE/APNIC)
var JORDAN_IP_RANGES = [
  // Zain Jordan / Orange / Umniah / JTC
  ["5.21.0.0",    "255.255.0.0"],
  ["37.44.32.0",  "255.255.248.0"],
  ["46.30.160.0", "255.255.240.0"],
  ["62.3.0.0",    "255.255.0.0"],
  ["77.42.0.0",   "255.255.0.0"],
  ["78.110.96.0", "255.255.224.0"],
  ["81.19.64.0",  "255.255.192.0"],
  ["82.212.0.0",  "255.255.0.0"],
  ["83.212.0.0",  "255.254.0.0"],
  ["84.235.64.0", "255.255.224.0"],
  ["86.111.0.0",  "255.255.0.0"],
  ["91.74.0.0",   "255.255.0.0"],
  ["91.108.0.0",  "255.255.0.0"],
  ["92.114.0.0",  "255.254.0.0"],
  ["94.0.0.0",    "255.254.0.0"],
  ["176.29.0.0",  "255.255.0.0"],
  ["178.238.0.0", "255.255.0.0"],
  ["185.24.0.0",  "255.255.0.0"],
  ["188.247.0.0", "255.255.0.0"],
  ["194.126.0.0", "255.255.0.0"],
  ["195.0.192.0", "255.255.192.0"],
  ["212.0.0.0",   "255.254.0.0"]
];

// ================= BLACKLIST جغرافي =================
var GEO_BLACKLIST = [
  // أوروبا
  ["5.0.0.0",    "255.0.0.0"],
  ["51.0.0.0",   "255.0.0.0"],
  ["80.0.0.0",   "255.0.0.0"],
  ["82.0.0.0",   "255.224.0.0"],

  // روسيا
  ["5.136.0.0",  "255.248.0.0"],
  ["31.128.0.0", "255.192.0.0"],
  ["95.24.0.0",  "255.248.0.0"],
  ["178.64.0.0", "255.192.0.0"],

  // آسيا (الصين / كوريا / اليابان)
  ["1.0.0.0",    "255.0.0.0"],
  ["14.0.0.0",   "255.0.0.0"],
  ["27.0.0.0",   "255.0.0.0"],
  ["36.0.0.0",   "255.0.0.0"],
  ["42.0.0.0",   "255.0.0.0"],
  ["58.0.0.0",   "255.0.0.0"],
  ["59.0.0.0",   "255.0.0.0"],
  ["60.0.0.0",   "255.0.0.0"],

  // أمريكا (تجنب lag عالي)
  ["3.0.0.0",    "255.0.0.0"],
  ["13.0.0.0",   "255.0.0.0"],
  ["52.0.0.0",   "255.0.0.0"]
];

// ================= SESSION STATE =================
var SESSION = {
  matchNet:   null,   // /24 subnet للـ match server الحالي
  matchHost:  null,   // hostname للـ match server الحالي
  matchProxy: null,   // الـ proxy المختار للـ match
  lobbyProxy: null,   // الـ proxy المختار للـ lobby
  dnsCache:   {},
  dnsCacheAge: {},
  DNS_TTL:    120000  // ms — ينظّف الـ cache كل 2 دقيقة
};

// ================= HELPERS =================

// يحذف الـ port من الـ hostname
function norm(h) {
  var i = h.indexOf(":");
  return i > -1 ? h.substring(0, i) : h;
}

// يتحقق إن كانت الـ IP ضمن قائمة نطاقات
function isInList(ip, list) {
  for (var i = 0; i < list.length; i++)
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  return false;
}

// DNS مع cache + TTL
function resolvePinned(host) {
  var now = (new Date()).getTime();

  if (SESSION.dnsCache[host]) {
    // تحقق من انتهاء صلاحية الـ cache
    if ((now - SESSION.dnsCacheAge[host]) < SESSION.DNS_TTL)
      return SESSION.dnsCache[host];
  }

  var ip = dnsResolve(host);
  if (ip) {
    SESSION.dnsCache[host]    = ip;
    SESSION.dnsCacheAge[host] = now;
  }
  return ip;
}

// يختار proxy بشكل ثابت حسب الـ host (consistent hashing)
function pickProxy(pool, seed) {
  if (!pool || pool.length === 0) return BLOCK;
  var h = 0;
  for (var i = 0; i < seed.length; i++)
    h = ((h << 5) - h + seed.charCodeAt(i)) & 0xffffffff;
  return pool[Math.abs(h) % pool.length];
}

// يجمع عدة proxies في string fallback
function buildProxyString(pool) {
  if (!pool || pool.length === 0) return BLOCK;
  // PAC يدعم fallback بـ semicolon
  return pool.join("; ") + "; " + BLOCK;
}

// ================= DETECTION =================

function isPUBG(h, u) {
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite|mihoyo|proxima/i.test(h + u);
}

function isMatch(u, h) {
  // UDP game traffic / realtime
  return /match|battle|game|combat|realtime|sync|tick|room|gs\.|gamesv/i.test(u + h);
}

function isLobby(u, h) {
  return /lobby|matchmaking|queue|dispatch|gateway|region|join|recruit|login|auth/i.test(u + h);
}

function isSocial(u, h) {
  return /friend|invite|squad|team|party|clan|presence|social|chat|msg/i.test(u + h);
}

function isCDN(u, h) {
  return /cdn|asset|resource|patch|update|media|content|download|img/i.test(u + h);
}

// ================= MAIN =================
function FindProxyForURL(url, host) {

  host = norm(host.toLowerCase());
  url  = url.toLowerCase();

  // ── 1. فلتر: PUBG فقط ──────────────────────────────────────
  if (!isPUBG(host, url)) return DIRECT;

  // ── 2. DNS Resolve ─────────────────────────────────────────
  var ip = resolvePinned(host);

  // IPv6 أو فشل DNS → Block
  if (!ip || ip.indexOf(":") > -1) return BLOCK;

  // ── 3. Geo Blacklist ────────────────────────────────────────
  if (isInList(ip, GEO_BLACKLIST)) return BLOCK;

  // ── 4. MATCH SERVER (الأهم — latency حرج) ──────────────────
  if (isMatch(url, host)) {

    // يجب أن يكون IP أردني
    if (!isInList(ip, JORDAN_IP_RANGES)) return BLOCK;

    var net24 = ip.split('.').slice(0, 3).join('.');

    if (!SESSION.matchNet) {
      // أول اتصال match — نثبّته
      SESSION.matchNet   = net24;
      SESSION.matchHost  = host;
      SESSION.matchProxy = pickProxy(MATCH_JO_POOL, host);
    } else {
      // لا نسمح بتغيير الـ match server خلال الجلسة (يمنع routing attacks)
      if (host !== SESSION.matchHost) return BLOCK;
      if (net24 !== SESSION.matchNet) return BLOCK;
    }

    return SESSION.matchProxy;
  }

  // ── 5. LOBBY / AUTH / SOCIAL ────────────────────────────────
  if (isLobby(url, host) || isSocial(url, host)) {
    if (!isInList(ip, JORDAN_IP_RANGES)) return BLOCK;
    if (!SESSION.lobbyProxy)
      SESSION.lobbyProxy = pickProxy(LOBBY_POOL, host);
    return SESSION.lobbyProxy;
  }

  // ── 6. CDN / Assets ─────────────────────────────────────────
  if (isCDN(url, host)) {
    // CDN نسمح بنطاق أوسع (ليس ضروري أردني)
    // لكن نبلوك Asia/Russia
    return buildProxyString(LOBBY_POOL);
  }

  // ── 7. Default: أي PUBG traffic آخر ─────────────────────────
  if (!isInList(ip, JORDAN_IP_RANGES)) return BLOCK;
  return pickProxy(LOBBY_POOL, host);
}
