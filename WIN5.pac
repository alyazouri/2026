var CONFIG = {
  VERSION: '12.1.0-FORTRESS-COMPLETE',
  BUILD_DATE: '2025-01-29',
  MODE: 'JORDAN_FORTRESS_FULL_COVERAGE',
  
  PROXIES: {
    ORANGE_DIRECT: 'PROXY 176.29.1.1:20001',
    ZAIN_DIRECT: 'PROXY 82.212.1.1:20001',
    UMNIAH_DIRECT: 'PROXY 185.119.1.1:20001',
    BATELCO_DIRECT: 'PROXY 46.185.131.218:20001',
    JT_BACKBONE: 'PROXY 212.118.1.1:20001',
    DAMAMAX: 'PROXY 185.86.36.1:20001',
    FALLBACK: 'PROXY 46.185.131.218:20001'
  },
  
  WHITELIST: {
    YOUTUBE: ['youtube.com', 'ytimg.com', 'googlevideo.com', 'yt3.ggpht.com', 'youtube-nocookie.com', 'youtu.be', 'ggpht.com'],
    GITHUB: ['github.com', 'githubusercontent.com', 'github.io', 'githubassets.com', 'githubapp.com']
  },
  
  TIMEOUTS: {
    SESSION_LOCK: 5400000,
    DNS_CACHE: 2700000,
    IP_CACHE: 10800000,
    ROUTE_LOCK: 10800000,
    FINGERPRINT_LOCK: 14400000
  },
  
  LIMITS: {
    MAX_DNS_RETRIES: 1,
    MAX_ROUTE_CHANGES: 0,
    MAX_ISP_SWITCHES: 0,
    MAX_SUBNET_CHANGES: 0,
    DNS_CACHE_SIZE: 25000,
    IP_CACHE_SIZE: 40000,
    MAX_PATH_VIOLATIONS: 3,
    MAX_SECURITY_VIOLATIONS: 2
  },
  
  SECURITY: {
    BLOCK_VPN_DNS: true,
    BLOCK_CLOUDFLARE_WARP: true,
    BLOCK_SUSPICIOUS_HOPS: true,
    ENFORCE_ASN_CHECK: true,
    BLOCK_TOR_EXIT: true,
    REQUIRE_JORDAN_REVERSE_DNS: false,  // معطل لأنه قد يسبب مشاكل
    MAX_ALLOWED_LATENCY: 15,
    ENABLE_ROUTE_FINGERPRINT: true,
    ENABLE_PATH_VALIDATION: false,  // معطل مؤقتاً
    ENABLE_DEEP_PACKET_INSPECTION: false,  // معطل مؤقتاً
    ENABLE_ANOMALY_DETECTION: false,  // معطل مؤقتاً
    ENABLE_GEO_ENFORCEMENT: false,
    BLOCK_PROXY_CHAINS: true,
    BLOCK_TUNNELING: true,
    ENFORCE_MTU_VALIDATION: false,
    ENFORCE_TTL_VALIDATION: false,
    REQUIRE_ISP_CONSISTENCY: true,
    ZERO_TOLERANCE_MODE: true
  },
  
  IPV6: {
    ENABLED: false,
    BLOCK_NON_JORDAN: true,
    FORCE_IPV4_FALLBACK: true,
    PREFER_IPV4: true,
    STRICT_MODE: true
  },
  
  TRUSTED_DNS: {
    ORANGE: ['176.29.1.1', '176.29.1.2'],
    ZAIN: ['82.212.1.1', '82.212.1.2'],
    UMNIAH: ['185.119.1.1', '185.119.1.2'],
    JT: ['212.118.0.2', '212.118.0.3']
  },
  
  JORDAN_ASN: [
    8376, 47887, 48832, 8697, 201094, 50670, 49544, 203960
  ],
  
  BLACKLIST_RANGES: {
    CLOUDFLARE_WARP: ['162.159.', '104.16.', '104.17.', '104.18.', '104.19.', '104.20.', '104.21.', '104.22.', '104.23.', '104.24.', '104.25.', '104.26.', '104.27.', '104.28.', '104.29.', '104.30.', '104.31.', '172.64.', '172.65.', '172.66.', '172.67.'],
    VPN_PROVIDERS: [],  // فارغ لتجنب false positives
    CLOUD_PROVIDERS: [],  // فارغ لتجنب false positives
    TOR_EXIT: ['176.10.99', '185.220.']
  }
};

var BLOCK = 'PROXY 127.0.0.1:9';
var DIRECT = 'DIRECT';

