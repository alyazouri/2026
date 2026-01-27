// ==========================================
// 🇯🇴 PUBG MOBILE - MILITARY GRADE PAC
// DNS-Agnostic Routing with Traffic Fingerprinting
// Specialized for Cloudflare DNS (1.1.1.1/1.0.0.1)
// ==========================================

// ============ INFRASTRUCTURE ============
var PROXY_TIER = {
  // Match Servers (Ultra Performance)
  MATCH_CORE: [
    "PROXY 46.185.131.218:20001",    // Orange Primary - عمّان
    "PROXY 213.6.100.50:20001",       // Fiber Backbone
    "PROXY 176.29.50.100:20001"       // Orange Secondary
  ],
  
  // Lobby & Matchmaking (High Availability)
  LOBBY_PRIME: [
    "PROXY 212.35.66.45:8085",        // Premium Pool 1
    "PROXY 212.35.66.45:8181",        // Premium Pool 2
    "PROXY 46.185.131.218:443",       // Orange HA
    "PROXY 176.28.200.10:8080"        // Orange Backup
  ],
  
  // Social & Friends (Optimized for persistence)
  SOCIAL_POOL: [
    "PROXY 176.29.15.20:3128",        // Zain Social
    "PROXY 185.4.16.50:3128",         // Zain Backup
    "PROXY 94.249.10.30:3128"         // Umniah Social
  ],
  
  // Team/Squad Formation (Low latency)
  TEAM_POOL: [
    "PROXY 46.185.140.10:8080",       // Orange Team Server
    "PROXY 37.202.80.20:8080",        // Zain Team Server
    "PROXY 31.44.50.15:8080"          // Umniah Team
  ],
  
  // Voice Chat (UDP Priority)
  VOICE_POOL: [
    "PROXY 213.6.80.40:8088",         // Fiber Voice
    "PROXY 82.212.90.25:8088"         // Orange Voice
  ]
};

var DIRECT = "DIRECT";
var BLACKHOLE = "PROXY 127.0.0.1:9";

// ============ JORDAN IP DATABASE - COMPREHENSIVE ============
var JORDAN_RANGES = {
  // Tier 1: Fiber & Premium Business
  FIBER_PREMIUM: [
    {range: ["213.6.0.0", "213.6.255.255"], isp: "Batelco-Fiber", priority: 100},
    {range: ["82.212.64.0", "82.212.127.255"], isp: "Orange-Business", priority: 95},
    {range: ["46.185.128.0", "46.185.159.255"], isp: "Orange-Fiber", priority: 95}
  ],
  
  // Tier 2: Premium Residential
  PREMIUM_HOME: [
    {range: ["46.185.160.0", "46.185.255.255"], isp: "Orange-Premium", priority: 90},
    {range: ["176.28.128.0", "176.28.255.255"], isp: "Orange-VDSL", priority: 85},
    {range: ["176.29.0.0", "176.29.255.255"], isp: "Orange-Home", priority: 85},
    {range: ["37.202.64.0", "37.202.127.255"], isp: "Zain-Premium", priority: 85},
    {range: ["94.249.0.0", "94.249.127.255"], isp: "Umniah-Corp", priority: 85}
  ],
  
  // Tier 3: Standard ISPs
  STANDARD: [
    {range: ["31.44.0.0", "31.44.255.255"], isp: "Umniah", priority: 75},
    {range: ["185.4.16.0", "185.4.19.255"], isp: "Zain-LTE", priority: 70},
    {range: ["185.12.72.0", "185.12.75.255"], isp: "MikroTik-JO", priority: 65},
    {range: ["185.96.84.0", "185.96.87.255"], isp: "Wireless-ISP", priority: 60}
  ],
  
  // Complete Jordan Coverage
  ALL_RANGES: [
    ["2.59.52.0", "2.59.55.255"],
    ["5.45.128.0", "5.45.143.255"],
    ["5.198.240.0", "5.198.247.255"],
    ["5.199.184.0", "5.199.187.255"],
    ["31.44.0.0", "31.44.255.255"],
    ["37.17.192.0", "37.17.207.255"],
    ["37.44.32.0", "37.44.39.255"],
    ["37.75.144.0", "37.75.151.255"],
    ["37.123.64.0", "37.123.95.255"],
    ["37.152.0.0", "37.152.7.255"],
    ["37.202.64.0", "37.202.127.255"],
    ["37.220.112.0", "37.220.127.255"],
    ["37.252.222.0", "37.252.222.255"],
    ["45.142.196.0", "45.142.199.255"],
    ["46.23.112.0", "46.23.127.255"],
    ["46.32.96.0", "46.32.127.255"],
    ["46.185.128.0", "46.185.255.255"],
    ["46.248.192.0", "46.248.223.255"],
    ["62.72.160.0", "62.72.191.255"],
    ["77.245.0.0", "77.245.15.255"],
    ["79.134.128.0", "79.134.159.255"],
    ["80.10.8.0", "80.10.39.255"],
    ["80.10.48.0", "80.10.79.255"],
    ["80.10.144.0", "80.10.151.255"],
    ["80.10.168.0", "80.10.175.255"],
    ["80.90.160.0", "80.90.175.255"],
    ["81.21.0.0", "81.21.0.255"],
    ["81.21.8.0", "81.21.15.255"],
    ["81.28.112.0", "81.28.127.255"],
    ["81.52.144.0", "81.52.159.255"],
    ["81.52.224.0", "81.52.231.255"],
    ["81.253.96.0", "81.253.99.255"],
    ["81.253.240.0", "81.253.255.255"],
    ["82.212.64.0", "82.212.127.255"],
    ["94.249.0.0", "94.249.127.255"],
    ["176.28.128.0", "176.28.255.255"],
    ["176.29.0.0", "176.29.255.255"],
    ["185.4.16.0", "185.4.19.255"],
    ["185.12.72.0", "185.12.75.255"],
    ["185.20.200.0", "185.20.203.255"],
    ["185.24.84.0", "185.24.87.255"],
    ["185.33.24.0", "185.33.27.255"],
    ["185.40.188.0", "185.40.191.255"],
    ["185.51.200.0", "185.51.203.255"],
    ["185.61.136.0", "185.61.139.255"],
    ["185.96.84.0", "185.96.87.255"],
    ["185.118.4.0", "185.118.7.255"],
    ["185.137.248.0", "185.137.251.255"],
    ["185.152.68.0", "185.152.71.255"],
    ["185.180.28.0", "185.180.31.255"],
    ["185.194.124.0", "185.194.127.255"],
    ["213.6.0.0", "213.6.255.255"]
  ]
};

