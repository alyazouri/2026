// ==========================================
// 🇯🇴 PUBG MOBILE - ADAPTIVE JORDAN-ONLY SYSTEM
// Mode-Based Strictness + Matchmaking Loop Force
// ==========================================

// ============ PROXY INFRASTRUCTURE ============
var PROXY = {
  // Ultra-strict match servers (Jordan backbone only)
  MATCH_STRICT: [
    "PROXY 46.185.131.218:20001",      // Orange Primary Amman
    "PROXY 213.6.100.50:20001",        // Fiber Primary Amman
    "PROXY 176.29.50.100:20001"        // Orange Secondary
  ],
  
  // Moderate (allows retry)
  MATCH_MODERATE: [
    "PROXY 46.185.131.218:20002",      // Orange Retry Server
    "PROXY 176.28.200.10:20002",       // Orange Fallback
    "PROXY 37.202.80.20:20002"         // Zain Backup
  ],
  
  // Lobby & Social
  LOBBY: [
    "PROXY 46.185.140.10:8080",
    "PROXY 176.29.15.20:8080",
    "PROXY 213.6.80.40:8080"
  ]
};

var BLACKHOLE = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ============ JORDAN WHITELIST - COMPLETE ============
var JORDAN_IP = [
  // Orange (أكبر ISP)
  ["46.185.128.0", "46.185.255.255"],
  ["176.28.128.0", "176.28.255.255"],
  ["176.29.0.0", "176.29.255.255"],
  ["82.212.64.0", "82.212.127.255"],
  
  // Zain
  ["37.202.64.0", "37.202.127.255"],
  ["185.4.16.0", "185.4.19.255"],
  ["185.20.200.0", "185.20.203.255"],
  
  // Umniah
  ["31.44.0.0", "31.44.255.255"],
  ["94.249.0.0", "94.249.127.255"],
  ["185.96.84.0", "185.96.87.255"],
  
  // Fiber & Premium
  ["213.6.0.0", "213.6.255.255"],
  ["5.45.128.0", "5.45.143.255"],
  
  // Government & Universities
  ["80.10.8.0", "80.10.39.255"],
  ["62.72.160.0", "62.72.191.255"],
  ["185.118.4.0", "185.118.7.255"],
  
  // Secondary ISPs (Complete List)
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
  ["80.10.48.0", "80.10.79.255"],
  ["80.10.144.0", "80.10.175.255"],
  ["80.10.168.0", "80.10.175.255"],
  ["80.90.160.0", "80.90.175.255"],
  ["81.21.0.0", "81.21.0.255"],
  ["81.21.8.0", "81.21.15.255"],
  ["81.28.112.0", "81.28.127.255"],
  ["81.52.144.0", "81.52.159.255"],
  ["81.52.224.0", "81.52.231.255"],
  ["81.253.96.0", "81.253.99.255"],
  ["81.253.240.0", "81.253.255.255"],
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
];

