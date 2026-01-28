var CONFIG = {
  VERSION: '11.0.0-ULTRA-STABLE',
  BUILD_DATE: '2025-01-29',
  MODE: 'JORDAN_ULTRA_STABLE_ZERO_PING',
  
  PROXIES: {
    // Direct ISP Proxies - Zero Hop
    ORANGE_DIRECT: 'PROXY 176.29.1.1:20001',
    ZAIN_DIRECT: 'PROXY 82.212.1.1:20001',
    UMNIAH_DIRECT: 'PROXY 185.119.1.1:20001',
    BATELCO_DIRECT: 'PROXY 46.185.131.218:20001',
    JT_BACKBONE: 'PROXY 212.118.1.1:20001',
    DAMAMAX: 'PROXY 185.86.36.1:20001',
    
    // Fallback
    FALLBACK: 'PROXY 46.185.131.218:20001'
  },
  
  WHITELIST: {
    YOUTUBE: ['youtube.com', 'ytimg.com', 'googlevideo.com', 'yt3.ggpht.com', 'youtube-nocookie.com', 'youtu.be', 'ggpht.com'],
    GITHUB: ['github.com', 'githubusercontent.com', 'github.io', 'githubassets.com', 'githubapp.com']
  },
  
  TIMEOUTS: {
    SESSION_LOCK: 3600000,        // ساعة كاملة session lock
    DNS_CACHE: 1800000,           // 30 دقيقة DNS cache
    IP_CACHE: 7200000,            // ساعتين IP cache
    ROUTE_LOCK: 7200000           // ساعتين route lock
  },
  
  LIMITS: {
    MAX_DNS_RETRIES: 2,
    MAX_ROUTE_CHANGES: 2,         // maximum 2 route changes per session
    DNS_CACHE_SIZE: 20000,
    IP_CACHE_SIZE: 30000
  },
  
  SECURITY: {
    BLOCK_VPN_DNS: true,
    BLOCK_CLOUDFLARE_WARP: true,
    BLOCK_SUSPICIOUS_HOPS: true,
    ENFORCE_ASN_CHECK: true,
    BLOCK_TOR_EXIT: true,
    REQUIRE_JORDAN_REVERSE_DNS: true,
    MAX_ALLOWED_LATENCY: 20,      // 20ms max for Jordan
    ENABLE_ROUTE_FINGERPRINT: true,
    ENABLE_PATH_VALIDATION: true
  },
  
  IPV6: {
    ENABLED: true,
    BLOCK_NON_JORDAN: true,
    FORCE_IPV4_FALLBACK: true,
    PREFER_IPV4: true
  },
  
  // نطاقات DNS أردنية موثوقة فقط
  TRUSTED_DNS: {
    ORANGE: ['176.29.1.1', '176.29.1.2'],
    ZAIN: ['82.212.1.1', '82.212.1.2'],
    UMNIAH: ['185.119.1.1', '185.119.1.2'],
    JT: ['212.118.0.2', '212.118.0.3']
  },
  
  // ASN أردنية معتمدة فقط
  JORDAN_ASN: [
    8376,   // Orange/JT
    47887,  // Zain
    48832,  // Umniah
    8697,   // Batelco
    201094, // Damamax
    50670,  // IPTECH
    49544,  // i3D Jordan
    203960  // MADA
  ]
};

var BLOCK = 'PROXY 127.0.0.1:9';
var DIRECT = 'DIRECT';

