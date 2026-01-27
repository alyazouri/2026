// ==========================================
// 🇯🇴 PUBG MOBILE - JORDAN NUCLEAR ISOLATION
// Zero-Tolerance Foreign Player Policy
// ==========================================

// ============ JORDAN-ONLY INFRASTRUCTURE ============
var JORDAN_ONLY = {
  // Match - Premium Jordan servers ONLY
  MATCH: [
    "PROXY 46.185.131.218:20001",     // Orange Amman
    "PROXY 213.6.100.50:20001",       // Fiber Amman
    "PROXY 176.29.50.100:20001"       // Orange Secondary
  ],
  
  // Everything else - Jordan only
  ALL: [
    "PROXY 46.185.131.218:8080",
    "PROXY 176.29.15.20:8080",
    "PROXY 213.6.80.40:8080",
    "PROXY 37.202.80.20:8080"
  ]
};

var BLACKHOLE = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ============ JORDAN IP RANGES - ULTRA PRECISE ============
var JORDAN_WHITELIST = {
  
  // ISP-Specific Ranges (Updated 2025)
  ORANGE: [
    ["46.185.128.0", "46.185.255.255"],     // Orange Main /17
    ["176.28.128.0", "176.28.255.255"],     // Orange VDSL /17
    ["176.29.0.0", "176.29.255.255"],       // Orange Home /16
    ["82.212.64.0", "82.212.127.255"]       // Orange Business /18
  ],
  
  ZAIN: [
    ["37.202.64.0", "37.202.127.255"],      // Zain Main /18
    ["185.4.16.0", "185.4.19.255"],         // Zain LTE /22
    ["185.20.200.0", "185.20.203.255"]      // Zain Mobile /22
  ],
  
  UMNIAH: [
    ["31.44.0.0", "31.44.255.255"],         // Umniah Main /16
    ["94.249.0.0", "94.249.127.255"],       // Umniah Corp /17
    ["185.96.84.0", "185.96.87.255"]        // Umniah Wireless /22
  ],
  
  FIBER: [
    ["213.6.0.0", "213.6.255.255"],         // Batelco Fiber /16
    ["5.45.128.0", "5.45.143.255"]          // Premium Fiber /20
  ],
  
  // Government & Universities (High Trust)
  GOV_EDU: [
    ["80.10.8.0", "80.10.39.255"],          // Gov Networks
    ["62.72.160.0", "62.72.191.255"],       // University Networks
    ["185.118.4.0", "185.118.7.255"]        // Research Networks
  ],
  
  // Secondary ISPs
  SECONDARY: [
    ["5.198.240.0", "5.198.247.255"],
    ["37.17.192.0", "37.17.207.255"],
    ["37.123.64.0", "37.123.95.255"],
    ["37.152.0.0", "37.152.7.255"],
    ["37.220.112.0", "37.220.127.255"],
    ["46.23.112.0", "46.23.127.255"],
    ["46.32.96.0", "46.32.127.255"],
    ["77.245.0.0", "77.245.15.255"],
    ["79.134.128.0", "79.134.159.255"],
    ["80.10.48.0", "80.10.79.255"],
    ["80.10.144.0", "80.10.175.255"],
    ["80.90.160.0", "80.90.175.255"],
    ["81.21.0.0", "81.21.15.255"],
    ["81.28.112.0", "81.28.127.255"],
    ["81.52.144.0", "81.52.231.255"],
    ["81.253.96.0", "81.253.255.255"],
    ["185.12.72.0", "185.12.75.255"],
    ["185.24.84.0", "185.24.87.255"],
    ["185.33.24.0", "185.33.27.255"],
    ["185.40.188.0", "185.40.191.255"],
    ["185.51.200.0", "185.51.203.255"],
    ["185.61.136.0", "185.61.139.255"],
    ["185.137.248.0", "185.137.251.255"],
    ["185.152.68.0", "185.152.71.255"],
    ["185.180.28.0", "185.180.31.255"],
    ["185.194.124.0", "185.194.127.255"]
  ]
};