// ============ PAKISTAN ULTRA-PRECISE BLOCK ============
var PAKISTAN_BLOCK = [
  // PTCL (Pakistan Telecom) - أكبر ISP
  ["39.32.0.0", "39.63.255.255"],          // PTCL Main /11 (2.1M IPs)
  ["175.107.0.0", "175.107.255.255"],      // PTCL Extended
  ["180.149.0.0", "180.149.255.255"],      // PTCL Fiber
  ["202.163.64.0", "202.163.127.255"],     // PTCL Corporate
  
  // Mobilink/Jazz (أكبر شركة موبايل)
  ["111.68.0.0", "111.119.255.255"],       // Jazz Main /10 (3.3M IPs)
  ["115.42.0.0", "115.42.255.255"],        // Jazz Extended
  ["119.152.0.0", "119.159.255.255"],      // Jazz 4G /13
  ["180.178.128.0", "180.178.255.255"],    // Jazz LTE
  
  // Telenor Pakistan
  ["110.36.0.0", "110.39.255.255"],        // Telenor Main /14
  ["175.110.0.0", "175.110.255.255"],      // Telenor Extended
  ["180.92.0.0", "180.92.255.255"],        // Telenor 4G
  
  // Zong (China Mobile Pakistan)
  ["115.160.0.0", "115.186.255.255"],      // Zong Main /11
  ["125.209.64.0", "125.209.127.255"],     // Zong Extended
  
  // Ufone
  ["223.29.192.0", "223.29.255.255"],      // Ufone Main
  ["180.149.128.0", "180.149.255.255"],    // Ufone 4G
  
  // Cybernet (Major ISP)
  ["110.36.0.0", "110.39.255.255"],        // Cybernet /14
  ["202.142.128.0", "202.142.255.255"],    // Cybernet Corporate
  
  // Nayatel (Fiber ISP)
  ["58.27.0.0", "58.27.255.255"],          // Nayatel Main
  ["202.141.224.0", "202.141.255.255"],    // Nayatel Extended
  
  // Wateen Telecom
  ["180.92.0.0", "180.95.255.255"],        // Wateen /14
  ["203.124.32.0", "203.124.63.255"],      // Wateen Corporate
  
  // Wi-tribe (Wireless ISP)
  ["119.73.0.0", "119.73.255.255"],        // Wi-tribe
  ["202.69.0.0", "202.69.127.255"],        // Wi-tribe Extended
  
  // LinkDotNet Pakistan
  ["203.80.0.0", "203.80.255.255"],        // LinkDotNet
  ["202.83.160.0", "202.83.191.255"],      // LinkDotNet Extended
  
  // StormFiber
  ["103.244.172.0", "103.244.175.255"],    // StormFiber
  ["182.176.0.0", "182.176.255.255"],      // StormFiber Extended
  
  // Multinet
  ["103.240.0.0", "103.240.255.255"],      // Multinet
  ["119.160.0.0", "119.160.255.255"],      // Multinet Extended
  
  // Pakistan ISPs Pool
  ["103.11.0.0", "103.11.255.255"],        // PK ISP Pool 1
  ["103.18.0.0", "103.18.255.255"],        // PK ISP Pool 2
  ["103.24.96.0", "103.24.127.255"],       // PK ISP Pool 3
  ["103.31.100.0", "103.31.103.255"],      // PK ISP Pool 4
  ["103.49.68.0", "103.49.71.255"],        // PK ISP Pool 5
  ["103.53.44.0", "103.53.47.255"],        // PK ISP Pool 6
  ["103.255.4.0", "103.255.7.255"],        // PK ISP Pool 7
  
  // Additional Pakistan Ranges
  ["27.0.0.0", "27.7.255.255"],            // PK Additional /13
  ["36.255.0.0", "36.255.255.255"],        // PK Edge
  ["101.50.64.0", "101.50.127.255"],       // PK Networks
  ["103.4.92.0", "103.4.95.255"],          // PK Cloud
  ["103.5.136.0", "103.5.139.255"],        // PK Data Centers
  ["103.8.112.0", "103.8.115.255"],        // PK Hosting
  ["103.26.80.0", "103.26.83.255"],        // PK ISPs
  ["103.28.150.0", "103.28.151.255"],      // PK Networks
  ["103.31.100.0", "103.31.103.255"],      // PK Extended
  ["103.47.144.0", "103.47.147.255"],      // PK Cloud
  ["103.53.44.0", "103.53.47.255"],        // PK ISPs
  ["103.55.136.0", "103.55.139.255"],      // PK Networks
  ["103.57.152.0", "103.57.155.255"],      // PK ISPs
  ["103.63.132.0", "103.63.135.255"],      // PK Cloud
  ["103.92.92.0", "103.92.95.255"],        // PK Data
  ["103.244.172.0", "103.244.175.255"],    // PK Fiber
  ["116.0.0.0", "116.127.255.255"],        // PK Mega Block /9
  ["117.20.0.0", "117.21.255.255"],        // PK Networks
  ["119.30.0.0", "119.31.255.255"],        // PK Extended
  ["119.73.0.0", "119.73.255.255"],        // PK Wireless
  ["120.29.0.0", "120.29.255.255"],        // PK ISPs
  ["121.46.0.0", "121.46.255.255"],        // PK Networks
  ["122.129.0.0", "122.129.255.255"],      // PK ISPs
  ["139.5.0.0", "139.5.255.255"],          // PK Networks
  ["182.176.0.0", "182.191.255.255"],      // PK Mega /12
  ["202.47.0.0", "202.47.255.255"],        // PK Networks
  ["202.69.0.0", "202.69.255.255"],        // PK ISPs
  ["202.83.160.0", "202.83.191.255"],      // PK Corporate
  ["202.141.224.0", "202.141.255.255"],    // PK Extended
  ["202.142.128.0", "202.142.255.255"],    // PK Networks
  ["202.163.64.0", "202.163.127.255"],     // PK Corporate
  ["203.80.0.0", "203.81.255.255"],        // PK Networks /15
  ["203.124.32.0", "203.124.63.255"],      // PK Corporate
  ["203.128.0.0", "203.135.255.255"],      // PK Mega /13
  ["218.100.0.0", "218.100.255.255"],      // PK Edge
  ["221.120.192.0", "221.120.255.255"]     // PK Extended
];