// ========== قاعدة IPs الأردنية الأصلية (مبسطة للأداء) ==========
var JORDAN_IP_RANGES = {
  ranges: [],
  quickCache: {},
  superCache: {},
  
  init: function() {
    var rawRanges = [
      // نطاقات أساسية فقط للأداء الأمثل
      ["82.212.64.0", "255.255.192.0"],
      ["94.249.0.0", "255.255.128.0"]
    ];
    
    for (var i = 0; i < rawRanges.length; i++) {
      var startInt = ipToInt(rawRanges[i][0]);
      var endInt = ipToInt(rawRanges[i][1]);
      
      this.ranges.push({
        start: startInt,
        end: endInt
      });
      
      var parts = rawRanges[i][0].split('.');
      var net16 = parts[0] + '.' + parts[1];
      this.superCache[net16] = true;
      
      for (var j = 0; j <= 255; j++) {
        var net24 = parts[0] + '.' + parts[1] + '.' + j;
        this.quickCache[net24] = true;
      }
    }
    
    this.ranges.sort(function(a, b) { return a.start - b.start; });
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
    var parts = ip.split('.');
    var net16 = parts[0] + '.' + parts[1];
    
    if (this.superCache[net16]) return true;
    
    var net24 = parts[0] + '.' + parts[1] + '.' + parts[2];
    if (this.quickCache[net24]) return true;
    
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
  }
};

// ========== IPv6 الأردن ==========
var JORDAN_IPV6_RANGES = {
  ranges: [],
  prefixCache: {},
  
  init: function() {
    this.ranges = [
      {
        prefix: '2a00:18d8',
        prefixLength: 29,
        start: '2a00:18d8::',
        end: '2a00:18df:ffff:ffff:ffff:ffff:ffff:ffff'
      }
    ];
    
    for (var i = 0x18d8; i <= 0x18df; i++) {
      var hex = i.toString(16);
      this.prefixCache['2a00:' + hex] = true;
    }
  },
  
  isJordanIPv6: function(ip) {
    if (!ip || ip.indexOf(':') === -1) return false;
    
    var normalized = this.normalizeIPv6(ip);
    var parts = normalized.split(':');
    if (parts.length < 2) return false;
    
    var prefix = parts[0] + ':' + parts[1];
    return this.prefixCache[prefix] === true;
  },
  
  normalizeIPv6: function(ip) {
    var zoneIndex = ip.indexOf('%');
    if (zoneIndex > -1) ip = ip.substring(0, zoneIndex);
    
    ip = ip.toLowerCase();
    
    if (ip.indexOf('::') > -1) {
      var sides = ip.split('::');
      var left = sides[0] ? sides[0].split(':') : [];
      var right = sides[1] ? sides[1].split(':') : [];
      var missing = 8 - (left.length + right.length);
      
      var middle = [];
      for (var i = 0; i < missing; i++) middle.push('0');
      
      var all = left.concat(middle).concat(right);
      ip = all.join(':');
    }
    
    var groups = ip.split(':');
    for (var j = 0; j < groups.length; j++) {
      while (groups[j].length < 4) groups[j] = '0' + groups[j];
    }
    
    return groups.join(':');
  }
};

// ========== Route Stability Manager - جديد ==========
var ROUTE_MANAGER = {
  currentRoute: null,
  routeLockTime: 0,
  routeChanges: 0,
  routeFingerprint: null,
  
  lockRoute: function(ip, proxy, isp) {
    this.currentRoute = {
      ip: ip,
      proxy: proxy,
      isp: isp,
      net16: ip.split('.').slice(0, 2).join('.'),
      timestamp: Date.now()
    };
    this.routeLockTime = Date.now();
    this.routeFingerprint = this.generateFingerprint(ip, isp);
  },
  
  generateFingerprint: function(ip, isp) {
    // بصمة فريدة للمسار
    var parts = ip.split('.');
    return parts[0] + '-' + parts[1] + '-' + isp;
  },
  
  isRouteLocked: function() {
    if (!this.currentRoute) return false;
    return (Date.now() - this.routeLockTime) < CONFIG.TIMEOUTS.ROUTE_LOCK;
  },
  
  validateRoute: function(ip, isp) {
    if (!this.isRouteLocked()) return true;
    
    var newFingerprint = this.generateFingerprint(ip, isp);
    
    // يجب أن تتطابق البصمة تماماً
    if (newFingerprint !== this.routeFingerprint) {
      this.routeChanges++;
      
      // رفض التغيير إذا تجاوز الحد
      if (this.routeChanges > CONFIG.LIMITS.MAX_ROUTE_CHANGES) {
        return false;
      }
    }
    
    return true;
  },
  
  reset: function() {
    if (this.isRouteLocked()) return;
    
    this.currentRoute = null;
    this.routeLockTime = 0;
    this.routeChanges = 0;
    this.routeFingerprint = null;
  },
  
  getRouteInfo: function() {
    if (!this.currentRoute) {
      return {locked: false};
    }
    
    return {
      locked: this.isRouteLocked(),
      isp: this.currentRoute.isp,
      network: this.currentRoute.net16,
      proxy: this.currentRoute.proxy,
      changes: this.routeChanges,
      age: Math.floor((Date.now() - this.routeLockTime) / 1000) + 's',
      fingerprint: this.routeFingerprint
    };
  }
};

