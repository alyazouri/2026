// ==========================================
// 🇯🇴 ADVANCED PUBG PAC - NATION-STATE GRADE
// Author: Cyber warfare inspired
// ==========================================

// ============ INFRASTRUCTURE TIERS ============
var TIER = {
  MATCH_PREMIUM: [
    "PROXY 46.185.131.218:20001",  // Primary - Orange Backbone
    "PROXY 213.6.50.100:20001"     // Fiber backup
  ],
  MATCH_STANDARD: [
    "PROXY 46.185.131.218:443",
    "PROXY 176.29.10.50:443"
  ],
  LOBBY_HA: [  // High Availability Pool
    "PROXY 212.35.66.45:8085",
    "PROXY 212.35.66.45:8181",
    "PROXY 46.185.131.218:443",
    "PROXY 176.28.200.10:8080"
  ],
  SOCIAL_POOL: [
    "PROXY 176.29.15.20:3128",
    "PROXY 185.4.16.50:3128"
  ]
};

var DIRECT = "DIRECT";
var BLACKHOLE = "PROXY 127.0.0.1:9";
var FALLBACK_CHAIN = TIER.MATCH_STANDARD.join("; ") + "; " + DIRECT;

// ============ JORDAN GEOLOCATION DATABASE ============
var JO_GEO = {
  // Tier 1: Premium ISPs (Fiber/Business)
  PREMIUM: [
    {range: ["213.6.0.0", "213.6.255.255"], isp: "Batelco", quality: 10, as: "AS8697"},
    {range: ["46.185.128.0", "46.185.255.255"], isp: "Orange-Fiber", quality: 9, as: "AS47887"},
    {range: ["176.28.128.0", "176.28.255.255"], isp: "Orange-Prime", quality: 9, as: "AS47887"},
    {range: ["82.212.64.0", "82.212.127.255"], isp: "Orange-Business", quality: 9, as: "AS47887"}
  ],
  
  // Tier 2: Consumer ISPs (Stable)
  STANDARD: [
    {range: ["176.29.0.0", "176.29.255.255"], isp: "Orange", quality: 8, as: "AS47887"},
    {range: ["37.202.64.0", "37.202.127.255"], isp: "Zain", quality: 8, as: "AS48832"},
    {range: ["185.4.16.0", "185.4.19.255"], isp: "Zain-LTE", quality: 7, as: "AS48832"},
    {range: ["31.44.0.0", "31.44.255.255"], isp: "Umniah", quality: 7, as: "AS50670"},
    {range: ["94.249.0.0", "94.249.127.255"], isp: "Umniah-Corp", quality: 8, as: "AS50670"}
  ],
  
  // Tier 3: Secondary/Regional
  BRONZE: [
    {range: ["5.45.128.0", "5.45.143.255"], isp: "Regional-1", quality: 6},
    {range: ["37.123.64.0", "37.123.95.255"], isp: "Regional-2", quality: 6},
    {range: ["80.10.8.0", "80.10.79.255"], isp: "VDSL-Pool", quality: 5},
    {range: ["185.96.84.0", "185.96.87.255"], isp: "Wireless-ISP", quality: 5}
  ],
  
  // Complete Jordan Range (fallback)
  ALL: [
    ["2.59.52.0", "2.59.55.255"],
    ["5.45.128.0", "5.45.143.255"],
    ["5.198.240.0", "5.198.247.255"],
    ["31.44.0.0", "31.44.255.255"],
    ["37.17.192.0", "37.17.207.255"],
    ["37.123.64.0", "37.123.95.255"],
    ["37.152.0.0", "37.152.7.255"],
    ["37.202.64.0", "37.202.127.255"],
    ["37.220.112.0", "37.220.127.255"],
    ["46.23.112.0", "46.23.127.255"],
    ["46.32.96.0", "46.32.127.255"],
    ["46.185.128.0", "46.185.255.255"],
    ["46.248.192.0", "46.248.223.255"],
    ["62.72.160.0", "62.72.191.255"],
    ["77.245.0.0", "77.245.15.255"],
    ["79.134.128.0", "79.134.159.255"],
    ["80.10.8.0", "80.10.79.255"],
    ["80.10.144.0", "80.10.175.255"],
    ["80.90.160.0", "80.90.175.255"],
    ["81.21.0.0", "81.21.15.255"],
    ["81.28.112.0", "81.28.127.255"],
    ["81.52.144.0", "81.52.231.255"],
    ["81.253.96.0", "81.253.255.255"],
    ["82.212.64.0", "82.212.127.255"],
    ["94.249.0.0", "94.249.127.255"],
    ["176.28.128.0", "176.28.255.255"],
    ["176.29.0.0", "176.29.255.255"],
    ["185.4.16.0", "185.4.19.255"],
    ["185.12.72.0", "185.12.75.255"],
    ["185.20.200.0", "185.20.203.255"],
    ["185.24.84.0", "185.24.87.255"],
    ["185.33.24.0", "185.33.27.255"],
    ["185.40.188.0", "185.40.191.255"],
    ["185.51.200.0", "185.51.203.255"],
    ["185.61.136.0", "185.61.139.255"],
    ["185.96.84.0", "185.96.87.255"],
    ["185.118.4.0", "185.118.7.255"],
    ["185.137.248.0", "185.137.251.255"],
    ["185.152.68.0", "185.152.71.255"],
    ["185.180.28.0", "185.180.31.255"],
    ["185.194.124.0", "185.194.127.255"],
    ["213.6.0.0", "213.6.255.255"]
  ]
};

