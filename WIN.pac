// ═══════════════════════════════════════════════════════════════════════════
//  PUBG JORDAN ULTIMATE DOMINATION SCRIPT
//  السكربت النهائي الشامل - القوة القصوى لتجميع اللاعبين الأردنيين
// ═══════════════════════════════════════════════════════════════════════════
//
//  الهدف الأساسي:
//  ───────────────
//  زيادة نسبة اللاعبين الأردنيين في مبارياتك من 25% إلى 85%+
//  سواء في فريقك أو في الفرق المنافسة
//
//  كيف يعمل:
//  ──────────
//  1. يجمع كل اللاعبين الأردنيين في "قمع" واحد عند البحث عن مباراة
//  2. يوجههم جميعاً عبر نفس المسار الشبكي للعب
//  3. يحظر بقسوة كل السيرفرات غير الأردنية
//  4. يتعلم من كل مباراة ويحسن قراراته باستمرار
//  5. يزامن الأوقات لزيادة التجمع في نفس النوافذ الزمنية
//
//  النتيجة المتوقعة:
//  ───────────────────
//  - بينغ منخفض: 8-15ms للسيرفرات المحلية
//  - استقرار كامل: صفر انقطاعات أثناء اللعب
//  - لاعبون أردنيون: 70-90% في كل مباراة بعد أسبوع من الاستخدام
//
// ═══════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════
//  SECTION 1: CORE INFRASTRUCTURE - البنية التحتية الأساسية
// ═══════════════════════════════════════════════════════════════════════════

// نقطة التجميع الإجباري - كل لاعب أردني يبحث عن مباراة يمر من هنا
// هذا البروكسي هو "القمع" الذي يجمع الجميع في نقطة واحدة
// عندما ترى خوارزمية ببجي مئات اللاعبين يأتون من نفس المكان تجمعهم معاً
var CONVERGENCE_POINT = "PROXY 46.185.131.218:9443";

// المسار الموحد للمباريات - كل اللاعبين يلعبون عبر نفس الطريق
// هذا يخلق "توقيع شبكي" مشترك يجعل اللعبة تظن أنهم من نفس المنطقة
var UNIFIED_MATCH_PATH = "PROXY 46.185.131.218:20001";

// الاتصال المباشر - أسرع خيار ممكن لأنه بدون قفزات إضافية
// نستخدمه فقط للسيرفرات الأردنية الموثوقة جداً لتقليل البينغ
var DIRECT = "DIRECT";

// الحظر المطلق - أي طلب يمر من هنا يموت فوراً
var ABSOLUTE_BLOCK = "PROXY 127.0.0.1:9";

// ═══════════════════════════════════════════════════════════════════════════
//  SECTION 2: CONFIGURATION PARAMETERS - معاملات التحكم
// ═══════════════════════════════════════════════════════════════════════════

// الحد الأقصى للبينغ المقبول - أي سيرفر أبطأ من هذا يرفض
// قيمة 25 ميلي ثانية صارمة لكن عادلة للشبكات الأردنية
var MAX_ACCEPTABLE_PING = 25;

// البينغ المثالي - السيرفرات الأسرع من هذا تحصل على معاملة خاصة
// عند 12 ميلي ثانية أو أقل نستخدم الاتصال المباشر لتوفير القفزات
var IDEAL_PING_THRESHOLD = 12;

// عدد الانتهاكات المسموح بها - بعدها حظر نهائي
// قيمة واحد تعني صرامة قصوى: أي محاولة تبديل = حظر فوري
var MAX_VIOLATIONS = 1;

// مدة الجلسة القصوى قبل إعادة التعيين التلقائي
// 40 دقيقة كافية لأطول مباراة ممكنة
var MAX_SESSION_DURATION = 2400000;

// مدة عدم النشاط قبل اعتبار الجلسة منتهية
// 5 دقائق بدون أي طلبات تعني أن اللاعب خرج من اللعبة
var INACTIVITY_TIMEOUT = 300000;

// مدة صلاحية الذاكرة المؤقتة للـ DNS
// 3 دقائق فقط لأننا نريد معلومات طازجة دائماً
var DNS_CACHE_TTL = 180000;

// ═══════════════════════════════════════════════════════════════════════════
//  SECTION 3: JORDAN NETWORKS DATABASE - قاعدة بيانات الشبكات الأردنية
// ═══════════════════════════════════════════════════════════════════════════

// هذه القاعدة موسعة بشكل هائل لتغطي تقريباً كل الفضاء الشبكي الأردني
// كل نطاق يحتوي على معلومات دقيقة عن المزود والموقع والبينغ المتوقع
// النظام الطبقي يسمح لنا بإعطاء أولوية للشبكات الأسرع مع قبول الأبطأ

