// ==========================================
// 🇯🇴 PUBG MOBILE - ULTIMATE JORDAN ISOLATION
// Premium Tier System + Port Optimization + Adaptive Routing
// Version: 3.0 FINAL
// ==========================================

// ============ PREMIUM PROXY INFRASTRUCTURE ============

var COMPETITIVE = {
  // Classic Mode - Port 20001 (Fiber Backbone ONLY)
  CLASSIC: {
    primary: "PROXY 46.185.131.218:20001",
    backup: "PROXY 213.6.100.50:20001",
    tertiary: "PROXY 176.29.50.100:20001"
  },
  
  // Arena/TDM - Port 20002 (Low-latency optimized)
  ARENA: {
    primary: "PROXY 46.185.131.218:20002",
    backup: "PROXY 213.6.100.50:20002",
    tertiary: "PROXY 82.212.90.25:20002"
  },
  
  // EvoGround - Port 20003 (Premium residential)
  EVOGROUND: {
    primary: "PROXY 46.185.131.218:20003",
    backup: "PROXY 176.29.50.100:20003",
    tertiary: "PROXY 213.6.100.50:20003"
  }
};

var CASUAL = {
  ARCADE: [
    "PROXY 176.29.15.20:8080",
    "PROXY 37.202.80.20:8080",
    "PROXY 31.44.50.15:8080"
  ],
  
  TRAINING: [
    "PROXY 176.29.100.50:8081",
    "PROXY 94.249.50.30:8081"
  ],
  
  LOBBY: [
    "PROXY 46.185.140.10:8080",
    "PROXY 176.29.15.20:8080",
    "PROXY 37.202.80.20:8080"
  ]
};

var BLACKHOLE = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ============ JORDAN ISP TIERS - ULTRA-PRECISE ============

var JORDAN_TIERS = {
  
  // TIER 0: FIBER & BUSINESS (Latency: 5-15ms, Jitter: <2ms)
  TIER_0_FIBER: {
    quality: 100,
    competitive: true,
    ranges: [
      ["213.6.0.0", "213.6.255.255"],           // Batelco Fiber
      ["46.185.128.0", "46.185.159.255"],       // Orange Fiber Core
      ["82.212.64.0", "82.212.95.255"],         // Orange Business
      ["5.45.128.0", "5.45.135.255"]            // Premium Fiber
    ]
  },
  
  // TIER 1: PREMIUM VDSL (Latency: 15-25ms, Jitter: <5ms)
  TIER_1_PREMIUM: {
    quality: 90,
    competitive: true,
    ranges: [
      ["46.185.160.0", "46.185.255.255"],       // Orange VDSL Premium
      ["176.28.128.0", "176.28.191.255"],       // Orange VDSL Plus
      ["176.29.0.0", "176.29.63.255"],          // Orange Home Premium
      ["37.202.64.0", "37.202.95.255"],         // Zain Premium
      ["94.249.0.0", "94.249.63.255"],          // Umniah Corporate
      ["80.10.8.0", "80.10.23.255"],            // Gov Network
      ["62.72.160.0", "62.72.175.255"]          // University Network
    ]
  },
  
  // TIER 2: STANDARD (Latency: 25-40ms)
  TIER_2_STANDARD: {
    quality: 70,
    competitive: false,
    ranges: [
      ["176.28.192.0", "176.28.255.255"],       // Orange Standard
      ["176.29.64.0", "176.29.255.255"],        // Orange Home
      ["37.202.96.0", "37.202.127.255"],        // Zain Standard
      ["185.4.16.0", "185.4.19.255"],           // Zain LTE
      ["31.44.0.0", "31.44.127.255"],           // Umniah Home
      ["94.249.64.0", "94.249.127.255"]         // Umniah Standard
    ]
  },
  
  // TIER 3: BUDGET (Latency: 40-60ms)
  TIER_3_BUDGET: {
    quality: 50,
    competitive: false,
    ranges: [
      ["185.96.84.0", "185.96.87.255"],
      ["185.12.72.0", "185.12.75.255"],
      ["80.10.48.0", "80.10.79.255"],
      ["81.52.144.0", "81.52.159.255"]
    ]
  },
  
  // TIER 4: MOBILE DATA
  TIER_4_MOBILE: {
    quality: 30,
    competitive: false,
    ranges: [
      ["185.20.200.0", "185.20.203.255"],
      ["185.24.84.0", "185.24.87.255"]
    ]
  },
  
  // FALLBACK: OTHER JORDAN
  TIER_X_OTHER: {
    quality: 40,
    competitive: false,
    ranges: [
      ["2.59.52.0", "2.59.55.255"],
      ["5.198.240.0", "5.198.247.255"],
      ["5.199.184.0", "5.199.187.255"],
      ["37.17.192.0", "37.17.207.255"],
      ["37.44.32.0", "37.44.39.255"],
      ["37.75.144.0", "37.75.151.255"],
      ["37.123.64.0", "37.123.95.255"],
      ["37.152.0.0", "37.152.7.255"],
      ["37.220.112.0", "37.220.127.255"],
      ["37.252.222.0", "37.252.222.255"],
      ["45.142.196.0", "45.142.199.255"],
      ["46.23.112.0", "46.23.127.255"],
      ["46.32.96.0", "46.32.127.255"],
      ["46.248.192.0", "46.248.223.255"],
      ["77.245.0.0", "77.245.15.255"],
      ["79.134.128.0", "79.134.159.255"],
      ["80.10.144.0", "80.10.175.255"],
      ["80.90.160.0", "80.90.175.255"],
      ["81.21.0.0", "81.21.15.255"],
      ["81.28.112.0", "81.28.127.255"],
      ["81.52.224.0", "81.52.231.255"],
      ["81.253.96.0", "81.253.255.255"],
      ["82.212.96.0", "82.212.127.255"],
      ["185.33.24.0", "185.33.27.255"],
      ["185.40.188.0", "185.40.191.255"],
      ["185.51.200.0", "185.51.203.255"],
      ["185.61.136.0", "185.61.139.255"],
      ["185.118.4.0", "185.118.7.255"],
      ["185.137.248.0", "185.137.251.255"],
      ["185.152.68.0", "185.152.71.255"],
      ["185.180.28.0", "185.180.31.255"],
      ["185.194.124.0", "185.194.127.255"]
    ]
  }
};