// ============ MENA AGGRESSIVE BLACKLIST ============
var MENA_BLACKLIST = {
  
  // Egypt - Complete Block (أكبر مشكلة)
  EGYPT: [
    ["41.32.0.0", "41.47.255.255"],         // TE Data Main
    ["41.64.0.0", "41.79.255.255"],         // Vodafone Egypt
    ["41.128.0.0", "41.143.255.255"],       // Orange Egypt
    ["41.176.0.0", "41.191.255.255"],       // Etisalat Egypt
    ["41.192.0.0", "41.223.255.255"],       // WE (Egypt Telecom)
    ["41.232.0.0", "41.239.255.255"],       // Noor ISP
    ["156.160.0.0", "156.163.255.255"],     // TE Data Extended
    ["196.128.0.0", "196.207.255.255"],     // Egypt Mega Block /9
    ["197.32.0.0", "197.63.255.255"],       // Egypt Extended
    ["154.32.0.0", "154.63.255.255"],       // Mobile Egypt
    ["102.36.0.0", "102.39.255.255"],       // Egypt Cloud
    ["102.44.0.0", "102.47.255.255"],       // Egypt ISPs
    ["160.176.0.0", "160.191.255.255"],     // Egypt Data Centers
    ["197.48.0.0", "197.63.255.255"]        // Egypt Additional
  ],
  
  // Saudi Arabia
  SAUDI: [
    ["31.200.0.0", "31.223.255.255"],       // STC
    ["37.232.0.0", "37.239.255.255"],       // Mobily
    ["46.142.0.0", "46.143.255.255"],       // Zain KSA
    ["78.92.0.0", "78.95.255.255"],         // STC Extended
    ["188.120.0.0", "188.127.255.255"],     // Saudi Networks
    ["212.138.0.0", "212.138.255.255"]      // Saudi Business
  ],
  
  // UAE
  UAE: [
    ["5.36.0.0", "5.39.255.255"],           // Etisalat UAE
    ["31.29.0.0", "31.29.255.255"],         // Du UAE
    ["78.88.0.0", "78.91.255.255"],         // UAE Networks
    ["94.56.0.0", "94.63.255.255"],         // UAE Extended
    ["176.12.64.0", "176.12.127.255"]       // UAE Business
  ],
  
  // Iraq
  IRAQ: [
    ["37.236.0.0", "37.239.255.255"],       // Earthlink Iraq
    ["46.102.128.0", "46.102.159.255"],     // AsiaCell
    ["62.201.128.0", "62.201.255.255"],     // Zain Iraq
    ["149.255.0.0", "149.255.255.255"],     // Iraq Networks
    ["185.21.76.0", "185.21.79.255"]        // Iraq ISPs
  ],
  
  // Lebanon
  LEBANON: [
    ["46.19.136.0", "46.19.143.255"],       // IDM Lebanon
    ["46.53.0.0", "46.53.255.255"],         // Ogero
    ["78.135.64.0", "78.135.127.255"],      // LibanCell
    ["185.22.28.0", "185.22.31.255"]        // Touch Lebanon
  ],
  
  // Syria
  SYRIA: [
    ["5.0.0.0", "5.15.255.255"],            // Syrian Telecom
    ["46.53.0.0", "46.53.255.255"],         // MTN Syria
    ["82.137.192.0", "82.137.255.255"],     // Syria Networks
    ["185.35.100.0", "185.35.103.255"]      // Syria ISPs
  ],
  
  // Palestine
  PALESTINE: [
    ["31.167.0.0", "31.167.255.255"],       // Paltel
    ["37.48.0.0", "37.48.255.255"],         // Jawwal
    ["185.27.192.0", "185.27.195.255"]      // Palestine ISPs
  ],
  
  // Afghanistan (مشكلة كبيرة)
  AFGHANISTAN: [
    ["27.116.0.0", "27.116.255.255"],       // Afghan Telecom
    ["43.224.236.0", "43.224.239.255"],     // Roshan
    ["103.5.136.0", "103.5.139.255"],       // AWCC
    ["103.10.28.0", "103.10.31.255"],       // Etisalat AF
    ["103.31.100.0", "103.31.103.255"],     // Afghan ISPs
    ["119.160.96.0", "119.160.127.255"],    // Afghan Networks
    ["149.54.0.0", "149.54.255.255"],       // Afghan Extended
    ["180.94.64.0", "180.94.95.255"]        // Afghan Mobile
  ],
  
  // Pakistan
  PAKISTAN: [
    ["39.32.0.0", "39.63.255.255"],         // PTCL Main /11
    ["58.27.0.0", "58.27.255.255"],         // Nayatel
    ["103.11.0.0", "103.11.255.255"],       // Pakistan ISPs
    ["110.36.0.0", "110.39.255.255"],       // Cybernet
    ["111.68.0.0", "111.119.255.255"],      // Pakistan Mega /10
    ["115.42.0.0", "115.42.255.255"],       // Jazz Pakistan
    ["119.152.0.0", "119.159.255.255"],     // Mobilink
    ["175.107.0.0", "175.107.255.255"],     // PTCL Extended
    ["180.92.0.0", "180.95.255.255"],       // Wateen
    ["202.47.0.0", "202.47.255.255"],       // Pakistan Extended
    ["203.81.0.0", "203.81.255.255"]        // Pakistan Networks
  ],
  
  // Iran
  IRAN: [
    ["2.176.0.0", "2.191.255.255"],         // Iran Main /12
    ["5.22.0.0", "5.23.255.255"],           // Iran ISPs
    ["31.2.0.0", "31.7.255.255"],           // Iran Extended
    ["37.9.0.0", "37.9.255.255"],           // Iran Networks
    ["46.224.0.0", "46.255.255.255"],       // Iran Mega /11
    ["78.38.0.0", "78.39.255.255"],         // Iran Telecom
    ["79.127.0.0", "79.127.255.255"],       // Iran ISPs
    ["85.132.0.0", "85.133.255.255"],       // Iran Extended
    ["91.92.0.0", "91.109.255.255"],        // Iran Networks /12
    ["92.114.0.0", "92.114.255.255"],       // Iran Additional
    ["188.136.0.0", "188.137.255.255"]      // Iran Cloud
  ],
  
  // Morocco
  MOROCCO: [
    ["41.140.0.0", "41.143.255.255"],       // Maroc Telecom
    ["41.248.0.0", "41.255.255.255"],       // Morocco Extended
    ["102.16.0.0", "102.31.255.255"],       // Morocco ISPs /12
    ["105.128.0.0", "105.191.255.255"],     // Morocco Networks /10
    ["154.112.0.0", "154.127.255.255"],     // Morocco Extended /12
    ["196.64.0.0", "196.79.255.255"]        // Morocco Additional /12
  ],
  
  // Algeria
  ALGERIA: [
    ["41.96.0.0", "41.111.255.255"],        // Algerie Telecom /12
    ["41.200.0.0", "41.207.255.255"],       // Algeria Extended
    ["154.0.0.0", "154.15.255.255"],        // Algeria Networks /12
    ["196.12.128.0", "196.12.255.255"],     // Algeria ISPs
    ["197.8.0.0", "197.15.255.255"]         // Algeria Additional /13
  ],
  
  // Tunisia
  TUNISIA: [
    ["41.224.0.0", "41.231.255.255"],       // Tunisie Telecom
    ["154.64.0.0", "154.127.255.255"],      // Tunisia Extended /10
    ["196.0.0.0", "196.11.255.255"],        // Tunisia Networks /12
    ["197.16.0.0", "197.31.255.255"]        // Tunisia ISPs /12
  ],
  
  // Libya
  LIBYA: [
    ["41.208.0.0", "41.223.255.255"],       // Libya Telecom /12
    ["62.68.160.0", "62.68.191.255"],       // Libya Networks
    ["154.127.0.0", "154.127.255.255"],     // Libya ISPs
    ["196.12.0.0", "196.12.127.255"]        // Libya Extended
  ],
  
  // Sudan
  SUDAN: [
    ["41.0.0.0", "41.31.255.255"],          // Sudan Mega /11
    ["102.120.0.0", "102.127.255.255"],     // Sudan Networks
    ["154.96.0.0", "154.111.255.255"],      // Sudan ISPs /12
    ["196.29.0.0", "196.29.255.255"]        // Sudatel
  ],
  
  // Yemen
  YEMEN: [
    ["37.35.0.0", "37.35.255.255"],         // Yemen Net
    ["46.36.192.0", "46.36.255.255"],       // Yemen Mobile
    ["134.35.0.0", "134.35.255.255"],       // TeleYemen
    ["185.19.216.0", "185.19.219.255"]      // Yemen ISPs
  ]
};

