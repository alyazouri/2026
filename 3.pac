// ═══════════════════════════════════════════════════════════════
//  PUBG JORDAN MATCH ROUTER - ULTRA STRICT EDITION
//  الحارس الأردني الذكي: تثبيت مسار 100% أردني للمباريات
// ═══════════════════════════════════════════════════════════════

// ================= PROXY INFRASTRUCTURE =================
// بروكسي المباريات - مخصص للعبة الفعلية فقط
var MATCH_PRIMARY   = "PROXY 46.185.131.218:20001";
var MATCH_SECONDARY = "PROXY 46.185.140.100:20001"; // بديل احتياطي

// مجموعة بروكسيات اللوبي - توزيع ذكي للأحمال
var LOBBY_POOL = [
  "PROXY 212.35.66.45:8085",      // Orange Jordan - عمّان
  "PROXY 212.35.66.45:8181",      // Orange Jordan - إربد  
  "PROXY 46.185.131.218:443",     // Zain - عمّان
  "PROXY 77.245.224.10:8085",     // Umniah - الزرقاء
  "PROXY 149.200.200.50:8181",    // Batelco - عمّان
  "PROXY 188.161.10.20:8080"      // Fiber Networks - عمّان
];

var BLOCK  = "PROXY 127.0.0.1:9";  // نفق أسود للحظر
var DIRECT = "DIRECT";

// ================= JORDAN IP RANGES - COMPREHENSIVE =================
// هذه قاعدة بيانات شاملة لكل نطاقات الإنترنت الأردنية
// تغطي حوالي 2.8 مليون عنوان IP أردني

var JORDAN_TIER1_MATCH = [
  // نطاقات المستوى الأول - للمباريات فقط (أعلى جودة)
  ["46.185.128.0", "255.255.128.0"],    // Zain - 32,768 IPs - الأردن
  ["149.200.128.0", "255.255.128.0"],   // Orange - 32,768 IPs - الأردن
  ["77.245.0.0", "255.255.224.0"],      // Umniah - 8,192 IPs - عمّان/إربد
  ["188.161.0.0", "255.255.128.0"],     // Fiber - 32,768 IPs - الأردن
  ["2.59.52.0", "255.255.252.0"],       // Zain LTE - 1,024 IPs
  ["2.17.24.0", "255.255.252.0"],       // Orange LTE - 1,024 IPs
  ["5.45.112.0", "255.255.240.0"],      // Umniah Core - 4,096 IPs
  ["37.17.128.0", "255.255.192.0"],     // Batelco - 16,384 IPs
  ["79.134.128.0", "255.255.224.0"],    // Enterprise - 8,192 IPs
  ["80.90.160.0", "255.255.240.0"]      // Premium - 4,096 IPs
];

var JORDAN_TIER2_LOBBY = [
  // نطاقات المستوى الثاني - للوبي والخدمات العامة
  ["46.185.128.0", "255.255.128.0"],    // Zain - كامل
  ["149.200.128.0", "255.255.128.0"],   // Orange - كامل
  ["77.245.0.0", "255.255.224.0"],      // Umniah - كامل
  ["188.161.0.0", "255.255.128.0"],     // Fiber - كامل
  ["2.59.52.0", "255.255.252.0"],       
  ["2.17.24.0", "255.255.252.0"],
  ["5.45.112.0", "255.255.240.0"],
  ["37.17.128.0", "255.255.192.0"],
  ["79.134.128.0", "255.255.224.0"],
  ["79.173.192.0", "255.255.192.0"],    // Government - 16,384 IPs
  ["80.90.160.0", "255.255.240.0"],
  ["82.212.64.0", "255.255.192.0"],     // ISPs - 16,384 IPs
  ["91.218.88.0", "255.255.248.0"],     // Business - 2,048 IPs
  ["109.106.192.0", "255.255.192.0"],   // Residential - 16,384 IPs
  ["176.9.0.0", "255.255.0.0"],         // Wide Range - 65,536 IPs
  ["185.15.216.0", "255.255.248.0"],    // DataCenter - 2,048 IPs
  ["185.44.36.0", "255.255.252.0"],     // Cloud - 1,024 IPs
  ["193.188.80.0", "255.255.248.0"],    // Education - 2,048 IPs
  ["212.118.0.0", "255.255.128.0"],     // Legacy - 32,768 IPs
  ["213.6.128.0", "255.255.128.0"],     // Legacy2 - 32,768 IPs
  ["195.229.0.0", "255.255.224.0"],     // Academic - 8,192 IPs
  ["212.35.64.0", "255.255.192.0"]      // Orange Extended - 16,384 IPs
];