// ============ PAKISTAN ULTRA-COMPREHENSIVE BLOCK ============
var PAKISTAN_MEGA = [
  // Major ISPs
  ["39.32.0.0", "39.63.255.255"],           // PTCL /11
  ["111.68.0.0", "111.119.255.255"],        // Jazz /10
  ["110.36.0.0", "110.39.255.255"],         // Telenor /14
  ["115.42.0.0", "115.42.255.255"],         // Jazz Extended
  ["115.160.0.0", "115.186.255.255"],       // Zong /11
  ["119.152.0.0", "119.159.255.255"],       // Mobilink /13
  ["175.107.0.0", "175.107.255.255"],       // PTCL Extended
  ["180.92.0.0", "180.95.255.255"],         // Wateen /14
  ["182.176.0.0", "182.191.255.255"],       // Pakistan /12
  ["202.47.0.0", "202.47.255.255"],         // PK Networks
  ["202.69.0.0", "202.69.255.255"],         // PK ISPs
  ["203.80.0.0", "203.81.255.255"],         // PK /15
  ["203.124.32.0", "203.124.63.255"],       // PK Corporate
  
  // Additional PK Ranges
  ["27.0.0.0", "27.7.255.255"],
  ["58.27.0.0", "58.27.255.255"],
  ["103.11.0.0", "103.11.255.255"],
  ["103.18.0.0", "103.18.255.255"],
  ["103.31.100.0", "103.31.103.255"],
  ["116.0.0.0", "116.127.255.255"],         // /9
  ["117.20.0.0", "117.21.255.255"],
  ["119.30.0.0", "119.31.255.255"],
  ["119.73.0.0", "119.73.255.255"],
  ["121.46.0.0", "121.46.255.255"],
  ["122.129.0.0", "122.129.255.255"],
  ["125.209.64.0", "125.209.127.255"],
  ["139.5.0.0", "139.5.255.255"],
  ["180.149.0.0", "180.149.255.255"],
  ["180.178.128.0", "180.178.255.255"],
  ["202.83.160.0", "202.83.191.255"],
  ["202.141.224.0", "202.141.255.255"],
  ["202.142.128.0", "202.142.255.255"],
  ["202.163.64.0", "202.163.127.255"],
  ["218.100.0.0", "218.100.255.255"],
  ["221.120.192.0", "221.120.255.255"],
  ["223.29.192.0", "223.29.255.255"]
];

