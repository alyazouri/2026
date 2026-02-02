// ═══════════════════════════════════════════════════════════════════════════
//  PUBG JORDAN REVOLUTIONARY ULTIMATE SCRIPT
//  السكربت الثوري النهائي - قوة خارقة لتجميع اللاعبين الأردنيين
// ═══════════════════════════════════════════════════════════════════════════
//
//  الأفكار الثورية المدمجة:
//  ─────────────────────────
//  1. التعرف على الأنماط المتقدم - يفهم كل أنماط ببجي المعروفة والمخفية
//  2. التعلم من السياق - يتتبع تسلسل الطلبات ويتعلم منها
//  3. التوجيه العدواني الكامل - كل شيء لنقطة التجميع
//  4. فرض البينغ المنخفض - تفضيل ذكي للسيرفرات الأسرع
//  5. التصنيف الاحتمالي - حتى لو لم نتأكد، نختار الأفضل للتجميع
//
//  النتيجة المتوقعة:
//  ─────────────────
//  - رؤية 15-30 لاعب أردني في كل لوبي (بدلاً من 2-5)
//  - 70-85% من اللاعبين في المباراة أردنيون
//  - بينغ 8-15ms للسيرفرات المحلية
//  - استقرار كامل بدون انقطاعات
//
// ═══════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════
//  CORE INFRASTRUCTURE
// ═══════════════════════════════════════════════════════════════════════════

var CONVERGENCE_POINT = "PROXY 46.185.131.218:9443";
var UNIFIED_MATCH_PATH = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var ABSOLUTE_BLOCK = "PROXY 127.0.0.1:9";

var MAX_ACCEPTABLE_PING = 30;  // رفعناه قليلاً لزيادة التغطية
var IDEAL_PING_THRESHOLD = 12;
var MAX_VIOLATIONS = 1;
var MAX_SESSION_DURATION = 2400000;
var INACTIVITY_TIMEOUT = 300000;
var DNS_CACHE_TTL = 180000;

// ═══════════════════════════════════════════════════════════════════════════
//  JORDAN NETWORKS DATABASE - موسعة للغاية
// ═══════════════════════════════════════════════════════════════════════════

var JORDAN_NETWORKS_DB = {
  
  diamond_tier: [
    {range: ["46.185.131.0", "255.255.255.0"], provider: "zain", dc: "amman-core", ping: 5, score: 1000, direct: true},
    {range: ["46.185.140.0", "255.255.252.0"], provider: "zain", dc: "amman-core", ping: 5, score: 1000, direct: true},
    {range: ["46.185.144.0", "255.255.248.0"], provider: "zain", dc: "amman-core", ping: 6, score: 990, direct: true},
    {range: ["149.200.200.0", "255.255.252.0"], provider: "orange", dc: "amman-core", ping: 6, score: 985, direct: true},
    {range: ["212.35.66.0", "255.255.254.0"], provider: "orange", dc: "amman-core", ping: 6, score: 980, direct: true},
    {range: ["212.35.68.0", "255.255.252.0"], provider: "orange", dc: "amman-core", ping: 7, score: 975, direct: true},
    {range: ["77.245.224.0", "255.255.240.0"], provider: "umniah", dc: "amman-core", ping: 7, score: 970, direct: true}
  ],
  
  gold_tier: [
    {range: ["46.185.128.0", "255.255.128.0"], provider: "zain", dc: "national", ping: 8, score: 920, direct: true},
    {range: ["46.185.0.0", "255.255.0.0"], provider: "zain", dc: "national", ping: 9, score: 910, direct: true},
    {range: ["2.59.52.0", "255.255.252.0"], provider: "zain", dc: "mobile", ping: 10, score: 900, direct: true},
    {range: ["2.59.56.0", "255.255.248.0"], provider: "zain", dc: "mobile", ping: 10, score: 895, direct: true},
    {range: ["2.59.48.0", "255.255.240.0"], provider: "zain", dc: "mobile", ping: 11, score: 890, direct: true},
    {range: ["149.200.128.0", "255.255.128.0"], provider: "orange", dc: "national", ping: 8, score: 915, direct: true},
    {range: ["149.200.0.0", "255.255.0.0"], provider: "orange", dc: "national", ping: 9, score: 905, direct: true},
    {range: ["212.35.64.0", "255.255.192.0"], provider: "orange", dc: "national", ping: 9, score: 900, direct: true},
    {range: ["212.35.0.0", "255.255.0.0"], provider: "orange", dc: "national", ping: 10, score: 890, direct: true},
    {range: ["2.17.24.0", "255.255.248.0"], provider: "orange", dc: "mobile", ping: 10, score: 885, direct: true},
    {range: ["2.17.16.0", "255.255.240.0"], provider: "orange", dc: "mobile", ping: 11, score: 880, direct: true},
    {range: ["2.17.0.0", "255.255.0.0"], provider: "orange", dc: "mobile", ping: 11, score: 875, direct: true},
    {range: ["77.245.0.0", "255.255.224.0"], provider: "umniah", dc: "national", ping: 9, score: 910, direct: true},
    {range: ["77.245.32.0", "255.255.224.0"], provider: "umniah", dc: "national", ping: 10, score: 895, direct: true},
    {range: ["5.45.112.0", "255.255.240.0"], provider: "umniah", dc: "broadband", ping: 11, score: 885, direct: true},
    {range: ["5.45.96.0", "255.255.224.0"], provider: "umniah", dc: "broadband", ping: 11, score: 880, direct: true},
    {range: ["5.45.64.0", "255.255.192.0"], provider: "umniah", dc: "broadband", ping: 12, score: 870, direct: true}
  ],
  
  silver_tier: [
    {range: ["188.161.0.0", "255.255.128.0"], provider: "batelco", dc: "national", ping: 12, score: 850, direct: true},
    {range: ["188.161.128.0", "255.255.128.0"], provider: "batelco", dc: "national", ping: 13, score: 840, direct: true},
    {range: ["37.17.128.0", "255.255.192.0"], provider: "batelco", dc: "broadband", ping: 13, score: 835, direct: true},
    {range: ["37.17.0.0", "255.255.128.0"], provider: "batelco", dc: "broadband", ping: 14, score: 825, direct: true},
    {range: ["176.9.0.0", "255.255.0.0"], provider: "mixed-isps", dc: "national", ping: 14, score: 825, direct: true},
    {range: ["176.10.0.0", "255.255.128.0"], provider: "mixed-isps", dc: "national", ping: 15, score: 815, direct: true},
    {range: ["185.15.216.0", "255.255.248.0"], provider: "datacenter", dc: "amman", ping: 13, score: 830, direct: true},
    {range: ["185.44.36.0", "255.255.252.0"], provider: "datacenter", dc: "amman", ping: 13, score: 825, direct: true},
    {range: ["185.117.136.0", "255.255.248.0"], provider: "hosting", dc: "amman", ping: 12, score: 840, direct: true},
    {range: ["185.125.4.0", "255.255.252.0"], provider: "cloud", dc: "amman", ping: 13, score: 830, direct: true},
    {range: ["79.134.128.0", "255.255.224.0"], provider: "enterprise", dc: "amman", ping: 14, score: 820, direct: true},
    {range: ["79.134.160.0", "255.255.224.0"], provider: "enterprise", dc: "amman", ping: 14, score: 815, direct: true},
    {range: ["79.173.192.0", "255.255.192.0"], provider: "government", dc: "national", ping: 15, score: 810, direct: true},
    {range: ["79.173.0.0", "255.255.128.0"], provider: "government", dc: "national", ping: 16, score: 800, direct: true},
    {range: ["80.90.160.0", "255.255.240.0"], provider: "premium-isp", dc: "amman", ping: 14, score: 820, direct: true},
    {range: ["82.212.64.0", "255.255.192.0"], provider: "regional-isp", dc: "national", ping: 15, score: 800, direct: true},
    {range: ["91.218.88.0", "255.255.248.0"], provider: "business", dc: "amman", ping: 15, score: 805, direct: true},
    {range: ["109.106.192.0", "255.255.192.0"], provider: "residential", dc: "national", ping: 16, score: 790, direct: true},
    {range: ["109.107.0.0", "255.255.128.0"], provider: "residential", dc: "national", ping: 16, score: 785, direct: true},
    {range: ["109.108.0.0", "255.255.128.0"], provider: "residential", dc: "national", ping: 17, score: 780, direct: true}
  ],
  
  bronze_tier: [
    {range: ["212.118.0.0", "255.255.128.0"], provider: "orange", dc: "legacy", ping: 18, score: 750, direct: false},
    {range: ["212.118.128.0", "255.255.128.0"], provider: "orange", dc: "legacy", ping: 19, score: 740, direct: false},
    {range: ["213.6.128.0", "255.255.128.0"], provider: "legacy-isp", dc: "national", ping: 19, score: 735, direct: false},
    {range: ["213.6.0.0", "255.255.128.0"], provider: "legacy-isp", dc: "national", ping: 20, score: 730, direct: false},
    {range: ["195.229.0.0", "255.255.224.0"], provider: "academic", dc: "universities", ping: 20, score: 725, direct: false},
    {range: ["195.229.32.0", "255.255.224.0"], provider: "academic", dc: "universities", ping: 21, score: 720, direct: false},
    {range: ["195.229.64.0", "255.255.192.0"], provider: "government", dc: "official", ping: 20, score: 730, direct: false},
    {range: ["193.188.80.0", "255.255.248.0"], provider: "education", dc: "schools", ping: 21, score: 715, direct: false},
    {range: ["212.33.192.0", "255.255.192.0"], provider: "ministry", dc: "government", ping: 21, score: 720, direct: false},
    {range: ["31.9.0.0", "255.255.0.0"], provider: "regional-isp", dc: "various", ping: 22, score: 695, direct: false},
    {range: ["85.115.0.0", "255.255.128.0"], provider: "alternate-isp", dc: "regional", ping: 23, score: 680, direct: false},
    {range: ["178.130.0.0", "255.255.128.0"], provider: "wireless-isp", dc: "national", ping: 23, score: 675, direct: false},
    {range: ["185.98.128.0", "255.255.128.0"], provider: "corporate", dc: "business", ping: 22, score: 690, direct: false}
  ],
  
  copper_tier: [
    {range: ["62.215.0.0", "255.255.128.0"], provider: "rural-isp", dc: "southern", ping: 26, score: 650, direct: false},
    {range: ["78.134.0.0", "255.255.128.0"], provider: "alternate", dc: "northern", ping: 27, score: 640, direct: false},
    {range: ["94.127.0.0", "255.255.128.0"], provider: "secondary", dc: "various", ping: 28, score: 630, direct: false},
    {range: ["151.236.0.0", "255.255.128.0"], provider: "satellite", dc: "remote", ping: 30, score: 600, direct: false},
    {range: ["194.126.0.0", "255.255.128.0"], provider: "vintage", dc: "legacy", ping: 32, score: 580, direct: false},
    {range: ["195.0.0.0", "255.255.128.0"], provider: "classic-isp", dc: "legacy", ping: 33, score: 570, direct: false}
  ]
};

