// ═══════════════════════════════════════════════════════════════════
// ██████╗ ██╗   ██╗    ██╗   ██╗ █████╗ ███████╗ ██████╗ ██╗   ██╗██████╗ ██╗
// ██╔══██╗╚██╗ ██╔╝    ╚██╗ ██╔╝██╔══██╗╚══███╔╝██╔═══██╗██║   ██║██╔══██╗██║
// ██████╔╝ ╚████╔╝      ╚████╔╝ ███████║  ███╔╝ ██║   ██║██║   ██║██████╔╝██║
// ██╔══██╗  ╚██╔╝        ╚██╔╝  ██╔══██║ ███╔╝  ██║   ██║██║   ██║██╔══██╗██║
// ██████╔╝   ██║          ██║   ██║  ██║███████╗╚██████╔╝╚██████╔╝██║  ██║██║
// ╚═════╝    ╚═╝          ╚═╝   ╚═╝  ╚═╝╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝
// ═══════════════════════════════════════════════════════════════════
// JORDAN ONLY - FORCE MATCHMAKING v4.0 - العب مع أردنيين فقط
// DNS: 1.1.1.1 - 1.0.0.1
// RESET DEVICE + CLEAR GAME CACHE AFTER INSTALLATION
// ═══════════════════════════════════════════════════════════════════

// ================= AGGRESSIVE JORDAN-ONLY CONFIG =================
var FORCE_JORDAN = {
  enabled: true,                    // فرض الأردن
  blockNonJordan: true,             // امنع غير الأردن
  blockMiddleEast: true,            // امنع الشرق الأوسط (UAE, Saudi, Egypt)
  blockEurope: true,                // امنع أوروبا
  blockAsia: true,                  // امنع آسيا
  matchmakingDelay: 3000,           // تأخير 3 ثواني للماتش ميكنق
  forceRegionLock: true,            // قفل المنطقة
  rejectMixedLobbies: true          // ارفض اللوبيات المختلطة
};

var BOOSTER_CONFIG = {
  aggressiveCaching: true,
  predictiveLoading: true,
  requestPrioritization: true,
  connectionPrewarming: true,
  tcpFastOpen: true,
  nagleDisabled: true,
  keepAliveEnabled: true,
  compressionEnabled: true,
  reducedLatency: true,
  smoothDataFlow: true,
  prioritizeGamePackets: true,
  autoRegionDetection: true,
  patternAnalysis: true,
  healthMonitoring: true,
  connectionPooling: true,
  requestDeduplication: true,
  bandwidthOptimization: true,
  dynamicTimeout: true
};

var CONFIG = {
  DNS_CACHE_TTL: 120000,
  SESSION_TIMEOUT: 300000,
  MAX_FAILS: 2,
  PREWARM_ENABLED: true,
  DEDUP_TTL: 2000,
  POOL_MAX_AGE: 600000,
  HEALTH_CHECK_INTERVAL: 30000
};

// ================= PROXIES - JORDAN ONLY =================
var MATCH_JO = "PROXY 46.185.131.218:20001";
var MATCH_JO_BACKUP = "PROXY 212.35.66.45:20001";

var LOBBY_POOL = [
  "PROXY 212.35.66.45:8085",
  "PROXY 212.35.66.45:8181",
  "PROXY 46.185.131.218:443"
];

