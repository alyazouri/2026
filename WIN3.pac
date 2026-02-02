// ═══════════════════════════════════════════════════════════════════════════
//  PUBG JORDAN ULTRA AGGRESSIVE SCRIPT
//  السكربت العدواني المتطرف - إصرار كامل على اللاعبين الأردنيين
// ═══════════════════════════════════════════════════════════════════════════
//
//  الاستراتيجية الجديدة:
//  ──────────────────────
//  1. الرفض المتكرر: نرفض أول 3 محاولات لإجبار اللعبة على البحث أعمق
//  2. معايير صارمة قصوى: نقبل فقط السيرفرات الماسية المثالية
//  3. التحديث الدوري: نغير القرار كل 3 ثوان للتجنيد والأصدقاء
//  4. الذاكرة المؤقتة القصيرة: ننسى القرارات القديمة سريعاً
//
//  النتيجة المتوقعة:
//  ──────────────────
//  - مباريات أردنية 100% بعد 4 محاولات
//  - تحديث مستمر لقوائم اللاعبين والأصدقاء
//  - إجبار اللعبة على البحث حتى تجد السيرفرات الأفضل
//
// ═══════════════════════════════════════════════════════════════════════════

var CONVERGENCE_POINT = "PROXY 46.185.131.218:9443";
var UNIFIED_MATCH_PATH = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK = "PROXY 127.0.0.1:9";

// معايير صارمة للغاية
var ABSOLUTE_MAX_PING = 12;        // فقط 12ms أو أقل
var PERFECT_PING = 7;              // الهدف المثالي
var MIN_ATTEMPTS_BEFORE_ACCEPT = 4; // عدد المحاولات المطلوبة

// التحديث الدوري
var REFRESH_INTERVAL = 3000;       // 3 ثوان بالميلي ثانية

// ═══════════════════════════════════════════════════════════════════════════
//  قواعد البيانات الأساسية
// ═══════════════════════════════════════════════════════════════════════════

var GOLDEN_SERVERS = {
  "46.185.131.50": {ping: 5, quality: "perfect"},
  "46.185.131.51": {ping: 6, quality: "perfect"},
  "149.200.200.10": {ping: 6, quality: "perfect"},
  "212.35.66.20": {ping: 7, quality: "excellent"}
};

var JORDAN_NETWORKS_DB = {
  diamond_tier: [
    {range: ["46.185.131.0", "255.255.255.0"], provider: "zain", ping: 5, score: 1000},
    {range: ["46.185.140.0", "255.255.252.0"], provider: "zain", ping: 5, score: 1000},
    {range: ["149.200.200.0", "255.255.252.0"], provider: "orange", ping: 6, score: 985},
    {range: ["212.35.66.0", "255.255.254.0"], provider: "orange", ping: 6, score: 980},
    {range: ["77.245.224.0", "255.255.240.0"], provider: "umniah", ping: 7, score: 970}
  ],
  
  gold_tier: [
    {range: ["46.185.128.0", "255.255.128.0"], provider: "zain", ping: 8, score: 920},
    {range: ["46.185.0.0", "255.255.0.0"], provider: "zain", ping: 9, score: 910},
    {range: ["149.200.128.0", "255.255.128.0"], provider: "orange", ping: 8, score: 915},
    {range: ["149.200.0.0", "255.255.0.0"], provider: "orange", ping: 9, score: 905},
    {range: ["77.245.0.0", "255.255.224.0"], provider: "umniah", ping: 9, score: 910}
  ]
};

var GLOBAL_BLACKLIST = [
  {range: ["78.160.0.0", "255.224.0.0"], region: "turkey"},
  {range: ["88.240.0.0", "255.240.0.0"], region: "turkey"},
  {range: ["5.0.0.0", "252.0.0.0"], region: "europe"},
  {range: ["1.0.0.0", "255.0.0.0"], region: "asia"}
];

// ═══════════════════════════════════════════════════════════════════════════
//  نظام الذاكرة الموسع - مع تتبع المحاولات
// ═══════════════════════════════════════════════════════════════════════════