// ============ EGYPT NUCLEAR BLOCK ============
var EGYPT_BLOCK = [
  // TE Data (Egyptian Company for Data)
  ["41.32.0.0", "41.47.255.255"],          // TE Data Main /12 (1M IPs)
  ["156.160.0.0", "156.163.255.255"],      // TE Data Extended
  ["196.128.0.0", "196.207.255.255"],      // TE Data Mega /11 (5M IPs)
  ["197.32.0.0", "197.63.255.255"],        // TE Data Additional /11 (2M)
  
  // Vodafone Egypt
  ["41.64.0.0", "41.79.255.255"],          // Vodafone Main /12 (1M IPs)
  ["196.218.0.0", "196.219.255.255"],      // Vodafone Extended
  
  // Orange Egypt
  ["41.128.0.0", "41.143.255.255"],        // Orange EG Main /12 (1M IPs)
  ["196.219.0.0", "196.219.255.255"],      // Orange EG Extended
  
  // Etisalat Egypt
  ["41.176.0.0", "41.191.255.255"],        // Etisalat Main /12 (1M IPs)
  ["156.164.0.0", "156.167.255.255"],      // Etisalat Extended
  
  // WE (Egyptian Telecom)
  ["41.192.0.0", "41.223.255.255"],        // WE Main /11 (2M IPs)
  ["196.133.0.0", "196.135.255.255"],      // WE Extended
  
  // Noor ISP
  ["41.232.0.0", "41.239.255.255"],        // Noor Main
  ["196.205.0.0", "196.205.255.255"],      // Noor Extended
  
  // LINKdotNET Egypt
  ["196.219.128.0", "196.219.255.255"],    // LinkDotNet
  ["197.48.0.0", "197.63.255.255"],        // LinkDotNet Extended /12
  
  // Egypt Mega Blocks
  ["102.36.0.0", "102.39.255.255"],        // Egypt Cloud /14
  ["102.44.0.0", "102.47.255.255"],        // Egypt ISPs /14
  ["154.32.0.0", "154.63.255.255"],        // Egypt Mobile /11 (2M)
  ["160.176.0.0", "160.191.255.255"],      // Egypt Data /12 (1M)
  ["196.136.0.0", "196.207.255.255"],      // Egypt Mega /10 (4M)
  ["197.32.0.0", "197.63.255.255"]         // Egypt Additional /11 (2M)
];

// ============ AFGHANISTAN PRECISION BLOCK ============
var AFGHANISTAN_BLOCK = [
  ["27.116.0.0", "27.116.255.255"],        // Afghan Telecom
  ["43.224.236.0", "43.224.239.255"],      // Roshan
  ["103.5.136.0", "103.5.139.255"],        // AWCC
  ["103.9.172.0", "103.9.175.255"],        // Afghan Wireless
  ["103.10.28.0", "103.10.31.255"],        // Etisalat AF
  ["103.14.196.0", "103.14.199.255"],      // Salaam
  ["103.16.68.0", "103.16.71.255"],        // Afghan ISPs
  ["103.31.100.0", "103.31.103.255"],      // Afghan Networks
  ["103.39.80.0", "103.39.83.255"],        // Afghan Cloud
  ["103.245.140.0", "103.245.143.255"],    // Afghan Data
  ["103.254.156.0", "103.254.159.255"],    // Afghan ISPs
  ["119.160.96.0", "119.160.127.255"],     // Afghan Networks /19
  ["149.54.0.0", "149.54.255.255"],        // Afghan Extended /16
  ["175.107.192.0", "175.107.255.255"],    // Afghan ISPs
  ["180.94.64.0", "180.94.95.255"],        // Afghan Mobile /19
  ["182.56.0.0", "182.56.255.255"],        // Afghan Networks
  ["202.4.173.0", "202.4.173.255"],        // Afghan Corporate
  ["203.133.0.0", "203.133.255.255"]       // Afghan Extended
];