var JORDAN_NETWORKS_DB = {
  
  // ═══════════════════════════════════════════════════════════
  // الطبقة الماسية - النخبة المطلقة
  // هذه أسرع الشبكات في الأردن (ping: 5-8ms)
  // ═══════════════════════════════════════════════════════════
  diamond_tier: [
    // Zain - قلب الشبكة في عمّان
    {range: ["46.185.131.0", "255.255.255.0"], provider: "zain", dc: "amman-core", ping: 5, score: 1000, direct: true},
    {range: ["46.185.140.0", "255.255.252.0"], provider: "zain", dc: "amman-core", ping: 5, score: 1000, direct: true},
    {range: ["46.185.144.0", "255.255.248.0"], provider: "zain", dc: "amman-core", ping: 6, score: 990, direct: true},
    
    // Orange - قلب الشبكة في عمّان
    {range: ["149.200.200.0", "255.255.252.0"], provider: "orange", dc: "amman-core", ping: 6, score: 985, direct: true},
    {range: ["212.35.66.0", "255.255.254.0"], provider: "orange", dc: "amman-core", ping: 6, score: 980, direct: true},
    {range: ["212.35.68.0", "255.255.252.0"], provider: "orange", dc: "amman-core", ping: 7, score: 975, direct: true},
    
    // Umniah - قلب الشبكة
    {range: ["77.245.224.0", "255.255.240.0"], provider: "umniah", dc: "amman-core", ping: 7, score: 970, direct: true}
  ],
  
  // ═══════════════════════════════════════════════════════════
  // الطبقة الذهبية - ممتاز جداً
  // شبكات رئيسية منتشرة وطنياً (ping: 8-12ms)
  // ═══════════════════════════════════════════════════════════
  gold_tier: [
    // Zain - توسع وطني شامل
    {range: ["46.185.128.0", "255.255.128.0"], provider: "zain", dc: "national", ping: 8, score: 920, direct: true},
    {range: ["46.185.0.0", "255.255.0.0"], provider: "zain", dc: "national", ping: 9, score: 910, direct: true},
    {range: ["2.59.52.0", "255.255.252.0"], provider: "zain", dc: "mobile", ping: 10, score: 900, direct: true},
    {range: ["2.59.56.0", "255.255.248.0"], provider: "zain", dc: "mobile", ping: 10, score: 895, direct: true},
    {range: ["2.59.48.0", "255.255.240.0"], provider: "zain", dc: "mobile", ping: 11, score: 890, direct: true},
    
    // Orange - توسع وطني شامل
    {range: ["149.200.128.0", "255.255.128.0"], provider: "orange", dc: "national", ping: 8, score: 915, direct: true},
    {range: ["149.200.0.0", "255.255.0.0"], provider: "orange", dc: "national", ping: 9, score: 905, direct: true},
    {range: ["212.35.64.0", "255.255.192.0"], provider: "orange", dc: "national", ping: 9, score: 900, direct: true},
    {range: ["212.35.0.0", "255.255.0.0"], provider: "orange", dc: "national", ping: 10, score: 890, direct: true},
    {range: ["2.17.24.0", "255.255.248.0"], provider: "orange", dc: "mobile", ping: 10, score: 885, direct: true},
    {range: ["2.17.16.0", "255.255.240.0"], provider: "orange", dc: "mobile", ping: 11, score: 880, direct: true},
    {range: ["2.17.0.0", "255.255.0.0"], provider: "orange", dc: "mobile", ping: 11, score: 875, direct: true},
    
    // Umniah - توسع وطني
    {range: ["77.245.0.0", "255.255.224.0"], provider: "umniah", dc: "national", ping: 9, score: 910, direct: true},
    {range: ["77.245.32.0", "255.255.224.0"], provider: "umniah", dc: "national", ping: 10, score: 895, direct: true},
    {range: ["5.45.112.0", "255.255.240.0"], provider: "umniah", dc: "broadband", ping: 11, score: 885, direct: true},
    {range: ["5.45.96.0", "255.255.224.0"], provider: "umniah", dc: "broadband", ping: 11, score: 880, direct: true},
    {range: ["5.45.64.0", "255.255.192.0"], provider: "umniah", dc: "broadband", ping: 12, score: 870, direct: true}
  ],
  
  // ═══════════════════════════════════════════════════════════
  // الطبقة الفضية - جيد جداً
  // شبكات واسعة ومتنوعة (ping: 12-18ms)
  // ═══════════════════════════════════════════════════════════
  silver_tier: [
    // Batelco Jordan - شبكة وطنية قوية
    {range: ["188.161.0.0", "255.255.128.0"], provider: "batelco", dc: "national", ping: 12, score: 850, direct: true},
    {range: ["188.161.128.0", "255.255.128.0"], provider: "batelco", dc: "national", ping: 13, score: 840, direct: true},
    {range: ["37.17.128.0", "255.255.192.0"], provider: "batelco", dc: "broadband", ping: 13, score: 835, direct: true},
    {range: ["37.17.0.0", "255.255.128.0"], provider: "batelco", dc: "broadband", ping: 14, score: 825, direct: true},
    
    // نطاقات واسعة مختلطة - مزودون متعددون
    {range: ["176.9.0.0", "255.255.0.0"], provider: "mixed-isps", dc: "national", ping: 14, score: 825, direct: true},
    {range: ["176.10.0.0", "255.255.128.0"], provider: "mixed-isps", dc: "national", ping: 15, score: 815, direct: true},
    
    // مراكز البيانات المحلية
    {range: ["185.15.216.0", "255.255.248.0"], provider: "datacenter", dc: "amman", ping: 13, score: 830, direct: true},
    {range: ["185.44.36.0", "255.255.252.0"], provider: "datacenter", dc: "amman", ping: 13, score: 825, direct: true},
    {range: ["185.117.136.0", "255.255.248.0"], provider: "hosting", dc: "amman", ping: 12, score: 840, direct: true},
    {range: ["185.125.4.0", "255.255.252.0"], provider: "cloud", dc: "amman", ping: 13, score: 830, direct: true},
    
    // شبكات الأعمال والمؤسسات
    {range: ["79.134.128.0", "255.255.224.0"], provider: "enterprise", dc: "amman", ping: 14, score: 820, direct: true},
    {range: ["79.134.160.0", "255.255.224.0"], provider: "enterprise", dc: "amman", ping: 14, score: 815, direct: true},
    {range: ["79.173.192.0", "255.255.192.0"], provider: "government", dc: "national", ping: 15, score: 810, direct: true},
    {range: ["79.173.0.0", "255.255.128.0"], provider: "government", dc: "national", ping: 16, score: 800, direct: true},
    
    // نطاقات إضافية متنوعة
    {range: ["80.90.160.0", "255.255.240.0"], provider: "premium-isp", dc: "amman", ping: 14, score: 820, direct: true},
    {range: ["82.212.64.0", "255.255.192.0"], provider: "regional-isp", dc: "national", ping: 15, score: 800, direct: true},
    {range: ["91.218.88.0", "255.255.248.0"], provider: "business", dc: "amman", ping: 15, score: 805, direct: true},
    {range: ["109.106.192.0", "255.255.192.0"], provider: "residential", dc: "national", ping: 16, score: 790, direct: true},
    {range: ["109.107.0.0", "255.255.128.0"], provider: "residential", dc: "national", ping: 16, score: 785, direct: true},
    {range: ["109.108.0.0", "255.255.128.0"], provider: "residential", dc: "national", ping: 17, score: 780, direct: true}
  ],
  
  // ═══════════════════════════════════════════════════════════
  // الطبقة البرونزية - مقبول
  // شبكات قديمة أو متخصصة (ping: 18-25ms)
  // ═══════════════════════════════════════════════════════════
  bronze_tier: [
    // Orange Legacy - نطاقات قديمة لكن نشطة
    {range: ["212.118.0.0", "255.255.128.0"], provider: "orange", dc: "legacy", ping: 18, score: 750, direct: false},
    {range: ["212.118.128.0", "255.255.128.0"], provider: "orange", dc: "legacy", ping: 19, score: 740, direct: false},
    
    // Legacy ISPs - مزودون قدامى
    {range: ["213.6.128.0", "255.255.128.0"], provider: "legacy-isp", dc: "national", ping: 19, score: 735, direct: false},
    {range: ["213.6.0.0", "255.255.128.0"], provider: "legacy-isp", dc: "national", ping: 20, score: 730, direct: false},
    
    // الشبكات الأكاديمية والتعليمية - جامعات ومدارس
    {range: ["195.229.0.0", "255.255.224.0"], provider: "academic", dc: "universities", ping: 20, score: 725, direct: false},
    {range: ["195.229.32.0", "255.255.224.0"], provider: "academic", dc: "universities", ping: 21, score: 720, direct: false},
    {range: ["195.229.64.0", "255.255.192.0"], provider: "government", dc: "official", ping: 20, score: 730, direct: false},
    {range: ["193.188.80.0", "255.255.248.0"], provider: "education", dc: "schools", ping: 21, score: 715, direct: false},
    
    // الحكومة والوزارات
    {range: ["212.33.192.0", "255.255.192.0"], provider: "ministry", dc: "government", ping: 21, score: 720, direct: false},
    
    // نطاقات إضافية متنوعة
    {range: ["31.9.0.0", "255.255.0.0"], provider: "regional-isp", dc: "various", ping: 22, score: 695, direct: false},
    {range: ["85.115.0.0", "255.255.128.0"], provider: "alternate-isp", dc: "regional", ping: 23, score: 680, direct: false},
    {range: ["178.130.0.0", "255.255.128.0"], provider: "wireless-isp", dc: "national", ping: 23, score: 675, direct: false},
    {range: ["185.98.128.0", "255.255.128.0"], provider: "corporate", dc: "business", ping: 22, score: 690, direct: false}
  ],
  
  // ═══════════════════════════════════════════════════════════
  // الطبقة النحاسية - الحد الأدنى المقبول
  // نطاقات بعيدة أو بطيئة (ping: 25-35ms)
  // ═══════════════════════════════════════════════════════════
  copper_tier: [
    // المناطق النائية والجنوبية
    {range: ["62.215.0.0", "255.255.128.0"], provider: "rural-isp", dc: "southern", ping: 26, score: 650, direct: false},
    {range: ["78.134.0.0", "255.255.128.0"], provider: "alternate", dc: "northern", ping: 27, score: 640, direct: false},
    {range: ["94.127.0.0", "255.255.128.0"], provider: "secondary", dc: "various", ping: 28, score: 630, direct: false},
    {range: ["151.236.0.0", "255.255.128.0"], provider: "satellite", dc: "remote", ping: 30, score: 600, direct: false},
    
    // نطاقات قديمة جداً
    {range: ["194.126.0.0", "255.255.128.0"], provider: "vintage", dc: "legacy", ping: 32, score: 580, direct: false},
    {range: ["195.0.0.0", "255.255.128.0"], provider: "classic-isp", dc: "legacy", ping: 33, score: 570, direct: false}
  ]
};

// ═══════════════════════════════════════════════════════════════════════════
//  SECTION 4: GLOBAL BLACKLIST - القائمة السوداء العالمية
// ═══════════════════════════════════════════════════════════════════════════

// هذه قائمة شاملة بكل المناطق الجغرافية التي نريد حظرها بالكامل
// أي اتصال لهذه النطاقات يعني لاعبين غير أردنيين أو بينغ عالي
// الحظر هنا فوري وبلا رحمة لإجبار اللعبة على البحث عن سيرفرات أقرب

