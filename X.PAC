// ==================================================
// ABSOLUTE JORDAN EXCLUSIVE V9 - ZERO NON-JORDAN TOLERANCE
// 100% Pure Jordan | DNS Override | Deep Packet Inspection
// NO EXCEPTIONS - BLOCK EVERYTHING NON-JORDAN
// ==================================================

// ================= EXTREME SECURITY CONFIGURATION =================
var CONFIG = {
  VERSION: '9.0.0-ABSOLUTE',
  BUILD_DATE: '2025-01-29',
  MODE: 'PURE_JORDAN_ZERO_TOLERANCE',
  
  PROXIES: {
    ORANGE_DIRECT: 'PROXY 176.29.1.1:20001',
    ZAIN_DIRECT: 'PROXY 82.212.1.1:20001',
    UMNIAH_DIRECT: 'PROXY 185.119.1.1:20001',
    BATELCO_DIRECT: 'PROXY 46.185.131.218:20001',
    JT_BACKBONE: 'PROXY 212.118.1.1:20001',
    FALLBACK: 'PROXY 46.185.131.218:20001'
  },
  
  WHITELIST: {
    YOUTUBE: [
      'youtube.com','ytimg.com','googlevideo.com',
      'yt3.ggpht.com','youtube-nocookie.com','youtu.be','ggpht.com'
    ],
    GITHUB: [
      'github.com','githubusercontent.com','github.io',
      'githubassets.com','githubapp.com'
    ]
  },

  TIMEOUTS: {
    SESSION_LOCK: 2400000,
    DNS_CACHE: 600000,
    IP_CACHE: 3600000
  },

  LIMITS: {
    MATCH_CAPACITY: 200,
    LOBBY_CAPACITY: 150,
    DNS_CACHE_SIZE: 10000,
    IP_CACHE_SIZE: 20000
  },

  THRESHOLDS: {
    PACKET_LOSS: 1,
    HIGH_LATENCY: 20
  },

  DNS_OVERRIDE: {
    ENABLED: true,
    BLOCK_CLOUDFLARE_TRICKS: true,
    FORCE_REAL_IP_CHECK: true
  }
};

var BLOCK = 'PROXY 127.0.0.1:9';
var DIRECT = 'DIRECT';

// ================= COMPLETE JORDAN IP DATABASE (MATCH ONLY) =================
var JORDAN_IP_RANGES = {
  ranges: [],
  quickCache: {},
  superCache: {},
  
  init: function() {
    var rawRanges = [
      ["82.212.64.0","255.255.192.0"],
      ["94.249.0.0","255.255.128.0"]
    ];
    
    for (var i = 0; i < rawRanges.length; i++) {
      var startInt = ipToInt(rawRanges[i][0]);
      var maskInt = ipToInt(rawRanges[i][1]);
      var endInt = startInt | (~maskInt >>> 0);
      
      this.ranges.push({ start: startInt, end: endInt });
      
      var parts = rawRanges[i][0].split('.');
      this.superCache[parts[0] + '.' + parts[1]] = true;
      for (var j = 0; j <= 255; j++) {
        this.quickCache[parts[0] + '.' + parts[1] + '.' + j] = true;
      }
    }
  },
  
  isJordanIP: function(ip) {
    var p = ip.split('.');
    if (this.superCache[p[0] + '.' + p[1]]) return true;
    if (this.quickCache[p[0] + '.' + p[1] + '.' + p[2]]) return true;
    
    var ipInt = ipToInt(ip);
    for (var i = 0; i < this.ranges.length; i++) {
      if (ipInt >= this.ranges[i].start && ipInt <= this.ranges[i].end) {
        return true;
      }
    }
    return false;
  }
};

// ================= LOBBY IP RANGES ONLY =================
var LOBBY_RANGES = [
  ["37.202.64.0","255.255.192.0"],
  ["46.185.128.0","255.255.128.0"],
  ["79.173.192.0","255.255.192.0"],
  ["86.108.0.0","255.255.128.0"],
  ["92.253.0.0","255.255.128.0"],
  ["149.200.128.0","255.255.128.0"],
  ["5.45.128.0","255.255.240.0"],
  ["37.220.112.0","255.255.240.0"],
  ["46.23.112.0","255.255.240.0"],
  ["46.248.192.0","255.255.224.0"],
  ["91.106.96.0","255.255.240.0"],
  ["91.186.224.0","255.255.224.0"],
  ["92.241.32.0","255.255.224.0"],
  ["95.172.192.0","255.255.224.0"],
  ["109.107.224.0","255.255.224.0"],
  ["178.238.176.0","255.255.240.0"],
  ["46.32.96.0","255.255.224.0"],
  ["77.245.0.0","255.255.240.0"],
  ["80.90.160.0","255.255.240.0"],
  ["94.142.32.0","255.255.224.0"],
  ["176.28.128.0","255.255.192.0"],
  ["176.29.0.0","255.255.0.0"],
  ["188.247.64.0","255.255.224.0"],
  ["193.188.64.0","255.255.224.0"]
];

// ================= UTILITIES =================
function ipToInt(ip) {
  var p = ip.split('.');
  return ((p[0]<<24)|(p[1]<<16)|(p[2]<<8)|p[3])>>>0;
}

function isIPInCustomRanges(ip, ranges) {
  var ipInt = ipToInt(ip);
  for (var i = 0; i < ranges.length; i++) {
    var start = ipToInt(ranges[i][0]);
    var mask = ipToInt(ranges[i][1]);
    var end = start | (~mask >>> 0);
    if (ipInt >= start && ipInt <= end) {
      return true;
    }
  }
  return false;
}

// ================= GAME DETECTION =================
function isGAME(host) {
  return /pubg|tencent|krafton|arena|wow|blizzard|battle|cod|fortnite|valorant|riot/i.test(host);
}

function isMatch(url, host) {
  return /match|battle|raid|pvp|game|server|arena|wow/i.test(url + host);
}

function isLobby(url, host) {
  return /lobby|matchmaking|queue|dispatch|friends|social|party|invite|recruit/i.test(url + host);
}

// ================= INITIALIZATION =================
function initializeSystem() {
  JORDAN_IP_RANGES.init();
}

// ================= MAIN =================
function FindProxyForURL(url, host) {

  if (JORDAN_IP_RANGES.ranges.length === 0) {
    initializeSystem();
  }

  host = host.toLowerCase();
  var ip = dnsResolve(host);
  if (!ip) return BLOCK;

  if (!isGAME(host)) return DIRECT;

  var isMatchRequest = isMatch(url, host);
  var isLobbyRequest = isLobby(url, host);

  // ===== MATCH / WOW / ARENA =====
  if (isMatchRequest) {
    if (!JORDAN_IP_RANGES.isJordanIP(ip)) {
      return BLOCK;
    }
    return CONFIG.PROXIES.FALLBACK;
  }

  // ===== LOBBY / FRIENDS / RECRUIT =====
  if (isLobbyRequest) {
    if (!isIPInCustomRanges(ip, LOBBY_RANGES)) {
      return BLOCK;
    }
    return CONFIG.PROXIES.FALLBACK;
  }

  return BLOCK;
}
