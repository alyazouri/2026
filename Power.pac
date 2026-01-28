// ==================================================
// ULTIMATE JORDAN ONLY BOOSTER - FINAL OPTIMIZED EDITION V6
// Enhanced Performance + Maximum Jordan Coverage + AI Routing
// Binary Search + LRU Cache + Failover System + Smart Load Balancing
// ==================================================

// ================= CONFIGURATION =================
var CONFIG = {
  VERSION: '6.0.0',
  BUILD_DATE: '2025-01-28',
  
  PROXIES: {
    PRIMARY_MATCH: 'PROXY 46.185.131.218:20001',
    PRIMARY_LOBBY: 'PROXY 46.185.131.218:443',
    BACKUP_MATCH: [
      'PROXY 82.212.64.10:20001',
      'PROXY 94.249.5.5:20001',
      'PROXY 176.29.10.10:20001',
      'PROXY 185.119.88.10:20001'
    ]
  },
  
  TIMEOUTS: {
    SESSION_LOCK: 1800000,      // 30 minutes
    DNS_CACHE: 180000,          // 3 minutes
    ROUTE_HISTORY: 3600000,     // 1 hour
    HEALTH_CHECK: 30000         // 30 seconds
  },
  
  LIMITS: {
    MATCH_CAPACITY: 100,
    LOBBY_CAPACITY: 50,
    DNS_CACHE_SIZE: 1000,
    IP_CACHE_SIZE: 2000,
    ROUTE_HISTORY_SIZE: 500
  },
  
  THRESHOLDS: {
    PACKET_LOSS: 5,             // 5%
    HIGH_LATENCY: 100,          // 100ms
    HEALTH_CRITICAL: 30,        // 30%
    HEALTH_WARNING: 60          // 60%
  }
};

var BLOCK = 'PROXY 127.0.0.1:9';
var DIRECT = 'DIRECT';