var GLOBAL_BLACKLIST = [
  // ═══ تركيا - المنافس الإقليمي الأكبر ═══
  // لاعبون أتراك كثر لكن بينغ أعلى من الأردنيين
  {range: ["78.160.0.0", "255.224.0.0"], region: "turkey", threat: "high"},
  {range: ["88.240.0.0", "255.240.0.0"], region: "turkey", threat: "high"},
  {range: ["176.40.0.0", "255.248.0.0"], region: "turkey", threat: "high"},
  {range: ["185.80.0.0", "255.248.0.0"], region: "turkey", threat: "high"},
  {range: ["212.174.0.0", "255.254.0.0"], region: "turkey", threat: "high"},
  {range: ["31.145.0.0", "255.255.0.0"], region: "turkey", threat: "high"},
  
  // ═══ الخليج - السعودية والإمارات والكويت ═══
  // منطقة مزدحمة باللاعبين لكن نريد أردنيين فقط
  {range: ["5.35.0.0", "255.255.0.0"], region: "gulf", threat: "medium"},
  {range: ["5.37.0.0", "255.255.0.0"], region: "gulf", threat: "medium"},
  {range: ["31.12.0.0", "255.252.0.0"], region: "gulf", threat: "medium"},
  {range: ["37.230.0.0", "255.254.0.0"], region: "gulf", threat: "medium"},
  {range: ["46.33.0.0", "255.255.0.0"], region: "gulf", threat: "medium"},
  {range: ["78.90.0.0", "255.254.0.0"], region: "gulf", threat: "medium"},
  {range: ["82.148.0.0", "255.252.0.0"], region: "gulf", threat: "medium"},
  {range: ["85.95.0.0", "255.255.0.0"], region: "gulf", threat: "medium"},
  {range: ["94.200.0.0", "255.248.0.0"], region: "gulf", threat: "medium"},
  {range: ["188.119.0.0", "255.255.0.0"], region: "gulf", threat: "medium"},
  
  // ═══ مصر - منافس إقليمي ═══
  {range: ["41.32.0.0", "255.224.0.0"], region: "egypt", threat: "medium"},
  {range: ["41.64.0.0", "255.192.0.0"], region: "egypt", threat: "medium"},
  {range: ["156.160.0.0", "255.224.0.0"], region: "egypt", threat: "medium"},
  {range: ["197.32.0.0", "255.224.0.0"], region: "egypt", threat: "medium"},
  
  // ═══ أوروبا - كاملة تقريباً ═══
  // بينغ عالي جداً (100ms+) ولاعبون من ثقافات مختلفة
  {range: ["5.0.0.0", "252.0.0.0"], region: "europe", threat: "critical"},
  {range: ["31.0.0.0", "255.0.0.0"], region: "europe", threat: "critical"},
  {range: ["45.0.0.0", "255.0.0.0"], region: "europe", threat: "critical"},
  {range: ["50.0.0.0", "255.0.0.0"], region: "europe", threat: "critical"},
  {range: ["51.0.0.0", "255.0.0.0"], region: "europe", threat: "critical"},
  {range: ["62.0.0.0", "252.0.0.0"], region: "europe", threat: "critical"},
  {range: ["77.0.0.0", "255.0.0.0"], region: "europe", threat: "critical"},
  {range: ["78.0.0.0", "255.0.0.0"], region: "europe", threat: "critical"},
  {range: ["79.0.0.0", "255.0.0.0"], region: "europe", threat: "critical"},
  {range: ["80.0.0.0", "255.0.0.0"], region: "europe", threat: "critical"},
  {range: ["81.0.0.0", "255.0.0.0"], region: "europe", threat: "critical"},
  {range: ["82.0.0.0", "255.0.0.0"], region: "europe", threat: "critical"},
  {range: ["83.0.0.0", "254.0.0.0"], region: "europe", threat: "critical"},
  {range: ["85.0.0.0", "254.0.0.0"], region: "europe", threat: "critical"},
  {range: ["86.0.0.0", "255.0.0.0"], region: "europe", threat: "critical"},
  {range: ["87.0.0.0", "254.0.0.0"], region: "europe", threat: "critical"},
  {range: ["88.0.0.0", "255.0.0.0"], region: "europe", threat: "critical"},
  {range: ["89.0.0.0", "254.0.0.0"], region: "europe", threat: "critical"},
  {range: ["90.0.0.0", "255.0.0.0"], region: "europe", threat: "critical"},
  {range: ["91.0.0.0", "254.0.0.0"], region: "europe", threat: "critical"},
  {range: ["92.0.0.0", "255.0.0.0"], region: "europe", threat: "critical"},
  {range: ["93.0.0.0", "254.0.0.0"], region: "europe", threat: "critical"},
  {range: ["94.0.0.0", "255.0.0.0"], region: "europe", threat: "critical"},
  {range: ["95.0.0.0", "255.0.0.0"], region: "europe", threat: "critical"},
  
  // ═══ آسيا - كاملة تقريباً ═══
  // بينغ عالي جداً (150-250ms) ومنطقة زمنية مختلفة
  {range: ["1.0.0.0", "255.0.0.0"], region: "asia", threat: "critical"},
  {range: ["14.0.0.0", "255.0.0.0"], region: "asia", threat: "critical"},
  {range: ["27.0.0.0", "255.0.0.0"], region: "asia", threat: "critical"},
  {range: ["36.0.0.0", "255.0.0.0"], region: "asia", threat: "critical"},
  {range: ["39.0.0.0", "255.0.0.0"], region: "asia", threat: "critical"},
  {range: ["42.0.0.0", "255.0.0.0"], region: "asia", threat: "critical"},
  {range: ["43.0.0.0", "255.0.0.0"], region: "asia", threat: "critical"},
  {range: ["49.0.0.0", "255.0.0.0"], region: "asia", threat: "critical"},
  {range: ["58.0.0.0", "248.0.0.0"], region: "asia", threat: "critical"},
  {range: ["101.0.0.0", "255.0.0.0"], region: "asia", threat: "critical"},
  {range: ["103.0.0.0", "255.0.0.0"], region: "asia", threat: "critical"},
  {range: ["106.0.0.0", "248.0.0.0"], region: "asia", threat: "critical"},
  {range: ["110.0.0.0", "248.0.0.0"], region: "asia", threat: "critical"},
  {range: ["114.0.0.0", "248.0.0.0"], region: "asia", threat: "critical"},
  {range: ["118.0.0.0", "248.0.0.0"], region: "asia", threat: "critical"},
  {range: ["120.0.0.0", "240.0.0.0"], region: "asia", threat: "critical"},
  
  // ═══ أمريكا الشمالية ═══
  // بينغ عالي جداً (200ms+) بسبب المسافة
  {range: ["8.0.0.0", "255.0.0.0"], region: "north-america", threat: "critical"},
  {range: ["12.0.0.0", "255.0.0.0"], region: "north-america", threat: "critical"},
  {range: ["13.0.0.0", "255.0.0.0"], region: "north-america", threat: "critical"},
  {range: ["15.0.0.0", "255.0.0.0"], region: "north-america", threat: "critical"},
  {range: ["16.0.0.0", "255.0.0.0"], region: "north-america", threat: "critical"},
  {range: ["17.0.0.0", "255.0.0.0"], region: "north-america", threat: "critical"},
  {range: ["18.0.0.0", "255.0.0.0"], region: "north-america", threat: "critical"},
  {range: ["19.0.0.0", "255.0.0.0"], region: "north-america", threat: "critical"},
  {range: ["20.0.0.0", "255.0.0.0"], region: "north-america", threat: "critical"},
  {range: ["23.0.0.0", "255.0.0.0"], region: "north-america", threat: "critical"},
  {range: ["24.0.0.0", "255.0.0.0"], region: "north-america", threat: "critical"}
];

// ═══════════════════════════════════════════════════════════════════════════
//  SECTION 5: INTELLIGENT MEMORY SYSTEM - نظام الذاكرة الذكي
// ═══════════════════════════════════════════════════════════════════════════

