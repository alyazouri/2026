// ================= PROXIES =================
var MATCH_JO = "PROXY 46.185.131.218:20001";

var LOBBY_POOL = [
  "PROXY 212.35.66.45:8085",
  "PROXY 212.35.66.45:8181",
  "PROXY 46.185.131.218:443"
];

var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ================= JORDAN MATCH (STRONG) =================
var JORDAN_MATCH_IPV4 = [
    ["86.108.0.0",    "255.255.128.0"]   # /17
];

// ================= JORDAN WIDE (LOBBY) =================
var JORDAN_WIDE_IPV4 = [
    ["86.108.0.0",    "255.255.128.0"]  # /17
];

// ================= BLACKLIST: EU + RUSSIA + ASIA =================
var GEO_BLACKLIST = [

  // ================= EUROPE (SAFE, no JO hit) =================
  ["3.0.0.0","255.0.0.0"],      // US / EU clouds
  ["18.0.0.0","255.0.0.0"],     // AWS
  ["34.0.0.0","255.0.0.0"],     // Google
  ["35.0.0.0","255.0.0.0"],     // Google
  ["51.0.0.0","255.0.0.0"],     // UK / EU
  ["52.0.0.0","255.0.0.0"],     // Azure
  ["54.0.0.0","255.0.0.0"],     // AWS
  ["63.0.0.0","255.0.0.0"],     // EU legacy
  ["64.0.0.0","255.0.0.0"],

  // ================= RUSSIA / CIS =================
  ["31.128.0.0","255.192.0.0"],
  ["45.128.0.0","255.192.0.0"],
  ["77.88.0.0","255.248.0.0"],
  ["87.240.0.0","255.240.0.0"],
  ["95.24.0.0","255.248.0.0"],
  ["178.64.0.0","255.192.0.0"],
  ["185.0.0.0","255.224.0.0"],   // RU/CIS (جزئي)

  // ================= EAST / SOUTH ASIA =================
  ["1.0.0.0","255.0.0.0"],
  ["14.0.0.0","255.0.0.0"],
  ["27.0.0.0","255.0.0.0"],
  ["36.0.0.0","255.0.0.0"],
  ["39.0.0.0","255.0.0.0"],
  ["42.0.0.0","255.0.0.0"],
  ["49.0.0.0","255.0.0.0"],
  ["58.0.0.0","255.0.0.0"],
  ["59.0.0.0","255.0.0.0"],
  ["60.0.0.0","255.0.0.0"],
  ["101.0.0.0","255.0.0.0"],
  ["103.0.0.0","255.0.0.0"],
  ["106.0.0.0","255.0.0.0"],
  ["110.0.0.0","255.0.0.0"],
  ["111.0.0.0","255.0.0.0"],
  ["112.0.0.0","255.0.0.0"],
  ["113.0.0.0","255.0.0.0"],
  ["114.0.0.0","255.0.0.0"],
  ["115.0.0.0","255.0.0.0"],
  ["116.0.0.0","255.0.0.0"],
  ["117.0.0.0","255.0.0.0"],
  ["118.0.0.0","255.0.0.0"],
  ["119.0.0.0","255.0.0.0"],
  ["120.0.0.0","255.0.0.0"],
  ["121.0.0.0","255.0.0.0"],
  ["122.0.0.0","255.0.0.0"],
  ["123.0.0.0","255.0.0.0"],
  ["124.0.0.0","255.0.0.0"],
  ["125.0.0.0","255.0.0.0"],
  ["126.0.0.0","255.0.0.0"],

  // ================= AFRICA (NON-ME) =================
  ["41.0.0.0","255.0.0.0"],      // Africa (JO not here)
  ["102.0.0.0","255.0.0.0"],
  ["105.0.0.0","255.0.0.0"],
  ["154.0.0.0","255.0.0.0"],
  ["197.0.0.0","255.0.0.0"],

  // ================= LATAM =================
  ["177.0.0.0","255.0.0.0"],
  ["179.0.0.0","255.0.0.0"],
  ["181.0.0.0","255.0.0.0"],
  ["186.0.0.0","255.0.0.0"],
  ["187.0.0.0","255.0.0.0"],
  ["189.0.0.0","255.0.0.0"],
  ["190.0.0.0","255.0.0.0"],
  ["200.0.0.0","255.0.0.0"],
  ["201.0.0.0","255.0.0.0"]
];

// ================= SESSION =================
var SESSION = {
  matchNet: null,
  matchHost: null,
  dnsCache: {}
};

// ================= HELPERS =================
function norm(h){ var i=h.indexOf(":"); return i>-1?h.substring(0,i):h; }

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

function pickLobbyProxy(host){
  var h=0;
  for (var i=0;i<host.length;i++)
    h=(h+host.charCodeAt(i))%LOBBY_POOL.length;
  return LOBBY_POOL[h];
}

// ================= DETECTION =================
function isPUBG(h){
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite/i.test(h);
}
function isMatch(u,h){
  return /match|battle|game|combat|realtime|sync|udp|tick|room/i.test(u+h);
}
function isLobby(u,h){
  return /lobby|matchmaking|queue|dispatch|gateway|region|join|recruit/i.test(u+h);
}
function isSocial(u,h){
  return /friend|invite|squad|team|party|clan|presence|social/i.test(u+h);
}
function isCDN(u,h){
  return /cdn|asset|resource|patch|update|media|content/i.test(u+h);
}

// ================= MAIN =================
function FindProxyForURL(url, host) {

  host = norm(host.toLowerCase());
  if (!isPUBG(host)) return DIRECT;

  var ip = resolvePinned(host);
  if (!ip || ip.indexOf(":")>-1) return BLOCK;

  // HARD GEO BLOCK
  if (isInList(ip, GEO_BLACKLIST)) return BLOCK;

  // MATCH (STRONG ONLY)
  if (isMatch(url, host)) {
    if (!isInList(ip, JORDAN_MATCH_IPV4)) return BLOCK;

    var net24 = ip.split('.').slice(0,3).join('.');
    if (!SESSION.matchNet) {
      SESSION.matchNet = net24;
      SESSION.matchHost = host;
      return MATCH_JO;
    }
    if (host !== SESSION.matchHost) return BLOCK;
    if (net24 !== SESSION.matchNet) return BLOCK;

    return MATCH_JO;
  }

  // LOBBY / SOCIAL / CDN
  if (isLobby(url, host) || isSocial(url, host) || isCDN(url, host)) {
    if (!isInList(ip, JORDAN_WIDE_IPV4)) return BLOCK;
    return pickLobbyProxy(host);
  }

  return pickLobbyProxy(host);
}
