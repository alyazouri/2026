// ================= GAME BOOSTER – FAST FULL =================

// ===== MAIN MATCH PROXY (LOW LATENCY) =====
var MATCH_JO = "PROXY 46.185.131.218:20001";

// ===== LOBBY / CDN (LIMITED FOR STABILITY) =====
var LOBBY_POOL = [
  "PROXY 46.185.131.218:443",
  "PROXY 212.35.66.45:8085"
];

var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ================= JORDAN MATCH (HARD) =================
var JORDAN_MATCH_IPV4 = [
  ["82.212.64.0","255.255.192.0"],
  ["94.249.0.0","255.255.128.0"],
  ["176.29.0.0","255.255.0.0"],
  ["176.28.128.0","255.255.128.0"],
  ["46.185.128.0","255.255.128.0"],
  ["213.6.0.0","255.255.0.0"]
];

// ================= JORDAN ONLY (NO FALLBACK) =================
var JORDAN_WIDE_IPV4 = [
  ["82.212.0.0","255.255.0.0"],
  ["94.249.0.0","255.255.0.0"],
  ["176.28.0.0","255.252.0.0"],
  ["176.29.0.0","255.255.0.0"],
  ["212.35.0.0","255.255.0.0"],
  ["213.6.0.0","255.255.0.0"],
  ["46.185.0.0","255.255.0.0"]
];

// ================= SESSION BOOST LOCK =================
var SESSION = {
  matchNet: null,
  matchHost: null,
  dnsCache: {},
  locked: false
};

// ================= FAST HELPERS =================
function norm(h){
  var i=h.indexOf(":");
  return i>-1 ? h.substring(0,i) : h;
}

function isInList(ip, list){
  for (var i=0;i<list.length;i++)
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  return false;
}

function resolvePinned(host){
  if (SESSION.dnsCache[host]) return SESSION.dnsCache[host];
  var ip = dnsResolve(host);
  if (ip) SESSION.dnsCache[host] = ip;
  return ip;
}

function pickLobbyProxy(){
  return LOBBY_POOL[0]; // ثابت = jitter أقل
}

// ================= GAME TRAFFIC DETECTION =================
function isGAME(h){
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite/i.test(h);
}

function isMatch(u,h){
  return /match|battle|combat|realtime|sync|udp|tick|room|game/i.test(u+h);
}

function isLobby(u,h){
  return /lobby|matchmaking|queue|dispatch|gateway|join|region/i.test(u+h);
}

function isCDN(u,h){
  return /cdn|asset|resource|patch|update|media|content/i.test(u+h);
}

// ================= MAIN BOOST ENGINE =================
function FindProxyForURL(url, host) {

  host = norm(host.toLowerCase());

  // خارج اللعبة = مباشر
  if (!isGAME(host)) return DIRECT;

  var ip = resolvePinned(host);
  if (!ip || ip.indexOf(":")>-1) return BLOCK;

  // ===== MATCH نشان السرعة القصوى =====
  if (isMatch(url, host)) {

    if (!isInList(ip, JORDAN_MATCH_IPV4)) return BLOCK;

    var net24 = ip.split('.').slice(0,3).join('.');

    if (!SESSION.locked) {
      SESSION.matchNet  = net24;
      SESSION.matchHost = host;
      SESSION.locked    = true;
    }

    if (host !== SESSION.matchHost) return BLOCK;
    if (net24 !== SESSION.matchNet) return BLOCK;

    return MATCH_JO;
  }

  // ===== LOBBY / CDN (SAFE ONLY) =====
  if (isLobby(url, host) || isCDN(url, host)) {
    if (!isInList(ip, JORDAN_WIDE_IPV4)) return BLOCK;
    return pickLobbyProxy();
  }

  // أي شيء ثاني = منع
  return BLOCK;
}