// ============ EGYPT MEGA BLOCK ============
var EGYPT_MEGA = [
  ["41.32.0.0", "41.47.255.255"],           // TE Data /12
  ["41.64.0.0", "41.79.255.255"],           // Vodafone /12
  ["41.128.0.0", "41.143.255.255"],         // Orange /12
  ["41.176.0.0", "41.191.255.255"],         // Etisalat /12
  ["41.192.0.0", "41.223.255.255"],         // WE /11
  ["41.232.0.0", "41.239.255.255"],         // Noor
  ["102.36.0.0", "102.47.255.255"],         // Egypt /12
  ["154.32.0.0", "154.63.255.255"],         // Egypt /11
  ["156.160.0.0", "156.167.255.255"],       // TE Data Extended
  ["160.176.0.0", "160.191.255.255"],       // Egypt /12
  ["196.128.0.0", "196.207.255.255"],       // TE Data Mega /11
  ["196.218.0.0", "196.219.255.255"],       // Vodafone Extended
  ["197.32.0.0", "197.63.255.255"]          // Egypt /11
];

// ============ AFGHANISTAN PRECISION BLOCK ============
var AFGHANISTAN_ALL = [
  ["27.116.0.0", "27.116.255.255"],
  ["43.224.236.0", "43.224.239.255"],
  ["103.5.136.0", "103.5.139.255"],
  ["103.9.172.0", "103.9.175.255"],
  ["103.10.28.0", "103.10.31.255"],
  ["103.14.196.0", "103.14.199.255"],
  ["103.16.68.0", "103.16.71.255"],
  ["103.31.100.0", "103.31.103.255"],
  ["103.39.80.0", "103.39.83.255"],
  ["103.245.140.0", "103.245.143.255"],
  ["103.254.156.0", "103.254.159.255"],
  ["119.160.96.0", "119.160.127.255"],
  ["149.54.0.0", "149.54.255.255"],
  ["175.107.192.0", "175.107.255.255"],
  ["180.94.64.0", "180.94.95.255"],
  ["182.56.0.0", "182.56.255.255"],
  ["202.4.173.0", "202.4.173.255"],
  ["203.133.0.0", "203.133.255.255"]
];

// ============ INDIA MAJOR BLOCK ============
var INDIA_MAJOR = [
  ["14.0.0.0", "14.255.255.255"],           // BSNL /8
  ["103.0.0.0", "103.127.255.255"],         // India Cloud /9
  ["106.192.0.0", "106.223.255.255"],       // Jio /11
  ["110.224.0.0", "110.255.255.255"],       // India /11
  ["117.192.0.0", "117.223.255.255"],       // Airtel /11
  ["122.160.0.0", "122.191.255.255"],       // India /11
  ["182.64.0.0", "182.95.255.255"]          // India /11
];