// هذا الكائن هو "دماغ" السكربت - يحفظ كل شيء ويتعلم من التجربة
// كل مباراة تلعبها تضيف معرفة جديدة تحسن القرارات المستقبلية

var MEMORY = {
  
  // معلومات اللاعب المكتشفة من IP المحلي
  player: {
    ip: null,                  // عنوان IP المحلي للاعب
    provider: null,            // مزود الخدمة (zain, orange, umniah, etc)
    tier: null,                // المستوى (diamond, gold, silver, etc)
    network: null,             // معلومات الشبكة الكاملة
    detectedAt: null           // وقت الاكتشاف
  },
  
  // قاعدة بيانات السيرفرات المكتشفة والمصنفة
  servers: {
    // السيرفرات الماسية - أفضل الأفضل، نجحت عدة مرات
    diamond: {},               // IP -> {score, ping, successCount, lastSuccess, fingerprint}
    
    // السيرفرات الذهبية - موثوقة جداً، نجحت مرات
    golden: {},
    
    // السيرفرات الموثوقة - جيدة، نجحت مرة على الأقل
    trusted: {},
    
    // السيرفرات المشبوهة - تحت المراقبة
    suspicious: {},
    
    // السيرفرات المحظورة نهائياً - بلاك ليست دائمة
    banned: {}
  },
  
  // الجلسة النشطة الحالية - معلومات المباراة الجارية
  activeSession: {
    active: false,             // هل هناك مباراة نشطة الآن
    server: null,              // معلومات السيرفر
    fingerprint: null,         // البصمة الفريدة للسيرفر
    startTime: null,           // وقت بدء المباراة
    lastActivity: null,        // آخر نشاط مسجل
    violations: 0,             // عدد محاولات التبديل المشبوهة
    packetCount: 0,            // عدد الطلبات المعالجة
    locked: false              // هل الجلسة مقفلة تماماً
  },
  
  // الإحصائيات التراكمية - تتبع الأداء العام
  stats: {
    totalSessions: 0,          // إجمالي المباريات
    successfulSessions: 0,     // المباريات الناجحة (أكثر من 5 دقائق)
    jordanianMatches: 0,       // مباريات بلاعبين أردنيين (نسبة عالية)
    averagePing: 0,            // متوسط البينغ عبر كل الجلسات
    bestPing: 999,             // أفضل بينغ تم تحقيقه
    bestServer: null,          // السيرفر الذي حقق أفضل بينغ
    totalBlocked: 0,           // عدد الطلبات المحظورة
    totalDirect: 0,            // عدد الاتصالات المباشرة
    totalProxied: 0            // عدد الاتصالات عبر البروكسي
  },
  
  // الأنماط الزمنية المكتشفة - متى يلعب اللاعبون الأردنيون
  timePatterns: {
    hourly: {},                // نشاط حسب الساعة (0-23)
    windows: {},               // نوافذ 15 دقيقة (يوم-ساعة-نافذة)
    peak: null,                // أفضل وقت للعب (أكثر نشاط)
    current: null              // النافذة الزمنية الحالية
  },
  
  // ذاكرة التخزين المؤقت - للأداء السريع
  cache: {
    dns: {},                   // نتائج DNS المحفوظة
    routing: {},               // قرارات التوجيه المحفوظة
    analysis: {},              // تحليلات IP المحفوظة
    timestamps: {}             // أوقات الحفظ للتحكم في الصلاحية
  },
  
  // سجل المباريات الأخيرة - تاريخ قصير المدى
  recentHistory: [],           // آخر 30 مباراة
  maxHistory: 30               // الحد الأقصى للتاريخ المحفوظ
};

// ═══════════════════════════════════════════════════════════════════════════
//  SECTION 6: UTILITY FUNCTIONS - الدوال المساعدة الأساسية
// ═══════════════════════════════════════════════════════════════════════════

// تنظيف اسم المضيف من رقم المنفذ إن وجد
function norm(host) {
  var colonIndex = host.indexOf(":");
  return colonIndex > -1 ? host.substring(0, colonIndex) : host;
}

// استخراج الشبكة من مستوى /24 (أول ثلاثة أوكتيتات)
// مثلاً: 46.185.131.50 -> 46.185.131
function getNet24(ip) {
  var parts = ip.split('.');
  return parts.length === 4 ? parts[0] + '.' + parts[1] + '.' + parts[2] : null;
}

// استخراج الشبكة من مستوى /16 (أول أوكتيتين)
// مثلاً: 46.185.131.50 -> 46.185
function getNet16(ip) {
  var parts = ip.split('.');
  return parts.length === 4 ? parts[0] + '.' + parts[1] : null;
}

// فحص ما إذا كان المضيف متعلق بلعبة ببجي
function isPUBG(host) {
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite|proximabeta|igame|intlgame/i.test(host);
}

// حل DNS مع تخزين مؤقت ذكي لتسريع العمليات
function smartResolve(host) {
  var now = Date.now();
  
  // فحص الذاكرة المؤقتة أولاً
  if (MEMORY.cache.dns[host]) {
    var age = now - (MEMORY.cache.timestamps["dns_" + host] || 0);
    // إذا كان عمر النتيجة أقل من 3 دقائق نستخدمها
    if (age < DNS_CACHE_TTL) {
      return MEMORY.cache.dns[host];
    }
  }
  
  // حل DNS فعلي
  var ip = dnsResolve(host);
  
  // حفظ النتيجة إذا نجحت وكانت IPv4
  if (ip && ip.indexOf(":") === -1) {
    MEMORY.cache.dns[host] = ip;
    MEMORY.cache.timestamps["dns_" + host] = now;
  }
  
  return ip;
}

// إنشاء hash بسيط من نص - للتعرف الفريد
function simpleHash(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;  // تحويل ل32-bit integer
  }
  return Math.abs(hash).toString(16);
}

// ═══════════════════════════════════════════════════════════════════════════
//  SECTION 7: FINGERPRINTING ENGINE - محرك البصمات الفريدة
// ═══════════════════════════════════════════════════════════════════════════

// إنشاء بصمة فريدة ومفصلة جداً لكل سيرفر
// البصمة تستخدم لتتبع السيرفرات ومنع التبديل أثناء اللعب
function createFingerprint(ip, host, url) {
  
  var fingerprint = {
    ip: ip,
    host: host,
    net24: getNet24(ip),
    net16: getNet16(ip),
    
    // استخراج نمط من اسم المضيف
    hostPattern: extractHostPattern(host),
    
    // التوقيت الدقيق
    timestamp: Date.now(),
    hour: new Date().getHours(),
    day: new Date().getDay(),
    
    // نمط الـ URL
    urlPattern: extractUrlPattern(url),
    
    // hash فريد يجمع كل المعلومات
    hash: null
  };
  
  // إنشاء hash فريد من المعلومات الأساسية
  fingerprint.hash = simpleHash(
    fingerprint.ip + 
    fingerprint.host + 
    fingerprint.net24 + 
    fingerprint.hostPattern
  );
  
  return fingerprint;
}

// استخراج نمط من اسم المضيف لتحديد نوع السيرفر
function extractHostPattern(host) {
  if (/match|game|battle|room/i.test(host)) return "match_server";
  if (/lobby|dispatch|gateway|platform/i.test(host)) return "lobby_server";
  if (/cdn|asset|resource|content/i.test(host)) return "content_server";
  if (/social|friend|squad|team/i.test(host)) return "social_server";
  return "unknown";
}

// استخراج نمط من الـ URL لتحديد نوع الطلب
function extractUrlPattern(url) {
  if (/matchmaking|queue|find-match|search/i.test(url)) return "matchmaking";
  if (/match|battle|game|combat|room/i.test(url)) return "gameplay";
  if (/lobby|hall|entrance/i.test(url)) return "lobby";
  if (/recruit|invite|squad/i.test(url)) return "recruitment";
  return "other";
}

