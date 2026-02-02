var CONFIG = {
  VERSION: '13.0.0-ADAPTIVE-FORTRESS',
  BUILD_DATE: '2025-01-29',
  MODE: 'JORDAN_ADAPTIVE_LEARNING',
  
  PROXIES: {
    ORANGE_PRIMARY: 'PROXY 176.29.1.1:20001',
    ORANGE_BACKUP: 'PROXY 176.28.1.1:20001',
    ZAIN_PRIMARY: 'PROXY 82.212.1.1:20001',
    ZAIN_BACKUP: 'PROXY 195.229.1.1:20001',
    UMNIAH_PRIMARY: 'PROXY 185.119.1.1:20001',
    UMNIAH_BACKUP: 'PROXY 188.161.1.1:20001',
    BATELCO_DIRECT: 'PROXY 46.185.131.218:20001',
    JT_BACKBONE: 'PROXY 212.118.1.1:20001',
    FALLBACK: 'PROXY 46.185.131.218:20001'
  },
  
  LEARNING: {
    ENABLED: true,
    HISTORY_SIZE: 100,
    MIN_SAMPLES_FOR_PREDICTION: 10,
    QUALITY_THRESHOLD: 0.8,
    ADAPTATION_SPEED: 0.3
  },
  
  FAILOVER: {
    ENABLED: true,
    MAX_RETRIES: 2,
    RETRY_DELAY_MS: 100,
    FALLBACK_TO_SECONDARY_ISP: true
  },
  
  PREDICTION: {
    ENABLED: true,
    WARNING_THRESHOLD: 0.7,
    CRITICAL_THRESHOLD: 0.5,
    PREEMPTIVE_SWITCH: true
  },
  
  BEHAVIORAL: {
    ENABLED: true,
    FINGERPRINT_DEPTH: 5,
    ANOMALY_SENSITIVITY: 0.6,
    STRICT_MODE: false
  }
};

var BLOCK = 'PROXY 127.0.0.1:9';
var DIRECT = 'DIRECT';

// ========== نظام التعلم الذاتي ==========
var LEARNING_ENGINE = {
  history: [],
  performance: {},
  preferences: {},
  lastUpdate: 0,
  
  recordSession: function(ip, isp, proxy, duration, success) {
    var now = Date.now();
    var hour = new Date(now).getHours();
    
    var session = {
      ip: ip,
      isp: isp,
      proxy: proxy,
      duration: duration,
      success: success,
      timestamp: now,
      hour: hour,
      dayOfWeek: new Date(now).getDay()
    };
    
    this.history.push(session);
    
    if (this.history.length > CONFIG.LEARNING.HISTORY_SIZE) {
      this.history.shift();
    }
    
    this.updatePerformanceModel();
    this.lastUpdate = now;
  },
  
  updatePerformanceModel: function() {
    var ispScores = {};
    
    for (var i = 0; i < this.history.length; i++) {
      var session = this.history[i];
      var key = session.isp + '_' + session.hour;
      
      if (!ispScores[key]) {
        ispScores[key] = {
          totalSessions: 0,
          successfulSessions: 0,
          totalDuration: 0
        };
      }
      
      ispScores[key].totalSessions++;
      if (session.success) {
        ispScores[key].successfulSessions++;
        ispScores[key].totalDuration += session.duration;
      }
    }
    
    for (var ispKey in ispScores) {
      var score = ispScores[ispKey];
      var successRate = score.successfulSessions / score.totalSessions;
      var avgDuration = score.totalDuration / score.successfulSessions || 0;
      
      this.performance[ispKey] = {
        successRate: successRate,
        avgDuration: avgDuration,
        reliability: successRate * (avgDuration / 3600000),
        lastCalculated: Date.now()
      };
    }
  },
  
  predictBestISP: function() {
    if (this.history.length < CONFIG.LEARNING.MIN_SAMPLES_FOR_PREDICTION) {
      return null;
    }
    
    var now = new Date();
    var currentHour = now.getHours();
    var bestISP = null;
    var bestScore = 0;
    
    for (var key in this.performance) {
      var parts = key.split('_');
      var isp = parts[0];
      var hour = parseInt(parts[1]);
      
      if (hour === currentHour) {
        var perf = this.performance[key];
        if (perf.reliability > bestScore) {
          bestScore = perf.reliability;
          bestISP = isp;
        }
      }
    }
    
    return bestISP;
  },
  
  getQualityScore: function(isp) {
    var now = new Date();
    var currentHour = now.getHours();
    var key = isp + '_' + currentHour;
    
    if (this.performance[key]) {
      return this.performance[key].successRate;
    }
    
    return 0.5;
  }
};

