// ================= PROXIES =================
var MATCH_PROXY = "PROXY 46.185.131.218:20001";
var LOBBY_PROXY = "PROXY 2.59.53.74:443";
var BLOCK       = "PROXY 127.0.0.1:9";
var DIRECT      = "DIRECT";

// ================= SESSION LOCK =================
var SESSION = { matchNet24: null, matchHost: null };

// ================= HELPERS =================
function norm(h){
  var i = h.indexOf(":");
  return i > -1 ? h.substring(0, i) : h;
}

function isIPv4(ip){
  // basic IPv4 dotted-quad check
  return /^\d{1,3}(\.\d{1,3}){3}$/.test(ip);
}

function isPrivateOrReserved(ip){
  // RFC1918 + loopback + link-local + CGNAT + multicast + reserved-ish
  return (
    isInNet(ip, "10.0.0.0",     "255.0.0.0")   ||
    isInNet(ip, "172.16.0.0",   "255.240.0.0") ||
    isInNet(ip, "192.168.0.0",  "255.255.0.0") ||
    isInNet(ip, "127.0.0.0",    "255.0.0.0")   ||
    isInNet(ip, "169.254.0.0",  "255.255.0.0") ||
    isInNet(ip, "100.64.0.0",   "255.192.0.0") ||
    isInNet(ip, "224.0.0.0",    "240.0.0.0")   ||
    isInNet(ip, "0.0.0.0",      "255.0.0.0")   ||
    isInNet(ip, "240.0.0.0",    "240.0.0.0")
  );
}

function isPublicIPv4(ip){
  return isIPv4(ip) && !isPrivateOrReserved(ip);
}