// ============ PUBG MOBILE - COMPLETE TRAFFIC CLASSIFICATION ============

var PUBG_TRAFFIC = {
  
  // ========== MATCH & GAMEPLAY ==========
  MATCH_SERVER: {
    patterns: [
      // Core match servers
      /match.*server/i, /battle.*server/i, /game.*server/i, /combat.*server/i,
      /arena.*server/i, /room.*server/i, /session.*server/i, /instance/i,
      
      // Gameplay protocols
      /realtime/i, /sync/i, /tick/i, /state/i, /world/i, /physics/i,
      /gameplay/i, /pvp/i, /versus/i, /competitive/i,
      
      // Network protocols
      /udp/i, /quic/i, /kcp/i, /udt/i, /dtls/i, /stun/i, /turn/i,
      
      // Tencent-specific
      /gcloud.*match/i, /gvoice.*game/i, /intl.*game.*server/i,
      /level.*infinite.*game/i, /proximabeta.*match/i,
      
      // Ports & endpoints
      /:10[0-9]{3}/i, /:20[0-9]{3}/i, /:30[0-9]{3}/i,  // Game ports
      /\/game\//i, /\/match\//i, /\/battle\//i, /\/room\//i
    ],
    proxy: "MATCH_CORE",
    priority: 1000,
    jordanOnly: true,
    description: "Live gameplay - requires ultra-low latency"
  },
  
  // ========== MATCHMAKING & QUEUE ==========
  MATCHMAKING: {
    patterns: [
      // Matchmaking services
      /matchmak/i, /mm.*serv/i, /queue/i, /waiting/i, /lobby.*match/i,
      /find.*match/i, /search.*match/i, /join.*match/i,
      
      // Queue management
      /ready.*check/i, /accept.*match/i, /cancel.*queue/i,
      /queue.*status/i, /wait.*time/i, /estimated.*time/i,
      
      // Regional matchmaking
      /region.*select/i, /server.*select/i, /area.*match/i,
      /dispatch.*match/i, /gateway.*match/i,
      
      // Tencent matchmaking
      /tss.*match/i, /apollo.*match/i, /gcloud.*mm/i,
      
      // API endpoints
      /\/matchmaking\//i, /\/mm\//i, /\/queue\//i, /\/lobby\/match/i,
      /\/search\/match/i, /\/find\/game/i
    ],
    proxy: "LOBBY_PRIME",
    priority: 900,
    jordanOnly: true,
    description: "Matchmaking queue - critical for finding Jordan players"
  },
  
  // ========== TEAM & SQUAD FORMATION ==========
  TEAM_SQUAD: {
    patterns: [
      // Squad/Team features
      /squad/i, /team/i, /party/i, /group/i, /crew/i,
      /duo/i, /trio/i, /quad/i, /foursome/i,
      
      // Team operations
      /create.*team/i, /join.*team/i, /invite.*team/i,
      /leave.*team/i, /disband/i, /kick.*member/i,
      /team.*ready/i, /team.*status/i, /team.*sync/i,
      
      // Team matchmaking
      /team.*match/i, /squad.*match/i, /group.*queue/i,
      /party.*finder/i, /looking.*for.*group/i, /lfg/i,
      
      // Voice coordination
      /team.*voice/i, /squad.*chat/i, /party.*audio/i,
      
      // API endpoints
      /\/team\//i, /\/squad\//i, /\/party\//i, /\/group\//i,
      /\/crew\//i, /\/formation\//i
    ],
    proxy: "TEAM_POOL",
    priority: 850,
    jordanOnly: true,
    description: "Team/Squad formation - keeps Jordanians together"
  },
  
  // ========== RECRUIT & LFG (LOOKING FOR GROUP) ==========
  RECRUIT_LFG: {
    patterns: [
      // Recruitment system
      /recruit/i, /recruitment/i, /hire/i, /looking.*for/i,
      /need.*player/i, /find.*player/i, /player.*search/i,
      
      // LFG features
      /lfg/i, /lfm/i, /looking.*group/i, /looking.*member/i,
      /seek.*team/i, /join.*squad/i, /available.*player/i,
      
      // Quick join
      /quick.*join/i, /auto.*match/i, /random.*team/i,
      /fill.*squad/i, /public.*team/i,
      
      // Room codes
      /room.*code/i, /custom.*room/i, /private.*room/i,
      /join.*code/i, /enter.*code/i,
      
      // API endpoints
      /\/recruit\//i, /\/lfg\//i, /\/lfm\//i, /\/player-search\//i,
      /\/quick-join\//i, /\/auto-team\//i
    ],
    proxy: "TEAM_POOL",
    priority: 840,
    jordanOnly: true,
    description: "Recruitment & LFG - finds Jordan teammates"
  },
  
  // ========== FRIENDS & SOCIAL ==========
  FRIENDS_SOCIAL: {
    patterns: [
      // Friends system
      /friend/i, /buddy/i, /contact/i, /companion/i,
      /add.*friend/i, /remove.*friend/i, /block.*friend/i,
      /friend.*request/i, /friend.*list/i, /friend.*status/i,
      
      // Social features
      /social/i, /community/i, /network/i, /connection/i,
      /follower/i, /following/i, /mutual/i,
      
      // Presence & Status
      /presence/i, /online.*status/i, /offline/i, /away/i,
      /playing/i, /in.*game/i, /available/i, /busy/i,
      /last.*seen/i, /activity/i,
      
      // Invitations
      /invite/i, /invitation/i, /request.*join/i,
      /accept.*invite/i, /decline.*invite/i,
      
      // Chat & Messaging
      /message/i, /chat/i, /dm/i, /direct.*message/i,
      /conversation/i, /inbox/i, /whisper/i,
      
      // API endpoints
      /\/friend\//i, /\/social\//i, /\/presence\//i,
      /\/invite\//i, /\/message\//i, /\/chat\//i,
      /\/buddy\//i, /\/contact\//i
    ],
    proxy: "SOCIAL_POOL",
    priority: 800,
    jordanOnly: true,
    description: "Friends & social features - Jordan network"
  },
  
  // ========== CLAN & GUILD ==========
  CLAN_GUILD: {
    patterns: [
      // Clan system
      /clan/i, /guild/i, /alliance/i, /faction/i, /organization/i,
      /create.*clan/i, /join.*clan/i, /leave.*clan/i,
      /clan.*member/i, /clan.*rank/i, /clan.*role/i,
      
      // Clan operations
      /clan.*chat/i, /clan.*message/i, /clan.*announcement/i,
      /clan.*event/i, /clan.*war/i, /clan.*battle/i,
      /clan.*tournament/i, /clan.*leaderboard/i,
      
      // Clan management
      /promote/i, /demote/i, /officer/i, /leader/i,
      /elder/i, /member.*management/i,
      
      // API endpoints
      /\/clan\//i, /\/guild\//i, /\/alliance\//i,
      /\/faction\//i, /\/organization\//i
    ],
    proxy: "SOCIAL_POOL",
    priority: 750,
    jordanOnly: true,
    description: "Clan/Guild - Jordan clans prioritized"
  },
  
  // ========== LOBBY & MAIN MENU ==========
  LOBBY_MAIN: {
    patterns: [
      // Main lobby
      /lobby/i, /main.*menu/i, /home.*screen/i, /hub/i,
      /waiting.*room/i, /preparation/i, /ready.*room/i,
      
      // Lobby services
      /lobby.*server/i, /lobby.*service/i, /entrance/i,
      /gateway/i, /dispatcher/i, /router/i,
      
      // Mode selection
      /mode.*select/i, /game.*mode/i, /classic/i, /arcade/i,
      /evo.*ground/i, /payload/i, /tdm/i, /arena/i,
      
      // Map selection
      /map.*select/i, /erangel/i, /miramar/i, /sanhok/i,
      /vikendi/i, /livik/i, /karakin/i,
      
      // API endpoints
      /\/lobby\//i, /\/main\//i, /\/hub\//i, /\/entrance\//i,
      /\/gateway\//i, /\/dispatch\//i
    ],
    proxy: "LOBBY_PRIME",
    priority: 700,
    jordanOnly: false,  // Lobby can be global
    description: "Main lobby - pre-match area"
  },
  
  // ========== VOICE CHAT ==========
  VOICE_CHAT: {
    patterns: [
      // Voice systems
      /voice/i, /audio/i, /microphone/i, /speaker/i,
      /voice.*chat/i, /team.*voice/i, /squad.*voice/i,
      /all.*voice/i, /proximity.*voice/i,
      
      // Voice protocols
      /rtc/i, /webrtc/i, /opus/i, /g711/i, /g729/i,
      /voice.*codec/i, /audio.*stream/i,
      
      // GVoice (Tencent)
      /gvoice/i, /gme/i, /rtc.*engine/i,
      
      // STUN/TURN for voice
      /stun.*voice/i, /turn.*voice/i, /ice.*voice/i,
      
      // API endpoints
      /\/voice\//i, /\/audio\//i, /\/rtc\//i, /\/gvoice\//i,
      /\/speech\//i, /\/microphone\//i
    ],
    proxy: "VOICE_POOL",
    priority: 850,
    jordanOnly: true,
    description: "Voice chat - requires low latency"
  },
  
  // ========== AUTHENTICATION & LOGIN ==========
  AUTH_LOGIN: {
    patterns: [
      // Authentication
      /auth/i, /login/i, /signin/i, /logon/i,
      /authenticate/i, /credential/i, /password/i,
      
      // Account systems
      /account/i, /profile/i, /user.*data/i,
      /passport/i, /identity/i,
      
      // OAuth & SSO
      /oauth/i, /sso/i, /token/i, /jwt/i,
      /access.*token/i, /refresh.*token/i,
      
      // Social login
      /facebook.*login/i, /google.*login/i, /twitter.*login/i,
      /guest.*login/i, /bind.*account/i,
      
      // API endpoints
      /\/auth\//i, /\/login\//i, /\/account\//i,
      /\/oauth\//i, /\/sso\//i, /\/token\//i
    ],
    proxy: "LOBBY_PRIME",
    priority: 950,
    jordanOnly: false,  // Auth can be global
    description: "Authentication - account login"
  },
  
  // ========== INVENTORY & ITEMS ==========
  INVENTORY: {
    patterns: [
      // Inventory system
      /inventory/i, /backpack/i, /storage/i, /warehouse/i,
      /item.*list/i, /equipment/i, /gear/i,
      
      // Item operations
      /equip/i, /unequip/i, /use.*item/i, /discard/i,
      /craft/i, /combine/i, /upgrade/i, /enhance/i,
      
      // Shop & Store
      /shop/i, /store/i, /mall/i, /purchase/i,
      /buy/i, /sell/i, /trade/i, /market/i,
      
      // Cosmetics
      /skin/i, /outfit/i, /costume/i, /appearance/i,
      /customization/i, /emote/i, /spray/i,
      
      // API endpoints
      /\/inventory\//i, /\/backpack\//i, /\/shop\//i,
      /\/store\//i, /\/item\//i, /\/equipment\//i
    ],
    proxy: "LOBBY_PRIME",
    priority: 600,
    jordanOnly: false,
    description: "Inventory & items - can be global"
  },
  
  // ========== MISSIONS & ACHIEVEMENTS ==========
  MISSIONS: {
    patterns: [
      // Mission system
      /mission/i, /quest/i, /task/i, /objective/i,
      /daily.*mission/i, /weekly.*mission/i, /season.*mission/i,
      /achievement/i, /challenge/i, /milestone/i,
      
      // Progress tracking
      /progress/i, /completion/i, /reward/i,
      /claim.*reward/i, /collect.*reward/i,
      
      // Battle pass
      /battle.*pass/i, /royale.*pass/i, /season.*pass/i,
      /tier/i, /level.*up/i, /rank.*up/i,
      
      // API endpoints
      /\/mission\//i, /\/quest\//i, /\/task\//i,
      /\/achievement\//i, /\/challenge\//i, /\/reward\//i
    ],
    proxy: "LOBBY_PRIME",
    priority: 550,
    jordanOnly: false,
    description: "Missions & achievements - can be global"
  },
  
  // ========== LEADERBOARDS & RANKINGS ==========
  LEADERBOARD: {
    patterns: [
      // Ranking systems
      /leaderboard/i, /ranking/i, /ladder/i, /tier/i,
      /top.*player/i, /best.*player/i, /scoreboard/i,
      
      // Competitive ranks
      /bronze/i, /silver/i, /gold/i, /platinum/i,
      /diamond/i, /crown/i, /ace/i, /conqueror/i,
      
      // Statistics
      /stats/i, /statistics/i, /kd.*ratio/i, /win.*rate/i,
      /kill.*count/i, /damage/i, /survival.*time/i,
      
      // Season ranking
      /season.*rank/i, /tier.*rank/i, /regional.*rank/i,
      /global.*rank/i, /country.*rank/i,
      
      // API endpoints
      /\/leaderboard\//i, /\/ranking\//i, /\/stats\//i,
      /\/scoreboard\//i, /\/tier\//i
    ],
    proxy: "LOBBY_PRIME",
    priority: 500,
    jordanOnly: false,
    description: "Leaderboards - can be global"
  },
  
  // ========== SPECTATE & REPLAY ==========
  SPECTATE: {
    patterns: [
      // Spectating
      /spectate/i, /watch/i, /observe/i, /view.*game/i,
      /spectator/i, /observer/i,
      
      // Replay system
      /replay/i, /recording/i, /playback/i,
      /saved.*game/i, /match.*replay/i,
      
      // Streaming
      /stream/i, /broadcast/i, /live/i,
      
      // API endpoints
      /\/spectate\//i, /\/watch\//i, /\/replay\//i,
      /\/recording\//i, /\/stream\//i
    ],
    proxy: "LOBBY_PRIME",
    priority: 450,
    jordanOnly: false,
    description: "Spectate & replay - can be global"
  },
  
  // ========== TRAINING & PRACTICE ==========
  TRAINING: {
    patterns: [
      // Training modes
      /training/i, /practice/i, /tutorial/i, /guide/i,
      /training.*ground/i, /shooting.*range/i,
      /cheer.*park/i, /arena.*training/i,
      
      // Bot matches
      /bot.*match/i, /ai.*match/i, /practice.*match/i,
      
      // API endpoints
      /\/training\//i, /\/practice\//i, /\/tutorial\//i,
      /\/guide\//i, /\/bot-match\//i
    ],
    proxy: "LOBBY_PRIME",
    priority: 400,
    jordanOnly: false,
    description: "Training & practice - can be global"
  },
  
  // ========== EVENTS & TOURNAMENTS ==========
  EVENTS: {
    patterns: [
      // Events
      /event/i, /special.*mode/i, /limited.*time/i,
      /collaboration/i, /crossover/i,
      
      // Tournaments
      /tournament/i, /competition/i, /championship/i,
      /esports/i, /pmpl/i, /pmwl/i, /pmgc/i,
      
      // Community events
      /community.*event/i, /clan.*event/i,
      
      // API endpoints
      /\/event\//i, /\/tournament\//i, /\/competition\//i,
      /\/esports\//i, /\/special\//i
    ],
    proxy: "LOBBY_PRIME",
    priority: 650,
    jordanOnly: false,
    description: "Events & tournaments - can be global"
  },
  
  // ========== NEWS & ANNOUNCEMENTS ==========
  NEWS: {
    patterns: [
      // News system
      /news/i, /announcement/i, /notice/i, /bulletin/i,
      /update.*info/i, /patch.*note/i, /what.*new/i,
      
      // Notifications
      /notification/i, /alert/i, /message.*center/i,
      /inbox/i, /mail/i,
      
      // API endpoints
      /\/news\//i, /\/announcement\//i, /\/notice\//i,
      /\/notification\//i, /\/bulletin\//i
    ],
    proxy: "LOBBY_PRIME",
    priority: 350,
    jordanOnly: false,
    description: "News & announcements - can be global"
  },
  
  // ========== ANTI-CHEAT & SECURITY ==========
  ANTICHEAT: {
    patterns: [
      // Anti-cheat systems
      /anticheat/i, /anti.*cheat/i, /security.*check/i,
      /integrity/i, /verification/i, /validation/i,
      
      // Detection systems
      /detect/i, /scan/i, /monitor/i, /surveillance/i,
      /protection/i, /guard/i, /shield/i,
      
      // Tencent specific
      /tencent.*protect/i, /ace.*anticheat/i, /tp.*anti/i,
      
      // API endpoints
      /\/anticheat\//i, /\/security\//i, /\/verify\//i,
      /\/integrity\//i, /\/protection\//i
    ],
    proxy: null,  // Direct to avoid detection
    priority: 1,
    jordanOnly: false,
    description: "Anti-cheat - must appear natural (DIRECT)"
  },
  
  // ========== CDN & ASSETS ==========
  CDN_ASSETS: {
    patterns: [
      // CDN services
      /cdn/i, /content.*delivery/i, /static/i, /cache/i,
      
      // Asset types
      /asset/i, /resource/i, /media/i, /image/i,
      /texture/i, /model/i, /sound/i, /music/i,
      
      // Updates & Patches
      /patch/i, /update/i, /download/i, /hotfix/i,
      /version.*check/i, /manifest/i,
      
      // API endpoints
      /\/cdn\//i, /\/static\//i, /\/asset\//i,
      /\/resource\//i, /\/download\//i, /\/patch\//i
    ],
    proxy: null,  // Direct for speed
    priority: 100,
    jordanOnly: false,
    description: "CDN & assets - direct for optimal speed"
  },
  
  // ========== ANALYTICS & TELEMETRY ==========
  ANALYTICS: {
    patterns: [
      // Analytics
      /analytics/i, /telemetry/i, /metrics/i, /tracking/i,
      /statistics.*collect/i, /data.*collect/i,
      
      // Logging
      /log/i, /logger/i, /report/i, /crash.*report/i,
      /error.*report/i, /bug.*report/i,
      
      // Beacons
      /beacon/i, /ping.*back/i, /heartbeat/i,
      
      // Third-party analytics
      /google.*analytics/i, /firebase/i, /mixpanel/i,
      /amplitude/i, /appsflyer/i,
      
      // API endpoints
      /\/analytics\//i, /\/telemetry\//i, /\/metrics\//i,
      /\/tracking\//i, /\/log\//i, /\/report\//i
    ],
    proxy: null,  // Direct or can be blocked
    priority: 10,
    jordanOnly: false,
    description: "Analytics - can be direct or blocked"
  },
  
  // ========== ADS & MONETIZATION ==========
  ADS: {
    patterns: [
      // Ad services
      /ad[sv]/i, /advertisement/i, /banner/i, /interstitial/i,
      /rewarded.*ad/i, /video.*ad/i,
      
      // Ad networks
      /admob/i, /adsense/i, /doubleclick/i, /unity.*ads/i,
      /vungle/i, /chartboost/i, /ironsource/i,
      
      // API endpoints
      /\/ad[sv]\//i, /\/banner\//i, /\/rewarded\//i,
      /\/monetization\//i
    ],
    proxy: null,  // Can be blocked
    priority: 5,
    jordanOnly: false,
    description: "Ads - can be blocked or direct"
  }
};