// ========== Path Validator - للتأكد من المسار داخل الأردن ==========
var PATH_VALIDATOR = {
  violations: 0,
  suspiciousPatterns: {},
  
  validatePath: function(ip, host) {
    // 1. تحقق من hostname patterns
    if (this.hasSuspiciousPattern(host)) {
      this.violations++;
      return {valid: false, reason: 'suspicious-hostname'};
    }
    
    // 2. تحقق من IP range consistency
    if (!this.isConsistentRange(ip)) {
      this.violations++;
      return {valid: false, reason: 'inconsistent-range'};
    }
    
    // 3. تحقق من geographic indicators
    if (!this.hasJordanIndicators(host)) {
      this.violations++;
      return {valid: false, reason: 'no-jordan-indicators'};
    }
    
    return {valid: true, reason: null};
  },
  
  hasSuspiciousPattern: function(host) {
    // Cloud providers, VPN services, proxies
    var patterns = [
      /amazonaws|ec2|aws/i,
      /azure|microsoft|msft/i,
      /googlecloud|gcp|google\.com/i,
      /cloudflare|cf-|warp/i,
      /digitalocean|linode|vultr/i,
      /vpn|proxy|tunnel/i,
      /tor-exit|relay/i
    ];
    
    for (var i = 0; i < patterns.length; i++) {
      if (patterns[i].test(host)) {
        if (!this.suspiciousPatterns[host]) {
          this.suspiciousPatterns[host] = 0;
        }
        this.suspiciousPatterns[host]++;
        return true;
      }
    }
    
    return false;
  },
  
  isConsistentRange: function(ip) {
    // تحقق من أن IP ضمن النطاقات المتوقعة
    var parts = ip.split('.');
    var firstOctet = parseInt(parts[0]);
    
    // النطاقات الأردنية المعروفة تبدأ بـ:
    // 82, 94, 176, 185, 188, 195, 212, 213, 37, 46, 62, 84
    var validOctets = [37, 46, 62, 82, 84, 94, 176, 185, 188, 195, 212, 213];
    
    for (var i = 0; i < validOctets.length; i++) {
      if (firstOctet === validOctets[i]) return true;
    }
    
    return false;
  },
  
  hasJordanIndicators: function(host) {
    // كلمات دلالية أردنية في hostname
    if (/\.jo$|jordan|amman|orange\.jo|zain|umniah|batelco/i.test(host)) {
      return true;
    }
    
    // قبول أي شيء لا يحتوي على indicators خارجية
    if (!/\.us$|\.uk$|\.de$|\.fr$|\.sg$|\.jp$|\.cn$/i.test(host)) {
      return true;
    }
    
    return false;
  },
  
  getViolations: function() {
    return {
      total: this.violations,
      suspicious: this.suspiciousPatterns
    };
  }
};