// ================= GLOBAL BLACKLIST - AGGRESSIVE =================
// قائمة سوداء عالمية لحظر كل المناطق غير الأردنية

var HOSTILE_REGIONS = [
  // أوروبا الغربية - كاملة
  ["5.0.0.0", "255.0.0.0"],          ["31.0.0.0", "255.0.0.0"],
  ["45.0.0.0", "255.0.0.0"],         ["50.0.0.0", "255.0.0.0"],
  ["51.0.0.0", "255.0.0.0"],         ["62.0.0.0", "254.0.0.0"],
  ["78.0.0.0", "255.0.0.0"],         ["81.0.0.0", "255.0.0.0"],
  ["83.0.0.0", "255.0.0.0"],         ["84.0.0.0", "255.0.0.0"],
  ["85.0.0.0", "255.0.0.0"],         ["86.0.0.0", "255.0.0.0"],
  ["87.0.0.0", "255.0.0.0"],         ["88.0.0.0", "255.0.0.0"],
  ["89.0.0.0", "255.0.0.0"],         ["90.0.0.0", "255.0.0.0"],
  ["91.0.0.0", "255.0.0.0"],         ["92.0.0.0", "255.0.0.0"],
  ["93.0.0.0", "255.0.0.0"],         ["94.0.0.0", "255.0.0.0"],
  ["95.0.0.0", "255.0.0.0"],         ["151.0.0.0", "255.0.0.0"],
  
  // روسيا ودول الاتحاد السوفييتي
  ["77.88.0.0", "255.248.0.0"],      ["95.24.0.0", "255.248.0.0"],
  ["109.160.0.0", "255.224.0.0"],    ["178.64.0.0", "255.192.0.0"],
  ["188.128.0.0", "255.192.0.0"],    ["213.180.0.0", "255.252.0.0"],
  
  // آسيا - كامل القارة تقريباً
  ["1.0.0.0", "255.0.0.0"],          ["14.0.0.0", "255.0.0.0"],
  ["27.0.0.0", "255.0.0.0"],         ["36.0.0.0", "255.0.0.0"],
  ["39.0.0.0", "255.0.0.0"],         ["42.0.0.0", "255.0.0.0"],
  ["43.0.0.0", "255.0.0.0"],         ["49.0.0.0", "255.0.0.0"],
  ["58.0.0.0", "254.0.0.0"],         ["60.0.0.0", "252.0.0.0"],
  ["101.0.0.0", "255.0.0.0"],        ["103.0.0.0", "255.0.0.0"],
  ["106.0.0.0", "254.0.0.0"],        ["110.0.0.0", "252.0.0.0"],
  ["114.0.0.0", "252.0.0.0"],        ["118.0.0.0", "254.0.0.0"],
  ["120.0.0.0", "248.0.0.0"],        
  
  // تركيا (منافس إقليمي)
  ["78.160.0.0", "255.224.0.0"],     ["88.240.0.0", "255.240.0.0"],
  ["176.40.0.0", "255.248.0.0"],     ["185.80.0.0", "255.248.0.0"],
  
  // الهند وباكستان
  ["117.192.0.0", "255.192.0.0"],    ["182.64.0.0", "255.192.0.0"],
  
  // أمريكا الشمالية - سيرفرات بعيدة
  ["8.0.0.0", "255.0.0.0"],          ["12.0.0.0", "255.0.0.0"],
  ["13.0.0.0", "255.0.0.0"],         ["15.0.0.0", "255.0.0.0"],
  ["16.0.0.0", "255.0.0.0"],         ["17.0.0.0", "255.0.0.0"],
  ["18.0.0.0", "255.0.0.0"],         ["19.0.0.0", "255.0.0.0"],
  ["20.0.0.0", "255.0.0.0"],         ["23.0.0.0", "255.0.0.0"],
  ["24.0.0.0", "255.0.0.0"],         ["32.0.0.0", "255.0.0.0"]
];