// ============ GLOBAL BLACKLIST - COMPREHENSIVE ============
var GLOBAL_BLACKLIST = [
  // China - Complete Block
  ["1.0.0.0", "1.255.255.255"],
  ["14.0.0.0", "14.255.255.255"],
  ["27.0.0.0", "27.255.255.255"],
  ["36.0.0.0", "36.255.255.255"],
  ["39.0.0.0", "39.255.255.255"],
  ["42.0.0.0", "42.255.255.255"],
  ["49.0.0.0", "49.255.255.255"],
  ["58.0.0.0", "63.255.255.255"],  // Mega block
  ["101.0.0.0", "101.255.255.255"],
  ["103.0.0.0", "103.255.255.255"],
  ["106.0.0.0", "106.255.255.255"],
  ["110.0.0.0", "125.255.255.255"],  // Mega block
  ["180.0.0.0", "180.255.255.255"],
  ["182.0.0.0", "183.255.255.255"],
  ["202.0.0.0", "202.255.255.255"],
  ["210.0.0.0", "211.255.255.255"],
  ["218.0.0.0", "223.255.255.255"],  // Mega block
  
  // Russia - Complete Block
  ["5.0.0.0", "5.255.255.255"],
  ["31.0.0.0", "31.43.255.255"],      // Exclude JO 31.44
  ["31.45.0.0", "31.255.255.255"],
  ["37.0.0.0", "37.16.255.255"],      // Exclude JO ranges
  ["37.18.0.0", "37.43.255.255"],
  ["37.45.0.0", "37.74.255.255"],
  ["37.76.0.0", "37.122.255.255"],
  ["37.124.0.0", "37.151.255.255"],
  ["37.153.0.0", "37.201.255.255"],
  ["37.203.0.0", "37.219.255.255"],
  ["37.221.0.0", "37.255.255.255"],
  ["46.0.0.0", "46.22.255.255"],
  ["46.24.0.0", "46.31.255.255"],
  ["46.33.0.0", "46.184.255.255"],    // Exclude JO 46.185
  ["46.186.0.0", "46.247.255.255"],
  ["46.249.0.0", "46.255.255.255"],
  ["77.0.0.0", "77.244.255.255"],
  ["77.246.0.0", "77.255.255.255"],
  ["78.0.0.0", "78.255.255.255"],
  ["79.0.0.0", "79.133.255.255"],
  ["79.135.0.0", "79.255.255.255"],
  ["80.0.0.0", "80.9.255.255"],
  ["80.11.0.0", "80.89.255.255"],
  ["80.91.0.0", "80.255.255.255"],
  ["81.0.0.0", "81.20.255.255"],
  ["81.22.0.0", "81.27.255.255"],
  ["81.29.0.0", "81.51.255.255"],
  ["81.53.0.0", "81.252.255.255"],
  ["81.254.0.0", "81.255.255.255"],
  ["82.0.0.0", "82.211.255.255"],
  ["82.213.0.0", "82.255.255.255"],
  ["83.0.0.0", "83.255.255.255"],
  ["84.0.0.0", "84.255.255.255"],
  ["85.0.0.0", "85.255.255.255"],
  ["86.0.0.0", "86.255.255.255"],
  ["87.0.0.0", "87.255.255.255"],
  ["88.0.0.0", "88.255.255.255"],
  ["89.0.0.0", "89.255.255.255"],
  ["90.0.0.0", "90.255.255.255"],
  ["91.0.0.0", "91.255.255.255"],
  ["92.0.0.0", "92.255.255.255"],
  ["93.0.0.0", "93.255.255.255"],
  ["94.0.0.0", "94.248.255.255"],     // Exclude JO 94.249
  ["94.250.0.0", "94.255.255.255"],
  ["95.0.0.0", "95.255.255.255"],
  ["109.0.0.0", "109.255.255.255"],
  ["176.0.0.0", "176.27.255.255"],    // Exclude JO 176.28-29
  ["176.30.0.0", "176.255.255.255"],
  ["178.0.0.0", "178.255.255.255"],
  ["188.0.0.0", "188.255.255.255"],
  ["213.0.0.0", "213.5.255.255"],     // Exclude JO 213.6
  ["213.7.0.0", "213.255.255.255"],
  
  // Europe - Western
  ["51.0.0.0", "51.255.255.255"],
  ["62.0.0.0", "62.71.255.255"],
  ["62.73.0.0", "62.255.255.255"],
  
  // India
  ["100.0.0.0", "100.255.255.255"],
  ["182.0.0.0", "182.255.255.255"],
  
  // Southeast Asia
  ["102.0.0.0", "102.255.255.255"],
  ["104.0.0.0", "105.255.255.255"],
  ["111.0.0.0", "111.255.255.255"],
  ["112.0.0.0", "112.255.255.255"],
  ["113.0.0.0", "125.255.255.255"],
  
  // South America
  ["177.0.0.0", "177.255.255.255"],
  ["179.0.0.0", "179.255.255.255"],
  ["181.0.0.0", "181.255.255.255"],
  ["186.0.0.0", "191.255.255.255"],
  ["200.0.0.0", "201.255.255.255"],
  
  // Africa (selective)
  ["41.0.0.0", "41.255.255.255"],
  ["102.0.0.0", "102.255.255.255"],
  ["105.0.0.0", "105.255.255.255"],
  ["154.0.0.0", "154.255.255.255"],
  ["196.0.0.0", "197.255.255.255"]
];