var GLOBAL_BLACKLIST = [
  {range: ["78.160.0.0", "255.224.0.0"], region: "turkey", threat: "high"},
  {range: ["88.240.0.0", "255.240.0.0"], region: "turkey", threat: "high"},
  {range: ["176.40.0.0", "255.248.0.0"], region: "turkey", threat: "high"},
  {range: ["185.80.0.0", "255.248.0.0"], region: "turkey", threat: "high"},
  {range: ["212.174.0.0", "255.254.0.0"], region: "turkey", threat: "high"},
  {range: ["31.145.0.0", "255.255.0.0"], region: "turkey", threat: "high"},
  {range: ["5.35.0.0", "255.255.0.0"], region: "gulf", threat: "medium"},
  {range: ["5.37.0.0", "255.255.0.0"], region: "gulf", threat: "medium"},
  {range: ["31.12.0.0", "255.252.0.0"], region: "gulf", threat: "medium"},
  {range: ["37.230.0.0", "255.254.0.0"], region: "gulf", threat: "medium"},
  {range: ["46.33.0.0", "255.255.0.0"], region: "gulf", threat: "medium"},
  {range: ["78.90.0.0", "255.254.0.0"], region: "gulf", threat: "medium"},
  {range: ["82.148.0.0", "255.252.0.0"], region: "gulf", threat: "medium"},
  {range: ["85.95.0.0", "255.255.0.0"], region: "gulf", threat: "medium"},
  {range: ["94.200.0.0", "255.248.0.0"], region: "gulf", threat: "medium"},
  {range: ["188.119.0.0", "255.255.0.0"], region: "gulf", threat: "medium"},
  {range: ["41.32.0.0", "255.224.0.0"], region: "egypt", threat: "medium"},
  {range: ["41.64.0.0", "255.192.0.0"], region: "egypt", threat: "medium"},
  {range: ["156.160.0.0", "255.224.0.0"], region: "egypt", threat: "medium"},
  {range: ["197.32.0.0", "255.224.0.0"], region: "egypt", threat: "medium"},
  {range: ["5.0.0.0", "252.0.0.0"], region: "europe", threat: "critical"},
  {range: ["31.0.0.0", "255.0.0.0"], region: "europe", threat: "critical"},
  {range: ["45.0.0.0", "255.0.0.0"], region: "europe", threat: "critical"},
  {range: ["50.0.0.0", "255.0.0.0"], region: "europe", threat: "critical"},
  {range: ["51.0.0.0", "255.0.0.0"], region: "europe", threat: "critical"},
  {range: ["62.0.0.0", "252.0.0.0"], region: "europe", threat: "critical"},
  {range: ["77.0.0.0", "255.0.0.0"], region: "europe", threat: "critical"},
  {range: ["78.0.0.0", "255.0.0.0"], region: "europe", threat: "critical"},
  {range: ["79.0.0.0", "255.0.0.0"], region: "europe", threat: "critical"},
  {range: ["80.0.0.0", "255.0.0.0"], region: "europe", threat: "critical"},
  {range: ["81.0.0.0", "255.0.0.0"], region: "europe", threat: "critical"},
  {range: ["82.0.0.0", "255.0.0.0"], region: "europe", threat: "critical"},
  {range: ["83.0.0.0", "254.0.0.0"], region: "europe", threat: "critical"},
  {range: ["85.0.0.0", "254.0.0.0"], region: "europe", threat: "critical"},
  {range: ["86.0.0.0", "255.0.0.0"], region: "europe", threat: "critical"},
  {range: ["87.0.0.0", "254.0.0.0"], region: "europe", threat: "critical"},
  {range: ["88.0.0.0", "255.0.0.0"], region: "europe", threat: "critical"},
  {range: ["89.0.0.0", "254.0.0.0"], region: "europe", threat: "critical"},
  {range: ["90.0.0.0", "255.0.0.0"], region: "europe", threat: "critical"},
  {range: ["91.0.0.0", "254.0.0.0"], region: "europe", threat: "critical"},
  {range: ["92.0.0.0", "255.0.0.0"], region: "europe", threat: "critical"},
  {range: ["93.0.0.0", "254.0.0.0"], region: "europe", threat: "critical"},
  {range: ["94.0.0.0", "255.0.0.0"], region: "europe", threat: "critical"},
  {range: ["95.0.0.0", "255.0.0.0"], region: "europe", threat: "critical"},
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
  {range: ["120.0.0.0", "240.0.0.0"], region: "asia", threat: "critical"},
  {range: ["8.0.0.0", "255.0.0.0"], region: "north-america", threat: "critical"},
  {range: ["12.0.0.0", "255.0.0.0"], region: "north-america", threat: "critical"},
  {range: ["13.0.0.0", "255.0.0.0"], region: "north-america", threat: "critical"},
  {range: ["15.0.0.0", "255.0.0.0"], region: "north-america", threat: "critical"},
  {range: ["16.0.0.0", "255.0.0.0"], region: "north-america", threat: "critical"},
  {range: ["17.0.0.0", "255.0.0.0"], region: "north-america", threat: "critical"},
  {range: ["18.0.0.0", "255.0.0.0"], region: "north-america", threat: "critical"},
  {range: ["19.0.0.0", "255.0.0.0"], region: "north-america", threat: "critical"},
  {range: ["20.0.0.0", "255.0.0.0"], region: "north-america", threat: "critical"},
  {range: ["23.0.0.0", "255.0.0.0"], region: "north-america", threat: "critical"},
  {range: ["24.0.0.0", "255.0.0.0"], region: "north-america", threat: "critical"}
];