// ============ WORLD MEGA BLOCKS ============
var WORLD_MEGA = [
  // China Complete
  ["1.0.0.0", "1.255.255.255"],
  ["14.0.0.0", "14.255.255.255"],
  ["27.0.0.0", "27.255.255.255"],
  ["36.0.0.0", "36.255.255.255"],
  ["42.0.0.0", "42.255.255.255"],
  ["49.0.0.0", "49.255.255.255"],
  ["58.0.0.0", "61.255.255.255"],
  ["101.0.0.0", "106.255.255.255"],
  ["110.0.0.0", "125.255.255.255"],
  ["180.0.0.0", "183.255.255.255"],
  ["202.0.0.0", "202.255.255.255"],
  ["210.0.0.0", "211.255.255.255"],
  ["218.0.0.0", "223.255.255.255"],
  
  // Russia (Excluding Jordan)
  ["5.0.0.0", "5.44.255.255"],
  ["5.46.0.0", "5.197.255.255"],
  ["5.199.0.0", "5.199.183.255"],
  ["5.199.188.0", "5.255.255.255"],
  ["31.0.0.0", "31.43.255.255"],
  ["31.45.0.0", "31.255.255.255"],
  ["37.0.0.0", "37.16.255.255"],
  ["37.18.0.0", "37.43.255.255"],
  ["37.45.0.0", "37.74.255.255"],
  ["37.76.0.0", "37.122.255.255"],
  ["37.124.0.0", "37.151.255.255"],
  ["37.153.0.0", "37.201.255.255"],
  ["37.203.0.0", "37.219.255.255"],
  ["37.221.0.0", "37.255.255.255"],
  ["46.0.0.0", "46.22.255.255"],
  ["46.24.0.0", "46.31.255.255"],
  ["46.33.0.0", "46.184.255.255"],
  ["46.186.0.0", "46.247.255.255"],
  ["46.249.0.0", "46.255.255.255"],
  ["77.0.0.0", "77.244.255.255"],
  ["77.246.0.0", "77.255.255.255"],
  ["78.0.0.0", "78.255.255.255"],
  ["79.0.0.0", "79.133.255.255"],
  ["79.135.0.0", "79.255.255.255"],
  ["80.0.0.0", "80.9.255.255"],
  ["80.11.0.0", "80.89.255.255"],
  ["80.91.0.0", "80.255.255.255"],
  ["81.0.0.0", "81.20.255.255"],
  ["81.22.0.0", "81.27.255.255"],
  ["81.29.0.0", "81.51.255.255"],
  ["81.53.0.0", "81.252.255.255"],
  ["81.254.0.0", "81.255.255.255"],
  ["82.0.0.0", "82.211.255.255"],
  ["82.213.0.0", "82.255.255.255"],
  ["83.0.0.0", "83.255.255.255"],
  ["84.0.0.0", "84.255.255.255"],
  ["85.0.0.0", "85.255.255.255"],
  ["86.0.0.0", "86.255.255.255"],
  ["87.0.0.0", "87.255.255.255"],
  ["88.0.0.0", "88.255.255.255"],
  ["89.0.0.0", "89.255.255.255"],
  ["90.0.0.0", "90.255.255.255"],
  ["91.0.0.0", "91.255.255.255"],
  ["92.0.0.0", "92.255.255.255"],
  ["93.0.0.0", "93.255.255.255"],
  ["94.0.0.0", "94.248.255.255"],
  ["94.250.0.0", "94.255.255.255"],
  ["95.0.0.0", "95.255.255.255"],
  ["109.0.0.0", "109.255.255.255"],
  ["176.0.0.0", "176.27.255.255"],
  ["176.30.0.0", "176.255.255.255"],
  ["178.0.0.0", "178.255.255.255"],
  ["188.0.0.0", "188.255.255.255"],
  ["213.0.0.0", "213.5.255.255"],
  ["213.7.0.0", "213.255.255.255"],
  
  // Europe
  ["51.0.0.0", "51.255.255.255"],
  ["62.0.0.0", "62.71.255.255"],
  ["62.73.0.0", "62.255.255.255"],
  
  // Americas
  ["3.0.0.0", "4.255.255.255"],
  ["8.0.0.0", "8.255.255.255"],
  ["12.0.0.0", "15.255.255.255"],
  ["23.0.0.0", "24.255.255.255"],
  ["32.0.0.0", "35.255.255.255"],
  ["64.0.0.0", "76.255.255.255"],
  ["96.0.0.0", "99.255.255.255"],
  ["128.0.0.0", "143.255.255.255"],
  ["152.0.0.0", "155.255.255.255"],
  ["160.0.0.0", "175.255.255.255"],
  ["177.0.0.0", "191.255.255.255"],
  ["198.0.0.0", "201.255.255.255"],
  ["204.0.0.0", "207.255.255.255"]
];

// ============ SESSION STATE ============
var SESSION = {
  dns: {},
  retry: {},
  stats: {fiber: 0, premium: 0, standard: 0, blocked: 0, compBlocked: 0}
};

// ============ UTILITIES ============
function norm(h) {
  var i = h.indexOf(":");
  return i > -1 ? h.substring(0, i) : h;
}

function resolve(host) {
  if (SESSION.dns[host] && Date.now() - SESSION.dns[host].t < 90000) {
    return SESSION.dns[host].ip;
  }
  var ip = dnsResolve(host);
  if (ip && ip.indexOf(":") === -1) {
    SESSION.dns[host] = {ip: ip, t: Date.now()};
    return ip;
  }
  return null;
}

function ipToLong(ip) {
  var p = ip.split('.');
  return ((+p[0] << 24) + (+p[1] << 16) + (+p[2] << 8) + (+p[3])) >>> 0;
}