// ============ SESSION STATE ============
var SESSION = {
  // Cluster management
  clusters: {},
  clusterCount: 0,
  maxClusters: 10,
  
  // Connection tracking
  connections: {},
  
  // DNS caching
  dnsCache: {},
  
  // Performance metrics
  jordanConnections: 0,
  foreignBlocked: 0,
  
  // Timestamp
  startTime: Date.now()
};

// ============ CORE FUNCTIONS ============
function norm(h) {
  var i = h.indexOf(":");
  return i > -1 ? h.substring(0, i) : h;
}

function isInList(ip, list) {
  for (var i = 0; i < list.length; i++) {
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  }
  return false;
}

function ipToLong(ip) {
  var parts = ip.split('.');
  return ((+parts[0] << 24) + (+parts[1] << 16) + (+parts[2] << 8) + (+parts[3])) >>> 0;
}

function isInRange(ip, range) {
  var ipLong = ipToLong(ip);
  var startLong = ipToLong(range[0]);
  var endLong = ipToLong(range[1]);
  return ipLong >= startLong && ipLong <= endLong;
}

function resolveWithCache(host) {
  if (SESSION.dnsCache[host]) {
    var entry = SESSION.dnsCache[host];
    if (Date.now() - entry.time < 300000) return entry.ip;  // 5min TTL
  }
  
  var ip = dnsResolve(host);
  if (ip && ip.indexOf(":") === -1) {
    SESSION.dnsCache[host] = {ip: ip, time: Date.now()};
    return ip;
  }
  return null;
}