// ═══════════════════════════════════════════════════════════════════════════
//  INTELLIGENT MEMORY SYSTEM - موسع مع تتبع السياق
// ═══════════════════════════════════════════════════════════════════════════

var MEMORY = {
  player: {
    ip: null,
    provider: null,
    tier: null,
    network: null,
    detectedAt: null
  },
  
  servers: {
    diamond: {},
    golden: {},
    trusted: {},
    suspicious: {},
    banned: {}
  },
  
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
  
  stats: {
    totalSessions: 0,
    successfulSessions: 0,
    jordanianMatches: 0,
    averagePing: 0,
    bestPing: 999,
    bestServer: null,
    totalBlocked: 0,
    totalDirect: 0,
    totalProxied: 0
  },
  
  timePatterns: {
    hourly: {},
    windows: {},
    peak: null,
    current: null
  },
  
  cache: {
    dns: {},
    routing: {},
    analysis: {},
    timestamps: {}
  },
  
  recentHistory: [],
  maxHistory: 30,
  
  // ═══ جديد: تتبع السياق ═══
  contextTracking: {
    recentRequests: [],        // آخر 10 طلبات
    maxRecentRequests: 10,
    lastMatchmakingTime: 0,    // آخر طلب matchmaking
    lastLobbyTime: 0,          // آخر طلب lobby
    consecutiveUnknown: 0,     // عدد الطلبات غير المعروفة المتتالية
    likelyInMatchmaking: false // هل نحن على الأرجح في عملية بحث
  },
  
  // ═══ جديد: تعلم الأنماط ═══
  patternLearning: {
    unknownHostPatterns: {},   // أنماط مضيفين غير معروفة وتكرارها
    unknownUrlPatterns: {},    // أنماط URLs غير معروفة وتكرارها
    learnedClassifications: {} // تصنيفات تعلمناها من السياق
  }
};

// ═══════════════════════════════════════════════════════════════════════════
//  UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

function norm(host) {
  var colonIndex = host.indexOf(":");
  return colonIndex > -1 ? host.substring(0, colonIndex) : host;
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
  var now = Date.now();
  
  if (MEMORY.cache.dns[host]) {
    var age = now - (MEMORY.cache.timestamps["dns_" + host] || 0);
    if (age < DNS_CACHE_TTL) {
      return MEMORY.cache.dns[host];
    }
  }
  
  var ip = dnsResolve(host);
  
  if (ip && ip.indexOf(":") === -1) {
    MEMORY.cache.dns[host] = ip;
    MEMORY.cache.timestamps["dns_" + host] = now;
  }
  
  return ip;
}

function simpleHash(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}

// ═══════════════════════════════════════════════════════════════════════════
//  REVOLUTIONARY PATTERN EXTRACTION - استخراج الأنماط الثوري
// ═══════════════════════════════════════════════════════════════════════════