// ============ INDIA BLOCK (بيجوا كثير) ============
var INDIA_BLOCK = [
  // Major Indian ISPs
  ["14.0.0.0", "14.255.255.255"],          // BSNL India /8
  ["27.0.0.0", "27.15.255.255"],           // India Networks /12
  ["49.32.0.0", "49.47.255.255"],          // India ISPs /12
  ["103.0.0.0", "103.127.255.255"],        // India Cloud /9 (8M IPs)
  ["106.192.0.0", "106.223.255.255"],      // Reliance Jio /11
  ["110.224.0.0", "110.255.255.255"],      // India ISPs /11
  ["117.192.0.0", "117.223.255.255"],      // Airtel India /11
  ["122.160.0.0", "122.191.255.255"],      // India Networks /11
  ["182.64.0.0", "182.95.255.255"],        // India Mega /11
  ["183.82.0.0", "183.83.255.255"]         // India ISPs /15
];

// ============ REST OF WORLD - MEGA BLOCKS ============
var WORLD_BLOCK = [
  // China Complete
  ["1.0.0.0", "1.255.255.255"],
  ["14.0.0.0", "14.255.255.255"],
  ["36.0.0.0", "36.255.255.255"],
  ["42.0.0.0", "42.255.255.255"],
  ["58.0.0.0", "61.255.255.255"],
  ["101.0.0.0", "106.255.255.255"],
  ["110.0.0.0", "125.255.255.255"],
  ["180.0.0.0", "183.255.255.255"],
  ["202.0.0.0", "202.255.255.255"],
  ["210.0.0.0", "211.255.255.255"],
  ["218.0.0.0", "223.255.255.255"],
  
  // Russia Complete (excluding Jordan)
  ["5.0.0.0", "5.44.255.255"],
  ["5.46.0.0", "5.197.255.255"],
  ["5.199.0.0", "5.199.183.255"],
  ["5.199.188.0", "5.255.255.255"],
  ["31.0.0.0", "31.43.255.255"],
  ["31.45.0.0", "31.255.255.255"],
  ["37.0.0.0", "37.16.255.255"],
  ["37.18.0.0", "37.201.255.255"],
  ["37.203.0.0", "37.255.255.255"],
  ["46.0.0.0", "46.184.255.255"],
  ["46.186.0.0", "46.255.255.255"],
  ["77.0.0.0", "77.244.255.255"],
  ["78.0.0.0", "78.255.255.255"],
  ["79.0.0.0", "79.133.255.255"],
  ["83.0.0.0", "93.255.255.255"],
  ["95.0.0.0", "95.255.255.255"],
  ["109.0.0.0", "109.255.255.255"],
  ["176.0.0.0", "176.27.255.255"],
  ["178.0.0.0", "178.255.255.255"],
  ["188.0.0.0", "188.255.255.255"],
  
  // Europe
  ["51.0.0.0", "51.255.255.255"],
  
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
  ["198.0.0.0", "199.255.255.255"],
  ["200.0.0.0", "201.255.255.255"],
  ["204.0.0.0", "207.255.255.255"]
];

// ============ SESSION STATE ============
var SESSION = {
  dns: {},
  mode: {},
  retries: {},
  stats: {
    jo: 0,
    pk: 0,
    eg: 0,
    af: 0,
    in: 0,
    other: 0
  }
};

// ============ UTILITIES ============
function norm(h) {
  var i = h.indexOf(":");
  return i > -1 ? h.substring(0, i) : h;
}

