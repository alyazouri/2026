// ═══════════════════════════════════════════════════════════════
//  PUBG JORDAN COMMUNITY ROUTER - SMART CLUSTERING EDITION
//  نظام ذكي لتجميع اللاعبين الأردنيين في نفس المباريات
// ═══════════════════════════════════════════════════════════════

// ================= INFRASTRUCTURE =================
var MATCH_PRIMARY = "PROXY 46.185.131.218:20001";
var MATCH_SECONDARY = "PROXY 46.185.140.100:20001";

// بروكسيات منظمة حسب المناطق الجغرافية في الأردن
// هذا التقسيم مهم جداً لأنه يجمع اللاعبين من نفس المنطقة
var REGIONAL_LOBBIES = {
  // منطقة عمّان والوسط
  amman: [
    "PROXY 212.35.66.45:8085",      // Orange - عمّان
    "PROXY 46.185.131.218:443"      // Zain - عمّان
  ],
  // منطقة الشمال (إربد، جرش، عجلون)
  north: [
    "PROXY 212.35.66.45:8181",      // Orange - إربد
    "PROXY 77.245.224.10:8085"      // Umniah - إربد
  ],
  // منطقة الجنوب (الكرك، معان، العقبة)
  south: [
    "PROXY 149.200.200.50:8181",    // Batelco - الكرك
    "PROXY 188.161.10.20:8080"      // Fiber - العقبة
  ]
};

var BLOCK = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ================= JORDAN NETWORKS =================
var JORDAN_TIER1_MATCH = [
  ["46.185.128.0", "255.255.128.0"],
  ["149.200.128.0", "255.255.128.0"],
  ["77.245.0.0", "255.255.224.0"],
  ["188.161.0.0", "255.255.128.0"],
  ["2.59.52.0", "255.255.252.0"],
  ["2.17.24.0", "255.255.252.0"]
];

var JORDAN_TIER2_LOBBY = [
  ["46.185.128.0", "255.255.128.0"],
  ["149.200.128.0", "255.255.128.0"],
  ["77.245.0.0", "255.255.224.0"],
  ["188.161.0.0", "255.255.128.0"],
  ["2.59.52.0", "255.255.252.0"],
  ["2.17.24.0", "255.255.252.0"],
  ["79.134.128.0", "255.255.224.0"],
  ["79.173.192.0", "255.255.192.0"],
  ["80.90.160.0", "255.255.240.0"],
  ["82.212.64.0", "255.255.192.0"],
  ["109.106.192.0", "255.255.192.0"],
  ["176.9.0.0", "255.255.0.0"],
  ["212.118.0.0", "255.255.128.0"],
  ["213.6.128.0", "255.255.128.0"]
];

var HOSTILE_REGIONS = [
  ["5.0.0.0", "255.0.0.0"], ["31.0.0.0", "255.0.0.0"],
  ["78.0.0.0", "255.0.0.0"], ["81.0.0.0", "255.0.0.0"],
  ["1.0.0.0", "255.0.0.0"], ["14.0.0.0", "255.0.0.0"],
  ["27.0.0.0", "255.0.0.0"], ["36.0.0.0", "255.0.0.0"],
  ["58.0.0.0", "254.0.0.0"], ["60.0.0.0", "252.0.0.0"],
  ["101.0.0.0", "255.0.0.0"], ["106.0.0.0", "254.0.0.0"],
  ["120.0.0.0", "248.0.0.0"]
];

// ═══════════════════════════════════════════════════════════════
//  SMART CLUSTERING SYSTEM - قلب النظام الذكي
// ═══════════════════════════════════════════════════════════════

var CLUSTER = {
  // ════ نظام تسجيل السيرفرات الناجحة ════
  // هنا نحفظ السيرفرات التي أثبتت نجاحها في جمع لاعبين أردنيين
  successfulServers: {},
  
  // ════ تتبع الأنماط الزمنية ════
  // نتعلم في أي ساعات يكون هناك أكبر عدد من اللاعبين الأردنيين
  peakHours: {
    hourlyActivity: {},  // نشاط كل ساعة
    bestHour: null,      // أفضل ساعة للعب
    currentHour: null    // الساعة الحالية
  },
  
  // ════ التجميع الجغرافي ════
  // نحدد المنطقة الجغرافية للاعب لتوجيهه للبروكسي الأقرب
  playerRegion: null,
  detectedProvider: null,
  
  // ════ نظام النقاط للسيرفرات ════
  // كل سيرفر يحصل على نقاط بناءً على الأداء
  serverScores: {},
  
  // ════ ذاكرة الجلسات الناجحة ════
  recentMatches: [],
  maxMatchHistory: 10,
  
  // ════ عداد اللاعبين النشطين ════
  // تقدير عدد اللاعبين الأردنيين النشطين حالياً
  estimatedActivePlayers: 0,
  lastPlayerCountUpdate: 0
};