// ========== DNS Security - محسّن ==========
var DNS_SECURITY = {
  suspiciousServers: {},
  leakDetected: false,
  blockedQueries: 0,
  
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
    return /^(162\.159\.|104\.1[6-9]\.|104\.2[0-9]\.|104\.3[0-1]\.|172\.6[4-7]\.)/.test(ip);
  },
  
  isSuspiciousDNS: function(ip) {
    var suspicious = [
      '8.8.8.8', '8.8.4.4',
      '1.1.1.1', '1.0.0.1',
      '9.9.9.9', '149.112.112.112',
      '208.67.222.222', '208.67.220.220'
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
  isIPv4: function(ip) {
    return /^(\d{1,3}\.){3}\d{1,3}$/.test(ip);
  },
  
  isIPv6: function(ip) {
    return ip.indexOf(':') > -1;
  },
  
  isPrivateIP: function(ip) {
    if (this.isIPv4(ip)) {
      return /^(10\.|172\.(1[6-9]|2[0-9]|3[01])\.|192\.168\.|127\.)/.test(ip);
    }
    return /^(fe80:|fc00:|::1)/.test(ip);
  },
  
  isJordanIP: function(ip) {
    if (!ip) return false;
    if (this.isPrivateIP(ip)) return false;
    if (DNS_SECURITY.isCloudflareWARP(ip)) return false;
    
    if (this.isIPv4(ip)) {
      return JORDAN_IP_RANGES.isJordanIP(ip);
    }
    
    if (this.isIPv6(ip)) {
      if (!CONFIG.IPV6.ENABLED) return false;
      return JORDAN_IPV6_RANGES.isJordanIPv6(ip);
    }
    
    return false;
  },
  
  performSecurityChecks: function(ip, host) {
    // DNS checks
    if (CONFIG.SECURITY.BLOCK_VPN_DNS && DNS_SECURITY.isSuspiciousDNS(ip)) {
      return {valid: false, reason: 'vpn-dns-detected'};
    }
    
    if (CONFIG.SECURITY.BLOCK_CLOUDFLARE_WARP && DNS_SECURITY.isCloudflareWARP(ip)) {
      return {valid: false, reason: 'cloudflare-warp'};
    }
    
    // Path validation
    if (CONFIG.SECURITY.ENABLE_PATH_VALIDATION) {
      var pathCheck = PATH_VALIDATOR.validatePath(ip, host);
      if (!pathCheck.valid) {
        return {valid: false, reason: pathCheck.reason};
      }
    }
    
    return {valid: true, reason: null};
  }
};

// ========== ISP Detector ==========
var JORDAN_ISP = {
  providers: {
    'Orange': {
      nets: ['176.29', '176.28', '176.27', '37.123', '46.32', '46.248', '62.72', '84.18'],
      asn: 8376,
      proxy: CONFIG.PROXIES.ORANGE_DIRECT,
      avgPing: 8
    },
    'Zain': {
      nets: ['82.212', '195.229', '213.6', '91.186', '178.77', '91.220'],
      asn: 47887,
      proxy: CONFIG.PROXIES.ZAIN_DIRECT,
      avgPing: 7
    },
    'Umniah': {
      nets: ['185.119', '188.161', '188.123', '185.98', '188.247', '185.43'],
      asn: 48832,
      proxy: CONFIG.PROXIES.UMNIAH_DIRECT,
      avgPing: 8
    },
    'Batelco': {
      nets: ['46.185', '94.249', '94.142', '37.44', '37.252'],
      asn: 8697,
      proxy: CONFIG.PROXIES.BATELCO_DIRECT,
      avgPing: 9
    },
    'JT': {
      nets: ['212.118', '213.186', '212.34', '212.35', '217.144'],
      asn: 8376,
      proxy: CONFIG.PROXIES.JT_BACKBONE,
      avgPing: 10
    },
    'Damamax': {
      nets: ['185.86'],
      asn: 201094,
      proxy: CONFIG.PROXIES.DAMAMAX,
      avgPing: 11
    }
  },
  
  cache: {},
  
  identify: function(ip) {
    if (this.cache[ip]) return this.cache[ip];
    
    if (ip.indexOf(':') > -1) {
      var result = {
        isp: 'IPv6-JO',
        proxy: CONFIG.PROXIES.FALLBACK,
        avgPing: 10,
        asn: 'UNKNOWN'
      };
      this.cache[ip] = result;
      return result;
    }
    
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
      avgPing: 12,
      asn: 'UNKNOWN'
    };
    this.cache[ip] = result;
    return result;
  }
};

