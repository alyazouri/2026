// ==================================================
// ULTIMATE JORDAN ONLY BOOSTER - v2.0 FIXED EDITION
// إصدار محسّن ومُصحَّح بالكامل
//
// الإصلاحات الرئيسية:
// 1. إزالة SESSION lock المعطوب - كان يحجب كل الجلسة
// 2. DNS Cache حقيقي يعمل عبر الطلبات
// 3. منطق Fallback واضح: MATCH_JO → LOBBY_JO → DIRECT
// 4. تبسيط الأنظمة التي لا تعمل في بيئة PAC
// 5. تحسين نطاقات IP الأردنية
// 6. إصلاح أولوية القرارات في FindProxyForURL
// ==================================================

// ================= PROXIES =================
// البروكسي الرئيسي للمباريات - بينج أقل
var MATCH_JO = "PROXY 46.185.131.218:20001";
// بروكسي الاستعداد والـ lobby
var LOBBY_JO  = "PROXY 46.185.131.218:443";
// إيقاف الاتصال تماماً (الميناء مغلق)
var BLOCK     = "PROXY 127.0.0.1:9";
// اتصال مباشر بدون بروكسي
var DIRECT    = "DIRECT";

// ================= JORDAN IP RANGES =================
// نطاقات IP الأردنية للمباريات (دقيقة)
var JORDAN_MATCH_IPV4 = [
    // Zain JO (AS48832)
    ["46.32.96.0",  "255.255.224.0"],   // 46.32.96.0/19
    ["188.247.64.0",  "255.255.224.0"], // 188.247.64.0/19

    // Orange JO (AS8697)
    ["213.139.53.0",  "255.255.255.0"], // 213.139.53.0/24
    ["94.249.0.0",  "255.255.128.0"],   // 94.249.0.0/17

    // Umniah (AS9038)
    ["92.241.39.0",  "255.255.255.0"],  // 92.241.39.0/24

    // VTEL (AS50670) - مثال على بعض النطاقات
    ["81.21.8.0",  "255.255.255.0"],    // 81.21.8.0/24
    ["109.237.192.0",  "255.255.255.0"], // 109.237.192.0/24
    ["176.241.64.0",  "255.255.255.0"]  // 176.241.64.0/24
    // ... يمكنك إضافة باقي نطاقات VTEL بنفس الطريق
];

// نطاقات أوسع للـ lobby وخدمات البوابة
var JORDAN_WIDE_IPV4 = [
    // Zain JO (AS48832)
    ["46.32.96.0",  "255.255.224.0"],   // 46.32.96.0/19
    ["188.247.64.0",  "255.255.224.0"], // 188.247.64.0/19

    // Orange JO (AS8697)
    ["213.139.53.0",  "255.255.255.0"], // 213.139.53.0/24
    ["94.249.0.0",  "255.255.128.0"],   // 94.249.0.0/17

    // Umniah (AS9038)
    ["92.241.39.0",  "255.255.255.0"],  // 92.241.39.0/24

    // VTEL (AS50670) - مثال على بعض النطاقات
    ["81.21.8.0",  "255.255.255.0"],    // 81.21.8.0/24
    ["109.237.192.0",  "255.255.255.0"], // 109.237.192.0/24
    ["176.241.64.0",  "255.255.255.0"]  // 176.241.64.0/24
    // ... يمكنك إضافة باقي نطاقات VTEL بنفس الطريق
];

// ================= BLOCKED REGIONS =================
// نطاقات الدول المحجوبة — تُعيد BLOCK فوراً
var BLOCKED_RANGES = [
  // تركيا
  ["31.145.0.0",    "255.255.0.0"],
  ["78.160.0.0",    "255.224.0.0"],
  ["88.228.0.0",    "255.252.0.0"],
  // ألمانيا
  ["5.1.0.0",       "255.255.0.0"],
  // روسيا
  ["5.8.0.0",       "255.248.0.0"]
];

