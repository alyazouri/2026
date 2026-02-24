// ==========================================================
// PUBG MOBILE — EXTREME COMPETITIVE LOCK v25 FINAL
// HARD /24 LOCK — FULL MODE COVERAGE — ZERO LEAK
// ==========================================================

var MATCH_PROXY = "PROXY 46.185.131.218:20001";
var LOBBY_PROXY = "PROXY 46.185.131.218:20002";

var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ===== SESSION HARD LOCK =====
var SESSION = {
  locked: false,
  ip: null,
  host: null
};

// ===== HELPERS =====
function norm(h){
  var i = h.indexOf(":");
  return i > -1 ? h.substring(0,i) : h;
}

function isIPv6(ip){
  return ip.indexOf(":") > -1;
}

// ===== FULL EXCLUSIONS =====
function isYouTube(h){
  return shExpMatch(h, "*.youtube.com") ||
         shExpMatch(h, "*.googlevideo.com") ||
         shExpMatch(h, "*.ytimg.com") ||
         shExpMatch(h, "*.youtube-nocookie.com") ||
         shExpMatch(h, "youtu.be");
}

function isGitHub(h){
  return shExpMatch(h, "github.com") ||
         shExpMatch(h, "*.github.com") ||
         shExpMatch(h, "*.githubusercontent.com") ||
         shExpMatch(h, "*.githubassets.com") ||
         shExpMatch(h, "raw.githubusercontent.com") ||
         shExpMatch(h, "api.github.com");
}

function isPUBG(h,u){
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite/i.test(h+u);
}

// ===== FULL MODE CLASSIFIER =====
var PRIORITY = {

  CRITICAL: /match|battle|classic|ranked|unranked|competitive|
  arena|tdm|teamdeathmatch|gungame|domination|assault|
  payload|metro|metroroyale|zombie|infection|
  evoground|ultimate|royale|wow|
  cheer|training|
  erangel|livik|miramar|sanhok|vikendi|karakin|nusa|rondo|
  fpp|tpp|squad|duo|solo|
  war|sniper|quickmatch|arcade|
  battlefield|clash|gunfight|
  dispatch|ingame|gaming|realtime/i,

  SECURITY: /anticheat|verify|shield|security|ban|compliance/i,

  LOBBY: /lobby|matchmaking|queue|login|auth|region|gateway|session|profile|inventory|store/i
};

function classify(url, host){
  var input = url + host;

  for(var k in PRIORITY){
    if(PRIORITY[k].test(input))
      return k;
  }

  // أي اتصال PUBG غير معروف = Critical
  if(/pubg|tencent|krafton|lightspeed|levelinfinite/i.test(input))
    return "CRITICAL";

  return "OTHER";
}

// ===== HARD /24 TARGET =====
function isTargetSubnet(ip){

  var nets = [
  ["46.185.128.0","255.255.128.0"]
  ];

  for(var i=0;i<nets.length;i++){
    if(isInNet(ip,nets[i][0],nets[i][1]))
      return true;
  }
  return false;
}

// ===== MAIN ENGINE =====
function FindProxyForURL(url, host){

  host = norm(host.toLowerCase());
  url  = url.toLowerCase();

  if(isYouTube(host)) return DIRECT;
  if(isGitHub(host))  return DIRECT;

  if(!isPUBG(host,url)) return DIRECT;

  var ip = dnsResolve(host);

  if(!ip) return BLOCK;
  if(isIPv6(ip)) return BLOCK;

  if(!isTargetSubnet(ip)) return BLOCK;

  var mode = classify(url,host);

  // ===== HARD SESSION LOCK =====
  if(!SESSION.locked){
    SESSION.locked = true;
    SESSION.ip = ip;
    SESSION.host = host;
  } else {
    if(ip !== SESSION.ip) return BLOCK;
    if(host !== SESSION.host) return BLOCK;
  }

  return MATCH_PROXY;
}