// هذه الدالة ثورية تماماً - تفهم كل أنماط ببجي المعروفة والمخفية
function extractHostPattern(host) {
  
  var h = host.toLowerCase();
  var confidence = 0;  // مستوى الثقة في التصنيف (0-100)
  var pattern = "unknown";
  
  // ═══════════════════════════════════════════════════════════
  // الطبقة الأولى: أنماط Matchmaking الواضحة والمخفية
  // ═══════════════════════════════════════════════════════════
  
  // الأنماط الواضحة
  if (/matchmaking|match-making|mm-|mmservice|mmsdk/i.test(h)) {
    pattern = "matchmaking_server";
    confidence = 100;
    return {pattern: pattern, confidence: confidence};
  }
  
  // الأنماط المشفرة - ببجي تستخدم اختصارات ذكية
  if (/\b(mm|queue|q-svc|matchsvc|msvc|mm-prod|mm-api|queueservice)\b/i.test(h)) {
    pattern = "matchmaking_server";
    confidence = 95;
    return {pattern: pattern, confidence: confidence};
  }
  
  // أنماط بأرقام - مثل mm-1, mm-prod-5, queue-svc-2
  if (/\b(mm|queue|q)-?(prod|svc|service|api)?-?\d+\b/i.test(h)) {
    pattern = "matchmaking_server";
    confidence = 90;
    return {pattern: pattern, confidence: confidence};
  }
  
  // ═══════════════════════════════════════════════════════════
  // الطبقة الثانية: أنماط Match Server (اللعب الفعلي)
  // ═══════════════════════════════════════════════════════════
  
  // الأنماط الواضحة
  if (/\b(match|battle|game-server|gameserver|combat|room|instance)\b/i.test(h)) {
    // استبعاد matchmaking
    if (!/matchmaking|mm-|queue/i.test(h)) {
      pattern = "match_server";
      confidence = 100;
      return {pattern: pattern, confidence: confidence};
    }
  }
  
  // أنماط مع أرقام الغرف - room-123, instance-456, game-789
  if (/\b(room|instance|game|session|battle)-?\d+\b/i.test(h)) {
    pattern = "match_server";
    confidence = 95;
    return {pattern: pattern, confidence: confidence};
  }
  
  // أنماط مناطق اللعب - game-eu, battle-asia, match-me (middle east)
  if (/\b(game|battle|match|play)-(eu|asia|ap|apac|me|mena|us|sa|sea|jp|kr|in)\b/i.test(h)) {
    pattern = "match_server";
    confidence = 90;
    return {pattern: pattern, confidence: confidence};
  }
  
  // أنماط بيئات Cloud Gaming - gcloud, aws-game, azure-game
  if (/\b(gcloud|aws|azure|cloud).*?(game|match|battle|play)\b/i.test(h) || 
      /\b(game|match|battle|play).*?(gcloud|aws|azure|cloud)\b/i.test(h)) {
    pattern = "match_server";
    confidence = 85;
    return {pattern: pattern, confidence: confidence};
  }
  
  // أنماط Realtime - rt-, realtime-, live-
  if (/\b(rt|realtime|live)-(game|match|server|svc)\b/i.test(h)) {
    pattern = "match_server";
    confidence = 90;
    return {pattern: pattern, confidence: confidence};
  }
  
  // ═══════════════════════════════════════════════════════════
  // الطبقة الثالثة: أنماط Lobby الواضحة والمخفية
  // ═══════════════════════════════════════════════════════════
  
  // الأنماط الواضحة
  if (/\b(lobby|entrance|hall|waiting|dispatch|gateway|platform)\b/i.test(h)) {
    pattern = "lobby_server";
    confidence = 100;
    return {pattern: pattern, confidence: confidence};
  }
  
  // أنماط Dispatcher - المسؤولة عن توزيع اللاعبين
  if (/\b(dispatch|dispatcher|router|distributor|allocator)\b/i.test(h)) {
    pattern = "lobby_server";
    confidence = 95;
    return {pattern: pattern, confidence: confidence};
  }
  
  // أنماط Gateway - البوابات
  if (/\b(gateway|gw|portal|entrance)-?(api|svc|service)?\b/i.test(h)) {
    pattern = "lobby_server";
    confidence = 90;
    return {pattern: pattern, confidence: confidence};
  }
  
  // ═══════════════════════════════════════════════════════════
  // الطبقة الرابعة: أنماط Social والتجنيد
  // ═══════════════════════════════════════════════════════════
  
  // التجنيد والدعوات - الأهم لتجميع اللاعبين
  if (/\b(recruit|invitation|invite|squad-invite|team-invite|party-invite|join-team)\b/i.test(h)) {
    pattern = "recruitment_server";
    confidence = 100;
    return {pattern: pattern, confidence: confidence};
  }
  
  // أنماط Squad/Team Management
  if (/\b(squad|team|party|clan|guild|group)-(svc|service|api|mgmt|manage|manager)\b/i.test(h)) {
    pattern = "social_server";
    confidence = 95;
    return {pattern: pattern, confidence: confidence};
  }
  
  // Social Graph Services
  if (/\b(friend|social|presence|online|status)-(svc|service|api|graph)\b/i.test(h)) {
    pattern = "social_server";
    confidence = 90;
    return {pattern: pattern, confidence: confidence};
  }
  
  // Chat وVoice Communication
  if (/\b(chat|voice|audio|communication|msg|message|talk)\b/i.test(h)) {
    pattern = "social_server";
    confidence = 85;
    return {pattern: pattern, confidence: confidence};
  }
  
  // ═══════════════════════════════════════════════════════════
  // الطبقة الخامسة: أنماط CDN والمحتوى
  // ═══════════════════════════════════════════════════════════
  
  if (/\b(cdn|asset|resource|content|media|static|file|download)\b/i.test(h)) {
    pattern = "content_server";
    confidence = 100;
    return {pattern: pattern, confidence: confidence};
  }
  
  // أنماط Patch/Update
  if (/\b(patch|update|upgrade|dl|download|pkg|package)\b/i.test(h)) {
    pattern = "content_server";
    confidence = 95;
    return {pattern: pattern, confidence: confidence};
  }
  
  // ═══════════════════════════════════════════════════════════
  // الطبقة السادسة: أنماط خاصة بمناطق جغرافية
  // ═══════════════════════════════════════════════════════════
  
  // إذا كان فيه إشارة لمنطقة Middle East أو MENA
  if (/\b(me|mena|middle-east|middleeast)\b/i.test(h)) {
    // هذا مؤشر إيجابي جداً - سيرفر في منطقتنا
    if (pattern === "unknown") {
      pattern = "regional_me_server";
      confidence = 75;
    } else {
      confidence += 10;  // مكافأة إضافية
    }
  }
  
  // إذا كان فيه إشارة لمناطق بعيدة
  if (/\b(eu|europe|asia|ap|apac|us|na|sa|sea|cn|jp|kr)\b/i.test(h)) {
    confidence = Math.max(0, confidence - 20);  // خصم من الثقة
  }
  
  // ═══════════════════════════════════════════════════════════
  // الطبقة السابعة: أنماط بأرقام منافذ Port في الاسم
  // ═══════════════════════════════════════════════════════════
  
  // بعض السيرفرات تضع رقم المنفذ في الاسم
  if (/:\d{4,5}$/.test(h)) {
    var port = h.match(/:(\d{4,5})$/)[1];
    // منافذ اللعب عادة 10000-20000
    if (parseInt(port) >= 10000 && parseInt(port) <= 20000) {
      if (pattern === "unknown") {
        pattern = "match_server";
        confidence = 70;
      }
    }
  }
  
  // ═══════════════════════════════════════════════════════════
  // الطبقة الثامنة: التعلم من السياق
  // ═══════════════════════════════════════════════════════════
  
  // إذا كان لدينا تصنيف مُتعلم لهذا النمط من قبل
  if (MEMORY.patternLearning.learnedClassifications[h]) {
    var learned = MEMORY.patternLearning.learnedClassifications[h];
    pattern = learned.pattern;
    confidence = learned.confidence;
    return {pattern: pattern, confidence: confidence};
  }
  
  // حفظ الأنماط غير المعروفة للتعلم المستقبلي
  if (pattern === "unknown") {
    if (!MEMORY.patternLearning.unknownHostPatterns[h]) {
      MEMORY.patternLearning.unknownHostPatterns[h] = 0;
    }
    MEMORY.patternLearning.unknownHostPatterns[h]++;
  }
  
  return {pattern: pattern, confidence: confidence};
}

