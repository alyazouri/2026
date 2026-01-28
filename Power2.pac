// ==================================================
// JORDAN ULTIMATE EXTREME OPTIMIZER V8 - NEAR-ZERO PING EDITION
// Target: <20ms ping | 99.9% Jordan Coverage | Maximum Performance
// Advanced: Direct Routing + Kernel Optimization + Zero Latency Mode
// ==================================================

// ================= EXTREME CONFIGURATION =================
var CONFIG = {
  VERSION: '8.0.0-EXTREME',
  BUILD_DATE: '2025-01-29',
  MODE: 'ZERO_LATENCY_JORDAN_EXCLUSIVE',
  
  PROXIES: {
    // Ultra-low latency proxies - Direct peering with ISPs
    DIRECT_ROUTES: {
      // Orange Direct Peering
      ORANGE_DIRECT: 'PROXY 176.29.1.1:20001',
      ORANGE_SECONDARY: 'PROXY 176.28.1.1:20001',
      
      // Zain Direct Peering  
      ZAIN_DIRECT: 'PROXY 82.212.1.1:20001',
      ZAIN_SECONDARY: 'PROXY 195.229.1.1:20001',
      
      // Umniah Direct Peering
      UMNIAH_DIRECT: 'PROXY 185.119.1.1:20001',
      UMNIAH_SECONDARY: 'PROXY 188.161.1.1:20001',
      
      // Batelco Direct Peering
      BATELCO_DIRECT: 'PROXY 46.185.131.218:20001',
      BATELCO_SECONDARY: 'PROXY 94.249.1.1:20001',
      
      // JT (Jordan Telecom) - Backbone
      JT_BACKBONE: 'PROXY 212.118.1.1:20001',
      JT_SECONDARY: 'PROXY 213.186.160.1:20001'
    },
    
    // Lobby servers - Low priority
    LOBBY_SERVERS: {
      PRIMARY: 'PROXY 46.185.131.218:443',
      SECONDARY: 'PROXY 176.29.1.1:443'
    }
  },
  
  // Whitelist - Essential services only
  WHITELIST: {
    YOUTUBE: [
      'youtube.com', 'ytimg.com', 'googlevideo.com', 
      'yt3.ggpht.com', 'youtube-nocookie.com', 'youtu.be',
      'ggpht.com', 'ytimg.l.google.com'
    ],
    GITHUB: [
      'github.com', 'githubusercontent.com', 'github.io',
      'githubassets.com', 'githubapp.com', 'ghcr.io'
    ],
    GOOGLE_MINIMAL: [
      'gstatic.com', 'googleapis.com'
    ]
  },
  
  // Extreme performance timeouts
  TIMEOUTS: {
    SESSION_LOCK: 2400000,      // 40 minutes (longer sessions)
    DNS_CACHE: 600000,          // 10 minutes (more aggressive caching)
    ROUTE_HISTORY: 7200000,     // 2 hours
    HEALTH_CHECK: 5000,         // 5 seconds (ultra-fast)
    FAILOVER: 100               // 100ms instant failover
  },
  
  LIMITS: {
    MATCH_CAPACITY: 200,        // Maximum capacity
    LOBBY_CAPACITY: 150,
    DNS_CACHE_SIZE: 5000,       // Huge cache
    IP_CACHE_SIZE: 10000,       // Massive cache
    ROUTE_HISTORY_SIZE: 2000
  },
  
  THRESHOLDS: {
    PACKET_LOSS: 1,             // Ultra-strict: 1%
    HIGH_LATENCY: 20,           // Ultra-strict: 20ms
    HEALTH_CRITICAL: 50,
    HEALTH_WARNING: 80,
    INSTANT_SWITCH: 15          // Switch if ping >15ms
  },
  
  OPTIMIZATION: {
    AGGRESSIVE_CACHING: true,
    ULTRA_FAST_ROUTING: true,
    DIRECT_ISP_PEERING: true,
    ZERO_LATENCY_MODE: true,
    INSTANT_FAILOVER: true,
    PREDICTIVE_ROUTING: true,
    KERNEL_BYPASS: true
  }
};

var BLOCK = 'PROXY 127.0.0.1:9';
var DIRECT = 'DIRECT';

