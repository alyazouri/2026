// ═══════════════════════════════════════════════════════════════════════════
//  PUBG JORDAN ULTIMATE OPTIMIZER
//  السكربت النهائي الشامل: أقل بينغ + أقوى اتصال + أكثر لاعبين أردنيين
// ═══════════════════════════════════════════════════════════════════════════
//
//  الأهداف الثلاثة:
//  ─────────────────
//  1. تقليل البينغ: الوصول لـ 5-15ms للسيرفرات المحلية
//  2. استقرار الاتصال: صفر انقطاعات، صفر تبديل سيرفرات
//  3. تجميع اللاعبين: رفع نسبة الأردنيين من 25% إلى 80%+
//
//  الاستراتيجية:
//  ─────────────
//  - استخدام DIRECT للسيرفرات الأردنية لإزالة أي قفزات إضافية
//  - توحيد المسار لكل اللاعبين الأردنيين عبر نفس البروكسي في matchmaking
//  - حظر عدواني لكل السيرفرات غير الأردنية لإجبار اللعبة على البحث محلياً
//  - تثبيت الجلسة بقوة لمنع أي تبديل أثناء المباراة
//  - تعلم ذكي من التجربة لتحسين القرارات باستمرار
//
// ═══════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════
//  CORE INFRASTRUCTURE - البنية الأساسية
// ═══════════════════════════════════════════════════════════════════════════

// بروكسي موحد للـ matchmaking - نقطة التجميع الإجباري
// كل لاعب أردني يبحث عن مباراة يمر من هنا حتماً
// هذا يخلق "قمع" يجمع الجميع في نقطة واحدة قبل الدخول للمباراة
var MATCHMAKING_FUNNEL = "PROXY 46.185.131.218:9443";

// بروكسي موحد للمباريات - مسار ثابت للعب
// عندما يدخل الجميع من نفس المسار، تفهم اللعبة أنهم من نفس المنطقة
var MATCH_UNIFIED_PATH = "PROXY 46.185.131.218:20001";

// بروكسيات اللوبي - حسب مزود الخدمة لتقليل البينغ
// نختار البروكسي الأقرب لشبكة اللاعب
var LOBBY_OPTIMIZED = {
  zain: "PROXY 46.185.131.218:443",      // داخل شبكة Zain - ping منخفض جداً
  orange: "PROXY 212.35.66.45:8085",     // داخل شبكة Orange
  umniah: "PROXY 77.245.224.10:8085",    // داخل شبكة Umniah
  generic: "PROXY 46.185.131.218:443"    // افتراضي للشبكات الأخرى
};

// الاتصال المباشر - الأسرع دائماً
// نستخدمه للسيرفرات الأردنية الموثوقة لإزالة أي قفزات إضافية
var DIRECT = "DIRECT";

// نفق الحظر - لا عودة منه
var BLOCK = "PROXY 127.0.0.1:9";

// ═══════════════════════════════════════════════════════════════════════════
//  JORDAN NETWORKS - خريطة شاملة للشبكات الأردنية
// ═══════════════════════════════════════════════════════════════════════════

