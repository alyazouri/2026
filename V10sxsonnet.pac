// ============================================================
// PUBG MOBILE — Jordan-Only v9.1
// Traffic locked to Jordan IPs — No external leak
// ============================================================

// ================= PROXIES =================
var MATCH_PROXY = "PROXY 46.185.131.218:20001";
var LOBBY_PROXY = "PROXY 2.59.53.74:443";

var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ================= SESSION LOCK =================
var SESSION = {
  matchNet: null,
  matchHost: null
};

// ================= HELPERS =================

function norm(h){
  var i = h.indexOf(":");
  return i > -1 ? h.substring(0,i) : h;
}

// 🇯🇴 نطاقات الأردن فقط (ARIN/RIPE المخصصة للأردن)
function isJordanIP(ip){
  var jordanNets = [
    ["37.98.0.0",    "255.254.0.0"],
    ["46.185.0.0",   "255.255.0.0"],
    ["62.3.0.0",     "255.255.0.0"],
    ["91.74.0.0",    "255.254.0.0"],
    ["94.142.128.0", "255.255.128.0"],
    ["176.29.0.0",   "255.255.0.0"],
    ["178.238.0.0",  "255.255.0.0"],
    ["185.2.32.0",   "255.255.224.0"],
    ["185.83.28.0",  "255.255.252.0"],
    ["188.247.0.0",  "255.255.0.0"],
    ["194.9.0.0",    "255.255.0.0"],
    ["195.47.0.0",   "255.255.0.0"],
    ["212.118.0.0",  "255.255.0.0"],
    ["2.59.48.0",    "255.255.252.0"],
    ["5.0.0.0",      "255.255.0.0"],
    ["109.224.0.0",  "255.252.0.0"]
  ];

  for(var i = 0; i < jordanNets.length; i++){
    if(isInNet(ip, jordanNets[i][0], jordanNets[i][1]))
      return true;
  }
  return false;
}

function isPUBG(h,u){
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite/i.test(h+u);
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
  for(var key in PRIORITY){
    if(PRIORITY[key].test(input))
      return key;
  }
  return "UNKNOWN";
}

// ================= MAIN =================
function FindProxyForURL(url, host){

  host = norm(host.toLowerCase());
  url  = url.toLowerCase();

  if(!isPUBG(host, url))
    return DIRECT;

  var ip = dnsResolve(host);

  // منع IPv6 أو فشل DNS
  if(!ip || ip.indexOf(":") > -1)
    return BLOCK;

  // 🇯🇴 السماح فقط لـ IPs الأردنية
  if(!isJordanIP(ip))
    return BLOCK;  // ← هنا يُمنع أي تسريب خارج الأردن

  var mode = classify(url, host);

  // ================= MATCH =================
  if(mode === "CRITICAL"){

    var net24 = ip.split('.').slice(0,2).join('.');

    if(!SESSION.matchNet){
      SESSION.matchNet  = net24;
      SESSION.matchHost = host;
    } else {
      if(host !== SESSION.matchHost) return BLOCK;
      if(net24  !== SESSION.matchNet) return BLOCK;
    }

    return MATCH_PROXY;
  }

  if(mode === "SECURITY")
    return DIRECT;

  return LOBBY_PROXY;
}
