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
    // 🔥 Orange Jordan
    ["82.212.0.0","255.255.0.0"],
    ["82.212.64.0","255.255.192.0"],
    ["86.108.0.0","255.255.0.0"],

    // 🔥 Zain Jordan
    ["176.241.0.0","255.255.0.0"],
    ["176.28.0.0","255.255.0.0"],
    ["37.75.128.0","255.255.128.0"],

    // 🔥 Umniah
    ["185.66.224.0","255.255.252.0"],
    ["185.17.88.0","255.255.252.0"],

    // 🔥 Batelco Jordan
    ["89.108.128.0","255.255.128.0"],

    // 🔥 Damamax
    ["92.253.0.0","255.255.0.0"],

    // 🔥 Jordan Data Communications
    ["87.236.232.0","255.255.248.0"],

    // 🔥 VTEL / Kulacom
    ["213.6.192.0","255.255.224.0"],

    // 🔥 Local Data Centers
    ["193.188.64.0","255.255.192.0"],
    ["195.47.192.0","255.255.192.0"]

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