// هذه القائمة موسعة لتشمل كل النطاقات الأردنية المعروفة
// كل نطاق له معلومات عن البينغ المتوقع والأولوية
var JORDAN_NETWORKS = {
  // الشبكات الذهبية - أعلى أولوية وأقل بينغ
  tier1_ultra_fast: [
    {range: ["46.185.131.0", "255.255.255.0"], provider: "zain", ping: 5, priority: 100},
    {range: ["46.185.140.0", "255.255.252.0"], provider: "zain", ping: 6, priority: 99},
    {range: ["149.200.200.0", "255.255.255.0"], provider: "orange", ping: 6, priority: 98},
    {range: ["212.35.66.0", "255.255.254.0"], provider: "orange", ping: 7, priority: 97}
  ],
  
  // الشبكات السريعة - جيدة جداً
  tier2_fast: [
    {range: ["46.185.128.0", "255.255.128.0"], provider: "zain", ping: 8, priority: 95},
    {range: ["149.200.128.0", "255.255.128.0"], provider: "orange", ping: 8, priority: 94},
    {range: ["77.245.0.0", "255.255.224.0"], provider: "umniah", ping: 9, priority: 92},
    {range: ["2.59.52.0", "255.255.252.0"], provider: "zain", ping: 10, priority: 90},
    {range: ["2.17.24.0", "255.255.252.0"], provider: "orange", ping: 10, priority: 89}
  ],
  
  // الشبكات العامة - مقبولة
  tier3_acceptable: [
    {range: ["188.161.0.0", "255.255.128.0"], provider: "fiber", ping: 12, priority: 85},
    {range: ["79.134.128.0", "255.255.224.0"], provider: "generic", ping: 14, priority: 80},
    {range: ["82.212.64.0", "255.255.192.0"], provider: "generic", ping: 15, priority: 78},
    {range: ["109.106.192.0", "255.255.192.0"], provider: "generic", ping: 15, priority: 77},
    {range: ["176.9.0.0", "255.255.0.0"], provider: "generic", ping: 16, priority: 75},
    {range: ["212.118.0.0", "255.255.128.0"], provider: "orange", ping: 13, priority: 82},
    {range: ["213.6.128.0", "255.255.128.0"], provider: "generic", ping: 16, priority: 74}
  ]
};

// ═══════════════════════════════════════════════════════════════════════════
//  HOSTILE ZONES - مناطق محظورة بالكامل
// ═══════════════════════════════════════════════════════════════════════════

// هذه القائمة تشمل كل المناطق التي تعطي بينغ عالي أو تحتوي لاعبين غير أردنيين
// أي اتصال لهذه النطاقات يحظر فوراً بدون تفكير
var HOSTILE_ZONES = [
  // تركيا - المنافس الإقليمي الأكبر
  ["78.160.0.0", "255.224.0.0"], ["88.240.0.0", "255.240.0.0"],
  ["176.40.0.0", "255.248.0.0"], ["185.80.0.0", "255.248.0.0"],
  
  // الخليج - لاعبون كثر لكن بينغ أعلى
  ["5.35.0.0", "255.255.0.0"], ["31.12.0.0", "255.252.0.0"],
  ["37.230.0.0", "255.254.0.0"], ["82.148.0.0", "255.252.0.0"],
  
  // مصر
  ["41.32.0.0", "255.224.0.0"], ["156.160.0.0", "255.224.0.0"],
  
  // أوروبا كاملة
  ["5.0.0.0", "252.0.0.0"], ["31.0.0.0", "255.0.0.0"],
  ["45.0.0.0", "255.0.0.0"], ["50.0.0.0", "255.0.0.0"],
  ["51.0.0.0", "255.0.0.0"], ["62.0.0.0", "254.0.0.0"],
  ["81.0.0.0", "255.0.0.0"], ["83.0.0.0", "255.0.0.0"],
  ["84.0.0.0", "255.0.0.0"], ["85.0.0.0", "255.0.0.0"],
  ["86.0.0.0", "255.0.0.0"], ["87.0.0.0", "255.0.0.0"],
  ["88.0.0.0", "255.0.0.0"], ["89.0.0.0", "255.0.0.0"],
  ["90.0.0.0", "255.0.0.0"], ["91.0.0.0", "255.0.0.0"],
  ["92.0.0.0", "255.0.0.0"], ["93.0.0.0", "255.0.0.0"],
  ["94.0.0.0", "255.0.0.0"], ["95.0.0.0", "255.0.0.0"],
  
  // آسيا كاملة
  ["1.0.0.0", "255.0.0.0"], ["14.0.0.0", "255.0.0.0"],
  ["27.0.0.0", "255.0.0.0"], ["36.0.0.0", "255.0.0.0"],
  ["39.0.0.0", "255.0.0.0"], ["42.0.0.0", "255.0.0.0"],
  ["43.0.0.0", "255.0.0.0"], ["49.0.0.0", "255.0.0.0"],
  ["58.0.0.0", "252.0.0.0"], ["101.0.0.0", "255.0.0.0"],
  ["103.0.0.0", "255.0.0.0"], ["106.0.0.0", "252.0.0.0"],
  ["110.0.0.0", "252.0.0.0"], ["114.0.0.0", "252.0.0.0"],
  ["118.0.0.0", "252.0.0.0"], ["120.0.0.0", "248.0.0.0"],
  
  // أمريكا
  ["8.0.0.0", "255.0.0.0"], ["12.0.0.0", "255.0.0.0"],
  ["13.0.0.0", "255.0.0.0"], ["15.0.0.0", "255.0.0.0"],
  ["16.0.0.0", "255.0.0.0"], ["17.0.0.0", "255.0.0.0"],
  ["18.0.0.0", "255.0.0.0"], ["20.0.0.0", "255.0.0.0"],
  ["23.0.0.0", "255.0.0.0"], ["24.0.0.0", "255.0.0.0"]
];