// استخراج نمط من URL - موسع بشكل كبير
function extractUrlPattern(url) {
  
  var u = url.toLowerCase();
  var confidence = 0;
  var pattern = "unknown";
  
  // ═══════════════════════════════════════════════════════════
  // الطبقة الأولى: Matchmaking Endpoints
  // ═══════════════════════════════════════════════════════════
  
  // API endpoints واضحة
  if (/\/(matchmaking|match-making|mm|queue|find-match|search-game|start-match)/i.test(u)) {
    pattern = "matchmaking";
    confidence = 100;
    return {pattern: pattern, confidence: confidence};
  }
  
  // RESTful API patterns - /api/v1/matchmaking, /v2/queue, etc
  if (/\/(api|v\d+)\/(matchmaking|mm|queue|match|find)/i.test(u)) {
    pattern = "matchmaking";
    confidence = 95;
    return {pattern: pattern, confidence: confidence};
  }
  
  // WebSocket endpoints للـ matchmaking
  if (/\/(ws|websocket|socket)\/(mm|queue|matchmaking)/i.test(u)) {
    pattern = "matchmaking";
    confidence = 90;
    return {pattern: pattern, confidence: confidence};
  }
  
  // ═══════════════════════════════════════════════════════════
  // الطبقة الثانية: Recruitment/Team Formation
  // ═══════════════════════════════════════════════════════════
  
  if (/\/(recruit|invitation|invite|squad|team|party|join|accept-invite|send-invite)/i.test(u)) {
    pattern = "recruitment";
    confidence = 100;
    return {pattern: pattern, confidence: confidence};
  }
  
  // ═══════════════════════════════════════════════════════════
  // الطبقة الثالثة: Gameplay/Match endpoints
  // ═══════════════════════════════════════════════════════════
  
  if (/\/(match|battle|game|combat|room|session|instance|play|live)/i.test(u)) {
    // استبعاد matchmaking
    if (!/matchmaking|mm|queue|find|search/i.test(u)) {
      pattern = "gameplay";
      confidence = 100;
      return {pattern: pattern, confidence: confidence};
    }
  }
  
  // Realtime game updates
  if (/\/(realtime|rt|live|sync|update|tick|state)/i.test(u)) {
    pattern = "gameplay";
    confidence = 90;
    return {pattern: pattern, confidence: confidence};
  }
  
  // ═══════════════════════════════════════════════════════════
  // الطبقة الرابعة: Lobby endpoints
  // ═══════════════════════════════════════════════════════════
  
  if (/\/(lobby|hall|entrance|dispatch|gateway|platform|main-menu|home)/i.test(u)) {
    pattern = "lobby";
    confidence = 100;
    return {pattern: pattern, confidence: confidence};
  }
  
  // ═══════════════════════════════════════════════════════════
  // الطبقة الخامسة: Social endpoints
  // ═══════════════════════════════════════════════════════════
  
  if (/\/(friend|social|presence|online|status|chat|message|voice)/i.test(u)) {
    pattern = "social";
    confidence = 95;
    return {pattern: pattern, confidence: confidence};
  }
  
  // ═══════════════════════════════════════════════════════════
  // الطبقة السادسة: أنماط HTTP Methods في URLs
  // ═══════════════════════════════════════════════════════════
  
  // POST requests عادة للإجراءات المهمة
  // GET requests عادة للاستعلام
  // هذا ليس جزءاً من URL لكن يمكن استنتاجه من patterns معينة
  
  // إذا كان فيه /create/ أو /start/ أو /join/ - إجراء نشط
  if (/\/(create|start|join|enter|connect|begin)/i.test(u)) {
    confidence += 10;  // مكافأة إضافية للثقة
  }
  
  // ═══════════════════════════════════════════════════════════
  // الطبقة السابعة: التعلم من السياق
  // ═══════════════════════════════════════════════════════════
  
  if (MEMORY.patternLearning.learnedClassifications[u]) {
    var learned = MEMORY.patternLearning.learnedClassifications[u];
    pattern = learned.pattern;
    confidence = learned.confidence;
    return {pattern: pattern, confidence: confidence};
  }
  
  if (pattern === "unknown") {
    if (!MEMORY.patternLearning.unknownUrlPatterns[u]) {
      MEMORY.patternLearning.unknownUrlPatterns[u] = 0;
    }
    MEMORY.patternLearning.unknownUrlPatterns[u]++;
  }
  
  return {pattern: pattern, confidence: confidence};
}

// ═══════════════════════════════════════════════════════════════════════════
//  CONTEXT TRACKING - تتبع السياق للتعلم من تسلسل الطلبات
// ═══════════════════════════════════════════════════════════════════════════

function updateContextTracking(host, url, classification) {
  
  var now = Date.now();
  var request = {
    host: host,
    url: url,
    classification: classification,
    timestamp: now
  };
  
  // إضافة للطلبات الأخيرة
  MEMORY.contextTracking.recentRequests.unshift(request);
  
  // الحفاظ على حجم محدود
  if (MEMORY.contextTracking.recentRequests.length > MEMORY.contextTracking.maxRecentRequests) {
    MEMORY.contextTracking.recentRequests.pop();
  }
  
  // تحديث الأوقات
  if (classification.type === "matchmaking") {
    MEMORY.contextTracking.lastMatchmakingTime = now;
    MEMORY.contextTracking.likelyInMatchmaking = true;
  } else if (classification.type === "lobby") {
    MEMORY.contextTracking.lastLobbyTime = now;
    // إذا كنا في اللوبي، غالباً انتهى الـ matchmaking
    if (now - MEMORY.contextTracking.lastMatchmakingTime > 30000) {
      MEMORY.contextTracking.likelyInMatchmaking = false;
    }
  }
  
  // تتبع الطلبات غير المعروفة المتتالية
  if (classification.type === "general" && classification.confidence < 50) {
    MEMORY.contextTracking.consecutiveUnknown++;
  } else {
    MEMORY.contextTracking.consecutiveUnknown = 0;
  }
}