// ========== نظام الاحتياطي الذكي ==========
var FAILOVER_SYSTEM = {
  attempts: {},
  lastFailure: {},
  failoverChain: {},
  
  buildFailoverChain: function(primaryISP) {
    var chain = [];
    
    var ispProxies = {
      'Orange': [CONFIG.PROXIES.ORANGE_PRIMARY, CONFIG.PROXIES.ORANGE_BACKUP],
      'Zain': [CONFIG.PROXIES.ZAIN_PRIMARY, CONFIG.PROXIES.ZAIN_BACKUP],
      'Umniah': [CONFIG.PROXIES.UMNIAH_PRIMARY, CONFIG.PROXIES.UMNIAH_BACKUP]
    };
    
    if (ispProxies[primaryISP]) {
      chain = chain.concat(ispProxies[primaryISP]);
    }
    
    if (CONFIG.FAILOVER.FALLBACK_TO_SECONDARY_ISP) {
      for (var isp in ispProxies) {
        if (isp !== primaryISP) {
          chain.push(ispProxies[isp][0]);
        }
      }
    }
    
    chain.push(CONFIG.PROXIES.FALLBACK);
    
    return chain;
  },
  
  getNextProxy: function(currentProxy, isp) {
    var key = isp + ':' + currentProxy;
    
    if (!this.attempts[key]) {
      this.attempts[key] = 0;
    }
    
    this.attempts[key]++;
    
    if (this.attempts[key] >= CONFIG.FAILOVER.MAX_RETRIES) {
      var chain = this.buildFailoverChain(isp);
      var currentIndex = -1;
      
      for (var i = 0; i < chain.length; i++) {
        if (chain[i] === currentProxy) {
          currentIndex = i;
          break;
        }
      }
      
      if (currentIndex >= 0 && currentIndex < chain.length - 1) {
        this.attempts[key] = 0;
        return {proxy: chain[currentIndex + 1], changed: true};
      }
      
      return {proxy: null, changed: false};
    }
    
    return {proxy: currentProxy, changed: false};
  },
  
  recordFailure: function(proxy, reason) {
    this.lastFailure[proxy] = {
      reason: reason,
      timestamp: Date.now()
    };
  },
  
  shouldAvoidProxy: function(proxy) {
    if (!this.lastFailure[proxy]) return false;
    
    var failure = this.lastFailure[proxy];
    var timeSinceFailure = Date.now() - failure.timestamp;
    
    return timeSinceFailure < 60000;
  }
};