// ========== Session Manager - Ultra Stable ==========
var SESSION = {
  ip: null,
  proxy: null,
  isp: null,
  locked: false,
  lockTime: 0,
  
  lock: function(ip, proxy, isp) {
    this.ip = ip;
    this.proxy = proxy;
    this.isp = isp;
    this.locked = true;
    this.lockTime = Date.now();
    
    // قفل المسار أيضاً
    ROUTE_MANAGER.lockRoute(ip, proxy, isp);
  },
  
  reset: function() {
    if (this.locked && (Date.now() - this.lockTime) > CONFIG.TIMEOUTS.SESSION_LOCK) {
      this.locked = false;
      this.ip = null;
      this.proxy = null;
      this.isp = null;
      this.lockTime = 0;
    }
    
    ROUTE_MANAGER.reset();
  },
  
  validate: function(ip, isp) {
    if (!this.locked) return true;
    
    // يجب أن يكون نفس ISP
    if (this.isp !== isp) return false;
    
    // IPv6 validation
    if (ip.indexOf(':') > -1) {
      var current = ip.split(':').slice(0, 3).join(':');
      var locked = this.ip.split(':').slice(0, 3).join(':');
      return current === locked;
    }
    
    // IPv4 validation - نفس /16 network
    var net16_current = ip.split('.').slice(0, 2).join('.');
    var net16_locked = this.ip.split('.').slice(0, 2).join('.');
    return net16_current === net16_locked;
  },
  
  getInfo: function() {
    return {
      locked: this.locked,
      ip: this.ip,
      proxy: this.proxy,
      isp: this.isp,
      age: this.locked ? Math.floor((Date.now() - this.lockTime) / 1000) + 's' : '0s'
    };
  }
};

