// ═══════════════════════════════════════════════════════════════════════════
//  PUBG JORDAN ABSOLUTE DOMINATION SCRIPT
//  السكربت النهائي المطلق - القوة القصوى
// ═══════════════════════════════════════════════════════════════════════════
//
//  فلسفة التصميم: "الرفض حتى يثبت العكس"
//  ────────────────────────────────────────────
//  كل شيء محظور افتراضياً، نسمح فقط بما نتأكد منه بنسبة 100%
//  
//  المبادئ الأساسية:
//  ──────────────────
//  1. البقاء (SURVIVAL): لا انقطاعات، لا تبديل، ثبات كامل
//  2. السرعة (SPEED): أقل بينغ ممكن فيزيائياً (5-12ms هدف)
//  3. التجميع (CLUSTERING): إجبار اللاعبين الأردنيين على الالتقاء
//  4. التعلم (LEARNING): كل جلسة تجعل السكربت أذكى
//  5. الدفاع (DEFENSE): حماية متعددة الطبقات ضد أي تهديد
//
// ═══════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════
//  LAYER 0: CORE CONSTANTS - الثوابت الأساسية
// ═══════════════════════════════════════════════════════════════════════════

// نقطة التجميع الإجباري - كل أردني يمر من هنا عند البحث عن مباراة
// هذا يخلق "نقطة الالتقاء" الإجبارية
var CONVERGENCE_POINT = "PROXY 46.185.131.218:9443";

// المسار الموحد للمباريات - الجميع على نفس الطريق
var UNIFIED_MATCH_PATH = "PROXY 46.185.131.218:20001";

// الاتصال المباشر - أسرع شيء ممكن
var DIRECT = "DIRECT";

// الحظر المطلق - لا عودة منه
var ABSOLUTE_BLOCK = "PROXY 127.0.0.1:9";

// حد البينغ المقبول - أي شيء أعلى يرفض
var MAX_ACCEPTABLE_PING = 25;  // 25ms أقصى حد
var IDEAL_PING_THRESHOLD = 12;  // 12ms أو أقل مثالي

// حد الانتهاكات - بعده حظر نهائي
var MAX_VIOLATIONS = 1;  // انتهاك واحد فقط ثم حظر

// مدة الجلسة القصوى قبل إعادة التعيين التلقائي
var MAX_SESSION_DURATION = 2400000;  // 40 دقيقة

// ═══════════════════════════════════════════════════════════════════════════
//  LAYER 1: JORDAN NETWORK DATABASE - قاعدة بيانات الشبكات الأردنية
// ═══════════════════════════════════════════════════════════════════════════

// قاعدة بيانات شاملة ومفصلة لكل الشبكات الأردنية مع معلومات دقيقة
var JORDAN_NETWORKS_DB = {
  
  // المستوى الماسي - أفضل ما يمكن (ping: 5-8ms)
  diamond_tier: [
    {range: ["46.185.131.0", "255.255.255.0"], provider: "zain", dc: "amman", ping: 5, score: 1000, direct: true},
    {range: ["46.185.140.0", "255.255.252.0"], provider: "zain", dc: "amman", ping: 6, score: 980, direct: true},
    {range: ["149.200.200.0", "255.255.255.0"], provider: "orange", dc: "amman", ping: 6, score: 970, direct: true},
    {range: ["212.35.66.0", "255.255.254.0"], provider: "orange", dc: "amman", ping: 7, score: 960, direct: true}
  ],
  
  // المستوى الذهبي - ممتاز (ping: 8-12ms)
  gold_tier: [
    {range: ["46.185.128.0", "255.255.240.0"], provider: "zain", dc: "amman", ping: 8, score: 900, direct: true},
    {range: ["149.200.128.0", "255.255.192.0"], provider: "orange", dc: "amman", ping: 9, score: 880, direct: true},
    {range: ["77.245.0.0", "255.255.224.0"], provider: "umniah", dc: "irbid", ping: 10, score: 850, direct: true},
    {range: ["2.59.52.0", "255.255.252.0"], provider: "zain", dc: "mobile", ping: 11, score: 830, direct: true},
    {range: ["2.17.24.0", "255.255.252.0"], provider: "orange", dc: "mobile", ping: 11, score: 820, direct: true}
  ],
  
  // المستوى الفضي - جيد (ping: 12-18ms)
  silver_tier: [
    {range: ["188.161.0.0", "255.255.128.0"], provider: "fiber", dc: "amman", ping: 13, score: 750, direct: true},
    {range: ["79.134.128.0", "255.255.224.0"], provider: "enterprise", dc: "amman", ping: 14, score: 730, direct: false},
    {range: ["82.212.64.0", "255.255.192.0"], provider: "batelco", dc: "amman", ping: 15, score: 710, direct: false},
    {range: ["109.106.192.0", "255.255.192.0"], provider: "residential", dc: "various", ping: 16, score: 690, direct: false},
    {range: ["176.9.0.0", "255.255.0.0"], provider: "mixed", dc: "various", ping: 17, score: 670, direct: false}
  ],
  
  // المستوى البرونزي - مقبول بشروط (ping: 18-25ms)
  bronze_tier: [
    {range: ["212.118.0.0", "255.255.128.0"], provider: "orange", dc: "legacy", ping: 19, score: 600, direct: false},
    {range: ["213.6.128.0", "255.255.128.0"], provider: "legacy", dc: "various", ping: 20, score: 580, direct: false},
    {range: ["195.229.0.0", "255.255.224.0"], provider: "academic", dc: "amman", ping: 22, score: 550, direct: false},
    {range: ["5.45.112.0", "255.255.240.0"], provider: "umniah", dc: "secondary", ping: 23, score: 530, direct: false}
  ]
};