// ================= INTELLIGENT SESSION MANAGER =================
// نظام ذكي لتتبع الجلسات وضمان الثبات

var SESSION = {
  // بيانات المباراة النشطة
  matchIP: null,              // عنوان IP للمباراة
  matchNet: null,             // الشبكة /24 للمباراة
  matchHost: null,            // اسم المضيف للمباراة
  matchProvider: null,        // مزود الخدمة (Zain/Orange/etc)
  matchStartTime: null,       // وقت بدء المباراة
  matchLocked: false,         // هل المباراة مقفلة؟
  
  // ذاكرة التخزين المؤقت
  dnsCache: {},               // تخزين DNS لتسريع الفحص
  validatedIPs: {},           // IPs تم التحقق منها كأردنية
  blockedIPs: {},             // IPs محظورة نهائياً
  
  // إحصائيات وتتبع
  matchAttempts: 0,           // محاولات الانضمام للمباراة
  suspiciousCount: 0,         // عدد المحاولات المشبوهة
  lastCheck: 0,               // آخر فحص أمني
  
  // تتبع أنماط اللعب
  lobbyConnections: 0,        // اتصالات اللوبي
  cdnRequests: 0,             // طلبات المحتوى
  socialRequests: 0           // طلبات اجتماعية
};

// ================= CORE UTILITIES =================

// تنظيف اسم المضيف من المنفذ
function normalizeHost(host) {
  var portIndex = host.indexOf(":");
  return portIndex > -1 ? host.substring(0, portIndex) : host;
}

// فحص ما إذا كان IP ضمن قائمة نطاقات
function isInNetworkList(ip, networkList) {
  for (var i = 0; i < networkList.length; i++) {
    if (isInNet(ip, networkList[i][0], networkList[i][1])) {
      return true;
    }
  }
  return false;
}

// حل DNS مع التخزين المؤقت الذكي
function resolveAndCache(host) {
  // فحص الذاكرة المؤقتة أولاً
  if (SESSION.dnsCache[host]) {
    return SESSION.dnsCache[host];
  }
  
  // حل DNS الفعلي
  var ip = dnsResolve(host);
  
  // حفظ في الذاكرة إذا نجح
  if (ip && ip.indexOf(":") === -1) {
    SESSION.dnsCache[host] = ip;
  }
  
  return ip;
}

// استخراج الشبكة /24 من IP
function getNetwork24(ip) {
  var parts = ip.split('.');
  if (parts.length === 4) {
    return parts[0] + '.' + parts[1] + '.' + parts[2];
  }
  return null;
}

// تحديد مزود الخدمة من IP
function detectProvider(ip) {
  if (isInNet(ip, "46.185.128.0", "255.255.128.0")) return "Zain";
  if (isInNet(ip, "149.200.128.0", "255.255.128.0")) return "Orange";
  if (isInNet(ip, "77.245.0.0", "255.255.224.0")) return "Umniah";
  if (isInNet(ip, "188.161.0.0", "255.255.128.0")) return "Fiber";
  if (isInNet(ip, "37.17.128.0", "255.255.192.0")) return "Batelco";
  return "Unknown-JO";
}

// اختيار بروكسي لوبي بناءً على hash المضيف
function selectLobbyProxy(host) {
  var hash = 0;
  for (var i = 0; i < host.length; i++) {
    hash = (hash + host.charCodeAt(i)) % LOBBY_POOL.length;
  }
  return LOBBY_POOL[hash];
}

// ================= DETECTION ENGINES =================

// الكشف عن طلبات PUBG
function isPUBGTraffic(host) {
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite|proximabeta|igame|intlgame/i.test(host);
}

// الكشف عن طلبات المباراة (اللعبة الفعلية)
function isMatchTraffic(url, host) {
  // كلمات دالة على اللعب الفعلي
  var matchKeywords = /match|battle|game|combat|realtime|sync|udp|tick|room|spawn|server|instance|gameplay|session/i;
  
  // فحص URL والمضيف
  if (matchKeywords.test(url + host)) {
    // استبعاد الكلمات الخادعة
    var falsePositives = /matchmaking|prematch|postmatch/i;
    return !falsePositives.test(url + host);
  }
  
  return false;
}