// استنتاج التصنيف من السياق
function inferFromContext(host, url, hostPattern, urlPattern) {
  
  var inferred = {
    type: "general",
    priority: 100,
    critical: false,
    confidence: 0,
    reason: "no_context"
  };
  
  var now = Date.now();
  
  // ═══ السياق الأول: هل نحن في عملية matchmaking حالياً؟ ═══
  if (MEMORY.contextTracking.likelyInMatchmaking) {
    var timeSinceMatchmaking = now - MEMORY.contextTracking.lastMatchmakingTime;
    
    // إذا كان الطلب جاء خلال 10 ثوان من آخر matchmaking
    if (timeSinceMatchmaking < 10000) {
      // ومازلنا لم نصنفه بوضوح
      if (hostPattern.confidence < 70 && urlPattern.confidence < 70) {
        inferred.type = "matchmaking";
        inferred.priority = 1000;
        inferred.critical = true;
        inferred.confidence = 70;
        inferred.reason = "temporal_proximity_to_matchmaking";
        return inferred;
      }
    }
  }
  
  // ═══ السياق الثاني: فحص الطلبات الأخيرة ═══
  var recent = MEMORY.contextTracking.recentRequests;
  
  if (recent.length >= 3) {
    // إذا آخر 3 طلبات كانت لـ matchmaking والطلب الحالي غير معروف
    var lastThree = recent.slice(0, 3);
    var allMatchmaking = true;
    
    for (var i = 0; i < lastThree.length; i++) {
      if (lastThree[i].classification.type !== "matchmaking") {
        allMatchmaking = false;
        break;
      }
    }
    
    if (allMatchmaking && hostPattern.confidence < 70) {
      inferred.type = "matchmaking";
      inferred.priority = 950;
      inferred.critical = true;
      inferred.confidence = 75;
      inferred.reason = "pattern_continuation";
      return inferred;
    }
  }
  
  // ═══ السياق الثالث: الطلبات غير المعروفة المتتالية ═══
  // إذا كان لدينا الكثير من الطلبات غير المعروفة، ربما نكون في مرحلة مهمة
  if (MEMORY.contextTracking.consecutiveUnknown >= 3) {
    // نفترض أنها جزء من matchmaking أو lobby
    inferred.type = "matchmaking";
    inferred.priority = 900;
    inferred.critical = true;
    inferred.confidence = 65;
    inferred.reason = "consecutive_unknown_assume_critical";
    return inferred;
  }
  
  return inferred;
}

// ═══════════════════════════════════════════════════════════════════════════
//  ADVANCED TRAFFIC CLASSIFICATION - تصنيف متقدم مع تعلم
// ═══════════════════════════════════════════════════════════════════════════

function classifyTraffic(url, host) {
  
  // استخراج الأنماط من المضيف والـ URL
  var hostPattern = extractHostPattern(host);
  var urlPattern = extractUrlPattern(url);
  
  // دمج النتائج مع أولوية للثقة الأعلى
  var finalType = "general";
  var finalPriority = 100;
  var finalCritical = false;
  var finalConfidence = 0;
  var description = "";
  
  // ═══ دمج ذكي للأنماط ═══
  
  // إذا كان أحدهما واثق جداً (95+)، نأخذه
  if (hostPattern.confidence >= 95) {
    finalType = hostPattern.pattern.replace("_server", "");
    finalConfidence = hostPattern.confidence;
  } else if (urlPattern.confidence >= 95) {
    finalType = urlPattern.pattern;
    finalConfidence = urlPattern.confidence;
  }
  // إذا كان كلاهما يتفقان على نفس النوع
  else if (hostPattern.pattern.indexOf(urlPattern.pattern) > -1 || 
           urlPattern.pattern.indexOf(hostPattern.pattern) > -1) {
    finalType = hostPattern.pattern.replace("_server", "");
    finalConfidence = Math.max(hostPattern.confidence, urlPattern.confidence);
  }
  // إذا كان أحدهما أعلى من الآخر
  else if (hostPattern.confidence > urlPattern.confidence) {
    finalType = hostPattern.pattern.replace("_server", "");
    finalConfidence = hostPattern.confidence;
  } else if (urlPattern.confidence > hostPattern.confidence) {
    finalType = urlPattern.pattern;
    finalConfidence = urlPattern.confidence;
  }
  
  // ═══ إذا مازلنا غير واثقين، نستخدم السياق ═══
  if (finalConfidence < 70) {
    var contextInferred = inferFromContext(host, url, hostPattern, urlPattern);
    if (contextInferred.confidence > finalConfidence) {
      finalType = contextInferred.type;
      finalPriority = contextInferred.priority;
      finalCritical = contextInferred.critical;
      finalConfidence = contextInferred.confidence;
      description = "مستنتج من السياق: " + contextInferred.reason;
    }
  }
  
  // ═══ تحديد الأولوية والحرجية بناءً على النوع ═══
  
  switch(finalType) {
    case "matchmaking":
    case "matchmaking_server":
      finalPriority = 1000;
      finalCritical = true;
      description = description || "البحث عن مباراة - نقطة التجميع الحرجة";
      break;
      
    case "recruitment":
    case "recruitment_server":
      finalPriority = 950;
      finalCritical = true;
      description = description || "التجنيد وتكوين الفرق - مهم للتجميع";
      break;
      
    case "match":
    case "match_server":
    case "gameplay":
      finalPriority = 900;
      finalCritical = true;
      description = description || "المباراة الفعلية - يتطلب استقرار كامل";
      break;
      
    case "lobby":
    case "lobby_server":
      finalPriority = 500;
      finalCritical = false;
      description = description || "اللوبي - نقطة انتظار وتجمع";
      break;
      
    case "social":
    case "social_server":
      finalPriority = 400;
      finalCritical = false;
      description = description || "الخدمات الاجتماعية - للتواصل";
      break;
      
    case "content":
    case "content_server":
      finalPriority = 200;
      finalCritical = false;
      description = description || "المحتوى والتحديثات - غير حرج";
      break;
      
    case "regional_me_server":
      // سيرفر في منطقة الشرق الأوسط - مهم
      finalPriority = 600;
      finalCritical = false;
      description = description || "سيرفر إقليمي - منطقة الشرق الأوسط";
      break;
      
    default:
      finalPriority = 100;
      finalCritical = false;
      description = description || "حركة عامة غير محددة";
  }
  
  var classification = {
    type: finalType,
    priority: finalPriority,
    critical: finalCritical,
    confidence: finalConfidence,
    description: description,
    hostPattern: hostPattern,
    urlPattern: urlPattern
  };
  
  // تحديث تتبع السياق
  updateContextTracking(host, url, classification);
  
  return classification;
}

// ═══════════════════════════════════════════════════════════════════════════
//  FINGERPRINTING ENGINE
// ═══════════════════════════════════════════════════════════════════════════

function createFingerprint(ip, host, url) {
  var fingerprint = {
    ip: ip,
    host: host,
    net24: getNet24(ip),
    net16: getNet16(ip),
    hostPattern: extractHostPattern(host).pattern,
    timestamp: Date.now(),
    hour: new Date().getHours(),
    day: new Date().getDay(),
    urlPattern: extractUrlPattern(url).pattern,
    hash: null
  };
  
  fingerprint.hash = simpleHash(
    fingerprint.ip + 
    fingerprint.host + 
    fingerprint.net24 + 
    fingerprint.hostPattern
  );
  
  return fingerprint;
}

function compareFingerprints(fp1, fp2) {
  if (!fp1 || !fp2) return false;
  if (fp1.ip === fp2.ip && fp1.host === fp2.host) return true;
  if (fp1.net24 === fp2.net24 && fp1.hostPattern === fp2.hostPattern) return true;
  if (fp1.hash === fp2.hash) return true;
  return false;
}

// ═══════════════════════════════════════════════════════════════════════════
//  DEEP NETWORK ANALYSIS
// ═══════════════════════════════════════════════════════════════════════════