var MEMORY = {
  player: {
    ip: null,
    provider: null
  },
  
  servers: {
    perfect: {},      // السيرفرات المثالية
    banned: {}        // المحظورة
  },
  
  // تتبع محاولات البحث عن مباراة
  matchmaking: {
    isActive: false,              // هل نحن في عملية بحث نشطة
    startTime: 0,                 // وقت بدء البحث
    attemptCount: 0,              // عدد المحاولات حتى الآن
    rejectedServers: [],          // السيرفرات المرفوضة
    lastAcceptedServer: null      // آخر سيرفر تم قبوله
  },
  
  // تتبع التجنيد والأصدقاء
  recruitment: {
    lastRefreshTime: 0,           // آخر وقت تحديث
    refreshCount: 0,              // عدد مرات التحديث
    activeRequests: {}            // الطلبات النشطة
  },
  
  session: {
    active: false,
    server: null,
    startTime: null
  },
  
  cache: {
    dns: {},
    timestamps: {}
  }
};

// ═══════════════════════════════════════════════════════════════════════════
//  دوال مساعدة
// ═══════════════════════════════════════════════════════════════════════════

function norm(h) {
  var i = h.indexOf(":");
  return i > -1 ? h.substring(0, i) : h;
}

function isPUBG(h) {
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite/i.test(h);
}

function smartResolve(host) {
  var now = Date.now();
  
  if (MEMORY.cache.dns[host]) {
    var age = now - (MEMORY.cache.timestamps[host] || 0);
    if (age < 60000) return MEMORY.cache.dns[host];
  }
  
  var ip = dnsResolve(host);
  
  if (ip && ip.indexOf(":") === -1) {
    MEMORY.cache.dns[host] = ip;
    MEMORY.cache.timestamps[host] = now;
  }
  
  return ip;
}

// ═══════════════════════════════════════════════════════════════════════════
//  نظام التصنيف المحسّن
// ═══════════════════════════════════════════════════════════════════════════

function classifyTraffic(url, host) {
  var combined = (url + host).toLowerCase();
  
  // Matchmaking - أعلى أولوية
  if (/matchmaking|match-making|mm-|mmsdk|queue|q-svc|find-match|search-game|start-match/.test(combined)) {
    return {type: "matchmaking", priority: 1000, critical: true};
  }
  
  // Recruitment والأصدقاء - أولوية عالية مع تحديث دوري
  if (/recruit|invitation|invite|squad|team|party|friend|social|presence/.test(combined)) {
    return {type: "recruitment", priority: 950, critical: true, needsRefresh: true};
  }
  
  // Match
  if (/\b(match|battle|game-server|combat|room|instance)\b/.test(combined)) {
    if (!/matchmaking|queue/.test(combined)) {
      return {type: "match", priority: 900, critical: true};
    }
  }
  
  // Lobby
  if (/lobby|hall|entrance|dispatch|gateway/.test(combined)) {
    return {type: "lobby", priority: 800, critical: true};
  }
  
  // Content
  if (/cdn|asset|resource|content/.test(combined)) {
    return {type: "content", priority: 200, critical: false};
  }
  
  return {type: "general", priority: 500, critical: false};
}

// ═══════════════════════════════════════════════════════════════════════════
//  تحليل الشبكة
// ═══════════════════════════════════════════════════════════════════════════

function analyzeIP(ip) {
  var analysis = {
    ip: ip,
    isJordanian: false,
    isPerfect: false,
    ping: 999,
    score: 0,
    tier: null,
    block: false
  };
  
  // فحص السيرفرات المثالية المعروفة
  if (GOLDEN_SERVERS[ip]) {
    analysis.isJordanian = true;
    analysis.isPerfect = true;
    analysis.ping = GOLDEN_SERVERS[ip].ping;
    analysis.score = 2000;
    analysis.tier = "perfect";
    return analysis;
  }
  
  // فحص المحظورين
  if (MEMORY.servers.banned[ip]) {
    analysis.block = true;
    return analysis;
  }
  
  // فحص القائمة السوداء
  for (var b = 0; b < GLOBAL_BLACKLIST.length; b++) {
    if (isInNet(ip, GLOBAL_BLACKLIST[b].range[0], GLOBAL_BLACKLIST[b].range[1])) {
      analysis.block = true;
      MEMORY.servers.banned[ip] = true;
      return analysis;
    }
  }
  
  // فحص الشبكات الأردنية
  for (var tierName in JORDAN_NETWORKS_DB) {
    var tier = JORDAN_NETWORKS_DB[tierName];
    for (var n = 0; n < tier.length; n++) {
      var net = tier[n];
      if (isInNet(ip, net.range[0], net.range[1])) {
        analysis.isJordanian = true;
        analysis.ping = net.ping;
        analysis.score = net.score;
        analysis.tier = tierName;
        
        if (net.ping <= PERFECT_PING) {
          analysis.isPerfect = true;
        }
        
        return analysis;
      }
    }
  }
  
  // غير أردني
  analysis.block = true;
  return analysis;
}