function resolve(host) {
  if (SESSION.dns[host] && Date.now() - SESSION.dns[host].t < 120000) {
    return SESSION.dns[host].ip;
  }
  var ip = dnsResolve(host);
  if (ip && ip.indexOf(":") === -1) {
    SESSION.dns[host] = {ip: ip, t: Date.now()};
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

function isJordan(ip) {
  return isInList(ip, JORDAN_IP);
}

// ============ GAME MODE DETECTION ============
function detectGameMode(url, host) {
  var str = (url + " " + host).toLowerCase();
  
  // Classic Mode (أصرم شي)
  if (/classic|erangel|miramar|sanhok|vikendi/i.test(str)) {
    return "CLASSIC";
  }
  
  // Arena (صارم)
  if (/arena|tdm|team.*death|warehouse|ruins|lumber|domination/i.test(str)) {
    return "ARENA";
  }
  
  // Arcade (صارم شوي)
  if (/arcade|quick.*match|war.*mode|sniper.*training|shotgun/i.test(str)) {
    return "ARCADE";
  }
  
  // EvoGround (متوسط)
  if (/evo.*ground|payload|infection|rage.*gear|runic.*power/i.test(str)) {
    return "EVOGROUND";
  }
  
  // Training (عادي)
  if (/training|cheer.*park|practice/i.test(str)) {
    return "TRAINING";
  }
  
  return "UNKNOWN";
}

// ============ TRAFFIC TYPE DETECTION ============
function detectTraffic(url, host) {
  var str = (url + " " + host).toLowerCase();
  
  // Match Server
  if (/match|battle|game.*server|combat|room|session|instance|gameplay|pvp|realtime|sync|tick/i.test(str)) {
    return "MATCH";
  }
  
  // Matchmaking
  if (/matchmak|queue|dispatch|find.*match|search.*match|region.*select|waiting/i.test(str)) {
    return "MATCHMAKING";
  }
  
  // Team/Squad
  if (/squad|team|party|crew|duo|trio|recruit|lfg|player.*search/i.test(str)) {
    return "TEAM";
  }
  
  // Social
  if (/friend|social|clan|guild|invite|presence|message|chat/i.test(str)) {
    return "SOCIAL";
  }
  
  // Voice
  if (/voice|audio|rtc|gvoice|microphone/i.test(str)) {
    return "VOICE";
  }
  
  // Lobby
  if (/lobby|main.*menu|hub|entrance|gateway/i.test(str)) {
    return "LOBBY";
  }
  
  // Anti-cheat
  if (/anticheat|security.*check|integrity|verify/i.test(str)) {
    return "ANTICHEAT";
  }
  
  // CDN
  if (/cdn|asset|resource|patch|update|download/i.test(str)) {
    return "CDN";
  }
  
  return "OTHER";
}

// ============ STRICTNESS LEVELS ============
var STRICTNESS = {
  CLASSIC: {
    name: "CLASSIC",
    jordanOnly: true,
    maxRetries: 15,        // يفضل يستنى 15 محاولة
    retryDelay: 3000,      // 3 ثواني بين كل محاولة
    allowFallback: false   // ما يسمح fallback أبداً
  },
  
  ARENA: {
    name: "ARENA",
    jordanOnly: true,
    maxRetries: 12,
    retryDelay: 2500,
    allowFallback: false
  },
  
  ARCADE: {
    name: "ARCADE",
    jordanOnly: true,
    maxRetries: 10,
    retryDelay: 2000,
    allowFallback: false
  },
  
  EVOGROUND: {
    name: "EVOGROUND",
    jordanOnly: true,
    maxRetries: 8,
    retryDelay: 2000,
    allowFallback: false
  },
  
  TRAINING: {
    name: "TRAINING",
    jordanOnly: false,      // Training ممكن يكون عادي
    maxRetries: 3,
    retryDelay: 1000,
    allowFallback: true
  },
  
  DEFAULT: {
    name: "DEFAULT",
    jordanOnly: true,
    maxRetries: 10,
    retryDelay: 2000,
    allowFallback: false
  }
};

// ============ RETRY MECHANISM ============
function handleRetry(host, mode) {
  var key = host + "_" + mode;
  
  if (!SESSION.retries[key]) {
    SESSION.retries[key] = {
      count: 0,
      lastAttempt: Date.now()
    };
  }
  
  var retry = SESSION.retries[key];
  var now = Date.now();
  var config = STRICTNESS[mode] || STRICTNESS.DEFAULT;
  
  // Check if enough time passed
  if (now - retry.lastAttempt < config.retryDelay) {
    return false;  // Too soon
  }
  
  // Increment retry count
  retry.count++;
  retry.lastAttempt = now;
  
  // Check max retries
  if (retry.count >= config.maxRetries) {
    // Reset and allow fallback if configured
    SESSION.retries[key] = {count: 0, lastAttempt: now};
    return config.allowFallback;
  }
  
  return false;  // Keep retrying
}

// ============ MAIN ROUTING ENGINE ============
function FindProxyForURL(url, host) {
  
  host = norm(host.toLowerCase());
  
  // Non-PUBG traffic
  if (!/pubg|pubgm|tencent|krafton|lightspeed|levelinfinite|intlgame|proximabeta|gcloud|gvoice/i.test(host)) {
    return DIRECT;
  }
  
  // Resolve IP
  var ip = resolve(host);
  if (!ip) return BLACKHOLE;
  
  // ========================================
  // PHASE 1: IDENTIFY TRAFFIC & MODE
  // ========================================
  var traffic = detectTraffic(url, host);
  var mode = detectGameMode(url, host);
  
  // ========================================
  // PHASE 2: JORDAN CHECK
  // ========================================
  if (isJordan(ip)) {
    SESSION.stats.jo++;
    
    // Route based on traffic type
    switch(traffic) {
      case "MATCH":
        // Get strictness config
        var config = STRICTNESS[mode] || STRICTNESS.DEFAULT;
        
        // Use strict proxies
        var pool = PROXY.MATCH_STRICT;
        return pool[0] + "; " + pool[1] + "; " + pool[2];
      
      case "MATCHMAKING":
        // Matchmaking uses moderate proxies (allows retry)
        var pool = PROXY.MATCH_MODERATE;
        return pool[0] + "; " + pool[1] + "; " + pool[2];
      
      case "ANTICHEAT":
      case "CDN":
        return DIRECT;
      
      default:
        return PROXY.LOBBY[0] + "; " + PROXY.LOBBY[1];
    }
  }
  
  // ========================================
  // PHASE 3: AGGRESSIVE COUNTRY BLOCKING
  // ========================================
  
  // Pakistan - Priority 1
  if (isInList(ip, PAKISTAN_BLOCK)) {
    SESSION.stats.pk++;
    return BLACKHOLE;
  }
  
  // Egypt - Priority 2
  if (isInList(ip, EGYPT_BLOCK)) {
    SESSION.stats.eg++;
    return BLACKHOLE;
  }
  
  // Afghanistan - Priority 3
  if (isInList(ip, AFGHANISTAN_BLOCK)) {
    SESSION.stats.af++;
    return BLACKHOLE;
  }
  
  // India - Priority 4
  if (isInList(ip, INDIA_BLOCK)) {
    SESSION.stats.in++;
    return BLACKHOLE;
  }
  
  // Rest of World
  if (isInList(ip, WORLD_BLOCK)) {
    SESSION.stats.other++;
    return BLACKHOLE;
  }
  
  // ========================================
  // PHASE 4: FALLBACK CONTROL
  // ========================================
  
  // Check if this is critical traffic
  if (traffic === "MATCH" || traffic === "MATCHMAKING") {
    var config = STRICTNESS[mode] || STRICTNESS.DEFAULT;
    
    if (config.jordanOnly) {
      // Check retry mechanism
      var allowFallback = handleRetry(host, mode);
      
      if (!allowFallback) {
        // Force retry by blocking
        return BLACKHOLE;
      }
    }
  }
  
  // ========================================
  // PHASE 5: DEFAULT DENY
  // ========================================
  SESSION.stats.other++;
  return BLACKHOLE;
}

// ============ DEBUG FUNCTION ============
function getSessionStats() {
  return "JO:" + SESSION.stats.jo + 
         " PK:" + SESSION.stats.pk + 
         " EG:" + SESSION.stats.eg + 
         " AF:" + SESSION.stats.af + 
         " IN:" + SESSION.stats.in + 
         " Other:" + SESSION.stats.other;
}