// ============ GLOBAL BLACKLIST - REST OF WORLD ============
var GLOBAL_BLACKLIST = [
  // Asia-Pacific (Mega Blocks)
  ["1.0.0.0", "1.255.255.255"],             // APNIC /8
  ["14.0.0.0", "14.255.255.255"],           // China /8
  ["27.0.0.0", "27.255.255.255"],           // Asia /8
  ["36.0.0.0", "36.255.255.255"],           // China /8
  ["42.0.0.0", "42.255.255.255"],           // Asia /8
  ["43.0.0.0", "43.255.255.255"],           // APNIC /8
  ["49.0.0.0", "49.255.255.255"],           // Thailand /8
  ["58.0.0.0", "61.255.255.255"],           // China Mega /6
  ["100.0.0.0", "106.255.255.255"],         // Asia Mega /5
  ["110.0.0.0", "125.255.255.255"],         // Asia Mega /4
  ["180.0.0.0", "183.255.255.255"],         // China /6
  ["202.0.0.0", "202.255.255.255"],         // Asia-Pacific /8
  ["210.0.0.0", "211.255.255.255"],         // Asia /7
  ["218.0.0.0", "223.255.255.255"],         // China Mega /5
  
  // Europe (Selective - avoiding Jordan ranges)
  ["51.0.0.0", "51.255.255.255"],           // France /8
  ["77.0.0.0", "77.244.255.255"],           // Europe (exclude JO)
  ["78.0.0.0", "78.255.255.255"],           // Europe /8
  ["83.0.0.0", "93.255.255.255"],           // Europe Mega /4 (exclude JO)
  ["95.0.0.0", "95.255.255.255"],           // Russia /8
  ["109.0.0.0", "109.255.255.255"],         // Europe /8
  ["176.0.0.0", "176.27.255.255"],          // Europe (exclude JO)
  ["178.0.0.0", "178.255.255.255"],         // Russia /8
  ["188.0.0.0", "188.255.255.255"],         // Europe /8
  
  // Americas (Complete Block)
  ["3.0.0.0", "4.255.255.255"],             // USA /7
  ["8.0.0.0", "8.255.255.255"],             // USA /8
  ["12.0.0.0", "15.255.255.255"],           // USA /6
  ["23.0.0.0", "24.255.255.255"],           // USA /7
  ["32.0.0.0", "35.255.255.255"],           // USA /6
  ["64.0.0.0", "76.255.255.255"],           // USA Mega /4
  ["96.0.0.0", "99.255.255.255"],           // USA /6
  ["128.0.0.0", "143.255.255.255"],         // USA Mega /4
  ["152.0.0.0", "155.255.255.255"],         // USA /6
  ["160.0.0.0", "175.255.255.255"],         // USA Mega /4
  ["177.0.0.0", "181.255.255.255"],         // South America /5
  ["186.0.0.0", "191.255.255.255"],         // South America /5
  ["198.0.0.0", "199.255.255.255"],         // USA /7
  ["200.0.0.0", "201.255.255.255"],         // LATAM /7
  ["204.0.0.0", "207.255.255.255"]          // USA /6
];