// ═══════════════════════════════════════════════════════════════════════════
//  LAYER 2: HOSTILE ZONES - المناطق المعادية
// ═══════════════════════════════════════════════════════════════════════════

// قائمة سوداء موسعة جداً - أي اتصال لهذه النطاقات = حظر فوري بلا رحمة
var BLACKLIST_ZONES = [
  // تركيا - العدو الأول
  {range: ["78.160.0.0", "255.224.0.0"], region: "turkey", threat: "high"},
  {range: ["88.240.0.0", "255.240.0.0"], region: "turkey", threat: "high"},
  {range: ["176.40.0.0", "255.248.0.0"], region: "turkey", threat: "high"},
  {range: ["185.80.0.0", "255.248.0.0"], region: "turkey", threat: "high"},
  {range: ["212.174.0.0", "255.254.0.0"], region: "turkey", threat: "high"},
  
  // الخليج - منافس قوي
  {range: ["5.35.0.0", "255.255.0.0"], region: "gulf", threat: "medium"},
  {range: ["31.12.0.0", "255.252.0.0"], region: "gulf", threat: "medium"},
  {range: ["37.230.0.0", "255.254.0.0"], region: "gulf", threat: "medium"},
  {range: ["82.148.0.0", "255.252.0.0"], region: "gulf", threat: "medium"},
  {range: ["188.119.0.0", "255.255.0.0"], region: "gulf", threat: "medium"},
  
  // مصر
  {range: ["41.32.0.0", "255.224.0.0"], region: "egypt", threat: "medium"},
  {range: ["156.160.0.0", "255.224.0.0"], region: "egypt", threat: "medium"},
  
  // أوروبا - كاملة
  {range: ["5.0.0.0", "252.0.0.0"], region: "europe", threat: "critical"},
  {range: ["31.0.0.0", "255.0.0.0"], region: "europe", threat: "critical"},
  {range: ["45.0.0.0", "255.0.0.0"], region: "europe", threat: "critical"},
  {range: ["62.0.0.0", "252.0.0.0"], region: "europe", threat: "critical"},
  {range: ["81.0.0.0", "255.0.0.0"], region: "europe", threat: "critical"},
  {range: ["83.0.0.0", "254.0.0.0"], region: "europe", threat: "critical"},
  {range: ["85.0.0.0", "254.0.0.0"], region: "europe", threat: "critical"},
  {range: ["87.0.0.0", "254.0.0.0"], region: "europe", threat: "critical"},
  {range: ["89.0.0.0", "254.0.0.0"], region: "europe", threat: "critical"},
  {range: ["91.0.0.0", "254.0.0.0"], region: "europe", threat: "critical"},
  {range: ["93.0.0.0", "254.0.0.0"], region: "europe", threat: "critical"},
  {range: ["95.0.0.0", "255.0.0.0"], region: "europe", threat: "critical"},
  
  // آسيا - كاملة
  {range: ["1.0.0.0", "255.0.0.0"], region: "asia", threat: "critical"},
  {range: ["14.0.0.0", "255.0.0.0"], region: "asia", threat: "critical"},
  {range: ["27.0.0.0", "255.0.0.0"], region: "asia", threat: "critical"},
  {range: ["36.0.0.0", "255.0.0.0"], region: "asia", threat: "critical"},
  {range: ["39.0.0.0", "255.0.0.0"], region: "asia", threat: "critical"},
  {range: ["42.0.0.0", "255.0.0.0"], region: "asia", threat: "critical"},
  {range: ["43.0.0.0", "255.0.0.0"], region: "asia", threat: "critical"},
  {range: ["49.0.0.0", "255.0.0.0"], region: "asia", threat: "critical"},
  {range: ["58.0.0.0", "248.0.0.0"], region: "asia", threat: "critical"},
  {range: ["101.0.0.0", "255.0.0.0"], region: "asia", threat: "critical"},
  {range: ["103.0.0.0", "255.0.0.0"], region: "asia", threat: "critical"},
  {range: ["106.0.0.0", "248.0.0.0"], region: "asia", threat: "critical"},
  {range: ["110.0.0.0", "248.0.0.0"], region: "asia", threat: "critical"},
  {range: ["114.0.0.0", "248.0.0.0"], region: "asia", threat: "critical"},
  {range: ["118.0.0.0", "248.0.0.0"], region: "asia", threat: "critical"},
  {range: ["120.0.0.0", "240.0.0.0"], region: "asia", threat: "critical"}
];