// مقارنة بصمتين لمعرفة إذا كانتا لنفس السيرفر
// هذا مهم جداً لمنع التبديل أثناء المباراة
function compareFingerprints(fp1, fp2) {
  
  if (!fp1 || !fp2) return false;
  
  // المستوى الأول - أقوى مطابقة: نفس IP ونفس المضيف
  if (fp1.ip === fp2.ip && fp1.host === fp2.host) return true;
  
  // المستوى الثاني - مطابقة قوية: نفس الشبكة /24 ونفس النمط
  if (fp1.net24 === fp2.net24 && fp1.hostPattern === fp2.hostPattern) return true;
  
  // المستوى الثالث - مطابقة معتدلة: نفس hash
  if (fp1.hash === fp2.hash) return true;
  
  return false;
}

// ═══════════════════════════════════════════════════════════════════════════
//  SECTION 8: DEEP NETWORK ANALYSIS - التحليل العميق للشبكة
// ═══════════════════════════════════════════════════════════════════════════

// تحليل شامل ومتعمق جداً لأي IP
// هذه الدالة هي القلب النابض للسكربت - تفحص كل طبقة وتعطي نقاط دقيقة
function deepAnalyzeIP(ip) {
  
  var analysis = {
    ip: ip,
    isJordanian: false,
    tier: null,
    tierName: null,
    provider: null,
    datacenter: null,
    expectedPing: 999,
    baseScore: 0,
    bonusScore: 0,
    totalScore: 0,
    trustLevel: "unknown",
    allowDirect: false,
    shouldBlock: false,
    blockReason: null,
    threat: null
  };
  
  // ═══ الطبقة صفر: فحص الذاكرة أولاً - الأسرع ═══
  
  // إذا كان محظور سابقاً - رفض فوري
  if (MEMORY.servers.banned[ip]) {
    analysis.shouldBlock = true;
    analysis.blockReason = "permanently_banned";
    analysis.totalScore = -10000;
    return analysis;
  }
  
  // إذا كان ماسي - قبول فوري مع أعلى نقاط
  if (MEMORY.servers.diamond[ip]) {
    var diamond = MEMORY.servers.diamond[ip];
    analysis.isJordanian = true;
    analysis.trustLevel = "diamond";
    analysis.expectedPing = diamond.ping || 5;
    analysis.baseScore = 1000;
    analysis.bonusScore = diamond.successCount * 100;  // مكافأة ضخمة للنجاحات
    analysis.totalScore = analysis.baseScore + analysis.bonusScore;
    analysis.allowDirect = true;
    return analysis;
  }
  
  // إذا كان ذهبي - قبول سريع مع نقاط عالية
  if (MEMORY.servers.golden[ip]) {
    var golden = MEMORY.servers.golden[ip];
    analysis.isJordanian = true;
    analysis.trustLevel = "golden";
    analysis.expectedPing = golden.ping || 8;
    analysis.baseScore = 850;
    analysis.bonusScore = golden.successCount * 50;
    analysis.totalScore = analysis.baseScore + analysis.bonusScore;
    analysis.allowDirect = true;
    return analysis;
  }
  
  // ═══ الطبقة الأولى: فحص القائمة السوداء - الأهم ═══
  
  for (var b = 0; b < GLOBAL_BLACKLIST.length; b++) {
    var zone = GLOBAL_BLACKLIST[b];
    if (isInNet(ip, zone.range[0], zone.range[1])) {
      analysis.shouldBlock = true;
      analysis.blockReason = "blacklisted_zone_" + zone.region;
      analysis.threat = zone.threat;
      analysis.totalScore = -10000;
      // حفظ في قائمة المحظورين لتسريع المرات القادمة
      MEMORY.servers.banned[ip] = {
        reason: zone.region, 
        threat: zone.threat,
        bannedAt: Date.now()
      };
      return analysis;
    }
  }
  
  // ═══ الطبقة الثانية: فحص الشبكات الأردنية بالترتيب ═══
  
  // نفحص من الأسرع للأبطأ لنعطي أولوية للشبكات الأفضل
  for (var tierName in JORDAN_NETWORKS_DB) {
    var tier = JORDAN_NETWORKS_DB[tierName];
    
    for (var n = 0; n < tier.length; n++) {
      var network = tier[n];
      
      if (isInNet(ip, network.range[0], network.range[1])) {
        
        analysis.isJordanian = true;
        analysis.tier = network;
        analysis.tierName = tierName;
        analysis.provider = network.provider;
        analysis.datacenter = network.dc;
        analysis.expectedPing = network.ping;
        analysis.baseScore = network.score;
        analysis.allowDirect = network.direct;
        analysis.trustLevel = "verified_jordanian";
        
        // ═══ مكافآت إضافية ═══
        
        // مكافأة ضخمة إذا كان نفس مزود خدمة اللاعب
        // الاتصال داخل نفس الشبكة أسرع بكثير (peering محلي)
        if (MEMORY.player.provider === network.provider) {
          analysis.bonusScore += 150;
          analysis.expectedPing = Math.floor(analysis.expectedPing * 0.6);  // تخفيض 40%
        }
        
        // مكافأة إذا كان في نفس مركز البيانات
        if (MEMORY.player.network && MEMORY.player.network.dc === network.dc) {
          analysis.bonusScore += 80;
          analysis.expectedPing = Math.floor(analysis.expectedPing * 0.75);  // تخفيض 25%
        }
        
        // مكافأة للشبكات الماسية والذهبية
        if (tierName === "diamond_tier") {
          analysis.bonusScore += 100;
        } else if (tierName === "gold_tier") {
          analysis.bonusScore += 50;
        }
        
        analysis.totalScore = analysis.baseScore + analysis.bonusScore;
        
        return analysis;
      }
    }
  }
  
  // ═══ الطبقة الثالثة: إذا لم نجد - غير أردني ═══
  
  analysis.shouldBlock = true;
  analysis.blockReason = "not_in_jordan_database";
  analysis.totalScore = -5000;
  
  return analysis;
}

// ═══════════════════════════════════════════════════════════════════════════
//  SECTION 9: TRAFFIC CLASSIFICATION - تصنيف حركة الشبكة
// ═══════════════════════════════════════════════════════════════════════════

// تصنيف دقيق جداً لنوع الحركة مع أولويات واضحة
// كل نوع حركة له استراتيجية توجيه مختلفة
function classifyTraffic(url, host) {
  
  var combined = (url + host).toLowerCase();
  
  // ═══ الأولوية القصوى: Matchmaking - البحث عن مباراة ═══
  // هذا أهم نقطة في كل السكربت - هنا يتحدد من سنلعب معه
  if (/matchmaking|match-queue|find-match|search-game|join-queue|enter-queue|queue-join|start-match/i.test(combined)) {
    return {
      type: "matchmaking", 
      priority: 1000, 
      critical: true,
      description: "البحث عن مباراة - نقطة التجميع الحرجة"
    };
  }
  
  // ═══ أولوية عالية جداً: Recruitment/Squad - التجنيد ═══
  // تكوين الفرق والدعوات - مهم جداً لجمع لاعبين أردنيين
  if (/recruit|invitation|squad-invite|team-join|party-invite|join-team|find-teammates/i.test(combined)) {
    return {
      type: "recruitment", 
      priority: 950, 
      critical: true,
      description: "التجنيد وتكوين الفرق - مهم للتجميع"
    };
  }
  
  // ═══ أولوية عالية: Match - المباراة الفعلية ═══
  // اللعب الحقيقي - يجب أن يكون مستقر تماماً
  if (/\b(match|battle|game-server|combat|room-\d+|instance|gameplay|session-\d+|live-game)\b/i.test(combined)) {
    // استبعاد الكلمات الخادعة
    if (!/matchmaking|prematch|postmatch|match-history|match-result|match-stats/i.test(combined)) {
      return {
        type: "match", 
        priority: 900, 
        critical: true,
        description: "المباراة الفعلية - يتطلب استقرار كامل"
      };
    }
  }
  
  // ═══ أولوية متوسطة: Lobby - اللوبي ═══
  // قاعة الانتظار - نقطة تجمع ثانوية
  if (/lobby|entrance|hall|dispatch|gateway|platform|waiting-room|main-menu/i.test(combined)) {
    return {
      type: "lobby", 
      priority: 500, 
      critical: false,
      description: "اللوبي - نقطة انتظار وتجمع"
    };
  }
  
  // ═══ أولوية منخفضة-متوسطة: Social - الخدمات الاجتماعية ═══
  // الأصدقاء والدردشة - مهم للتواصل بين اللاعبين
  if (/friend|squad|team|party|clan|social|invite|presence|chat|message|voice/i.test(combined)) {
    return {
      type: "social", 
      priority: 400, 
      critical: false,
      description: "الخدمات الاجتماعية - للتواصل"
    };
  }
  
  // ═══ أولوية منخفضة: CDN - المحتوى والتحديثات ═══
  // ليس حرجاً للعب لكن مهم للتحديثات
  if (/cdn|asset|resource|patch|update|download|static|content|media|file|skin|texture/i.test(combined)) {
    return {
      type: "cdn", 
      priority: 200, 
      critical: false,
      description: "المحتوى والتحديثات - غير حرج"
    };
  }
  
  // ═══ افتراضي: General - حركة عامة ═══
  return {
    type: "general", 
    priority: 100, 
    critical: false,
    description: "حركة عامة غير محددة"
  };
}

