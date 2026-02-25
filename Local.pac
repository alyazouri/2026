// ============================================================
//  JORDAN PUBG MOBILE - PAC SCRIPT v5.0
//  Proxy: 46.185.131.218:20001
//  المنطق الجديد: PUBG كله عبر البروكسي بدون شروط
//  لا اعتماد على IPv6 detection لأن dnsResolve غير موثوق
// ============================================================

var PROXY  = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

// ============================================================
//  الشبكة المحلية والمستثنيات الثابتة
// ============================================================
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

// ============================================================
//  مستثنيات كاملة — تمر مباشرة دائماً
// ============================================================
function isAlwaysDirect(h) {

  // YouTube
  if (shExpMatch(h, "*.youtube.com"))          return true;
  if (shExpMatch(h, "*.googlevideo.com"))       return true;
  if (shExpMatch(h, "*.ytimg.com"))             return true;
  if (shExpMatch(h, "youtu.be"))                return true;

  // GitHub
  if (shExpMatch(h, "github.com"))              return true;
  if (shExpMatch(h, "*.github.com"))            return true;
  if (shExpMatch(h, "*.githubusercontent.com")) return true;

  // Google عام (بحث، Maps، إلخ)
  if (shExpMatch(h, "*.google.com"))            return true;
  if (shExpMatch(h, "*.googleapis.com"))        return true;
  if (shExpMatch(h, "*.gstatic.com"))           return true;

  // Apple
  if (shExpMatch(h, "*.apple.com"))             return true;
  if (shExpMatch(h, "*.icloud.com"))            return true;

  // Windows Update
  if (shExpMatch(h, "*.windowsupdate.com"))     return true;
  if (shExpMatch(h, "*.microsoft.com"))         return true;

  return false;
}

// ============================================================
//  كاشف حركة PUBG / Tencent / Krafton
//  ─ نعتمد على اسم الهوست مباشرة بدون DNS ─
//  أضفنا نطاقات أكثر شمولاً لتغطية كل خوادم PUBG Mobile
// ============================================================
function isPUBGHost(h) {

  var hLow = h.toLowerCase();

  // ─── نطاقات Tencent / Krafton الأساسية ───
  if (shExpMatch(h, "*.pubgmobile.com"))        return true;
  if (shExpMatch(h, "*.pubg.com"))              return true;
  if (shExpMatch(h, "*.krafton.com"))           return true;

  // ─── Tencent Cloud / CDN ───
  if (shExpMatch(h, "*.tencentcloud.com"))      return true;
  if (shExpMatch(h, "*.tencent.com"))           return true;
  if (shExpMatch(h, "*.myqcloud.com"))          return true;
  if (shExpMatch(h, "*.qcloud.com"))            return true;
  if (shExpMatch(h, "*.qq.com"))                return true;

  // ─── Level Infinite (الناشر الرسمي) ───
  if (shExpMatch(h, "*.levelinfinite.com"))     return true;

  // ─── Lightspeed Studios ───
  if (shExpMatch(h, "*.lightspeed-studios.com")) return true;
  if (shExpMatch(h, "*.lsgames.com"))            return true;

  // ─── Garena (بعض المناطق) ───
  if (shExpMatch(h, "*.garena.com"))            return true;
  if (shExpMatch(h, "*.garena.tw"))             return true;

  // ─── خوادم اللعب المباشر ─ يمكن أن تكون IPs مباشرة
  //     أو نطاقات مثل: gamesvr-*.pubgmobile.com
  //     نغطيها بالـ regex على اسم الهوست ───
  if (/gamesvr|gsvoice|relay|realtime|battle|match|ingame/i.test(hLow)) return true;

  // ─── CDN وأصول اللعبة ───
  if (/pubg|pubgm|pubgmobile|tencent|krafton|levelinfinite|lightspeed/i.test(hLow)) return true;

  return false;
}

// ============================================================
//  MAIN FindProxyForURL
// ============================================================
function FindProxyForURL(url, host) {

  var hLow = host.toLowerCase();

  // ── 1. شبكة محلية → مباشر دائماً
  if (isLocalOrPrivate(host)) return DIRECT;

  // ── 2. المستثنيات الكاملة → مباشر
  if (isAlwaysDirect(host)) return DIRECT;

  // ── 3. PUBG / Tencent / Krafton → بروكسي بدون أي شرط آخر
  //    هذا هو جوهر التغيير: لا نتحقق من IPv6 ولا من DNS
  //    البروكسي هو المسؤول عن إظهار الهوية الأردنية
  if (isPUBGHost(host)) return PROXY;

  // ── 4. باقي الحركة → مباشر
  //    لأننا ما عندنا سبب نمرر حركة غير PUBG عبر البروكسي
  return DIRECT;
}

// ============================================================
//  END — v5.0 | Simple, Direct, Reliable
// ============================================================
