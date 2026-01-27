// ==================================================
// FULL GAME BOOSTER – EXTREME FULL
// Jordan Only | Ultra Low Latency | Hard Lock
// ==================================================

// ================= PROXIES =================
var MATCH_JO = "PROXY 46.185.131.218:20001";
var LOBBY_JO = "PROXY 46.185.131.218:443";

var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ================= JORDAN MATCH IPs =================
var JORDAN_MATCH_IPV4 = [
  ["82.212.64.0","255.255.192.0"],
  ["94.249.0.0","255.255.128.0"],
  ["176.29.0.0","255.255.0.0"],
  ["176.28.128.0","255.255.128.0"],
  ["46.185.128.0","255.255.128.0"],
  ["213.6.0.0","255.255.0.0"]
];

// ================= JORDAN GENERAL =================
var JORDAN_WIDE_IPV4 = [
  ["82.212.0.0","255.255.0.0"],
  ["94.249.0.0","255.255.0.0"],
  ["176.29.0.0","255.255.0.0"],
  ["212.35.0.0","255.255.0.0"],
  ["213.6.0.0","255.255.0.0"],
  ["46.185.0.0","255.255.0.0"]
];

// ================= SESSION HARD LOCK =================
var SESSION = {
  ip: null,
  net24: null,
  host: null,
  locked: false,
  dns: {}
};

// ================= HELPERS =================
function norm(h){
  var i=h.indexOf(":");
  return i>-1 ? h.substring(0,i) : h;
}

function isInList(ip, list){
  for (var i=0;i<list.length;i++)
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  return false;
}

function resolveOnce(host){
  if (SESSION.dns[host]) return SESSION.dns[host];
  var ip = dnsResolve(host);
  if (ip) SESSION.dns[host] = ip;
  return ip;
}

// ================= GAME DETECTION =================
function isGAME(h){
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite/i.test(h);
}

function isMatch(u,h){
  return /match|battle|combat|realtime|udp|tick|sync|room|game/i.test(u+h);
}

function isLobby(u,h){
  return /lobby|matchmaking|queue|dispatch|gateway|join|region/i.test(u+h);
}

function isCDN(u,h){
  return /cdn|asset|resource|patch|update|media|content/i.test(u+h);
}

// ================= MAIN ENGINE =================
function FindProxyForURL(url, host) {

  host = norm(host.toLowerCase());

  // أي شيء مش لعبة = مباشر
  if (!isGAME(host)) return DIRECT;

  var ip = resolveOnce(host);
  if (!ip || ip.indexOf(":")>-1) return BLOCK;

  // ================= MATCH (ABSOLUTE LOCK) =================
  if (isMatch(url, host)) {

    if (!isInList(ip, JORDAN_MATCH_IPV4)) return BLOCK;

    var net24 = ip.split('.').slice(0,3).join('.');

    if (!SESSION.locked) {
      SESSION.ip     = ip;
      SESSION.net24  = net24;
      SESSION.host   = host;
      SESSION.locked = true;
    }

    // قفل كامل
    if (ip   !== SESSION.ip)    return BLOCK;
    if (host !== SESSION.host)  return BLOCK;
    if (net24 !== SESSION.net24)return BLOCK;

    return MATCH_JO;
  }

  // ================= LOBBY / CDN (JORDAN ONLY) =================
  if (isLobby(url, host) || isCDN(url, host)) {

    if (!isInList(ip, JORDAN_WIDE_IPV4)) return BLOCK;

    // بعد قفل الماتش، امنع أي lobby جديد
    if (SESSION.locked) return BLOCK;

    return LOBBY_JO;
  }

  // أي شيء ثاني = BLOCK
  return BLOCK;
}