var BLOCK = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ================= JORDAN ONLY IP RANGES - COMPLETE =================
var JORDAN_IPV4 = [
  // Orange Jordan
  ["46.185.0.0","255.255.0.0"],
  ["212.35.0.0","255.255.0.0"],
  ["212.118.0.0","255.255.0.0"],
  ["212.69.0.0","255.255.0.0"],
  ["151.236.0.0","255.252.0.0"],
  
  // Zain Jordan
  ["176.29.0.0","255.255.0.0"],
  ["176.28.0.0","255.254.0.0"],
  ["176.110.0.0","255.254.0.0"],
  ["188.161.0.0","255.255.0.0"],
  ["185.107.0.0","255.255.0.0"],
  
  // Umniah Jordan
  ["82.212.0.0","255.254.0.0"],
  ["82.213.0.0","255.255.0.0"],
  ["37.238.0.0","255.255.0.0"],
  
  // Fiber & Business
  ["149.200.0.0","255.255.0.0"],
  ["86.108.0.0","255.254.0.0"],
  ["92.253.0.0","255.255.0.0"],
  ["94.249.0.0","255.255.0.0"],
  
  // Government & ISPs
  ["213.139.0.0","255.255.0.0"],
  ["213.6.0.0","255.254.0.0"],
  ["195.229.0.0","255.255.0.0"],
  ["195.158.0.0","255.254.0.0"],
  ["31.210.0.0","255.255.0.0"],
  
  // Mobile & Additional
  ["5.0.0.0","255.0.0.0"],
  ["37.48.0.0","255.240.0.0"],
  ["37.252.224.0","255.255.224.0"],
  ["46.19.0.0","255.255.0.0"],
  ["62.116.128.0","255.255.128.0"],
  ["77.44.0.0","255.252.0.0"],
  ["78.135.0.0","255.255.0.0"],
  ["80.66.176.0","255.255.240.0"],
  ["81.16.0.0","255.240.0.0"],
  ["85.115.0.0","255.255.0.0"],
  ["87.236.0.0","255.254.0.0"],
  ["91.102.0.0","255.254.0.0"],
  ["93.117.0.0","255.255.0.0"],
  ["95.132.0.0","255.252.0.0"],
  ["109.224.0.0","255.224.0.0"],
  ["185.13.160.0","255.255.224.0"],
  ["185.88.176.0","255.255.240.0"],
  ["188.247.0.0","255.255.0.0"],
  ["193.188.136.0","255.255.248.0"],
  ["194.126.96.0","255.255.224.0"]
];

// ================= BLOCK NON-JORDAN REGIONS =================
var BLOCKED_REGIONS = {
  // UAE
  UAE: [
    ["5.36.0.0","255.252.0.0"],
    ["31.14.0.0","255.254.0.0"],
    ["37.230.0.0","255.254.0.0"],
    ["80.78.16.0","255.255.240.0"],
    ["82.148.0.0","255.252.0.0"],
    ["85.92.0.0","255.252.0.0"]
  ],
  
  // Saudi Arabia
  SAUDI: [
    ["5.36.0.0","255.252.0.0"],
    ["31.168.0.0","255.248.0.0"],
    ["37.234.0.0","255.254.0.0"],
    ["46.28.0.0","255.252.0.0"],
    ["78.93.0.0","255.255.0.0"],
    ["91.102.0.0","255.254.0.0"]
  ],
  
  // Egypt
  EGYPT: [
    ["41.32.0.0","255.224.0.0"],
    ["41.64.0.0","255.192.0.0"],
    ["41.128.0.0","255.192.0.0"],
    ["62.68.0.0","255.252.0.0"],
    ["81.21.0.0","255.255.0.0"]
  ],
  
  // Europe (sample)
  EUROPE: [
    ["2.16.0.0","255.240.0.0"],
    ["5.56.0.0","255.248.0.0"],
    ["31.12.0.0","255.252.0.0"],
    ["77.68.0.0","255.252.0.0"],
    ["78.8.0.0","255.248.0.0"]
  ],
  
  // Asia (sample)
  ASIA: [
    ["1.0.0.0","255.0.0.0"],
    ["14.0.0.0","255.0.0.0"],
    ["27.0.0.0","255.0.0.0"],
    ["36.0.0.0","255.0.0.0"],
    ["42.0.0.0","255.0.0.0"]
  ]
};

// ================= SESSION STATE =================
var SESSION = {
  matchNet: null,
  matchHost: null,
  matchActive: false,
  matchStartTime: 0,
  matchRequestCount: 0,
  dnsCache: {},
  dnsCacheTime: {},
  dnsCacheHits: 0,
  dnsCacheMisses: 0,
  connectionPool: {},
  poolHits: 0,
  poolMisses: 0,
  dedupCache: {},
  dedupSaved: 0,
  serverHealth: {},
  primaryHealthy: true,
  requestPattern: [],
  lastPatternCheck: 0,
  predictedNext: null,
  detectedISP: null,
  ispConfidence: 0,
  ispSamples: [],
  totalRequests: 0,
  blockedRequests: 0,
  jordanPlayersFound: 0,
  nonJordanBlocked: 0,
  lobbyRotation: 0,
  lastMatchmakingTime: 0
};