// ============ SESSION STATE ============
var SESSION = {
  cache: {},
  stats: {
    jordanAllowed: 0,
    foreignBlocked: 0,
    egyptBlocked: 0,
    afghanBlocked: 0,
    menaBlocked: 0
  }
};

// ============ UTILITIES ============
function norm(h) {
  var i = h.indexOf(":");
  return i > -1 ? h.substring(0, i) : h;
}

function resolveIP(host) {
  if (SESSION.cache[host]) {
    var entry = SESSION.cache[host];
    if (Date.now() - entry.time < 180000) return entry.ip;  // 3min cache
  }
  
  var ip = dnsResolve(host);
  if (ip && ip.indexOf(":") === -1) {
    SESSION.cache[host] = {ip: ip, time: Date.now()};
    return ip;
  }
  return null;
}

function isInList(ip, list) {
  for (var i = 0; i < list.length; i++) {
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  }
  return false;
}

// ============ JORDAN VERIFICATION ============
function isJordanIP(ip) {
  // Check all Jordan ISP ranges
  for (var isp in JORDAN_WHITELIST) {
    var ranges = JORDAN_WHITELIST[isp];
    for (var i = 0; i < ranges.length; i++) {
      if (isInNet(ip, ranges[i][0], ranges[i][1])) {
        return {valid: true, isp: isp};
      }
    }
  }
  return {valid: false, isp: null};
}

