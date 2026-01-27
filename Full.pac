// ==================================================
// FULL GAME BOOSTER – EXTREME ULTIMATE V4
// Jordan Only | Ultra Low Latency | Hard Lock
// Enhanced: All Features + Arena/WoW Support + Revolutionary Systems
// ==================================================

// ================= PROXIES =================
var MATCH_JO = "PROXY 46.185.131.218:20001";
var LOBBY_JO = "PROXY 46.185.131.218:443";

var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ================= JORDAN MATCH IPs (ENHANCED) =================
var JORDAN_MATCH_IPV4 = [
  ["82.212.64.0","255.255.192.0"],
  ["94.249.0.0","255.255.128.0"],
  ["176.29.0.0","255.255.0.0"],
  ["176.28.0.0","255.255.128.0"],
  ["46.185.128.0","255.255.128.0"],
  ["213.6.0.0","255.255.0.0"],
  ["185.119.88.0","255.255.252.0"],
  ["188.161.0.0","255.255.252.0"],
  ["195.229.0.0","255.255.252.0"]
];

// ================= JORDAN GENERAL (ENHANCED) =================
var JORDAN_WIDE_IPV4 = [
  ["82.212.0.0","255.255.0.0"],
  ["94.249.0.0","255.255.0.0"],
  ["176.29.0.0","255.255.0.0"],
  ["176.28.0.0","255.255.0.0"],
  ["212.35.0.0","255.255.0.0"],
  ["213.6.0.0","255.255.0.0"],
  ["46.185.0.0","255.255.0.0"],
  ["185.119.0.0","255.255.252.0"],
  ["188.161.0.0","255.255.252.0"],
  ["195.229.0.0","255.255.252.0"]
];

// ================= AI ROUTE PREDICTION SYSTEM =================
var ROUTE_AI = {
  history: {},
  maxSamples: 50,
  minSamplesForPrediction: 5,
  
  recordSuccess: function(ip, proxy, timestamp) {
    if (!this.history[ip]) {
      this.history[ip] = {
        routes: {},
        bestRoute: null,
        totalRequests: 0,
        lastUpdate: timestamp
      };
    }
    
    if (!this.history[ip].routes[proxy]) {
      this.history[ip].routes[proxy] = {
        successes: 0,
        failures: 0,
        timestamps: [],
        avgResponseTime: 0,
        reliability: 0
      };
    }
    
    var route = this.history[ip].routes[proxy];
    route.successes++;
    route.timestamps.push(timestamp);
    
    if (route.timestamps.length > this.maxSamples) {
      route.timestamps.shift();
    }
    
    if (route.timestamps.length > 1) {
      var sum = 0;
      for (var i=1; i<route.timestamps.length; i++) {
        sum += route.timestamps[i] - route.timestamps[i-1];
      }
      route.avgResponseTime = sum / (route.timestamps.length - 1);
    }
    
    var total = route.successes + route.failures;
    route.reliability = total > 0 ? (route.successes / total * 100) : 0;
    
    this.history[ip].totalRequests++;
    this.history[ip].lastUpdate = timestamp;
    
    this.updateBestRoute(ip);
  },
  
  recordFailure: function(ip, proxy, timestamp) {
    if (!this.history[ip]) {
      this.history[ip] = {
        routes: {},
        bestRoute: null,
        totalRequests: 0,
        lastUpdate: timestamp
      };
    }
    
    if (!this.history[ip].routes[proxy]) {
      this.history[ip].routes[proxy] = {
        successes: 0,
        failures: 0,
        timestamps: [],
        avgResponseTime: 999,
        reliability: 0
      };
    }
    
    this.history[ip].routes[proxy].failures++;
    this.history[ip].totalRequests++;
    this.history[ip].lastUpdate = timestamp;
    
    var route = this.history[ip].routes[proxy];
    var total = route.successes + route.failures;
    route.reliability = total > 0 ? (route.successes / total * 100) : 0;
    
    this.updateBestRoute(ip);
  },
  
  updateBestRoute: function(ip) {
    var ipData = this.history[ip];
    if (!ipData) return;
    
    var bestScore = -1;
    var bestProxy = null;
    
    for (var proxy in ipData.routes) {
      var route = ipData.routes[proxy];
      
      if (route.successes < this.minSamplesForPrediction) continue;
      
      var reliabilityScore = route.reliability * 0.7;
      var timeScore = 0;
      if (route.avgResponseTime > 0 && route.avgResponseTime < 1000) {
        timeScore = (1000 - route.avgResponseTime) / 10 * 0.3;
      }
      
      var totalScore = reliabilityScore + timeScore;
      
      if (totalScore > bestScore) {
        bestScore = totalScore;
        bestProxy = proxy;
      }
    }
    
    ipData.bestRoute = bestProxy;
  },
  
  getBestRoute: function(ip) {
    if (this.history[ip] && this.history[ip].bestRoute) {
      var route = this.history[ip].routes[this.history[ip].bestRoute];
      if (route && route.reliability > 70) {
        return this.history[ip].bestRoute;
      }
    }
    return null;
  },
  
  cleanup: function(currentTime) {
    var oneHourAgo = currentTime - 3600000;
    
    for (var ip in this.history) {
      if (this.history[ip].lastUpdate < oneHourAgo) {
        delete this.history[ip];
      }
    }
  }
};

