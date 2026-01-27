// ==========================================
// 🇯🇴 PUBG MOBILE - NUCLEAR ISOLATION
// ABSOLUTE JORDAN LOCKDOWN
// Zero Tolerance - No Exceptions
// ==========================================

// ============ SINGLE PROXY - MAXIMUM CONTROL ============
var JORDAN_PROXY = "PROXY 46.185.131.218:20001";
var BLACKHOLE = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ============ JORDAN WHITELIST - EVERY SINGLE IP ============
var JORDAN_ONLY = [
  // Orange - Complete
  ["46.185.128.0", "46.185.255.255"],
  ["176.28.128.0", "176.28.255.255"],
  ["176.29.0.0", "176.29.255.255"],
  ["82.212.64.0", "82.212.127.255"],
  
  // Zain - Complete
  ["37.202.64.0", "37.202.127.255"],
  ["185.4.16.0", "185.4.19.255"],
  ["185.20.200.0", "185.20.203.255"],
  
  // Umniah - Complete
  ["31.44.0.0", "31.44.255.255"],
  ["94.249.0.0", "94.249.127.255"],
  ["185.96.84.0", "185.96.87.255"],
  
  // Batelco/Fiber
  ["213.6.0.0", "213.6.255.255"],
  ["5.45.128.0", "5.45.143.255"],
  
  // Government & University
  ["80.10.8.0", "80.10.79.255"],
  ["62.72.160.0", "62.72.191.255"],
  ["185.118.4.0", "185.118.7.255"],
  
  // ALL Other Jordan Ranges
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
];

// ============ TENCENT SERVERS - MUST BE JORDAN ============
var TENCENT_DOMAINS = [
  "pubgmobile.com",
  "pubgm.com",
  "proximabeta.com",
  "intlgame.com",
  "tencent.com",
  "qq.com",
  "igamecj.com",
  "gcloud.qq.com",
  "gvoice.qq.com",
  "lightspeed.com",
  "krafton.com",
  "levelinfinite.com",
  "anticheatexpert.com"
];

// ============ SESSION ============
var SESSION = {
  cache: {},
  blocked: 0,
  allowed: 0
};

// ============ CORE FUNCTIONS ============
function norm(h) {
  var i = h.indexOf(":");
  return i > -1 ? h.substring(0, i) : h;
}

function resolve(host) {
  if (SESSION.cache[host] && Date.now() - SESSION.cache[host].t < 60000) {
    return SESSION.cache[host].ip;
  }
  var ip = dnsResolve(host);
  if (ip && ip.indexOf(":") === -1) {
    SESSION.cache[host] = {ip: ip, t: Date.now()};
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

function isTencentDomain(host) {
  for (var i = 0; i < TENCENT_DOMAINS.length; i++) {
    if (host.indexOf(TENCENT_DOMAINS[i]) > -1) return true;
  }
  return false;
}

function isJordan(ip) {
  return isInList(ip, JORDAN_ONLY);
}

// ============ TRAFFIC DETECTION ============
function isCriticalTraffic(url, host) {
  var str = (url + " " + host).toLowerCase();
  
  // Match servers
  if (/match|battle|game.*server|combat|room|session|instance|gameplay|pvp|realtime|sync|tick/i.test(str)) {
    return true;
  }
  
  // Matchmaking
  if (/matchmak|queue|dispatch|find.*match|search.*match|region|waiting/i.test(str)) {
    return true;
  }
  
  // Team/Squad
  if (/squad|team|party|crew|recruit|lfg/i.test(str)) {
    return true;
  }
  
  // Voice
  if (/voice|audio|rtc|gvoice/i.test(str)) {
    return true;
  }
  
  return false;
}

function isAntiCheat(url, host) {
  var str = (url + " " + host).toLowerCase();
  return /anticheat|security.*check|integrity|verify/i.test(str);
}

function isCDN(url, host) {
  var str = (url + " " + host).toLowerCase();
  return /cdn|asset|resource|patch|update|download|static/i.test(str);
}

// ============ MAIN ROUTING - NUCLEAR POLICY ============
function FindProxyForURL(url, host) {
  
  host = norm(host.toLowerCase());
  
  // ========================================
  // PHASE 1: IDENTIFY PUBG TRAFFIC
  // ========================================
  
  var isPUBG = isTencentDomain(host);
  
  if (!isPUBG) {
    // Non-PUBG = Allow direct
    return DIRECT;
  }
  
  // ========================================
  // PHASE 2: RESOLVE IP
  // ========================================
  
  var ip = resolve(host);
  
  if (!ip) {
    // Can't resolve = BLOCK
    SESSION.blocked++;
    return BLACKHOLE;
  }
  
  // ========================================
  // PHASE 3: JORDAN CHECK
  // ========================================
  
  if (!isJordan(ip)) {
    // NON-JORDAN = ABSOLUTE BLOCK
    SESSION.blocked++;
    return BLACKHOLE;
  }
  
  // It's Jordan!
  SESSION.allowed++;
  
  // ========================================
  // PHASE 4: TRAFFIC ROUTING
  // ========================================
  
  // Anti-cheat must be direct (avoid detection)
  if (isAntiCheat(url, host)) {
    return DIRECT;
  }
  
  // CDN can be direct (faster downloads)
  if (isCDN(url, host)) {
    return DIRECT;
  }
  
  // Critical traffic (Match/Matchmaking/Team/Voice)
  if (isCriticalTraffic(url, host)) {
    // Force through Jordan proxy
    return JORDAN_PROXY;
  }
  
  // Everything else - proxy
  return JORDAN_PROXY;
}