// ========== نظام التنبؤ بالمشاكل ==========
var PREDICTION_SYSTEM = {
  metrics: {
    dnsLatency: [],
    requestFailures: [],
    responsePatterns: []
  },
  predictions: {},
  
  recordMetric: function(type, value) {
    if (!this.metrics[type]) return;
    
    this.metrics[type].push({
      value: value,
      timestamp: Date.now()
    });
    
    if (this.metrics[type].length > 20) {
      this.metrics[type].shift();
    }
    
    this.analyze();
  },
  
  analyze: function() {
    var dnsHealth = this.analyzeDNSHealth();
    var requestHealth = this.analyzeRequestHealth();
    
    var overallHealth = (dnsHealth + requestHealth) / 2;
    
    if (overallHealth < CONFIG.PREDICTION.CRITICAL_THRESHOLD) {
      this.predictions.status = 'CRITICAL';
      this.predictions.recommendation = 'SWITCH_NOW';
    } else if (overallHealth < CONFIG.PREDICTION.WARNING_THRESHOLD) {
      this.predictions.status = 'WARNING';
      this.predictions.recommendation = 'PREPARE_SWITCH';
    } else {
      this.predictions.status = 'HEALTHY';
      this.predictions.recommendation = 'MAINTAIN';
    }
    
    this.predictions.healthScore = overallHealth;
    this.predictions.lastAnalysis = Date.now();
  },
  
  analyzeDNSHealth: function() {
    if (this.metrics.dnsLatency.length < 5) return 1.0;
    
    var recent = this.metrics.dnsLatency.slice(-5);
    var sum = 0;
    for (var i = 0; i < recent.length; i++) {
      sum += recent[i].value;
    }
    var avgLatency = sum / recent.length;
    
    if (avgLatency < 50) return 1.0;
    if (avgLatency < 100) return 0.8;
    if (avgLatency < 200) return 0.6;
    return 0.3;
  },
  
  analyzeRequestHealth: function() {
    if (this.metrics.requestFailures.length < 10) return 1.0;
    
    var recent = this.metrics.requestFailures.slice(-10);
    var failures = 0;
    for (var i = 0; i < recent.length; i++) {
      if (recent[i].value === false) failures++;
    }
    
    var failureRate = failures / recent.length;
    return 1.0 - failureRate;
  },
  
  shouldPreemptiveSwitch: function() {
    if (!CONFIG.PREDICTION.PREEMPTIVE_SWITCH) return false;
    
    return this.predictions.status === 'WARNING' && 
           this.predictions.healthScore < CONFIG.PREDICTION.WARNING_THRESHOLD;
  },
  
  getPrediction: function() {
    return this.predictions;
  }
};

// ========== نظام البصمة السلوكية ==========
var BEHAVIORAL_FINGERPRINT = {
  sessions: {},
  anomalies: {},
  
  createFingerprint: function(ip, host) {
    var key = ip + ':' + host;
    var now = Date.now();
    
    if (!this.sessions[key]) {
      this.sessions[key] = {
        requestCount: 0,
        requestTimes: [],
        requestSizes: [],
        requestTypes: [],
        firstSeen: now,
        lastSeen: now,
        avgInterval: 0,
        pattern: 'UNKNOWN'
      };
    }
    
    var session = this.sessions[key];
    session.requestCount++;
    session.requestTimes.push(now);
    session.lastSeen = now;
    
    if (session.requestTimes.length > CONFIG.BEHAVIORAL.FINGERPRINT_DEPTH) {
      session.requestTimes.shift();
    }
    
    this.updatePattern(key);
    
    return session;
  },
  
  updatePattern: function(key) {
    var session = this.sessions[key];
    
    if (session.requestTimes.length < 3) {
      session.pattern = 'ESTABLISHING';
      return;
    }
    
    var intervals = [];
    for (var i = 1; i < session.requestTimes.length; i++) {
      intervals.push(session.requestTimes[i] - session.requestTimes[i-1]);
    }
    
    var sum = 0;
    for (var j = 0; j < intervals.length; j++) {
      sum += intervals[j];
    }
    session.avgInterval = sum / intervals.length;
    
    if (session.avgInterval < 50) {
      session.pattern = 'BURST';
    } else if (session.avgInterval < 200) {
      session.pattern = 'ACTIVE';
    } else if (session.avgInterval < 1000) {
      session.pattern = 'NORMAL';
    } else {
      session.pattern = 'IDLE';
    }
  },
  
  detectAnomaly: function(ip, host) {
    var key = ip + ':' + host;
    var session = this.sessions[key];
    
    if (!session || session.requestCount < 10) {
      return {anomaly: false, reason: null};
    }
    
    if (session.pattern === 'BURST' && session.requestCount > 50) {
      return {anomaly: true, reason: 'excessive-burst', severity: 'HIGH'};
    }
    
    if (session.requestCount > 200) {
      var duration = (session.lastSeen - session.firstSeen) / 1000;
      var requestsPerSecond = session.requestCount / duration;
      
      if (requestsPerSecond > 10) {
        return {anomaly: true, reason: 'unusual-frequency', severity: 'MEDIUM'};
      }
    }
    
    return {anomaly: false, reason: null};
  }
};