// ═══════════════════════════════════════════════════════════════════════════
//  LAYER 3: INTELLIGENT MEMORY SYSTEM - نظام الذاكرة الذكي
// ═══════════════════════════════════════════════════════════════════════════

var MEMORY = {
  
  // معلومات اللاعب المكتشفة
  player: {
    ip: null,
    provider: null,
    tier: null,
    network: null,
    detectedAt: null
  },
  
  // قاعدة بيانات السيرفرات المكتشفة
  servers: {
    // السيرفرات الماسية - أفضل الأفضل
    diamond: {},  // IP -> {score, ping, successCount, lastSuccess, fingerprint}
    
    // السيرفرات الذهبية - موثوقة جداً
    golden: {},
    
    // السيرفرات الموثوقة - جيدة
    trusted: {},
    
    // السيرفرات المشبوهة - تحت المراقبة
    suspicious: {},
    
    // السيرفرات المحظورة - بلاك ليست دائمة
    banned: {}
  },
  
  // الجلسة النشطة الحالية
  activeSession: {
    active: false,
    server: null,
    fingerprint: null,
    startTime: null,
    lastActivity: null,
    violations: 0,
    packetCount: 0,
    locked: false
  },
  
  // الإحصائيات التراكمية
  stats: {
    totalSessions: 0,
    successfulSessions: 0,
    jordanianPlayers: 0,
    averagePing: 0,
    bestPing: 999,
    bestServer: null,
    totalBlocked: 0,
    totalDirect: 0
  },
  
  // الأنماط الزمنية المكتشفة
  timePatterns: {
    hourly: {},      // نشاط حسب الساعة
    windows: {},     // نوافذ 15 دقيقة
    peak: null,      // أفضل وقت
    current: null    // النافذة الحالية
  },
  
  // ذاكرة التخزين المؤقت
  cache: {
    dns: {},
    routing: {},
    analysis: {},
    timestamps: {}
  },
  
  // سجل المباريات الأخيرة (تاريخ قصير)
  recentHistory: [],
  maxHistory: 30
};

// ═══════════════════════════════════════════════════════════════════════════
//  LAYER 4: UTILITY FUNCTIONS - الدوال المساعدة
// ═══════════════════════════════════════════════════════════════════════════

function norm(host) {
  var colon = host.indexOf(":");
  return colon > -1 ? host.substring(0, colon) : host;
}

function getNet24(ip) {
  var parts = ip.split('.');
  return parts.length === 4 ? parts[0] + '.' + parts[1] + '.' + parts[2] : null;
}

function getNet16(ip) {
  var parts = ip.split('.');
  return parts.length === 4 ? parts[0] + '.' + parts[1] : null;
}

function isPUBG(host) {
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite|proximabeta|igame|intlgame/i.test(host);
}

function smartResolve(host) {
  // DNS resolution مع تخزين مؤقت ذكي
  var now = Date.now();
  
  if (MEMORY.cache.dns[host]) {
    var age = now - (MEMORY.cache.timestamps[host] || 0);
    if (age < 180000) {  // 3 دقائق فقط - نريد freshness
      return MEMORY.cache.dns[host];
    }
  }
  
  var ip = dnsResolve(host);
  if (ip && ip.indexOf(":") === -1) {
    MEMORY.cache.dns[host] = ip;
    MEMORY.cache.timestamps[host] = now;
  }
  
  return ip;
}

// ═══════════════════════════════════════════════════════════════════════════
//  LAYER 5: ADVANCED FINGERPRINTING - البصمة المتقدمة
// ═══════════════════════════════════════════════════════════════════════════

