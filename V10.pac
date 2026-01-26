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
  ["82.212.64.0","255.255.192.0"],
  ["94.249.0.0","255.255.128.0"],
  ["176.29.0.0","255.255.0.0"],
  ["176.28.128.0","255.255.128.0"],
  ["46.185.128.0","255.255.128.0"],
  ["213.6.0.0","255.255.0.0"]
];

// ================= JORDAN WIDE (LOBBY) =================
var JORDAN_WIDE_IPV4 = [
  ["2.59.52.0", "2.59.55.255"],
  ["5.45.128.0", "5.45.143.255"],
  ["5.198.240.0", "5.198.247.255"],
  ["5.199.184.0", "5.199.187.255"],
  ["31.44.0.0", "31.44.255.255"],
  ["37.17.192.0", "37.17.207.255"],
  ["37.44.32.0", "37.44.39.255"],
  ["37.75.144.0", "37.75.151.255"],
  ["37.123.64.0", "37.123.95.255"],
  ["37.152.0.0", "37.152.7.255"],
  ["37.202.64.0", "37.202.127.255"],
  ["37.220.112.0", "37.220.127.255"],
  ["37.252.222.0", "37.252.222.255"],
  ["45.142.196.0", "45.142.199.255"],
  ["46.23.112.0", "46.23.127.255"],
  ["46.32.96.0", "46.32.127.255"],
  ["46.185.128.0", "46.185.255.255"],
  ["46.248.192.0", "46.248.223.255"],
  ["62.72.160.0", "62.72.191.255"],
  ["77.245.0.0", "77.245.15.255"],
  ["79.134.128.0", "79.134.159.255"],
  ["80.10.8.0", "80.10.39.255"],
  ["80.10.48.0", "80.10.79.255"],
  ["80.10.144.0", "80.10.151.255"],
  ["80.10.168.0", "80.10.175.255"],
  ["80.90.160.0", "80.90.175.255"],
  ["81.21.0.0", "81.21.0.255"],
  ["81.21.8.0", "81.21.15.255"],
  ["81.28.112.0", "81.28.127.255"],
  ["81.52.144.0", "81.52.159.255"],
  ["81.52.224.0", "81.52.231.255"],
  ["81.253.96.0", "81.253.99.255"],
  ["81.253.240.0", "81.253.255.255"],
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
];

// ================= BLACKLIST: EU + RUSSIA + ASIA =================
var GEO_BLACKLIST = [

  // Europe (wide)
  ["5.0.0.0","255.0.0.0"],
  ["37.0.0.0","255.0.0.0"],
  ["51.0.0.0","255.0.0.0"],

  // Russia
  ["5.136.0.0","255.248.0.0"],
  ["31.128.0.0","255.192.0.0"],
  ["46.16.0.0","255.240.0.0"],
  ["95.24.0.0","255.248.0.0"],
  ["178.64.0.0","255.192.0.0"],

  // Asia (far & wide)
  ["1.0.0.0","255.0.0.0"],
  ["14.0.0.0","255.0.0.0"],
  ["27.0.0.0","255.0.0.0"],
  ["36.0.0.0","255.0.0.0"],
  ["39.0.0.0","255.0.0.0"],
  ["42.0.0.0","255.0.0.0"],
  ["49.0.0.0","255.0.0.0"],
  ["58.0.0.0","255.0.0.0"],
  ["59.0.0.0","255.0.0.0"],
  ["60.0.0.0","255.0.0.0"]
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