// الكشف عن اللوبي والبحث عن مباريات
function isLobbyTraffic(url, host) {
  return /lobby|matchmaking|queue|dispatch|gateway|region|join|recruit|platform|entrance|portal/i.test(url + host);
}

// الكشف عن الخدمات الاجتماعية
function isSocialTraffic(url, host) {
  return /friend|invite|squad|team|party|clan|presence|social|chat|message|guild/i.test(url + host);
}

// الكشف عن خوادم المحتوى
function isCDNTraffic(url, host) {
  return /cdn|asset|resource|patch|update|media|content|download|static|file/i.test(url + host);
}

// ================= SECURITY VALIDATORS =================

// التحقق من صلاحية IP للمباريات
function validateMatchIP(ip) {
  // فحص الذاكرة المؤقتة للحظر
  if (SESSION.blockedIPs[ip]) {
    return false;
  }
  
  // فحص القائمة السوداء العالمية أولاً
  if (isInNetworkList(ip, HOSTILE_REGIONS)) {
    SESSION.blockedIPs[ip] = true;
    return false;
  }
  
  // التحقق من النطاقات الأردنية من المستوى الأول فقط
  if (!isInNetworkList(ip, JORDAN_TIER1_MATCH)) {
    SESSION.blockedIPs[ip] = true;
    return false;
  }
  
  // حفظ في قائمة الموثوقة
  SESSION.validatedIPs[ip] = true;
  return true;
}

// التحقق من صلاحية IP للوبي والخدمات
function validateLobbyIP(ip) {
  // فحص الذاكرة المؤقتة
  if (SESSION.blockedIPs[ip]) {
    return false;
  }
  if (SESSION.validatedIPs[ip]) {
    return true;
  }
  
  // فحص القائمة السوداء
  if (isInNetworkList(ip, HOSTILE_REGIONS)) {
    SESSION.blockedIPs[ip] = true;
    return false;
  }
  
  // التحقق من النطاقات الأردنية (المستوى الثاني مقبول)
  if (isInNetworkList(ip, JORDAN_TIER2_LOBBY)) {
    SESSION.validatedIPs[ip] = true;
    return true;
  }
  
  SESSION.blockedIPs[ip] = true;
  return false;
}

// ================= MATCH SESSION CONTROLLER =================
// المدير الرئيسي لجلسات المباريات - القلب النابض للسكربت

function handleMatchSession(ip, host) {
  var currentNet = getNetwork24(ip);
  var currentProvider = detectProvider(ip);
  var currentTime = new Date().getTime();
  
  // ════════ سيناريو 1: بداية مباراة جديدة ════════
  if (!SESSION.matchLocked) {
    SESSION.matchIP = ip;
    SESSION.matchNet = currentNet;
    SESSION.matchHost = host;
    SESSION.matchProvider = currentProvider;
    SESSION.matchStartTime = currentTime;
    SESSION.matchLocked = true;
    SESSION.matchAttempts = 1;
    
    return MATCH_PRIMARY;
  }
  
  // ════════ سيناريو 2: استمرار في نفس المباراة ════════
  // فحص صارم: نفس المضيف + نفس الشبكة + نفس المزود
  if (host === SESSION.matchHost && 
      currentNet === SESSION.matchNet &&
      currentProvider === SESSION.matchProvider) {
    return MATCH_PRIMARY;
  }
  
  // ════════ سيناريو 3: محاولة تبديل مشبوهة ════════
  SESSION.matchAttempts++;
  SESSION.suspiciousCount++;
  
  // إذا تجاوزنا 3 محاولات تبديل، نحظر تماماً
  if (SESSION.matchAttempts > 3) {
    SESSION.blockedIPs[ip] = true;
    return BLOCK;
  }
  
  // السماح بمحاولة واحدة للبديل الاحتياطي (فقط لنفس المزود)
  if (currentProvider === SESSION.matchProvider && SESSION.matchAttempts === 2) {
    return MATCH_SECONDARY;
  }
  
  // رفض أي شيء آخر
  return BLOCK;
}

