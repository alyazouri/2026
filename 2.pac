// ================= PROXIES =================
var MATCH_JO = "PROXY 46.185.131.218:20001";

var LOBBY_POOL = [
  "PROXY 212.35.66.45:8085",
  "PROXY 212.35.66.45:8181",
  "PROXY 46.185.131.218:443",
  "PROXY 46.185.131.218:8080",
  "PROXY 77.245.224.10:8085",
  "PROXY 149.200.200.50:8181"
];

var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ================= JORDAN MATCH (ULTRA STRICT) =================
var JORDAN_MATCH_IPV4 = [
  ["2.17.24.0","255.255.252.0"],
  ["2.59.52.0","255.255.252.0"],
  ["5.45.112.0","255.255.240.0"],
  ["37.17.128.0","255.255.192.0"],
  ["46.185.128.0","255.255.128.0"],
  ["77.245.0.0","255.255.224.0"],
  ["79.134.128.0","255.255.224.0"],
  ["79.173.192.0","255.255.192.0"],
  ["80.90.160.0","255.255.240.0"],
  ["82.212.64.0","255.255.192.0"],
  ["91.218.88.0","255.255.248.0"],
  ["109.106.192.0","255.255.192.0"],
  ["149.200.128.0","255.255.128.0"],
  ["176.9.0.0","255.255.0.0"],
  ["185.15.216.0","255.255.248.0"],
  ["185.44.36.0","255.255.252.0"],
  ["188.161.0.0","255.255.128.0"],
  ["193.188.80.0","255.255.248.0"]
];

// ================= JORDAN WIDE (EXPANDED) =================
var JORDAN_WIDE_IPV4 = [
  ["2.17.24.0","255.255.252.0"],
  ["2.59.52.0","255.255.252.0"],
  ["5.45.112.0","255.255.240.0"],
  ["37.17.128.0","255.255.192.0"],
  ["46.185.128.0","255.255.128.0"],
  ["77.245.0.0","255.255.224.0"],
  ["79.134.128.0","255.255.224.0"],
  ["79.173.192.0","255.255.192.0"],
  ["80.90.160.0","255.255.240.0"],
  ["82.212.64.0","255.255.192.0"],
  ["91.218.88.0","255.255.248.0"],
  ["109.106.192.0","255.255.192.0"],
  ["149.200.128.0","255.255.128.0"],
  ["176.9.0.0","255.255.0.0"],
  ["185.15.216.0","255.255.248.0"],
  ["185.44.36.0","255.255.252.0"],
  ["188.161.0.0","255.255.128.0"],
  ["193.188.80.0","255.255.248.0"],
  ["212.118.0.0","255.255.128.0"],
  ["213.6.128.0","255.255.128.0"]
];

// ================= BLACKLIST: EU + RUSSIA + ASIA + OTHERS =================
var GEO_BLACKLIST = [
  // Europe (expanded)
  ["5.0.0.0","255.0.0.0"],
  ["31.0.0.0","255.0.0.0"],
  ["45.0.0.0","255.0.0.0"],
  ["50.0.0.0","255.0.0.0"],
  ["51.0.0.0","255.0.0.0"],
  ["62.0.0.0","255.0.0.0"],
  ["78.0.0.0","255.0.0.0"],
  ["81.0.0.0","255.0.0.0"],
  ["83.0.0.0","255.0.0.0"],
  ["84.0.0.0","255.0.0.0"],
  ["85.0.0.0","255.0.0.0"],
  ["86.0.0.0","255.0.0.0"],
  ["87.0.0.0","255.0.0.0"],
  ["88.0.0.0","255.0.0.0"],
  ["89.0.0.0","255.0.0.0"],
  ["90.0.0.0","255.0.0.0"],
  ["92.0.0.0","255.0.0.0"],
  ["93.0.0.0","255.0.0.0"],
  ["94.0.0.0","255.0.0.0"],
  ["95.0.0.0","255.0.0.0"],

  // Russia (expanded)
  ["5.136.0.0","255.248.0.0"],
  ["31.128.0.0","255.192.0.0"],
  ["46.16.0.0","255.240.0.0"],
  ["77.88.0.0","255.248.0.0"],
  ["95.24.0.0","255.248.0.0"],
  ["109.160.0.0","255.224.0.0"],
  ["178.64.0.0","255.192.0.0"],
  ["188.128.0.0","255.192.0.0"],

  // Asia (massive block)
  ["1.0.0.0","255.0.0.0"],
  ["14.0.0.0","255.0.0.0"],
  ["27.0.0.0","255.0.0.0"],
  ["36.0.0.0","255.0.0.0"],
  ["39.0.0.0","255.0.0.0"],
  ["42.0.0.0","255.0.0.0"],
  ["43.0.0.0","255.0.0.0"],
  ["49.0.0.0","255.0.0.0"],
  ["58.0.0.0","255.0.0.0"],
  ["59.0.0.0","255.0.0.0"],
  ["60.0.0.0","255.0.0.0"],
  ["61.0.0.0","255.0.0.0"],
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

  // Turkey
  ["78.160.0.0","255.224.0.0"],
  ["88.240.0.0","255.240.0.0"],

  // India
  ["117.192.0.0","255.192.0.0"],
  ["106.192.0.0","255.192.0.0"]
];