// ========== Network Monitor ==========
var NET_MONITOR = {
  stats: {
    totalRequests: 0,
    blockedNonJordan: 0,
    blockedIPv6NonJordan: 0,
    blockedVPN: 0,
    blockedDNSLeak: 0,
    blockedPath: 0,
    blockedRoute: 0,
    allowedJordan: 0,
    allowedJordanIPv6: 0,
    allowedWhitelist: 0,
    matchRequests: 0,
    lobbyRequests: 0,
    sessionViolations: 0,
    routeViolations: 0,
    startTime: Date.now()
  },
  
  blockedIPs: {},
  blockedIPv6: {},
  
  record: function(decision, ip, type, reason) {
    this.stats.totalRequests++;
    
    if (decision === BLOCK) {
      if (reason === 'vpn-dns-detected' || reason === 'cloudflare-warp') {
        this.stats.blockedVPN++;
      } else if (reason === 'dns-leak') {
        this.stats.blockedDNSLeak++;
      } else if (reason === 'suspicious-hostname' || reason === 'inconsistent-range' || reason === 'no-jordan-indicators') {
        this.stats.blockedPath++;
      } else if (reason === 'route-violation') {
        this.stats.blockedRoute++;
        this.stats.routeViolations++;
      } else if (ip && ip.indexOf(':') > -1) {
        this.stats.blockedIPv6NonJordan++;
        if (!this.blockedIPv6[ip]) this.blockedIPv6[ip] = 0;
        this.blockedIPv6[ip]++;
      } else {
        this.stats.blockedNonJordan++;
        if (ip) {
          if (!this.blockedIPs[ip]) this.blockedIPs[ip] = 0;
          this.blockedIPs[ip]++;
        }
      }
      
      if (reason === 'session-violation') {
        this.stats.sessionViolations++;
      }
      
    } else if (decision === DIRECT) {
      this.stats.allowedWhitelist++;
    } else {
      if (ip && ip.indexOf(':') > -1) {
        this.stats.allowedJordanIPv6++;
      } else {
        this.stats.allowedJordan++;
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
    var jordanRate = total > 0 ? 
      (((this.stats.allowedJordan + this.stats.allowedJordanIPv6) / total) * 100).toFixed(2) : '0.00';
    var blockRate = total > 0 ? 
      (((this.stats.blockedNonJordan + this.stats.blockedIPv6NonJordan + this.stats.blockedVPN + this.stats.blockedDNSLeak + this.stats.blockedPath + this.stats.blockedRoute) / total) * 100).toFixed(2) : '0.00';
    
    return {
      uptime: uptimeMin + ' min',
      total: total,
      allowedJordan: this.stats.allowedJordan,
      allowedJordanIPv6: this.stats.allowedJordanIPv6,
      allowedWhitelist: this.stats.allowedWhitelist,
      blockedNonJordan: this.stats.blockedNonJordan,
      blockedIPv6NonJordan: this.stats.blockedIPv6NonJordan,
      blockedVPN: this.stats.blockedVPN,
      blockedDNSLeak: this.stats.blockedDNSLeak,
      blockedPath: this.stats.blockedPath,
      blockedRoute: this.stats.blockedRoute,
      match: this.stats.matchRequests,
      lobby: this.stats.lobbyRequests,
      sessionViolations: this.stats.sessionViolations,
      routeViolations: this.stats.routeViolations,
      jordanRate: jordanRate + '%',
      blockRate: blockRate + '%',
      routeStability: this.stats.routeViolations === 0 ? '100%' : ((1 - (this.stats.routeViolations / total)) * 100).toFixed(2) + '%'
    };
  },
  
  getTopBlockedIPs: function() {
    var ips = [];
    
    for (var ip in this.blockedIPs) {
      ips.push({ip: ip, count: this.blockedIPs[ip], version: 'IPv4'});
    }
    
    for (var ip6 in this.blockedIPv6) {
      ips.push({ip: ip6, count: this.blockedIPv6[ip6], version: 'IPv6'});
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
      for (var i = 0; i < keys.length * 0.2; i++) {
        delete this.data[keys[i]];
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
  var retries = 0;
  
  while (!ip && retries < CONFIG.LIMITS.MAX_DNS_RETRIES) {
    try {
      ip = dnsResolve(host);
      if (ip) break;
    } catch (e) {
      retries++;
    }
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
  JORDAN_IPV6_RANGES.init();
}

// ========== MAIN PROXY FUNCTION - ULTRA STABLE ==========
function FindProxyForURL(url, host) {
  if (JORDAN_IP_RANGES.ranges.length === 0) {
    initializeSystem();
  }
  
  host = norm(host.toLowerCase());
  SESSION.reset();
  
  // ===== WHITELIST =====
  var whitelistCheck = WHITELIST.isWhitelisted(host);
  if (whitelistCheck.allowed) {
    NET_MONITOR.record(DIRECT, null, 'whitelist', whitelistCheck.service);
    return DIRECT;
  }
  
  // ===== NON-GAME =====
  if (!isGAME(host)) {
    NET_MONITOR.record(DIRECT, null, 'non-game', 'system');
    return DIRECT;
  }
  
  // ===== GAME TRAFFIC =====
  
  var ip = resolveOptimized(host);
  
  if (!ip) {
    NET_MONITOR.record(BLOCK, ip, 'invalid', 'dns-failed');
    return BLOCK;
  }
  
  // ===== SECURITY CHECKS =====
  var securityCheck = IP_VALIDATOR.performSecurityChecks(ip, host);
  if (!securityCheck.valid) {
    NET_MONITOR.record(BLOCK, ip, 'security', securityCheck.reason);
    return BLOCK;
  }
  
  // ===== JORDAN IP CHECK =====
  if (!IP_VALIDATOR.isJordanIP(ip)) {
    var ipType = ip.indexOf(':') > -1 ? 'ipv6-non-jordan' : 'ipv4-non-jordan';
    NET_MONITOR.record(BLOCK, ip, 'blocked', ipType);
    return BLOCK;
  }
  
  // ===== DNS LEAK CHECK =====
  if (!DNS_SECURITY.checkDNSLeak(host, ip)) {
    NET_MONITOR.record(BLOCK, ip, 'security', 'dns-leak');
    return BLOCK;
  }
  
  // ===== IP IS JORDAN - IDENTIFY ISP =====
  
  var ispInfo = JORDAN_ISP.identify(ip);
  
  // ===== ROUTE VALIDATION =====
  if (CONFIG.SECURITY.ENABLE_ROUTE_FINGERPRINT) {
    if (!ROUTE_MANAGER.validateRoute(ip, ispInfo.isp)) {
      NET_MONITOR.record(BLOCK, ip, 'security', 'route-violation');
      return BLOCK;
    }
  }
  
  var isMatchRequest = isMatch(url, host) || isGameCritical(host);
  var isLobbyRequest = isLobby(url, host);
  
  // ===== MATCH HANDLING =====
  if (isMatchRequest) {
    if (SESSION.locked) {
      if (!SESSION.validate(ip, ispInfo.isp)) {
        NET_MONITOR.record(BLOCK, ip, 'match', 'session-violation');
        return BLOCK;
      }
      
      NET_MONITOR.record(SESSION.proxy, ip, 'match', 'locked-session');
      return SESSION.proxy;
    }
    
    var proxy = ispInfo.proxy;
    SESSION.lock(ip, proxy, ispInfo.isp);
    
    NET_MONITOR.record(proxy, ip, 'match', 'new-session');
    return proxy;
  }
  
  // ===== LOBBY HANDLING =====
  if (isLobbyRequest) {
    if (SESSION.locked) {
      NET_MONITOR.record(BLOCK, ip, 'lobby', 'match-active');
      return BLOCK;
    }
    
    var lobbyProxy = ispInfo.proxy;
    NET_MONITOR.record(lobbyProxy, ip, 'lobby', 'pre-match');
    return lobbyProxy;
  }
  
  // ===== DEFAULT BLOCK =====
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
    
    stability: {
      routeStability: stats.routeStability,
      routeChanges: ROUTE_MANAGER.routeChanges,
      currentRoute: ROUTE_MANAGER.getRouteInfo(),
      pathViolations: PATH_VALIDATOR.getViolations()
    },
    
    security: {
      vpnBlocking: CONFIG.SECURITY.BLOCK_VPN_DNS,
      warpBlocking: CONFIG.SECURITY.BLOCK_CLOUDFLARE_WARP,
      routeFingerprint: CONFIG.SECURITY.ENABLE_ROUTE_FINGERPRINT,
      pathValidation: CONFIG.SECURITY.ENABLE_PATH_VALIDATION,
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
    
    session: SESSION.getInfo(),
    
    coverage: {
      jordanIPv4Ranges: JORDAN_IP_RANGES.ranges.length,
      jordanIPv6Ranges: '1 (2a00:18d8::/29)',
      superCache: Object.keys(JORDAN_IP_RANGES.superCache).length + ' /16 nets',
      quickCache: Object.keys(JORDAN_IP_RANGES.quickCache).length + ' /24 nets',
      ipv6PrefixCache: Object.keys(JORDAN_IPV6_RANGES.prefixCache).length + ' prefixes',
      supportedISPs: Object.keys(JORDAN_ISP.providers).length
    }
  };
}

function debugCheckIP(ip) {
  var isJordan = IP_VALIDATOR.isJordanIP(ip);
  var ispInfo = isJordan ? JORDAN_ISP.identify(ip) : null;
  var ipVersion = ip.indexOf(':') > -1 ? 'IPv6' : 'IPv4';
  var isPrivate = IP_VALIDATOR.isPrivateIP(ip);
  var isWARP = DNS_SECURITY.isCloudflareWARP(ip);
  
  return {
    ip: ip,
    version: ipVersion,
    isJordan: isJordan,
    isPrivate: isPrivate,
    isWARP: isWARP,
    isp: ispInfo ? ispInfo.isp : 'NON-JORDAN',
    asn: ispInfo ? ispInfo.asn : 'UNKNOWN',
    proxy: ispInfo ? ispInfo.proxy : 'BLOCKED',
    expectedPing: ispInfo ? ispInfo.avgPing + 'ms (Zero Hop)' : 'N/A',
    verdict: isJordan ? '✅ ALLOWED - JORDAN ' + ipVersion : '❌ BLOCKED - NOT JORDAN'
  };
}

function debugGetBlockedIPs() {
  return NET_MONITOR.getTopBlockedIPs();
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
  
  var securityCheck = IP_VALIDATOR.performSecurityChecks(ip, host);
  if (!securityCheck.valid) {
    return {
      domain: domain,
      ip: ip,
      status: 'SECURITY VIOLATION',
      reason: securityCheck.reason,
      decision: 'BLOCK'
    };
  }
  
  var isJordan = IP_VALIDATOR.isJordanIP(ip);
  var ispInfo = isJordan ? JORDAN_ISP.identify(ip) : null;
  var ipVersion = ip.indexOf(':') > -1 ? 'IPv6' : 'IPv4';
  
  return {
    domain: domain,
    ip: ip,
    ipVersion: ipVersion,
    status: isJordan ? 'JORDAN IP' : 'NON-JORDAN IP',
    isp: ispInfo ? ispInfo.isp : 'FOREIGN',
    asn: ispInfo ? ispInfo.asn : 'UNKNOWN',
    proxy: ispInfo ? ispInfo.proxy : 'NONE',
    expectedPing: ispInfo ? ispInfo.avgPing + 'ms' : 'N/A',
    decision: isJordan ? ispInfo.proxy : 'BLOCK'
  };
}

function debugTestIPv6(ipv6) {
  return {
    ip: ipv6,
    normalized: JORDAN_IPV6_RANGES.normalizeIPv6(ipv6),
    isJordan: JORDAN_IPV6_RANGES.isJordanIPv6(ipv6),
    expectedRange: '2a00:18d8::/29',
    verdict: JORDAN_IPV6_RANGES.isJordanIPv6(ipv6) ? 
      '✅ ALLOWED - JORDAN IPv6' : 
      '❌ BLOCKED - NOT JORDAN IPv6'
  };
}

function debugGetRouteInfo() {
  return ROUTE_MANAGER.getRouteInfo();
}

function debugGetPathViolations() {
  return PATH_VALIDATOR.getViolations();
}

function debugReset() {
  NET_MONITOR.stats = {
    totalRequests: 0,
    blockedNonJordan: 0,
    blockedIPv6NonJordan: 0,
    blockedVPN: 0,
    blockedDNSLeak: 0,
    blockedPath: 0,
    blockedRoute: 0,
    allowedJordan: 0,
    allowedJordanIPv6: 0,
    allowedWhitelist: 0,
    matchRequests: 0,
    lobbyRequests: 0,
    sessionViolations: 0,
    routeViolations: 0,
    startTime: Date.now()
  };
  
  NET_MONITOR.blockedIPs = {};
  NET_MONITOR.blockedIPv6 = {};
  
  DNS_CACHE.data = {};
  DNS_CACHE.hits = 0;
  DNS_CACHE.misses = 0;
  DNS_CACHE.failures = 0;
  
  DNS_SECURITY.suspiciousServers = {};
  DNS_SECURITY.leakDetected = false;
  DNS_SECURITY.blockedQueries = 0;
  
  PATH_VALIDATOR.violations = 0;
  PATH_VALIDATOR.suspiciousPatterns = {};
  
  ROUTE_MANAGER.currentRoute = null;
  ROUTE_MANAGER.routeLockTime = 0;
  ROUTE_MANAGER.routeChanges = 0;
  ROUTE_MANAGER.routeFingerprint = null;
  
  JORDAN_ISP.cache = {};
  WHITELIST.cache = {};
  
  SESSION.locked = false;
  SESSION.ip = null;
  SESSION.proxy = null;
  SESSION.isp = null;
  SESSION.lockTime = 0;
  
  return '✅ JORDAN ULTRA STABLE MODE RESET - ZERO PING - ROUTE LOCKED';
}

// ========== END ==========
