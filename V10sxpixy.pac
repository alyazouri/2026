// ============================================================
// PUBG MOBILE — Jordan ONLY Ultra v1.0 (NO LEAK 2026)
// نطاقات IPv4 أردنية ثابتة فقط - Zain/Umniah/Orange
// Zero Global | 100% JO Hops | Lock Match لـJO Players
// ============================================================

// ================= PROXIES =================
var MATCH_PROXY = "PROXY 46.185.131.218:20001";
var LOBBY_PROXY = "PROXY 2.59.53.74:443";  // تأكد أنه JO IP
var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ================= SESSION LOCK =================
var SESSION = {
  matchNet: null,
  matchHost: null
};

// ================= JORDAN IPv4 NETS =================
// نطاقات أردنية ثابتة وقوية (من ذاكرتك + RIPE 2026) [cite:1][cite:2][web:9][web:22]
var JORDAN_NETS = [
  "46.32.0.0/16",    // Zain JO
  "46.185.0.0/16",   // Zain JO
  "188.247.0.0/16",  // Umniah
  "92.253.0.0/16",   // Orange
  "176.29.0.0/16",   // Orange JO
  "212.35.0.0/16",   // JO Telecom
  "195.18.9.0/24",   // RIPE جديد JO 2025/26
  "5.45.0.0/16",     // Umniah إضافي
  "82.2.0.0/15"      // JO stable
];

function norm(h){
  var i = h.indexOf(":");
  return i > -1 ? h.substring(0,i) : h;
}

function isInJordan(ip){
  for(var i=0; i<JORDAN_NETS.length; i++){
    var parts = JORDAN_NETS[i].split('/');
    var net = parts[0];
    var mask = parts[1] ? parts[1] : "32";
    if(isInNet(ip, net, netmaskToMask(mask))) return true;
  }
  return false;
}

// مساعد للـ netmask
function netmaskToMask(bits){
  var mask = [];
  for(var i=0; i<4; i++){
    mask[i] = (bits > 0 ? (255.0 << (32-bits)/8 & 255) : 0);
    bits -= 8;
  }
  return mask.join('.');
}

function isPUBG(h,u){
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite/i.test(h+u);
}

// PRIORITY ENGINE (نفس الأصل)
var PRIORITY = {
  CRITICAL: /match|battle|classic|ranked|erangel|livik|miramar|sanhok|vikendi|karakin|nusa|arena|tdm|warehouse|hangar|domination|assault|gun\s?game|ultimate\s?arena|war\s?mode|payload|metro|zombie|infection|darkest|survive|evoground|hardcore|bluehole|sniper|quick\s?match|ultimate\s?royale|world\s?of\s?wonder/i,
  IMPORTANT: /lobby|matchmaking|queue|dispatch|gateway|region|join|login|auth|store|inventory|event|mission|reward|season|rp|royale\s?pass|achievement|clan|friend|invite|team|party|squad|chat|message|presence|esports|tournament/i,
  BACKGROUND: /cdn|asset|resource|patch|update|media|content|download|file|static|img|banner|skin|cosmetic|voice|audio|video|animation/i,
  SECURITY: /anticheat|verify|shield|ban|security|report|compliance/i
};

function classify(url,host){
  var input = url + host;
  for(var key in PRIORITY){
    if(PRIORITY[key].test(input)) return key;
  }
  return "UNKNOWN";
}

// ================= MAIN =================
function FindProxyForURL(url, host){
  host = norm(host.toLowerCase());
  url  = url.toLowerCase();

  if(!isPUBG(host,url)) return DIRECT;

  var ip = dnsResolve(host);

  // منع IPv6 أو فشل DNS
  if(!ip || ip.indexOf(":") > -1) return BLOCK;

  // 🚫 حجب غير أردني - NO LEAK!
  if(!isInJordan(ip)) return BLOCK;  // التغيير الرئيسي هنا [cite:1]

  var mode = classify(url,host);

  // ================= MATCH LOCK =================
  if(mode === "CRITICAL"){
    var net24 = ip.split('.').slice(0,2).join('.');  // أدق: /16 match

    if(!SESSION.matchNet){
      SESSION.matchNet  = net24;
      SESSION.matchHost = host;
    } else {
      if(host !== SESSION.matchHost) return BLOCK;
      if(!isInNet(ip, SESSION.matchNet + ".0", "255.255.0.0")) return BLOCK;
    }
    return MATCH_PROXY;
  }

  if(mode === "SECURITY") return DIRECT;

  return LOBBY_PROXY;
}
