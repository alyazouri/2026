// ============================================================
//  PUBG MOBILE — Jordan Priority Strict v4.0
// ============================================================

// ================= PROXIES =================
var MATCH_JO_POOL = "PROXY 46.185.131.218:20001";
var LOBBY_PROXY   = "PROXY 2.59.53.74:443";

var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ================= JORDAN IP RANGES =================
var JORDAN_IP_RANGES = [
  ["5.21.0.0",    "255.255.0.0"],
  ["37.44.32.0",  "255.255.248.0"],
  ["46.30.160.0", "255.255.240.0"],
  ["62.3.0.0",    "255.255.0.0"],
  ["77.42.0.0",   "255.255.0.0"],
  ["78.110.96.0", "255.255.224.0"],
  ["81.19.64.0",  "255.255.192.0"],
  ["82.212.0.0",  "255.255.0.0"],
  ["83.212.0.0",  "255.254.0.0"],
  ["84.235.64.0", "255.255.224.0"],
  ["86.111.0.0",  "255.255.0.0"],
  ["91.74.0.0",   "255.255.0.0"],
  ["91.108.0.0",  "255.255.0.0"],
  ["92.114.0.0",  "255.254.0.0"],
  ["94.0.0.0",    "255.254.0.0"],
  ["176.29.0.0",  "255.255.0.0"],
  ["178.238.0.0", "255.255.0.0"],
  ["185.24.0.0",  "255.255.0.0"],
  ["188.247.0.0", "255.255.0.0"],
  ["194.126.0.0", "255.255.0.0"],
  ["195.0.192.0", "255.255.192.0"],
  ["212.0.0.0",   "255.254.0.0"]
];

// ================= SESSION =================
var SESSION = {
  matchNet:  null,
  matchHost: null
};

// ================= HELPERS =================

function norm(h) {
  var i = h.indexOf(":");
  return i > -1 ? h.substring(0, i) : h;
}

function isInList(ip, list) {
  for (var i = 0; i < list.length; i++)
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  return false;
}

function isPUBG(h, u) {
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite/i.test(h + u);
}

function isMatch(u, h) {
  return /match|battle|game|combat|realtime|sync|tick|room|gs\.|gamesv/i.test(u + h);
}

function isLobby(u, h) {
  return /lobby|matchmaking|queue|dispatch|gateway|region|join|login|auth/i.test(u + h);
}

function isCDN(u, h) {
  return /cdn|asset|resource|patch|update|media|content|download|img/i.test(u + h);
}

// ================= MAIN =================

function FindProxyForURL(url, host) {

  host = norm(host.toLowerCase());
  url  = url.toLowerCase();

  // PUBG فقط
  if (!isPUBG(host, url)) return DIRECT;

  var ip = dnsResolve(host);

  // IPv6 أو فشل DNS → Block
  if (!ip || ip.indexOf(":") > -1) return BLOCK;

  // 🔒 الأردن فقط
  if (!isInList(ip, JORDAN_IP_RANGES)) return BLOCK;

  // ================= MATCH =================
  if (isMatch(url, host)) {

    var net24 = ip.split('.').slice(0, 3).join('.');

    if (!SESSION.matchNet) {
      SESSION.matchNet  = net24;
      SESSION.matchHost = host;
    } else {
      if (host !== SESSION.matchHost) return BLOCK;
      if (net24 !== SESSION.matchNet) return BLOCK;
    }

    return MATCH_JO_POOL;
  }

  // ================= LOBBY =================
  if (isLobby(url, host)) {
    return LOBBY_PROXY;
  }

  // ================= CDN =================
  if (isCDN(url, host)) {
    return LOBBY_PROXY;
  }

  // أي شيء آخر متعلق بـ PUBG
  return LOBBY_PROXY;
}