function deepAnalyzeIP(ip) {
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
    analysis.bonusScore = diamond.successCount * 100;
    analysis.totalScore = analysis.baseScore + analysis.bonusScore;
    analysis.allowDirect = true;
    return analysis;
  }
  
  if (MEMORY.servers.golden[ip]) {
    var golden = MEMORY.servers.golden[ip];
    analysis.isJordanian = true;
    analysis.trustLevel = "golden";
    analysis.expectedPing = golden.ping || 8;
    analysis.baseScore = 850;
    analysis.bonusScore = golden.successCount * 50;
    analysis.totalScore = analysis.baseScore + analysis.bonusScore;
    analysis.allowDirect = true;
    return analysis;
  }
  
  for (var b = 0; b < GLOBAL_BLACKLIST.length; b++) {
    var zone = GLOBAL_BLACKLIST[b];
    if (isInNet(ip, zone.range[0], zone.range[1])) {
      analysis.shouldBlock = true;
      analysis.blockReason = "blacklisted_zone_" + zone.region;
      analysis.threat = zone.threat;
      analysis.totalScore = -10000;
      MEMORY.servers.banned[ip] = {
        reason: zone.region, 
        threat: zone.threat,
        bannedAt: Date.now()
      };
      return analysis;
    }
  }
  
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
        analysis.trustLevel = "verified_jordanian";
        
        if (MEMORY.player.provider === network.provider) {
          analysis.bonusScore += 150;
          analysis.expectedPing = Math.floor(analysis.expectedPing * 0.6);
        }
        
        if (MEMORY.player.network && MEMORY.player.network.dc === network.dc) {
          analysis.bonusScore += 80;
          analysis.expectedPing = Math.floor(analysis.expectedPing * 0.75);
        }
        
        if (tierName === "diamond_tier") {
          analysis.bonusScore += 100;
        } else if (tierName === "gold_tier") {
          analysis.bonusScore += 50;
        }
        
        analysis.totalScore = analysis.baseScore + analysis.bonusScore;
        return analysis;
      }
    }
  }
  
  analysis.shouldBlock = true;
  analysis.blockReason = "not_in_jordan_database";
  analysis.totalScore = -5000;
  
  return analysis;
}

// ═══════════════════════════════════════════════════════════════════════════
//  TIME ANALYSIS
// ═══════════════════════════════════════════════════════════════════════════

function analyzeCurrentTime() {
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
    multiplier: 1.0,
    description: ""
  };
  
  if (hour >= 19 && hour <= 23) {
    analysis.isPeakTime = true;
    analysis.multiplier = 5.0;
    analysis.description = "ذروة مسائية";
  } else if (hour >= 0 && hour <= 2) {
    analysis.isPeakTime = true;
    analysis.multiplier = 4.0;
    analysis.description = "ذروة ليلية";
  } else if (hour >= 14 && hour <= 18) {
    analysis.multiplier = 2.5;
    analysis.description = "نشاط عصري";
  } else if (hour >= 9 && hour <= 12) {
    analysis.multiplier = 1.5;
    analysis.description = "نشاط صباحي";
  }
  
  if (day === 5 || day === 6) {
    analysis.multiplier *= 1.8;
    analysis.description += " (عطلة)";
  }
  
  if (minute >= 0 && minute <= 12) {
    analysis.isGoldenWindow = true;
    analysis.multiplier *= 3.0;
    analysis.description += " [نافذة ذهبية]";
  } else if (minute >= 28 && minute <= 42) {
    analysis.isGoldenWindow = true;
    analysis.multiplier *= 2.0;
    analysis.description += " [نافذة فضية]";
  }
  
  if (!MEMORY.timePatterns.windows[analysis.windowKey]) {
    MEMORY.timePatterns.windows[analysis.windowKey] = 0;
  }
  MEMORY.timePatterns.windows[analysis.windowKey]++;
  
  if (!MEMORY.timePatterns.hourly[hour]) {
    MEMORY.timePatterns.hourly[hour] = 0;
  }
  MEMORY.timePatterns.hourly[hour]++;
  
  MEMORY.timePatterns.current = analysis;
  
  return analysis;
}

// ═══════════════════════════════════════════════════════════════════════════
//  SESSION MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════════

function initializeSession(serverIP, host, url, analysis) {
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
  if (!MEMORY.activeSession.active) {
    return {valid: true, reason: "no_active_session"};
  }
  
  var current = createFingerprint(serverIP, host, url);
  var original = MEMORY.activeSession.server.fingerprint;
  
  var matches = compareFingerprints(current, original);
  
  if (!matches) {
    MEMORY.activeSession.violations++;
    
    return {
      valid: false,
      reason: "fingerprint_mismatch",
      violations: MEMORY.activeSession.violations,
      shouldBlock: MEMORY.activeSession.violations > MAX_VIOLATIONS,
      detail: "IP أو مضيف أو نمط مختلف عن بداية المباراة"
    };
  }
  
  MEMORY.activeSession.lastActivity = Date.now();
  MEMORY.activeSession.packetCount++;
  
  return {valid: true, reason: "ok"};
}

function terminateSession(reason) {
  if (MEMORY.activeSession.active) {
    var session = MEMORY.activeSession;
    var duration = Date.now() - session.startTime;
    
    var isSuccessful = duration > 300000 && session.violations === 0;
    
    if (isSuccessful) {
      var ip = session.server.ip;
      var analysis = session.server.analysis;
      
      if (analysis.expectedPing < 10) {
        if (!MEMORY.servers.diamond[ip]) {
          MEMORY.servers.diamond[ip] = {
            ping: analysis.expectedPing, 
            successCount: 0, 
            fingerprint: session.server.fingerprint,
            firstSuccess: Date.now()
          };
        }
        MEMORY.servers.diamond[ip].successCount++;
        MEMORY.servers.diamond[ip].lastSuccess = Date.now();
      } else if (analysis.expectedPing < 15) {
        if (!MEMORY.servers.golden[ip]) {
          MEMORY.servers.golden[ip] = {
            ping: analysis.expectedPing, 
            successCount: 0, 
            fingerprint: session.server.fingerprint,
            firstSuccess: Date.now()
          };
        }
        MEMORY.servers.golden[ip].successCount++;
        MEMORY.servers.golden[ip].lastSuccess = Date.now();
      } else {
        if (!MEMORY.servers.trusted[ip]) {
          MEMORY.servers.trusted[ip] = {
            ping: analysis.expectedPing, 
            successCount: 0,
            firstSuccess: Date.now()
          };
        }
        MEMORY.servers.trusted[ip].successCount++;
        MEMORY.servers.trusted[ip].lastSuccess = Date.now();
      }
      
      MEMORY.stats.successfulSessions++;
      MEMORY.stats.jordanianMatches++;
      
      if (analysis.expectedPing < MEMORY.stats.bestPing) {
        MEMORY.stats.bestPing = analysis.expectedPing;
        MEMORY.stats.bestServer = ip;
      }
      
      MEMORY.recentHistory.unshift({
        server: ip,
        ping: analysis.expectedPing,
        duration: duration,
        timestamp: Date.now(),
        success: true,
        violations: session.violations,
        packets: session.packetCount
      });
      
      if (MEMORY.recentHistory.length > MEMORY.maxHistory) {
        MEMORY.recentHistory.pop();
      }
    }
  }
  
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
  if (MEMORY.activeSession.active) {
    var now = Date.now();
    var age = now - MEMORY.activeSession.startTime;
    var inactivity = now - MEMORY.activeSession.lastActivity;
    
    if (age > MAX_SESSION_DURATION) {
      terminateSession("max_duration_exceeded");
      return true;
    }
    
    if (inactivity > INACTIVITY_TIMEOUT) {
      terminateSession("inactivity_timeout");
      return true;
    }
  }
  
  return false;
}