// ================= REGION BLOCKER =================
var REGION_BLOCKER = {
  isBlocked: function(ip) {
    if (!FORCE_JORDAN.enabled) return false;
    
    // Check UAE
    if (FORCE_JORDAN.blockMiddleEast) {
      if (this.isInRegion(ip, BLOCKED_REGIONS.UAE)) {
        SESSION.nonJordanBlocked++;
        return true;
      }
      if (this.isInRegion(ip, BLOCKED_REGIONS.SAUDI)) {
        SESSION.nonJordanBlocked++;
        return true;
      }
      if (this.isInRegion(ip, BLOCKED_REGIONS.EGYPT)) {
        SESSION.nonJordanBlocked++;
        return true;
      }
    }
    
    // Check Europe
    if (FORCE_JORDAN.blockEurope) {
      if (this.isInRegion(ip, BLOCKED_REGIONS.EUROPE)) {
        SESSION.nonJordanBlocked++;
        return true;
      }
    }
    
    // Check Asia
    if (FORCE_JORDAN.blockAsia) {
      if (this.isInRegion(ip, BLOCKED_REGIONS.ASIA)) {
        SESSION.nonJordanBlocked++;
        return true;
      }
    }
    
    return false;
  },
  
  isInRegion: function(ip, ranges) {
    for (var i = 0; i < ranges.length; i++) {
      if (isInNet(ip, ranges[i][0], ranges[i][1])) return true;
    }
    return false;
  }
};

// ================= ISP DETECTOR =================
var ISP_DETECTOR = {
  database: {
    "46.185": {isp: "Orange", priority: 100, tier: 1},
    "212.35": {isp: "Orange", priority: 100, tier: 1},
    "176.29": {isp: "Zain", priority: 95, tier: 1},
    "176.28": {isp: "Zain", priority: 95, tier: 1},
    "82.212": {isp: "Umniah", priority: 90, tier: 1},
    "82.213": {isp: "Umniah", priority: 90, tier: 1}
  },
  
  detect: function(ip) {
    if (!BOOSTER_CONFIG.autoRegionDetection) return null;
    
    var prefix = ip.split('.').slice(0, 2).join('.');
    var info = this.database[prefix];
    
    if (info) {
      SESSION.ispSamples.push(info.isp);
      if (SESSION.ispSamples.length > 10) SESSION.ispSamples.shift();
      
      var counts = {};
      for (var i = 0; i < SESSION.ispSamples.length; i++) {
        var isp = SESSION.ispSamples[i];
        counts[isp] = (counts[isp] || 0) + 1;
      }
      
      var maxCount = 0;
      var detectedISP = null;
      for (var isp in counts) {
        if (counts[isp] > maxCount) {
          maxCount = counts[isp];
          detectedISP = isp;
        }
      }
      
      SESSION.detectedISP = detectedISP;
      SESSION.ispConfidence = (maxCount / SESSION.ispSamples.length) * 100;
      
      return info;
    }
    
    return null;
  }
};

// ================= PATTERN ANALYZER =================
var PATTERN_ANALYZER = {
  analyze: function(type) {
    if (!BOOSTER_CONFIG.patternAnalysis) return null;
    
    SESSION.requestPattern.push(type);
    if (SESSION.requestPattern.length > 20) SESSION.requestPattern.shift();
    
    return this.predict();
  },
  
  predict: function() {
    if (SESSION.requestPattern.length < 5) return null;
    
    var recent = SESSION.requestPattern.slice(-5).join("-");
    
    if (BOOSTER_CONFIG.predictiveLoading) {
      if (/LOBBY-LOBBY-SOCIAL-LOBBY/.test(recent)) {
        SESSION.predictedNext = "MATCH";
        return "MATCH_IMMINENT";
      }
      if (/MATCH-MATCH-MATCH/.test(recent)) {
        SESSION.predictedNext = "MATCH";
        return "IN_MATCH";
      }
    }
    
    return null;
  }
};

// ================= HEALTH MONITOR =================
var HEALTH_MONITOR = {
  check: function(server, success) {
    if (!BOOSTER_CONFIG.healthMonitoring) return;
    
    if (!SESSION.serverHealth[server]) {
      SESSION.serverHealth[server] = {
        failures: 0,
        successes: 0,
        healthy: true
      };
    }
    
    var health = SESSION.serverHealth[server];
    
    if (success) {
      health.successes++;
      health.failures = Math.max(0, health.failures - 1);
      if (health.failures < 2) health.healthy = true;
    } else {
      health.failures++;
      if (health.failures >= CONFIG.MAX_FAILS) {
        health.healthy = false;
      }
    }
    
    if (server === MATCH_JO) {
      SESSION.primaryHealthy = health.healthy;
    }
  },
  
  isHealthy: function(server) {
    if (!SESSION.serverHealth[server]) return true;
    return SESSION.serverHealth[server].healthy;
  }
};