// ============ THREAT INTELLIGENCE BLACKLIST ============
var THREAT_DB = {
  // Nation-state level blocking
  HOSTILE_AS: [
    // China ASNs (aggressive blocking)
    "AS4134", "AS4837", "AS4808", "AS4809", "AS9929", "AS58453",
    // Russia ASNs
    "AS12389", "AS8359", "AS8369", "AS8402", "AS12668", "AS31133",
    // Iran ASNs
    "AS43754", "AS44244", "AS197207", "AS58224"
  ],
  
  // Geographic IP blocks (optimized for speed)
  CIDR_BLOCKS: [
    // China (Full Block - Class A)
    ["1.0.0.0", "1.255.255.255"],
    ["14.0.0.0", "14.255.255.255"],
    ["27.0.0.0", "27.255.255.255"],
    ["36.0.0.0", "36.255.255.255"],
    ["39.0.0.0", "39.255.255.255"],
    ["42.0.0.0", "42.255.255.255"],
    ["49.0.0.0", "49.255.255.255"],
    ["58.0.0.0", "58.255.255.255"],
    ["59.0.0.0", "59.255.255.255"],
    ["60.0.0.0", "60.255.255.255"],
    ["61.0.0.0", "61.255.255.255"],
    ["101.0.0.0", "101.255.255.255"],
    ["106.0.0.0", "106.255.255.255"],
    ["110.0.0.0", "125.255.255.255"],  // Mega block
    ["180.0.0.0", "180.255.255.255"],
    ["183.0.0.0", "183.255.255.255"],
    ["202.0.0.0", "202.255.255.255"],
    ["210.0.0.0", "210.255.255.255"],
    ["218.0.0.0", "218.255.255.255"],
    ["219.0.0.0", "219.255.255.255"],
    ["220.0.0.0", "223.255.255.255"],  // Mega block
    
    // Russia (Full Block)
    ["5.0.0.0", "5.255.255.255"],
    ["31.0.0.0", "31.127.255.255"],
    ["37.0.0.0", "37.127.255.255"],
    ["46.0.0.0", "46.127.255.255"],
    ["77.0.0.0", "77.127.255.255"],
    ["78.0.0.0", "78.255.255.255"],
    ["79.0.0.0", "79.127.255.255"],
    ["80.0.0.0", "80.127.255.255"],
    ["81.0.0.0", "81.127.255.255"],
    ["82.0.0.0", "82.127.255.255"],
    ["83.0.0.0", "83.255.255.255"],
    ["84.0.0.0", "84.255.255.255"],
    ["85.0.0.0", "85.255.255.255"],
    ["86.0.0.0", "86.255.255.255"],
    ["87.0.0.0", "87.255.255.255"],
    ["88.0.0.0", "88.255.255.255"],
    ["89.0.0.0", "89.255.255.255"],
    ["90.0.0.0", "90.255.255.255"],
    ["91.0.0.0", "91.255.255.255"],
    ["92.0.0.0", "92.255.255.255"],
    ["93.0.0.0", "93.255.255.255"],
    ["94.0.0.0", "94.127.255.255"],
    ["95.0.0.0", "95.255.255.255"],
    ["109.0.0.0", "109.255.255.255"],
    ["176.0.0.0", "176.127.255.255"],
    ["178.0.0.0", "178.255.255.255"],
    ["188.0.0.0", "188.255.255.255"],
    ["213.0.0.0", "213.5.255.255"],
    
    // Europe (Western)
    ["51.0.0.0", "51.255.255.255"],
    ["62.0.0.0", "62.127.255.255"],
    ["185.0.0.0", "185.3.255.255"],
    
    // India
    ["103.0.0.0", "103.255.255.255"],
    ["182.0.0.0", "182.255.255.255"],
    
    // Southeast Asia
    ["100.0.0.0", "100.255.255.255"],
    ["102.0.0.0", "102.255.255.255"],
    ["104.0.0.0", "105.255.255.255"],
    
    // South America
    ["177.0.0.0", "177.255.255.255"],
    ["179.0.0.0", "179.255.255.255"],
    ["181.0.0.0", "181.255.255.255"],
    ["186.0.0.0", "191.255.255.255"],  // Mega block
    ["200.0.0.0", "201.255.255.255"],
    
    // Africa (except North)
    ["41.0.0.0", "41.255.255.255"],
    ["102.0.0.0", "102.255.255.255"],
    ["105.0.0.0", "105.255.255.255"],
    ["154.0.0.0", "154.255.255.255"],
    ["196.0.0.0", "196.255.255.255"],
    ["197.0.0.0", "197.255.255.255"]
  ]
};