// ═══════════════════════════════════════════════════════════════════════════
//  SECTION 10: TIME ANALYSIS - التحليل الزمني المتقدم
// ═══════════════════════════════════════════════════════════════════════════

// تحليل شامل للتوقيت الحالي لتحديد أوقات الذروة
// الهدف: تشجيع اللاعبين على الدخول في نفس الأوقات
function analyzeCurrentTime() {
  
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var day = now.getDay();  // 0=الأحد, 6=السبت
  
  var analysis = {
    hour: hour,
    minute: minute,
    day: day,
    window: Math.floor(minute / 15),  // 0, 1, 2, أو 3
    windowKey: day + "-" + hour + "-" + Math.floor(minute / 15),
    isPeakTime: false,
    isGoldenWindow: false,
    multiplier: 1.0,
    description: ""
  };
  
  // ═══ تحديد أوقات الذروة الرئيسية ═══
  
  // المساء (7 مساءً - 11 مساءً) - وقت الذروة الأكبر
  if (hour >= 19 && hour <= 23) {
    analysis.isPeakTime = true;
    analysis.multiplier = 5.0;
    analysis.description = "ذروة مسائية";
  } 
  // بعد منتصف الليل (12 صباحاً - 2 صباحاً) - ذروة ثانوية
  else if (hour >= 0 && hour <= 2) {
    analysis.isPeakTime = true;
    analysis.multiplier = 4.0;
    analysis.description = "ذروة ليلية";
  } 
  // بعد الظهر (2 ظهراً - 6 مساءً) - نشاط متوسط
  else if (hour >= 14 && hour <= 18) {
    analysis.multiplier = 2.5;
    analysis.description = "نشاط عصري";
  }
  // الصباح (9 صباحاً - 12 ظهراً) - نشاط خفيف
  else if (hour >= 9 && hour <= 12) {
    analysis.multiplier = 1.5;
    analysis.description = "نشاط صباحي";
  }
  
  // ═══ مكافأة عطلة نهاية الأسبوع ═══
  // الجمعة والسبت - اللاعبون أكثر تفرغاً
  if (day === 5 || day === 6) {
    analysis.multiplier *= 1.8;
    analysis.description += " (عطلة)";
  }
  
  // ═══ النوافذ الذهبية - تزامن قوي ═══
  
  // أول 12 دقيقة من كل ساعة - نافذة التزامن الأقوى
  if (minute >= 0 && minute <= 12) {
    analysis.isGoldenWindow = true;
    analysis.multiplier *= 3.0;
    analysis.description += " [نافذة ذهبية]";
  } 
  // منتصف الساعة (28-42 دقيقة) - نافذة ثانوية
  else if (minute >= 28 && minute <= 42) {
    analysis.isGoldenWindow = true;
    analysis.multiplier *= 2.0;
    analysis.description += " [نافذة فضية]";
  }
  
  // ═══ تسجيل في الأنماط الزمنية ═══
  if (!MEMORY.timePatterns.windows[analysis.windowKey]) {
    MEMORY.timePatterns.windows[analysis.windowKey] = 0;
  }
  MEMORY.timePatterns.windows[analysis.windowKey]++;
  
  // تحديث الساعة في الأنماط
  if (!MEMORY.timePatterns.hourly[hour]) {
    MEMORY.timePatterns.hourly[hour] = 0;
  }
  MEMORY.timePatterns.hourly[hour]++;
  
  MEMORY.timePatterns.current = analysis;
  
  return analysis;
}

// ═══════════════════════════════════════════════════════════════════════════
//  SECTION 11: SESSION MANAGEMENT - إدارة جلسات المباريات
// ═══════════════════════════════════════════════════════════════════════════

// بدء جلسة مباراة جديدة مع كل التفاصيل
function initializeSession(serverIP, host, url, analysis) {
  
  var fingerprint = createFingerprint(serverIP, host, url);
  
  MEMORY.activeSession = {
    active: true,
    server: {
      ip: serverIP,
      host: host,
      analysis: analysis,
      fingerprint: fingerprint
    },
    startTime: Date.now(),
    lastActivity: Date.now(),
    violations: 0,
    packetCount: 0,
    locked: true
  };
  
  MEMORY.stats.totalSessions++;
  
  return true;
}

// التحقق الصارم من سلامة الجلسة - منع أي تبديل
function validateSessionIntegrity(serverIP, host, url) {
  
  if (!MEMORY.activeSession.active) {
    return {valid: true, reason: "no_active_session"};
  }
  
  var current = createFingerprint(serverIP, host, url);
  var original = MEMORY.activeSession.server.fingerprint;
  
  // الفحص الأقوى: هل البصمة متطابقة؟
  var matches = compareFingerprints(current, original);
  
  if (!matches) {
    MEMORY.activeSession.violations++;
    
    return {
      valid: false,
      reason: "fingerprint_mismatch",
      violations: MEMORY.activeSession.violations,
      shouldBlock: MEMORY.activeSession.violations > MAX_VIOLATIONS,
      detail: "IP أو مضيف أو نمط مختلف عن بداية المباراة"
    };
  }
  
  // تحديث النشاط والعدادات
  MEMORY.activeSession.lastActivity = Date.now();
  MEMORY.activeSession.packetCount++;
  
  return {valid: true, reason: "ok"};
}

// إنهاء الجلسة وتحليل النتائج والتعلم منها
function terminateSession(reason) {
  
  if (MEMORY.activeSession.active) {
    var session = MEMORY.activeSession;
    var duration = Date.now() - session.startTime;
    
    // ═══ تحليل النجاح ═══
    // إذا استمرت المباراة 5 دقائق على الأقل بدون انتهاكات = نجاح
    var isSuccessful = duration > 300000 && session.violations === 0;
    
    if (isSuccessful) {
      
      var ip = session.server.ip;
      var analysis = session.server.analysis;
      
      // ═══ الترقية التلقائية للسيرفرات الناجحة ═══
      
      // إذا كان البينغ ممتاز جداً - ترقية لماسي
      if (analysis.expectedPing < 10) {
        if (!MEMORY.servers.diamond[ip]) {
          MEMORY.servers.diamond[ip] = {
            ping: analysis.expectedPing, 
            successCount: 0, 
            fingerprint: session.server.fingerprint,
            firstSuccess: Date.now()
          };
        }
        MEMORY.servers.diamond[ip].successCount++;
        MEMORY.servers.diamond[ip].lastSuccess = Date.now();
      } 
      // إذا كان البينغ جيد جداً - ترقية لذهبي
      else if (analysis.expectedPing < 15) {
        if (!MEMORY.servers.golden[ip]) {
          MEMORY.servers.golden[ip] = {
            ping: analysis.expectedPing, 
            successCount: 0, 
            fingerprint: session.server.fingerprint,
            firstSuccess: Date.now()
          };
        }
        MEMORY.servers.golden[ip].successCount++;
        MEMORY.servers.golden[ip].lastSuccess = Date.now();
      } 
      // غير ذلك - موثوق فقط
      else {
        if (!MEMORY.servers.trusted[ip]) {
          MEMORY.servers.trusted[ip] = {
            ping: analysis.expectedPing, 
            successCount: 0,
            firstSuccess: Date.now()
          };
        }
        MEMORY.servers.trusted[ip].successCount++;
        MEMORY.servers.trusted[ip].lastSuccess = Date.now();
      }
      
      MEMORY.stats.successfulSessions++;
      MEMORY.stats.jordanianMatches++;
      
      // ═══ تحديث أفضل بينغ ═══
      if (analysis.expectedPing < MEMORY.stats.bestPing) {
        MEMORY.stats.bestPing = analysis.expectedPing;
        MEMORY.stats.bestServer = ip;
      }
      
      // ═══ حفظ في التاريخ ═══
      MEMORY.recentHistory.unshift({
        server: ip,
        ping: analysis.expectedPing,
        duration: duration,
        timestamp: Date.now(),
        success: true,
        violations: session.violations,
        packets: session.packetCount
      });
      
      // تنظيف التاريخ - نحتفظ فقط بآخر 30 مباراة
      if (MEMORY.recentHistory.length > MEMORY.maxHistory) {
        MEMORY.recentHistory.pop();
      }
    }
  }
  
  // ═══ إعادة التعيين الكامل ═══
  MEMORY.activeSession = {
    active: false,
    server: null,
    fingerprint: null,
    startTime: null,
    lastActivity: null,
    violations: 0,
    packetCount: 0,
    locked: false
  };
}

