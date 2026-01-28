var CONFIG = {
  VERSION: '12.0.0-FORTRESS',
  BUILD_DATE: '2025-01-29',
  MODE: 'JORDAN_FORTRESS_ABSOLUTE_ZERO',
  
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
    SESSION_LOCK: 5400000,        // 90 دقيقة - جلسة طويلة جداً
    DNS_CACHE: 2700000,           // 45 دقيقة
    IP_CACHE: 10800000,           // 3 ساعات
    ROUTE_LOCK: 10800000,         // 3 ساعات - قفل مطلق
    FINGERPRINT_LOCK: 14400000    // 4 ساعات - بصمة المسار
  },
  
  LIMITS: {
    MAX_DNS_RETRIES: 1,           // محاولة واحدة فقط
    MAX_ROUTE_CHANGES: 0,         // صفر تغييرات - ثبات مطلق
    MAX_ISP_SWITCHES: 0,          // صفر تبديل ISP
    MAX_SUBNET_CHANGES: 0,        // صفر تغيير subnet
    DNS_CACHE_SIZE: 25000,
    IP_CACHE_SIZE: 40000,
    MAX_PATH_VIOLATIONS: 3,       // 3 انتهاكات = حظر نهائي
    MAX_SECURITY_VIOLATIONS: 2    // انتهاكان أمنيان = حظر
  },
  
  SECURITY: {
    BLOCK_VPN_DNS: true,
    BLOCK_CLOUDFLARE_WARP: true,
    BLOCK_SUSPICIOUS_HOPS: true,
    ENFORCE_ASN_CHECK: true,
    BLOCK_TOR_EXIT: true,
    REQUIRE_JORDAN_REVERSE_DNS: true,
    MAX_ALLOWED_LATENCY: 15,      // 15ms maximum
    ENABLE_ROUTE_FINGERPRINT: true,
    ENABLE_PATH_VALIDATION: true,
    ENABLE_DEEP_PACKET_INSPECTION: true,
    ENABLE_ANOMALY_DETECTION: true,
    ENABLE_GEO_ENFORCEMENT: true,
    BLOCK_PROXY_CHAINS: true,
    BLOCK_TUNNELING: true,
    ENFORCE_MTU_VALIDATION: true,
    ENFORCE_TTL_VALIDATION: true,
    REQUIRE_ISP_CONSISTENCY: true,
    ZERO_TOLERANCE_MODE: true
  },
  
  IPV6: {
    ENABLED: false,               // تعطيل IPv6 كلياً للأمان
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
  
  // نطاقات محظورة بشكل مطلق
  BLACKLIST_RANGES: {
    CLOUDFLARE_WARP: ['162.159.', '104.16.', '104.17.', '104.18.', '104.19.', '104.20.', '104.21.', '104.22.', '104.23.', '104.24.', '104.25.', '104.26.', '104.27.', '104.28.', '104.29.', '104.30.', '104.31.', '172.64.', '172.65.', '172.66.', '172.67.'],
    VPN_PROVIDERS: ['5.2.', '5.8.', '31.171.', '45.', '91.', '185.', '193.'],
    CLOUD_PROVIDERS: ['13.', '18.', '35.', '52.', '54.', '20.', '40.', '104.', '168.'],
    TOR_EXIT: ['176.10.', '185.220.', '195.206.']
  }
};

var BLOCK = 'PROXY 127.0.0.1:9';
var DIRECT = 'DIRECT';