// ================= DNS CACHE =================
// الكاش يخزن نتائج dnsResolve لتجنب التأخير المتكرر.
// في بيئة PAC، المتغيرات العامة تبقى حية طوال جلسة المتصفح.
var _dnsCache = {};
var _dnsCacheTime = {};
var DNS_TTL = 120000; // دقيقتان بالمللي ثانية

function dnsLookup(host) {
  var now = Date.now();
  // إرجاع من الكاش إذا كان حديثاً
  if (_dnsCache[host] && (now - _dnsCacheTime[host]) < DNS_TTL) {
    return _dnsCache[host];
  }
  // استدعاء DNS الفعلي
  var ip = dnsResolve(host);
  if (ip) {
    _dnsCache[host] = ip;
    _dnsCacheTime[host] = now;
  }
  return ip;
}

// ================= IP HELPERS =================
function isInList(ip, list) {
  for (var i = 0; i < list.length; i++) {
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  }
  return false;
}

// تطبيع اسم الهوست — إزالة رقم المنفذ إن وُجد
function normalizeHost(h) {
  var idx = h.indexOf(":");
  return idx > -1 ? h.substring(0, idx) : h;
}

// استخراج رقم المنفذ من URL
function extractPort(url) {
  var m = url.match(/:(\d{2,5})/);
  if (!m) return 0;
  var p = parseInt(m[1]);
  // تجاهل :// من بروتوكول
  return (p > 80) ? p : 0;
}

// ================= GAME DETECTION =================
// الكشف عن ألعاب PUBG Mobile, Arena Breakout, WoW وما يشبهها
function isGameHost(h) {
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite|arena|breakout|morefun|darkzone|farsight|blizzard|battle\.net|battlenet|levelinfinite/i.test(h);
}

// الكشف عن طلبات المباراة الحية (في-game بينج حساس)
function isMatchRequest(url, h) {
  // منافذ المباريات المعروفة
  var port = extractPort(url);
  var matchPort = (port >= 10000 && port <= 20000)   // PUBG
               || (port >= 7000  && port <= 9000)    // Arena Breakout
               || port === 3074                       // ports قياسية
               || port === 3724 || port === 1119;     // WoW

  var matchPattern = /match|battle|combat|realtime|udp|tick|sync|room|\.game\.|\.pvp\.|relay|server\d+|instance|dungeon|raid|battleground|arena\d/i;
  return matchPort || matchPattern.test(url + h);
}

// الكشف عن الـ lobby، المصادقة، الشخصيات
function isLobbyRequest(url, h) {
  return /lobby|matchmaking|queue|dispatch|gateway|join|login|auth|character|realm|world|selector|loadout|inventory|char\b/i.test(url + h);
}

// الكشف عن CDN والتحديثات (أقل أولوية، يمكن DIRECT)
function isCdnRequest(url, h) {
  return /cdn|asset|resource|patch|update|media|content|download|\.apk|\.zip|\.pak/i.test(url + h);
}

// ================= ROUTING LOGIC =================
// يُرجع أفضل بروكسي لمباراة أردنية مع Fallback
function getMatchProxy(ip) {
  // للأردن الجنوبي (شبكة Batelco/Umniah) — نفس الخادم الرئيسي
  if (ip.indexOf("46.185.") === 0 || ip.indexOf("188.161.") === 0) {
    return MATCH_JO;
  }
  // للأردن الأوسط (Orange)
  if (ip.indexOf("176.29.") === 0 || ip.indexOf("176.28.") === 0) {
    return MATCH_JO;
  }
  // كل نطاقات أردن الأخرى
  return MATCH_JO;
  // ملاحظة: عند إضافة بروكسيات متعددة لاحقاً، غيّر هذا إلى:
  // return "PROXY second.proxy:port; " + MATCH_JO;
}