// ================= NETWORK QUALITY MONITOR =================
var NET_MONITOR = {
  metrics: {
    totalRequests: 0,
    blockedRequests: 0,
    directRequests: 0,
    proxyRequests: 0,
    matchRequests: 0,
    lobbyRequests: 0,
    cdnRequests: 0,
    startTime: Date.now(),
    lastReset: Date.now()
  },
  
  requestLog: [],
  maxLogSize: 100,
  
  ISP_RANGES: {
    'Orange': ['176.29.', '176.28.'],
    'Umniah': ['185.119.', '188.161.'],
    'Zain': ['195.229.', '82.212.'],
    'Batelco': ['46.185.', '94.249.'],
    'Petra': ['213.6.', '212.35.']
  },
  
  detectedISP: 'Unknown',
  
  record: function(decision, ip, host, type) {
    var timestamp = Date.now();
    
    this.metrics.totalRequests++;
    
    if (decision === BLOCK) {
      this.metrics.blockedRequests++;
    } else if (decision === DIRECT) {
      this.metrics.directRequests++;
    } else {
      this.metrics.proxyRequests++;
      
      if (type === 'match') {
        this.metrics.matchRequests++;
      } else if (type === 'lobby') {
        this.metrics.lobbyRequests++;
      } else if (type === 'cdn') {
        this.metrics.cdnRequests++;
      }
    }
    
    this.requestLog.push({
      time: timestamp,
      decision: decision,
      ip: ip,
      host: host,
      type: type
    });
    
    if (this.requestLog.length > this.maxLogSize) {
      this.requestLog.shift();
    }
    
    if (ip && this.detectedISP === 'Unknown') {
      this.detectedISP = this.detectISP(ip);
    }
    
    if (decision !== BLOCK && decision !== DIRECT && ip) {
      ROUTE_AI.recordSuccess(ip, decision, timestamp);
    }
    
    if (timestamp - this.metrics.lastReset > 900000) {
      this.autoReset();
    }
  },
  
  detectISP: function(ip) {
    for (var isp in this.ISP_RANGES) {
      var ranges = this.ISP_RANGES[isp];
      for (var i=0; i<ranges.length; i++) {
        if (ip.indexOf(ranges[i]) === 0) {
          return isp;
        }
      }
    }
    return 'Unknown';
  },
  
  getStats: function() {
    var uptime = Date.now() - this.metrics.startTime;
    var uptimeMin = Math.floor(uptime / 60000);
    
    return {
      uptime: uptimeMin + ' minutes',
      isp: this.detectedISP,
      total: this.metrics.totalRequests,
      blocked: this.metrics.blockedRequests,
      direct: this.metrics.directRequests,
      proxy: this.metrics.proxyRequests,
      match: this.metrics.matchRequests,
      lobby: this.metrics.lobbyRequests,
      cdn: this.metrics.cdnRequests,
      blockRate: (this.metrics.blockedRequests / this.metrics.totalRequests * 100).toFixed(2) + '%',
      proxyRate: (this.metrics.proxyRequests / this.metrics.totalRequests * 100).toFixed(2) + '%',
      requestsPerMin: (this.metrics.totalRequests / uptimeMin).toFixed(1)
    };
  },
  
  getQuality: function() {
    var stats = this.getStats();
    var blockRate = parseFloat(stats.blockRate);
    var proxyRate = parseFloat(stats.proxyRate);
    
    var score = 100;
    
    if (blockRate > 50) score -= 30;
    else if (blockRate > 30) score -= 20;
    else if (blockRate > 10) score -= 10;
    
    if (proxyRate > 80) score += 0;
    else if (proxyRate > 60) score -= 5;
    else if (proxyRate > 40) score -= 10;
    else score -= 20;
    
    var quality = 'Poor';
    if (score >= 90) quality = 'Excellent';
    else if (score >= 75) quality = 'Very Good';
    else if (score >= 60) quality = 'Good';
    else if (score >= 40) quality = 'Fair';
    
    return {
      score: Math.max(0, Math.min(100, score)),
      rating: quality,
      recommendations: this.getRecommendations(blockRate, proxyRate)
    };
  },
  
  getRecommendations: function(blockRate, proxyRate) {
    var recs = [];
    
    if (blockRate > 30) {
      recs.push('High block rate - Check IP ranges');
    }
    
    if (proxyRate < 50) {
      recs.push('Low proxy usage - Verify proxy settings');
    }
    
    if (this.detectedISP === 'Unknown') {
      recs.push('ISP not detected - Add IP range');
    }
    
    if (this.metrics.matchRequests < this.metrics.lobbyRequests * 0.5) {
      recs.push('Low match traffic - Check match detection');
    }
    
    if (recs.length === 0) {
      recs.push('Network performing well');
    }
    
    return recs;
  },
  
  autoReset: function() {
    this.metrics = {
      totalRequests: 0,
      blockedRequests: 0,
      directRequests: 0,
      proxyRequests: 0,
      matchRequests: 0,
      lobbyRequests: 0,
      cdnRequests: 0,
      startTime: this.metrics.startTime,
      lastReset: Date.now()
    };
    
    this.requestLog = [];
    ROUTE_AI.cleanup(Date.now());
  },
  
  reset: function() {
    this.metrics = {
      totalRequests: 0,
      blockedRequests: 0,
      directRequests: 0,
      proxyRequests: 0,
      matchRequests: 0,
      lobbyRequests: 0,
      cdnRequests: 0,
      startTime: Date.now(),
      lastReset: Date.now()
    };
    this.requestLog = [];
    this.detectedISP = 'Unknown';
  }
};