// ============ SESSION STATE ENGINE ============
var SESSION = {
  // Match clustering
  clusters: {},           // {clusterId: {members: [], quality: N, timestamp: T}}
  clusterCount: 0,
  
  // Performance tracking
  connections: {},        // {host: {proxy: "", hits: N, lastSeen: T}}
  proxyHealth: {},        // {proxyAddr: {latency: N, failures: N, score: N}}
  
  // DNS & Routing
  dnsCache: {},
  routingTable: {},       // {ipPrefix: proxyAddr}
  
  // Adaptive parameters
  matchThreshold: 8,      // Min quality score for match
  maxClusters: 8,         // Max concurrent match sessions
  
  // Timing
  startTime: Date.now(),
  lastCleanup: Date.now()
};

// ============ UTILITY FUNCTIONS ============
function norm(h) {
  var i = h.indexOf(":");
  return i > -1 ? h.substring(0, i) : h;
}

function ipToLong(ip) {
  var parts = ip.split('.');
  return ((+parts[0] << 24) + (+parts[1] << 16) + (+parts[2] << 8) + (+parts[3])) >>> 0;
}

function isInRange(ip, range) {
  var ipLong = ipToLong(ip);
  var startLong = ipToLong(range[0]);
  var endLong = ipToLong(range[1]);
  return ipLong >= startLong && ipLong <= endLong;
}

function isInList(ip, list) {
  for (var i = 0; i < list.length; i++) {
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  }
  return false;
}