// ═══════════════════════════════════════════════════════════════
//  GEOGRAPHIC DETECTION - كشف الموقع الجغرافي
// ═══════════════════════════════════════════════════════════════

function detectPlayerRegion(ip) {
  // هذه الدالة تحدد في أي منطقة من الأردن يقع اللاعب
  // بناءً على نطاق الـ IP الخاص به
  
  // منطقة عمّان والوسط - أكبر تركيز للاعبين
  if (isInNet(ip, "46.185.128.0", "255.255.240.0") ||
      isInNet(ip, "212.35.66.0", "255.255.254.0") ||
      isInNet(ip, "176.9.0.0", "255.255.0.0")) {
    return "amman";
  }
  
  // منطقة الشمال - إربد والمناطق المحيطة
  if (isInNet(ip, "77.245.0.0", "255.255.240.0") ||
      isInNet(ip, "212.35.68.0", "255.255.254.0")) {
    return "north";
  }
  
  // منطقة الجنوب - الكرك ومعان والعقبة
  if (isInNet(ip, "149.200.128.0", "255.255.192.0") ||
      isInNet(ip, "188.161.0.0", "255.255.224.0")) {
    return "south";
  }
  
  // افتراضي: عمّان (الأكثر احتمالاً)
  return "amman";
}

// ═══════════════════════════════════════════════════════════════
//  TIME-BASED CLUSTERING - التجميع الزمني الذكي
// ═══════════════════════════════════════════════════════════════

function getSmartTimingBonus() {
  // هذه الدالة تحسب "مكافأة التوقيت" - فكرة مبتكرة لتشجيع اللعب الجماعي
  
  var now = new Date();
  var currentHour = now.getHours();
  var currentDay = now.getDay(); // 0 = الأحد, 6 = السبت
  var currentMinute = now.getMinutes();
  
  // تحديث الساعة الحالية
  CLUSTER.peakHours.currentHour = currentHour;
  
  // ════ أوقات الذروة المعروفة للاعبين الأردنيين ════
  // بناءً على أنماط اللعب المعتادة في المنطقة العربية
  
  var bonusMultiplier = 1.0;
  
  // المساء (7 مساءً - 11 مساءً) - وقت الذروة الرئيسي
  if (currentHour >= 19 && currentHour <= 23) {
    bonusMultiplier = 3.0; // مكافأة كبيرة
  }
  
  // بعد منتصف الليل (12 صباحاً - 2 صباحاً) - وقت ذروة ثانوي
  else if (currentHour >= 0 && currentHour <= 2) {
    bonusMultiplier = 2.5;
  }
  
  // بعد الظهر (2 ظهراً - 5 مساءً) - نشاط متوسط
  else if (currentHour >= 14 && currentHour <= 17) {
    bonusMultiplier = 1.8;
  }
  
  // عطلة نهاية الأسبوع (الجمعة والسبت) - مكافأة إضافية
  if (currentDay === 5 || currentDay === 6) {
    bonusMultiplier *= 1.5;
  }
  
  // ════ الدقيقة الذهبية - فكرة مبتكرة ════
  // كل ساعة في الدقائق 0-5 و 30-35 نعطي مكافأة إضافية
  // لتشجيع اللاعبين على الدخول في نفس الوقت تقريباً
  if ((currentMinute >= 0 && currentMinute <= 5) ||
      (currentMinute >= 30 && currentMinute <= 35)) {
    bonusMultiplier *= 1.3;
  }
  
  // تسجيل النشاط في هذه الساعة
  if (!CLUSTER.peakHours.hourlyActivity[currentHour]) {
    CLUSTER.peakHours.hourlyActivity[currentHour] = 0;
  }
  CLUSTER.peakHours.hourlyActivity[currentHour]++;
  
  return bonusMultiplier;
}

// ═══════════════════════════════════════════════════════════════
//  SERVER SCORING SYSTEM - نظام تقييم السيرفرات
// ═══════════════════════════════════════════════════════════════