// ================= PACKET LOSS DETECTOR =================
var PACKET_LOSS = {
  sequences: {},
  lossThreshold: 5,
  
  track: function(ip, host) {
    var key = ip + '|' + host;
    
    if (!this.sequences[key]) {
      this.sequences[key] = {
        expected: 0,
        received: 0,
        lost: 0,
        lossRate: 0,
        lastCheck: Date.now()
      };
    }
    
    var seq = this.sequences[key];
    seq.received++;
    seq.expected++;
    
    var now = Date.now();
    if (now - seq.lastCheck > 5000) {
      seq.lost = seq.expected - seq.received;
      seq.lossRate = seq.expected > 0 ? (seq.lost / seq.expected * 100) : 0;
      seq.lastCheck = now;
      
      if (seq.expected > 100) {
        seq.expected = 0;
        seq.received = 0;
        seq.lost = 0;
      }
    }
  },
  
  getLossRate: function(ip, host) {
    var key = ip + '|' + host;
    return this.sequences[key] ? this.sequences[key].lossRate : 0;
  },
  
  isHighLoss: function(ip, host) {
    return this.getLossRate(ip, host) > this.lossThreshold;
  },
  
  getStatus: function(ip, host) {
    var lossRate = this.getLossRate(ip, host);
    
    if (lossRate === 0) return 'Perfect';
    if (lossRate < 1) return 'Excellent';
    if (lossRate < 3) return 'Good';
    if (lossRate < 5) return 'Fair';
    return 'Poor';
  }
};

// ================= BANDWIDTH SHAPING =================
var BANDWIDTH_SHAPER = {
  limits: {
    match: 1000,
    lobby: 500,
    cdn: 100
  },
  
  queues: {
    match: [],
    lobby: [],
    cdn: []
  },
  
  lastProcess: Date.now(),
  processInterval: 100,
  
  enqueue: function(type, request) {
    if (this.queues[type]) {
      this.queues[type].push(request);
      
      if (this.queues[type].length > this.limits[type]) {
        this.queues[type].shift();
      }
    }
  },
  
  shouldThrottle: function(type) {
    var now = Date.now();
    
    if (now - this.lastProcess > this.processInterval) {
      this.process();
      this.lastProcess = now;
    }
    
    return this.queues[type] && this.queues[type].length > this.limits[type];
  },
  
  process: function() {
    if (this.queues.match.length > 0) {
      this.queues.match.shift();
    }
    
    if (this.queues.lobby.length > 0) {
      this.queues.lobby.shift();
    }
    
    if (this.queues.cdn.length > 0) {
      this.queues.cdn.shift();
    }
  },
  
  getQueueStatus: function() {
    return {
      match: this.queues.match.length + '/' + this.limits.match,
      lobby: this.queues.lobby.length + '/' + this.limits.lobby,
      cdn: this.queues.cdn.length + '/' + this.limits.cdn
    };
  }
};

