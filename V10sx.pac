// ============================================================
// PUBG MOBILE — Jordan Ultra Gaming Clean v8.0
// HARD LOCK: Jordan Backbone Only — Zero Europe Leak
// ============================================================

// ================= PROXIES =================
var MATCH_PROXY = "PROXY 46.185.131.218:20001";
var LOBBY_PROXY = "PROXY 2.59.53.74:443";

var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ================= JORDAN CORE BACKBONE ONLY =================
var JORDAN_IP_RANGES = [

  ["37.252.0.0","255.255.0.0"],   // Orange Fiber Core
  ["94.127.0.0","255.255.0.0"],   // Orange Core
  ["176.29.0.0","255.255.0.0"],   // Zain Core 4G/5G
  ["176.57.0.0","255.255.0.0"],   // Umniah Fiber Core
  ["46.185.128.0","255.255.128.0"] // Secure Jordan 46 Block

];

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

function isInJordan(ip){
  for(var i=0;i<JORDAN_IP_RANGES.length;i++){
    if(isInNet(ip, JORDAN_IP_RANGES[i][0], JORDAN_IP_RANGES[i][1]))
      return true;
  }
  return false;
}

function isPUBG(h,u){
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite/i.test(h+u);
}

// ================= MODE PRIORITY ENGINE =================
var PRIORITY = {

  CRITICAL: /match|battle|classic|ranked|erangel|livik|miramar|sanhok|vikendi|karakin|nusa|arena|tdm|warehouse|hangar|domination|assault|gun\s?game|ultimate\s?arena|war\s?mode|payload|metro|zombie|infection|darkest|survive|evoground|hardcore|bluehole|sniper|quick\s?match|ultimate\s?royale|world\s?of\s?wonder/i,

  IMPORTANT: /lobby|matchmaking|queue|dispatch|gateway|region|join|login|auth|store|inventory|event|mission|reward|season|rp|royale\s?pass|achievement|clan|friend|invite|team|party|squad|chat|message|presence|esports|tournament/i,

  BACKGROUND: /cdn|asset|resource|patch|update|media|content|download|file|static|img|banner|skin|cosmetic|voice|audio|video|animation/i,

  SECURITY: /anticheat|verify|shield|ban|security|report|compliance/i
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

  // غير PUBG → مباشر
  if(!isPUBG(host,url))
    return DIRECT;

  var ip = dnsResolve(host);

  // منع IPv6 أو فشل DNS
  if(!ip || ip.indexOf(":") > -1)
    return BLOCK;

  // 🔒 الأردن فقط — أي IP خارج القائمة = Block
  if(!isInJordan(ip))
    return BLOCK;

  var mode = classify(url,host);

  // ================= MATCH =================
  if(mode === "CRITICAL"){

    var net24 = ip.split('.').slice(0,3).join('.');

    if(!SESSION.matchNet){
      SESSION.matchNet  = net24;
      SESSION.matchHost = host;
    } else {
      if(host !== SESSION.matchHost) return BLOCK;
      if(net24 !== SESSION.matchNet) return BLOCK;
    }

    return MATCH_PROXY;
  }

  // ================= SECURITY =================
  if(mode === "SECURITY"){
    return DIRECT;
  }

  // ================= LOBBY / CDN / OTHER =================
  return LOBBY_PROXY;
}