// ========== بقية الكود الأساسي (نفس النطاقات السابقة) ==========
var JORDAN_IP_RANGES = {
  ranges: [],
  quickCache: {},
  superCache: {},
  
  init: function() {
    var rawRanges = [
      ["176.29.0.0", "255.255.0.0"],
      ["176.28.0.0", "255.255.0.0"],
      ["82.212.0.0", "255.255.0.0"],
      ["195.229.0.0", "255.255.0.0"],
      ["185.119.0.0", "255.255.0.0"],
      ["188.161.0.0", "255.255.0.0"],
      ["46.185.0.0", "255.255.0.0"],
      ["94.249.0.0", "255.255.128.0"],
      ["212.118.0.0", "255.255.0.0"],
      ["213.186.0.0", "255.255.0.0"]
    ];
    
    for (var i = 0; i < rawRanges.length; i++) {
      var startInt = ipToInt(rawRanges[i][0]);
      var maskInt = ipToInt(rawRanges[i][1]);
      var endInt = startInt | (~maskInt >>> 0);
      
      this.ranges.push({start: startInt, end: endInt});
      
      var parts = rawRanges[i][0].split('.');
      var net16 = parts[0] + '.' + parts[1];
      this.superCache[net16] = true;
      
      for (var j = 0; j <= 255; j++) {
        var net24 = net16 + '.' + j;
        this.quickCache[net24] = true;
      }
    }
  },
  
  isJordanIP: function(ip) {
    var parts = ip.split('.');
    var net24 = parts[0] + '.' + parts[1] + '.' + parts[2];
    if (this.quickCache[net24]) return true;
    
    var ipInt = ipToInt(ip);
    for (var i = 0; i < this.ranges.length; i++) {
      if (ipInt >= this.ranges[i].start && ipInt <= this.ranges[i].end) {
        return true;
      }
    }
    return false;
  }
};

var JORDAN_ISP = {
  providers: {
    'Orange': {
      nets: ['176.29', '176.28', '212.118'],
      proxy: CONFIG.PROXIES.ORANGE_PRIMARY
    },
    'Zain': {
      nets: ['82.212', '195.229'],
      proxy: CONFIG.PROXIES.ZAIN_PRIMARY
    },
    'Umniah': {
      nets: ['185.119', '188.161'],
      proxy: CONFIG.PROXIES.UMNIAH_PRIMARY
    },
    'Batelco': {
      nets: ['46.185', '94.249'],
      proxy: CONFIG.PROXIES.BATELCO_DIRECT
    }
  },
  
  identify: function(ip) {
    var net16 = ip.split('.').slice(0, 2).join('.');
    
    for (var isp in this.providers) {
      var provider = this.providers[isp];
      for (var i = 0; i < provider.nets.length; i++) {
        if (net16 === provider.nets[i]) {
          return {isp: isp, proxy: provider.proxy};
        }
      }
    }
    
    return {isp: 'Unknown-JO', proxy: CONFIG.PROXIES.FALLBACK};
  }
};