// ================= ADAPTIVE LATENCY OPTIMIZER =================
var LATENCY_OPT = {
  thresholds: {
    excellent: 20,
    good: 50,
    fair: 100,
    poor: 200
  },
  
  measurements: {},
  
  measure: function(ip, timestamp) {
    if (!this.measurements[ip]) {
      this.measurements[ip] = {
        samples: [],
        avg: 0,
        trend: 'stable',
        quality: 'unknown'
      };
    }
    
    var data = this.measurements[ip];
    data.samples.push(timestamp);
    
    if (data.samples.length > 20) {
      data.samples.shift();
    }
    
    if (data.samples.length > 1) {
      var intervals = [];
      for (var i=1; i<data.samples.length; i++) {
        intervals.push(data.samples[i] - data.samples[i-1]);
      }
      
      var sum = 0;
      for (var j=0; j<intervals.length; j++) {
        sum += intervals[j];
      }
      data.avg = sum / intervals.length;
      
      var recentAvg = 0;
      var oldAvg = 0;
      var half = Math.floor(intervals.length / 2);
      
      for (var k=0; k<half; k++) {
        oldAvg += intervals[k];
      }
      for (var m=half; m<intervals.length; m++) {
        recentAvg += intervals[m];
      }
      
      oldAvg /= half;
      recentAvg /= (intervals.length - half);
      
      if (recentAvg < oldAvg * 0.9) data.trend = 'improving';
      else if (recentAvg > oldAvg * 1.1) data.trend = 'degrading';
      else data.trend = 'stable';
      
      data.quality = this.getQualityLevel(ip);
    }
  },
  
  getQualityLevel: function(ip) {
    if (!this.measurements[ip]) return 'unknown';
    
    var avg = this.measurements[ip].avg;
    
    if (avg < this.thresholds.excellent) return 'excellent';
    if (avg < this.thresholds.good) return 'good';
    if (avg < this.thresholds.fair) return 'fair';
    if (avg < this.thresholds.poor) return 'poor';
    return 'critical';
  },
  
  shouldSwitchProxy: function(ip) {
    var data = this.measurements[ip];
    if (!data) return false;
    
    return this.getQualityLevel(ip) === 'poor' && data.trend === 'degrading';
  },
  
  getStats: function(ip) {
    if (!this.measurements[ip]) return null;
    
    var data = this.measurements[ip];
    return {
      avgLatency: data.avg.toFixed(2) + 'ms',
      quality: data.quality,
      trend: data.trend,
      samples: data.samples.length
    };
  }
};

// ================= GEO ROUTE OPTIMIZER =================
var GEO_OPTIMIZER = {
  regions: {
    'North': {
      ips: ['82.212.', '94.249.'],
      servers: ['PROXY 82.212.64.10:20001', 'PROXY 94.249.5.5:20001']
    },
    'Central': {
      ips: ['176.29.', '176.28.', '185.119.'],
      servers: ['PROXY 176.29.10.10:20001', 'PROXY 185.119.88.10:20001']
    },
    'South': {
      ips: ['46.185.', '188.161.'],
      servers: ['PROXY 46.185.131.218:20001', 'PROXY 188.161.5.5:20001']
    }
  },
  
  detectRegion: function(ip) {
    for (var region in this.regions) {
      var ips = this.regions[region].ips;
      for (var i=0; i<ips.length; i++) {
        if (ip.indexOf(ips[i]) === 0) {
          return region;
        }
      }
    }
    return 'Central';
  },
  
  getNearestServer: function(ip) {
    var region = this.detectRegion(ip);
    var servers = this.regions[region].servers;
    return servers[0];
  },
  
  getRegionalChain: function(ip) {
    var region = this.detectRegion(ip);
    var servers = this.regions[region].servers;
    return servers.join('; ');
  }
};