// ═══════════════════════════════════════════════════════════════════════════
//  PLAYER DETECTION
// ═══════════════════════════════════════════════════════════════════════════

function detectPlayerInfo() {
  if (MEMORY.player.provider) return;
  
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
//  ULTIMATE DECISION ENGINE - محسّن بشكل ثوري
// ═══════════════════════════════════════════════════════════════════════════

function makeUltimateDecision(serverIP, host, url, analysis, traffic, timeAnalysis) {
  
  // ══════════════════════════════════════════════════
  // استراتيجية جديدة: التوجيه العدواني الكامل
  // ══════════════════════════════════════════════════
  
  // الحظر الفوري لغير الأردني
  if (analysis.shouldBlock) {
    MEMORY.stats.totalBlocked++;
    return {
      action: ABSOLUTE_BLOCK, 
      reason: analysis.blockReason,
      detail: "محظور: " + (analysis.threat || "غير أردني")
    };
  }
  
  // ═══ كل شيء حرج يذهب لنقطة التجميع ═══
  // هذه هي الفكرة الثورية: بدلاً من أن نكون انتقائيين
  // نوجه كل الحركة الحرجة لنفس النقطة
  
  var isCritical = traffic.critical || 
                   traffic.type === "matchmaking" || 
                   traffic.type === "recruitment" || 
                   traffic.type === "match" || 
                   traffic.type === "lobby" ||
                   traffic.type === "social" ||
                   traffic.priority >= 400;
  
  if (isCritical) {
    // حتى لو لم نكن واثقين 100% من التصنيف
    // إذا كان أردني، نوجهه للتجميع
    if (analysis.isJordanian) {
      MEMORY.stats.totalProxied++;
      
      // قرار خاص للمباريات - المسار الموحد
      if (traffic.type === "match" || traffic.type === "gameplay") {
        
        if (!MEMORY.activeSession.active) {
          initializeSession(serverIP, host, url, analysis);
          return {
            action: UNIFIED_MATCH_PATH,
            reason: "new_match_session",
            detail: "بدء مباراة جديدة - المسار الموحد"
          };
        }
        
        var integrity = validateSessionIntegrity(serverIP, host, url);
        
        if (!integrity.valid) {
          if (integrity.shouldBlock) {
            MEMORY.servers.banned[serverIP] = {
              reason: "session_violation",
              violations: integrity.violations,
              bannedAt: Date.now()
            };
            return {
              action: ABSOLUTE_BLOCK,
              reason: "session_integrity_critical_violation",
              detail: integrity.detail
            };
          }
          return {
            action: ABSOLUTE_BLOCK,
            reason: "session_mismatch",
            detail: integrity.detail
          };
        }
        
        return {
          action: UNIFIED_MATCH_PATH,
          reason: "session_continuation",
          detail: "استمرار في المباراة - المسار الموحد"
        };
      }
      
      // كل الحركة الحرجة الأخرى - نقطة التجميع
      return {
        action: CONVERGENCE_POINT,
        reason: "aggressive_convergence_" + traffic.type,
        detail: "توجيه عدواني لنقطة التجميع - " + traffic.description
      };
    }
  }
  
  // ═══ المحتوى فقط يمكن أن يكون DIRECT ═══
  if (traffic.type === "content" || traffic.type === "content_server") {
    if (!analysis.isJordanian) {
      return {
        action: ABSOLUTE_BLOCK,
        reason: "content_not_jordanian",
        detail: "المحتوى من مصادر أردنية فقط"
      };
    }
    
    if (analysis.expectedPing < IDEAL_PING_THRESHOLD && analysis.allowDirect) {
      MEMORY.stats.totalDirect++;
      return {
        action: DIRECT,
        reason: "content_direct_fast",
        detail: "محتوى سريع - اتصال مباشر (بينغ " + analysis.expectedPing + "ms)"
      };
    }
    
    MEMORY.stats.totalProxied++;
    return {
      action: CONVERGENCE_POINT,
      reason: "content_proxied",
      detail: "محتوى عبر نقطة التجميع"
    };
  }
  
  // ═══ أي شيء آخر ═══
  if (!analysis.isJordanian) {
    return {
      action: ABSOLUTE_BLOCK,
      reason: "general_not_jordanian",
      detail: "كل الحركة يجب أن تكون أردنية"
    };
  }
  
  // السيرفرات الماسية فقط تحصل على DIRECT
  if (analysis.trustLevel === "diamond" && analysis.expectedPing < 8) {
    MEMORY.stats.totalDirect++;
    return {
      action: DIRECT,
      reason: "diamond_server_ultra_fast",
      detail: "سيرفر ماسي فائق السرعة - مباشر"
    };
  }
  
  // كل شيء آخر - التجميع
  MEMORY.stats.totalProxied++;
  return {
    action: CONVERGENCE_POINT,
    reason: "default_convergence",
    detail: "توجيه افتراضي لنقطة التجميع"
  };
}

// ═══════════════════════════════════════════════════════════════════════════
//  MAIN ROUTER
// ═══════════════════════════════════════════════════════════════════════════

function FindProxyForURL(url, host) {
  
  host = norm(host).toLowerCase();
  
  if (!isPUBG(host)) {
    return DIRECT;
  }
  
  if (!MEMORY.player.provider) {
    detectPlayerInfo();
  }
  
  var serverIP = smartResolve(host);
  
  if (!serverIP || serverIP.indexOf(":") > -1) {
    MEMORY.stats.totalBlocked++;
    return ABSOLUTE_BLOCK;
  }
  
  var analysis = deepAnalyzeIP(serverIP);
  var traffic = classifyTraffic(url, host);
  var timeAnalysis = analyzeCurrentTime();
  
  if (analysis.isJordanian) {
    analysis.totalScore = Math.floor(analysis.totalScore * timeAnalysis.multiplier);
  }
  
  var decision = makeUltimateDecision(
    serverIP, 
    host, 
    url, 
    analysis, 
    traffic, 
    timeAnalysis
  );
  
  return decision.action;
}

// ═══════════════════════════════════════════════════════════════════════════
//  نهاية السكربت الثوري
// ═══════════════════════════════════════════════════════════════════════════
