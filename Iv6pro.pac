// ============================================================
//  JORDAN PUBG MOBILE - ADVANCED PAC SCRIPT v4.2
//  Proxy: 46.185.131.218:20001
//  Mode: IPv6 ONLY — Jordan Pure Residential
//  Match Lock: /64 | Lobby: /48 DIRECT for JO servers
//  FIX: Lobby now routes JO servers DIRECT for region lock
// ============================================================

var PROXY  = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

var SESSION = {
  matchNet:  null,
  matchHost: null,
  lobbyNet:  null,
  lobbyLocked: false   // ← جديد: هل تم تثبيت منطقة اللوبي؟
};

var PRIORITY = {
  CRITICAL: /match|battle|classic|ranked|unranked|competitive|arena|tdm|teamdeathmatch|gungame|domination|assault|payload|metro|metroroyale|zombie|infection|evoground|ultimate|royale|wow|cheer|training|erangel|livik|miramar|sanhok|vikendi|karakin|nusa|rondo|fpp|tpp|squad|duo|solo|war|sniper|quickmatch|arcade|battlefield|clash|gunfight|dispatch|ingame|gaming|realtime|gamesvr|gsvoice|relay/i,
  SECURITY:  /anticheat|verify|shield|security|ban|compliance|safeguard|integrity/i,
  LOBBY:     /lobby|matchmaking|queue|login|auth|region|gateway|session|profile|inventory|store|catalog|news|patch|update|cdn|asset|config|feedback/i
};

// ============================================================
//  دوال مساعدة — بدون تغيير
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
  return h === "localhost"           ||
         shExpMatch(h, "127.*")     ||
         shExpMatch(h, "192.168.*") ||
         shExpMatch(h, "10.*")      ||
         shExpMatch(h, "172.16.*")  ||
         shExpMatch(h, "172.17.*")  ||
         shExpMatch(h, "172.18.*")  ||
         shExpMatch(h, "172.19.*")  ||
         shExpMatch(h, "172.2*")    ||
         shExpMatch(h, "172.30.*")  ||
         shExpMatch(h, "172.31.*")  ||
         shExpMatch(h, "::1");
}
function isPUBG(h, u) {
  return /pubg|pubgm|pubgmobile|tencent|krafton|lightspeed|levelinfinite|garena|perf-report/i.test(h + u);
}
function isIPv6(ip) {
  return ip && ip.indexOf(":") !== -1;
}

// ============================================================
//  النطاقات المحظورة — بدون تغيير
// ============================================================
function isBlockedRegion(ip) {
  if (!isIPv6(ip)) return false;
  var ipLow = ip.toLowerCase();
  var iran   = ["2001:1b70","2001:4410","2001:df4","2a00:5240","2001:4c28","2001:4ae8","2a02:2160","2a01:3f0","2a02:1388"];
  var libya  = ["2a02:2d8","2a02:9c0","2001:16a0","2001:16b0"];
  var afghan = ["2001:df2:d480","2001:4430","2400:6100","2407:d540","2407:c800"];
  var europe = ["2a00","2a01","2a03","2a05","2a07","2a08","2a09","2a0a","2a0b","2a0c","2a0d","2a0e","2a0f","2001:14","2001:15","2001:16","2001:17","2001:18","2001:19","2001:1a","2001:1b","2001:1c","2001:1d","2001:1e","2001:1f"];
  var i;
  for (i = 0; i < iran.length;   i++) { if (ipLow.indexOf(iran[i])   === 0) return true; }
  for (i = 0; i < libya.length;  i++) { if (ipLow.indexOf(libya[i])  === 0) return true; }
  for (i = 0; i < afghan.length; i++) { if (ipLow.indexOf(afghan[i]) === 0) return true; }
  if (!isJordanIPv6(ip)) {
    for (i = 0; i < europe.length; i++) { if (ipLow.indexOf(europe[i]) === 0) return true; }
  }
  return false;
}

// ============================================================
//  النطاقات الأردنية — محدّثة من v4.1
// ============================================================
function isJordanIPv6(ip) {
  if (!isIPv6(ip)) return false;
  var ipLow = ip.toLowerCase();

  var orange  = ["2a02:ed8:","2a02:ed9:","2001:8d8:","2001:4808:"];
  var zain    = ["2a04:4e40:","2a04:4e41:","2a04:4e42:","2a04:4e43:","2a04:4e44:","2a04:4e45:","2a04:4e46:","2a04:4e47:","2001:4424:"];
  var umniah  = ["2a06:2140:","2a06:2141:","2a06:2142:","2a06:2143:","2a06:2144:","2a06:2145:","2a06:2146:","2a06:2147:","2001:4438:"];
  var vtel    = ["2a01:a500:","2a01:a501:"];
  var damamax = ["2001:4486:","2001:df0:370:"];
  var batelco = ["2001:16a8:","2001:16a9:"];
  var other   = ["2a0d:5600:","2a0d:5601:","2a0f:b246:","2001:df1:8900:"];

  var all = orange.concat(zain).concat(umniah).concat(vtel)
                  .concat(damamax).concat(batelco).concat(other);

  for (var i = 0; i < all.length; i++) {
    if (ipLow.indexOf(all[i]) === 0) return true;
  }
  return false;
}