function isInJordan(ip){
  // (kept exactly as you provided)
  if (isInNet(ip, "2.59.52.0", "255.255.252.0")) return true;
  if (isInNet(ip, "5.45.128.0", "255.255.240.0")) return true;
  if (isInNet(ip, "5.198.240.0", "255.255.248.0")) return true;
  if (isInNet(ip, "5.199.184.0", "255.255.252.0")) return true;
  if (isInNet(ip, "37.17.192.0", "255.255.240.0")) return true;
  if (isInNet(ip, "37.44.32.0", "255.255.248.0")) return true;
  if (isInNet(ip, "37.75.144.0", "255.255.248.0")) return true;
  if (isInNet(ip, "37.123.64.0", "255.255.224.0")) return true;
  if (isInNet(ip, "37.152.0.0", "255.255.248.0")) return true;
  if (isInNet(ip, "37.202.64.0", "255.255.192.0")) return true;
  if (isInNet(ip, "37.220.112.0", "255.255.240.0")) return true;
  if (isInNet(ip, "37.252.222.0", "255.255.255.0")) return true;
  if (isInNet(ip, "45.142.196.0", "255.255.252.0")) return true;
  if (isInNet(ip, "46.23.112.0", "255.255.240.0")) return true;
  if (isInNet(ip, "46.32.96.0", "255.255.224.0")) return true;
  if (isInNet(ip, "46.185.128.0", "255.255.128.0")) return true;
  if (isInNet(ip, "46.248.192.0", "255.255.224.0")) return true;
  if (isInNet(ip, "62.72.160.0", "255.255.224.0")) return true;
  if (isInNet(ip, "77.245.0.0", "255.255.240.0")) return true;
  if (isInNet(ip, "79.134.128.0", "255.255.224.0")) return true;
  if (isInNet(ip, "79.173.192.0", "255.255.192.0")) return true;
  if (isInNet(ip, "80.90.160.0", "255.255.240.0")) return true;
  if (isInNet(ip, "81.21.0.0", "255.255.240.0")) return true;
  if (isInNet(ip, "81.28.112.0", "255.255.240.0")) return true;
  if (isInNet(ip, "82.212.64.0", "255.255.192.0")) return true;
  if (isInNet(ip, "84.18.32.0", "255.255.224.0")) return true;
  if (isInNet(ip, "84.18.64.0", "255.255.224.0")) return true;
  if (isInNet(ip, "84.252.106.0", "255.255.255.0")) return true;
  if (isInNet(ip, "85.159.216.0", "255.255.248.0")) return true;
  if (isInNet(ip, "86.108.0.0", "255.255.128.0")) return true;
  if (isInNet(ip, "87.236.232.0", "255.255.248.0")) return true;
  if (isInNet(ip, "87.238.128.0", "255.255.248.0")) return true;
  if (isInNet(ip, "89.20.49.0", "255.255.255.0")) return true;
  if (isInNet(ip, "89.28.216.0", "255.255.248.0")) return true;
  if (isInNet(ip, "89.38.152.0", "255.255.254.0")) return true;
  if (isInNet(ip, "91.106.96.0", "255.255.240.0")) return true;
  if (isInNet(ip, "91.132.100.0", "255.255.255.0")) return true;
  if (isInNet(ip, "91.186.224.0", "255.255.224.0")) return true;
  if (isInNet(ip, "91.212.0.0", "255.255.255.0")) return true;
  if (isInNet(ip, "91.223.202.0", "255.255.255.0")) return true;
  if (isInNet(ip, "92.241.32.0", "255.255.224.0")) return true;
  if (isInNet(ip, "92.253.0.0", "255.255.128.0")) return true;
  if (isInNet(ip, "93.93.144.0", "255.255.248.0")) return true;
  if (isInNet(ip, "93.95.200.0", "255.255.248.0")) return true;
  if (isInNet(ip, "93.115.2.0", "255.255.255.0")) return true;
  if (isInNet(ip, "93.115.3.0", "255.255.255.0")) return true;
  if (isInNet(ip, "93.115.15.0", "255.255.255.0")) return true;
  if (isInNet(ip, "93.191.176.0", "255.255.248.0")) return true;
  if (isInNet(ip, "94.127.208.0", "255.255.248.0")) return true;
  if (isInNet(ip, "94.142.32.0", "255.255.224.0")) return true;
  if (isInNet(ip, "94.249.0.0", "255.255.128.0")) return true;
  if (isInNet(ip, "95.141.208.0", "255.255.240.0")) return true;
  if (isInNet(ip, "95.172.192.0", "255.255.224.0")) return true;
  if (isInNet(ip, "109.107.224.0", "255.255.224.0")) return true;
  if (isInNet(ip, "109.237.192.0", "255.255.240.0")) return true;
  if (isInNet(ip, "141.0.0.0", "255.255.248.0")) return true;
  if (isInNet(ip, "141.98.64.0", "255.255.252.0")) return true;
  if (isInNet(ip, "141.105.56.0", "255.255.248.0")) return true;
  if (isInNet(ip, "146.19.239.0", "255.255.255.0")) return true;
  if (isInNet(ip, "146.19.246.0", "255.255.255.0")) return true;
  if (isInNet(ip, "149.200.128.0", "255.255.128.0")) return true;
  if (isInNet(ip, "176.28.128.0", "255.255.128.0")) return true;
  if (isInNet(ip, "176.29.0.0", "255.255.0.0")) return true;
  if (isInNet(ip, "176.57.0.0", "255.255.224.0")) return true;
  if (isInNet(ip, "176.57.48.0", "255.255.240.0")) return true;
  if (isInNet(ip, "176.118.39.0", "255.255.255.0")) return true;
  if (isInNet(ip, "176.241.64.0", "255.255.248.0")) return true;
  if (isInNet(ip, "178.20.184.0", "255.255.248.0")) return true;
  if (isInNet(ip, "178.77.128.0", "255.255.192.0")) return true;
  if (isInNet(ip, "178.238.176.0", "255.255.240.0")) return true;
  if (isInNet(ip, "185.10.216.0", "255.255.252.0")) return true;
  if (isInNet(ip, "185.12.244.0", "255.255.252.0")) return true;
  if (isInNet(ip, "185.14.132.0", "255.255.252.0")) return true;
  if (isInNet(ip, "185.19.112.0", "255.255.252.0")) return true;
  if (isInNet(ip, "185.24.128.0", "255.255.252.0")) return true;
  if (isInNet(ip, "185.30.248.0", "255.255.252.0")) return true;
  if (isInNet(ip, "185.33.28.0", "255.255.252.0")) return true;
  if (isInNet(ip, "185.40.19.0", "255.255.255.0")) return true;
  if (isInNet(ip, "185.43.146.0", "255.255.255.0")) return true;
  if (isInNet(ip, "185.51.212.0", "255.255.252.0")) return true;
  if (isInNet(ip, "185.57.120.0", "255.255.252.0")) return true;
  if (isInNet(ip, "185.68.54.0", "255.255.255.0")) return true;
  if (isInNet(ip, "185.80.24.0", "255.255.252.0")) return true;
  if (isInNet(ip, "185.80.104.0", "255.255.252.0")) return true;
  if (isInNet(ip, "185.98.220.0", "255.255.252.0")) return true;
  if (isInNet(ip, "185.98.224.0", "255.255.252.0")) return true;
  if (isInNet(ip, "185.109.120.0", "255.255.252.0")) return true;
  if (isInNet(ip, "185.109.192.0", "255.255.252.0")) return true;
  if (isInNet(ip, "185.135.200.0", "255.255.252.0")) return true;
  if (isInNet(ip, "185.139.220.0", "255.255.252.0")) return true;
  if (isInNet(ip, "185.159.180.0", "255.255.252.0")) return true;
  if (isInNet(ip, "185.160.236.0", "255.255.252.0")) return true;
  if (isInNet(ip, "185.163.205.0", "255.255.255.0")) return true;
  if (isInNet(ip, "185.173.56.0", "255.255.252.0")) return true;
  if (isInNet(ip, "185.175.248.0", "255.255.252.0")) return true;
  if (isInNet(ip, "185.176.44.0", "255.255.252.0")) return true;
  if (isInNet(ip, "185.180.80.0", "255.255.252.0")) return true;
  if (isInNet(ip, "185.182.136.0", "255.255.252.0")) return true;
  if (isInNet(ip, "185.193.176.0", "255.255.252.0")) return true;
  if (isInNet(ip, "185.197.176.0", "255.255.252.0")) return true;
  if (isInNet(ip, "185.200.128.0", "255.255.252.0")) return true;
  if (isInNet(ip, "185.234.111.0", "255.255.255.0")) return true;
  if (isInNet(ip, "185.241.62.0", "255.255.255.0")) return true;
  if (isInNet(ip, "185.253.112.0", "255.255.252.0")) return true;
  if (isInNet(ip, "188.123.160.0", "255.255.224.0")) return true;
  if (isInNet(ip, "188.247.64.0", "255.255.224.0")) return true;
  if (isInNet(ip, "193.188.64.0", "255.255.224.0")) return true;
  if (isInNet(ip, "193.203.24.0", "255.255.254.0")) return true;
  if (isInNet(ip, "193.203.110.0", "255.255.254.0")) return true;
  if (isInNet(ip, "194.104.95.0", "255.255.255.0")) return true;
  if (isInNet(ip, "194.165.128.0", "255.255.224.0")) return true;
  if (isInNet(ip, "195.18.9.0", "255.255.255.0")) return true;
  if (isInNet(ip, "195.20.216.0", "255.255.255.0")) return true;
  if (isInNet(ip, "212.34.0.0", "255.255.224.0")) return true;
  if (isInNet(ip, "212.35.64.0", "255.255.224.0")) return true;
  if (isInNet(ip, "212.118.0.0", "255.255.224.0")) return true;
  if (isInNet(ip, "213.139.32.0", "255.255.224.0")) return true;
  if (isInNet(ip, "213.186.160.0", "255.255.224.0")) return true;
  if (isInNet(ip, "217.23.32.0", "255.255.240.0")) return true;
  if (isInNet(ip, "217.29.240.0", "255.255.240.0")) return true;
  if (isInNet(ip, "217.144.0.0", "255.255.240.0")) return true;
  if (isInNet(ip, "91.209.248.0", "255.255.255.0")) return true;
  if (isInNet(ip, "91.220.195.0", "255.255.255.0")) return true;
  if (isInNet(ip, "193.17.53.0", "255.255.255.0")) return true;
  if (isInNet(ip, "193.108.134.0", "255.255.254.0")) return true;
  if (isInNet(ip, "193.111.29.0", "255.255.255.0")) return true;
  if (isInNet(ip, "193.189.148.0", "255.255.255.0")) return true;
  if (isInNet(ip, "194.110.236.0", "255.255.255.0")) return true;
  return false;
}