// ================= CONNECTION POOL =================
var CONNECTION_POOL = {
  get: function(host, ip) {
    if (!BOOSTER_CONFIG.connectionPooling) return null;
    
    var key = host + "_" + ip.split('.').slice(0, 2).join('.');
    var now = Date.now();
    
    if (SESSION.connectionPool[key]) {
      var conn = SESSION.connectionPool[key];
      if (now - conn.created < CONFIG.POOL_MAX_AGE) {
        conn.lastUsed = now;
        conn.reused++;
        SESSION.poolHits++;
        return conn.proxy;
      }
    }
    
    SESSION.poolMisses++;
    return null;
  },
  
  add: function(host, ip, proxy) {
    if (!BOOSTER_CONFIG.connectionPooling) return;
    
    var key = host + "_" + ip.split('.').slice(0, 2).join('.');
    SESSION.connectionPool[key] = {
      proxy: proxy,
      created: Date.now(),
      lastUsed: Date.now(),
      reused: 0
    };
  }
};

// ================= REQUEST DEDUPLICATOR =================
var DEDUPLICATOR = {
  check: function(url, host) {
    if (!BOOSTER_CONFIG.requestDeduplication) return false;
    
    var key = host + "_" + this.hash(url);
    var now = Date.now();
    
    if (SESSION.dedupCache[key]) {
      if (now - SESSION.dedupCache[key] < CONFIG.DEDUP_TTL) {
        SESSION.dedupSaved++;
        return true;
      }
    }
    
    SESSION.dedupCache[key] = now;
    
    if (Math.random() < 0.05) {
      this.cleanup(now);
    }
    
    return false;
  },
  
  hash: function(str) {
    var h = 0;
    for (var i = 0; i < Math.min(str.length, 50); i++) {
      h = ((h << 5) - h) + str.charCodeAt(i);
    }
    return h;
  },
  
  cleanup: function(now) {
    for (var key in SESSION.dedupCache) {
      if (now - SESSION.dedupCache[key] > CONFIG.DEDUP_TTL * 5) {
        delete SESSION.dedupCache[key];
      }
    }
  }
};

// ================= BANDWIDTH OPTIMIZER =================
var BANDWIDTH_OPT = {
  getPriority: function(type) {
    if (!BOOSTER_CONFIG.bandwidthOptimization) return 5;
    
    var priorities = {
      MATCH: 10,
      SOCIAL: 7,
      LOBBY: 6,
      CDN: 3
    };
    
    return priorities[type] || 5;
  },
  
  selectProxy: function(type, proxies) {
    if (!BOOSTER_CONFIG.requestPrioritization) {
      return proxies[0];
    }
    
    var priority = this.getPriority(type);
    
    if (priority >= 9) {
      for (var i = 0; i < proxies.length; i++) {
        if (HEALTH_MONITOR.isHealthy(proxies[i])) {
          return proxies[i];
        }
      }
    }
    
    return proxies[0];
  }
};

// ================= DYNAMIC TIMEOUT =================
var DYNAMIC_TIMEOUT = {
  measurements: {},
  
  record: function(server, time) {
    if (!BOOSTER_CONFIG.dynamicTimeout) return;
    
    if (!this.measurements[server]) {
      this.measurements[server] = {samples: [], avg: 0};
    }
    
    var m = this.measurements[server];
    m.samples.push(time);
    if (m.samples.length > 20) m.samples.shift();
    
    var sum = 0;
    for (var i = 0; i < m.samples.length; i++) {
      sum += m.samples[i];
    }
    m.avg = sum / m.samples.length;
  },
  
  getTimeout: function(server) {
    if (!BOOSTER_CONFIG.dynamicTimeout) return CONFIG.SESSION_TIMEOUT;
    
    var m = this.measurements[server];
    if (!m || m.samples.length < 5) return CONFIG.SESSION_TIMEOUT;
    
    var timeout = m.avg * 1.5 + 60000;
    return Math.max(120000, Math.min(300000, timeout));
  }
};

// ================= HELPER FUNCTIONS =================
function norm(h) {
  var i = h.indexOf(":");
  return i > -1 ? h.substring(0, i) : h;
}

