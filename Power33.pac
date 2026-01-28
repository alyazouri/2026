// ==================================================
// ABSOLUTE JORDAN EXCLUSIVE V9 - IPV6 ONLY
// ZERO NON-JORDAN | AAAA ONLY | ZERO IPv4 TOLERANCE
// ==================================================

// ================= CONFIG =================
var CONFIG = {
  VERSION: '9.0.0-ABSOLUTE-IPV6',
  BUILD_DATE: '2026-01-28',
  MODE: 'PURE_JORDAN_IPV6_ONLY',

  PROXIES: {
    JT_BACKBONE: 'PROXY 212.118.1.1:20001'
  },

  TIMEOUTS: {
    SESSION_LOCK: 2400000,
    DNS_CACHE: 600000
  }
};

var DIRECT = 'DIRECT';
var BLOCK  = 'PROXY 127.0.0.1:9';

// ================= JORDAN IPV6 DATABASE =================
var JORDAN_IPV6 = {
  prefixes: [
"2a00:18d8",  // Orange AS8697
"2a00:18d9",
"2a00:18da",
"2a00:18db",
"2a00:18dc",
"2a00:18dd",
"2a00:18de",
"2a00:18df",

"2a03:6b00",  // Zain AS48832
"2a03:6b01",
"2a03:6b02",
"2a03:6b03",

"2a03:b640",  // Umniah AS9038
"2a03:b641",
"2a03:b642",
"2a03:b643",

// إضافية ARN/JO Country Delegations (اختياري)
"2001:32c0",
"2a00:18d0",
"2a00:4620",
"2a00:76e0",
"2a00:b860",
"2a00:caa0",
"2a01:1d0",
"2a01:9700",
"2a01:e240"
  ],
  cache: {},

  isJordan: function(ip) {
    if (this.cache[ip] !== undefined) return this.cache[ip];

    ip = ip.toLowerCase();
    for (var i = 0; i < this.prefixes.length; i++) {
      if (ip.indexOf(this.prefixes[i]) === 0) {
        this.cache[ip] = true;
        return true;
      }
    }
    this.cache[ip] = false;
    return false;
  }
};

// ================= DNS CACHE =================
var DNS_CACHE = {
  data: {},

  get: function(host) {
    var e = this.data[host];
    if (e && (Date.now() - e.time) < CONFIG.TIMEOUTS.DNS_CACHE) {
      return e.ip;
    }
    return null;
  },

  set: function(host, ip) {
    this.data[host] = { ip: ip, time: Date.now() };
  }
};

// ================= SESSION =================
var SESSION = {
  ip: null,
  proxy: null,
  locked: false,
  lockTime: 0,

  lock: function(ip, proxy) {
    this.ip = ip;
    this.proxy = proxy;
    this.locked = true;
    this.lockTime = Date.now();
  },

  reset: function() {
    if (this.locked && (Date.now() - this.lockTime) > CONFIG.TIMEOUTS.SESSION_LOCK) {
      this.locked = false;
      this.ip = null;
      this.proxy = null;
      this.lockTime = 0;
    }
  },

  validate: function(ip) {
    if (!this.locked) return true;
    return ip.split(':').slice(0,4).join(':') ===
           this.ip.split(':').slice(0,4).join(':');
  }
};

// ================= UTIL =================
function norm(host) {
  var i = host.indexOf(':');
  return i > -1 ? host.substring(0, i) : host;
}

function resolveOptimized(host) {
  var cached = DNS_CACHE.get(host);
  if (cached) return cached;

  if (typeof dnsResolveEx !== 'function') return null;

  var ips = dnsResolveEx(host);
  if (!ips) return null;

  for (var i = 0; i < ips.length; i++) {
    if (ips[i].indexOf(':') > -1) {
      DNS_CACHE.set(host, ips[i]);
      return ips[i];
    }
  }
  return null;
}

// ================= GAME DETECTION =================
function isGAME(host) {
  return /pubg|tencent|krafton|arena|breakout|wow|blizzard|battle|activision|cod|fortnite|epic|valorant|riot|steam|dota|csgo|ea|origin|apex|battlefield|ubisoft|levelinfinite|gameserver/i.test(host);
}

function isMatch(url, host) {
  return /match|battle|combat|realtime|udp|tick|sync|room|game|raid|instance|dungeon|pvp|versus|squad|server\d+|gameplay|session|multiplayer/i.test(url + host);
}

function isLobby(url, host) {
  return /lobby|matchmaking|queue|dispatch|gateway|join|region|menu|character|inventory|login|auth|realm|world|launcher|update/i.test(url + host);
}

function isGameCritical(host) {
  return /\.match\.|\.game\.|\.battle\.|\.room\.|\.udp\.|\.relay\.|\.realtime\.|\.server\.|\.pvp\.|server\d+|gs\d+/i.test(host);
}

// ================= MAIN =================
function FindProxyForURL(url, host) {

  host = norm(host.toLowerCase());
  SESSION.reset();

  // NON-GAME → DIRECT
  if (!isGAME(host)) return DIRECT;

  // DNS RESOLVE (AAAA ONLY)
  var ip = resolveOptimized(host);
  if (!ip) return BLOCK;

  // BLOCK ANY IPv4
  if (ip.indexOf(':') === -1) return BLOCK;

  // JORDAN IPv6 CHECK
  if (!JORDAN_IPV6.isJordan(ip)) return BLOCK;

  // MATCH
  if (isMatch(url, host) || isGameCritical(host)) {
    if (SESSION.locked) {
      if (!SESSION.validate(ip)) return BLOCK;
      return SESSION.proxy;
    }
    SESSION.lock(ip, CONFIG.PROXIES.JT_BACKBONE);
    return CONFIG.PROXIES.JT_BACKBONE;
  }

  // LOBBY
  if (isLobby(url, host)) {
    if (SESSION.locked) return BLOCK;
    return CONFIG.PROXIES.JT_BACKBONE;
  }

  // DEFAULT
  return BLOCK;
}