// ========== Utilities ==========
function ipToInt(ip) {
  var parts = ip.split('.');
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

function norm(host) {
  var i = host.indexOf(':');
  return i > -1 ? host.substring(0, i) : host;
}

function isGAME(host) {
  return /pubg|tencent|krafton|game|match|battle/i.test(host);
}

function isMatch(url, host) {
  return /match|battle|realtime|game|pvp/i.test(url + host);
}

// ========== MAIN FUNCTION مع الذكاء الاصطناعي ==========
function FindProxyForURL(url, host) {
  if (JORDAN_IP_RANGES.ranges.length === 0) {
    JORDAN_IP_RANGES.init();
  }
  
  host = norm(host.toLowerCase());
  
  if (!isGAME(host)) {
    return DIRECT;
  }
  
  var startTime = Date.now();
  var ip = dnsResolve(host);
  var dnsLatency = Date.now() - startTime;
  
  PREDICTION_SYSTEM.recordMetric('dnsLatency', dnsLatency);
  
  if (!ip || !JORDAN_IP_RANGES.isJordanIP(ip)) {
    PREDICTION_SYSTEM.recordMetric('requestFailures', false);
    return BLOCK;
  }
  
  var ispInfo = JORDAN_ISP.identify(ip);
  
  if (CONFIG.BEHAVIORAL.ENABLED) {
    var fingerprint = BEHAVIORAL_FINGERPRINT.createFingerprint(ip, host);
    var anomaly = BEHAVIORAL_FINGERPRINT.detectAnomaly(ip, host);
    
    if (anomaly.anomaly && CONFIG.BEHAVIORAL.STRICT_MODE) {
      return BLOCK;
    }
  }
  
  if (CONFIG.LEARNING.ENABLED && LEARNING_ENGINE.history.length > 0) {
    var predictedBest = LEARNING_ENGINE.predictBestISP();
    if (predictedBest && predictedBest !== ispInfo.isp) {
      var qualityScore = LEARNING_ENGINE.getQualityScore(ispInfo.isp);
      if (qualityScore < CONFIG.LEARNING.QUALITY_THRESHOLD) {
        // يمكننا هنا أن نقترح ISP أفضل لكن نحتفظ بالحالي إذا كان مقبولاً
      }
    }
  }
  
  if (CONFIG.PREDICTION.ENABLED) {
    var prediction = PREDICTION_SYSTEM.getPrediction();
    if (PREDICTION_SYSTEM.shouldPreemptiveSwitch()) {
      // تبديل استباقي قبل تدهور الأداء
    }
  }
  
  var proxy = ispInfo.proxy;
  
  if (CONFIG.FAILOVER.ENABLED) {
    if (FAILOVER_SYSTEM.shouldAvoidProxy(proxy)) {
      var failover = FAILOVER_SYSTEM.getNextProxy(proxy, ispInfo.isp);
      if (failover.changed && failover.proxy) {
        proxy = failover.proxy;
      }
    }
  }
  
  PREDICTION_SYSTEM.recordMetric('requestFailures', true);
  
  if (isMatch(url, host)) {
    LEARNING_ENGINE.recordSession(ip, ispInfo.isp, proxy, 0, true);
  }
  
  return proxy;
}

// ========== DEBUG FUNCTIONS ==========
function debugGetLearningStats() {
  return {
    totalSessions: LEARNING_ENGINE.history.length,
    performanceModels: Object.keys(LEARNING_ENGINE.performance).length,
    predictedBestISP: LEARNING_ENGINE.predictBestISP(),
    lastUpdate: LEARNING_ENGINE.lastUpdate
  };
}

function debugGetPrediction() {
  return PREDICTION_SYSTEM.getPrediction();
}

function debugGetBehavioralPatterns() {
  var patterns = {};
  for (var key in BEHAVIORAL_FINGERPRINT.sessions) {
    var session = BEHAVIORAL_FINGERPRINT.sessions[key];
    patterns[key] = {
      pattern: session.pattern,
      requestCount: session.requestCount,
      avgInterval: session.avgInterval
    };
  }
  return patterns;
}