// ============ THREAT DETECTION ============
function detectThreat(ip) {
  // Priority 1: Egypt
  if (isInList(ip, MENA_BLACKLIST.EGYPT)) {
    SESSION.stats.egyptBlocked++;
    return "EGYPT";
  }
  
  // Priority 2: Afghanistan
  if (isInList(ip, MENA_BLACKLIST.AFGHANISTAN)) {
    SESSION.stats.afghanBlocked++;
    return "AFGHANISTAN";
  }
  
  // Priority 3: Pakistan
  if (isInList(ip, MENA_BLACKLIST.PAKISTAN)) {
    SESSION.stats.menaBlocked++;
    return "PAKISTAN";
  }
  
  // Check all MENA countries
  for (var country in MENA_BLACKLIST) {
    if (country === "EGYPT" || country === "AFGHANISTAN") continue;
    if (isInList(ip, MENA_BLACKLIST[country])) {
      SESSION.stats.menaBlocked++;
      return country;
    }
  }
  
  // Check global blacklist
  if (isInList(ip, GLOBAL_BLACKLIST)) {
    SESSION.stats.foreignBlocked++;
    return "GLOBAL";
  }
  
  return null;
}

// ============ TRAFFIC CLASSIFICATION ============
function getTrafficType(url, host) {
  var str = (url + " " + host).toLowerCase();
  
  // Match/Gameplay - Highest Priority
  if (/match|battle|game.*server|combat|arena|room|session|instance|realtime|sync|tick|gameplay|pvp/i.test(str)) {
    return "MATCH";
  }
  
  // Matchmaking - Critical
  if (/matchmak|queue|lobby.*match|find.*match|search.*match|region.*select|dispatch/i.test(str)) {
    return "MATCHMAKING";
  }
  
  // Team/Squad - Critical
  if (/squad|team|party|crew|duo|trio|quad|group|recruit|lfg|lfm|player.*search/i.test(str)) {
    return "TEAM";
  }
  
  // Social - Critical
  if (/friend|social|invite|presence|online|message|chat|clan|guild/i.test(str)) {
    return "SOCIAL";
  }
  
  // Voice - Critical
  if (/voice|audio|rtc|gvoice|microphone|speaker/i.test(str)) {
    return "VOICE";
  }
  
  // Anti-cheat - Must be direct
  if (/anticheat|anti.*cheat|security.*check|integrity|verify|tencent.*protect/i.test(str)) {
    return "ANTICHEAT";
  }
  
  // CDN/Assets - Can be direct
  if (/cdn|asset|resource|patch|update|download|static/i.test(str)) {
    return "CDN";
  }
  
  // Generic PUBG traffic
  if (/pubg|pubgm|tencent|krafton|lightspeed|levelinfinite|proximabeta|intlgame/i.test(str)) {
    return "PUBG";
  }
  
  return "OTHER";
}

// ============ MAIN ROUTING LOGIC ============
function FindProxyForURL(url, host) {
  
  host = norm(host.toLowerCase());
  
  // Fast path: Non-PUBG
  if (!/pubg|pubgm|tencent|krafton|lightspeed|levelinfinite|intlgame|proximabeta|gcloud|gvoice|qq\.com/i.test(host)) {
    return DIRECT;
  }
  
  // Resolve IP
  var ip = resolveIP(host);
  if (!ip) return BLACKHOLE;
  
  // ========================================
  // PHASE 1: JORDAN WHITELIST
  // ========================================
  var jordanCheck = isJordanIP(ip);
  
  if (jordanCheck.valid) {
    SESSION.stats.jordanAllowed++;
    
    // Classify traffic
    var trafficType = getTrafficType(url, host);
    
    // Route based on traffic type
    switch(trafficType) {
      case "MATCH":
      case "MATCHMAKING":
      case "TEAM":
      case "SOCIAL":
      case "VOICE":
        // Critical traffic - Premium proxies
        var pool = JORDAN_ONLY.MATCH;
        return pool[0] + "; " + pool[1] + "; " + pool[2];
      
      case "ANTICHEAT":
        // Direct to avoid detection
        return DIRECT;
      
      case "CDN":
        // Direct for speed
        return DIRECT;
      
      default:
        // Generic PUBG - Standard proxies
        var pool = JORDAN_ONLY.ALL;
        return pool[0] + "; " + pool[1];
    }
  }
  
  // ========================================
  // PHASE 2: AGGRESSIVE BLOCKING
  // ========================================
  var threat = detectThreat(ip);
  
  if (threat) {
    // Log blocking
    // console.log("BLOCKED: " + threat + " - " + ip);
    return BLACKHOLE;
  }
  
  // ========================================
  // PHASE 3: DEFAULT DENY
  // ========================================
  // Any IP not in Jordan whitelist = BLOCKED
  SESSION.stats.foreignBlocked++;
  return BLACKHOLE;
}

// ============ DEBUGGING (Optional) ============
function getStats() {
  return JSON.stringify(SESSION.stats);
}
