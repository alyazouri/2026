// ============================================================
//  JORDAN PUBG MOBILE - ADVANCED PAC SCRIPT v4.0
//  Proxy: 46.185.131.218:20001
//  Mode: IPv6 ONLY — Jordan Pure Residential
//  Match Lock: /64 | Lobby: /48
// ============================================================

var PROXY  = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

// ============================================================
//  SESSION STATE
// ============================================================
var SESSION = {
  matchNet:  null,   // /64 مثبَّت للماتش
  matchHost: null,
  lobbyNet:  null    // /48 للوبي
};

// ============================================================
//  PRIORITY CLASSIFIER
// ============================================================
var PRIORITY = {

  CRITICAL: /match|battle|classic|ranked|unranked|competitive|arena|tdm|teamdeathmatch|gungame|domination|assault|payload|metro|metroroyale|zombie|infection|evoground|ultimate|royale|wow|cheer|training|erangel|livik|miramar|sanhok|vikendi|karakin|nusa|rondo|fpp|tpp|squad|duo|solo|war|sniper|quickmatch|arcade|battlefield|clash|gunfight|dispatch|ingame|gaming|realtime|gamesvr|gsvoice|relay/i,

  SECURITY:  /anticheat|verify|shield|security|ban|compliance|safeguard|integrity/i,

  LOBBY:     /lobby|matchmaking|queue|login|auth|region|gateway|session|profile|inventory|store|catalog|news|patch|update|cdn|asset|config|feedback/i
};

// ============================================================
//  EXCLUSIONS
// ============================================================
function isYouTube(h) {
  return shExpMatch(h, "*.youtube.com")         ||
         shExpMatch(h, "*.googlevideo.com")      ||
         shExpMatch(h, "*.ytimg.com")            ||
         shExpMatch(h, "*.youtube-nocookie.com") ||
         shExpMatch(h, "youtu.be");
}

function isGitHub(h) {
  return shExpMatch(h, "github.com")              ||
         shExpMatch(h, "*.github.com")            ||
         shExpMatch(h, "*.githubusercontent.com") ||
         shExpMatch(h, "*.githubassets.com")      ||
         shExpMatch(h, "api.github.com");
}

function isLocalOrPrivate(h) {
  return h === "localhost"          ||
         shExpMatch(h, "127.*")    ||
         shExpMatch(h, "192.168.*")||
         shExpMatch(h, "10.*")     ||
         shExpMatch(h, "172.16.*") ||
         shExpMatch(h, "172.17.*") ||
         shExpMatch(h, "172.18.*") ||
         shExpMatch(h, "172.19.*") ||
         shExpMatch(h, "172.2*")   ||
         shExpMatch(h, "172.30.*") ||
         shExpMatch(h, "172.31.*") ||
         shExpMatch(h, "::1");
}

// ============================================================
//  PUBG / TENCENT / KRAFTON DETECTOR
// ============================================================
function isPUBG(h, u) {
  return /pubg|pubgm|pubgmobile|tencent|krafton|lightspeed|levelinfinite|garena|perf-report/i.test(h + u);
}

// ============================================================
//  IPv6 VALIDATOR — يرفض IPv4 كلياً
// ============================================================
function isIPv6(ip) {
  return ip && ip.indexOf(":") !== -1;
}

// ============================================================
//  BLOCKED REGIONS IPv6
//  إيران / ليبيا / أفغانستان / أوروبا
// ============================================================
function isBlockedRegion(ip) {
  if (!isIPv6(ip)) return false;

  var ipLow = ip.toLowerCase();

  // إيران
  var iran = [
    "2001:1b70","2001:4410","2001:df4","2a00:5240",
    "2001:4c28","2001:4ae8","2a02:2160","2a01:3f0","2a02:1388"
  ];
  // ليبيا
  var libya = [
    "2a02:2d8","2a02:9c0","2001:16a0","2001:16b0"
  ];
  // أفغانستان
  var afghan = [
    "2001:df2:d480","2001:4430","2400:6100","2407:d540","2407:c800"
  ];
  // أوروبا — مستثنى منها النطاقات الأردنية المعروفة
  var europe = [
    "2a00","2a01","2a03","2a05","2a07",
    "2a08","2a09","2a0a","2a0b","2a0c",
    "2a0d","2a0e","2a0f",
    "2001:14","2001:15","2001:16","2001:17",
    "2001:18","2001:19","2001:1a","2001:1b",
    "2001:1c","2001:1d","2001:1e","2001:1f"
  ];

  var i;
  for (i = 0; i < iran.length;   i++) { if (ipLow.indexOf(iran[i])   === 0) return true; }
  for (i = 0; i < libya.length;  i++) { if (ipLow.indexOf(libya[i])  === 0) return true; }
  for (i = 0; i < afghan.length; i++) { if (ipLow.indexOf(afghan[i]) === 0) return true; }

  // أوروبا — فقط إن لم تكن أردنية
  if (!isJordanIPv6(ip)) {
    for (i = 0; i < europe.length; i++) {
      if (ipLow.indexOf(europe[i]) === 0) return true;
    }
  }

  return false;
}