// ============================================================
//  MAIN FindProxyForURL
// ============================================================
function FindProxyForURL(url, host) {

  var ip = "";
  try { ip = dnsResolve(host); } catch(e) { ip = ""; }

  // ── شبكة محلية → مباشر
  if (isLocalOrPrivate(host)) return DIRECT;

  // ── YouTube / GitHub → مباشر
  if (isYouTube(host)) return DIRECT;
  if (isGitHub(host))  return DIRECT;

  // ── IPv4 → مباشر (لا نتدخل)
  if (ip && !isIPv6(ip)) return DIRECT;

  // ── نطاقات محظورة → حجب
  if (ip && isBlockedRegion(ip)) return BLOCK;

  var isPubgHost = isPUBG(host, url);

  // ── حركة غير PUBG
  if (!isPubgHost) {
    if (ip && isJordanIPv6(ip)) return DIRECT;
    return PROXY;
  }

  // ══════════════════════════════════════════════════
  //  حركة PUBG حصراً من هنا
  // ══════════════════════════════════════════════════

  var urlLow  = url.toLowerCase();
  var hostLow = host.toLowerCase();

  var isCritical = PRIORITY.CRITICAL.test(urlLow + hostLow);
  var isSecurity = PRIORITY.SECURITY.test(urlLow + hostLow);
  var isLobby    = PRIORITY.LOBBY.test(urlLow + hostLow);

  // ──────────────────────────────────────────────────
  //  MATCH / SECURITY → /64 مثبَّت عبر البروكسي
  // ──────────────────────────────────────────────────
  if (isCritical || isSecurity) {
    if (!ip || !isIPv6(ip) || !isJordanIPv6(ip)) return BLOCK;

    var net64 = ip.split(":").slice(0, 4).join(":");

    if (!SESSION.matchNet) {
      SESSION.matchNet  = net64;
      SESSION.matchHost = host;
      return PROXY;
    }

    if (host !== SESSION.matchHost) return BLOCK;
    if (net64 !== SESSION.matchNet) return BLOCK;

    return PROXY;
  }

  // ──────────────────────────────────────────────────
  //  LOBBY — المنطق الجديد الذي يحل مشكلتك
  //
  //  الفكرة: إذا كان سيرفر اللوبي أردني IPv6 حقيقي،
  //  نتصل به مباشرة حتى يرى PUBG موقعك الحقيقي (الأردن)
  //  ويضعك في queue الأردن/ME.
  //
  //  إذا كان خارجي أو مجهول، نمرره عبر البروكسي
  //  حتى يبدو الاتصال أردنياً من الخارج.
  // ──────────────────────────────────────────────────
  if (isLobby) {

    // حالة 1: لا يوجد IP أو IPv4 → بروكسي لإظهار هوية أردنية
    if (!ip || !isIPv6(ip)) return PROXY;

    if (isJordanIPv6(ip)) {
      // ✅ سيرفر لوبي أردني حقيقي
      //    سجّل الـ /48 للاستخدام لاحقاً
      var net48 = ip.split(":").slice(0, 3).join(":");
      SESSION.lobbyNet    = net48;
      SESSION.lobbyLocked = true;

      // ← التغيير الجوهري: DIRECT بدل PROXY
      //   هذا يجعل PUBG يرى أنك في الأردن فعلاً
      return DIRECT;
    }

    // حالة 2: سيرفر لوبي خارجي مجهول
    //   إذا سبق وأننا ثبّتنا لوبي أردني، أعطه أولوية
    if (SESSION.lobbyLocked) {
      // نمرره بالبروكسي مع الحفاظ على الهوية الأردنية
      return PROXY;
    }

    // حالة 3: لم يتثبت لوبي بعد، سيرفر خارجي → بروكسي
    return PROXY;
  }

  // ──────────────────────────────────────────────────
  //  PUBG عام: CDN / Assets / Updates
  //  إذا كانت أردنية → مباشر لتخفيف الحمل على البروكسي
  //  إذا كانت خارجية → بروكسي
  // ──────────────────────────────────────────────────
  if (ip && isJordanIPv6(ip)) return DIRECT;

  return PROXY;
}

// ============================================================
//  END — Jordan IPv6 Only | Match /64 | Lobby /48 DIRECT-JO
// ============================================================