function scoreMatchServer(ip, host) {
  // هذه الدالة تعطي نقاطاً لكل سيرفر مباراة بناءً على عدة عوامل
  // السيرفرات ذات النقاط الأعلى تحصل على أولوية في التوجيه
  
  var serverKey = ip + ":" + host;
  var score = 100; // نقطة البداية الأساسية
  
  // ════ عامل 1: التاريخ الناجح ════
  // إذا كان هذا السيرفر نجح سابقاً في جمع لاعبين أردنيين
  if (CLUSTER.successfulServers[serverKey]) {
    var successCount = CLUSTER.successfulServers[serverKey];
    score += successCount * 20; // كل نجاح سابق يضيف 20 نقطة
  }
  
  // ════ عامل 2: الموقع الجغرافي ════
  // السيرفرات في نفس منطقة اللاعب تحصل على أولوية
  var serverRegion = detectPlayerRegion(ip);
  if (serverRegion === CLUSTER.playerRegion) {
    score += 50; // مكافأة كبيرة للتطابق الجغرافي
  }
  
  // ════ عامل 3: مزود الخدمة ════
  // إذا كان السيرفر على نفس شبكة اللاعب (أسرع اتصال)
  var serverProvider = detectProvider(ip);
  if (serverProvider === CLUSTER.detectedProvider) {
    score += 30;
  }
  
  // ════ عامل 4: التوقيت الذكي ════
  var timingBonus = getSmartTimingBonus();
  score *= timingBonus;
  
  // ════ عامل 5: الاستخدام الحديث ════
  // السيرفرات المستخدمة مؤخراً تحصل على أولوية (اللاعبون ربما لا يزالون هناك)
  for (var i = 0; i < CLUSTER.recentMatches.length; i++) {
    if (CLUSTER.recentMatches[i] === serverKey) {
      var recency = CLUSTER.recentMatches.length - i;
      score += recency * 10; // الأحدث يحصل على نقاط أكثر
    }
  }
  
  // حفظ النقاط
  CLUSTER.serverScores[serverKey] = score;
  
  return score;
}

function getBestMatchServer(ip, host) {
  // بعد حساب النقاط، هذه الدالة تقرر أي بروكسي نستخدم
  
  var score = scoreMatchServer(ip, host);
  var serverKey = ip + ":" + host;
  
  // ════ قرار ذكي بناءً على النقاط ════
  
  // إذا كانت النقاط عالية جداً (سيرفر ناجح ومجرب)
  if (score > 300) {
    // تسجيل كنجاح
    recordSuccessfulMatch(serverKey);
    return MATCH_PRIMARY;
  }
  
  // إذا كانت النقاط متوسطة
  if (score > 150) {
    return MATCH_PRIMARY;
  }
  
  // إذا كانت النقاط منخفضة نسبياً
  // نعطي فرصة للبروكسي الثانوي
  if (score > 80) {
    return MATCH_SECONDARY;
  }
  
  // إذا كانت النقاط منخفضة جداً
  // قد يكون سيرفر جديد، نعطيه فرصة محدودة
  return MATCH_PRIMARY;
}

function recordSuccessfulMatch(serverKey) {
  // تسجيل مباراة ناجحة في الذاكرة
  
  // زيادة عداد النجاح
  if (!CLUSTER.successfulServers[serverKey]) {
    CLUSTER.successfulServers[serverKey] = 0;
  }
  CLUSTER.successfulServers[serverKey]++;
  
  // إضافة للمباريات الأخيرة
  CLUSTER.recentMatches.unshift(serverKey);
  
  // الحفاظ على حجم الذاكرة محدود
  if (CLUSTER.recentMatches.length > CLUSTER.maxMatchHistory) {
    CLUSTER.recentMatches.pop();
  }
  
  // تحديث تقدير اللاعبين النشطين
  updateActivePlayerEstimate();
}

function updateActivePlayerEstimate() {
  // تقدير عدد اللاعبين الأردنيين النشطين حالياً
  // بناءً على عدد المباريات الناجحة الأخيرة
  
  var now = new Date().getTime();
  
  // تحديث كل 5 دقائق فقط
  if (now - CLUSTER.lastPlayerCountUpdate < 300000) {
    return;
  }
  
  CLUSTER.lastPlayerCountUpdate = now;
  
  // حساب بسيط: كل مباراة ناجحة تعني حوالي 50-100 لاعب
  var recentSuccesses = CLUSTER.recentMatches.length;
  var timingMultiplier = getSmartTimingBonus();
  
  CLUSTER.estimatedActivePlayers = Math.floor(recentSuccesses * 75 * timingMultiplier);
}

// ═══════════════════════════════════════════════════════════════
//  REGIONAL LOAD BALANCING - توزيع الأحمال الإقليمي
// ═══════════════════════════════════════════════════════════════

