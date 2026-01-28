// ==================================================
// ABSOLUTE JORDAN EXCLUSIVE V9
// FINAL ADVANCED JORDAN PATH VERIFICATION (PAC-SAFE)
// ==================================================

var BLOCK = 'PROXY 127.0.0.1:9';
var DIRECT = 'DIRECT';
var PROXY = 'PROXY 46.185.131.218:20001';

// ===================== MATCH / ARENA / WOW RANGES =====================
var MATCH_RANGES = [
  ["82.212.64.0","255.255.192.0"],   // Zain Core
  ["94.249.0.0","255.255.128.0"]     // Batelco Backbone
];

// ===================== LOBBY STRONG JORDAN ROUTES =====================
var LOBBY_RANGES = [
  ["176.29.0.0","255.255.0.0"],      // Orange Core
  ["82.212.64.0","255.255.192.0"],   // Zain Core
  ["94.249.0.0","255.255.128.0"],    // Batelco Backbone
  ["46.185.128.0","255.255.128.0"],  // Batelco Core
  ["86.108.0.0","255.255.128.0"],
  ["92.253.0.0","255.255.128.0"],
  ["149.200.128.0","255.255.128.0"],
  ["176.28.128.0","255.255.192.0"]
];

// ===================== NEGATIVE ROUTING INTELLIGENCE =====================
var BAD_HOST_HINTS = [
  'cloudflare','akamai','amazonaws','google','azure',
  'fastly','cdn','edge','anycast'
];

// ===================== UTILS =====================
function ipToInt(ip) {
  var p = ip.split('.');
  return ((p[0]<<24)|(p[1]<<16)|(p[2]<<8)|p[3])>>>0;
}

function isIPInRanges(ip, ranges) {
  var ipInt = ipToInt(ip);
  for (var i = 0; i < ranges.length; i++) {
    var start = ipToInt(ranges[i][0]);
    var mask  = ipToInt(ranges[i][1]);
    var end   = start | (~mask >>> 0);
    if (ipInt >= start && ipInt <= end) return true;
  }
  return false;
}

function hasBadRoutingHint(host) {
  host = host.toLowerCase();
  for (var i = 0; i < BAD_HOST_HINTS.length; i++) {
    if (host.indexOf(BAD_HOST_HINTS[i]) !== -1) return true;
  }
  return false;
}

// ===================== GAME DETECTION (FULL COVERAGE) =====================
function isGAME(host) {
  return /pubg|tencent|krafton|lightspeed|levelinfinite|arena|wow|blizzard|battle|activision|cod|warzone|epic|fortnite|riot|valorant|league|steam|dota|csgo|ea|origin|apex|battlefield|ubisoft|uplay|unity|unreal|gameserver|matchmaking/i.test(host);
}

function isMatch(url, host) {
  return /match|battle|combat|raid|instance|pvp|arena|wow|server|gameplay|realtime|udp|session|multiplayer/i.test(url + host);
}

function isLobby(url, host) {
  return /lobby|queue|matchmaking|friends|social|party|invite|recruit|guild|clan|chat|presence|dispatch|login|auth/i.test(url + host);
}

// ===================== SCORE ENGINE (PAC SAFE) =====================
function jordanScore(ip, host, isLobbyReq) {
  var score = 0;

  // Range validation
  if (isLobbyReq) {
    if (isIPInRanges(ip, LOBBY_RANGES)) score += 4;
  } else {
    if (isIPInRanges(ip, MATCH_RANGES)) score += 4;
  }

  // Hostname intelligence
  if (!hasBadRoutingHint(host)) score += 2;
  else score -= 6;

  // Heuristic: strong core prefixes
  if (/^176\.29\.|^82\.212\.|^94\.249\.|^46\.185\./.test(ip)) {
    score += 2;
  }

  return score;
}

// ===================== MAIN =====================
function FindProxyForURL(url, host) {

  host = host.toLowerCase();
  var ip = dnsResolve(host);
  if (!ip) return BLOCK;

  // Non-game traffic
  if (!isGAME(host)) {
    return DIRECT;
  }

  // ===== MATCH / ARENA / WOW =====
  if (isMatch(url, host)) {
    var scoreMatch = jordanScore(ip, host, false);
    if (scoreMatch >= 6) {
      return PROXY;
    }
    return BLOCK;
  }

  // ===== LOBBY / FRIENDS / RECRUIT =====
  if (isLobby(url, host)) {
    var scoreLobby = jordanScore(ip, host, true);
    if (scoreLobby >= 7) { // stricter
      return PROXY;
    }
    return BLOCK;
  }

  // Unknown game traffic
  return BLOCK;
}