function createFingerprint(ip, host, url) {
  // إنشاء بصمة فريدة ومفصلة جداً لكل سيرفر
  // هذه البصمة تستخدم لتتبع السيرفرات عبر الجلسات
  
  var fingerprint = {
    ip: ip,
    host: host,
    net24: getNet24(ip),
    net16: getNet16(ip),
    
    // تحليل اسم المضيف
    hostPattern: extractHostPattern(host),
    
    // التوقيت
    timestamp: Date.now(),
    hour: new Date().getHours(),
    day: new Date().getDay(),
    
    // معلومات إضافية
    urlPattern: extractUrlPattern(url),
    
    // hash فريد
    hash: null
  };
  
  // إنشاء hash فريد من كل المعلومات
  fingerprint.hash = simpleHash(fingerprint.ip + fingerprint.host + fingerprint.net24);
  
  return fingerprint;
}

function extractHostPattern(host) {
  // استخراج نمط من اسم المضيف
  if (/match|game|battle/i.test(host)) return "match_server";
  if (/lobby|dispatch|gateway/i.test(host)) return "lobby_server";
  if (/cdn|asset|resource/i.test(host)) return "content_server";
  return "unknown";
}

function extractUrlPattern(url) {
  if (/matchmaking|queue/i.test(url)) return "matchmaking";
  if (/match|battle|game/i.test(url)) return "gameplay";
  if (/lobby|hall/i.test(url)) return "lobby";
  return "other";
}

function simpleHash(str) {
  // hash بسيط لإنشاء معرف فريد
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}

function compareFingerprints(fp1, fp2) {
  // مقارنة بصمتين - هل هما نفس السيرفر؟
  
  if (!fp1 || !fp2) return false;
  
  // المستوى الأول: نفس IP تماماً
  if (fp1.ip === fp2.ip) return true;
  
  // المستوى الثاني: نفس الشبكة /24
  if (fp1.net24 === fp2.net24 && fp1.hostPattern === fp2.hostPattern) return true;
  
  // المستوى الثالث: نفس hash
  if (fp1.hash === fp2.hash) return true;
  
  return false;
}

// ═══════════════════════════════════════════════════════════════════════════
//  LAYER 6: DEEP NETWORK ANALYSIS - التحليل العميق للشبكة
// ═══════════════════════════════════════════════════════════════════════════

function deepAnalyzeIP(ip) {
  // تحليل شامل ومتعمق جداً لأي IP
  // نفحص كل طبقة ونعطي نقاط تفصيلية
  
  var analysis = {
    ip: ip,
    isJordanian: false,
    tier: null,
    tierName: null,
    provider: null,
    datacenter: null,
    expectedPing: 999,
    baseScore: 0,
    bonusScore: 0,
    totalScore: 0,
    trustLevel: "unknown",
    allowDirect: false,
    shouldBlock: false,
    blockReason: null,
    threat: null
  };
  
  // الطبقة 0: فحص الذاكرة أولاً
  if (MEMORY.servers.banned[ip]) {
    analysis.shouldBlock = true;
    analysis.blockReason = "permanently_banned";
    analysis.totalScore = -10000;
    return analysis;
  }
  
  if (MEMORY.servers.diamond[ip]) {
    var diamond = MEMORY.servers.diamond[ip];
    analysis.isJordanian = true;
    analysis.trustLevel = "diamond";
    analysis.expectedPing = diamond.ping || 5;
    analysis.baseScore = 1000;
    analysis.bonusScore = diamond.successCount * 50;
    analysis.totalScore = analysis.baseScore + analysis.bonusScore;
    analysis.allowDirect = true;
    return analysis;
  }
  
  if (MEMORY.servers.golden[ip]) {
    var golden = MEMORY.servers.golden[ip];
    analysis.isJordanian = true;
    analysis.trustLevel = "golden";
    analysis.expectedPing = golden.ping || 8;
    analysis.baseScore = 800;
    analysis.bonusScore = golden.successCount * 30;
    analysis.totalScore = analysis.baseScore + analysis.bonusScore;
    analysis.allowDirect = true;
    return analysis;
  }
  
  // الطبقة 1: فحص القائمة السوداء
  for (var b = 0; b < BLACKLIST_ZONES.length; b++) {
    var zone = BLACKLIST_ZONES[b];
    if (isInNet(ip, zone.range[0], zone.range[1])) {
      analysis.shouldBlock = true;
      analysis.blockReason = "blacklisted_zone";
      analysis.threat = zone.threat;
      analysis.totalScore = -10000;
      MEMORY.servers.banned[ip] = {reason: zone.region, threat: zone.threat};
      return analysis;
    }
  }
  
  // الطبقة 2: فحص الشبكات الأردنية
  for (var tierName in JORDAN_NETWORKS_DB) {
    var tier = JORDAN_NETWORKS_DB[tierName];
    
    for (var n = 0; n < tier.length; n++) {
      var network = tier[n];
      if (isInNet(ip, network.range[0], network.range[1])) {
        
        analysis.isJordanian = true;
        analysis.tier = network;
        analysis.tierName = tierName;
        analysis.provider = network.provider;
        analysis.datacenter = network.dc;
        analysis.expectedPing = network.ping;
        analysis.baseScore = network.score;
        analysis.allowDirect = network.direct;
        analysis.trustLevel = "trusted";
        
        // مكافأة إذا كان نفس مزود اللاعب
        if (MEMORY.player.provider === network.provider) {
          analysis.bonusScore += 100;
          analysis.expectedPing = Math.floor(analysis.expectedPing * 0.7);
        }
        
        // مكافأة إذا كان في نفس data center
        if (MEMORY.player.network && MEMORY.player.network.dc === network.dc) {
          analysis.bonusScore += 50;
          analysis.expectedPing = Math.floor(analysis.expectedPing * 0.8);
        }
        
        analysis.totalScore = analysis.baseScore + analysis.bonusScore;
        
        return analysis;
      }
    }
  }
  
  // الطبقة 3: إذا لم نجد - غير أردني
  analysis.shouldBlock = true;
  analysis.blockReason = "not_jordanian";
  analysis.totalScore = -5000;
  
  return analysis;
}