function isInRange(ip, range) {
  var ipLong = ipToLong(ip);
  var startLong = ipToLong(range[0]);
  var endLong = ipToLong(range[1]);
  return ipLong >= startLong && ipLong <= endLong;
}

function isInList(ip, list) {
  for (var i = 0; i < list.length; i++) {
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  }
  return false;
}

// ============ JORDAN TIER DETECTION ============
function getJordanTier(ip) {
  for (var tierName in JORDAN_TIERS) {
    var tier = JORDAN_TIERS[tierName];
    for (var i = 0; i < tier.ranges.length; i++) {
      if (isInRange(ip, tier.ranges[i])) {
        return {
          valid: true,
          tier: tierName,
          quality: tier.quality,
          competitive: tier.competitive
        };
      }
    }
  }
  return {valid: false, tier: null, quality: 0, competitive: false};
}

// ============ MODE DETECTION ============
function detectMode(url, host) {
  var str = (url + " " + host).toLowerCase();
  
  if (/classic|erangel|miramar|sanhok|vikendi|livik|karakin/i.test(str)) {
    return "CLASSIC";
  }
  if (/arena|tdm|team.*death|warehouse|ruins|lumber|domination|gun.*game/i.test(str)) {
    return "ARENA";
  }
  if (/evo.*ground|payload|infection|rage.*gear|runic|metro/i.test(str)) {
    return "EVOGROUND";
  }
  if (/arcade|quick.*match|war.*mode|sniper|shotgun|mini.*zone/i.test(str)) {
    return "ARCADE";
  }
  if (/training|cheer.*park|practice/i.test(str)) {
    return "TRAINING";
  }
  return "UNKNOWN";
}

// ============ TRAFFIC DETECTION ============
function detectTraffic(url, host) {
  var str = (url + " " + host).toLowerCase();
  
  if (/match|battle|game.*server|combat|room.*[0-9]|session.*[0-9]|instance|gameplay|pvp|realtime|sync|tick|world.*state/i.test(str)) {
    return "MATCH";
  }
  if (/matchmak|queue|dispatch|find.*match|search.*match|region.*select|waiting.*room|ready.*check/i.test(str)) {
    return "MATCHMAKING";
  }
  if (/squad|team|party|crew|duo|trio|quad|recruit|lfg|lfm|invite.*team/i.test(str)) {
    return "TEAM";
  }
  if (/voice|audio|rtc|gvoice|microphone|speaker|all.*voice|team.*voice/i.test(str)) {
    return "VOICE";
  }
  if (/friend|social|clan|guild|presence|message|chat/i.test(str)) {
    return "SOCIAL";
  }
  if (/lobby|main.*menu|hub|entrance|gateway|home.*screen/i.test(str)) {
    return "LOBBY";
  }
  if (/anticheat|anti.*cheat|security.*check|integrity|verification|tencent.*protect|ace.*anti/i.test(str)) {
    return "ANTICHEAT";
  }
  if (/cdn|asset|resource|patch|update|download|static|content.*delivery/i.test(str)) {
    return "CDN";
  }
  return "OTHER";
}

// ============ TIME-BASED THRESHOLD ============
function getTimeThreshold() {
  var hour = new Date().getHours();
  
  // Peak hours (8 PM - 11 PM): Ultra-strict
  if (hour >= 20 && hour <= 23) {
    return {minQuality: 90, mode: "PEAK"};
  }
  
  // Day hours (12 PM - 8 PM): Moderate
  if (hour >= 12 && hour < 20) {
    return {minQuality: 70, mode: "DAY"};
  }
  
  // Night hours (12 AM - 8 AM): Relaxed
  return {minQuality: 50, mode: "NIGHT"};
}

// ============ RETRY MECHANISM ============
function shouldRetry(host, mode) {
  var key = host + "_" + mode;
  
  if (!SESSION.retry[key]) {
    SESSION.retry[key] = {count: 0, lastTime: Date.now()};
  }
  
  var retry = SESSION.retry[key];
  var now = Date.now();
  
  // Retry config per mode
  var config = {
    CLASSIC: {maxRetries: 15, delay: 3000},
    ARENA: {maxRetries: 12, delay: 2500},
    EVOGROUND: {maxRetries: 10, delay: 2000}
  }[mode] || {maxRetries: 8, delay: 2000};
  
  // Check delay
  if (now - retry.lastTime < config.delay) {
    return false;
  }
  
  // Check max
  if (retry.count >= config.maxRetries) {
    SESSION.retry[key] = {count: 0, lastTime: now};
    return false;
  }
  
  retry.count++;
  retry.lastTime = now;
  return true;
}

