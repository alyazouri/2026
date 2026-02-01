// ================= PROXIES =================
var MATCH_JO = "PROXY 46.185.131.218:20001";

var LOBBY_POOL = [
  "PROXY 176.29.153.95:9030",
  "PROXY 82.212.84.33:8181",
  "PROXY 46.185.131.218:443"
];

var DIRECT = "DIRECT";
var BLOCK  = "PROXY 127.0.0.1:9";

// ================= JORDAN ASN (ABSOLUTE) =================

// ===== MATCH – JO CORE + MOBILE + IX (AS REQUESTED) =====
var JO_MATCH_IPV4 = [
  ["82.212.64.0","255.255.192.0"],   // Zain core
  ["94.249.0.0","255.255.128.0"],    // Zain mobile
  ["176.29.0.0","255.255.0.0"],      // Orange core
  ["176.28.128.0","255.255.128.0"],  // Orange mobile
  ["46.185.128.0","255.255.128.0"],  // Jordan IX
  ["213.6.0.0","255.255.0.0"]        // DC core
];

// ===== LOBBY / SOCIAL – ASN ONLY (JO USERS ONLY) =====
var JO_ASN_IPV4 = [
  // Umniah
  ["5.45.128.0","255.255.240.0"],
  ["5.198.240.0","255.255.248.0"],
  ["5.199.184.0","255.255.252.0"],

  // Zain / Orange fixed
  ["37.17.192.0","255.255.240.0"],
  ["37.123.64.0","255.255.224.0"],
  ["37.202.64.0","255.255.192.0"],
  ["37.220.112.0","255.255.240.0"],

  // Broadband
  ["46.23.112.0","255.255.240.0"],
  ["46.32.96.0","255.255.224.0"],
  ["46.185.128.0","255.255.192.0"],
  ["46.248.192.0","255.255.224.0"],

  // Older JO pools
  ["79.134.128.0","255.255.224.0"],
  ["79.173.192.0","255.255.192.0"],

  // Mobile (JO only)
  ["94.249.0.0","255.255.128.0"],
  ["176.28.128.0","255.255.128.0"]
];

// ================= HARD GEO / CLOUD BLOCK =================
var GEO_BLACKLIST = [
  ["3.0.0.0","255.0.0.0"], ["18.0.0.0","255.0.0.0"],
  ["34.0.0.0","255.0.0.0"], ["35.0.0.0","255.0.0.0"],
  ["51.0.0.0","255.0.0.0"], ["52.0.0.0","255.0.0.0"],
  ["54.0.0.0","255.0.0.0"],
  ["1.0.0.0","255.0.0.0"],
  ["41.0.0.0","255.0.0.0"],
  ["177.0.0.0","255.0.0.0"]
];

// ================= SESSION =================
var SESSION = {
  matchNet: null,
  matchHost: null,
  dnsCache: {}
};

// ================= HELPERS =================
function norm(h){
  var i = h.indexOf(":");
  return i > -1 ? h.substring(0, i) : h;
}

function isInList(ip, list){
  for (var i = 0; i < list.length; i++)
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
  var h = 0;
  for (var i = 0; i < host.length; i++)
    h = (h + host.charCodeAt(i)) % LOBBY_POOL.length;
  return LOBBY_POOL[h];
}

// ================= DETECTION (ULTRA) =================
function isPUBG(h){
  return /pubg|pubgm|pubgmobile|tencent|krafton|lightspeed|levelinfinite|igame/i.test(h);
}
function isMatch(u,h){
  return /(match|battle|combat|realtime|gameplay|ingame|room|session|instance|udp|tick|sync|arena|zone|round|shard|relay)/i.test(u+h);
}
function isLobby(u,h){
  return /(lobby|matchmaking|queue|dispatch|gateway|gate|router|join|region|selector|alloc|ticket|ready)/i.test(u+h);
}
function isSocial(u,h){
  return /(friend|invite|squad|team|party|clan|presence|status|chat|voice|mic)/i.test(u+h);
}
function isAuth(u,h){
  return /(auth|login|logout|session|token|oauth|sso|account|profile|verify)/i.test(u+h);
}
function isCDN(u,h){
  return /(cdn|asset|assets|resource|patch|update|download|media|static|content|pak|bundle)/i.test(u+h);
}

// ================= MAIN =================
function FindProxyForURL(url, host) {

  host = norm(host.toLowerCase());

  // غير PUBG → مباشر
  if (!isPUBG(host)) return DIRECT;

  var ip = resolvePinned(host);
  if (!ip) return BLOCK;

  // IPv6 مرفوض
  if (ip.indexOf(":") > -1) return BLOCK;

  // Cloud / VPN / Non-JO
  if (isInList(ip, GEO_BLACKLIST)) return BLOCK;

  // ===== MATCH (JO ONLY – CORE + MOBILE + IX) =====
  if (isMatch(url, host)) {
    if (!isInList(ip, JO_MATCH_IPV4)) return BLOCK;

    // pin /22
    var net22 = ip.split('.').slice(0,3).join('.');
    if (!SESSION.matchNet) {
      SESSION.matchNet = net22;
      SESSION.matchHost = host;
      return MATCH_JO;
    }
    if (host !== SESSION.matchHost) return BLOCK;
    if (net22 !== SESSION.matchNet) return BLOCK;

    return MATCH_JO;
  }

  // ===== LOBBY / SOCIAL / AUTH (JO ASN ONLY – ABSOLUTE) =====
  if (isLobby(url, host) || isSocial(url, host) || isAuth(url, host)) {
    if (!isInList(ip, JO_ASN_IPV4)) return BLOCK;
    return pickLobbyProxy(host);
  }

  // ===== CDN / DOWNLOAD ONLY =====
  if (isCDN(url, host)) return DIRECT;

  return BLOCK;
}