// ================= SESSION =================
var SESSION = {
  matchNet: null,
  matchHost: null,
  matchAttempts: 0,
  dnsCache: {},
  blockedIPs: {}
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
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite|proximabeta/i.test(h);
}
function isMatch(u,h){
  return /match|battle|game|combat|realtime|sync|udp|tick|room|spawn|server/i.test(u+h);
}
function isLobby(u,h){
  return /lobby|matchmaking|queue|dispatch|gateway|region|join|recruit|platform/i.test(u+h);
}
function isSocial(u,h){
  return /friend|invite|squad|team|party|clan|presence|social|chat/i.test(u+h);
}
function isCDN(u,h){
  return /cdn|asset|resource|patch|update|media|content|download/i.test(u+h);
}

// ================= MAIN =================
function FindProxyForURL(url, host) {

  host = norm(host.toLowerCase());
  if (!isPUBG(host)) return DIRECT;

  var ip = resolvePinned(host);
  if (!ip || ip.indexOf(":")>-1) return BLOCK;

  // HARD BLOCK: previously blocked IPs
  if (SESSION.blockedIPs[ip]) return BLOCK;

  // HARD GEO BLOCK (STRICT)
  if (isInList(ip, GEO_BLACKLIST)) {
    SESSION.blockedIPs[ip] = true;
    return BLOCK;
  }

  // MATCH (ULTRA STRICT - JORDAN ONLY)
  if (isMatch(url, host)) {
    if (!isInList(ip, JORDAN_MATCH_IPV4)) {
      SESSION.blockedIPs[ip] = true;
      return BLOCK;
    }

    var net24 = ip.split('.').slice(0,3).join('.');
    
    if (!SESSION.matchNet) {
      SESSION.matchNet = net24;
      SESSION.matchHost = host;
      SESSION.matchAttempts = 0;
      return MATCH_JO;
    }
    
    // Strict session lock
    if (host !== SESSION.matchHost) {
      SESSION.blockedIPs[ip] = true;
      return BLOCK;
    }
    if (net24 !== SESSION.matchNet) {
      SESSION.matchAttempts++;
      if (SESSION.matchAttempts > 2) return BLOCK;
      return BLOCK;
    }

    return MATCH_JO;
  }

  // LOBBY / SOCIAL / CDN (JORDAN PREFERRED)
  if (isLobby(url, host) || isSocial(url, host) || isCDN(url, host)) {
    if (!isInList(ip, JORDAN_WIDE_IPV4)) {
      SESSION.blockedIPs[ip] = true;
      return BLOCK;
    }
    return pickLobbyProxy(host);
  }

  // DEFAULT: JORDAN CHECK
  if (!isInList(ip, JORDAN_WIDE_IPV4)) {
    SESSION.blockedIPs[ip] = true;
    return BLOCK;
  }

  return pickLobbyProxy(host);
}