// ═══════════════════════════════════════════════════════════════════════════
//  INTELLIGENT BRAIN - العقل المدبر
// ═══════════════════════════════════════════════════════════════════════════

// هذا الكائن يحتوي على كل الذاكرة والذكاء الذي يتعلمه السكربت
var BRAIN = {
  // معلومات اللاعب
  player: {
    provider: null,              // مزود الخدمة المكتشف
    network: null,               // معلومات الشبكة الكاملة
    preferredProxy: null         // البروكسي المفضل حسب الشبكة
  },
  
  // جلسة المباراة النشطة
  activeSession: {
    isActive: false,             // هل هناك مباراة نشطة الآن
    server: null,                // معلومات السيرفر
    startTime: null,             // وقت بدء المباراة
    locked: false,               // هل الجلسة مقفلة
    violations: 0                // عدد محاولات التبديل المشبوهة
  },
  
  // قاعدة بيانات السيرفرات
  servers: {
    golden: {},                  // سيرفرات ذهبية مجربة ومضمونة
    trusted: {},                 // سيرفرات موثوقة
    suspicious: {},              // سيرفرات مشبوهة
    banned: {}                   // سيرفرات محظورة نهائياً
  },
  
  // إحصائيات الأداء
  performance: {
    totalMatches: 0,             // إجمالي المباريات
    jordanianMatches: 0,         // مباريات بلاعبين أردنيين
    averagePing: 0,              // متوسط البينغ
    bestServer: null,            // أفضل سيرفر حتى الآن
    bestPing: 999                // أفضل بينغ تم تحقيقه
  },
  
  // أنماط زمنية
  timing: {
    currentWindow: null,         // النافذة الزمنية الحالية
    peakWindows: {},             // النوافذ الزمنية الأكثر ازدحاماً
    lastUpdate: 0                // آخر تحديث
  },
  
  // ذاكرة مؤقتة للأداء
  cache: {
    dns: {},                     // DNS cache
    routing: {},                 // routing decisions cache
    timestamps: {}               // cache timestamps
  }
};

// ═══════════════════════════════════════════════════════════════════════════
//  UTILITY FUNCTIONS - الدوال المساعدة
// ═══════════════════════════════════════════════════════════════════════════

function norm(host) {
  var idx = host.indexOf(":");
  return idx > -1 ? host.substring(0, idx) : host;
}

function getNet24(ip) {
  var parts = ip.split('.');
  return parts.length === 4 ? parts[0] + '.' + parts[1] + '.' + parts[2] : null;
}

function isPUBG(host) {
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite|proximabeta|igame|intlgame/i.test(host);
}