function resolveWithCache(host) {
  // Aggressive caching to reduce DNS lookups
  if (SESSION.dnsCache[host]) {
    var entry = SESSION.dnsCache[host];
    if (Date.now() - entry.time < 300000) return entry.ip;  // 5min TTL
  }
  
  var ip = dnsResolve(host);
  if (ip && ip.indexOf(":") === -1) {
    SESSION.dnsCache[host] = {ip: ip, time: Date.now()};
    return ip;
  }
  return null;
}

// ============ GEOLOCATION ENGINE ============
function getGeoProfile(ip) {
  // Check Premium tier
  for (var i = 0; i < JO_GEO.PREMIUM.length; i++) {
    var entry = JO_GEO.PREMIUM[i];
    if (isInRange(ip, entry.range)) {
      return {
        tier: "PREMIUM",
        isp: entry.isp,
        quality: entry.quality,
        as: entry.as || "UNKNOWN",
        trusted: true
      };
    }
  }
  
  // Check Standard tier
  for (var i = 0; i < JO_GEO.STANDARD.length; i++) {
    var entry = JO_GEO.STANDARD[i];
    if (isInRange(ip, entry.range)) {
      return {
        tier: "STANDARD",
        isp: entry.isp,
        quality: entry.quality,
        as: entry.as || "UNKNOWN",
        trusted: true
      };
    }
  }
  
  // Check Bronze tier
  for (var i = 0; i < JO_GEO.BRONZE.length; i++) {
    var entry = JO_GEO.BRONZE[i];
    if (isInRange(ip, entry.range)) {
      return {
        tier: "BRONZE",
        isp: entry.isp,
        quality: entry.quality,
        as: "UNKNOWN",
        trusted: true
      };
    }
  }
  
  // Check complete Jordan range
  if (isInList(ip, JO_GEO.ALL)) {
    return {
      tier: "UNCLASSIFIED",
      isp: "JO-Generic",
      quality: 4,
      as: "UNKNOWN",
      trusted: true
    };
  }
  
  return {
    tier: "FOREIGN",
    isp: "NON-JO",
    quality: 0,
    as: "UNKNOWN",
    trusted: false
  };
}

// ============ NETWORK CLUSTERING ENGINE ============
function getNetworkFingerprint(ip) {
  // Create unique fingerprint for clustering
  var parts = ip.split('.');
  return {
    prefix16: parts[0] + "." + parts[1],           // /16 network
    prefix20: parts[0] + "." + parts[1] + "." + (Math.floor(parts[2]/16)*16),  // /20
    prefix24: parts[0] + "." + parts[1] + "." + parts[2]   // /24
  };
}

function findOrCreateCluster(profile, fingerprint) {
  // Try to find existing compatible cluster
  for (var clusterId in SESSION.clusters) {
    var cluster = SESSION.clusters[clusterId];
    
    // Cluster compatibility rules
    var tierMatch = cluster.tier === profile.tier;
    var qualityDiff = Math.abs(cluster.avgQuality - profile.quality);
    var samePrefix20 = false;
    
    for (var i = 0; i < cluster.members.length; i++) {
      if (cluster.members[i].prefix20 === fingerprint.prefix20) {
        samePrefix20 = true;
        break;
      }
    }
    
    // Join cluster if compatible
    if (tierMatch && qualityDiff <= 2 && (samePrefix20 || cluster.members.length < 10)) {
      return clusterId;
    }
  }
  
  // Create new cluster
  if (SESSION.clusterCount < SESSION.maxClusters) {
    var newId = "cluster_" + SESSION.clusterCount++;
    SESSION.clusters[newId] = {
      tier: profile.tier,
      avgQuality: profile.quality,
      members: [],
      created: Date.now()
    };
    return newId;
  }
  
  return null;
}