function isInList(ip, list) {
  for (var i = 0; i < list.length; i++) {
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  }
  return false;
}

function resolvePinned(host) {
  var now = Date.now();
  
  if (BOOSTER_CONFIG.aggressiveCaching && SESSION.dnsCache[host]) {
    if ((now - SESSION.dnsCacheTime[host]) < CONFIG.DNS_CACHE_TTL) {
      SESSION.dnsCacheHits++;
      return SESSION.dnsCache[host];
    }
  }
  
  SESSION.dnsCacheMisses++;
  var ip = dnsResolve(host);
  
  if (ip) {
    SESSION.dnsCache[host] = ip;
    SESSION.dnsCacheTime[host] = now;
  }
  
  return ip;
}

function pickLobbyProxy(host) {
  var hash = 0;
  for (var i = 0; i < host.length; i++) {
    hash = (hash + host.charCodeAt(i)) % LOBBY_POOL.length;
  }
  return LOBBY_POOL[hash];
}

// ================= DETECTION FUNCTIONS =================
function isPUBG(h) {
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite/i.test(h);
}

function isMatch(u, h) {
  return /match|battle|game|combat|realtime|sync|udp|tick|room/i.test(u + h);
}

function isLobby(u, h) {
  return /lobby|matchmaking|queue|dispatch|gateway|region|join|recruit/i.test(u + h);
}

function isSocial(u, h) {
  return /friend|invite|squad|team|party|clan|presence|social/i.test(u + h);
}

function isCDN(u, h) {
  return /cdn|asset|resource|patch|update|media|content/i.test(u + h);
}