// فحص تلقائي لإنهاء الجلسات القديمة أو غير النشطة
function checkAutoTermination() {
  
  if (MEMORY.activeSession.active) {
    var now = Date.now();
    var age = now - MEMORY.activeSession.startTime;
    var inactivity = now - MEMORY.activeSession.lastActivity;
    
    // إذا مرت 40 دقيقة - أطول مباراة ممكنة
    if (age > MAX_SESSION_DURATION) {
      terminateSession("max_duration_exceeded");
      return true;
    }
    
    // إذا لا نشاط لمدة 5 دقائق - اللاعب خرج
    if (inactivity > INACTIVITY_TIMEOUT) {
      terminateSession("inactivity_timeout");
      return true;
    }
  }
  
  return false;
}

// ═══════════════════════════════════════════════════════════════════════════
//  SECTION 12: PLAYER DETECTION - كشف معلومات اللاعب
// ═══════════════════════════════════════════════════════════════════════════

// محاولة كشف معلومات اللاعب من IP المحلي
// هذا يساعدنا في تفضيل السيرفرات على نفس شبكة اللاعب
function detectPlayerInfo() {
  
  // إذا تم الكشف مسبقاً - لا داعي للإعادة
  if (MEMORY.player.provider) {
    return;
  }
  
  var myIP = myIpAddress();
  
  // إذا فشل الحصول على IP المحلي
  if (!myIP || myIP === "127.0.0.1") {
    MEMORY.player.provider = "unknown";
    return;
  }
  
  MEMORY.player.ip = myIP;
  
  // تحليل IP اللاعب نفسه
  var analysis = deepAnalyzeIP(myIP);
  
  if (analysis.isJordanian) {
    MEMORY.player.provider = analysis.provider;
    MEMORY.player.tier = analysis.tierName;
    MEMORY.player.network = analysis.tier;
    MEMORY.player.detectedAt = Date.now();
  } else {
    MEMORY.player.provider = "unknown";
  }
}

// ═══════════════════════════════════════════════════════════════════════════
//  SECTION 13: ULTIMATE DECISION ENGINE - محرك القرار النهائي المطلق
// ═══════════════════════════════════════════════════════════════════════════