// ================= JORDAN IP RANGES =================
var JORDAN_IP_RANGES = {
  // All Jordan IP ranges converted to integer ranges for binary search
  ranges: [],
  
  init: function() {
    var rawRanges = [
      // /18 blocks
      ['178.77.128.0', '178.77.191.255'],
      
      // /19 blocks
      ['37.123.64.0', '37.123.95.255'],
      ['46.32.96.0', '46.32.127.255'],
      ['46.248.192.0', '46.248.223.255'],
      ['62.72.160.0', '62.72.191.255'],
      ['79.134.128.0', '79.134.159.255'],
      ['84.18.32.0', '84.18.63.255'],
      ['84.18.64.0', '84.18.95.255'],
      ['91.186.224.0', '91.186.255.255'],
      ['92.241.32.0', '92.241.63.255'],
      ['94.142.32.0', '94.142.63.255'],
      ['95.172.192.0', '95.172.223.255'],
      ['109.107.224.0', '109.107.255.255'],
      ['176.57.0.0', '176.57.31.255'],
      ['188.123.160.0', '188.123.191.255'],
      ['188.247.64.0', '188.247.95.255'],
      ['193.188.64.0', '193.188.95.255'],
      ['194.165.128.0', '194.165.159.255'],
      ['212.34.0.0', '212.34.31.255'],
      ['212.35.64.0', '212.35.95.255'],
      ['212.118.0.0', '212.118.31.255'],
      ['213.139.32.0', '213.139.63.255'],
      ['213.186.160.0', '213.186.191.255'],
      
      // /20 blocks
      ['5.45.128.0', '5.45.143.255'],
      ['37.17.192.0', '37.17.207.255'],
      ['37.220.112.0', '37.220.127.255'],
      ['46.23.112.0', '46.23.127.255'],
      ['77.245.0.0', '77.245.15.255'],
      ['80.90.160.0', '80.90.175.255'],
      ['81.21.0.0', '81.21.15.255'],
      ['81.28.112.0', '81.28.127.255'],
      ['91.106.96.0', '91.106.111.255'],
      ['95.141.208.0', '95.141.223.255'],
      ['109.237.192.0', '109.237.207.255'],
      ['176.57.48.0', '176.57.63.255'],
      ['178.238.176.0', '178.238.191.255'],
      ['217.23.32.0', '217.23.47.255'],
      ['217.29.240.0', '217.29.255.255'],
      ['217.144.0.0', '217.144.15.255'],
      
      // /21 blocks
      ['5.198.240.0', '5.198.247.255'],
      ['37.44.32.0', '37.44.39.255'],
      ['37.75.144.0', '37.75.151.255'],
      ['37.152.0.0', '37.152.7.255'],
      ['85.159.216.0', '85.159.223.255'],
      ['87.236.232.0', '87.236.239.255'],
      ['87.238.128.0', '87.238.135.255'],
      ['89.28.216.0', '89.28.223.255'],
      ['93.93.144.0', '93.93.151.255'],
      ['93.95.200.0', '93.95.207.255'],
      ['93.191.176.0', '93.191.183.255'],
      ['94.127.208.0', '94.127.215.255'],
      ['141.0.0.0', '141.0.7.255'],
      ['141.105.56.0', '141.105.63.255'],
      ['176.241.64.0', '176.241.71.255'],
      ['178.20.184.0', '178.20.191.255'],
      
      // /22 blocks
      ['2.59.52.0', '2.59.55.255'],
      ['5.199.184.0', '5.199.187.255'],
      ['45.142.196.0', '45.142.199.255'],
      ['141.98.64.0', '141.98.67.255'],
      ['185.10.216.0', '185.10.219.255'],
      ['185.12.244.0', '185.12.247.255'],
      ['185.14.132.0', '185.14.135.255'],
      ['185.19.112.0', '185.19.115.255'],
      ['185.24.128.0', '185.24.131.255'],
      ['185.30.248.0', '185.30.251.255'],
      ['185.33.28.0', '185.33.31.255'],
      ['185.51.212.0', '185.51.215.255'],
      ['185.57.120.0', '185.57.123.255'],
      ['185.80.24.0', '185.80.27.255'],
      ['185.80.104.0', '185.80.107.255'],
      ['185.98.220.0', '185.98.223.255'],
      ['185.98.224.0', '185.98.227.255'],
      ['185.109.120.0', '185.109.123.255'],
      ['185.109.192.0', '185.109.195.255'],
      ['185.135.200.0', '185.135.203.255'],
      ['185.139.220.0', '185.139.223.255'],
      ['185.159.180.0', '185.159.183.255'],
      ['185.160.236.0', '185.160.239.255'],
      ['185.173.56.0', '185.173.59.255'],
      ['185.175.248.0', '185.175.251.255'],
      ['185.176.44.0', '185.176.47.255'],
      ['185.180.80.0', '185.180.83.255'],
      ['185.182.136.0', '185.182.139.255'],
      ['185.193.176.0', '185.193.179.255'],
      ['185.197.176.0', '185.197.179.255'],
      ['185.200.128.0', '185.200.131.255'],
      ['185.253.112.0', '185.253.115.255'],
      
      // /23 blocks
      ['89.38.152.0', '89.38.153.255'],
      ['193.203.24.0', '193.203.25.255'],
      ['193.203.110.0', '193.203.111.255'],
      ['193.108.134.0', '193.108.135.255'],
      
      // /24 blocks
      ['37.252.222.0', '37.252.222.255'],
      ['84.252.106.0', '84.252.106.255'],
      ['89.20.49.0', '89.20.49.255'],
      ['91.132.100.0', '91.132.100.255'],
      ['91.212.0.0', '91.212.0.255'],
      ['91.223.202.0', '91.223.202.255'],
      ['93.115.2.0', '93.115.2.255'],
      ['93.115.3.0', '93.115.3.255'],
      ['93.115.15.0', '93.115.15.255'],
      ['146.19.239.0', '146.19.239.255'],
      ['146.19.246.0', '146.19.246.255'],
      ['176.118.39.0', '176.118.39.255'],
      ['185.40.19.0', '185.40.19.255'],
      ['185.43.146.0', '185.43.146.255'],
      ['185.163.205.0', '185.163.205.255'],
      ['185.234.111.0', '185.234.111.255'],
      ['185.241.62.0', '185.241.62.255'],
      ['194.104.95.0', '194.104.95.255'],
      ['195.18.9.0', '195.18.9.255'],
      ['91.209.248.0', '91.209.248.255'],
      ['91.220.195.0', '91.220.195.255'],
      ['193.17.53.0', '193.17.53.255'],
      ['193.111.29.0', '193.111.29.255'],
      ['193.189.148.0', '193.189.148.255'],
      ['194.110.236.0', '194.110.236.255']
    ];
    
    // Convert to integer ranges and sort
    for (var i = 0; i < rawRanges.length; i++) {
      this.ranges.push({
        start: ipToInt(rawRanges[i][0]),
        end: ipToInt(rawRanges[i][1]),
        startIP: rawRanges[i][0],
        endIP: rawRanges[i][1]
      });
    }
    
    // Sort by start IP
    this.ranges.sort(function(a, b) {
      return a.start - b.start;
    });
    
    // Merge overlapping ranges
    this.ranges = this.mergeRanges(this.ranges);
  },
  
  mergeRanges: function(ranges) {
    if (ranges.length === 0) return [];
    
    var merged = [ranges[0]];
    
    for (var i = 1; i < ranges.length; i++) {
      var current = ranges[i];
      var last = merged[merged.length - 1];
      
      if (current.start <= last.end + 1) {
        // Overlapping or adjacent, merge
        last.end = Math.max(last.end, current.end);
        last.endIP = intToIP(last.end);
      } else {
        merged.push(current);
      }
    }
    
    return merged;
  },
  
  isJordanIP: function(ip) {
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

// ================= REGIONAL BLOCKER =================
var REGION_BLOCKER = {
  ranges: [],
  
  init: function() {
    var blockedRanges = [
      // Middle East (excluding Jordan)
      // UAE
      ['5.36.0.0', '5.39.255.255'],
      ['31.193.128.0', '31.193.255.255'],
      ['37.230.0.0', '37.231.255.255'],
      ['185.45.0.0', '185.45.255.255'],
      
      // Saudi Arabia
      ['31.192.0.0', '31.207.255.255'],
      ['46.240.0.0', '46.255.255.255'],
      ['78.89.0.0', '78.89.255.255'],
      ['188.245.0.0', '188.245.255.255'],
      
      // Kuwait
      ['37.36.0.0', '37.39.255.255'],
      ['185.56.0.0', '185.59.255.255'],
      
      // Qatar
      ['37.202.0.0', '37.203.255.255'],
      ['185.22.28.0', '185.22.31.255'],
      
      // Egypt
      ['41.32.0.0', '41.63.255.255'],
      ['41.64.0.0', '41.127.255.255'],
      ['156.160.0.0', '156.191.255.255'],
      ['197.32.0.0', '197.63.255.255'],
      
      // Lebanon
      ['178.135.0.0', '178.135.255.255'],
      ['185.22.136.0', '185.22.139.255'],
      
      // Iraq
      ['37.236.0.0', '37.239.255.255'],
      ['151.236.0.0', '151.239.255.255'],
      
      // Palestine
      ['185.98.128.0', '185.98.191.255'],
      ['31.168.0.0', '31.168.255.255'],
      
      // Syria
      ['5.0.0.0', '5.127.255.255'],
      ['37.17.128.0', '37.17.255.255'],
      
      // Iran
      ['2.176.0.0', '2.191.255.255'],
      ['5.22.0.0', '5.23.255.255'],
      ['31.2.0.0', '31.3.255.255'],
      
      // Turkey
      ['31.145.0.0', '31.145.255.255'],
      ['78.160.0.0', '78.191.255.255'],
      ['88.228.0.0', '88.231.255.255'],
      ['176.88.0.0', '176.95.255.255'],
      
      // Europe - Major countries
      // Germany
      ['2.16.0.0', '2.31.255.255'],
      ['5.1.0.0', '5.1.255.255'],
      ['31.16.0.0', '31.31.255.255'],
      ['46.4.0.0', '46.7.255.255'],
      
      // UK
      ['2.24.0.0', '2.31.255.255'],
      ['5.24.0.0', '5.31.255.255'],
      ['31.24.0.0', '31.31.255.255'],
      
      // France
      ['2.0.0.0', '2.1.255.255'],
      ['5.39.0.0', '5.39.255.255'],
      ['31.10.0.0', '31.11.255.255'],
      
      // Russia
      ['2.60.0.0', '2.63.255.255'],
      ['5.8.0.0', '5.15.255.255'],
      ['31.40.0.0', '31.47.255.255'],
      ['77.88.0.0', '77.95.255.255'],
      
      // Asia - Major countries
      // India
      ['1.22.0.0', '1.23.255.255'],
      ['14.96.0.0', '14.127.255.255'],
      ['27.0.0.0', '27.31.255.255'],
      ['103.1.0.0', '103.1.255.255'],
      
      // Pakistan
      ['39.32.0.0', '39.63.255.255'],
      ['103.4.0.0', '103.7.255.255'],
      ['110.36.0.0', '110.39.255.255'],
      
      // China
      ['1.0.0.0', '1.0.255.255'],
      ['14.0.0.0', '14.127.255.255'],
      ['27.0.0.0', '27.191.255.255'],
      ['36.0.0.0', '36.191.255.255'],
      
      // Africa
      // South Africa
      ['41.0.0.0', '41.127.255.255'],
      ['102.0.0.0', '102.127.255.255'],
      ['105.0.0.0', '105.127.255.255'],
      
      // Americas
      // USA
      ['3.0.0.0', '3.255.255.255'],
      ['4.0.0.0', '4.255.255.255'],
      ['6.0.0.0', '6.255.255.255'],
      ['7.0.0.0', '7.255.255.255'],
      ['8.0.0.0', '8.255.255.255'],
      ['12.0.0.0', '12.255.255.255'],
      
      // Brazil
      ['177.0.0.0', '177.127.255.255'],
      ['179.0.0.0', '179.127.255.255'],
      ['186.0.0.0', '186.127.255.255']
    ];
    
    for (var i = 0; i < blockedRanges.length; i++) {
      this.ranges.push({
        start: ipToInt(blockedRanges[i][0]),
        end: ipToInt(blockedRanges[i][1])
      });
    }
    
    this.ranges.sort(function(a, b) {
      return a.start - b.start;
    });
  },
  
  isBlocked: function(ip) {
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

// ================= JORDAN ISP VALIDATOR =================
var JORDAN_ISP = {
  providers: {
    'Orange': {
      prefixes: ['176.29.', '176.28.', '37.123.', '46.32.', '46.248.'],
      ranges: [
        [ipToInt('176.29.0.0'), ipToInt('176.29.255.255')],
        [ipToInt('176.28.0.0'), ipToInt('176.28.255.255')],
        [ipToInt('37.123.64.0'), ipToInt('37.123.95.255')]
      ]
    },
    'Umniah': {
      prefixes: ['185.119.', '188.161.', '185.98.', '188.123.'],
      ranges: [
        [ipToInt('185.119.0.0'), ipToInt('185.119.255.255')],
        [ipToInt('188.161.0.0'), ipToInt('188.161.255.255')],
        [ipToInt('185.98.224.0'), ipToInt('185.98.227.255')]
      ]
    },
    'Zain': {
      prefixes: ['82.212.', '195.229.', '213.6.', '91.186.'],
      ranges: [
        [ipToInt('82.212.0.0'), ipToInt('82.212.255.255')],
        [ipToInt('195.229.0.0'), ipToInt('195.229.255.255')],
        [ipToInt('213.6.0.0'), ipToInt('213.6.255.255')]
      ]
    },
    'Batelco': {
      prefixes: ['46.185.', '94.249.', '37.44.', '94.142.'],
      ranges: [
        [ipToInt('46.185.0.0'), ipToInt('46.185.255.255')],
        [ipToInt('94.249.0.0'), ipToInt('94.249.255.255')],
        [ipToInt('37.44.32.0'), ipToInt('37.44.39.255')]
      ]
    },
    'Petra': {
      prefixes: ['213.6.', '212.35.', '77.245.'],
      ranges: [
        [ipToInt('212.35.64.0'), ipToInt('212.35.95.255')],
        [ipToInt('77.245.0.0'), ipToInt('77.245.15.255')]
      ]
    },
    'Damamax': {
      prefixes: ['185.98.220.', '5.45.128.'],
      ranges: [
        [ipToInt('185.98.220.0'), ipToInt('185.98.223.255')],
        [ipToInt('5.45.128.0'), ipToInt('5.45.143.255')]
      ]
    },
    'JPF': {
      prefixes: ['185.22.28.'],
      ranges: [
        [ipToInt('185.22.28.0'), ipToInt('185.22.28.255')]
      ]
    }
  },
  
  cache: {},
  cacheHits: 0,
  cacheMisses: 0,
  
  identify: function(ip) {
    // Check cache first
    if (this.cache[ip]) {
      this.cacheHits++;
      return this.cache[ip];
    }
    
    this.cacheMisses++;
    var ipInt = ipToInt(ip);
    
    // Check each ISP
    for (var isp in this.providers) {
      var provider = this.providers[isp];
      
      // Quick prefix check
      for (var i = 0; i < provider.prefixes.length; i++) {
        if (ip.indexOf(provider.prefixes[i]) === 0) {
          var result = {isp: isp, method: 'prefix'};
          this.cache[ip] = result;
          return result;
        }
      }
      
      // Range check
      for (var j = 0; j < provider.ranges.length; j++) {
        var range = provider.ranges[j];
        if (ipInt >= range[0] && ipInt <= range[1]) {
          var result = {isp: isp, method: 'range'};
          this.cache[ip] = result;
          return result;
        }
      }
    }
    
    // Check if it's in Jordan ranges but unknown ISP
    if (JORDAN_IP_RANGES.isJordanIP(ip)) {
      var result = {isp: 'Unknown-JO', method: 'national'};
      this.cache[ip] = result;
      return result;
    }
    
    var result = {isp: null, method: null};
    this.cache[ip] = result;
    return result;
  },
  
  clearOldCache: function() {
    if (Object.keys(this.cache).length > CONFIG.LIMITS.IP_CACHE_SIZE) {
      this.cache = {};
      this.cacheHits = 0;
      this.cacheMisses = 0;
    }
  }
};

// ================= DNS CACHE WITH LRU =================
var DNS_CACHE = {
  data: {},
  accessOrder: [],
  hits: 0,
  misses: 0,
  
  get: function(host) {
    var entry = this.data[host];
    if (entry && (Date.now() - entry.time) < CONFIG.TIMEOUTS.DNS_CACHE) {
      this.hits++;
      this.updateAccess(host);
      return entry.ip;
    }
    this.misses++;
    return null;
  },
  
  set: function(host, ip) {
    // Remove oldest if cache is full
    if (this.accessOrder.length >= CONFIG.LIMITS.DNS_CACHE_SIZE) {
      var oldest = this.accessOrder.shift();
      delete this.data[oldest];
    }
    
    this.data[host] = {
      ip: ip,
      time: Date.now()
    };
    
    this.updateAccess(host);
  },
  
  updateAccess: function(host) {
    var idx = this.accessOrder.indexOf(host);
    if (idx > -1) {
      this.accessOrder.splice(idx, 1);
    }
    this.accessOrder.push(host);
  },
  
  getStats: function() {
    var total = this.hits + this.misses;
    return {
      hits: this.hits,
      misses: this.misses,
      hitRate: total > 0 ? ((this.hits / total) * 100).toFixed(2) + '%' : '0%',
      cacheSize: Object.keys(this.data).length
    };
  }
};

// ================= SMART PROXY POOL =================
var PROXY_POOL = {
  proxies: [],
  
  init: function() {
    this.proxies = [
      {
        url: CONFIG.PROXIES.PRIMARY_MATCH,
        health: 100,
        load: 0,
        successCount: 0,
        failCount: 0,
        lastCheck: Date.now(),
        region: 'South'
      }
    ];
    
    // Add backup proxies
    for (var i = 0; i < CONFIG.PROXIES.BACKUP_MATCH.length; i++) {
      this.proxies.push({
        url: CONFIG.PROXIES.BACKUP_MATCH[i],
        health: 100,
        load: 0,
        successCount: 0,
        failCount: 0,
        lastCheck: Date.now(),
        region: this.detectRegion(CONFIG.PROXIES.BACKUP_MATCH[i])
      });
    }
  },
  
  detectRegion: function(proxyUrl) {
    if (proxyUrl.indexOf('82.212.') > -1 || proxyUrl.indexOf('94.249.') > -1) {
      return 'North';
    } else if (proxyUrl.indexOf('176.29.') > -1 || proxyUrl.indexOf('185.119.') > -1) {
      return 'Central';
    }
    return 'South';
  },
  
  getOptimal: function(ip) {
    // Filter healthy proxies
    var healthy = [];
    for (var i = 0; i < this.proxies.length; i++) {
      var proxy = this.proxies[i];
      if (proxy.health > CONFIG.THRESHOLDS.HEALTH_WARNING && proxy.load < CONFIG.LIMITS.MATCH_CAPACITY) {
        healthy.push(proxy);
      }
    }
    
    if (healthy.length === 0) {
      // All proxies unhealthy, use least loaded
      return this.getLeastLoaded();
    }
    
    // Check AI routing first
    var aiRoute = ROUTE_AI.getBestRoute(ip);
    if (aiRoute) {
      var aiProxy = this.findProxy(aiRoute);
      if (aiProxy && aiProxy.health > CONFIG.THRESHOLDS.HEALTH_WARNING) {
        return aiProxy;
      }
    }
    
    // Use geographic routing
    var region = this.detectClientRegion(ip);
    for (var j = 0; j < healthy.length; j++) {
      if (healthy[j].region === region) {
        return healthy[j];
      }
    }
    
    // Return least loaded
    return this.getLeastLoaded();
  },
  
  detectClientRegion: function(ip) {
    if (ip.indexOf('82.212.') === 0 || ip.indexOf('94.249.') === 0) {
      return 'North';
    } else if (ip.indexOf('176.29.') === 0 || ip.indexOf('185.119.') === 0) {
      return 'Central';
    }
    return 'South';
  },
  
  getLeastLoaded: function() {
    var best = this.proxies[0];
    for (var i = 1; i < this.proxies.length; i++) {
      if (this.proxies[i].load < best.load) {
        best = this.proxies[i];
      }
    }
    return best;
  },
  
  findProxy: function(url) {
    for (var i = 0; i < this.proxies.length; i++) {
      if (this.proxies[i].url === url) {
        return this.proxies[i];
      }
    }
    return null;
  },
  
  recordSuccess: function(proxyUrl) {
    var proxy = this.findProxy(proxyUrl);
    if (!proxy) return;
    
    proxy.successCount++;
    proxy.health = Math.min(100, proxy.health + 2);
    proxy.load = Math.max(0, proxy.load - 1);
    proxy.lastCheck = Date.now();
  },
  
  recordFailure: function(proxyUrl) {
    var proxy = this.findProxy(proxyUrl);
    if (!proxy) return;
    
    proxy.failCount++;
    proxy.health = Math.max(0, proxy.health - 10);
    proxy.lastCheck = Date.now();
  },
  
  incrementLoad: function(proxyUrl) {
    var proxy = this.findProxy(proxyUrl);
    if (proxy) {
      proxy.load++;
    }
  }
};

// ================= AI ROUTE LEARNING =================
var ROUTE_AI = {
  history: {},
  
  recordSuccess: function(ip, proxy) {
    if (!this.history[ip]) {
      this.history[ip] = {
        routes: {},
        bestRoute: null,
        totalRequests: 0
      };
    }
    
    if (!this.history[ip].routes[proxy]) {
      this.history[ip].routes[proxy] = {
        successes: 0,
        failures: 0,
        avgLatency: 0,
        samples: []
      };
    }
    
    var route = this.history[ip].routes[proxy];
    route.successes++;
    this.history[ip].totalRequests++;
    
    this.updateBestRoute(ip);
    this.cleanup();
  },
  
  recordFailure: function(ip, proxy) {
    if (!this.history[ip]) {
      this.history[ip] = {
        routes: {},
        bestRoute: null,
        totalRequests: 0
      };
    }
    
    if (!this.history[ip].routes[proxy]) {
      this.history[ip].routes[proxy] = {
        successes: 0,
        failures: 0,
        avgLatency: 0,
        samples: []
      };
    }
    
    this.history[ip].routes[proxy].failures++;
    this.history[ip].totalRequests++;
    
    this.updateBestRoute(ip);
  },
  
  updateBestRoute: function(ip) {
    var ipData = this.history[ip];
    if (!ipData) return;
    
    var bestScore = -1;
    var bestProxy = null;
    
    for (var proxy in ipData.routes) {
      var route = ipData.routes[proxy];
      var total = route.successes + route.failures;
      
      if (total < 3) continue; // Need at least 3 samples
      
      var reliability = (route.successes / total) * 100;
      var score = reliability;
      
      if (score > bestScore) {
        bestScore = score;
        bestProxy = proxy;
      }
    }
    
    ipData.bestRoute = bestProxy;
  },
  
  getBestRoute: function(ip) {
    if (this.history[ip] && this.history[ip].bestRoute) {
      var route = this.history[ip].routes[this.history[ip].bestRoute];
      var total = route.successes + route.failures;
      var reliability = (route.successes / total) * 100;
      
      if (reliability > 70) {
        return this.history[ip].bestRoute;
      }
    }
    return null;
  },
  
  cleanup: function() {
    var count = Object.keys(this.history).length;
    if (count > CONFIG.LIMITS.ROUTE_HISTORY_SIZE) {
      // Remove oldest 20%
      var toRemove = Math.floor(count * 0.2);
      var keys = Object.keys(this.history);
      for (var i = 0; i < toRemove; i++) {
        delete this.history[keys[i]];
      }
    }
  }
};

// ================= PACKET LOSS TRACKER =================
var PACKET_LOSS = {
  windows: {},
  windowSize: 100,
  
  track: function(ip, host, success) {
    var key = ip + '|' + host;
    
    if (!this.windows[key]) {
      this.windows[key] = {
        packets: [],
        lossCount: 0
      };
    }
    
    var window = this.windows[key];
    window.packets.push({
      success: success,
      time: Date.now()
    });
    
    if (!success) {
      window.lossCount++;
    }
    
    // Keep only last windowSize packets
    if (window.packets.length > this.windowSize) {
      var removed = window.packets.shift();
      if (!removed.success) {
        window.lossCount--;
      }
    }
  },
  
  getLossRate: function(ip, host) {
    var key = ip + '|' + host;
    var window = this.windows[key];
    
    if (!window || window.packets.length === 0) {
      return 0;
    }
    
    return (window.lossCount / window.packets.length) * 100;
  },
  
  isHighLoss: function(ip, host) {
    return this.getLossRate(ip, host) > CONFIG.THRESHOLDS.PACKET_LOSS;
  }
};

// ================= LATENCY OPTIMIZER =================
var LATENCY_OPT = {
  measurements: {},
  
  measure: function(ip) {
    if (!this.measurements[ip]) {
      this.measurements[ip] = {
        samples: [],
        avg: 0,
        trend: 'stable'
      };
    }
    
    var data = this.measurements[ip];
    data.samples.push(Date.now());
    
    if (data.samples.length > 20) {
      data.samples.shift();
    }
    
    if (data.samples.length > 1) {
      var intervals = [];
      for (var i = 1; i < data.samples.length; i++) {
        intervals.push(data.samples[i] - data.samples[i - 1]);
      }
      
      var sum = 0;
      for (var j = 0; j < intervals.length; j++) {
        sum += intervals[j];
      }
      data.avg = sum / intervals.length;
      
      // Detect trend
      if (intervals.length >= 4) {
        var recent = (intervals[intervals.length - 1] + intervals[intervals.length - 2]) / 2;
        var old = (intervals[0] + intervals[1]) / 2;
        
        if (recent < old * 0.8) {
          data.trend = 'improving';
        } else if (recent > old * 1.2) {
          data.trend = 'degrading';
        } else {
          data.trend = 'stable';
        }
      }
    }
  },
  
  getAverage: function(ip) {
    return this.measurements[ip] ? this.measurements[ip].avg : 0;
  },
  
  shouldSwitchProxy: function(ip) {
    var data = this.measurements[ip];
    if (!data) return false;
    
    return data.avg > CONFIG.THRESHOLDS.HIGH_LATENCY && data.trend === 'degrading';
  }
};

// ================= RATE LIMITER =================
var RATE_LIMITER = {
  buckets: {},
  
  tryConsume: function(type, ip) {
    var key = type + '|' + ip;
    var now = Date.now();
    
    if (!this.buckets[key]) {
      this.buckets[key] = {
        tokens: type === 'match' ? CONFIG.LIMITS.MATCH_CAPACITY : CONFIG.LIMITS.LOBBY_CAPACITY,
        lastRefill: now
      };
    }
    
    var bucket = this.buckets[key];
    var capacity = type === 'match' ? CONFIG.LIMITS.MATCH_CAPACITY : CONFIG.LIMITS.LOBBY_CAPACITY;
    var refillRate = Math.floor(capacity / 10); // Refill 10% per second
    
    // Refill tokens
    var timePassed = now - bucket.lastRefill;
    var refills = Math.floor(timePassed / 1000);
    
    if (refills > 0) {
      bucket.tokens = Math.min(capacity, bucket.tokens + (refills * refillRate));
      bucket.lastRefill = now;
    }
    
    // Try to consume
    if (bucket.tokens > 0) {
      bucket.tokens--;
      return true;
    }
    
    return false;
  }
};

// ================= SESSION MANAGER =================
var SESSION = {
  ip: null,
  net24: null,
  host: null,
  locked: false,
  lockTime: 0,
  
  lock: function(ip, host) {
    this.ip = ip;
    this.net24 = ip.split('.').slice(0, 3).join('.');
    this.host = host;
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
      this.host = null;
      this.lockTime = 0;
    }
  },
  
  validate: function(ip, host) {
    if (!this.locked) return true;
    
    var net24 = ip.split('.').slice(0, 3).join('.');
    return ip === this.ip && host === this.host && net24 === this.net24;
  }
};

// ================= NETWORK MONITOR =================
var NET_MONITOR = {
  stats: {
    totalRequests: 0,
    blockedRequests: 0,
    blockedByGeo: 0,
    allowedJordan: 0,
    matchRequests: 0,
    lobbyRequests: 0,
    rateLimited: 0,
    startTime: Date.now()
  },
  
  record: function(decision, ip, host, type, reason) {
    this.stats.totalRequests++;
    
    if (decision === BLOCK) {
      this.stats.blockedRequests++;
      if (reason === 'geo-blocked') {
        this.stats.blockedByGeo++;
      } else if (reason === 'rate-limited') {
        this.stats.rateLimited++;
      }
    } else if (decision !== DIRECT) {
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
    var blockRate = total > 0 ? ((this.stats.blockedRequests / total) * 100).toFixed(2) : '0.00';
    var jordanRate = total > 0 ? ((this.stats.allowedJordan / total) * 100).toFixed(2) : '0.00';
    
    return {
      uptime: uptimeMin + ' min',
      total: total,
      blocked: this.stats.blockedRequests,
      blockedByGeo: this.stats.blockedByGeo,
      allowedJordan: this.stats.allowedJordan,
      match: this.stats.matchRequests,
      lobby: this.stats.lobbyRequests,
      rateLimited: this.stats.rateLimited,
      blockRate: blockRate + '%',
      jordanRate: jordanRate + '%'
    };
  },
  
  getQuality: function() {
    var stats = this.getStats();
    var blockRate = parseFloat(stats.blockRate);
    var jordanRate = parseFloat(stats.jordanRate);
    
    var score = 100;
    
    // Scoring based on block rate (higher is better for us)
    if (blockRate > 90) score -= 0;
    else if (blockRate > 70) score -= 10;
    else score -= 20;
    
    // Scoring based on Jordan acceptance
    if (jordanRate > 95) score += 0;
    else if (jordanRate > 80) score -= 5;
    else score -= 15;
    
    var rating = 'Poor';
    if (score >= 90) rating = 'Excellent';
    else if (score >= 75) rating = 'Very Good';
    else if (score >= 60) rating = 'Good';
    else if (score >= 40) rating = 'Fair';
    
    return {
      score: Math.max(0, Math.min(100, score)),
      rating: rating,
      jordanOnly: jordanRate > 95
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
  var patterns = [
    /pubg/i, /pubgm/i, /tencent/i, /krafton/i, /lightspeed/i,
    /arena/i, /breakout/i, /morefun/i, /darkzone/i,
    /worldofwarcraft/i, /wow/i, /blizzard/i, /battle\.net/i,
    /levelinfinite/i, /tactical/i, /farsight/i
  ];
  
  for (var i = 0; i < patterns.length; i++) {
    if (patterns[i].test(host)) return true;
  }
  
  return false;
}

function isMatch(url, host) {
  var matchPatterns = [
    /match/i, /battle/i, /combat/i, /realtime/i, /udp/i,
    /tick/i, /sync/i, /room/i, /game/i, /raid/i,
    /instance/i, /dungeon/i, /pvp/i, /versus/i, /deathmatch/i,
    /squad/i, /battleground/i, /mythic/i, /server\d+/i
  ];
  
  var combined = url + host;
  for (var i = 0; i < matchPatterns.length; i++) {
    if (matchPatterns[i].test(combined)) return true;
  }
  
  return false;
}

function isLobby(url, host) {
  var lobbyPatterns = [
    /lobby/i, /matchmaking/i, /queue/i, /dispatch/i,
    /gateway/i, /join/i, /region/i, /menu/i,
    /character/i, /inventory/i, /loadout/i,
    /login/i, /auth/i, /realm/i, /world/i, /selector/i
  ];
  
  var combined = url + host;
  for (var i = 0; i < lobbyPatterns.length; i++) {
    if (lobbyPatterns[i].test(combined)) return true;
  }
  
  return false;
}

function isCDN(url, host) {
  var cdnPatterns = [
    /cdn/i, /asset/i, /resource/i, /patch/i,
    /update/i, /media/i, /content/i, /download/i
  ];
  
  var combined = url + host;
  for (var i = 0; i < cdnPatterns.length; i++) {
    if (cdnPatterns[i].test(combined)) return true;
  }
  
  return false;
}

function isGameCritical(host) {
  var criticalPatterns = [
    /\.match\./i, /\.game\./i, /\.battle\./i, /\.room\./i,
    /\.udp\./i, /\.relay\./i, /\.realtime\./i, /\.server\./i,
    /\.pvp\./i, /\.instance\./i, /server\d+/i
  ];
  
  for (var i = 0; i < criticalPatterns.length; i++) {
    if (criticalPatterns[i].test(host)) return true;
  }
  
  return false;
}

function getPortFromURL(url) {
  var match = url.match(/:(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

function isMatchPort(port) {
  var matchPorts = (port >= 10000 && port <= 20000) ||
                   (port >= 8080 && port <= 8090) ||
                   (port >= 7000 && port <= 9000) ||
                   port === 3074 || port === 3724 ||
                   port === 1119 ||
                   (port >= 6112 && port <= 6114);
  
  return matchPorts;
}

// ================= INITIALIZATION =================
function initializeSystem() {
  JORDAN_IP_RANGES.init();
  REGION_BLOCKER.init();
  PROXY_POOL.init();
}

// ================= MAIN PROXY FUNCTION =================
function FindProxyForURL(url, host) {
  // Initialize on first run
  if (JORDAN_IP_RANGES.ranges.length === 0) {
    initializeSystem();
  }
  
  host = norm(host.toLowerCase());
  SESSION.reset();
  
  // Non-game traffic
  if (!isGAME(host)) {
    NET_MONITOR.record(DIRECT, null, host, 'non-game', 'non-game');
    return DIRECT;
  }
  
  // Resolve IP
  var ip = resolveOptimized(host);
  if (!ip || ip.indexOf(':') > -1) {
    NET_MONITOR.record(BLOCK, null, host, 'invalid', 'invalid-ip');
    return BLOCK;
  }
  
  // ===== SECURITY CHECKS =====
  
  // 1. Check if IP is in blocked regions
  if (REGION_BLOCKER.isBlocked(ip)) {
    NET_MONITOR.record(BLOCK, ip, host, 'blocked', 'geo-blocked');
    return BLOCK;
  }
  
  // 2. Check if IP is from Jordan
  if (!JORDAN_IP_RANGES.isJordanIP(ip)) {
    NET_MONITOR.record(BLOCK, ip, host, 'blocked', 'non-jordan');
    return BLOCK;
  }
  
  // 3. Identify ISP (optional, for logging)
  var ispInfo = JORDAN_ISP.identify(ip);
  
  // 4. Detect request type
  var port = getPortFromURL(url);
  var isMatchRequest = isMatch(url, host) || isGameCritical(host) || isMatchPort(port);
  var isLobbyRequest = isLobby(url, host) || isCDN(url, host);
  
  // ===== MATCH HANDLING =====
  if (isMatchRequest) {
    // Rate limiting
    if (!RATE_LIMITER.tryConsume('match', ip)) {
      NET_MONITOR.record(BLOCK, ip, host, 'match', 'rate-limited');
      return BLOCK;
    }
    
    // Session validation
    if (SESSION.locked) {
      if (!SESSION.validate(ip, host)) {
        NET_MONITOR.record(BLOCK, ip, host, 'match', 'session-violation');
        PACKET_LOSS.track(ip, host, false);
        return BLOCK;
      }
    } else {
      SESSION.lock(ip, host);
    }
    
    // Track metrics
    PACKET_LOSS.track(ip, host, true);
    LATENCY_OPT.measure(ip);
    
    // Get optimal proxy
    var proxy = PROXY_POOL.getOptimal(ip);
    PROXY_POOL.incrementLoad(proxy.url);
    PROXY_POOL.recordSuccess(proxy.url);
    ROUTE_AI.recordSuccess(ip, proxy.url);
    
    NET_MONITOR.record(proxy.url, ip, host, 'match', 'success');
    return proxy.url;
  }
  
  // ===== LOBBY HANDLING =====
  if (isLobbyRequest) {
    // Don't allow lobby after match lock
    if (SESSION.locked) {
      NET_MONITOR.record(BLOCK, ip, host, 'lobby', 'post-lock');
      return BLOCK;
    }
    
    // Rate limiting
    if (!RATE_LIMITER.tryConsume('lobby', ip)) {
      NET_MONITOR.record(BLOCK, ip, host, 'lobby', 'rate-limited');
      return BLOCK;
    }
    
    NET_MONITOR.record(CONFIG.PROXIES.PRIMARY_LOBBY, ip, host, 'lobby', 'success');
    return CONFIG.PROXIES.PRIMARY_LOBBY;
  }
  
  // ===== DEFAULT BLOCK =====
  NET_MONITOR.record(BLOCK, ip, host, 'unknown', 'unmatched');
  return BLOCK;
}

// ================= DEBUG & MONITORING FUNCTIONS =================

function debugGetStats() {
  return {
    version: CONFIG.VERSION,
    buildDate: CONFIG.BUILD_DATE,
    network: NET_MONITOR.getStats(),
    quality: NET_MONITOR.getQuality(),
    dns: DNS_CACHE.getStats(),
    session: {
      locked: SESSION.locked,
      ip: SESSION.ip,
      host: SESSION.host,
      duration: SESSION.locked ? Math.floor((Date.now() - SESSION.lockTime) / 1000) + 's' : '0s'
    },
    isp: {
      cacheHits: JORDAN_ISP.cacheHits,
      cacheMisses: JORDAN_ISP.cacheMisses,
      hitRate: (JORDAN_ISP.cacheHits + JORDAN_ISP.cacheMisses) > 0 ?
        ((JORDAN_ISP.cacheHits / (JORDAN_ISP.cacheHits + JORDAN_ISP.cacheMisses)) * 100).toFixed(2) + '%' : '0%'
    }
  };
}

function debugGetProxyPool() {
  var result = [];
  for (var i = 0; i < PROXY_POOL.proxies.length; i++) {
    var proxy = PROXY_POOL.proxies[i];
    result.push({
      url: proxy.url,
      health: proxy.health + '%',
      load: proxy.load,
      success: proxy.successCount,
      failures: proxy.failCount,
      region: proxy.region
    });
  }
  return result;
}

function debugCheckIP(ip) {
  var isJordan = JORDAN_IP_RANGES.isJordanIP(ip);
  var isBlocked = REGION_BLOCKER.isBlocked(ip);
  var ispInfo = JORDAN_ISP.identify(ip);
  
  return {
    ip: ip,
    isJordan: isJordan,
    isBlocked: isBlocked,
    isp: ispInfo.isp,
    method: ispInfo.method,
    verdict: isJordan && !isBlocked ? 'ALLOWED' : 'BLOCKED'
  };
}

function debugGetLatency(ip) {
  var avg = LATENCY_OPT.getAverage(ip);
  var data = LATENCY_OPT.measurements[ip];
  
  return {
    ip: ip,
    avgLatency: avg > 0 ? avg.toFixed(2) + 'ms' : 'N/A',
    trend: data ? data.trend : 'unknown',
    samples: data ? data.samples.length : 0
  };
}

function debugGetPacketLoss(ip, host) {
  var lossRate = PACKET_LOSS.getLossRate(ip, host);
  var isHigh = PACKET_LOSS.isHighLoss(ip, host);
  
  return {
    ip: ip,
    host: host,
    lossRate: lossRate.toFixed(2) + '%',
    status: isHigh ? 'HIGH' : 'NORMAL',
    threshold: CONFIG.THRESHOLDS.PACKET_LOSS + '%'
  };
}

function debugGetRouteAI() {
  var result = {};
  var count = 0;
  
  for (var ip in ROUTE_AI.history) {
    if (count >= 10) break; // Limit output
    
    var data = ROUTE_AI.history[ip];
    result[ip] = {
      bestRoute: data.bestRoute || 'none',
      totalRequests: data.totalRequests,
      routes: {}
    };
    
    for (var proxy in data.routes) {
      var route = data.routes[proxy];
      var total = route.successes + route.failures;
      result[ip].routes[proxy] = {
        reliability: total > 0 ? ((route.successes / total) * 100).toFixed(2) + '%' : '0%',
        successes: route.successes,
        failures: route.failures
      };
    }
    
    count++;
  }
  
  return result;
}

function debugFullReport() {
  return {
    timestamp: new Date().toISOString(),
    config: {
      version: CONFIG.VERSION,
      build: CONFIG.BUILD_DATE
    },
    stats: debugGetStats(),
    proxyPool: debugGetProxyPool(),
    performance: {
      jordanRanges: JORDAN_IP_RANGES.ranges.length + ' ranges',
      blockedRanges: REGION_BLOCKER.ranges.length + ' ranges',
      routeHistory: Object.keys(ROUTE_AI.history).length + ' IPs tracked',
      dnsCache: Object.keys(DNS_CACHE.data).length + ' entries',
      ispCache: Object.keys(JORDAN_ISP.cache).length + ' entries'
    }
  };
}

function debugReset() {
  // Reset all systems
  NET_MONITOR.stats = {
    totalRequests: 0,
    blockedRequests: 0,
    blockedByGeo: 0,
    allowedJordan: 0,
    matchRequests: 0,
    lobbyRequests: 0,
    rateLimited: 0,
    startTime: Date.now()
  };
  
  DNS_CACHE.data = {};
  DNS_CACHE.accessOrder = [];
  DNS_CACHE.hits = 0;
  DNS_CACHE.misses = 0;
  
  JORDAN_ISP.cache = {};
  JORDAN_ISP.cacheHits = 0;
  JORDAN_ISP.cacheMisses = 0;
  
  SESSION.locked = false;
  SESSION.ip = null;
  SESSION.net24 = null;
  SESSION.host = null;
  SESSION.lockTime = 0;
  
  ROUTE_AI.history = {};
  PACKET_LOSS.windows = {};
  LATENCY_OPT.measurements = {};
  RATE_LIMITER.buckets = {};
  
  PROXY_POOL.init();
  
  return 'System reset complete - ' + CONFIG.VERSION;
}

// ================= END OF SCRIPT =================