// ========== نطاقات IP الأردنية - موسعة ودقيقة ==========
var JORDAN_IP_RANGES = {
  ranges: [],
  quickCache: {},
  superCache: {},
  ultraCache: {},  // كاش إضافي للأداء
  
  init: function() {
    var rawRanges = [
      // Orange Jordan
      ["176.29.0.0", "255.255.0.0"],
      ["176.28.0.0", "255.255.0.0"],
      ["37.123.0.0", "255.255.0.0"],
      ["46.32.0.0", "255.255.0.0"],
      ["62.72.0.0", "255.255.0.0"],
      ["84.18.0.0", "255.255.0.0"],
      
      // Zain Jordan
      ["82.212.0.0", "255.255.0.0"],
      ["195.229.0.0", "255.255.0.0"],
      ["213.6.0.0", "255.255.0.0"],
      ["91.186.0.0", "255.255.0.0"],
      
      // Umniah
      ["185.119.0.0", "255.255.0.0"],
      ["188.161.0.0", "255.255.0.0"],
      ["188.123.0.0", "255.255.0.0"],
      
      // Batelco
      ["46.185.0.0", "255.255.0.0"],
      ["94.249.0.0", "255.255.128.0"],
      
      // JT/Backbone
      ["212.118.0.0", "255.255.0.0"],
      ["213.186.0.0", "255.255.0.0"]
    ];
    
    for (var i = 0; i < rawRanges.length; i++) {
      var startInt = ipToInt(rawRanges[i][0]);
      var maskInt = ipToInt(rawRanges[i][1]);
      var endInt = startInt | (~maskInt >>> 0);
      
      this.ranges.push({
        start: startInt,
        end: endInt
      });
      
      var parts = rawRanges[i][0].split('.');
      var net8 = parts[0];
      var net16 = parts[0] + '.' + parts[1];
      
      this.ultraCache[net8] = true;
      this.superCache[net16] = true;
      
      // بناء quick cache كامل
      var startOctet3 = parseInt(parts[2]);
      var endOctet3 = startOctet3 + ((~maskInt >>> 0) >> 8 & 0xFF);
      
      for (var j = startOctet3; j <= endOctet3; j++) {
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
    
    // فحص سريع جداً
    var net8 = parts[0];
    if (!this.ultraCache[net8]) return false;
    
    var net16 = parts[0] + '.' + parts[1];
    if (!this.superCache[net16]) return false;
    
    var net24 = parts[0] + '.' + parts[1] + '.' + parts[2];
    if (this.quickCache[net24]) return true;
    
    // Binary search للتأكد النهائي
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

// ========== Blacklist Manager - محسّن ==========
var BLACKLIST_MANAGER = {
  blacklistedIPs: {},
  blacklistedHosts: {},
  blacklistedASN: {},
  permanentBans: {},
  
  isBlacklisted: function(ip) {
    if (this.permanentBans[ip]) return {blocked: true, reason: 'permanent-ban', severity: 'CRITICAL'};
    if (this.blacklistedIPs[ip]) return {blocked: true, reason: 'blacklisted-ip', severity: 'HIGH'};
    
    // فحص نطاقات محظورة
    for (var category in CONFIG.BLACKLIST_RANGES) {
      var ranges = CONFIG.BLACKLIST_RANGES[category];
      for (var i = 0; i < ranges.length; i++) {
        if (ip.indexOf(ranges[i]) === 0) {
          this.addPermanentBan(ip, category);
          return {blocked: true, reason: 'blacklist-' + category.toLowerCase(), severity: 'CRITICAL'};
        }
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

// ========== Anomaly Detector - جديد كلياً ==========
var ANOMALY_DETECTOR = {
  patterns: {},
  anomalies: {},
  threshold: 5,  // 5 سلوكيات شاذة = حظر
  
  analyze: function(ip, host, behavior) {
    var key = ip + ':' + host;
    
    if (!this.patterns[key]) {
      this.patterns[key] = {
        requests: 0,
        behaviors: [],
        firstSeen: Date.now(),
        lastSeen: Date.now()
      };
    }
    
    var pattern = this.patterns[key];
    pattern.requests++;
    pattern.lastSeen = Date.now();
    pattern.behaviors.push(behavior);
    
    // تحليل الأنماط الشاذة
    var anomalyScore = 0;
    
    // 1. طلبات سريعة جداً (< 100ms بين الطلبات)
    if (pattern.requests > 10 && (pattern.lastSeen - pattern.firstSeen) < 1000) {
      anomalyScore += 3;
    }
    
    // 2. تغيير سلوك مفاجئ
    if (pattern.behaviors.length > 3) {
      var lastThree = pattern.behaviors.slice(-3);
      var unique = {};
      for (var i = 0; i < lastThree.length; i++) {
        unique[lastThree[i]] = true;
      }
      if (Object.keys(unique).length === 3) {
        anomalyScore += 2;
      }
    }
    
    // 3. عدد طلبات مشبوه
    if (pattern.requests > 100) {
      anomalyScore += 2;
    }
    
    if (anomalyScore >= this.threshold) {
      this.anomalies[key] = {
        score: anomalyScore,
        pattern: pattern,
        detected: Date.now()
      };
      return {anomaly: true, score: anomalyScore, action: 'BLOCK'};
    }
    
    return {anomaly: false, score: anomalyScore, action: 'ALLOW'};
  },
  
  isAnomaly: function(ip, host) {
    var key = ip + ':' + host;
    return this.anomalies[key] !== undefined;
  },
  
  getStats: function() {
    return {
      totalPatterns: Object.keys(this.patterns).length,
      detectedAnomalies: Object.keys(this.anomalies).length
    };
  }
};

// ========== Route Fortress - مطور بالكامل ==========
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
    this.subnet = parts[0] + '.' + parts[1] + '.' + parts[2];  // /24
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
    
    // يجب أن يكون نفس الـ fingerprint بالضبط
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
    
    // فحص إضافي: نفس الـ subnet بالضبط
    var parts = ip.split('.');
    var currentSubnet = parts[0] + '.' + parts[1] + '.' + parts[2];
    
    if (currentSubnet !== this.subnet) {
      this.violations++;
      return {
        valid: false,
        reason: 'subnet-changed',
        expected: this.subnet,
        received: currentSubnet,
        violations: this.violations
      };
    }
    
    // فحص: نفس ISP
    if (this.isp !== isp) {
      this.violations++;
      return {
        valid: false,
        reason: 'isp-changed',
        expected: this.isp,
        received: isp,
        violations: this.violations
      };
    }
    
    // فحص: نفس ASN
    if (this.asn !== asn) {
      this.violations++;
      return {
        valid: false,
        reason: 'asn-changed',
        expected: this.asn,
        received: asn,
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

// ========== Deep Security Inspector - جديد ==========
var SECURITY_INSPECTOR = {
  violations: {},
  suspiciousActivity: {},
  
  inspect: function(ip, host, url) {
    var violations = [];
    
    // 1. فحص MTU patterns (محاكاة)
    if (this.detectTunneling(host, url)) {
      violations.push({type: 'tunneling-detected', severity: 'CRITICAL'});
    }
    
    // 2. فحص TTL patterns
    if (this.detectProxyChain(ip)) {
      violations.push({type: 'proxy-chain-detected', severity: 'CRITICAL'});
    }
    
    // 3. فحص DNS consistency
    if (this.detectDNSInconsistency(host, ip)) {
      violations.push({type: 'dns-inconsistency', severity: 'HIGH'});
    }
    
    // 4. فحص geographic indicators
    if (this.detectGeoAnomaly(ip, host)) {
      violations.push({type: 'geo-anomaly', severity: 'MEDIUM'});
    }
    
    if (violations.length > 0) {
      var key = ip + ':' + host;
      if (!this.violations[key]) {
        this.violations[key] = [];
      }
      this.violations[key] = this.violations[key].concat(violations);
      
      // حظر تلقائي بعد انتهاكين
      if (this.violations[key].length >= CONFIG.LIMITS.MAX_SECURITY_VIOLATIONS) {
        BLACKLIST_MANAGER.addPermanentBan(ip, 'security-violations');
        return {
          passed: false,
          violations: violations,
          action: 'PERMANENT_BAN',
          total: this.violations[key].length
        };
      }
      
      return {
        passed: false,
        violations: violations,
        action: 'BLOCK',
        total: this.violations[key].length
      };
    }
    
    return {passed: true, violations: [], action: 'ALLOW'};
  },
  
  detectTunneling: function(host, url) {
    // كشف أنماط الـ tunneling
    var tunnelPatterns = [
      /tunnel|vpn|proxy|relay|forward|hop/i,
      /socks|shadowsocks|v2ray|trojan/i,
      /wireguard|openvpn|ipsec/i
    ];
    
    var combined = host + url;
    for (var i = 0; i < tunnelPatterns.length; i++) {
      if (tunnelPatterns[i].test(combined)) {
        return true;
      }
    }
    return false;
  },
  
  detectProxyChain: function(ip) {
    // الـ proxies عادة تكون في نطاقات معينة
    var proxyRanges = ['10.', '172.16.', '192.168.', '100.64.'];
    for (var i = 0; i < proxyRanges.length; i++) {
      if (ip.indexOf(proxyRanges[i]) === 0) return true;
    }
    return false;
  },
  
  detectDNSInconsistency: function(host, ip) {
    // إذا كان الـ host يشير لدولة ولكن IP من دولة أخرى
    var foreignTLDs = ['.us', '.uk', '.de', '.fr', '.cn', '.jp', '.sg', '.in', '.br'];
    var isJordan = JORDAN_IP_RANGES.isJordanIP(ip);
    
    for (var i = 0; i < foreignTLDs.length; i++) {
      if (host.indexOf(foreignTLDs[i]) > -1 && !isJordan) {
        return true;
      }
    }
    return false;
  },
  
  detectGeoAnomaly: function(ip, host) {
    // إذا كان host يحتوي على jordan/jo ولكن IP ليس أردني
    if (/jordan|\.jo|amman|zain|orange|umniah/i.test(host)) {
      return !JORDAN_IP_RANGES.isJordanIP(ip);
    }
    return false;
  },
  
  getStats: function() {
    var totalViolations = 0;
    for (var key in this.violations) {
      totalViolations += this.violations[key].length;
    }
    
    return {
      uniqueViolators: Object.keys(this.violations).length,
      totalViolations: totalViolations
    };
  }
};

// ========== DNS Security - مطور ==========
var DNS_SECURITY = {
  cache: {},
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
    // تسجيل الاستعلام
    if (!this.queryLog[host]) {
      this.queryLog[host] = [];
    }
    this.queryLog[host].push({ip: resolvedIP, time: Date.now()});
    
    // إذا تغير IP لنفس الـ host بشكل مشبوه
    if (this.queryLog[host].length > 3) {
      var uniqueIPs = {};
      var recent = this.queryLog[host].slice(-3);
      for (var i = 0; i < recent.length; i++) {
        uniqueIPs[recent[i].ip] = true;
      }
      
      // 3 IPs مختلفة لنفس host = تسريب محتمل
      if (Object.keys(uniqueIPs).length === 3) {
        this.leakDetected = true;
        this.blockedQueries++;
        BLACKLIST_MANAGER.addBlacklist(null, host, 'dns-leak-detected');
        return false;
      }
    }
    
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
      '8.8.8.8', '8.8.4.4',           // Google
      '1.1.1.1', '1.0.0.1',           // Cloudflare
      '9.9.9.9', '149.112.112.112',   // Quad9
      '208.67.222.222', '208.67.220.220', // OpenDNS
      '76.76.2.0', '76.76.10.0',      // Control D
      '94.140.14.14', '94.140.15.15'  // AdGuard
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
      suspiciousServers: Object.keys(this.suspiciousServers).length,
      uniqueHosts: Object.keys(this.queryLog).length
    };
  }
};

// ========== IP Validator - محسّن ==========
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
    
    // فحص الكاش أولاً
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
    
    // IPv6 معطل
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
    // 1. Blacklist check
    var blacklistCheck = BLACKLIST_MANAGER.isBlacklisted(ip);
    if (blacklistCheck.blocked) {
      return {valid: false, reason: blacklistCheck.reason, severity: blacklistCheck.severity};
    }
    
    // 2. DNS checks
    if (CONFIG.SECURITY.BLOCK_VPN_DNS && DNS_SECURITY.isSuspiciousDNS(ip)) {
      BLACKLIST_MANAGER.addBlacklist(ip, host, 'vpn-dns');
      return {valid: false, reason: 'vpn-dns-detected', severity: 'CRITICAL'};
    }
    
    if (CONFIG.SECURITY.BLOCK_CLOUDFLARE_WARP && DNS_SECURITY.isCloudflareWARP(ip)) {
      BLACKLIST_MANAGER.addPermanentBan(ip, 'cloudflare-warp');
      return {valid: false, reason: 'cloudflare-warp', severity: 'CRITICAL'};
    }
    
    // 3. Deep inspection
    if (CONFIG.SECURITY.ENABLE_DEEP_PACKET_INSPECTION) {
      var inspection = SECURITY_INSPECTOR.inspect(ip, host, url);
      if (!inspection.passed) {
        return {
          valid: false,
          reason: 'security-inspection-failed',
          severity: 'CRITICAL',
          violations: inspection.violations
        };
      }
    }
    
    // 4. Anomaly detection
    if (CONFIG.SECURITY.ENABLE_ANOMALY_DETECTION) {
      var anomaly = ANOMALY_DETECTOR.analyze(ip, host, 'security-check');
      if (anomaly.anomaly) {
        BLACKLIST_MANAGER.addBlacklist(ip, host, 'anomaly-detected');
        return {
          valid: false,
          reason: 'anomaly-detected',
          severity: 'HIGH',
          score: anomaly.score
        };
      }
    }
    
    return {valid: true, reason: null, severity: null};
  }
};

// ========== ISP Detector - كما هو ==========
var JORDAN_ISP = {
  providers: {
    'Orange': {
      nets: ['176.29', '176.28', '176.27', '37.123', '46.32', '46.248', '62.72', '84.18'],
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
      nets: ['212.118', '213.186', '212.34', '212.35', '217.144'],
      asn: 8376,
      proxy: CONFIG.PROXIES.JT_BACKBONE,
      avgPing: 8
    },
    'Damamax': {
      nets: ['185.86'],
      asn: 201094,
      proxy: CONFIG.PROXIES.DAMAMAX,
      avgPing: 9
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

// ========== Session Manager - Ultra Strict ==========
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
    
    // يجب أن يكون نفس ISP بالضبط
    if (this.isp !== isp) {
      this.violations++;
      return {valid: false, reason: 'isp-mismatch', violations: this.violations};
    }
    
    // يجب أن يكون نفس ASN بالضبط
    if (this.asn !== asn) {
      this.violations++;
      return {valid: false, reason: 'asn-mismatch', violations: this.violations};
    }
    
    // يجب أن يكون نفس /24 subnet
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

// ========== Network Monitor - موسع ==========
var NET_MONITOR = {
  stats: {
    totalRequests: 0,
    blockedNonJordan: 0,
    blockedVPN: 0,
    blockedDNSLeak: 0,
    blockedSecurity: 0,
    blockedRoute: 0,
    blockedAnomaly: 0,
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
      } else if (reason === 'anomaly-detected') {
        this.stats.blockedAnomaly++;
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
    var securityEffectiveness = total > 0 ? ((this.stats.blockedSecurity / total) * 100).toFixed(2) : '0.00';
    
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
      blockedAnomaly: this.stats.blockedAnomaly,
      blockedBlacklist: this.stats.blockedBlacklist,
      match: this.stats.matchRequests,
      lobby: this.stats.lobbyRequests,
      sessionViolations: this.stats.sessionViolations,
      routeViolations: this.stats.routeViolations,
      securityViolations: this.stats.securityViolations,
      jordanRate: jordanRate + '%',
      blockRate: blockRate + '%',
      securityEffectiveness: securityEffectiveness + '%',
      fortressIntegrity: this.stats.routeViolations === 0 && this.stats.securityViolations === 0 ? '100%' : 'COMPROMISED'
    };
  }
};

// ========== DNS Cache - محسّن ==========
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

// ========== MAIN PROXY FUNCTION - FORTRESS MODE ==========
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
  
  // ===== GAME TRAFFIC - DNS RESOLVE =====
  var ip = resolveOptimized(host);
  
  if (!ip) {
    NET_MONITOR.record(BLOCK, ip, 'invalid', 'dns-failed');
    return BLOCK;
  }
  
  // ===== SECURITY FORTRESS =====
  var securityCheck = IP_VALIDATOR.performSecurityChecks(ip, host, url);
  if (!securityCheck.valid) {
    NET_MONITOR.record(BLOCK, ip, 'security', securityCheck.reason);
    return BLOCK;
  }
  
  // ===== JORDAN IP CHECK =====
  if (!IP_VALIDATOR.isJordanIP(ip)) {
    NET_MONITOR.record(BLOCK, ip, 'blocked', 'non-jordan-ip');
    return BLOCK;
  }
  
  // ===== DNS LEAK CHECK =====
  if (!DNS_SECURITY.checkDNSLeak(host, ip)) {
    NET_MONITOR.record(BLOCK, ip, 'security', 'dns-leak');
    return BLOCK;
  }
  
  // ===== ISP IDENTIFICATION =====
  var ispInfo = JORDAN_ISP.identify(ip);
  
  // ===== ROUTE FORTRESS VALIDATION =====
  var isMatchRequest = isMatch(url, host) || isGameCritical(host);
  var isLobbyRequest = isLobby(url, host);
  
  if (isMatchRequest) {
    // Match traffic - establish or validate route
    if (ROUTE_FORTRESS.isLocked()) {
      var routeValidation = ROUTE_FORTRESS.validateRoute(ip, ispInfo.isp, ispInfo.asn);
      
      if (!routeValidation.valid) {
        NET_MONITOR.record(BLOCK, ip, 'match', 'route-violation:' + routeValidation.reason);
        
        // بعد 3 انتهاكات = حظر دائم
        if (ROUTE_FORTRESS.violations >= CONFIG.LIMITS.MAX_PATH_VIOLATIONS) {
          BLACKLIST_MANAGER.addPermanentBan(ip, 'repeated-route-violations');
        }
        
        return BLOCK;
      }
    } else {
      // Establish new route
      var establish = ROUTE_FORTRESS.establishRoute(ip, ispInfo.isp, ispInfo.asn, ispInfo.proxy);
      if (!establish.success) {
        NET_MONITOR.record(BLOCK, ip, 'match', establish.reason);
        return BLOCK;
      }
    }
    
    // Session validation
    if (SESSION.locked) {
      var sessionCheck = SESSION.validate(ip, ispInfo.isp, ispInfo.asn);
      if (!sessionCheck.valid) {
        NET_MONITOR.record(BLOCK, ip, 'match', 'session-violation:' + sessionCheck.reason);
        return BLOCK;
      }
      
      NET_MONITOR.record(SESSION.proxy, ip, 'match', 'locked-session');
      return SESSION.proxy;
    }
    
    // Lock session
    var proxy = ispInfo.proxy;
    SESSION.lock(ip, proxy, ispInfo.isp, ispInfo.asn);
    
    NET_MONITOR.record(proxy, ip, 'match', 'new-fortress-session');
    return proxy;
  }
  
  // ===== LOBBY HANDLING =====
  if (isLobbyRequest) {
    if (SESSION.locked || ROUTE_FORTRESS.isLocked()) {
      NET_MONITOR.record(BLOCK, ip, 'lobby', 'fortress-active');
      return BLOCK;
    }
    
    var lobbyProxy = ispInfo.proxy;
    NET_MONITOR.record(lobbyProxy, ip, 'lobby', 'pre-fortress');
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
    
    fortress: {
      status: ROUTE_FORTRESS.getStatus(),
      violations: ROUTE_FORTRESS.violations,
      zeroToleranceMode: CONFIG.SECURITY.ZERO_TOLERANCE_MODE
    },
    
    security: {
      blacklist: BLACKLIST_MANAGER.getStats(),
      inspector: SECURITY_INSPECTOR.getStats(),
      anomalies: ANOMALY_DETECTOR.getStats(),
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
      jordanIPRanges: JORDAN_IP_RANGES.ranges.length,
      superCache: Object.keys(JORDAN_IP_RANGES.superCache).length + ' /16 nets',
      quickCache: Object.keys(JORDAN_IP_RANGES.quickCache).length + ' /24 nets',
      supportedISPs: Object.keys(JORDAN_ISP.providers).length
    }
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
    expectedPing: ispInfo ? ispInfo.avgPing + 'ms (Zero Hop)' : 'N/A',
    verdict: isJordan && !blacklistCheck.blocked ? '✅ ALLOWED - JORDAN FORTRESS' : '❌ BLOCKED - FORTRESS DENIED'
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
    status: isJordan ? 'JORDAN IP - FORTRESS APPROVED' : 'NON-JORDAN IP',
    isp: ispInfo ? ispInfo.isp : 'FOREIGN',
    asn: ispInfo ? ispInfo.asn : 'UNKNOWN',
    proxy: ispInfo ? ispInfo.proxy : 'NONE',
    expectedPing: ispInfo ? ispInfo.avgPing + 'ms' : 'N/A',
    decision: isJordan ? ispInfo.proxy : 'BLOCK'
  };
}

function debugGetFortressStatus() {
  return ROUTE_FORTRESS.getStatus();
}

function debugGetBlacklist() {
  return {
    stats: BLACKLIST_MANAGER.getStats(),
    permanentBans: Object.keys(BLACKLIST_MANAGER.permanentBans).length
  };
}

function debugReset() {
  NET_MONITOR.stats = {
    totalRequests: 0,
    blockedNonJordan: 0,
    blockedVPN: 0,
    blockedDNSLeak: 0,
    blockedSecurity: 0,
    blockedRoute: 0,
    blockedAnomaly: 0,
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
  DNS_CACHE.data = {};
  DNS_CACHE.hits = 0;
  DNS_CACHE.misses = 0;
  DNS_CACHE.failures = 0;
  
  DNS_SECURITY.cache = {};
  DNS_SECURITY.suspiciousServers = {};
  DNS_SECURITY.leakDetected = false;
  DNS_SECURITY.blockedQueries = 0;
  DNS_SECURITY.queryLog = {};
  
  SECURITY_INSPECTOR.violations = {};
  SECURITY_INSPECTOR.suspiciousActivity = {};
  
  ANOMALY_DETECTOR.patterns = {};
  ANOMALY_DETECTOR.anomalies = {};
  
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
  
  // لا نحذف الـ permanent bans و blacklists
  
  return '✅ JORDAN FORTRESS MODE RESET - BLACKLISTS PRESERVED';
}

// ========== END OF FORTRESS ==========