// ═══════════════════════════════════════════════════════════════════════════
//  نظام الرفض المتكرر للـ Matchmaking
// ═══════════════════════════════════════════════════════════════════════════

function handleMatchmaking(ip, analysis) {
  var now = Date.now();
  
  // بداية جلسة بحث جديدة
  if (!MEMORY.matchmaking.isActive) {
    MEMORY.matchmaking.isActive = true;
    MEMORY.matchmaking.startTime = now;
    MEMORY.matchmaking.attemptCount = 0;
    MEMORY.matchmaking.rejectedServers = [];
  }
  
  // إعادة تعيين إذا مرت 60 ثانية
  var searchDuration = now - MEMORY.matchmaking.startTime;
  if (searchDuration > 60000) {
    MEMORY.matchmaking.isActive = false;
    MEMORY.matchmaking.attemptCount = 0;
    MEMORY.matchmaking.rejectedServers = [];
  }
  
  // زيادة عداد المحاولات
  MEMORY.matchmaking.attemptCount++;
  
  // ═══ الاستراتيجية: رفض أول 3 محاولات ═══
  
  // إذا كانت هذه أول 3 محاولات ولم نصل للسيرفر المثالي - نرفض
  if (MEMORY.matchmaking.attemptCount < MIN_ATTEMPTS_BEFORE_ACCEPT) {
    
    // حتى لو كان أردني، نرفضه إذا لم يكن مثالياً
    if (!analysis.isPerfect) {
      MEMORY.matchmaking.rejectedServers.push(ip);
      return {
        action: BLOCK,
        reason: "forcing_retry_" + MEMORY.matchmaking.attemptCount,
        detail: "رفض المحاولة رقم " + MEMORY.matchmaking.attemptCount + " - نبحث عن سيرفر أفضل"
      };
    }
    
    // إذا كان مثالياً في المحاولات الأولى - نقبله فوراً
    MEMORY.matchmaking.lastAcceptedServer = ip;
    MEMORY.matchmaking.isActive = false;
    return {
      action: CONVERGENCE_POINT,
      reason: "perfect_server_found_early",
      detail: "سيرفر مثالي في المحاولة " + MEMORY.matchmaking.attemptCount
    };
  }
  
  // ═══ بعد 4 محاولات أو أكثر ═══
  
  // نقبل أي سيرفر أردني بينغ مقبول
  if (analysis.isJordanian && analysis.ping <= ABSOLUTE_MAX_PING) {
    MEMORY.matchmaking.lastAcceptedServer = ip;
    MEMORY.matchmaking.isActive = false;
    return {
      action: CONVERGENCE_POINT,
      reason: "accepted_after_retries",
      detail: "قبول بعد " + MEMORY.matchmaking.attemptCount + " محاولة"
    };
  }
  
  // إذا كان البينغ عالي جداً - نرفض حتى بعد 4 محاولات
  if (analysis.ping > ABSOLUTE_MAX_PING) {
    MEMORY.servers.banned[ip] = true;
    return {
      action: BLOCK,
      reason: "ping_too_high",
      detail: "البينغ " + analysis.ping + "ms أعلى من الحد المقبول"
    };
  }
  
  // غير أردني - رفض
  return {
    action: BLOCK,
    reason: "not_jordanian",
    detail: "سيرفر غير أردني"
  };
}

// ═══════════════════════════════════════════════════════════════════════════
//  نظام التحديث الدوري للتجنيد والأصدقاء
// ═══════════════════════════════════════════════════════════════════════════