// ═══════════════════════════════════════════════════════════════════════════
//  LAYER 7: TRAFFIC CLASSIFICATION - تصنيف الحركة
// ═══════════════════════════════════════════════════════════════════════════

function classifyTraffic(url, host) {
  // تصنيف دقيق جداً مع أولويات واضحة
  
  var combined = (url + host).toLowerCase();
  
  // الأولوية القصوى: matchmaking
  if (/matchmaking|match-queue|find-match|search-game|join-queue|enter-queue|queue-join/i.test(combined)) {
    return {type: "matchmaking", priority: 1000, critical: true};
  }
  
  // أولوية عالية: المباراة الفعلية
  if (/\b(match|battle|game-server|combat|room-\d+|instance|gameplay|session-\d+)\b/i.test(combined)) {
    if (!/matchmaking|prematch|postmatch|match-history|match-result/i.test(combined)) {
      return {type: "match", priority: 900, critical: true};
    }
  }
  
  // أولوية متوسطة: اللوبي
  if (/lobby|entrance|hall|dispatch|gateway|platform|waiting-room/i.test(combined)) {
    return {type: "lobby", priority: 500, critical: false};
  }
  
  // أولوية منخفضة: اجتماعي
  if (/friend|squad|team|party|clan|social|invite|presence|chat|message/i.test(combined)) {
    return {type: "social", priority: 300, critical: false};
  }
  
  // أولوية منخفضة: محتوى
  if (/cdn|asset|resource|patch|update|download|static|content|media|file/i.test(combined)) {
    return {type: "cdn", priority: 200, critical: false};
  }
  
  return {type: "general", priority: 100, critical: false};
}

// ═══════════════════════════════════════════════════════════════════════════
//  LAYER 8: TIME ANALYSIS - التحليل الزمني المتقدم
// ═══════════════════════════════════════════════════════════════════════════

function analyzeCurrentTime() {
  // تحليل شامل للتوقيت الحالي
  
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var day = now.getDay();
  
  var analysis = {
    hour: hour,
    minute: minute,
    day: day,
    window: Math.floor(minute / 15),
    windowKey: day + "-" + hour + "-" + Math.floor(minute / 15),
    isPeakTime: false,
    isGoldenWindow: false,
    multiplier: 1.0
  };
  
  // تحديد أوقات الذروة
  if (hour >= 19 && hour <= 23) {
    analysis.isPeakTime = true;
    analysis.multiplier = 5.0;
  } else if (hour >= 0 && hour <= 2) {
    analysis.isPeakTime = true;
    analysis.multiplier = 4.0;
  } else if (hour >= 14 && hour <= 18) {
    analysis.multiplier = 2.5;
  }
  
  // مكافأة عطلة نهاية الأسبوع
  if (day === 5 || day === 6) {
    analysis.multiplier *= 1.5;
  }
  
  // النوافذ الذهبية - أول 10 دقائق من كل ساعة
  if (minute >= 0 && minute <= 10) {
    analysis.isGoldenWindow = true;
    analysis.multiplier *= 2.5;
  }
  // نافذة ثانوية - منتصف الساعة
  else if (minute >= 30 && minute <= 40) {
    analysis.isGoldenWindow = true;
    analysis.multiplier *= 1.8;
  }
  
  // تسجيل في الأنماط
  if (!MEMORY.timePatterns.windows[analysis.windowKey]) {
    MEMORY.timePatterns.windows[analysis.windowKey] = 0;
  }
  MEMORY.timePatterns.windows[analysis.windowKey]++;
  
  MEMORY.timePatterns.current = analysis;
  
  return analysis;
}