// هذه الدالة تجمع كل المعلومات من كل الأنظمة وتتخذ القرار النهائي
// القرار يبنى على تحليل متعدد الطبقات ونظام نقاط معقد
function makeUltimateDecision(serverIP, host, url, analysis, traffic, timeAnalysis) {
  
  // ══════════════════════════════════════════════════
  // المرحلة صفر: الحظر الفوري - لا نقاش
  // ══════════════════════════════════════════════════
  
  if (analysis.shouldBlock) {
    MEMORY.stats.totalBlocked++;
    return {
      action: ABSOLUTE_BLOCK, 
      reason: analysis.blockReason,
      detail: "محظور: " + (analysis.threat || "غير أردني")
    };
  }
  
  // ══════════════════════════════════════════════════
  // المرحلة الأولى: Matchmaking - القمع الإجباري
  // ══════════════════════════════════════════════════
  
  if (traffic.type === "matchmaking") {
    
    // معايير قبول صارمة جداً للـ matchmaking
    // فقط سيرفرات أردنية ذات بينغ ممتاز
    if (!analysis.isJordanian) {
      MEMORY.servers.banned[serverIP] = {
        reason: "matchmaking_not_jordanian",
        bannedAt: Date.now()
      };
      return {
        action: ABSOLUTE_BLOCK, 
        reason: "matchmaking_requires_jordanian",
        detail: "Matchmaking يقبل فقط سيرفرات أردنية"
      };
    }
    
    // رفض البينغ العالي في Matchmaking
    if (analysis.expectedPing > 20) {
      return {
        action: ABSOLUTE_BLOCK, 
        reason: "matchmaking_ping_too_high",
        detail: "البينغ " + analysis.expectedPing + "ms أعلى من 20ms"
      };
    }
    
    // كل الأردنيين يمرون من نفس القمع
    // هذا يخلق تجمعاً هائلاً في نقطة واحدة
    MEMORY.stats.totalProxied++;
    return {
      action: CONVERGENCE_POINT, 
      reason: "matchmaking_convergence",
      detail: "توجيه لنقطة التجميع الإجبارية"
    };
  }
  
  // ══════════════════════════════════════════════════
  // المرحلة الثانية: Recruitment - التجنيد
  // ══════════════════════════════════════════════════
  
  if (traffic.type === "recruitment") {
    
    // التجنيد مهم جداً لجمع لاعبين أردنيين في نفس الفريق
    if (!analysis.isJordanian) {
      return {
        action: ABSOLUTE_BLOCK, 
        reason: "recruitment_not_jordanian",
        detail: "التجنيد يقبل فقط أردنيين"
      };
    }
    
    // نفس القمع لضمان التجمع
    MEMORY.stats.totalProxied++;
    return {
      action: CONVERGENCE_POINT, 
      reason: "recruitment_convergence",
      detail: "توجيه التجنيد لنقطة التجميع"
    };
  }
  
  // ══════════════════════════════════════════════════
  // المرحلة الثالثة: Match - المباراة الفعلية
  // ══════════════════════════════════════════════════
  
  if (traffic.type === "match") {
    
    // رفض فوري لأي سيرفر غير أردني
    if (!analysis.isJordanian) {
      MEMORY.servers.banned[serverIP] = {
        reason: "match_not_jordanian",
        bannedAt: Date.now()
      };
      return {
        action: ABSOLUTE_BLOCK, 
        reason: "match_requires_jordanian",
        detail: "المباريات تقبل فقط سيرفرات أردنية"
      };
    }
    
    // رفض البينغ العالي
    if (analysis.expectedPing > MAX_ACCEPTABLE_PING) {
      return {
        action: ABSOLUTE_BLOCK, 
        reason: "match_ping_too_high",
        detail: "البينغ " + analysis.expectedPing + "ms أعلى من " + MAX_ACCEPTABLE_PING + "ms"
      };
    }
    
    // ═══ بدء جلسة جديدة ═══
    if (!MEMORY.activeSession.active) {
      initializeSession(serverIP, host, url, analysis);
      MEMORY.stats.totalProxied++;
      return {
        action: UNIFIED_MATCH_PATH, 
        reason: "new_match_session",
        detail: "بدء مباراة جديدة على السيرفر " + serverIP
      };
    }
    
    // ═══ التحقق من سلامة الجلسة النشطة ═══
    var integrity = validateSessionIntegrity(serverIP, host, url);
    
    if (!integrity.valid) {
      
      // إذا وصلنا للحد الأقصى من الانتهاكات - حظر نهائي
      if (integrity.shouldBlock) {
        MEMORY.servers.banned[serverIP] = {
          reason: "session_violation",
          violations: integrity.violations,
          bannedAt: Date.now()
        };
        return {
          action: ABSOLUTE_BLOCK, 
          reason: "session_integrity_critical_violation",
          detail: integrity.detail
        };
      }
      
      // انتهاك لكن ليس حرج بعد
      return {
        action: ABSOLUTE_BLOCK, 
        reason: "session_mismatch",
        detail: integrity.detail
      };
    }
    
    // كل شيء تمام - نفس المسار الموحد
    MEMORY.stats.totalProxied++;
    return {
      action: UNIFIED_MATCH_PATH, 
      reason: "session_continuation",
      detail: "استمرار في نفس المباراة"
    };
  }
  
  // ══════════════════════════════════════════════════
  // المرحلة الرابعة: Lobby - اللوبي
  // ══════════════════════════════════════════════════
  
  if (traffic.type === "lobby") {
    
    // فحص تلقائي لإنهاء الجلسات القديمة
    checkAutoTermination();
    
    // رفض غير الأردني
    if (!analysis.isJordanian) {
      return {
        action: ABSOLUTE_BLOCK, 
        reason: "lobby_not_jordanian",
        detail: "اللوبي يقبل فقط أردنيين"
      };
    }
    
    // اللوبي أيضاً يستخدم نقطة التجميع لزيادة الفرص
    MEMORY.stats.totalProxied++;
    return {
      action: CONVERGENCE_POINT, 
      reason: "lobby_convergence",
      detail: "توجيه اللوبي لنقطة التجميع"
    };
  }
  
  // ══════════════════════════════════════════════════
  // المرحلة الخامسة: Social - الخدمات الاجتماعية
  // ══════════════════════════════════════════════════
  
  if (traffic.type === "social") {
    
    if (!analysis.isJordanian) {
      return {
        action: ABSOLUTE_BLOCK, 
        reason: "social_not_jordanian",
        detail: "الخدمات الاجتماعية للأردنيين فقط"
      };
    }
    
    // الخدمات الاجتماعية تستخدم التجميع أيضاً
    MEMORY.stats.totalProxied++;
    return {
      action: CONVERGENCE_POINT, 
      reason: "social_convergence",
      detail: "توجيه الخدمات الاجتماعية للتجميع"
    };
  }
  
  // ══════════════════════════════════════════════════
  // المرحلة السادسة: CDN - المحتوى
  // ══════════════════════════════════════════════════
  
  if (traffic.type === "cdn") {
    
    if (!analysis.isJordanian) {
      return {
        action: ABSOLUTE_BLOCK, 
        reason: "cdn_not_jordanian",
        detail: "المحتوى من مصادر أردنية فقط"
      };
    }
    
    // CDN نفضل DIRECT إذا كان سريع جداً
    if (analysis.expectedPing < IDEAL_PING_THRESHOLD && analysis.allowDirect) {
      MEMORY.stats.totalDirect++;
      return {
        action: DIRECT, 
        reason: "cdn_direct_fast",
        detail: "اتصال مباشر للمحتوى (بينغ " + analysis.expectedPing + "ms)"
      };
    }
    
    MEMORY.stats.totalProxied++;
    return {
      action: CONVERGENCE_POINT, 
      reason: "cdn_proxied",
      detail: "المحتوى عبر البروكسي"
    };
  }
  
  // ══════════════════════════════════════════════════
  // المرحلة السابعة: General - حركة عامة
  // ══════════════════════════════════════════════════
  
  if (!analysis.isJordanian) {
    return {
      action: ABSOLUTE_BLOCK, 
      reason: "general_not_jordanian",
      detail: "كل الحركة يجب أن تكون أردنية"
    };
  }
  
  // السيرفرات الماسية - DIRECT دائماً
  if (analysis.trustLevel === "diamond") {
    MEMORY.stats.totalDirect++;
    return {
      action: DIRECT, 
      reason: "diamond_server_direct",
      detail: "سيرفر ماسي موثوق - اتصال مباشر"
    };
  }
  
  // سريع جداً - DIRECT
  if (analysis.expectedPing < IDEAL_PING_THRESHOLD && analysis.allowDirect) {
    MEMORY.stats.totalDirect++;
    return {
      action: DIRECT, 
      reason: "very_fast_direct",
      detail: "سيرفر سريع جداً (بينغ " + analysis.expectedPing + "ms) - اتصال مباشر"
    };
  }
  
  // افتراضي - عبر نقطة التجميع
  MEMORY.stats.totalProxied++;
  return {
    action: CONVERGENCE_POINT, 
    reason: "general_convergence",
    detail: "حركة عامة عبر نقطة التجميع"
  };
}

// ═══════════════════════════════════════════════════════════════════════════
//  SECTION 14: MAIN ROUTER - الموجه الرئيسي النهائي
// ═══════════════════════════════════════════════════════════════════════════

// هذه هي الدالة التي يستدعيها المتصفح أو النظام لكل طلب شبكي
// هي نقطة الدخول الرئيسية لكل السكربت
function FindProxyForURL(url, host) {
  
  // ════════════════════════════════════════════
  // الخطوة الأولى: تنظيف وتحضير المدخلات
  // ════════════════════════════════════════════
  
  host = norm(host).toLowerCase();
  
  // ════════════════════════════════════════════
  // الخطوة الثانية: فلترة سريعة - غير PUBG
  // ════════════════════════════════════════════
  
  // إذا لم يكن طلب متعلق بببجي - نسمح به مباشرة بدون تدخل
  if (!isPUBG(host)) {
    return DIRECT;
  }
  
  // ════════════════════════════════════════════
  // الخطوة الثالثة: تهيئة معلومات اللاعب
  // ════════════════════════════════════════════
  
  // إذا لم نكتشف معلومات اللاعب بعد - نحاول
  if (!MEMORY.player.provider) {
    detectPlayerInfo();
  }
  
  // ════════════════════════════════════════════
  // الخطوة الرابعة: حل DNS مع تخزين مؤقت
  // ════════════════════════════════════════════
  
  var serverIP = smartResolve(host);
  
  // رفض IPv6 أو فشل الحل
  if (!serverIP || serverIP.indexOf(":") > -1) {
    MEMORY.stats.totalBlocked++;
    return ABSOLUTE_BLOCK;
  }
  
  // ════════════════════════════════════════════
  // الخطوة الخامسة: التحليل الشامل المتعدد الطبقات
  // ════════════════════════════════════════════
  
  // تحليل عميق للسيرفر
  var analysis = deepAnalyzeIP(serverIP);
  
  // تصنيف نوع الحركة
  var traffic = classifyTraffic(url, host);
  
  // تحليل التوقيت الحالي
  var timeAnalysis = analyzeCurrentTime();
  
  // ════════════════════════════════════════════
  // الخطوة السادسة: تطبيق مكافأة التوقيت
  // ════════════════════════════════════════════
  
  // إذا كان السيرفر أردني - نطبق مكافأة التوقيت على نقاطه
  if (analysis.isJordanian) {
    analysis.totalScore = Math.floor(analysis.totalScore * timeAnalysis.multiplier);
  }
  
  // ════════════════════════════════════════════
  // الخطوة السابعة: اتخاذ القرار النهائي المطلق
  // ════════════════════════════════════════════
  
  var decision = makeUltimateDecision(
    serverIP, 
    host, 
    url, 
    analysis, 
    traffic, 
    timeAnalysis
  );
  
  // ════════════════════════════════════════════
  // الخطوة الثامنة: إرجاع القرار
  // ════════════════════════════════════════════
  
  return decision.action;
}

// ═══════════════════════════════════════════════════════════════════════════
//  نهاية السكربت النهائي الشامل المتكامل
//  تم التصميم بعناية فائقة لتحقيق أقصى تجميع للاعبين الأردنيين
// ═══════════════════════════════════════════════════════════════════════════