// ============================================================
//  JORDAN IPv6 SUBNETS — سكنية بيور
// ============================================================
function isJordanIPv6(ip) {
  if (!isIPv6(ip)) return false;   // ← IPv4 مرفوض هنا

  var ipLow = ip.toLowerCase();

  // Orange JO — AS8697
  var orange = [
    "2a02:ed8",
    "2a02:ed9",
    "2001:8d8",
    "2001:4808"
  ];

  // Zain JO — AS9038 / AS48832
  var zain = [
    "2a04:4e40",
    "2a04:4e41",
    "2a04:4e42",
    "2a04:4e43",
    "2001:4424"
  ];

  // Umniah — AS41919 / AS35819
  var umniah = [
    "2a06:2140",
    "2a06:2141",
    "2a06:2142",
    "2001:4438"
  ];

  // VTEL / Damamax / أخرى
  var other = [
    "2a01:a500",
    "2a01:a501",
    "2001:4486",
    "2001:df0:370",
    "2a0d:5600",
    "2001:16a8"
  ];

  var all = orange.concat(zain).concat(umniah).concat(other);

  for (var i = 0; i < all.length; i++) {
    if (ipLow.indexOf(all[i]) === 0) return true;
  }
  return false;
}

// ============================================================
//  MAIN FindProxyForURL
// ============================================================
function FindProxyForURL(url, host) {

  // حل DNS
  var ip = "";
  try { ip = dnsResolve(host); } catch(e) { ip = ""; }

  // ── 1. شبكة محلية → مباشر
  if (isLocalOrPrivate(host)) return DIRECT;

  // ── 2. YouTube / GitHub → مباشر
  if (isYouTube(host)) return DIRECT;
  if (isGitHub(host))  return DIRECT;

  // ── 3. IPv4 كلياً → مباشر (لا نتدخل)
  if (ip && !isIPv6(ip)) return DIRECT;

  // ── 4. نطاقات محظورة → حجب
  if (ip && isBlockedRegion(ip)) return BLOCK;

  // ── 5. هل هو PUBG ؟
  var isPubgHost = isPUBG(host, url);

  if (!isPubgHost) {
    // حركة عادية → أردني IPv6 = مباشر ، غيره = بروكسي
    if (ip && isJordanIPv6(ip)) return DIRECT;
    return PROXY;
  }

  // ══════════════════════════════════════
  //  من هنا → حركة PUBG حصراً
  // ══════════════════════════════════════

  var urlLow  = url.toLowerCase();
  var hostLow = host.toLowerCase();

  var isCritical = PRIORITY.CRITICAL.test(urlLow + hostLow);
  var isSecurity = PRIORITY.SECURITY.test(urlLow + hostLow);
  var isLobby    = PRIORITY.LOBBY.test(urlLow + hostLow);

  // ─────────────────────────────────────
  //  MATCH / SECURITY → /64 مثبَّت
  // ─────────────────────────────────────
  if (isCritical || isSecurity) {

    // رفض أي IP غير أردني IPv6
    if (!ip || !isIPv6(ip) || !isJordanIPv6(ip)) return BLOCK;

    // /64 = أول 4 كتل
    var net64 = ip.split(":").slice(0, 4).join(":");

    if (!SESSION.matchNet) {
      // أول اتصال → تثبيت
      SESSION.matchNet  = net64;
      SESSION.matchHost = host;
      return PROXY;
    }

    // تحقق صارم من الثبات
    if (host !== SESSION.matchHost) return BLOCK;
    if (net64 !== SESSION.matchNet) return BLOCK;

    return PROXY; // ✅ مثبَّت ومستقر
  }

  // ─────────────────────────────────────
  //  LOBBY → /48 أوسع هامش
  // ─────────────────────────────────────
  if (isLobby) {

    if (!ip || !isIPv6(ip)) return PROXY;

    if (isJordanIPv6(ip)) {
      // /48 = أول 3 كتل
      var net48 = ip.split(":").slice(0, 3).join(":");
      SESSION.lobbyNet = net48;
      return PROXY;
    }

    // خارج الأردن → بروكسي فقط
    return PROXY;
  }

  // ─────────────────────────────────────
  //  PUBG عام (CDN / Assets / Updates)
  // ─────────────────────────────────────
  if (ip && isJordanIPv6(ip)) return PROXY;

  return PROXY;
}

// ============================================================
//  END — Jordan IPv6 Only | Match /64 | Lobby /48
// ============================================================