function handleRecruitment(ip, analysis) {
  var now = Date.now();
  
  // حساب الفاصل الزمني منذ آخر تحديث
  var timeSinceLastRefresh = now - MEMORY.recruitment.lastRefreshTime;
  
  // ═══ استراتيجية التحديث كل 3 ثوان ═══
  
  // إذا مرت 3 ثوان أو أكثر - نغير القرار لإجبار التحديث
  if (timeSinceLastRefresh >= REFRESH_INTERVAL) {
    MEMORY.recruitment.lastRefreshTime = now;
    MEMORY.recruitment.refreshCount++;
    
    // تبديل بين البروكسي والـ DIRECT لإجبار إعادة الطلب
    var useProxy = (MEMORY.recruitment.refreshCount % 2) === 0;
    
    if (analysis.isJordanian) {
      return {
        action: useProxy ? CONVERGENCE_POINT : DIRECT,
        reason: "recruitment_refresh_" + MEMORY.recruitment.refreshCount,
        detail: "تحديث دوري رقم " + MEMORY.recruitment.refreshCount
      };
    }
  }
  
  // ضمن نافذة الـ 3 ثوان - قرار عادي
  if (analysis.isJordanian) {
    return {
      action: CONVERGENCE_POINT,
      reason: "recruitment_normal",
      detail: "طلب تجنيد عادي"
    };
  }
  
  // غير أردني - رفض
  return {
    action: BLOCK,
    reason: "recruitment_not_jordanian",
    detail: "التجنيد للأردنيين فقط"
  };
}

// ═══════════════════════════════════════════════════════════════════════════
//  محرك القرار الرئيسي
// ═══════════════════════════════════════════════════════════════════════════

function makeDecision(ip, host, url, analysis, traffic) {
  
  // حظر فوري
  if (analysis.block) {
    return {action: BLOCK, reason: "blocked"};
  }
  
  // ═══ Matchmaking - نظام الرفض المتكرر ═══
  if (traffic.type === "matchmaking") {
    return handleMatchmaking(ip, analysis);
  }
  
  // ═══ Recruitment - نظام التحديث الدوري ═══
  if (traffic.type === "recruitment" && traffic.needsRefresh) {
    return handleRecruitment(ip, analysis);
  }
  
  // ═══ Match - مسار موحد أو مباشر ═══
  if (traffic.type === "match") {
    if (analysis.isPerfect && analysis.ping <= PERFECT_PING) {
      return {action: DIRECT, reason: "match_perfect_direct"};
    }
    return {action: UNIFIED_MATCH_PATH, reason: "match_unified"};
  }
  
  // ═══ Lobby - التجميع ═══
  if (traffic.type === "lobby") {
    if (analysis.isJordanian) {
      return {action: CONVERGENCE_POINT, reason: "lobby_convergence"};
    }
    return {action: BLOCK, reason: "lobby_not_jordanian"};
  }
  
  // ═══ Content - مباشر إذا سريع ═══
  if (traffic.type === "content") {
    if (analysis.isJordanian && analysis.ping <= 10) {
      return {action: DIRECT, reason: "content_direct"};
    }
    if (analysis.isJordanian) {
      return {action: CONVERGENCE_POINT, reason: "content_proxied"};
    }
    return {action: BLOCK, reason: "content_blocked"};
  }
  
  // ═══ Default ═══
  if (analysis.isJordanian && traffic.critical) {
    return {action: CONVERGENCE_POINT, reason: "default_convergence"};
  }
  
  if (analysis.isJordanian) {
    return {action: DIRECT, reason: "default_direct"};
  }
  
  return {action: BLOCK, reason: "default_block"};
}

// ═══════════════════════════════════════════════════════════════════════════
//  الموجه الرئيسي
// ═══════════════════════════════════════════════════════════════════════════

function FindProxyForURL(url, host) {
  
  host = norm(host).toLowerCase();
  
  if (!isPUBG(host)) return DIRECT;
  
  // كشف معلومات اللاعب
  if (!MEMORY.player.provider) {
    var myIP = myIpAddress();
    if (myIP && myIP !== "127.0.0.1") {
      var playerAnalysis = analyzeIP(myIP);
      if (playerAnalysis.isJordanian) {
        MEMORY.player.provider = playerAnalysis.tier;
      }
    }
  }
  
  var ip = smartResolve(host);
  if (!ip || ip.indexOf(":") > -1) return BLOCK;
  
  var analysis = analyzeIP(ip);
  var traffic = classifyTraffic(url, host);
  var decision = makeDecision(ip, host, url, analysis, traffic);
  
  return decision.action;
}

// ═══════════════════════════════════════════════════════════════════════════
//  نهاية السكربت العدواني المتطرف
// ═══════════════════════════════════════════════════════════════════════════