// ============ JORDAN IP DETECTION ============
function getJordanProfile(ip) {
  // Check premium tiers
  for (var tier in JORDAN_RANGES) {
    if (tier === "ALL_RANGES") continue;
    
    var ranges = JORDAN_RANGES[tier];
    for (var i = 0; i < ranges.length; i++) {
      if (isInRange(ip, ranges[i].range)) {
        return {
          isJordan: true,
          tier: tier,
          isp: ranges[i].isp,
          priority: ranges[i].priority
        };
      }
    }
  }
  
  // Check general Jordan ranges
  if (isInList(ip, JORDAN_RANGES.ALL_RANGES)) {
    return {
      isJordan: true,
      tier: "GENERAL",
      isp: "JO-Generic",
      priority: 50
    };
  }
  
  return {
    isJordan: false,
    tier: null,
    isp: "Foreign",
    priority: 0
  };
}

// ============ TRAFFIC CLASSIFICATION ============
function classifyTraffic(url, host) {
  var combined = (url + " " + host).toLowerCase();
  
  // Check each traffic category by priority
  var categories = [];
  for (var cat in PUBG_TRAFFIC) {
    categories.push({name: cat, data: PUBG_TRAFFIC[cat]});
  }
  
  // Sort by priority (highest first)
  categories.sort(function(a, b) {
    return b.data.priority - a.data.priority;
  });
  
  // Match against patterns
  for (var i = 0; i < categories.length; i++) {
    var cat = categories[i];
    var patterns = cat.data.patterns;
    
    for (var j = 0; j < patterns.length; j++) {
      if (patterns[j].test(combined)) {
        return cat.name;
      }
    }
  }
  
  return "UNKNOWN";
}