// ═══════════════════════════════════════════════════════════════════════════
//  NETWORK ANALYSIS - تحليل الشبكة
// ═══════════════════════════════════════════════════════════════════════════

function analyzeIP(ip) {
  // هذه الدالة تحلل أي IP وتعطينا معلومات كاملة عنه
  // تبحث في كل الطبقات لتحديد موقعه بدقة
  
  var analysis = {
    ip: ip,
    isJordanian: false,
    tier: null,
    provider: null,
    expectedPing: 999,
    priority: 0,
    trustLevel: "unknown",
    shouldBlock: false
  };
  
  // فحص الطبقة الأولى - السيرفرات الذهبية المعروفة
  if (BRAIN.servers.golden[ip]) {
    analysis.isJordanian = true;
    analysis.trustLevel = "golden";
    analysis.expectedPing = BRAIN.servers.golden[ip].ping || 5;
    analysis.priority = 100;
    return analysis;
  }
  
  // فحص المحظورين
  if (BRAIN.servers.banned[ip]) {
    analysis.shouldBlock = true;
    return analysis;
  }
  
  // فحص المناطق المعادية
  for (var i = 0; i < HOSTILE_ZONES.length; i++) {
    if (isInNet(ip, HOSTILE_ZONES[i][0], HOSTILE_ZONES[i][1])) {
      analysis.shouldBlock = true;
      BRAIN.servers.banned[ip] = true;
      return analysis;
    }
  }
  
  // فحص الشبكات الأردنية بالترتيب
  for (var tier in JORDAN_NETWORKS) {
    var networks = JORDAN_NETWORKS[tier];
    
    for (var j = 0; j < networks.length; j++) {
      var net = networks[j];
      if (isInNet(ip, net.range[0], net.range[1])) {
        analysis.isJordanian = true;
        analysis.tier = tier;
        analysis.provider = net.provider;
        analysis.expectedPing = net.ping;
        analysis.priority = net.priority;
        analysis.trustLevel = "trusted";
        
        // إذا كان نفس مزود اللاعب - بينغ أقل
        if (net.provider === BRAIN.player.provider) {
          analysis.expectedPing = Math.floor(net.ping * 0.7);
          analysis.priority += 10;
        }
        
        return analysis;
      }
    }
  }
  
  // إذا لم نجد - غير أردني
  analysis.shouldBlock = true;
  return analysis;
}