function addToCluster(clusterId, profile, fingerprint) {
  if (!SESSION.clusters[clusterId]) return false;
  
  var cluster = SESSION.clusters[clusterId];
  cluster.members.push({
    isp: profile.isp,
    quality: profile.quality,
    prefix20: fingerprint.prefix20,
    prefix24: fingerprint.prefix24,
    timestamp: Date.now()
  });
  
  // Recalculate avg quality
  var totalQuality = 0;
  for (var i = 0; i < cluster.members.length; i++) {
    totalQuality += cluster.members[i].quality;
  }
  cluster.avgQuality = totalQuality / cluster.members.length;
  
  return true;
}

// ============ ADAPTIVE PROXY SELECTION ============
function selectMatchProxy(profile, clusterId) {
  // Premium tier gets premium proxies
  if (profile.tier === "PREMIUM") {
    return TIER.MATCH_PREMIUM[0] + "; " + TIER.MATCH_PREMIUM[1];
  }
  
  // Standard tier
  if (profile.tier === "STANDARD") {
    var cluster = SESSION.clusters[clusterId];
    if (cluster && cluster.avgQuality >= 7) {
      return TIER.MATCH_PREMIUM[0] + "; " + TIER.MATCH_STANDARD[0];
    }
    return TIER.MATCH_STANDARD[0] + "; " + TIER.MATCH_STANDARD[1];
  }
  
  // Bronze/Unclassified
  return TIER.MATCH_STANDARD.join("; ");
}

function selectLobbyProxy(host, profile) {
  // Consistent hashing with quality awareness
  var hash = 0;
  for (var i = 0; i < host.length; i++) {
    hash = ((hash << 5) - hash) + host.charCodeAt(i);
  }
  hash = Math.abs(hash);
  
  // Premium gets first 2 proxies
  if (profile.tier === "PREMIUM") {
    return TIER.LOBBY_HA[hash % 2];
  }
  
  // Others distributed across all
  return TIER.LOBBY_HA[hash % TIER.LOBBY_HA.length];
}

function selectSocialProxy(profile) {
  if (profile.tier === "PREMIUM") {
    return TIER.SOCIAL_POOL[0];
  }
  return TIER.SOCIAL_POOL[1];
}

// ============ TRAFFIC CLASSIFICATION ============
function classifyTraffic(url, host) {
  var u = url.toLowerCase();
  var h = host.toLowerCase();
  
  // Match/Game Server Detection (high confidence)
  if (/match|battle|game-?server|combat|arena|pvp|versus|realtime|sync|live|active|session|instance/i.test(u + h)) {
    return "MATCH";
  }
  
  // UDP/Game protocols
  if (/udp|quic|dtls|stun|turn|webrtc|kcp|udt/i.test(u + h)) {
    return "MATCH";
  }
  
  // Lobby/Matchmaking
  if (/lobby|matchmak|queue|dispatch|gateway|region|join|recruit|entrance|waiting|ready/i.test(u + h)) {
    return "LOBBY";
  }
  
  // Social/Friends
  if (/friend|invite|squad|team|party|clan|guild|social|chat|message|presence|roster/i.test(u + h)) {
    return "SOCIAL";
  }
  
  // Authentication
  if (/login|auth|account|passport|sso|oauth|token|signin|credential/i.test(u + h)) {
    return "AUTH";
  }
  
  // Voice chat
  if (/voice|audio|rtc|vox|speak|mic|sound/i.test(u + h)) {
    return "VOICE";
  }
  
  // Assets/CDN
  if (/cdn|asset|resource|patch|update|download|media|content|static|cache/i.test(u + h)) {
    return "CDN";
  }
  
  // Telemetry/Analytics
  if (/telemetry|analytics|metrics|stats|tracking|log|report|beacon/i.test(u + h)) {
    return "TELEMETRY";
  }
  
  // Anti-cheat
  if (/anticheat|security|integrity|protection|guard|shield|verify/i.test(u + h)) {
    return "ANTICHEAT";
  }
  
  return "GENERIC";
}

