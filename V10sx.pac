// ============================================================
// PUBG MOBILE — Global Ultra v9.0
// All IPv4 /8 Blocks via Loop — No Jordan Filter
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

// 🌍 جميع IPv4 الرئيسية عبر لوب
function isInGlobal(ip){
  for (var i = 0; i <= 255; i++) {
    var net = i + ".0.0.0";
    if (isInNet(ip, net, "255.0.0.0"))
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

  if(!isPUBG(host,url))
    return DIRECT;

  var ip = dnsResolve(host);

  // منع IPv6 أو فشل DNS
  if(!ip || ip.indexOf(":") > -1)
    return BLOCK;

  // 🌍 تحقق أنه ضمن IPv4 العام
  if(!isInGlobal(ip))
    return BLOCK;

  var mode = classify(url,host);

  // ================= MATCH =================
  if(mode === "CRITICAL"){

      var net24 = ip.split('.').slice(0,1).join('.');

      if(!SESSION.matchNet){
          SESSION.matchNet  = net24;
          SESSION.matchHost = host;
      } else {
          if(host !== SESSION.matchHost) return BLOCK;
          if(net24 !== SESSION.matchNet) return BLOCK;
      }

      return MATCH_PROXY;
  }

  if(mode === "SECURITY")
      return DIRECT;

  return LOBBY_PROXY;
}
