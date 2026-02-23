// ============================================================
// PUBG MOBILE — Jordan Lock v11 (EXTENDED ACTIVE JO RANGES)
// + YouTube & GitHub Fully Excluded
// ============================================================

// ================= PROXIES =================
var MATCH_PROXY = "PROXY 46.185.131.218:20001";
var LOBBY_PROXY = "PROXY 2.59.53.74:443";

var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ================= SESSION LOCK =================
var SESSION = {
  matchNet: null,
  matchHost: null,
  locked: false
};

// ================= HELPERS =================
function norm(h){
  var i = h.indexOf(":");
  return i > -1 ? h.substring(0,i) : h;
}

function isIPv6(ip){
  return ip.indexOf(":") > -1;
}

// ================= FULL YOUTUBE EXCLUSION =================
function isYouTube(host){
  return shExpMatch(host, "*.youtube.com") ||
         shExpMatch(host, "*.googlevideo.com") ||
         shExpMatch(host, "youtu.be") ||
         shExpMatch(host, "*.ytimg.com") ||
         shExpMatch(host, "*.youtube-nocookie.com");
}

// ================= FULL GITHUB EXCLUSION =================
function isGitHub(host){
  return shExpMatch(host, "github.com") ||
         shExpMatch(host, "*.github.com") ||
         shExpMatch(host, "*.githubusercontent.com") ||
         shExpMatch(host, "raw.githubusercontent.com") ||
         shExpMatch(host, "*.githubassets.com") ||
         shExpMatch(host, "api.github.com");
}

// ================= JORDAN RANGES =================
function isJordanIP(ip){

  var nets = [
  ["37.202.64.0","255.255.192.0"],  // /18
  ["46.185.128.0","255.255.128.0"], // /17
  ["46.32.96.0","255.255.224.0"],   // /19
  ["37.123.64.0","255.255.224.0"],  // /19
  ["46.23.112.0","255.255.240.0"],  // /20
  ["37.75.144.0","255.255.248.0"],  // /21
  ["5.45.128.0","255.255.240.0"],   // /20
  ["5.198.240.0","255.255.248.0"],  // /21
  ["5.199.184.0","255.255.252.0"],  // /22
  ["2.59.52.0","255.255.252.0"],    // /22
  ["45.142.196.0","255.255.252.0"], // /22
  ["57.83.24.0","255.255.248.0"],   // /21
  ["62.72.160.0","255.255.224.0"]   // /19 (جزء منها)

  ];

  for(var i=0;i<nets.length;i++){
    if(isInNet(ip,nets[i][0],nets[i][1]))
      return true;
  }
  return false;
}

// ================= GULF =================
function isGulfIP(ip){
  var gulf = [
    ["37.205.0.0","255.255.0.0"],
    ["2.50.0.0","255.254.0.0"],
    ["37.36.0.0","255.255.0.0"]
  ];

  for(var i=0;i<gulf.length;i++){
    if(isInNet(ip,gulf[i][0],gulf[i][1]))
      return true;
  }
  return false;
}

function isPUBG(h,u){
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite/i.test(h+u);
}

// ================= TRAFFIC CLASSIFIER =================
var PRIORITY = {
  CRITICAL: /match|battle|classic|ranked|arena|tdm|erangel|livik|miramar|sanhok|vikendi|payload|metro|royale/i,
  SECURITY: /anticheat|verify|shield|security|ban/i,
  LOBBY:    /lobby|matchmaking|queue|login|auth|region|dispatch|gateway/i
};

function classify(url,host){
  var input = url + host;
  for(var k in PRIORITY){
    if(PRIORITY[k].test(input))
      return k;
  }
  return "OTHER";
}

// ================= MAIN =================
function FindProxyForURL(url, host){

  host = norm(host.toLowerCase());
  url  = url.toLowerCase();

  if(isYouTube(host))
    return DIRECT;

  if(isGitHub(host))
    return DIRECT;

  if(!isPUBG(host,url))
    return DIRECT;

  var ip = dnsResolve(host);

  if(!ip || isIPv6(ip))
    return BLOCK;

  var mode = classify(url,host);

  if(isJordanIP(ip)){

    if(mode === "CRITICAL"){

      var net24 = ip.split('.').slice(0,3).join('.');

      if(!SESSION.locked){
        SESSION.matchNet  = net24;
        SESSION.matchHost = host;
        SESSION.locked    = true;
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

  if(isGulfIP(ip)){
    if(mode === "CRITICAL")
      return BLOCK;
    return LOBBY_PROXY;
  }

  return BLOCK;
}