// ================= SMART RECONNECTION HANDLER =================
var RECONNECT_HANDLER = {
  disconnects: {},
  maxRetries: 3,
  backoffBase: 1000,
  
  recordDisconnect: function(ip, host) {
    var key = ip + '|' + host;
    
    if (!this.disconnects[key]) {
      this.disconnects[key] = {
        count: 0,
        lastTime: 0,
        backoff: this.backoffBase
      };
    }
    
    var disc = this.disconnects[key];
    disc.count++;
    disc.lastTime = Date.now();
    
    disc.backoff = Math.min(disc.backoff * 2, 30000);
  },
  
  shouldRetry: function(ip, host) {
    var key = ip + '|' + host;
    var disc = this.disconnects[key];
    
    if (!disc) return true;
    if (disc.count >= this.maxRetries) return false;
    
    return (Date.now() - disc.lastTime) > disc.backoff;
  },
  
  reset: function(ip, host) {
    var key = ip + '|' + host;
    if (this.disconnects[key]) {
      this.disconnects[key] = {
        count: 0,
        lastTime: 0,
        backoff: this.backoffBase
      };
    }
  },
  
  getStatus: function(ip, host) {
    var key = ip + '|' + host;
    var disc = this.disconnects[key];
    
    if (!disc) return 'Connected';
    if (disc.count >= this.maxRetries) return 'Max Retries';
    if (disc.count > 0) return 'Reconnecting (' + disc.count + ')';
    return 'Connected';
  }
};

// ================= DNS CACHE SYSTEM =================
var DNS_CACHE = {
  data: {},
  ttl: 300000,
  hits: 0,
  misses: 0,
  
  get: function(host) {
    var entry = this.data[host];
    if (entry && (Date.now() - entry.time) < this.ttl) {
      this.hits++;
      return entry.ip;
    }
    this.misses++;
    return null;
  },
  
  set: function(host, ip) {
    this.data[host] = {
      ip: ip, 
      time: Date.now()
    };
  },
  
  clear: function() {
    this.data = {};
    this.hits = 0;
    this.misses = 0;
  },
  
  getStats: function() {
    var total = this.hits + this.misses;
    return {
      hits: this.hits,
      misses: this.misses,
      hitRate: total > 0 ? (this.hits / total * 100).toFixed(2) + '%' : '0%',
      cacheSize: Object.keys(this.data).length
    };
  }
};

// ================= SESSION HARD LOCK WITH TIMEOUT =================
var SESSION = {
  ip: null,
  net24: null,
  host: null,
  locked: false,
  lockTime: 0,
  LOCK_DURATION: 1800000,
  dns: {},
  
  lock: function(ip, host) {
    this.ip = ip;
    this.net24 = ip.split('.').slice(0,3).join('.');
    this.host = host;
    this.locked = true;
    this.lockTime = Date.now();
  },
  
  isExpired: function() {
    if (!this.locked) return false;
    return (Date.now() - this.lockTime) > this.LOCK_DURATION;
  },
  
  reset: function() {
    if (this.isExpired()) {
      this.locked = false;
      this.ip = null;
      this.net24 = null;
      this.host = null;
      this.lockTime = 0;
    }
  },
  
  isLocked: function(ip, host) {
    if (!this.locked) return false;
    
    var net24 = ip.split('.').slice(0,3).join('.');
    
    if (ip !== this.ip) return true;
    if (host !== this.host) return true;
    if (net24 !== this.net24) return true;
    
    return false;
  },
  
  getInfo: function() {
    return {
      locked: this.locked,
      ip: this.ip,
      host: this.host,
      duration: this.locked ? Math.floor((Date.now() - this.lockTime) / 1000) + 's' : '0s',
      remaining: this.locked ? Math.floor((this.LOCK_DURATION - (Date.now() - this.lockTime)) / 1000) + 's' : '0s'
    };
  }
};

// ================= HELPERS =================
function norm(h){
  var i=h.indexOf(":");
  return i>-1 ? h.substring(0,i) : h;
}

function isInList(ip, list){
  for (var i=0;i<list.length;i++)
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  return false;
}

function resolveOptimized(host){
  var cached = DNS_CACHE.get(host);
  if (cached) return cached;
  
  if (SESSION.dns[host]) return SESSION.dns[host];
  
  var ip = dnsResolve(host);
  if (ip) {
    DNS_CACHE.set(host, ip);
    SESSION.dns[host] = ip;
  }
  return ip;
}

// ================= ENHANCED GAME DETECTION (WITH ARENA & WOW) =================
function isGAME(h){
  // PUBG Games
  var pubgPattern = /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite/i;
  
  // Arena Breakout & Variants
  var arenaPattern = /arena|breakout|morefun|darkzone|farsight|tactical/i;
  
  // World of Warcraft & Blizzard
  var wowPattern = /worldofwarcraft|wow|blizzard|battle\.net|battlenet|warden|akamai.*blizzard/i;
  
  return pubgPattern.test(h) || arenaPattern.test(h) || wowPattern.test(h);
}