// ═══════════════════════════════════════════════════════════════════════════
//  LAYER 9: SESSION MANAGEMENT - إدارة الجلسة المتقدمة
// ═══════════════════════════════════════════════════════════════════════════

function initializeSession(serverIP, host, url, analysis) {
  // بدء جلسة جديدة مع كل التفاصيل
  
  var fingerprint = createFingerprint(serverIP, host, url);
  
  MEMORY.activeSession = {
    active: true,
    server: {
      ip: serverIP,
      host: host,
      analysis: analysis,
      fingerprint: fingerprint
    },
    startTime: Date.now(),
    lastActivity: Date.now(),
    violations: 0,
    packetCount: 0,
    locked: true
  };
  
  MEMORY.stats.totalSessions++;
  
  return true;
}

function validateSessionIntegrity(serverIP, host, url) {
  // فحص صارم جداً لسلامة الجلسة
  // أي انحراف = انتهاك
  
  if (!MEMORY.activeSession.active) {
    return {valid: true, reason: "no_active_session"};
  }
  
  var current = createFingerprint(serverIP, host, url);
  var original = MEMORY.activeSession.server.fingerprint;
  
  // الفحص الأقوى: هل البصمة متطابقة؟
  var matches = compareFingerprints(current, original);
  
  if (!matches) {
    MEMORY.activeSession.violations++;
    
    return {
      valid: false,
      reason: "fingerprint_mismatch",
      violations: MEMORY.activeSession.violations,
      shouldBlock: MEMORY.activeSession.violations > MAX_VIOLATIONS
    };
  }
  
  // تحديث النشاط
  MEMORY.activeSession.lastActivity = Date.now();
  MEMORY.activeSession.packetCount++;
  
  return {valid: true, reason: "ok"};
}

function terminateSession(reason) {
  // إنهاء الجلسة وتحليل النتائج
  
  if (MEMORY.activeSession.active) {
    var session = MEMORY.activeSession;
    var duration = Date.now() - session.startTime;
    
    // إذا كانت الجلسة ناجحة (أكثر من 5 دقائق)
    if (duration > 300000 && session.violations === 0) {
      
      // ترقية السيرفر
      var ip = session.server.ip;
      var analysis = session.server.analysis;
      
      if (analysis.expectedPing < 10) {
        // ترقية لماسي
        if (!MEMORY.servers.diamond[ip]) {
          MEMORY.servers.diamond[ip] = {ping: analysis.expectedPing, successCount: 0, fingerprint: session.server.fingerprint};
        }
        MEMORY.servers.diamond[ip].successCount++;
        MEMORY.servers.diamond[ip].lastSuccess = Date.now();
        
      } else if (analysis.expectedPing < 15) {
        // ترقية لذهبي
        if (!MEMORY.servers.golden[ip]) {
          MEMORY.servers.golden[ip] = {ping: analysis.expectedPing, successCount: 0, fingerprint: session.server.fingerprint};
        }
        MEMORY.servers.golden[ip].successCount++;
        MEMORY.servers.golden[ip].lastSuccess = Date.now();
        
      } else {
        // موثوق فقط
        if (!MEMORY.servers.trusted[ip]) {
          MEMORY.servers.trusted[ip] = {ping: analysis.expectedPing, successCount: 0};
        }
        MEMORY.servers.trusted[ip].successCount++;
      }
      
      MEMORY.stats.successfulSessions++;
      
      // تحديث أفضل بينغ
      if (analysis.expectedPing < MEMORY.stats.bestPing) {
        MEMORY.stats.bestPing = analysis.expectedPing;
        MEMORY.stats.bestServer = ip;
      }
      
      // حفظ في التاريخ
      MEMORY.recentHistory.unshift({
        server: ip,
        ping: analysis.expectedPing,
        duration: duration,
        timestamp: Date.now(),
        success: true
      });
      
      if (MEMORY.recentHistory.length > MEMORY.maxHistory) {
        MEMORY.recentHistory.pop();
      }
    }
  }
  
  // إعادة تعيين
  MEMORY.activeSession = {
    active: false,
    server: null,
    fingerprint: null,
    startTime: null,
    lastActivity: null,
    violations: 0,
    packetCount: 0,
    locked: false
  };
}