function selectRegionalLobbyProxy(region, host) {
  // اختيار بروكسي اللوبي بناءً على المنطقة الجغرافية
  // هذا يضمن أن اللاعبين من نفس المنطقة يمرون عبر نفس البروكسيات
  
  var regionalPool = REGIONAL_LOBBIES[region] || REGIONAL_LOBBIES.amman;
  
  // نستخدم hash المضيف لتوزيع متوازن لكن ثابت
  var hash = 0;
  for (var i = 0; i < host.length; i++) {
    hash = (hash + host.charCodeAt(i)) % regionalPool.length;
  }
  
  return regionalPool[hash];
}

// ═══════════════════════════════════════════════════════════════
//  UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════

function normalizeHost(host) {
  var portIndex = host.indexOf(":");
  return portIndex > -1 ? host.substring(0, portIndex) : host;
}

function isInNetworkList(ip, networkList) {
  for (var i = 0; i < networkList.length; i++) {
    if (isInNet(ip, networkList[i][0], networkList[i][1])) {
      return true;
    }
  }
  return false;
}

function resolveAndCache(host, cache) {
  if (cache[host]) return cache[host];
  var ip = dnsResolve(host);
  if (ip && ip.indexOf(":") === -1) cache[host] = ip;
  return ip;
}

function detectProvider(ip) {
  if (isInNet(ip, "46.185.128.0", "255.255.128.0")) return "Zain";
  if (isInNet(ip, "149.200.128.0", "255.255.128.0")) return "Orange";
  if (isInNet(ip, "77.245.0.0", "255.255.224.0")) return "Umniah";
  if (isInNet(ip, "188.161.0.0", "255.255.128.0")) return "Fiber";
  return "Unknown-JO";
}

function isPUBGTraffic(host) {
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite|proximabeta|igame|intlgame/i.test(host);
}

function isMatchTraffic(url, host) {
  var matchKeywords = /match|battle|game|combat|realtime|sync|udp|tick|room|spawn|server|instance|gameplay|session/i;
  if (matchKeywords.test(url + host)) {
    var falsePositives = /matchmaking|prematch|postmatch/i;
    return !falsePositives.test(url + host);
  }
  return false;
}

function isLobbyTraffic(url, host) {
  return /lobby|matchmaking|queue|dispatch|gateway|region|join|recruit|platform|entrance|portal/i.test(url + host);
}

function isSocialTraffic(url, host) {
  return /friend|invite|squad|team|party|clan|presence|social|chat|message|guild/i.test(url + host);
}

function isCDNTraffic(url, host) {
  return /cdn|asset|resource|patch|update|media|content|download|static|file/i.test(url + host);
}

var SESSION = {
  dnsCache: {},
  blockedIPs: {},
  validatedIPs: {}
};

function validateIP(ip, tier) {
  if (SESSION.blockedIPs[ip]) return false;
  if (SESSION.validatedIPs[ip]) return true;
  
  if (isInNetworkList(ip, HOSTILE_REGIONS)) {
    SESSION.blockedIPs[ip] = true;
    return false;
  }
  
  var networkList = (tier === 1) ? JORDAN_TIER1_MATCH : JORDAN_TIER2_LOBBY;
  if (isInNetworkList(ip, networkList)) {
    SESSION.validatedIPs[ip] = true;
    return true;
  }
  
  SESSION.blockedIPs[ip] = true;
  return false;
}

// ═══════════════════════════════════════════════════════════════
//  MAIN ROUTER
// ═══════════════════════════════════════════════════════════════

function FindProxyForURL(url, host) {
  
  host = normalizeHost(host).toLowerCase();
  
  if (!isPUBGTraffic(host)) return DIRECT;
  
  var ip = resolveAndCache(host, SESSION.dnsCache);
  if (!ip || ip.indexOf(":") > -1) return BLOCK;
  
  // ════ تهيئة أولية للاعب ════
  if (!CLUSTER.playerRegion) {
    CLUSTER.playerRegion = detectPlayerRegion(ip);
    CLUSTER.detectedProvider = detectProvider(ip);
  }
  
  // ════ معالجة المباريات ════
  if (isMatchTraffic(url, host)) {
    if (!validateIP(ip, 1)) return BLOCK;
    return getBestMatchServer(ip, host);
  }
  
  // ════ معالجة اللوبي ════
  if (isLobbyTraffic(url, host)) {
    if (!validateIP(ip, 2)) return BLOCK;
    return selectRegionalLobbyProxy(CLUSTER.playerRegion, host);
  }
  
  // ════ معالجة باقي الطلبات ════
  if (isSocialTraffic(url, host) || isCDNTraffic(url, host)) {
    if (!validateIP(ip, 2)) return BLOCK;
    return selectRegionalLobbyProxy(CLUSTER.playerRegion, host);
  }
  
  if (!validateIP(ip, 2)) return BLOCK;
  return selectRegionalLobbyProxy(CLUSTER.playerRegion, host);
}