// ============ PROXY SELECTION ============
function selectProxy(category, profile) {
  var trafficData = PUBG_TRAFFIC[category];
  if (!trafficData) return DIRECT;
  
  // Check if direct (null proxy)
  if (trafficData.proxy === null) return DIRECT;
  
  // Get proxy pool
  var pool = PROXY_TIER[trafficData.proxy];
  if (!pool || pool.length === 0) return DIRECT;
  
  // For premium Jordan IPs, use first proxy
  if (profile.tier === "FIBER_PREMIUM" || profile.tier === "PREMIUM_HOME") {
    return pool[0];
  }
  
  // Consistent hashing for others
  var hash = 0;
  for (var i = 0; i < profile.isp.length; i++) {
    hash = ((hash << 5) - hash) + profile.isp.charCodeAt(i);
  }
  hash = Math.abs(hash) % pool.length;
  
  return pool[hash];
}

// ============ CLUSTERING FOR MATCH ============
function handleMatchTraffic(profile, ip) {
  var networkClass = ip.split('.').slice(0, 2).join('.');  // /16
  
  // Find or create cluster
  var clusterId = null;
  for (var id in SESSION.clusters) {
    var cluster = SESSION.clusters[id];
    if (cluster.networkClass === networkClass || cluster.members < 10) {
      clusterId = id;
      break;
    }
  }
  
  // Create new cluster if needed
  if (!clusterId && SESSION.clusterCount < SESSION.maxClusters) {
    clusterId = "cluster_" + SESSION.clusterCount++;
    SESSION.clusters[clusterId] = {
      networkClass: networkClass,
      members: 0,
      created: Date.now()
    };
  }
  
  // Add to cluster
  if (clusterId) {
    SESSION.clusters[clusterId].members++;
  }
  
  // Select proxy based on profile
  return selectProxy("MATCH_SERVER", profile);
}