// ================= MAIN PAC FUNCTION =================
function FindProxyForURL(url, host) {

  // --- الخطوة 1: تطبيع اسم الهوست ---
  host = normalizeHost(host.toLowerCase());

  // --- الخطوة 2: تجاهل كل ما ليس لعبة ---
  // هذا يعني: متصفح، يوتيوب، واتساب، كل شيء → مباشر
  if (!isGameHost(host)) {
    return DIRECT;
  }

  // --- الخطوة 3: حل DNS مع كاش ---
  var ip = dnsLookup(host);

  // إذا فشل DNS أو كان IPv6، لا ترسل عبر البروكسي
  if (!ip || ip.indexOf(":") > -1) {
    return BLOCK;
  }

  // --- الخطوة 4: فحص النطاقات المحجوبة أولاً (الأسرع) ---
  // الدول العربية والأوروبية المنافسة → حجب فوري
  if (isInList(ip, BLOCKED_RANGES)) {
    return BLOCK;
  }

  // --- الخطوة 5: تحقق من أن IP أردني ---
  // إذا لم يكن أردنياً ولم يكن محجوباً → منطقة مجهولة → احجب
  var isJordanWide  = isInList(ip, JORDAN_WIDE_IPV4);
  var isJordanMatch = isInList(ip, JORDAN_MATCH_IPV4);

  if (!isJordanWide) {
    // IP لا يعود للأردن ولا للدول المحجوبة → غير معروف → احجب
    return BLOCK;
  }

  // --- الخطوة 6: تحديد نوع الطلب وتوجيهه ---

  // المباريات الحية: أهم شيء، أعطها أقل بينج
  if (isMatchRequest(url, host)) {
    if (!isJordanMatch) {
      // IP أردني واسع لكن ليس في نطاق المباريات الدقيق → احجب المباراة
      return BLOCK;
    }
    return getMatchProxy(ip);
  }

  // الـ Lobby والمصادقة: مهم لكن أقل حساسية من المباراة
  if (isLobbyRequest(url, host)) {
    return LOBBY_JO;
  }

  // CDN والتحديثات: لا تحتاج بروكسي، مباشر أسرع
  if (isCdnRequest(url, host)) {
    return DIRECT;
  }

  // --- الخطوة 7: أي طلب لعبة أردني غير مصنَّف → Lobby proxy كاحتياط ---
  // أفضل من BLOCK لأن الخادم قد يكون بيانات غير معروفة
  return LOBBY_JO;
}

// ==================================================
// DEBUG HELPERS — استدعِها من Console المتصفح
// ==================================================

// فحص IP معين: debugIP("176.29.10.5")
function debugIP(ip) {
  var blocked  = isInList(ip, BLOCKED_RANGES);
  var joWide   = isInList(ip, JORDAN_WIDE_IPV4);
  var joMatch  = isInList(ip, JORDAN_MATCH_IPV4);

  return {
    ip: ip,
    isBlocked:    blocked,
    isJordanWide: joWide,
    isJordanMatch: joMatch,
    verdict: blocked   ? "BLOCKED (non-Jordan region)" :
             joMatch   ? "ALLOWED → MATCH_JO proxy" :
             joWide    ? "ALLOWED → LOBBY_JO proxy" :
                         "BLOCKED (unknown region)"
  };
}

// إحصاء مدخلات الكاش
function debugDnsCache() {
  var count = 0;
  var now   = Date.now();
  var entries = [];
  for (var host in _dnsCache) {
    count++;
    entries.push({
      host: host,
      ip:   _dnsCache[host],
      ageSeconds: Math.floor((now - _dnsCacheTime[host]) / 1000)
    });
  }
  return { total: count, entries: entries };
}

// مسح الكاش (عند تغيير البروكسي أو الاختبار)
function debugClearCache() {
  _dnsCache = {};
  _dnsCacheTime = {};
  return "DNS cache cleared";
}

// اختبار قرار التوجيه لـ URL وهوست معينَين
function debugRoute(url, host) {
  return FindProxyForURL(url, host);
}