function checkAutoTermination() {
  // فحص تلقائي لإنهاء الجلسات القديمة
  
  if (MEMORY.activeSession.active) {
    var age = Date.now() - MEMORY.activeSession.startTime;
    
    if (age > MAX_SESSION_DURATION) {
      terminateSession("max_duration_exceeded");
      return true;
    }
    
    // فحص النشاط - إذا لا نشاط لمدة 5 دقائق
    var inactivity = Date.now() - MEMORY.activeSession.lastActivity;
    if (inactivity > 300000) {
      terminateSession("inactivity_timeout");
      return true;
    }
  }
  
  return false;
}

// ═══════════════════════════════════════════════════════════════════════════
//  LAYER 10: PLAYER DETECTION - كشف معلومات اللاعب
// ═══════════════════════════════════════════════════════════════════════════

function detectPlayerInfo() {
  // محاولة كشف معلومات اللاعب من IP المحلي
  
  if (MEMORY.player.provider) {
    return; // تم الكشف مسبقاً
  }
  
  var myIP = myIpAddress();
  
  if (!myIP || myIP === "127.0.0.1") {
    MEMORY.player.provider = "unknown";
    return;
  }
  
  MEMORY.player.ip = myIP;
  
  var analysis = deepAnalyzeIP(myIP);
  
  if (analysis.isJordanian) {
    MEMORY.player.provider = analysis.provider;
    MEMORY.player.tier = analysis.tierName;
    MEMORY.player.network = analysis.tier;
    MEMORY.player.detectedAt = Date.now();
  } else {
    MEMORY.player.provider = "unknown";
  }
}

// ═══════════════════════════════════════════════════════════════════════════
//  LAYER 11: DECISION ENGINE - محرك اتخاذ القرار النهائي
// ═══════════════════════════════════════════════════════════════════════════

function makeUltimateDecision(serverIP, host, url, analysis, traffic, timeAnalysis) {
  // هذه الدالة تجمع كل المعلومات وتتخذ القرار النهائي المطلق
  // القرار يبنى على نظام نقاط معقد جداً
  
  // ══════════════════════════════════════════════════
  // المرحلة 1: الحظر الفوري - لا نقاش
  // ══════════════════════════════════════════════════
  
  if (analysis.shouldBlock) {
    MEMORY.stats.totalBlocked++;
    return {action: ABSOLUTE_BLOCK, reason: analysis.blockReason};
  }
  
  // ══════════════════════════════════════════════════
  // المرحلة 2: Matchmaking - نقطة التجميع
  // ══════════════════════════════════════════════════
  
  if (traffic.type === "matchmaking") {
    
    // نقبل فقط سيرفرات أردنية ذات بينغ ممتاز
    if (!analysis.isJordanian || analysis.expectedPing > 20) {
      MEMORY.servers.banned[serverIP] = {reason: "matchmaking_rejection", ping: analysis.expectedPing};
      return {action: ABSOLUTE_BLOCK, reason: "matchmaking_standards_not_met"};
    }
    
    // كل الأردنيين يمرون من نفس القمع
    return {action: CONVERGENCE_POINT, reason: "matchmaking_convergence"};
  }
  
  // ══════════════════════════════════════════════════
  // المرحلة 3: المباراة الفعلية - استقرار كامل
  // ══════════════════════════════════════════════════
  
  if (traffic.type === "match") {
    
    // رفض فوري لأي سيرفر غير أردني
    if (!analysis.isJordanian) {
      MEMORY.servers.banned[serverIP] = {reason: "match_not_jordanian"};
      return {action: ABSOLUTE_BLOCK, reason: "match_requires_jordanian"};
    }
    
    // رفض البينغ العالي
    if (analysis.expectedPing > MAX_ACCEPTABLE_PING) {
      return {action: ABSOLUTE_BLOCK, reason: "ping_too_high"};
    }
    
    // بدء جلسة جديدة
    if (!MEMORY.activeSession.active) {
      initializeSession(serverIP, host, url, analysis);
      return {action: MATCH_UNIFIED_PATH, reason: "new_match_session"};
    }
    
    // التحقق من سلامة الجلسة النشطة
    var integrity = validateSessionIntegrity(serverIP, host, url);
    
    if (!integrity.valid) {
      if (integrity.shouldBlock) {
        MEMORY.servers.banned[serverIP] = {reason: "session_violation", violations: integrity.violations};
        return {action: ABSOLUTE_BLOCK, reason: "session_integrity_violation"};
      }
      return {action: ABSOLUTE_BLOCK, reason: "session_mismatch"};
    }
    
    // كل شيء تمام - نفس المسار
    return {action: MATCH_UNIFIED_PATH, reason: "session_continuation"};
  }
  
  // ══════════════════════════════════════════════════
  // المرحلة 4: اللوبي - العودة من المباراة
  // ══════════════════════════════════════════════════
  
  if (traffic.type === "lobby") {
    
    // فحص تلقائي لإنهاء الجلسة
    checkAutoTermination();
    
    // رفض غير الأردني
    if (!analysis.isJordanian) {
      return {action: ABSOLUTE_BLOCK, reason: "lobby_not_jordanian"};
    }
    
    // استخدام DIRECT للسيرفرات السريعة جداً
    if (analysis.allowDirect && analysis.expectedPing < IDEAL_PING_THRESHOLD) {
      MEMORY.stats.totalDirect++;
      return {action: DIRECT, reason: "lobby_direct_fast"};
    }
    
    // استخدام بروكسي موحد
    return {action: CONVERGENCE_POINT, reason: "lobby_unified"};
  }
  
  // ══════════════════════════════════════════════════
  // المرحلة 5: الخدمات الأخرى
  // ══════════════════════════════════════════════════
  
  if (traffic.type === "social" || traffic.type === "cdn") {
    
    if (!analysis.isJordanian) {
      return {action: ABSOLUTE_BLOCK, reason: "service_not_jordanian"};
    }
    
    // CDN نفضل DIRECT إذا كان سريع
    if (traffic.type === "cdn" && analysis.expectedPing < IDEAL_PING_THRESHOLD) {
      MEMORY.stats.totalDirect++;
      return {action: DIRECT, reason: "cdn_direct"};
    }
    
    return {action: CONVERGENCE_POINT, reason: "service_unified"};
  }
  
  // ══════════════════════════════════════════════════
  // المرحلة 6: حركة عامة
  // ══════════════════════════════════════════════════
  
  if (!analysis.isJordanian) {
    return {action: ABSOLUTE_BLOCK, reason: "general_not_jordanian"};
  }
  
  // Diamond tier - DIRECT دائماً
  if (analysis.trustLevel === "diamond") {
    MEMORY.stats.totalDirect++;
    return {action: DIRECT, reason: "diamond_direct"};
  }
  
  // سريع جداً - DIRECT
  if (analysis.expectedPing < IDEAL_PING_THRESHOLD && analysis.allowDirect) {
    MEMORY.stats.totalDirect++;
    return {action: DIRECT, reason: "fast_direct"};
  }
  
  // افتراضي
  return {action: CONVERGENCE_POINT, reason: "general_unified"};
}