// ============ MAIN ROUTING ENGINE ============
function FindProxyForURL(url, host) {
  
  host = norm(host.toLowerCase());
  
  // Fast path: Non-PUBG traffic
  if (!/pubg|pubgm|tencent|krafton|lightspeed|levelinfinite|intlgame|proximabeta|igamecj|qq\.com|gcloud|gvoice|anticheatexpert/i.test(host)) {
    return DIRECT;
  }
  
  // DNS Resolution
  var ip = resolveWithCache(host);
  if (!ip) return BLACKHOLE;
  
  // Get Jordan profile
  var profile = getJordanProfile(ip);
  
  // ========================================
  // PHASE 1: GEOGRAPHIC FILTERING
  // ========================================
  
  // Check blacklist first (fast exit)
  if (!profile.isJordan && isInList(ip, GLOBAL_BLACKLIST)) {
    SESSION.foreignBlocked++;
    return BLACKHOLE;
  }
  
  // Classify traffic
  var category = classifyTraffic(url, host);
  var trafficData = PUBG_TRAFFIC[category];
  
  if (!trafficData) {
    // Unknown traffic - block if foreign
    return profile.isJordan ? selectProxy("LOBBY_MAIN", profile) : BLACKHOLE;
  }
  
  // ========================================
  // PHASE 2: JORDAN-ONLY ENFORCEMENT
  // ========================================
  
  if (trafficData.jordanOnly && !profile.isJordan) {
    SESSION.foreignBlocked++;
    return BLACKHOLE;
  }
  
  // ========================================
  // PHASE 3: INTELLIGENT ROUTING
  // ========================================
  
  // Track Jordan connections
  if (profile.isJordan) {
    SESSION.jordanConnections++;
  }
  
  // Special handling for match servers
  if (category === "MATCH_SERVER") {
    return handleMatchTraffic(profile, ip);
  }
  
  // Special handling for team/squad
  if (category === "TEAM_SQUAD" || category === "RECRUIT_LFG") {
    // Sticky session per host
    if (!SESSION.connections[host]) {
      SESSION.connections[host] = selectProxy(category, profile);
    }
    return SESSION.connections[host];
  }
  
  // Standard routing
  var proxy = selectProxy(category, profile);
  
  // Build failover chain for critical traffic
  if (trafficData.priority >= 800 && proxy !== DIRECT) {
    var pool = PROXY_TIER[trafficData.proxy];
    if (pool && pool.length > 1) {
      return proxy + "; " + pool[1] + "; " + DIRECT;
    }
  }
  
  return proxy;
}