// ========== قاعدة بيانات كاملة لنطاقات IP الأردنية ==========
var JORDAN_IP_RANGES = {
  ranges: [],
  quickCache: {},
  superCache: {},
  ultraCache: {},
  
  init: function() {
    // هذه قائمة شاملة بجميع نطاقات IPv4 الأردنية المعروفة
    var rawRanges = [
      // Orange Jordan (AS8376)
      ["176.29.0.0", "255.255.0.0"],      // 176.29.0.0/16
      ["176.28.0.0", "255.255.0.0"],      // 176.28.0.0/16
      ["176.27.0.0", "255.255.0.0"],      // 176.27.0.0/16
      ["37.123.0.0", "255.255.0.0"],      // 37.123.0.0/16
      ["46.32.0.0", "255.255.0.0"],       // 46.32.0.0/16
      ["46.248.0.0", "255.255.0.0"],      // 46.248.0.0/16
      ["62.72.0.0", "255.255.0.0"],       // 62.72.0.0/16
      ["84.18.0.0", "255.255.0.0"],       // 84.18.0.0/16
      ["212.118.0.0", "255.255.0.0"],     // 212.118.0.0/16 (JT backbone)
      ["213.186.0.0", "255.255.0.0"],     // 213.186.0.0/16
      ["212.34.128.0", "255.255.192.0"],  // 212.34.128.0/18
      ["212.35.128.0", "255.255.192.0"],  // 212.35.128.0/18
      ["217.144.0.0", "255.255.192.0"],   // 217.144.0.0/18
      
      // Zain Jordan (AS47887)
      ["82.212.0.0", "255.255.0.0"],      // 82.212.0.0/16
      ["195.229.0.0", "255.255.0.0"],     // 195.229.0.0/16
      ["213.6.0.0", "255.255.0.0"],       // 213.6.0.0/16
      ["91.186.0.0", "255.255.0.0"],      // 91.186.0.0/16
      ["91.220.0.0", "255.255.0.0"],      // 91.220.0.0/16
      ["178.77.0.0", "255.255.0.0"],      // 178.77.0.0/16
      
      // Umniah (AS48832)
      ["185.119.0.0", "255.255.0.0"],     // 185.119.0.0/16
      ["188.161.0.0", "255.255.0.0"],     // 188.161.0.0/16
      ["188.123.0.0", "255.255.0.0"],     // 188.123.0.0/16
      ["185.98.0.0", "255.255.0.0"],      // 185.98.0.0/16
      ["188.247.0.0", "255.255.0.0"],     // 188.247.0.0/16
      ["185.43.0.0", "255.255.0.0"],      // 185.43.0.0/16
      
      // Batelco Jordan (AS8697)
      ["46.185.0.0", "255.255.0.0"],      // 46.185.0.0/16
      ["94.249.0.0", "255.255.128.0"],    // 94.249.0.0/17
      ["94.142.0.0", "255.255.0.0"],      // 94.142.0.0/16
      ["37.44.0.0", "255.255.0.0"],       // 37.44.0.0/16
      ["37.252.0.0", "255.255.0.0"],      // 37.252.0.0/16
      
      // Damamax (AS201094)
      ["185.86.36.0", "255.255.252.0"],   // 185.86.36.0/22
      
      // Additional Jordan ranges
      ["188.247.0.0", "255.255.0.0"],     // 188.247.0.0/16
      ["37.48.0.0", "255.255.0.0"],       // 37.48.0.0/16
      ["5.42.0.0", "255.255.0.0"],        // 5.42.0.0/16
      ["31.6.0.0", "255.255.0.0"],        // 31.6.0.0/16
      ["78.135.64.0", "255.255.192.0"],   // 78.135.64.0/18
      ["81.16.128.0", "255.255.128.0"],   // 81.16.128.0/17
      ["85.114.0.0", "255.255.0.0"],      // 85.114.0.0/16
      ["176.56.128.0", "255.255.128.0"],  // 176.56.128.0/17
      ["185.13.32.0", "255.255.224.0"],   // 185.13.32.0/19
      ["185.92.4.0", "255.255.252.0"],    // 185.92.4.0/22
      ["193.188.128.0", "255.255.128.0"], // 193.188.128.0/17
      ["195.229.0.0", "255.255.0.0"],     // 195.229.0.0/16
      ["213.178.128.0", "255.255.128.0"], // 213.178.128.0/17
      
      // PUBG/Gaming specific ranges that are known to be used in Jordan
      ["176.56.0.0", "255.255.0.0"],      // Gaming infrastructure
      ["185.13.0.0", "255.255.0.0"]       // Gaming infrastructure
    ];
    
    // بناء الـ ranges والـ caches
    for (var i = 0; i < rawRanges.length; i++) {
      var startInt = ipToInt(rawRanges[i][0]);
      var maskInt = ipToInt(rawRanges[i][1]);
      var endInt = startInt | (~maskInt >>> 0);
      
      this.ranges.push({
        start: startInt,
        end: endInt,
        network: rawRanges[i][0]
      });
      
      var parts = rawRanges[i][0].split('.');
      var net8 = parts[0];
      var net16 = parts[0] + '.' + parts[1];
      
      // Ultra cache - فحص الـ octet الأول
      this.ultraCache[net8] = true;
      
      // Super cache - فحص أول octet-ين
      this.superCache[net16] = true;
      
      // Quick cache - بناء جميع الـ /24 networks الممكنة
      var maskBits = this.countMaskBits(maskInt);
      var hostBits = 32 - maskBits;
      
      if (hostBits <= 16) {  // فقط للشبكات /16 أو أصغر
        var numSubnets = Math.pow(2, Math.min(hostBits - 8, 8));
        var startOctet3 = parseInt(parts[2]);
        
        for (var j = 0; j < numSubnets && (startOctet3 + j) <= 255; j++) {
          var net24 = parts[0] + '.' + parts[1] + '.' + (startOctet3 + j);
          this.quickCache[net24] = true;
        }
      }
    }
    
    // ترتيب الـ ranges لاستخدام binary search
    this.ranges.sort(function(a, b) { return a.start - b.start; });
    
    // دمج النطاقات المتداخلة
    this.ranges = this.mergeRanges(this.ranges);
  },
  
  countMaskBits: function(maskInt) {
    var bits = 0;
    while (maskInt !== 0) {
      bits += maskInt & 1;
      maskInt >>>= 1;
    }
    return bits;
  },
  
  mergeRanges: function(ranges) {
    if (ranges.length === 0) return [];
    var merged = [ranges[0]];
    
    for (var i = 1; i < ranges.length; i++) {
      var current = ranges[i];
      var last = merged[merged.length - 1];
      
      if (current.start <= last.end + 1) {
        last.end = Math.max(last.end, current.end);
      } else {
        merged.push(current);
      }
    }
    return merged;
  },
  
  isJordanIP: function(ip) {
    var parts = ip.split('.');
    if (parts.length !== 4) return false;
    
    // المستوى الأول: فحص الـ octet الأول
    var net8 = parts[0];
    if (!this.ultraCache[net8]) return false;
    
    // المستوى الثاني: فحص أول octet-ين
    var net16 = parts[0] + '.' + parts[1];
    if (!this.superCache[net16]) return false;
    
    // المستوى الثالث: فحص quick cache للـ /24
    var net24 = parts[0] + '.' + parts[1] + '.' + parts[2];
    if (this.quickCache[net24]) return true;
    
    // المستوى الرابع: binary search في الـ ranges الكاملة
    var ipInt = ipToInt(ip);
    var left = 0;
    var right = this.ranges.length - 1;
    
    while (left <= right) {
      var mid = (left + right) >> 1;
      var range = this.ranges[mid];
      
      if (ipInt >= range.start && ipInt <= range.end) return true;
      
      if (ipInt < range.start) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    
    return false;
  },
  
  getStats: function() {
    return {
      totalRanges: this.ranges.length,
      ultraCacheSize: Object.keys(this.ultraCache).length + ' /8 networks',
      superCacheSize: Object.keys(this.superCache).length + ' /16 networks',
      quickCacheSize: Object.keys(this.quickCache).length + ' /24 networks',
      coverage: 'COMPLETE'
    };
  }
};

// ========== Blacklist Manager ==========
var BLACKLIST_MANAGER = {
  blacklistedIPs: {},
  blacklistedHosts: {},
  permanentBans: {},
  
  isBlacklisted: function(ip) {
    if (this.permanentBans[ip]) {
      return {blocked: true, reason: 'permanent-ban', severity: 'CRITICAL'};
    }
    if (this.blacklistedIPs[ip]) {
      return {blocked: true, reason: 'blacklisted-ip', severity: 'HIGH'};
    }
    
    // فحص نطاقات Cloudflare WARP فقط
    var warpRanges = CONFIG.BLACKLIST_RANGES.CLOUDFLARE_WARP;
    for (var i = 0; i < warpRanges.length; i++) {
      if (ip.indexOf(warpRanges[i]) === 0) {
        this.addPermanentBan(ip, 'cloudflare-warp');
        return {blocked: true, reason: 'blacklist-cloudflare-warp', severity: 'CRITICAL'};
      }
    }
    
    // فحص Tor
    var torRanges = CONFIG.BLACKLIST_RANGES.TOR_EXIT;
    for (var j = 0; j < torRanges.length; j++) {
      if (ip.indexOf(torRanges[j]) === 0) {
        this.addPermanentBan(ip, 'tor-exit');
        return {blocked: true, reason: 'blacklist-tor', severity: 'CRITICAL'};
      }
    }
    
    return {blocked: false, reason: null, severity: null};
  },
  
  addPermanentBan: function(ip, reason) {
    this.permanentBans[ip] = {
      reason: reason,
      timestamp: Date.now(),
      permanent: true
    };
  },
  
  addBlacklist: function(ip, host, reason) {
    if (ip) this.blacklistedIPs[ip] = {reason: reason, time: Date.now()};
    if (host) this.blacklistedHosts[host] = {reason: reason, time: Date.now()};
  },
  
  getStats: function() {
    return {
      permanentBans: Object.keys(this.permanentBans).length,
      blacklistedIPs: Object.keys(this.blacklistedIPs).length,
      blacklistedHosts: Object.keys(this.blacklistedHosts).length
    };
  }
};

// ========== Route Fortress ==========
var ROUTE_FORTRESS = {
  primaryRoute: null,
  lockTime: 0,
  violations: 0,
  fingerprint: null,
  subnet: null,
  isp: null,
  asn: null,
  
  establishRoute: function(ip, isp, asn, proxy) {
    if (this.isLocked()) {
      return {success: false, reason: 'route-already-locked'};
    }
    
    var parts = ip.split('.');
    this.primaryRoute = ip;
    this.subnet = parts[0] + '.' + parts[1] + '.' + parts[2];
    this.isp = isp;
    this.asn = asn;
    this.lockTime = Date.now();
    this.fingerprint = this.generateFingerprint(ip, isp, asn);
    
    return {
      success: true,
      route: {
        ip: ip,
        subnet: this.subnet,
        isp: isp,
        asn: asn,
        proxy: proxy,
        fingerprint: this.fingerprint
      }
    };
  },
  
  generateFingerprint: function(ip, isp, asn) {
    var parts = ip.split('.');
    return parts[0] + '-' + parts[1] + '-' + parts[2] + '-' + isp + '-' + asn;
  },
  
  validateRoute: function(ip, isp, asn) {
    if (!this.isLocked()) return {valid: true, reason: null};
    
    var newFingerprint = this.generateFingerprint(ip, isp, asn);
    
    if (newFingerprint !== this.fingerprint) {
      this.violations++;
      return {
        valid: false,
        reason: 'fingerprint-mismatch',
        expected: this.fingerprint,
        received: newFingerprint,
        violations: this.violations
      };
    }
    
    return {valid: true, reason: null};
  },
  
  isLocked: function() {
    if (!this.primaryRoute) return false;
    return (Date.now() - this.lockTime) < CONFIG.TIMEOUTS.ROUTE_LOCK;
  },
  
  forceUnlock: function() {
    this.primaryRoute = null;
    this.lockTime = 0;
    this.violations = 0;
    this.fingerprint = null;
    this.subnet = null;
    this.isp = null;
    this.asn = null;
  },
  
  getStatus: function() {
    if (!this.isLocked()) {
      return {locked: false, message: 'NO ACTIVE ROUTE'};
    }
    
    var age = Math.floor((Date.now() - this.lockTime) / 1000);
    var remaining = Math.floor((CONFIG.TIMEOUTS.ROUTE_LOCK - (Date.now() - this.lockTime)) / 1000);
    
    return {
      locked: true,
      route: this.primaryRoute,
      subnet: this.subnet,
      isp: this.isp,
      asn: this.asn,
      fingerprint: this.fingerprint,
      violations: this.violations,
      age: age + 's',
      remaining: remaining + 's',
      message: 'ROUTE LOCKED - FORTRESS MODE'
    };
  }
};

// ========== DNS Security ==========
var DNS_SECURITY = {
  suspiciousServers: {},
  leakDetected: false,
  blockedQueries: 0,
  queryLog: {},
  
  isTrustedDNS: function(ip) {
    for (var isp in CONFIG.TRUSTED_DNS) {
      var servers = CONFIG.TRUSTED_DNS[isp];
      for (var i = 0; i < servers.length; i++) {
        if (ip === servers[i]) return true;
      }
    }
    return false;
  },
  
  checkDNSLeak: function(host, resolvedIP) {
    if (!JORDAN_IP_RANGES.isJordanIP(resolvedIP)) {
      this.leakDetected = true;
      this.blockedQueries++;
      if (!this.suspiciousServers[host]) {
        this.suspiciousServers[host] = 0;
      }
      this.suspiciousServers[host]++;
      return false;
    }
    return true;
  },
  
  isCloudflareWARP: function(ip) {
    var ranges = CONFIG.BLACKLIST_RANGES.CLOUDFLARE_WARP;
    for (var i = 0; i < ranges.length; i++) {
      if (ip.indexOf(ranges[i]) === 0) return true;
    }
    return false;
  },
  
  isSuspiciousDNS: function(ip) {
    var suspicious = [
      '8.8.8.8', '8.8.4.4',
      '1.1.1.1', '1.0.0.1',
      '9.9.9.9', '149.112.112.112',
      '208.67.222.222', '208.67.220.220',
      '76.76.2.0', '76.76.10.0',
      '94.140.14.14', '94.140.15.15'
    ];
    
    for (var i = 0; i < suspicious.length; i++) {
      if (ip === suspicious[i]) {
        this.blockedQueries++;
        return true;
      }
    }
    
    return this.isCloudflareWARP(ip);
  },
  
  getStats: function() {
    return {
      leakDetected: this.leakDetected,
      blockedQueries: this.blockedQueries,
      suspiciousServers: Object.keys(this.suspiciousServers).length
    };
  }
};

// ========== IP Validator ==========
var IP_VALIDATOR = {
  cache: {},
  
  isIPv4: function(ip) {
    return /^(\d{1,3}\.){3}\d{1,3}$/.test(ip);
  },
  
  isIPv6: function(ip) {
    return ip.indexOf(':') > -1;
  },
  
  isPrivateIP: function(ip) {
    if (this.isIPv4(ip)) {
      return /^(10\.|172\.(1[6-9]|2[0-9]|3[01])\.|192\.168\.|127\.|0\.|169\.254\.)/.test(ip);
    }
    return /^(fe80:|fc00:|fd00:|::1|::)/.test(ip);
  },
  
  isJordanIP: function(ip) {
    if (!ip) return false;
    
    if (this.cache[ip] !== undefined) {
      return this.cache[ip];
    }
    
    if (this.isPrivateIP(ip)) {
      this.cache[ip] = false;
      return false;
    }
    
    if (DNS_SECURITY.isCloudflareWARP(ip)) {
      this.cache[ip] = false;
      return false;
    }
    
    if (this.isIPv6(ip)) {
      this.cache[ip] = false;
      return false;
    }
    
    if (this.isIPv4(ip)) {
      var result = JORDAN_IP_RANGES.isJordanIP(ip);
      this.cache[ip] = result;
      return result;
    }
    
    this.cache[ip] = false;
    return false;
  },
  
  performSecurityChecks: function(ip, host, url) {
    var blacklistCheck = BLACKLIST_MANAGER.isBlacklisted(ip);
    if (blacklistCheck.blocked) {
      return {valid: false, reason: blacklistCheck.reason, severity: blacklistCheck.severity};
    }
    
    if (CONFIG.SECURITY.BLOCK_VPN_DNS && DNS_SECURITY.isSuspiciousDNS(ip)) {
      BLACKLIST_MANAGER.addBlacklist(ip, host, 'vpn-dns');
      return {valid: false, reason: 'vpn-dns-detected', severity: 'CRITICAL'};
    }
    
    if (CONFIG.SECURITY.BLOCK_CLOUDFLARE_WARP && DNS_SECURITY.isCloudflareWARP(ip)) {
      BLACKLIST_MANAGER.addPermanentBan(ip, 'cloudflare-warp');
      return {valid: false, reason: 'cloudflare-warp', severity: 'CRITICAL'};
    }
    
    return {valid: true, reason: null, severity: null};
  }
};

// ========== ISP Detector ==========
var JORDAN_ISP = {
  providers: {
    'Orange': {
      nets: ['176.29', '176.28', '176.27', '37.123', '46.32', '46.248', '62.72', '84.18', '212.118', '213.186', '212.34', '212.35', '217.144'],
      asn: 8376,
      proxy: CONFIG.PROXIES.ORANGE_DIRECT,
      avgPing: 6
    },
    'Zain': {
      nets: ['82.212', '195.229', '213.6', '91.186', '178.77', '91.220'],
      asn: 47887,
      proxy: CONFIG.PROXIES.ZAIN_DIRECT,
      avgPing: 5
    },
    'Umniah': {
      nets: ['185.119', '188.161', '188.123', '185.98', '188.247', '185.43'],
      asn: 48832,
      proxy: CONFIG.PROXIES.UMNIAH_DIRECT,
      avgPing: 6
    },
    'Batelco': {
      nets: ['46.185', '94.249', '94.142', '37.44', '37.252'],
      asn: 8697,
      proxy: CONFIG.PROXIES.BATELCO_DIRECT,
      avgPing: 7
    },
    'JT': {
      nets: ['212.118', '213.186'],
      asn: 8376,
      proxy: CONFIG.PROXIES.JT_BACKBONE,
      avgPing: 8
    },
    'Damamax': {
      nets: ['185.86'],
      asn: 201094,
      proxy: CONFIG.PROXIES.DAMAMAX,
      avgPing: 9
    },
    'Other-JO': {
      nets: ['37.48', '5.42', '31.6', '78.135', '81.16', '85.114', '176.56', '185.13', '185.92', '193.188', '213.178'],
      asn: 0,
      proxy: CONFIG.PROXIES.FALLBACK,
      avgPing: 10
    }
  },
  
  cache: {},
  
  identify: function(ip) {
    if (this.cache[ip]) return this.cache[ip];
    
    var net16 = ip.split('.').slice(0, 2).join('.');
    
    for (var isp in this.providers) {
      var provider = this.providers[isp];
      
      for (var i = 0; i < provider.nets.length; i++) {
        if (net16 === provider.nets[i]) {
          var result = {
            isp: isp,
            proxy: provider.proxy,
            avgPing: provider.avgPing,
            asn: provider.asn
          };
          this.cache[ip] = result;
          return result;
        }
      }
    }
    
    var result = {
      isp: 'Unknown-JO',
      proxy: CONFIG.PROXIES.FALLBACK,
      avgPing: 10,
      asn: 'UNKNOWN'
    };
    this.cache[ip] = result;
    return result;
  }
};

// ========== Session Manager ==========
var SESSION = {
  ip: null,
  proxy: null,
  isp: null,
  asn: null,
  locked: false,
  lockTime: 0,
  violations: 0,
  
  lock: function(ip, proxy, isp, asn) {
    this.ip = ip;
    this.proxy = proxy;
    this.isp = isp;
    this.asn = asn;
    this.locked = true;
    this.lockTime = Date.now();
    this.violations = 0;
  },
  
  reset: function() {
    if (this.locked && (Date.now() - this.lockTime) > CONFIG.TIMEOUTS.SESSION_LOCK) {
      this.locked = false;
      this.ip = null;
      this.proxy = null;
      this.isp = null;
      this.asn = null;
      this.lockTime = 0;
      this.violations = 0;
    }
  },
  
  validate: function(ip, isp, asn) {
    if (!this.locked) return {valid: true, reason: null};
    
    if (this.isp !== isp) {
      this.violations++;
      return {valid: false, reason: 'isp-mismatch', violations: this.violations};
    }
    
    if (this.asn !== asn && asn !== 0) {
      this.violations++;
      return {valid: false, reason: 'asn-mismatch', violations: this.violations};
    }
    
    var current24 = ip.split('.').slice(0, 3).join('.');
    var locked24 = this.ip.split('.').slice(0, 3).join('.');
    
    if (current24 !== locked24) {
      this.violations++;
      return {valid: false, reason: 'subnet-changed', violations: this.violations};
    }
    
    return {valid: true, reason: null};
  },
  
  getInfo: function() {
    return {
      locked: this.locked,
      ip: this.ip,
      proxy: this.proxy,
      isp: this.isp,
      asn: this.asn,
      violations: this.violations,
      age: this.locked ? Math.floor((Date.now() - this.lockTime) / 1000) + 's' : '0s'
    };
  }
};

// ========== Network Monitor ==========
var NET_MONITOR = {
  stats: {
    totalRequests: 0,
    blockedNonJordan: 0,
    blockedVPN: 0,
    blockedDNSLeak: 0,
    blockedSecurity: 0,
    blockedRoute: 0,
    blockedBlacklist: 0,
    allowedJordan: 0,
    allowedWhitelist: 0,
    matchRequests: 0,
    lobbyRequests: 0,
    sessionViolations: 0,
    routeViolations: 0,
    securityViolations: 0,
    startTime: Date.now()
  },
  
  blockedIPs: {},
  allowedJordanIPs: {},
  
  record: function(decision, ip, type, reason) {
    this.stats.totalRequests++;
    
    if (decision === BLOCK) {
      if (reason && reason.indexOf('vpn') > -1) {
        this.stats.blockedVPN++;
      } else if (reason === 'dns-leak') {
        this.stats.blockedDNSLeak++;
      } else if (reason && reason.indexOf('security') > -1) {
        this.stats.blockedSecurity++;
        this.stats.securityViolations++;
      } else if (reason === 'route-violation') {
        this.stats.blockedRoute++;
        this.stats.routeViolations++;
      } else if (reason && reason.indexOf('blacklist') > -1) {
        this.stats.blockedBlacklist++;
      } else {
        this.stats.blockedNonJordan++;
      }
      
      if (reason === 'session-violation') {
        this.stats.sessionViolations++;
      }
      
      if (ip) {
        if (!this.blockedIPs[ip]) this.blockedIPs[ip] = 0;
        this.blockedIPs[ip]++;
      }
      
    } else if (decision === DIRECT) {
      this.stats.allowedWhitelist++;
    } else {
      this.stats.allowedJordan++;
      
      if (ip) {
        if (!this.allowedJordanIPs[ip]) this.allowedJordanIPs[ip] = 0;
        this.allowedJordanIPs[ip]++;
      }
      
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
    var blockRate = total > 0 ? (((total - this.stats.allowedJordan - this.stats.allowedWhitelist) / total) * 100).toFixed(2) : '0.00';
    
    return {
      uptime: uptimeMin + ' min',
      total: total,
      allowedJordan: this.stats.allowedJordan,
      allowedWhitelist: this.stats.allowedWhitelist,
      blockedNonJordan: this.stats.blockedNonJordan,
      blockedVPN: this.stats.blockedVPN,
      blockedDNSLeak: this.stats.blockedDNSLeak,
      blockedSecurity: this.stats.blockedSecurity,
      blockedRoute: this.stats.blockedRoute,
      blockedBlacklist: this.stats.blockedBlacklist,
      match: this.stats.matchRequests,
      lobby: this.stats.lobbyRequests,
      sessionViolations: this.stats.sessionViolations,
      routeViolations: this.stats.routeViolations,
      securityViolations: this.stats.securityViolations,
      jordanRate: jordanRate + '%',
      blockRate: blockRate + '%',
      uniqueJordanIPs: Object.keys(this.allowedJordanIPs).length,
      uniqueBlockedIPs: Object.keys(this.blockedIPs).length
    };
  },
  
  getTopAllowedIPs: function() {
    var ips = [];
    for (var ip in this.allowedJordanIPs) {
      ips.push({ip: ip, count: this.allowedJordanIPs[ip]});
    }
    ips.sort(function(a, b) { return b.count - a.count; });
    return ips.slice(0, 20);
  }
};

// ========== DNS Cache ==========
var DNS_CACHE = {
  data: {},
  hits: 0,
  misses: 0,
  failures: 0,
  
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
      var keys = Object.keys(this.data);
      var sorted = keys.sort(function(a, b) {
        return this.data[a].time - this.data[b].time;
      }.bind(this));
      
      for (var i = 0; i < Math.floor(keys.length * 0.3); i++) {
        delete this.data[sorted[i]];
      }
    }
    
    this.data[host] = {
      ip: ip,
      time: Date.now()
    };
  },
  
  recordFailure: function() {
    this.failures++;
  }
};