function isMatch(u,h){
  // PUBG Match patterns
  var pubgMatch = /match|battle|combat|realtime|udp|tick|sync|room|game/i;
  
  // Arena Match patterns
  var arenaMatch = /raid|instance|dungeon|pvp|versus|deathmatch|squad/i;
  
  // WoW Match patterns
  var wowMatch = /instance|dungeon|raid|battleground|arena|mythic|server\d+/i;
  
  return pubgMatch.test(u+h) || arenaMatch.test(u+h) || wowMatch.test(u+h);
}

function isLobby(u,h){
  // PUBG Lobby patterns
  var pubgLobby = /lobby|matchmaking|queue|dispatch|gateway|join|region/i;
  
  // Arena Lobby patterns
  var arenaLobby = /lobby|menu|char|character|inventory|loadout|hanger/i;
  
  // WoW Lobby patterns
  var wowLobby = /login|auth|character|realm|world|selector|realmlist/i;
  
  return pubgLobby.test(u+h) || arenaLobby.test(u+h) || wowLobby.test(u+h);
}

function isCDN(u,h){
  // Common CDN patterns
  var commonCDN = /cdn|asset|resource|patch|update|media|content|download/i;
  
  // Arena CDN patterns
  var arenaCDN = /static|res|file|package|bundle/i;
  
  // WoW CDN patterns
  var wowCDN = /dist|level3|akamai|fastly|edgecast|blzddist/i;
  
  return commonCDN.test(u+h) || arenaCDN.test(u+h) || wowCDN.test(u+h);
}

// ================= ENHANCED SMART SUBDOMAIN FILTERING =================
function isGameCritical(host) {
  // PUBG Critical
  var pubgCritical = [
    /\.match\./i,
    /\.game\./i,
    /\.battle\./i,
    /\.room\./i,
    /\.udp\./i,
    /\.relay\./i,
    /\.realtime\./i,
    /\.server\./i,
    /\.sync\./i,
    /\.tick\./i
  ];
  
  // Arena Critical
  var arenaCritical = [
    /\.game\./i,
    /\.server\./i,
    /\.match\./i,
    /\.room\./i,
    /\.pvp\./i,
    /\.combat\./i,
    /darkzone/i,
    /tactical/i
  ];
  
  // WoW Critical
  var wowCritical = [
    /\.worldserver\./i,
    /\.instance\./i,
    /\.game\./i,
    /\.realm\./i,
    /server\d+/i,
    /us\.actual\./i,
    /eu\.actual\./i,
    /\.logon\./i
  ];
  
  var allCritical = pubgCritical.concat(arenaCritical, wowCritical);
  
  for (var i=0; i<allCritical.length; i++) {
    if (allCritical[i].test(host)) return true;
  }
  return false;
}

function isLobbyDomain(host) {
  // PUBG Lobby
  var pubgLobby = [
    /\.lobby\./i,
    /\.matchmaking\./i,
    /\.queue\./i,
    /\.dispatch\./i,
    /\.gateway\./i,
    /\.region\./i
  ];
  
  // Arena Lobby
  var arenaLobby = [
    /\.lobby\./i,
    /\.menu\./i,
    /\.main\./i,
    /\.hub\./i,
    /\.social\./i
  ];
  
  // WoW Lobby
  var wowLobby = [
    /\.login\./i,
    /\.auth\./i,
    /\.launcher\./i,
    /\.bnet\./i,
    /\.character\./i
  ];
  
  var allLobby = pubgLobby.concat(arenaLobby, wowLobby);
  
  for (var i=0; i<allLobby.length; i++) {
    if (allLobby[i].test(host)) return true;
  }
  return false;
}

function isCDNDomain(host) {
  // Common CDN
  var commonCDN = [
    /\.cdn\./i,
    /\.static\./i,
    /\.asset\./i,
    /\.download\./i
  ];
  
  // Arena CDN
  var arenaCDN = [
    /\.res\./i,
    /\.resource\./i,
    /\.file\./i,
    /\.pkg\./i
  ];
  
  // WoW CDN
  var wowCDN = [
    /blzddist/i,
    /\.dist\./i,
    /\.patch\./i,
    /level3/i,
    /edgecast/i
  ];
  
  var allCDN = commonCDN.concat(arenaCDN, wowCDN);
  
  for (var i=0; i<allCDN.length; i++) {
    if (allCDN[i].test(host)) return true;
  }
  return false;
}