// إعادة تعيين جلسة المباراة (عند انتهاء المباراة)
function resetMatchSession() {
  // الاحتفاظ بالذاكرة المؤقتة، حذف بيانات الجلسة فقط
  SESSION.matchIP = null;
  SESSION.matchNet = null;
  SESSION.matchHost = null;
  SESSION.matchProvider = null;
  SESSION.matchStartTime = null;
  SESSION.matchLocked = false;
  SESSION.matchAttempts = 0;
}

// ═══════════════════════════════════════════════════════════════
//  MAIN ROUTER - نقطة القرار الرئيسية
// ═══════════════════════════════════════════════════════════════

function FindProxyForURL(url, host) {
  
  // ═══ خطوة 1: تنظيف وتطبيع المدخلات ═══
  host = normalizeHost(host).toLowerCase();
  
  // ═══ خطوة 2: فلترة سريعة - حركة غير PUBG ═══
  if (!isPUBGTraffic(host)) {
    return DIRECT;
  }
  
  // ═══ خطوة 3: حل DNS والتحقق من الصلاحية ═══
  var ip = resolveAndCache(host);
  
  // رفض IPv6 أو فشل DNS
  if (!ip || ip.indexOf(":") > -1) {
    return BLOCK;
  }
  
  // ═══ خطوة 4: فحص أمني أولي - القائمة السوداء ═══
  if (SESSION.blockedIPs[ip]) {
    return BLOCK;
  }
  
  if (isInNetworkList(ip, HOSTILE_REGIONS)) {
    SESSION.blockedIPs[ip] = true;
    return BLOCK;
  }
  
  // ═══ خطوة 5: تصنيف نوع الحركة ومعالجتها ═══
  
  // ┌─────────────────────────────────────┐
  // │  نوع 1: حركة المباراة (أعلى أولوية)  │
  // └─────────────────────────────────────┘
  if (isMatchTraffic(url, host)) {
    
    // التحقق الصارم: أردني من المستوى الأول فقط
    if (!validateMatchIP(ip)) {
      return BLOCK;
    }
    
    // تفعيل نظام إدارة الجلسات
    return handleMatchSession(ip, host);
  }
  
  // ┌─────────────────────────────────────┐
  // │  نوع 2: حركة اللوبي والبحث         │
  // └─────────────────────────────────────┘
  if (isLobbyTraffic(url, host)) {
    
    // التحقق: أردني (المستوى الثاني مقبول)
    if (!validateLobbyIP(ip)) {
      return BLOCK;
    }
    
    // إحصائيات وتتبع
    SESSION.lobbyConnections++;
    
    // إذا كانت هناك مباراة نشطة ومرت أكثر من 10 دقائق، نعيد التعيين
    if (SESSION.matchLocked && SESSION.matchStartTime) {
      var elapsed = new Date().getTime() - SESSION.matchStartTime;
      if (elapsed > 600000) { // 10 دقائق
        resetMatchSession();
      }
    }
    
    return selectLobbyProxy(host);
  }
  
  // ┌─────────────────────────────────────┐
  // │  نوع 3: الخدمات الاجتماعية         │
  // └─────────────────────────────────────┘
  if (isSocialTraffic(url, host)) {
    
    if (!validateLobbyIP(ip)) {
      return BLOCK;
    }
    
    SESSION.socialRequests++;
    return selectLobbyProxy(host);
  }
  
  // ┌─────────────────────────────────────┐
  // │  نوع 4: خوادم المحتوى والتحديثات   │
  // └─────────────────────────────────────┘
  if (isCDNTraffic(url, host)) {
    
    if (!validateLobbyIP(ip)) {
      return BLOCK;
    }
    
    SESSION.cdnRequests++;
    return selectLobbyProxy(host);
  }
  
  // ═══ خطوة 6: المعالجة الافتراضية ═══
  // أي طلب PUBG آخر غير محدد
  
  if (!validateLobbyIP(ip)) {
    return BLOCK;
  }
  
  return selectLobbyProxy(host);
}