// ========== WHITELIST ==========
var WHITELIST = {
  cache: {},
  
  isWhitelisted: function(host) {
    if (this.cache[host]) return this.cache[host];
    
    host = host.toLowerCase();
    
    for (var i = 0; i < CONFIG.WHITELIST.YOUTUBE.length; i++) {
      if (host.indexOf(CONFIG.WHITELIST.YOUTUBE[i]) > -1) {
        var result = {allowed: true, service: 'YouTube'};
        this.cache[host] = result;
        return result;
      }
    }
    
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

// ========== Utility Functions ==========
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
  
  var ip = null;
  
  try {
    ip = dnsResolve(host);
  } catch (e) {
    DNS_CACHE.recordFailure();
  }
  
  if (ip) {
    DNS_CACHE.set(host, ip);
  } else {
    DNS_CACHE.recordFailure();
  }
  
  return ip;
}

// ========== Game Detection ==========
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

// ========== Initialization ==========
function initializeSystem() {
  JORDAN_IP_RANGES.init();
}

// ========== MAIN PROXY FUNCTION ==========
function FindProxyForURL(url, host) {
  if (JORDAN_IP_RANGES.ranges.length === 0) {
    initializeSystem();
  }
  
  host = norm(host.toLowerCase());
  SESSION.reset();
  
  // WHITELIST
  var whitelistCheck = WHITELIST.isWhitelisted(host);
  if (whitelistCheck.allowed) {
    NET_MONITOR.record(DIRECT, null, 'whitelist', whitelistCheck.service);
    return DIRECT;
  }
  
  // NON-GAME
  if (!isGAME(host)) {
    NET_MONITOR.record(DIRECT, null, 'non-game', 'system');
    return DIRECT;
  }
  
  // GAME TRAFFIC - DNS RESOLVE
  var ip = resolveOptimized(host);
  
  if (!ip) {
    NET_MONITOR.record(BLOCK, ip, 'invalid', 'dns-failed');
    return BLOCK;
  }
  
  // SECURITY CHECKS
  var securityCheck = IP_VALIDATOR.performSecurityChecks(ip, host, url);
  if (!securityCheck.valid) {
    NET_MONITOR.record(BLOCK, ip, 'security', securityCheck.reason);
    return BLOCK;
  }
  
  // JORDAN IP CHECK
  if (!IP_VALIDATOR.isJordanIP(ip)) {
    NET_MONITOR.record(BLOCK, ip, 'blocked', 'non-jordan-ip');
    return BLOCK;
  }
  
  // DNS LEAK CHECK
  if (!DNS_SECURITY.checkDNSLeak(host, ip)) {
    NET_MONITOR.record(BLOCK, ip, 'security', 'dns-leak');
    return BLOCK;
  }
  
  // ISP IDENTIFICATION
  var ispInfo = JORDAN_ISP.identify(ip);
  
  var isMatchRequest = isMatch(url, host) || isGameCritical(host);
  var isLobbyRequest = isLobby(url, host);
  
  // MATCH HANDLING
  if (isMatchRequest) {
    if (ROUTE_FORTRESS.isLocked()) {
      var routeValidation = ROUTE_FORTRESS.validateRoute(ip, ispInfo.isp, ispInfo.asn);
      
      if (!routeValidation.valid) {
        NET_MONITOR.record(BLOCK, ip, 'match', 'route-violation:' + routeValidation.reason);
        
        if (ROUTE_FORTRESS.violations >= CONFIG.LIMITS.MAX_PATH_VIOLATIONS) {
          BLACKLIST_MANAGER.addPermanentBan(ip, 'repeated-route-violations');
        }
        
        return BLOCK;
      }
    } else {
      var establish = ROUTE_FORTRESS.establishRoute(ip, ispInfo.isp, ispInfo.asn, ispInfo.proxy);
      if (!establish.success) {
        NET_MONITOR.record(BLOCK, ip, 'match', establish.reason);
        return BLOCK;
      }
    }
    
    if (SESSION.locked) {
      var sessionCheck = SESSION.validate(ip, ispInfo.isp, ispInfo.asn);
      if (!sessionCheck.valid) {
        NET_MONITOR.record(BLOCK, ip, 'match', 'session-violation:' + sessionCheck.reason);
        return BLOCK;
      }
      
      NET_MONITOR.record(SESSION.proxy, ip, 'match', 'locked-session');
      return SESSION.proxy;
    }
    
    var proxy = ispInfo.proxy;
    SESSION.lock(ip, proxy, ispInfo.isp, ispInfo.asn);
    
    NET_MONITOR.record(proxy, ip, 'match', 'new-fortress-session');
    return proxy;
  }
  
  // LOBBY HANDLING
  if (isLobbyRequest) {
    if (SESSION.locked || ROUTE_FORTRESS.isLocked()) {
      NET_MONITOR.record(BLOCK, ip, 'lobby', 'fortress-active');
      return BLOCK;
    }
    
    var lobbyProxy = ispInfo.proxy;
    NET_MONITOR.record(lobbyProxy, ip, 'lobby', 'pre-fortress');
    return lobbyProxy;
  }
  
  // DEFAULT BLOCK
  NET_MONITOR.record(BLOCK, ip, 'unknown', 'unclassified');
  return BLOCK;
}

// ========== DEBUG FUNCTIONS ==========

function debugGetStats() {
  var stats = NET_MONITOR.getStats();
  var dnsHitRate = (DNS_CACHE.hits + DNS_CACHE.misses) > 0 ?
    ((DNS_CACHE.hits / (DNS_CACHE.hits + DNS_CACHE.misses)) * 100).toFixed(2) : '0.00';
  
  return {
    version: CONFIG.VERSION,
    mode: CONFIG.MODE,
    
    coverage: JORDAN_IP_RANGES.getStats(),
    
    fortress: {
      status: ROUTE_FORTRESS.getStatus(),
      violations: ROUTE_FORTRESS.violations
    },
    
    security: {
      blacklist: BLACKLIST_MANAGER.getStats(),
      dnsStats: DNS_SECURITY.getStats()
    },
    
    network: stats,
    
    dns: {
      hits: DNS_CACHE.hits,
      misses: DNS_CACHE.misses,
      failures: DNS_CACHE.failures,
      hitRate: dnsHitRate + '%',
      cacheSize: Object.keys(DNS_CACHE.data).length
    },
    
    session: SESSION.getInfo()
  };
}

function debugCheckIP(ip) {
  var isJordan = IP_VALIDATOR.isJordanIP(ip);
  var ispInfo = isJordan ? JORDAN_ISP.identify(ip) : null;
  var isPrivate = IP_VALIDATOR.isPrivateIP(ip);
  var blacklistCheck = BLACKLIST_MANAGER.isBlacklisted(ip);
  
  return {
    ip: ip,
    isJordan: isJordan,
    isPrivate: isPrivate,
    blacklisted: blacklistCheck.blocked,
    blacklistReason: blacklistCheck.reason,
    isp: ispInfo ? ispInfo.isp : 'NON-JORDAN',
    asn: ispInfo ? ispInfo.asn : 'UNKNOWN',
    proxy: ispInfo ? ispInfo.proxy : 'BLOCKED',
    expectedPing: ispInfo ? ispInfo.avgPing + 'ms' : 'N/A',
    verdict: isJordan && !blacklistCheck.blocked ? '✅ ALLOWED' : '❌ BLOCKED'
  };
}

function debugTestDomain(domain) {
  var host = norm(domain.toLowerCase());
  
  var whitelistCheck = WHITELIST.isWhitelisted(host);
  if (whitelistCheck.allowed) {
    return {
      domain: domain,
      status: 'WHITELISTED',
      service: whitelistCheck.service,
      decision: 'DIRECT'
    };
  }
  
  var isGame = isGAME(host);
  if (!isGame) {
    return {
      domain: domain,
      status: 'NON-GAME',
      decision: 'DIRECT'
    };
  }
  
  var ip = resolveOptimized(host);
  if (!ip) {
    return {
      domain: domain,
      status: 'DNS FAILED',
      decision: 'BLOCK'
    };
  }
  
  var securityCheck = IP_VALIDATOR.performSecurityChecks(ip, host, domain);
  if (!securityCheck.valid) {
    return {
      domain: domain,
      ip: ip,
      status: 'SECURITY VIOLATION',
      reason: securityCheck.reason,
      severity: securityCheck.severity,
      decision: 'BLOCK'
    };
  }
  
  var isJordan = IP_VALIDATOR.isJordanIP(ip);
  var ispInfo = isJordan ? JORDAN_ISP.identify(ip) : null;
  
  return {
    domain: domain,
    ip: ip,
    status: isJordan ? 'JORDAN IP ✅' : 'NON-JORDAN IP ❌',
    isp: ispInfo ? ispInfo.isp : 'FOREIGN',
    asn: ispInfo ? ispInfo.asn : 'UNKNOWN',
    proxy: ispInfo ? ispInfo.proxy : 'NONE',
    expectedPing: ispInfo ? ispInfo.avgPing + 'ms' : 'N/A',
    decision: isJordan ? ispInfo.proxy : 'BLOCK'
  };
}

function debugGetAllowedIPs() {
  return NET_MONITOR.getTopAllowedIPs();
}

function debugReset() {
  NET_MONITOR.stats = {
    totalRequests: 0,
    blockedNonJordan: 0,
    blockedVPN: 0,
    blockedDNSLeak: 0,
    blockedSecurity: 0,
    blockedRoute: 0,
    blockedBlacklist: 0,
    allowedJordan: 0,
    allowedWhitelist: 0,
    matchRequests: 0,
    lobbyRequests: 0,
    sessionViolations: 0,
    routeViolations: 0,
    securityViolations: 0,
    startTime: Date.now()
  };
  
  NET_MONITOR.blockedIPs = {};
  NET_MONITOR.allowedJordanIPs = {};
  
  DNS_CACHE.data = {};
  DNS_CACHE.hits = 0;
  DNS_CACHE.misses = 0;
  DNS_CACHE.failures = 0;
  
  DNS_SECURITY.suspiciousServers = {};
  DNS_SECURITY.leakDetected = false;
  DNS_SECURITY.blockedQueries = 0;
  DNS_SECURITY.queryLog = {};
  
  ROUTE_FORTRESS.forceUnlock();
  
  JORDAN_ISP.cache = {};
  WHITELIST.cache = {};
  IP_VALIDATOR.cache = {};
  
  SESSION.locked = false;
  SESSION.ip = null;
  SESSION.proxy = null;
  SESSION.isp = null;
  SESSION.asn = null;
  SESSION.lockTime = 0;
  SESSION.violations = 0;
  
  return '✅ FORTRESS RESET - FULL JORDAN COVERAGE ACTIVE';
}