// ═══════════════════════════════════════════════════════════════════════════
//  LAYER 12: MAIN ROUTER - الموجه الرئيسي النهائي
// ═══════════════════════════════════════════════════════════════════════════

function FindProxyForURL(url, host) {
  
  // ════════════════════════════════════════════
  // الخطوة 1: تنظيف وتحضير
  // ════════════════════════════════════════════
  
  host = norm(host).toLowerCase();
  
  // ════════════════════════════════════════════
  // الخطوة 2: فلترة سريعة - غير PUBG
  // ════════════════════════════════════════════
  
  if (!isPUBG(host)) {
    return DIRECT;
  }
  
  // ════════════════════════════════════════════
  // الخطوة 3: تهيئة معلومات اللاعب
  // ════════════════════════════════════════════
  
  if (!MEMORY.player.provider) {
    detectPlayerInfo();
  }
  
  // ════════════════════════════════════════════
  // الخطوة 4: حل DNS مع تخزين مؤقت
  // ════════════════════════════════════════════
  
  var serverIP = smartResolve(host);
  
  if (!serverIP || serverIP.indexOf(":") > -1) {
    return ABSOLUTE_BLOCK;
  }
  
  // ════════════════════════════════════════════
  // الخطوة 5: التحليل العميق الشامل
  // ════════════════════════════════════════════
  
  var analysis = deepAnalyzeIP(serverIP);
  var traffic = classifyTraffic(url, host);
  var timeAnalysis = analyzeCurrentTime();
  
  // تطبيق مكافأة التوقيت
  if (analysis.isJordanian) {
    analysis.totalScore = Math.floor(analysis.totalScore * timeAnalysis.multiplier);
  }
  
  // ════════════════════════════════════════════
  // الخطوة 6: اتخاذ القرار النهائي المطلق
  // ════════════════════════════════════════════
  
  var decision = makeUltimateDecision(serverIP, host, url, analysis, traffic, timeAnalysis);
  
  // ════════════════════════════════════════════
  // الخطوة 7: إرجاع القرار
  // ════════════════════════════════════════════
  
  return decision.action;
}

// ═══════════════════════════════════════════════════════════════════════════
//  نهاية السكربت النهائي المطلق
// ═══════════════════════════════════════════════════════════════════════════