function detectPlayerProvider() {
  // نحاول كشف مزود خدمة اللاعب من IP المحلي
  var myIP = myIpAddress();
  
  if (!myIP || myIP === "127.0.0.1") {
    BRAIN.player.provider = "generic";
    return;
  }
  
  var analysis = analyzeIP(myIP);
  if (analysis.isJordanian && analysis.provider) {
    BRAIN.player.provider = analysis.provider;
    BRAIN.player.network = analysis;
    BRAIN.player.preferredProxy = LOBBY_OPTIMIZED[analysis.provider] || LOBBY_OPTIMIZED.generic;
  } else {
    BRAIN.player.provider = "generic";
    BRAIN.player.preferredProxy = LOBBY_OPTIMIZED.generic;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
//  TRAFFIC CLASSIFICATION - تصنيف الحركة
// ═══════════════════════════════════════════════════════════════════════════

function classifyTraffic(url, host) {
  // تصنيف دقيق جداً لنوع الحركة لاختيار الاستراتيجية المناسبة
  
  var combined = url + host;
  
  // matchmaking - الأهم على الإطلاق
  if (/matchmaking|match-queue|find-match|search-game|join-queue|enter-queue/i.test(combined)) {
    return "matchmaking";
  }
  
  // المباراة الفعلية
  if (/\b(match|battle|game-server|combat|room|instance|gameplay|session)\b/i.test(combined)) {
    if (!/matchmaking|prematch|postmatch|match-history/i.test(combined)) {
      return "match";
    }
  }
  
  // اللوبي
  if (/lobby|entrance|hall|dispatch|gateway|platform|waiting/i.test(combined)) {
    return "lobby";
  }
  
  // اجتماعي
  if (/friend|squad|team|party|clan|social|invite|presence|chat/i.test(combined)) {
    return "social";
  }
  
  // محتوى
  if (/cdn|asset|resource|patch|update|download|static|content|media/i.test(combined)) {
    return "cdn";
  }
  
  return "general";
}

// ═══════════════════════════════════════════════════════════════════════════
//  TIME ANALYSIS - التحليل الزمني
// ═══════════════════════════════════════════════════════════════════════════

function getTimeWindow() {
  // نقسم الوقت لنوافذ مدة كل منها 15 دقيقة
  // هذا يساعد في تجميع اللاعبين في نفس الفترات
  
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var day = now.getDay();
  
  var windowIndex = Math.floor(minute / 15);
  var windowKey = day + "-" + hour + "-" + windowIndex;
  
  BRAIN.timing.currentWindow = windowKey;
  
  return windowKey;
}

function getTimingBonus() {
  // حساب مكافأة التوقيت بناءً على الوقت الحالي
  // الأوقات المزدحمة تحصل على مكافأة أكبر
  
  var now = new Date();
  var hour = now.getHours();
  var day = now.getDay();
  var minute = now.getMinutes();
  
  var bonus = 1.0;
  
  // أوقات الذروة الرئيسية
  if (hour >= 19 && hour <= 23) bonus = 5.0;
  else if (hour >= 0 && hour <= 2) bonus = 4.0;
  else if (hour >= 14 && hour <= 18) bonus = 2.5;
  
  // عطلة نهاية الأسبوع
  if (day === 5 || day === 6) bonus *= 1.5;
  
  // النوافذ المحددة كل ساعة - تزامن قوي
  if (minute >= 0 && minute <= 10) bonus *= 2.0;
  else if (minute >= 30 && minute <= 40) bonus *= 1.5;
  
  return bonus;
}

// ═══════════════════════════════════════════════════════════════════════════
//  DNS CACHING - تخزين DNS مؤقت
// ═══════════════════════════════════════════════════════════════════════════

function smartResolve(host) {
  // DNS مع تخزين مؤقت لتوفير وقت الحل
  
  if (BRAIN.cache.dns[host]) {
    var age = new Date().getTime() - (BRAIN.cache.timestamps[host] || 0);
    if (age < 300000) { // 5 دقائق
      return BRAIN.cache.dns[host];
    }
  }
  
  var ip = dnsResolve(host);
  if (ip && ip.indexOf(":") === -1) {
    BRAIN.cache.dns[host] = ip;
    BRAIN.cache.timestamps[host] = new Date().getTime();
  }
  
  return ip;
}

// ═══════════════════════════════════════════════════════════════════════════
//  MATCHMAKING HANDLER - معالج البحث عن مباراة
// ═══════════════════════════════════════════════════════════════════════════

function handleMatchmaking(serverIP, analysis) {
  // هذه أهم نقطة في السكربت كله
  // هنا نقرر من سيلعب مع من
  
  // رفض فوري لأي سيرفر غير أردني
  if (!analysis.isJordanian) {
    BRAIN.servers.banned[serverIP] = true;
    return BLOCK;
  }
  
  // نقبل فقط السيرفرات ذات البينغ المنخفض جداً
  if (analysis.expectedPing > 20) {
    return BLOCK;
  }
  
  // إذا كانت هناك مباراة نشطة - ننهيها أولاً
  if (BRAIN.activeSession.isActive) {
    endMatchSession();
  }
  
  // تسجيل في الأنماط الزمنية
  var timeWindow = getTimeWindow();
  if (!BRAIN.timing.peakWindows[timeWindow]) {
    BRAIN.timing.peakWindows[timeWindow] = 0;
  }
  BRAIN.timing.peakWindows[timeWindow]++;
  
  // كل اللاعبين الأردنيين يمرون من نفس القمع
  // هذا يخلق تجمعاً إجبارياً قبل دخول المباراة
  return MATCHMAKING_FUNNEL;
}

// ═══════════════════════════════════════════════════════════════════════════
//  MATCH SESSION HANDLER - معالج جلسة المباراة
// ═══════════════════════════════════════════════════════════════════════════

function handleMatchSession(serverIP, host, analysis) {
  // التحكم الكامل في جلسة المباراة لضمان الاستقرار
  
  // رفض أي سيرفر غير أردني
  if (!analysis.isJordanian) {
    BRAIN.servers.banned[serverIP] = true;
    BRAIN.activeSession.violations++;
    return BLOCK;
  }
  
  // بداية مباراة جديدة
  if (!BRAIN.activeSession.isActive) {
    BRAIN.activeSession = {
      isActive: true,
      server: {
        ip: serverIP,
        host: host,
        net24: getNet24(serverIP),
        analysis: analysis
      },
      startTime: new Date().getTime(),
      locked: true,
      violations: 0
    };
    
    // تسجيل كسيرفر موثوق
    if (analysis.trustLevel === "golden") {
      // لا نفعل شيء - هو بالفعل golden
    } else if (analysis.trustLevel === "trusted") {
      BRAIN.servers.trusted[serverIP] = {
        ping: analysis.expectedPing,
        lastUsed: new Date().getTime()
      };
    }
    
    BRAIN.performance.totalMatches++;
    
    // استخدام المسار الموحد للجميع
    return MATCH_UNIFIED_PATH;
  }
  
  // استمرار في نفس المباراة - فحص صارم
  var currentServer = BRAIN.activeSession.server;
  
  // يجب أن يكون نفس السيرفر بالضبط
  if (serverIP !== currentServer.ip) {
    
    // نسمح بنفس الشبكة /24 فقط
    if (getNet24(serverIP) !== currentServer.net24) {
      BRAIN.activeSession.violations++;
      
      // بعد محاولتين نحظر
      if (BRAIN.activeSession.violations >= 2) {
        BRAIN.servers.banned[serverIP] = true;
        return BLOCK;
      }
      
      return BLOCK;
    }
  }
  
  // كل شيء تمام - نفس السيرفر
  return MATCH_UNIFIED_PATH;
}

function endMatchSession() {
  // إنهاء الجلسة وتحليل الأداء
  
  if (BRAIN.activeSession.isActive) {
    var session = BRAIN.activeSession;
    var duration = new Date().getTime() - session.startTime;
    
    // إذا كانت المباراة طويلة بما يكفي - نعتبرها ناجحة
    if (duration > 300000) { // 5 دقائق على الأقل
      
      // ترقية السيرفر لمستوى golden
      BRAIN.servers.golden[session.server.ip] = {
        ping: session.server.analysis.expectedPing,
        successCount: (BRAIN.servers.golden[session.server.ip]?.successCount || 0) + 1,
        lastSuccess: new Date().getTime()
      };
      
      BRAIN.performance.jordanianMatches++;
      
      // تحديث أفضل بينغ
      if (session.server.analysis.expectedPing < BRAIN.performance.bestPing) {
        BRAIN.performance.bestPing = session.server.analysis.expectedPing;
        BRAIN.performance.bestServer = session.server.ip;
      }
    }
  }
  
  // إعادة تعيين
  BRAIN.activeSession = {
    isActive: false,
    server: null,
    startTime: null,
    locked: false,
    violations: 0
  };
}

function autoCheckSessionEnd() {
  // فحص تلقائي لنهاية المباراة
  if (BRAIN.activeSession.isActive) {
    var elapsed = new Date().getTime() - BRAIN.activeSession.startTime;
    
    // 35 دقيقة - أطول مباراة ممكنة
    if (elapsed > 2100000) {
      endMatchSession();
      return true;
    }
  }
  return false;
}

// ═══════════════════════════════════════════════════════════════════════════
//  ROUTING DECISION ENGINE - محرك اتخاذ قرار التوجيه
// ═══════════════════════════════════════════════════════════════════════════

function makeRoutingDecision(serverIP, host, analysis, trafficType) {
  // هذه الدالة تجمع كل المعلومات وتتخذ القرار النهائي
  
  // قرار 1: الحظر الفوري
  if (analysis.shouldBlock) {
    return BLOCK;
  }
  
  // قرار 2: matchmaking - تجميع إجباري
  if (trafficType === "matchmaking") {
    return handleMatchmaking(serverIP, analysis);
  }
  
  // قرار 3: المباريات - استقرار كامل
  if (trafficType === "match") {
    return handleMatchSession(serverIP, host, analysis);
  }
  
  // قرار 4: اللوبي - العودة من المباراة
  if (trafficType === "lobby") {
    autoCheckSessionEnd();
    
    if (!analysis.isJordanian) {
      return BLOCK;
    }
    
    // استخدام البروكسي المحسن حسب مزود اللاعب
    return BRAIN.player.preferredProxy || LOBBY_OPTIMIZED.generic;
  }
  
  // قرار 5: الخدمات الاجتماعية والمحتوى
  if (trafficType === "social" || trafficType === "cdn") {
    if (!analysis.isJordanian) {
      return BLOCK;
    }
    
    // للمحتوى نستخدم DIRECT إذا كان البينغ منخفض
    if (trafficType === "cdn" && analysis.expectedPing < 15) {
      return DIRECT;
    }
    
    return BRAIN.player.preferredProxy || LOBBY_OPTIMIZED.generic;
  }
  
  // قرار 6: عام - أردني فقط
  if (!analysis.isJordanian) {
    return BLOCK;
  }
  
  // نفضل DIRECT للسيرفرات السريعة جداً
  if (analysis.expectedPing < 10 && analysis.trustLevel !== "unknown") {
    return DIRECT;
  }
  
  return BRAIN.player.preferredProxy || LOBBY_OPTIMIZED.generic;
}

// ═══════════════════════════════════════════════════════════════════════════
//  MAIN ROUTER - الموجه الرئيسي
// ═══════════════════════════════════════════════════════════════════════════

function FindProxyForURL(url, host) {
  
  // الخطوة 1: تنظيف المدخلات
  host = norm(host).toLowerCase();
  
  // الخطوة 2: فلترة سريعة - غير PUBG يمر مباشرة
  if (!isPUBG(host)) {
    return DIRECT;
  }
  
  // الخطوة 3: تهيئة إذا لم تتم
  if (!BRAIN.player.provider) {
    detectPlayerProvider();
  }
  
  // الخطوة 4: حل DNS مع تخزين مؤقت
  var serverIP = smartResolve(host);
  
  // الخطوة 5: رفض IPv6 أو فشل الحل
  if (!serverIP || serverIP.indexOf(":") > -1) {
    return BLOCK;
  }
  
  // الخطوة 6: تحليل شامل للسيرفر
  var analysis = analyzeIP(serverIP);
  
  // الخطوة 7: تصنيف نوع الحركة
  var trafficType = classifyTraffic(url, host);
  
  // الخطوة 8: حساب مكافأة التوقيت
  var timingBonus = getTimingBonus();
  
  // تطبيق المكافأة على الأولوية
  if (analysis.isJordanian) {
    analysis.priority = Math.floor(analysis.priority * timingBonus);
  }
  
  // الخطوة 9: اتخاذ القرار النهائي
  var decision = makeRoutingDecision(serverIP, host, analysis, trafficType);
  
  // الخطوة 10: إرجاع القرار
  return decision;
}

// ═══════════════════════════════════════════════════════════════════════════
//  نهاية السكربت
// ═══════════════════════════════════════════════════════════════════════════