function isPUBG(h,u){
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite/i.test(h + u);
}

// ================= MODE PRIORITY ENGINE =================
var PRIORITY = {
  CRITICAL:   /match|battle|classic|ranked|erangel|livik|miramar|sanhok|vikendi|karakin|nusa|arena|tdm|warehouse|hangar|domination|assault|gun\s?game|ultimate\s?arena|war\s?mode|payload|metro|zombie|infection|darkest|survive|evoground|hardcore|bluehole|sniper|quick\s?match|ultimate\s?royale|world\s?of\s?wonder/i,
  IMPORTANT:  /lobby|matchmaking|queue|dispatch|gateway|region|join|login|auth|store|inventory|event|mission|reward|season|rp|royale\s?pass|achievement|clan|friend|invite|team|party|squad|chat|message|presence|esports|tournament/i,
  BACKGROUND: /cdn|asset|resource|patch|update|media|content|download|file|static|img|banner|skin|cosmetic|voice|audio|video|animation/i,
  SECURITY:   /anticheat|verify|shield|ban|security|report|compliance/i
};

function classify(url,host){
  var input = url + host;
  for (var key in PRIORITY){
    if (PRIORITY[key].test(input)) return key;
  }
  return "UNKNOWN";
}

// ================= MAIN =================
function FindProxyForURL(url, host){
  host = norm(host.toLowerCase());
  url  = url.toLowerCase();

  if (!isPUBG(host, url)) return DIRECT;

  var ip = dnsResolve(host);

  // block IPv6 or DNS fail
  if (!ip || ip.indexOf(":") > -1) return BLOCK;

  // enforce IPv4 validity + public-ness
  if (!isPublicIPv4(ip)) return BLOCK;

  // enforce Jordan IP ranges
  if (!isInJordan(ip)) return BLOCK;

  var mode = classify(url, host);

  // ================= MATCH =================
  if (mode === "CRITICAL"){
    // lock to /24 (first 3 octets)
    var parts = ip.split(".");
    var net24 = parts[2] + "." + parts[3];

    if (!SESSION.matchNet24){
      SESSION.matchNet24 = net24;
      SESSION.matchHost  = host;
    } else {
      // (optional) host lock is strict; keep if you really want it
      if (host !== SESSION.matchHost) return BLOCK;
      if (net24 !== SESSION.matchNet24) return BLOCK;
    }

    return MATCH_PROXY;
  }

  if (mode === "SECURITY") return DIRECT;

  return LOBBY_PROXY;
}