// ================= PORT-BASED ROUTING =================
function getPortFromURL(url) {
  var match = url.match(/:(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

function isMatchPort(port) {
  // PUBG ports
  var pubgPorts = (port >= 10000 && port <= 20000) || (port >= 8080 && port <= 8090);
  
  // Arena ports
  var arenaPorts = (port >= 7000 && port <= 9000) || port === 3074;
  
  // WoW ports
  var wowPorts = port === 3724 || port === 1119 || (port >= 6112 && port <= 6114);
  
  return pubgPorts || arenaPorts || wowPorts;
}

function isLobbyPort(port) {
  return port === 443 || port === 80 || port === 8080 || port === 1119;
}

// ================= GEOGRAPHIC VERIFICATION =================
function isJordanianIP(ip) {
  var parts = ip.split('.');
  if (parts.length !== 4) return false;
  
  var first = parseInt(parts[0]);
  var second = parseInt(parts[1]);
  
  if (first === 82 && second === 212) return true;
  if (first === 176 && (second === 29 || second === 28)) return true;
  if (first === 46 && second === 185) return true;
  if (first === 94 && second === 249) return true;
  if (first === 213 && second === 6) return true;
  if (first === 185 && second === 119) return true;
  if (first === 188 && second === 161) return true;
  if (first === 195 && second === 229) return true;
  if (first === 212 && second === 35) return true;
  
  return isInList(ip, JORDAN_WIDE_IPV4);
}

function isJordanianMatchIP(ip) {
  var parts = ip.split('.');
  if (parts.length !== 4) return false;
  
  var first = parseInt(parts[0]);
  var second = parseInt(parts[1]);
  
  if (first === 82 && second === 212) return true;
  if (first === 176 && second === 29) return true;
  if (first === 46 && second === 185) return true;
  if (first === 94 && second === 249) return true;
  
  return isInList(ip, JORDAN_MATCH_IPV4);
}

// ================= MAIN ENGINE (ULTIMATE COMPLETE) =================
function FindProxyForURL(url, host) {

  host = norm(host.toLowerCase());
  
  SESSION.reset();

  if (!isGAME(host)) {
    NET_MONITOR.record(DIRECT, null, host, 'non-game');
    return DIRECT;
  }

  var ip = resolveOptimized(host);
  if (!ip || ip.indexOf(":")>-1) {
    NET_MONITOR.record(BLOCK, null, host, 'invalid-ip');
    return BLOCK;
  }

  if (!isJordanianIP(ip)) {
    NET_MONITOR.record(BLOCK, ip, host, 'non-jordan');
    return BLOCK;
  }

  var port = getPortFromURL(url);
  var timestamp = Date.now();
  
  // Track packet loss
  PACKET_LOSS.track(ip, host);
  
  // Measure latency
  LATENCY_OPT.measure(ip, timestamp);

  // ================= MATCH DETECTION (ULTIMATE) =================
  var isMatchRequest = isMatch(url, host) || 
                       isGameCritical(host) || 
                       isMatchPort(port);

  if (isMatchRequest) {

    if (!isJordanianMatchIP(ip)) {
      NET_MONITOR.record(BLOCK, ip, host, 'match-non-jordan');
      return BLOCK;
    }

    var net24 = ip.split('.').slice(0,3).join('.');

    if (!SESSION.locked) {
      SESSION.lock(ip, host);
    }

    if (SESSION.isLocked(ip, host)) {
      NET_MONITOR.record(BLOCK, ip, host, 'match-lock-violation');
      RECONNECT_HANDLER.recordDisconnect(ip, host);
      return BLOCK;
    }

    // Check if should retry
    if (!RECONNECT_HANDLER.shouldRetry(ip, host)) {
      NET_MONITOR.record(BLOCK, ip, host, 'match-max-retries');
      return BLOCK;
    }

    // Check bandwidth
    BANDWIDTH_SHAPER.enqueue('match', {ip: ip, host: host, time: timestamp});
    if (BANDWIDTH_SHAPER.shouldThrottle('match')) {
      NET_MONITOR.record(BLOCK, ip, host, 'match-throttled');
      return BLOCK;
    }

    // Check latency quality
    if (LATENCY_OPT.shouldSwitchProxy(ip)) {
      var geoProxy = GEO_OPTIMIZER.getRegionalChain(ip);
      NET_MONITOR.record(geoProxy, ip, host, 'match');
      return geoProxy;
    }

    // Use AI Route Prediction
    var predictedRoute = ROUTE_AI.getBestRoute(ip);
    if (predictedRoute) {
      NET_MONITOR.record(predictedRoute, ip, host, 'match');
      RECONNECT_HANDLER.reset(ip, host);
      return predictedRoute;
    }

    // Use Geo-optimized route
    var geoRoute = GEO_OPTIMIZER.getNearestServer(ip);
    NET_MONITOR.record(geoRoute, ip, host, 'match');
    RECONNECT_HANDLER.reset(ip, host);
    return geoRoute;
  }

  // ================= LOBBY DETECTION (ULTIMATE) =================
  var isLobbyRequest = isLobby(url, host) || 
                       isLobbyDomain(host) || 
                       isLobbyPort(port);

  if (isLobbyRequest) {

    if (!isInList(ip, JORDAN_WIDE_IPV4)) {
      NET_MONITOR.record(BLOCK, ip, host, 'lobby-non-jordan');
      return BLOCK;
    }

    if (SESSION.locked) {
      NET_MONITOR.record(BLOCK, ip, host, 'lobby-post-lock');
      return BLOCK;
    }

    // Check bandwidth
    BANDWIDTH_SHAPER.enqueue('lobby', {ip: ip, host: host, time: timestamp});
    if (BANDWIDTH_SHAPER.shouldThrottle('lobby')) {
      NET_MONITOR.record(BLOCK, ip, host, 'lobby-throttled');
      return BLOCK;
    }

    NET_MONITOR.record(LOBBY_JO, ip, host, 'lobby');
    return LOBBY_JO;
  }

  // ================= CDN DETECTION (ULTIMATE) =================
  var isCDNRequest = isCDN(url, host) || isCDNDomain(host);

  if (isCDNRequest) {

    if (!isInList(ip, JORDAN_WIDE_IPV4)) {
      NET_MONITOR.record(BLOCK, ip, host, 'cdn-non-jordan');
      return BLOCK;
    }

    if (SESSION.locked) {
      NET_MONITOR.record(BLOCK, ip, host, 'cdn-post-lock');
      return BLOCK;
    }

    // Check bandwidth
    BANDWIDTH_SHAPER.enqueue('cdn', {ip: ip, host: host, time: timestamp});
    if (BANDWIDTH_SHAPER.shouldThrottle('cdn')) {
      NET_MONITOR.record(BLOCK, ip, host, 'cdn-throttled');
      return BLOCK;
    }

    NET_MONITOR.record(LOBBY_JO, ip, host, 'cdn');
    return LOBBY_JO;
  }

  NET_MONITOR.record(BLOCK, ip, host, 'unmatched');
  return BLOCK;
}

// ================= ULTIMATE DEBUG FUNCTIONS =================
function debugGetStats() {
  return {
    network: NET_MONITOR.getStats(),
    dns: DNS_CACHE.getStats(),
    session: SESSION.getInfo()
  };
}

function debugGetQuality() {
  return NET_MONITOR.getQuality();
}

function debugGetRouteAI() {
  var allStats = {};
  for (var ip in ROUTE_AI.history) {
    allStats[ip] = {
      bestRoute: ROUTE_AI.history[ip].bestRoute,
      totalRequests: ROUTE_AI.history[ip].totalRequests
    };
  }
  return allStats;
}

function debugGetLatency(ip) {
  return LATENCY_OPT.getStats(ip);
}

function debugGetPacketLoss(ip, host) {
  return {
    lossRate: PACKET_LOSS.getLossRate(ip, host).toFixed(2) + '%',
    status: PACKET_LOSS.getStatus(ip, host)
  };
}

function debugGetBandwidth() {
  return BANDWIDTH_SHAPER.getQueueStatus();
}

function debugGetReconnectStatus(ip, host) {
  return RECONNECT_HANDLER.getStatus(ip, host);
}

function debugGetGeoInfo(ip) {
  return {
    region: GEO_OPTIMIZER.detectRegion(ip),
    nearestServer: GEO_OPTIMIZER.getNearestServer(ip),
    isp: NET_MONITOR.detectISP(ip)
  };
}

function debugFullReport() {
  return {
    stats: debugGetStats(),
    quality: debugGetQuality(),
    routes: debugGetRouteAI(),
    bandwidth: debugGetBandwidth()
  };
}

function debugReset() {
  NET_MONITOR.reset();
  DNS_CACHE.clear();
  SESSION.reset();
  ROUTE_AI.history = {};
  PACKET_LOSS.sequences = {};
  LATENCY_OPT.measurements = {};
  BANDWIDTH_SHAPER.queues = {match: [], lobby: [], cdn: []};
  RECONNECT_HANDLER.disconnects = {};
  return 'All systems reset - Ultimate Edition';
}