// ============ MAIN ROUTING DECISION ENGINE ============
function FindProxyForURL(url, host) {
  
  host = norm(host.toLowerCase());
  
  // Fast path: Non-PUBG traffic
  if (!/pubg|pubgm|tencent|krafton|lightspeed|levelinfinite|intlgame|proximabeta|igamecj|qq\.com|anticheatexpert/i.test(host)) {
    return DIRECT;
  }
  
  // DNS Resolution with caching
  var ip = resolveWithCache(host);
  if (!ip) return BLACKHOLE;
  
  // ========================================
  // PHASE 1: THREAT INTELLIGENCE
  // ========================================
  
  // Check blacklist (optimized with early exit)
  if (isInList(ip, THREAT_DB.CIDR_BLOCKS)) {
    return BLACKHOLE;
  }
  
  // Get geolocation profile
  var profile = getGeoProfile(ip);
  
  // Non-Jordanian check
  if (!profile.trusted) {
    // Only allow CDN for non-JO IPs
    var trafficType = classifyTraffic(url, host);
    if (trafficType === "CDN" || trafficType === "TELEMETRY") {
      return DIRECT;
    }
    return BLACKHOLE;
  }
  
  // ========================================
  // PHASE 2: TRAFFIC CLASSIFICATION
  // ========================================
  
  var trafficType = classifyTraffic(url, host);
  var fingerprint = getNetworkFingerprint(ip);
  
  // ========================================
  // PHASE 3: ROUTING DECISION
  // ========================================
  
  switch(trafficType) {
    
    case "MATCH":
      // Quality gate
      if (profile.quality < SESSION.matchThreshold) {
        return BLACKHOLE;  // Quality too low
      }
      
      // Find or create cluster
      var clusterId = findOrCreateCluster(profile, fingerprint);
      if (!clusterId) {
        // Max clusters reached - try backup
        return TIER.MATCH_STANDARD[1] + "; " + BLACKHOLE;
      }
      
      // Add to cluster
      addToCluster(clusterId, profile, fingerprint);
      
      // Select optimal proxy
      return selectMatchProxy(profile, clusterId);
    
    case "LOBBY":
      // Sticky session per host
      if (!SESSION.connections[host]) {
        SESSION.connections[host] = {
          proxy: selectLobbyProxy(host, profile),
          hits: 0,
          lastSeen: Date.now()
        };
      }
      SESSION.connections[host].hits++;
      SESSION.connections[host].lastSeen = Date.now();
      return SESSION.connections[host].proxy;
    
    case "SOCIAL":
    case "VOICE":
      return selectSocialProxy(profile);
    
    case "AUTH":
      // Auth must go through primary
      return TIER.LOBBY_HA[0];
    
    case "CDN":
      // CDN can go direct for speed
      if (profile.tier === "PREMIUM") {
        return DIRECT;
      }
      return selectLobbyProxy(host, profile) + "; " + DIRECT;
    
    case "ANTICHEAT":
      // Anti-cheat should look normal
      return DIRECT;
    
    case "TELEMETRY":
      // Telemetry can be direct or blocked
      return DIRECT;
    
    case "GENERIC":
    default:
      // Generic PUBG traffic
      if (profile.quality >= 7) {
        return selectLobbyProxy(host, profile);
      }
      return TIER.LOBBY_HA[TIER.LOBBY_HA.length - 1];  // Lowest priority
  }
}

// ============ SESSION CLEANUP (Optional) ============
// Note: PAC files don't have timers, but this shows the logic
function cleanupSession() {
  var now = Date.now();
  
  // Cleanup old clusters (>10 min)
  for (var clusterId in SESSION.clusters) {
    var cluster = SESSION.clusters[clusterId];
    if (now - cluster.created > 600000) {
      delete SESSION.clusters[clusterId];
      SESSION.clusterCount--;
    }
  }
  
  // Cleanup old connections (>5 min)
  for (var host in SESSION.connections) {
    if (now - SESSION.connections[host].lastSeen > 300000) {
      delete SESSION.connections[host];
    }
  }
  
  SESSION.lastCleanup = now;
}
