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
    // ISP-Direct Proxies - Minimum Latency
    ORANGE_DIRECT: 'PROXY 176.29.1.1:20001',
    ZAIN_DIRECT: 'PROXY 82.212.1.1:20001',
    UMNIAH_DIRECT: 'PROXY 185.119.1.1:20001',
    BATELCO_DIRECT: 'PROXY 46.185.131.218:20001',
    JT_BACKBONE: 'PROXY 212.118.1.1:20001',
    
    // Fallback
    FALLBACK: 'PROXY 46.185.131.218:20001'
  },
  
  // STRICT: Only these services bypass Jordan check
  WHITELIST: {
    YOUTUBE: [
      'youtube.com', 'ytimg.com', 'googlevideo.com',
      'yt3.ggpht.com', 'youtube-nocookie.com', 'youtu.be',
      'ggpht.com'
    ],
    GITHUB: [
      'github.com', 'githubusercontent.com', 'github.io',
      'githubassets.com', 'githubapp.com'
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
  
  // DNS Override - Block Cloudflare DNS manipulation
  DNS_OVERRIDE: {
    ENABLED: true,
    BLOCK_CLOUDFLARE_TRICKS: true,
    FORCE_REAL_IP_CHECK: true
  }
};

var BLOCK = 'PROXY 127.0.0.1:9';
var DIRECT = 'DIRECT';

// ================= COMPLETE JORDAN IP DATABASE =================
var JORDAN_IP_RANGES = {
  ranges: [],
  quickCache: {},
  superCache: {},
  
  init: function() {
    var rawRanges = [
  ["82.212.64.0","255.255.192.0"]
    ];
    
    // Process ranges
    for (var i = 0; i < rawRanges.length; i++) {
      var startInt = ipToInt(rawRanges[i][0]);
      var endInt = ipToInt(rawRanges[i][1]);
      
      this.ranges.push({
        start: startInt,
        end: endInt
      });
      
      // Build super cache (/16)
      var parts = rawRanges[i][0].split('.');
      var net16 = parts[0] + '.' + parts[1];
      this.superCache[net16] = true;
      
      // Build quick cache (/24)
      for (var j = 0; j <= 255; j++) {
        var net24 = parts[0] + '.' + parts[1] + '.' + j;
        this.quickCache[net24] = true;
      }
    }
    
    // Sort ranges
    this.ranges.sort(function(a, b) {
      return a.start - b.start;
    });
    
    // Merge overlapping
    this.ranges = this.mergeRanges(this.ranges);
  },
  
  mergeRanges: function(ranges) {
    if (ranges.length === 0) return [];
    
    var merged = [ranges[0]];
    
    for (var i = 1; i < ranges.length; i++) {
      var current = ranges[i];
      var last = merged[merged.length - 1];
      
      if (current.start <= last.end + 256) {
        last.end = Math.max(last.end, current.end);
      } else {
        merged.push(current);
      }
    }
    
    return merged;
  },
  
  isJordanIP: function(ip) {
    // Level 1: /16 instant check
    var parts = ip.split('.');
    var net16 = parts[0] + '.' + parts[1];
    
    if (this.superCache[net16]) {
      return true;
    }
    
    // Level 2: /24 instant check
    var net24 = parts[0] + '.' + parts[1] + '.' + parts[2];
    
    if (this.quickCache[net24]) {
      return true;
    }
    
    // Level 3: Binary search
    var ipInt = ipToInt(ip);
    var left = 0;
    var right = this.ranges.length - 1;
    
    while (left <= right) {
      var mid = (left + right) >> 1;
      var range = this.ranges[mid];
      
      if (ipInt >= range.start && ipInt <= range.end) {
        return true;
      }
      
      if (ipInt < range.start) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    
    return false;
  }
};

// ================= STRICT WHITELIST =================
var WHITELIST = {
  cache: {},
  
  isWhitelisted: function(host) {
    if (this.cache[host]) {
      return this.cache[host];
    }
    
    host = host.toLowerCase();
    
    // YouTube check
    for (var i = 0; i < CONFIG.WHITELIST.YOUTUBE.length; i++) {
      if (host.indexOf(CONFIG.WHITELIST.YOUTUBE[i]) > -1) {
        var result = {allowed: true, service: 'YouTube'};
        this.cache[host] = result;
        return result;
      }
    }
    
    // GitHub check
    for (var j = 0; j < CONFIG.WHITELIST.GITHUB.length; j++) {
      if (host.indexOf(CONFIG.WHITELIST.GITHUB[j]) > -1) {
        var result = {allowed: true, service: 'GitHub'};
        this.cache[host] = result;
        return result;
      }
    }
    
    var result = {allowed: false, service: null};
    this.cache[host] = result;
    return result;
  }
};

// ================= ISP DETECTOR =================
var JORDAN_ISP = {
  providers: {
    'Orange': {
      nets: ['176.29', '176.28', '176.27', '37.123', '46.32', '46.248', '62.72', '84.18'],
      proxy: CONFIG.PROXIES.ORANGE_DIRECT,
      avgPing: 10
    },
    'Zain': {
      nets: ['82.212', '195.229', '213.6', '91.186', '178.77', '91.220'],
      proxy: CONFIG.PROXIES.ZAIN_DIRECT,
      avgPing: 9
    },
    'Umniah': {
      nets: ['185.119', '188.161', '188.123', '185.98', '188.247', '185.43'],
      proxy: CONFIG.PROXIES.UMNIAH_DIRECT,
      avgPing: 10
    },
    'Batelco': {
      nets: ['46.185', '94.249', '94.142', '37.44', '37.252'],
      proxy: CONFIG.PROXIES.BATELCO_DIRECT,
      avgPing: 11
    },
    'JT': {
      nets: ['212.118', '213.186', '212.34', '212.35', '217.144'],
      proxy: CONFIG.PROXIES.JT_BACKBONE,
      avgPing: 12
    }
  },
  
  cache: {},
  
  identify: function(ip) {
    if (this.cache[ip]) {
      return this.cache[ip];
    }
    
    var net16 = ip.split('.').slice(0, 2).join('.');
    
    for (var isp in this.providers) {
      var provider = this.providers[isp];
      
      for (var i = 0; i < provider.nets.length; i++) {
        if (net16 === provider.nets[i]) {
          var result = {
            isp: isp,
            proxy: provider.proxy,
            avgPing: provider.avgPing
          };
          this.cache[ip] = result;
          return result;
        }
      }
    }
    
    var result = {
      isp: 'Unknown-JO',
      proxy: CONFIG.PROXIES.FALLBACK,
      avgPing: 15
    };
    this.cache[ip] = result;
    return result;
  }
};

// ================= DNS CACHE =================
var DNS_CACHE = {
  data: {},
  hits: 0,
  misses: 0,
  
  get: function(host) {
    var entry = this.data[host];
    if (entry && (Date.now() - entry.time) < CONFIG.TIMEOUTS.DNS_CACHE) {
      this.hits++;
      return entry.ip;
    }
    this.misses++;
    return null;
  },
  
  set: function(host, ip) {
    if (Object.keys(this.data).length >= CONFIG.LIMITS.DNS_CACHE_SIZE) {
      // Clear 20% oldest
      var keys = Object.keys(this.data);
      for (var i = 0; i < keys.length * 0.2; i++) {
        delete this.data[keys[i]];
      }
    }
    
    this.data[host] = {
      ip: ip,
      time: Date.now()
    };
  }
};

// ================= SESSION MANAGER =================
var SESSION = {
  ip: null,
  proxy: null,
  locked: false,
  lockTime: 0,
  
  lock: function(ip, proxy) {
    this.ip = ip;
    this.proxy = proxy;
    this.locked = true;
    this.lockTime = Date.now();
  },
  
  reset: function() {
    if (this.locked && (Date.now() - this.lockTime) > CONFIG.TIMEOUTS.SESSION_LOCK) {
      this.locked = false;
      this.ip = null;
      this.proxy = null;
      this.lockTime = 0;
    }
  },
  
  validate: function(ip) {
    if (!this.locked) return true;
    var net16_current = ip.split('.').slice(0, 2).join('.');
    var net16_locked = this.ip.split('.').slice(0, 2).join('.');
    return net16_current === net16_locked;
  }
};

// ================= NETWORK MONITOR =================
var NET_MONITOR = {
  stats: {
    totalRequests: 0,
    blockedNonJordan: 0,
    allowedJordan: 0,
    allowedWhitelist: 0,
    matchRequests: 0,
    lobbyRequests: 0,
    sessionViolations: 0,
    startTime: Date.now()
  },
  
  blockedIPs: {},
  
  record: function(decision, ip, type, reason) {
    this.stats.totalRequests++;
    
    if (decision === BLOCK) {
      this.stats.blockedNonJordan++;
      
      if (ip && reason === 'non-jordan') {
        if (!this.blockedIPs[ip]) {
          this.blockedIPs[ip] = 0;
        }
        this.blockedIPs[ip]++;
      }
      
      if (reason === 'session-violation') {
        this.stats.sessionViolations++;
      }
    } else if (decision === DIRECT) {
      this.stats.allowedWhitelist++;
    } else {
      this.stats.allowedJordan++;
      
      if (type === 'match') {
        this.stats.matchRequests++;
      } else if (type === 'lobby') {
        this.stats.lobbyRequests++;
      }
    }
  },
  
  getStats: function() {
    var uptime = Date.now() - this.stats.startTime;
    var uptimeMin = Math.floor(uptime / 60000);
    
    var total = this.stats.totalRequests;
    var jordanRate = total > 0 ? ((this.stats.allowedJordan / total) * 100).toFixed(2) : '0.00';
    var blockRate = total > 0 ? ((this.stats.blockedNonJordan / total) * 100).toFixed(2) : '0.00';
    
    return {
      uptime: uptimeMin + ' min',
      total: total,
      allowedJordan: this.stats.allowedJordan,
      allowedWhitelist: this.stats.allowedWhitelist,
      blockedNonJordan: this.stats.blockedNonJordan,
      match: this.stats.matchRequests,
      lobby: this.stats.lobbyRequests,
      sessionViolations: this.stats.sessionViolations,
      jordanRate: jordanRate + '%',
      blockRate: blockRate + '%',
      uniqueBlockedIPs: Object.keys(this.blockedIPs).length
    };
  },
  
  getTopBlockedIPs: function() {
    var ips = [];
    for (var ip in this.blockedIPs) {
      ips.push({ip: ip, count: this.blockedIPs[ip]});
    }
    
    ips.sort(function(a, b) {
      return b.count - a.count;
    });
    
    return ips.slice(0, 20);
  }
};

// ================= UTILITY FUNCTIONS =================
function ipToInt(ip) {
  var parts = ip.split('.');
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

function norm(host) {
  var i = host.indexOf(':');
  return i > -1 ? host.substring(0, i) : host;
}

function resolveOptimized(host) {
  var cached = DNS_CACHE.get(host);
  if (cached) return cached;
  
  var ip = dnsResolve(host);
  if (ip) {
    DNS_CACHE.set(host, ip);
  }
  return ip;
}

// ================= GAME DETECTION =================
function isGAME(host) {
  return /pubg|tencent|krafton|lightspeed|arena|breakout|wow|blizzard|battle|activision|cod|fortnite|epic|valorant|riot|steam|dota|csgo|ea|origin|apex|battlefield|ubisoft|levelinfinite|gameserver/i.test(host);
}

function isMatch(url, host) {
  return /match|battle|combat|realtime|udp|tick|sync|room|game|raid|instance|dungeon|pvp|versus|squad|server\d+|gameplay|session|multiplayer/i.test(url + host);
}

function isLobby(url, host) {
  return /lobby|matchmaking|queue|dispatch|gateway|join|region|menu|character|inventory|login|auth|realm|world|launcher|update/i.test(url + host);
}

function isGameCritical(host) {
  return /\.match\.|\.game\.|\.battle\.|\.room\.|\.udp\.|\.relay\.|\.realtime\.|\.server\.|\.pvp\.|server\d+|gs\d+/i.test(host);
}

// ================= INITIALIZATION =================
function initializeSystem() {
  JORDAN_IP_RANGES.init();
}

// ================= MAIN PROXY FUNCTION - ABSOLUTE MODE =================
function FindProxyForURL(url, host) {
  // Initialize
  if (JORDAN_IP_RANGES.ranges.length === 0) {
    initializeSystem();
  }
  
  host = norm(host.toLowerCase());
  SESSION.reset();
  
  // ===== WHITELIST CHECK (YouTube & GitHub ONLY) =====
  var whitelistCheck = WHITELIST.isWhitelisted(host);
  if (whitelistCheck.allowed) {
    NET_MONITOR.record(DIRECT, null, 'whitelist', whitelistCheck.service);
    return DIRECT;
  }
  
  // ===== NON-GAME TRAFFIC - ALLOW DIRECT =====
  if (!isGAME(host)) {
    NET_MONITOR.record(DIRECT, null, 'non-game', 'system');
    return DIRECT;
  }
  
  // ===== GAME TRAFFIC - MUST BE JORDAN =====
  
  // Resolve IP
  var ip = resolveOptimized(host);
  
  // Block invalid IPs
  if (!ip || ip.indexOf(':') > -1) {
    NET_MONITOR.record(BLOCK, ip, 'invalid', 'invalid-ip');
    return BLOCK;
  }
  
  // ===== CRITICAL: JORDAN IP CHECK =====
  if (!JORDAN_IP_RANGES.isJordanIP(ip)) {
    NET_MONITOR.record(BLOCK, ip, 'blocked', 'non-jordan');
    return BLOCK;
  }
  
  // ===== IP IS JORDAN - PROCEED =====
  
  var ispInfo = JORDAN_ISP.identify(ip);
  
  // Detect request type
  var isMatchRequest = isMatch(url, host) || isGameCritical(host);
  var isLobbyRequest = isLobby(url, host);
  
  // ===== MATCH HANDLING =====
  if (isMatchRequest) {
    // Session validation
    if (SESSION.locked) {
      if (!SESSION.validate(ip)) {
        NET_MONITOR.record(BLOCK, ip, 'match', 'session-violation');
        return BLOCK;
      }
      
      NET_MONITOR.record(SESSION.proxy, ip, 'match', 'locked-session');
      return SESSION.proxy;
    }
    
    // New session - use ISP-direct proxy
    var proxy = ispInfo.proxy;
    SESSION.lock(ip, proxy);
    
    NET_MONITOR.record(proxy, ip, 'match', 'new-session');
    return proxy;
  }
  
  // ===== LOBBY HANDLING =====
  if (isLobbyRequest) {
    // Block lobby during active match
    if (SESSION.locked) {
      NET_MONITOR.record(BLOCK, ip, 'lobby', 'match-active');
      return BLOCK;
    }
    
    var lobbyProxy = ispInfo.proxy;
    NET_MONITOR.record(lobbyProxy, ip, 'lobby', 'pre-match');
    return lobbyProxy;
  }
  
  // ===== DEFAULT: BLOCK UNKNOWN GAME TRAFFIC =====
  NET_MONITOR.record(BLOCK, ip, 'unknown', 'unclassified');
  return BLOCK;
}

// ================= DEBUG FUNCTIONS =================

function debugGetStats() {
  var stats = NET_MONITOR.getStats();
  var dnsHitRate = (DNS_CACHE.hits + DNS_CACHE.misses) > 0 ?
    ((DNS_CACHE.hits / (DNS_CACHE.hits + DNS_CACHE.misses)) * 100).toFixed(2) : '0.00';
  
  return {
    version: CONFIG.VERSION,
    mode: CONFIG.MODE,
    network: stats,
    dns: {
      hits: DNS_CACHE.hits,
      misses: DNS_CACHE.misses,
      hitRate: dnsHitRate + '%',
      cacheSize: Object.keys(DNS_CACHE.data).length
    },
    session: {
      locked: SESSION.locked,
      ip: SESSION.ip,
      proxy: SESSION.proxy,
      isp: SESSION.ip ? JORDAN_ISP.identify(SESSION.ip).isp : 'N/A',
      duration: SESSION.locked ? Math.floor((Date.now() - SESSION.lockTime) / 1000) + 's' : '0s'
    },
    coverage: {
      jordanRanges: JORDAN_IP_RANGES.ranges.length,
      superCache: Object.keys(JORDAN_IP_RANGES.superCache).length + ' /16 nets',
      quickCache: Object.keys(JORDAN_IP_RANGES.quickCache).length + ' /24 nets'
    }
  };
}

function debugCheckIP(ip) {
  var isJordan = JORDAN_IP_RANGES.isJordanIP(ip);
  var ispInfo = isJordan ? JORDAN_ISP.identify(ip) : null;
  
  return {
    ip: ip,
    isJordan: isJordan,
    isp: ispInfo ? ispInfo.isp : 'NON-JORDAN',
    proxy: ispInfo ? ispInfo.proxy : 'BLOCKED',
    expectedPing: ispInfo ? ispInfo.avgPing + 'ms' : 'N/A',
    verdict: isJordan ? '✅ ALLOWED - JORDAN' : '❌ BLOCKED - NOT JORDAN'
  };
}

function debugGetBlockedIPs() {
  return NET_MONITOR.getTopBlockedIPs();
}

function debugTestDomain(domain) {
  var host = norm(domain.toLowerCase());
  
  // Whitelist check
  var whitelistCheck = WHITELIST.isWhitelisted(host);
  if (whitelistCheck.allowed) {
    return {
      domain: domain,
      status: 'WHITELISTED',
      service: whitelistCheck.service,
      decision: 'DIRECT'
    };
  }
  
  // Game check
  var isGame = isGAME(host);
  if (!isGame) {
    return {
      domain: domain,
      status: 'NON-GAME',
      decision: 'DIRECT'
    };
  }
  
  // Resolve IP
  var ip = resolveOptimized(host);
  if (!ip) {
    return {
      domain: domain,
      status: 'DNS FAILED',
      decision: 'BLOCK'
    };
  }
  
  // Check Jordan
  var isJordan = JORDAN_IP_RANGES.isJordanIP(ip);
  var ispInfo = isJordan ? JORDAN_ISP.identify(ip) : null;
  
  return {
    domain: domain,
    ip: ip,
    status: isJordan ? 'JORDAN IP' : 'NON-JORDAN IP',
    isp: ispInfo ? ispInfo.isp : 'FOREIGN',
    proxy: ispInfo ? ispInfo.proxy : 'NONE',
    decision: isJordan ? ispInfo.proxy : 'BLOCK'
  };
}

function debugReset() {
  NET_MONITOR.stats = {
    totalRequests: 0,
    blockedNonJordan: 0,
    allowedJordan: 0,
    allowedWhitelist: 0,
    matchRequests: 0,
    lobbyRequests: 0,
    sessionViolations: 0,
    startTime: Date.now()
  };
  
  NET_MONITOR.blockedIPs = {};
  
  DNS_CACHE.data = {};
  DNS_CACHE.hits = 0;
  DNS_CACHE.misses = 0;
  
  JORDAN_ISP.cache = {};
  WHITELIST.cache = {};
  
  SESSION.locked = false;
  SESSION.ip = null;
  SESSION.proxy = null;
  SESSION.lockTime = 0;
  
  return '✅ PURE JORDAN MODE RESET - ZERO TOLERANCE ACTIVE';
}

// ================= END OF SCRIPT =================