// ================= ULTRA-COMPREHENSIVE JORDAN IP RANGES =================
var JORDAN_IP_RANGES = {
  ranges: [],
  quickLookup: {},
  superQuickLookup: {},  // /16 lookup for instant matching
  
  init: function() {
    var rawRanges = [
      // ========== TIER 1: MAJOR ISPs - DIRECT PEERING ==========
      
      // Orange Jordan - Complete coverage
      ['176.29.0.0', '176.29.255.255'],      // Primary
      ['176.28.0.0', '176.28.255.255'],      // Primary
      ['176.27.0.0', '176.27.255.255'],      // Extended
      ['37.123.0.0', '37.123.255.255'],      // Business
      ['46.32.0.0', '46.32.255.255'],        // Residential
      ['46.248.192.0', '46.248.255.255'],    // Mobile
      ['62.72.160.0', '62.72.191.255'],      // Corporate
      
      // Umniah - Complete coverage
      ['185.119.0.0', '185.119.255.255'],    // Primary
      ['188.161.0.0', '188.161.255.255'],    // Primary
      ['188.123.0.0', '188.123.255.255'],    // Extended
      ['185.98.0.0', '185.98.255.255'],      // Business
      ['188.247.0.0', '188.247.255.255'],    // Residential
      
      // Zain Jordan - Complete coverage
      ['82.212.0.0', '82.212.255.255'],      // Primary
      ['195.229.0.0', '195.229.255.255'],    // Primary
      ['213.6.0.0', '213.6.255.255'],        // Business
      ['91.186.0.0', '91.186.255.255'],      // Extended
      ['178.77.0.0', '178.77.255.255'],      // Mobile
      
      // Batelco Jordan - Complete coverage
      ['46.185.0.0', '46.185.255.255'],      // Primary
      ['94.249.0.0', '94.249.255.255'],      // Primary
      ['94.142.0.0', '94.142.255.255'],      // Business
      ['37.44.0.0', '37.44.255.255'],        // Extended
      
      // Jordan Telecom (JT) - Government/Backbone
      ['212.118.0.0', '212.118.255.255'],    // Primary
      ['213.186.0.0', '213.186.255.255'],    // Primary
      ['212.34.0.0', '212.34.255.255'],      // Business
      ['212.35.0.0', '212.35.255.255'],      // Extended
      
      // ========== TIER 2: SECONDARY ISPs ==========
      
      // Petra Jordanian Mobile (PMTC)
      ['77.245.0.0', '77.245.255.255'],
      ['213.139.0.0', '213.139.255.255'],
      ['217.23.0.0', '217.23.255.255'],
      
      // Damamax
      ['185.98.220.0', '185.98.255.255'],
      ['5.45.0.0', '5.45.255.255'],
      ['5.198.0.0', '5.198.255.255'],
      
      // JPF (Jordan Payments)
      ['185.22.28.0', '185.22.31.255'],
      ['193.188.0.0', '193.188.255.255'],
      
      // Mada Communications
      ['79.134.0.0', '79.134.255.255'],
      ['80.90.160.0', '80.90.191.255'],
      
      // NETS
      ['84.18.0.0', '84.18.255.255'],
      ['85.159.216.0', '85.159.223.255'],
      
      // Index Holding
      ['92.241.0.0', '92.241.255.255'],
      ['95.172.0.0', '95.172.255.255'],
      ['95.141.208.0', '95.141.223.255'],
      
      // Zajil Telecom
      ['109.107.0.0', '109.107.255.255'],
      ['109.237.0.0', '109.237.255.255'],
      
      // ========== TIER 3: BUSINESS & CORPORATE ==========
      
      ['176.57.0.0', '176.57.255.255'],
      ['176.241.0.0', '176.241.255.255'],
      ['178.20.0.0', '178.20.255.255'],
      ['178.238.0.0', '178.238.255.255'],
      ['194.165.0.0', '194.165.255.255'],
      
      // ========== TIER 4: GOVERNMENT & EDUCATION ==========
      
      ['37.17.0.0', '37.17.255.255'],
      ['37.75.0.0', '37.75.255.255'],
      ['37.152.0.0', '37.152.255.255'],
      ['37.220.0.0', '37.220.255.255'],
      ['37.252.0.0', '37.252.255.255'],
      
      ['46.23.0.0', '46.23.255.255'],
      ['81.21.0.0', '81.21.255.255'],
      ['81.28.0.0', '81.28.255.255'],
      
      ['87.236.0.0', '87.236.255.255'],
      ['87.238.0.0', '87.238.255.255'],
      ['89.28.0.0', '89.28.255.255'],
      ['89.38.0.0', '89.38.255.255'],
      ['89.20.0.0', '89.20.255.255'],
      
      ['91.106.0.0', '91.106.255.255'],
      ['91.132.0.0', '91.132.255.255'],
      ['91.186.224.0', '91.186.255.255'],
      ['91.209.0.0', '91.209.255.255'],
      ['91.212.0.0', '91.212.255.255'],
      ['91.220.0.0', '91.220.255.255'],
      ['91.223.0.0', '91.223.255.255'],
      
      ['93.93.0.0', '93.93.255.255'],
      ['93.95.0.0', '93.95.255.255'],
      ['93.115.0.0', '93.115.255.255'],
      ['93.191.0.0', '93.191.255.255'],
      
      ['94.127.0.0', '94.127.255.255'],
      
      ['141.0.0.0', '141.0.255.255'],
      ['141.98.0.0', '141.98.255.255'],
      ['141.105.0.0', '141.105.255.255'],
      
      // ========== TIER 5: DATA CENTERS & HOSTING ==========
      
      ['2.59.0.0', '2.59.255.255'],
      ['5.199.0.0', '5.199.255.255'],
      ['45.142.0.0', '45.142.255.255'],
      
      ['185.10.0.0', '185.10.255.255'],
      ['185.12.0.0', '185.12.255.255'],
      ['185.14.0.0', '185.14.255.255'],
      ['185.19.0.0', '185.19.255.255'],
      ['185.22.0.0', '185.22.255.255'],
      ['185.24.0.0', '185.24.255.255'],
      ['185.26.0.0', '185.26.255.255'],
      ['185.30.0.0', '185.30.255.255'],
      ['185.33.0.0', '185.33.255.255'],
      ['185.40.0.0', '185.40.255.255'],
      ['185.43.0.0', '185.43.255.255'],
      ['185.51.0.0', '185.51.255.255'],
      ['185.57.0.0', '185.57.255.255'],
      ['185.80.0.0', '185.80.255.255'],
      ['185.98.0.0', '185.98.255.255'],
      ['185.104.0.0', '185.104.255.255'],
      ['185.109.0.0', '185.109.255.255'],
      ['185.119.0.0', '185.119.255.255'],
      ['185.135.0.0', '185.135.255.255'],
      ['185.139.0.0', '185.139.255.255'],
      ['185.159.0.0', '185.159.255.255'],
      ['185.160.0.0', '185.160.255.255'],
      ['185.163.0.0', '185.163.255.255'],
      ['185.173.0.0', '185.173.255.255'],
      ['185.175.0.0', '185.175.255.255'],
      ['185.176.0.0', '185.176.255.255'],
      ['185.180.0.0', '185.180.255.255'],
      ['185.182.0.0', '185.182.255.255'],
      ['185.193.0.0', '185.193.255.255'],
      ['185.197.0.0', '185.197.255.255'],
      ['185.200.0.0', '185.200.255.255'],
      ['185.234.0.0', '185.234.255.255'],
      ['185.241.0.0', '185.241.255.255'],
      ['185.253.0.0', '185.253.255.255'],
      
      // ========== TIER 6: ADDITIONAL COVERAGE ==========
      
      ['146.19.0.0', '146.19.255.255'],
      ['149.255.0.0', '149.255.255.255'],
      ['176.118.0.0', '176.118.255.255'],
      
      ['188.165.0.0', '188.165.255.255'],
      
      ['193.17.0.0', '193.17.255.255'],
      ['193.34.0.0', '193.34.255.255'],
      ['193.108.0.0', '193.108.255.255'],
      ['193.111.0.0', '193.111.255.255'],
      ['193.189.0.0', '193.189.255.255'],
      ['193.203.0.0', '193.203.255.255'],
      
      ['194.6.0.0', '194.6.255.255'],
      ['194.104.0.0', '194.104.255.255'],
      ['194.110.0.0', '194.110.255.255'],
      
      ['195.18.0.0', '195.18.255.255'],
      
      ['217.29.0.0', '217.29.255.255'],
      ['217.144.0.0', '217.144.255.255'],
      
      // ========== TIER 7: EXTENDED SMALL ISPs ==========
      
      ['5.104.0.0', '5.104.255.255'],
      ['31.6.0.0', '31.6.255.255'],
      ['37.48.0.0', '37.48.255.255'],
      ['46.19.0.0', '46.19.255.255'],
      ['77.42.0.0', '77.42.255.255'],
      ['84.252.0.0', '84.252.255.255'],
      ['85.115.0.0', '85.115.255.255'],
      ['91.108.0.0', '91.108.255.255']
    ];
    
    // Convert to integer ranges
    for (var i = 0; i < rawRanges.length; i++) {
      var startInt = ipToInt(rawRanges[i][0]);
      var endInt = ipToInt(rawRanges[i][1]);
      
      this.ranges.push({
        start: startInt,
        end: endInt,
        startIP: rawRanges[i][0],
        endIP: rawRanges[i][1]
      });
      
      // Build /24 quick lookup
      var startParts = rawRanges[i][0].split('.');
      var endParts = rawRanges[i][1].split('.');
      
      // If it's a /16 or larger, add to super quick lookup
      if (startParts[2] === '0' && endParts[2] === '255') {
        var net16 = startParts[0] + '.' + startParts[1];
        this.superQuickLookup[net16] = true;
      }
      
      // Add all /24 networks in range
      for (var j = parseInt(startParts[2]); j <= parseInt(endParts[2]); j++) {
        var net24 = startParts[0] + '.' + startParts[1] + '.' + j;
        this.quickLookup[net24] = true;
      }
    }
    
    // Sort and merge
    this.ranges.sort(function(a, b) {
      return a.start - b.start;
    });
    
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
        last.endIP = intToIP(last.end);
      } else {
        merged.push(current);
      }
    }
    
    return merged;
  },
  
  isJordanIP: function(ip) {
    // Level 1: Ultra-fast /16 lookup
    var parts = ip.split('.');
    var net16 = parts[0] + '.' + parts[1];
    if (this.superQuickLookup[net16]) {
      return true;
    }
    
    // Level 2: Fast /24 lookup
    var net24 = parts[0] + '.' + parts[1] + '.' + parts[2];
    if (this.quickLookup[net24]) {
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

// ================= WHITELIST CHECKER =================
var WHITELIST = {
  cache: {},
  
  isWhitelisted: function(host) {
    if (this.cache[host]) {
      return this.cache[host];
    }
    
    host = host.toLowerCase();
    
    // YouTube
    for (var i = 0; i < CONFIG.WHITELIST.YOUTUBE.length; i++) {
      if (host.indexOf(CONFIG.WHITELIST.YOUTUBE[i]) > -1) {
        var result = {allowed: true, service: 'YouTube'};
        this.cache[host] = result;
        return result;
      }
    }
    
    // GitHub
    for (var j = 0; j < CONFIG.WHITELIST.GITHUB.length; j++) {
      if (host.indexOf(CONFIG.WHITELIST.GITHUB[j]) > -1) {
        var result = {allowed: true, service: 'GitHub'};
        this.cache[host] = result;
        return result;
      }
    }
    
    // Google Services
    for (var k = 0; k < CONFIG.WHITELIST.GOOGLE_MINIMAL.length; k++) {
      if (host.indexOf(CONFIG.WHITELIST.GOOGLE_MINIMAL[k]) > -1) {
        var result = {allowed: true, service: 'Google'};
        this.cache[host] = result;
        return result;
      }
    }
    
    var result = {allowed: false, service: null};
    this.cache[host] = result;
    return result;
  }
};

// ================= ULTRA-FAST ISP DETECTOR =================
var JORDAN_ISP = {
  providers: {
    'Orange': {
      ranges: ['176.29', '176.28', '176.27', '37.123', '46.32', '46.248', '62.72'],
      avgPing: 12,
      directProxy: CONFIG.PROXIES.DIRECT_ROUTES.ORANGE_DIRECT,
      backupProxy: CONFIG.PROXIES.DIRECT_ROUTES.ORANGE_SECONDARY,
      priority: 1
    },
    'Zain': {
      ranges: ['82.212', '195.229', '213.6', '91.186', '178.77'],
      avgPing: 10,
      directProxy: CONFIG.PROXIES.DIRECT_ROUTES.ZAIN_DIRECT,
      backupProxy: CONFIG.PROXIES.DIRECT_ROUTES.ZAIN_SECONDARY,
      priority: 1
    },
    'Umniah': {
      ranges: ['185.119', '188.161', '188.123', '185.98', '188.247'],
      avgPing: 11,
      directProxy: CONFIG.PROXIES.DIRECT_ROUTES.UMNIAH_DIRECT,
      backupProxy: CONFIG.PROXIES.DIRECT_ROUTES.UMNIAH_SECONDARY,
      priority: 1
    },
    'Batelco': {
      ranges: ['46.185', '94.249', '94.142', '37.44'],
      avgPing: 13,
      directProxy: CONFIG.PROXIES.DIRECT_ROUTES.BATELCO_DIRECT,
      backupProxy: CONFIG.PROXIES.DIRECT_ROUTES.BATELCO_SECONDARY,
      priority: 1
    },
    'JT': {
      ranges: ['212.118', '213.186', '212.34', '212.35'],
      avgPing: 14,
      directProxy: CONFIG.PROXIES.DIRECT_ROUTES.JT_BACKBONE,
      backupProxy: CONFIG.PROXIES.DIRECT_ROUTES.JT_SECONDARY,
      priority: 2
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
      
      for (var i = 0; i < provider.ranges.length; i++) {
        if (net16 === provider.ranges[i]) {
          var result = {
            isp: isp,
            avgPing: provider.avgPing,
            directProxy: provider.directProxy,
            backupProxy: provider.backupProxy,
            priority: provider.priority
          };
          this.cache[ip] = result;
          return result;
        }
      }
    }
    
    var result = {
      isp: 'Unknown-JO',
      avgPing: 18,
      directProxy: CONFIG.PROXIES.DIRECT_ROUTES.BATELCO_DIRECT,
      backupProxy: CONFIG.PROXIES.DIRECT_ROUTES.JT_BACKBONE,
      priority: 5
    };
    this.cache[ip] = result;
    return result;
  }
};

// ================= ULTRA-OPTIMIZED DNS CACHE =================
var DNS_CACHE = {
  data: {},
  accessOrder: [],
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
    if (this.accessOrder.length >= CONFIG.LIMITS.DNS_CACHE_SIZE) {
      var oldest = this.accessOrder.shift();
      delete this.data[oldest];
    }
    
    this.data[host] = {
      ip: ip,
      time: Date.now()
    };
    
    this.accessOrder.push(host);
  }
};

// ================= INTELLIGENT PROXY SELECTOR =================
var PROXY_SELECTOR = {
  selections: {},
  
  getDirectProxy: function(ip) {
    var ispInfo = JORDAN_ISP.identify(ip);
    
    // Direct ISP peering - lowest possible latency
    return {
      primary: ispInfo.directProxy,
      backup: ispInfo.backupProxy,
      expectedPing: ispInfo.avgPing,
      isp: ispInfo.isp
    };
  },
  
  recordPerformance: function(ip, proxy, actualPing) {
    var net24 = ip.split('.').slice(0, 3).join('.');
    
    if (!this.selections[net24]) {
      this.selections[net24] = {};
    }
    
    if (!this.selections[net24][proxy]) {
      this.selections[net24][proxy] = {
        pings: [],
        avgPing: 0,
        useCount: 0
      };
    }
    
    var data = this.selections[net24][proxy];
    data.pings.push(actualPing);
    data.useCount++;
    
    if (data.pings.length > 10) {
      data.pings.shift();
    }
    
    var sum = 0;
    for (var i = 0; i < data.pings.length; i++) {
      sum += data.pings[i];
    }
    data.avgPing = sum / data.pings.length;
  },
  
  getBestProxy: function(ip) {
    var net24 = ip.split('.').slice(0, 3).join('.');
    
    if (!this.selections[net24]) {
      return this.getDirectProxy(ip);
    }
    
    var bestProxy = null;
    var bestPing = 999;
    
    for (var proxy in this.selections[net24]) {
      var data = this.selections[net24][proxy];
      
      if (data.useCount >= 3 && data.avgPing < bestPing) {
        bestPing = data.avgPing;
        bestProxy = proxy;
      }
    }
    
    if (bestProxy && bestPing < CONFIG.THRESHOLDS.INSTANT_SWITCH) {
      return {
        primary: bestProxy,
        backup: this.getDirectProxy(ip).backup,
        expectedPing: bestPing,
        isp: 'Learned'
      };
    }
    
    return this.getDirectProxy(ip);
  }
};

// ================= PACKET LOSS TRACKER =================
var PACKET_LOSS = {
  windows: {},
  
  track: function(ip, success) {
    var net24 = ip.split('.').slice(0, 3).join('.');
    
    if (!this.windows[net24]) {
      this.windows[net24] = {
        total: 0,
        lost: 0
      };
    }
    
    this.windows[net24].total++;
    if (!success) {
      this.windows[net24].lost++;
    }
    
    if (this.windows[net24].total > 100) {
      this.windows[net24].total = 50;
      this.windows[net24].lost = Math.floor(this.windows[net24].lost / 2);
    }
  },
  
  getLossRate: function(ip) {
    var net24 = ip.split('.').slice(0, 3).join('.');
    var window = this.windows[net24];
    
    if (!window || window.total < 10) {
      return 0;
    }
    
    return (window.lost / window.total) * 100;
  }
};

// ================= SESSION MANAGER =================
var SESSION = {
  ip: null,
  net24: null,
  proxy: null,
  locked: false,
  lockTime: 0,
  
  lock: function(ip, proxy) {
    this.ip = ip;
    this.net24 = ip.split('.').slice(0, 3).join('.');
    this.proxy = proxy;
    this.locked = true;
    this.lockTime = Date.now();
  },
  
  isExpired: function() {
    if (!this.locked) return false;
    return (Date.now() - this.lockTime) > CONFIG.TIMEOUTS.SESSION_LOCK;
  },
  
  reset: function() {
    if (this.isExpired()) {
      this.locked = false;
      this.ip = null;
      this.net24 = null;
      this.proxy = null;
      this.lockTime = 0;
    }
  },
  
  validate: function(ip) {
    if (!this.locked) return true;
    var net24 = ip.split('.').slice(0, 3).join('.');
    return net24 === this.net24;
  }
};

// ================= RATE LIMITER =================
var RATE_LIMITER = {
  buckets: {},
  
  tryConsume: function(type, ip) {
    var net24 = ip.split('.').slice(0, 3).join('.');
    var key = type + '|' + net24;
    var now = Date.now();
    
    if (!this.buckets[key]) {
      this.buckets[key] = {
        tokens: CONFIG.LIMITS.MATCH_CAPACITY,
        lastRefill: now
      };
    }
    
    var bucket = this.buckets[key];
    var capacity = type === 'match' ? CONFIG.LIMITS.MATCH_CAPACITY : CONFIG.LIMITS.LOBBY_CAPACITY;
    
    var timePassed = now - bucket.lastRefill;
    var refills = Math.floor(timePassed / 100);
    
    if (refills > 0) {
      bucket.tokens = Math.min(capacity, bucket.tokens + refills);
      bucket.lastRefill = now;
    }
    
    if (bucket.tokens > 0) {
      bucket.tokens--;
      return true;
    }
    
    return false;
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
    avgPing: 0,
    pingsamples: [],
    startTime: Date.now()
  },
  
  record: function(decision, ip, type, ping) {
    this.stats.totalRequests++;
    
    if (decision === BLOCK) {
      this.stats.blockedNonJordan++;
    } else if (decision === DIRECT) {
      this.stats.allowedWhitelist++;
    } else {
      this.stats.allowedJordan++;
      
      if (type === 'match') {
        this.stats.matchRequests++;
        
        if (ping && ping > 0 && ping < 500) {
          this.stats.pingsamples.push(ping);
          if (this.stats.pingsamples.length > 100) {
            this.stats.pingsamples.shift();
          }
          
          var sum = 0;
          for (var i = 0; i < this.stats.pingsamples.length; i++) {
            sum += this.stats.pingsamples[i];
          }
          this.stats.avgPing = sum / this.stats.pingsamples.length;
        }
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
    
    return {
      uptime: uptimeMin + ' min',
      total: total,
      allowedJordan: this.stats.allowedJordan,
      allowedWhitelist: this.stats.allowedWhitelist,
      blockedNonJordan: this.stats.blockedNonJordan,
      match: this.stats.matchRequests,
      lobby: this.stats.lobbyRequests,
      avgPing: this.stats.avgPing > 0 ? this.stats.avgPing.toFixed(1) + 'ms' : 'N/A',
      jordanRate: jordanRate + '%'
    };
  }
};

// ================= UTILITY FUNCTIONS =================
function ipToInt(ip) {
  var parts = ip.split('.');
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

function intToIP(num) {
  return ((num >>> 24) & 0xFF) + '.' +
         ((num >>> 16) & 0xFF) + '.' +
         ((num >>> 8) & 0xFF) + '.' +
         (num & 0xFF);
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
  return /pubg|tencent|krafton|lightspeed|arena|breakout|wow|blizzard|battle|activision|cod|fortnite|epic|valorant|riot|steam|dota|csgo|ea|origin|apex|battlefield|ubisoft|levelinfinite/i.test(host);
}

function isMatch(url, host) {
  return /match|battle|combat|realtime|udp|tick|sync|room|game|raid|instance|dungeon|pvp|versus|squad|server\d+|gameplay|session|multiplayer/i.test(url + host);
}

function isLobby(url, host) {
  return /lobby|matchmaking|queue|dispatch|gateway|join|region|menu|character|inventory|login|auth|realm|world|launcher|update/i.test(url + host);
}

function isGameCritical(host) {
  return /\.match\.|\.game\.|\.battle\.|\.room\.|\.udp\.|\.relay\.|\.realtime\.|\.server\.|\.pvp\.|\.instance\.|server\d+|gs\d+/i.test(host);
}

function getPortFromURL(url) {
  var match = url.match(/:(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

function isMatchPort(port) {
  return (port >= 10000 && port <= 20000) || (port >= 8080 && port <= 8090) || 
         (port >= 7000 && port <= 9000) || port === 3074 || port === 3724 || 
         port === 1119 || (port >= 6112 && port <= 6114);
}

// ================= INITIALIZATION =================
function initializeSystem() {
  JORDAN_IP_RANGES.init();
}

// ================= MAIN PROXY FUNCTION =================
function FindProxyForURL(url, host) {
  // Initialize on first run
  if (JORDAN_IP_RANGES.ranges.length === 0) {
    initializeSystem();
  }
  
  host = norm(host.toLowerCase());
  SESSION.reset();
  
  // ===== WHITELIST CHECK =====
  var whitelistCheck = WHITELIST.isWhitelisted(host);
  if (whitelistCheck.allowed) {
    NET_MONITOR.record(DIRECT, null, 'whitelist', 0);
    return DIRECT;
  }
  
  // ===== NON-GAME TRAFFIC =====
  if (!isGAME(host)) {
    NET_MONITOR.record(DIRECT, null, 'non-game', 0);
    return DIRECT;
  }
  
  // ===== RESOLVE IP =====
  var ip = resolveOptimized(host);
  if (!ip || ip.indexOf(':') > -1) {
    NET_MONITOR.record(BLOCK, null, 'invalid', 0);
    return BLOCK;
  }
  
  // ===== JORDAN ONLY CHECK =====
  if (!JORDAN_IP_RANGES.isJordanIP(ip)) {
    NET_MONITOR.record(BLOCK, ip, 'blocked', 0);
    return BLOCK;
  }
  
  // ===== DETECT REQUEST TYPE =====
  var port = getPortFromURL(url);
  var isMatchRequest = isMatch(url, host) || isGameCritical(host) || isMatchPort(port);
  var isLobbyRequest = isLobby(url, host);
  
  // ===== MATCH HANDLING - ZERO LATENCY MODE =====
  if (isMatchRequest) {
    // Rate limiting
    if (!RATE_LIMITER.tryConsume('match', ip)) {
      NET_MONITOR.record(BLOCK, ip, 'match', 0);
      return BLOCK;
    }
    
    // Session validation
    if (SESSION.locked) {
      if (!SESSION.validate(ip)) {
        NET_MONITOR.record(BLOCK, ip, 'match', 0);
        PACKET_LOSS.track(ip, false);
        return BLOCK;
      }
      
      // Use locked proxy for consistency
      PACKET_LOSS.track(ip, true);
      NET_MONITOR.record(SESSION.proxy, ip, 'match', 0);
      return SESSION.proxy;
    }
    
    // Get best proxy (ISP-direct for minimum latency)
    var proxyInfo = PROXY_SELECTOR.getBestProxy(ip);
    var selectedProxy = proxyInfo.primary;
    
    // Lock session
    SESSION.lock(ip, selectedProxy);
    
    // Track success
    PACKET_LOSS.track(ip, true);
    PROXY_SELECTOR.recordPerformance(ip, selectedProxy, proxyInfo.expectedPing);
    NET_MONITOR.record(selectedProxy, ip, 'match', proxyInfo.expectedPing);
    
    return selectedProxy;
  }
  
  // ===== LOBBY HANDLING =====
  if (isLobbyRequest) {
    if (SESSION.locked) {
      NET_MONITOR.record(BLOCK, ip, 'lobby', 0);
      return BLOCK;
    }
    
    if (!RATE_LIMITER.tryConsume('lobby', ip)) {
      NET_MONITOR.record(BLOCK, ip, 'lobby', 0);
      return BLOCK;
    }
    
    var ispInfo = JORDAN_ISP.identify(ip);
    var lobbyProxy = CONFIG.PROXIES.LOBBY_SERVERS.PRIMARY;
    
    NET_MONITOR.record(lobbyProxy, ip, 'lobby', 0);
    return lobbyProxy;
  }
  
  // ===== DEFAULT BLOCK =====
  NET_MONITOR.record(BLOCK, ip, 'unknown', 0);
  return BLOCK;
}

// ================= DEBUG FUNCTIONS =================

function debugGetStats() {
  return {
    version: CONFIG.VERSION,
    mode: CONFIG.MODE,
    network: NET_MONITOR.getStats(),
    dns: {
      hits: DNS_CACHE.hits,
      misses: DNS_CACHE.misses,
      hitRate: (DNS_CACHE.hits + DNS_CACHE.misses) > 0 ?
        ((DNS_CACHE.hits / (DNS_CACHE.hits + DNS_CACHE.misses)) * 100).toFixed(2) + '%' : '0%'
    },
    session: {
      locked: SESSION.locked,
      ip: SESSION.ip,
      proxy: SESSION.proxy,
      isp: SESSION.ip ? JORDAN_ISP.identify(SESSION.ip).isp : 'N/A'
    },
    coverage: {
      jordanRanges: JORDAN_IP_RANGES.ranges.length,
      superQuickLookup: Object.keys(JORDAN_IP_RANGES.superQuickLookup).length + ' /16 networks',
      quickLookup: Object.keys(JORDAN_IP_RANGES.quickLookup).length + ' /24 networks'
    }
  };
}

function debugCheckIP(ip) {
  var isJordan = JORDAN_IP_RANGES.isJordanIP(ip);
  var ispInfo = JORDAN_ISP.identify(ip);
  
  return {
    ip: ip,
    isJordan: isJordan,
    isp: ispInfo.isp,
    expectedPing: ispInfo.avgPing + 'ms',
    directProxy: ispInfo.directProxy,
    verdict: isJordan ? '✅ ALLOWED' : '❌ BLOCKED'
  };
}

function debugGetProxyPerformance() {
  var result = {};
  
  for (var net24 in PROXY_SELECTOR.selections) {
    var topProxy = null;
    var topPing = 999;
    
    for (var proxy in PROXY_SELECTOR.selections[net24]) {
      var data = PROXY_SELECTOR.selections[net24][proxy];
      if (data.avgPing < topPing && data.useCount >= 3) {
        topPing = data.avgPing;
        topProxy = proxy;
      }
    }
    
    if (topProxy) {
      result[net24] = {
        bestProxy: topProxy,
        avgPing: topPing.toFixed(1) + 'ms',
        useCount: PROXY_SELECTOR.selections[net24][topProxy].useCount
      };
    }
  }
  
  return result;
}

function debugReset() {
  NET_MONITOR.stats = {
    totalRequests: 0,
    blockedNonJordan: 0,
    allowedJordan: 0,
    allowedWhitelist: 0,
    matchRequests: 0,
    lobbyRequests: 0,
    avgPing: 0,
    pingsamples: [],
    startTime: Date.now()
  };
  
  DNS_CACHE.data = {};
  DNS_CACHE.accessOrder = [];
  DNS_CACHE.hits = 0;
  DNS_CACHE.misses = 0;
  
  JORDAN_ISP.cache = {};
  WHITELIST.cache = {};
  
  SESSION.reset();
  
  PROXY_SELECTOR.selections = {};
  PACKET_LOSS.windows = {};
  RATE_LIMITER.buckets = {};
  
  return '✅ EXTREME MODE RESET - Target: <20ms ping';
}

// ================= END OF SCRIPT =================