// ================= MAIN FUNCTION - FORCE JORDAN ONLY =================
function FindProxyForURL(url, host) {
  host = norm(host.toLowerCase());
  SESSION.totalRequests++;
  
  if (!isPUBG(host)) return DIRECT;
  
  if (DEDUPLICATOR.check(url, host)) {
    return "CACHED";
  }
  
  var ip = resolvePinned(host);
  if (!ip || ip.indexOf(":") > -1) {
    SESSION.blockedRequests++;
    return BLOCK;
  }
  
  // ========== FORCE JORDAN ONLY - BLOCK ALL OTHER REGIONS ==========
  if (FORCE_JORDAN.blockNonJordan) {
    // Check if blocked region
    if (REGION_BLOCKER.isBlocked(ip)) {
      SESSION.blockedRequests++;
      return BLOCK; // ❌ BLOCKED: Non-Jordan region
    }
  }
  
  if (BOOSTER_CONFIG.autoRegionDetection) {
    ISP_DETECTOR.detect(ip);
  }
  
  // ========== MATCH - JORDAN ONLY - STRICT ==========
  if (isMatch(url, host)) {
    if (BOOSTER_CONFIG.patternAnalysis) {
      PATTERN_ANALYZER.analyze("MATCH");
    }
    
    // STRICT: Must be Jordan IP
    if (!isInList(ip, JORDAN_IPV4)) {
      SESSION.blockedRequests++;
      HEALTH_MONITOR.check(ip, false);
      return BLOCK; // ❌ NOT JORDAN = BLOCKED
    }
    
    SESSION.jordanPlayersFound++;
    
    var net24 = ip.split('.').slice(0, 3).join('.');
    var now = Date.now();
    
    if (!SESSION.matchActive) {
      SESSION.matchNet = net24;
      SESSION.matchHost = host;
      SESSION.matchActive = true;
      SESSION.matchStartTime = now;
      SESSION.matchRequestCount = 1;
      
      var pooledProxy = null;
      if (BOOSTER_CONFIG.connectionPooling) {
        pooledProxy = CONNECTION_POOL.get(host, ip);
      }
      
      var matchServer = pooledProxy || MATCH_JO;
      
      if (BOOSTER_CONFIG.healthMonitoring) {
        if (!HEALTH_MONITOR.isHealthy(matchServer)) {
          matchServer = MATCH_JO_BACKUP;
          SESSION.primaryHealthy = false;
        } else {
          HEALTH_MONITOR.check(matchServer, true);
          SESSION.primaryHealthy = true;
        }
      }
      
      if (BOOSTER_CONFIG.connectionPooling && !pooledProxy) {
        CONNECTION_POOL.add(host, ip, matchServer);
      }
      
      return matchServer;
    }
    
    if (SESSION.matchActive) {
      var timeout = CONFIG.SESSION_TIMEOUT;
      if (BOOSTER_CONFIG.dynamicTimeout) {
        timeout = DYNAMIC_TIMEOUT.getTimeout(SESSION.matchHost);
        var timeSinceStart = now - SESSION.matchStartTime;
        DYNAMIC_TIMEOUT.record(SESSION.matchHost, timeSinceStart);
      }
      
      if (now - SESSION.matchStartTime > timeout) {
        SESSION.matchActive = false;
        SESSION.matchNet = null;
        SESSION.matchHost = null;
        SESSION.blockedRequests++;
        return BLOCK;
      }
      
      if (host !== SESSION.matchHost) {
        SESSION.blockedRequests++;
        return BLOCK;
      }
      
      if (net24 !== SESSION.matchNet) {
        SESSION.blockedRequests++;
        return BLOCK;
      }
      
      SESSION.matchRequestCount++;
      
      var matchServer = SESSION.primaryHealthy ? MATCH_JO : MATCH_JO_BACKUP;
      
      return matchServer;
    }
    
    SESSION.blockedRequests++;
    return BLOCK;
  }
  
  // ========== LOBBY - JORDAN ONLY ==========
  if (isLobby(url, host)) {
    if (BOOSTER_CONFIG.patternAnalysis) {
      PATTERN_ANALYZER.analyze("LOBBY");
    }
    
    // STRICT: Must be Jordan IP
    if (!isInList(ip, JORDAN_IPV4)) {
      SESSION.blockedRequests++;
      return BLOCK;
    }
    
    // Matchmaking delay (force Jordan players)
    var now = Date.now();
    if (FORCE_JORDAN.enabled && FORCE_JORDAN.matchmakingDelay > 0) {
      if (now - SESSION.lastMatchmakingTime < FORCE_JORDAN.matchmakingDelay) {
        return BLOCK; // ⏳ DELAY: Wait for more Jordan players
      }
      SESSION.lastMatchmakingTime = now;
    }
    
    if (SESSION.matchActive) {
      SESSION.matchActive = false;
      SESSION.matchNet = null;
      SESSION.matchHost = null;
    }
    
    var pooledLobby = null;
    if (BOOSTER_CONFIG.connectionPooling) {
      pooledLobby = CONNECTION_POOL.get(host, ip);
    }
    
    var lobbyServer = pooledLobby || pickLobbyProxy(host);
    
    if (BOOSTER_CONFIG.bandwidthOptimization) {
      lobbyServer = BANDWIDTH_OPT.selectProxy("LOBBY", LOBBY_POOL);
    }
    
    if (BOOSTER_CONFIG.connectionPooling && !pooledLobby) {
      CONNECTION_POOL.add(host, ip, lobbyServer);
    }
    
    return lobbyServer;
  }
  
  // ========== SOCIAL/RECRUIT - JORDAN ONLY ==========
  if (isSocial(url, host)) {
    if (BOOSTER_CONFIG.patternAnalysis) {
      PATTERN_ANALYZER.analyze("SOCIAL");
    }
    
    // STRICT: Must be Jordan IP
    if (!isInList(ip, JORDAN_IPV4)) {
      SESSION.blockedRequests++;
      return BLOCK;
    }
    
    var pooledSocial = null;
    if (BOOSTER_CONFIG.connectionPooling) {
      pooledSocial = CONNECTION_POOL.get(host, ip);
    }
    
    var socialServer = pooledSocial || pickLobbyProxy(host);
    
    if (BOOSTER_CONFIG.connectionPooling && !pooledSocial) {
      CONNECTION_POOL.add(host, ip, socialServer);
    }
    
    return socialServer;
  }
  
  // ========== CDN - JORDAN ONLY ==========
  if (isCDN(url, host)) {
    if (BOOSTER_CONFIG.patternAnalysis) {
      PATTERN_ANALYZER.analyze("CDN");
    }
    
    // STRICT: Must be Jordan IP
    if (!isInList(ip, JORDAN_IPV4)) {
      SESSION.blockedRequests++;
      return BLOCK;
    }
    
    var cdnServer = LOBBY_POOL[(SESSION.lobbyRotation++) % LOBBY_POOL.length];
    
    return cdnServer;
  }
  
  // ========== DEFAULT - BLOCK EVERYTHING ELSE ==========
  SESSION.blockedRequests++;
  return BLOCK;
}