// ============ PROXY SELECTION ============
function selectProxy(mode, tier, traffic) {
  var config = COMPETITIVE[mode];
  
  if (config) {
    // Competitive mode routing
    if (tier.quality >= 100) {
      return config.primary + "; " + config.backup;
    }
    if (tier.quality >= 90) {
      return config.primary + "; " + config.backup + "; " + config.tertiary;
    }
  }
  
  // Casual routing
  var pool = CASUAL[mode] || CASUAL.LOBBY;
  var idx = Math.floor((Date.now() / 1000) % pool.length);
  return pool[idx];
}

// ============ MAIN ROUTING ENGINE ============
function FindProxyForURL(url, host) {
  
  host = norm(host.toLowerCase());
  
  // Fast path: Non-PUBG
  if (!/pubg|pubgm|tencent|krafton|lightspeed|levelinfinite|intlgame|proximabeta|gcloud|gvoice|qq\.com|igamecj/i.test(host)) {
    return DIRECT;
  }
  
  // Resolve IP
  var ip = resolve(host);
  if (!ip) return BLACKHOLE;
  
  // ========================================
  // PHASE 1: AGGRESSIVE BLACKLIST
  // ========================================
  
  // Priority blocks (fast exit)
  if (isInList(ip, PAKISTAN_MEGA)) {
    SESSION.stats.blocked++;
    return BLACKHOLE;
  }
  
  if (isInList(ip, EGYPT_MEGA)) {
    SESSION.stats.blocked++;
    return BLACKHOLE;
  }
  
  if (isInList(ip, AFGHANISTAN_ALL)) {
    SESSION.stats.blocked++;
    return BLACKHOLE;
  }
  
  if (isInList(ip, INDIA_MAJOR)) {
    SESSION.stats.blocked++;
    return BLACKHOLE;
  }
  
  if (isInList(ip, WORLD_MEGA)) {
    SESSION.stats.blocked++;
    return BLACKHOLE;
  }
  
  // ========================================
  // PHASE 2: JORDAN TIER CHECK
  // ========================================
  
  var tier = getJordanTier(ip);
  
  if (!tier.valid) {
    // Non-Jordan = Block
    SESSION.stats.blocked++;
    return BLACKHOLE;
  }
  
  // Update stats
  if (tier.quality >= 100) SESSION.stats.fiber++;
  else if (tier.quality >= 90) SESSION.stats.premium++;
  else SESSION.stats.standard++;
  
  // ========================================
  // PHASE 3: TRAFFIC & MODE ANALYSIS
  // ========================================
  
  var traffic = detectTraffic(url, host);
  var mode = detectMode(url, host);
  
  // ========================================
  // PHASE 4: COMPETITIVE FILTERING
  // ========================================
  
  var isCompetitive = (mode === "CLASSIC" || mode === "ARENA" || mode === "EVOGROUND");
  var isCritical = (traffic === "MATCH" || traffic === "MATCHMAKING");
  
  if (isCompetitive && isCritical) {
    
    // Get time-based threshold
    var threshold = getTimeThreshold();
    
    // Quality gate
    if (tier.quality < threshold.minQuality) {
      SESSION.stats.compBlocked++;
      
      // Retry mechanism
      if (shouldRetry(host, mode)) {
        return BLACKHOLE;
      }
      
      // Max retries reached - still block
      return BLACKHOLE;
    }
    
    // Route to competitive proxies
    return selectProxy(mode, tier, traffic);
  }
  
  // ========================================
  // PHASE 5: SPECIAL TRAFFIC
  // ========================================
  
  if (traffic === "ANTICHEAT" || traffic === "CDN") {
    return DIRECT;
  }
  
  if (traffic === "VOICE" && tier.competitive) {
    return selectProxy("ARENA", tier, traffic);
  }
  
  // ========================================
  // PHASE 6: CASUAL/DEFAULT ROUTING
  // ========================================
  
  if (mode === "ARCADE") {
    return selectProxy("ARCADE", tier, traffic);
  }
  
  if (mode === "TRAINING") {
    return selectProxy("TRAINING", tier, traffic);
  }
  
  // Default lobby routing
  return selectProxy("LOBBY", tier, traffic);
}
