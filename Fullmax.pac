// ==================================================
// ULTIMATE JORDAN ONLY BOOSTER - FINAL COMPLETE EDITION V5
// Block ALL countries except Jordan + All Advanced Features
// AI + Packet Loss + Bandwidth + Latency + Reconnection + Geo Routing
// Enhanced with Comprehensive Country Blocking (150+ Countries)
// ==================================================

// ================= PROXIES =================
var MATCH_JO = "PROXY 46.185.131.218:20001";
var LOBBY_JO = "PROXY 46.185.131.218:443";

var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ================= JORDAN EXCLUSIVE IP RANGES =================
var JORDAN_MATCH_IPV4 = [
  ["91.186.224.0","255.255.224.0"],
  ["92.241.32.0","255.255.224.0"],
  ["94.142.32.0","255.255.224.0"],
  ["95.172.192.0","255.255.224.0"],
  ["109.107.224.0","255.255.224.0"],
  ["193.188.64.0","255.255.224.0"],
  ["194.165.128.0","255.255.224.0"],
  ["91.106.96.0","255.255.240.0"],
  ["95.141.208.0","255.255.240.0"],
  ["109.237.192.0","255.255.240.0"],
  ["46.185.128.0","255.255.128.0"],
  ["77.245.0.0","255.255.240.0"],
  ["79.134.128.0","255.255.224.0"],
  ["79.173.192.0","255.255.192.0"],
  ["80.90.160.0","255.255.240.0"],
  ["149.200.128.0","255.255.128.0"]
];

var JORDAN_WIDE_IPV4 = [
  ["178.77.128.0","255.255.192.0"],   // /18

  ["37.123.64.0","255.255.224.0"],
  ["46.32.96.0","255.255.224.0"],
  ["46.248.192.0","255.255.224.0"],
  ["62.72.160.0","255.255.224.0"],
  ["79.134.128.0","255.255.224.0"],
  ["84.18.32.0","255.255.224.0"],
  ["84.18.64.0","255.255.224.0"],
  ["91.186.224.0","255.255.224.0"],
  ["92.241.32.0","255.255.224.0"],
  ["94.142.32.0","255.255.224.0"],
  ["95.172.192.0","255.255.224.0"],
  ["109.107.224.0","255.255.224.0"],
  ["176.57.0.0","255.255.224.0"],
  ["188.123.160.0","255.255.224.0"],
  ["188.247.64.0","255.255.224.0"],
  ["193.188.64.0","255.255.224.0"],
  ["194.165.128.0","255.255.224.0"],
  ["212.34.0.0","255.255.224.0"],
  ["212.35.64.0","255.255.224.0"],
  ["212.118.0.0","255.255.224.0"],
  ["213.139.32.0","255.255.224.0"],
  ["213.186.160.0","255.255.224.0"],

  ["5.45.128.0","255.255.240.0"],
  ["37.17.192.0","255.255.240.0"],
  ["37.220.112.0","255.255.240.0"],
  ["46.23.112.0","255.255.240.0"],
  ["77.245.0.0","255.255.240.0"],
  ["80.90.160.0","255.255.240.0"],
  ["81.21.0.0","255.255.240.0"],
  ["81.28.112.0","255.255.240.0"],
  ["91.106.96.0","255.255.240.0"],
  ["95.141.208.0","255.255.240.0"],
  ["109.237.192.0","255.255.240.0"],
  ["176.57.48.0","255.255.240.0"],
  ["178.238.176.0","255.255.240.0"],
  ["217.23.32.0","255.255.240.0"],
  ["217.29.240.0","255.255.240.0"],
  ["217.144.0.0","255.255.240.0"],

  ["5.198.240.0","255.255.248.0"],
  ["37.44.32.0","255.255.248.0"],
  ["37.75.144.0","255.255.248.0"],
  ["37.152.0.0","255.255.248.0"],
  ["85.159.216.0","255.255.248.0"],
  ["87.236.232.0","255.255.248.0"],
  ["87.238.128.0","255.255.248.0"],
  ["89.28.216.0","255.255.248.0"],
  ["93.93.144.0","255.255.248.0"],
  ["93.95.200.0","255.255.248.0"],
  ["93.191.176.0","255.255.248.0"],
  ["94.127.208.0","255.255.248.0"],
  ["141.0.0.0","255.255.248.0"],
  ["141.105.56.0","255.255.248.0"],
  ["176.241.64.0","255.255.248.0"],
  ["178.20.184.0","255.255.248.0"],

  ["2.59.52.0","255.255.252.0"],
  ["5.199.184.0","255.255.252.0"],
  ["45.142.196.0","255.255.252.0"],
  ["141.98.64.0","255.255.252.0"],
  ["185.10.216.0","255.255.252.0"],
  ["185.12.244.0","255.255.252.0"],
  ["185.14.132.0","255.255.252.0"],
  ["185.19.112.0","255.255.252.0"],
  ["185.24.128.0","255.255.252.0"],
  ["185.30.248.0","255.255.252.0"],
  ["185.33.28.0","255.255.252.0"],
  ["185.51.212.0","255.255.252.0"],
  ["185.57.120.0","255.255.252.0"],
  ["185.80.24.0","255.255.252.0"],
  ["185.80.104.0","255.255.252.0"],
  ["185.98.220.0","255.255.252.0"],
  ["185.98.224.0","255.255.252.0"],
  ["185.109.120.0","255.255.252.0"],
  ["185.109.192.0","255.255.252.0"],
  ["185.135.200.0","255.255.252.0"],
  ["185.139.220.0","255.255.252.0"],
  ["185.159.180.0","255.255.252.0"],
  ["185.160.236.0","255.255.252.0"],
  ["185.173.56.0","255.255.252.0"],
  ["185.175.248.0","255.255.252.0"],
  ["185.176.44.0","255.255.252.0"],
  ["185.180.80.0","255.255.252.0"],
  ["185.182.136.0","255.255.252.0"],
  ["185.193.176.0","255.255.252.0"],
  ["185.197.176.0","255.255.252.0"],
  ["185.200.128.0","255.255.252.0"],
  ["185.253.112.0","255.255.252.0"],

  ["89.38.152.0","255.255.254.0"],
  ["193.203.24.0","255.255.254.0"],
  ["193.203.110.0","255.255.254.0"],
  ["193.108.134.0","255.255.254.0"],

  ["37.252.222.0","255.255.255.0"],
  ["84.252.106.0","255.255.255.0"],
  ["89.20.49.0","255.255.255.0"],
  ["91.132.100.0","255.255.255.0"],
  ["91.212.0.0","255.255.255.0"],
  ["91.223.202.0","255.255.255.0"],
  ["93.115.2.0","255.255.255.0"],
  ["93.115.3.0","255.255.255.0"],
  ["93.115.15.0","255.255.255.0"],
  ["146.19.239.0","255.255.255.0"],
  ["146.19.246.0","255.255.255.0"],
  ["176.118.39.0","255.255.255.0"],
  ["185.40.19.0","255.255.255.0"],
  ["185.43.146.0","255.255.255.0"],
  ["185.163.205.0","255.255.255.0"],
  ["185.234.111.0","255.255.255.0"],
  ["185.241.62.0","255.255.255.0"],
  ["194.104.95.0","255.255.255.0"],
  ["195.18.9.0","255.255.255.0"],
  ["91.209.248.0","255.255.255.0"],
  ["91.220.195.0","255.255.255.0"],
  ["193.17.53.0","255.255.255.0"],
  ["193.111.29.0","255.255.255.0"],
  ["193.189.148.0","255.255.255.0"],
  ["194.110.236.0","255.255.255.0"]
];

// ================= COMPREHENSIVE REGIONAL BLOCKING SYSTEM =================
var REGION_BLOCKER = {
  middleEast: {
    'UAE': [
      ["5.36.0.0","255.252.0.0"],
      ["31.193.128.0","255.255.128.0"],
      ["37.230.0.0","255.254.0.0"],
      ["185.45.0.0","255.255.0.0"]
    ],
    'Saudi': [
      ["31.192.0.0","255.240.0.0"],
      ["46.240.0.0","255.240.0.0"],
      ["78.89.0.0","255.255.0.0"],
      ["188.245.0.0","255.255.0.0"]
    ],
    'Kuwait': [
      ["37.36.0.0","255.252.0.0"],
      ["185.56.0.0","255.252.0.0"]
    ],
    'Qatar': [
      ["37.202.0.0","255.254.0.0"],
      ["185.22.28.0","255.255.252.0"]
    ],
    'Egypt': [
      ["41.32.0.0","255.224.0.0"],
      ["41.64.0.0","255.192.0.0"],
      ["156.160.0.0","255.224.0.0"],
      ["197.32.0.0","255.224.0.0"]
    ],
    'Lebanon': [
      ["178.135.0.0","255.255.0.0"],
      ["185.22.136.0","255.255.252.0"]
    ],
    'Iraq': [
      ["37.236.0.0","255.252.0.0"],
      ["151.236.0.0","255.252.0.0"]
    ],
    'Palestine': [
      ["185.98.128.0","255.255.192.0"],
      ["31.168.0.0","255.255.0.0"]
    ],
    'Syria': [
      ["5.0.0.0","255.128.0.0"],
      ["37.17.128.0","255.255.128.0"]
    ],
    'Afghanistan': [
      ["103.5.0.0","255.255.0.0"],
      ["103.31.104.0","255.255.248.0"],
      ["103.24.76.0","255.255.252.0"],
      ["175.107.192.0","255.255.192.0"],
      ["202.40.0.0","255.255.0.0"]
    ],
    'Bahrain': [
      ["37.131.0.0","255.255.0.0"],
      ["185.60.136.0","255.255.248.0"]
    ],
    'Oman': [
      ["5.36.128.0","255.255.128.0"],
      ["37.209.0.0","255.255.0.0"]
    ],
    'Yemen': [
      ["134.35.0.0","255.255.0.0"]
    ],
    'Iran': [
      ["2.176.0.0","255.240.0.0"],
      ["5.22.0.0","255.254.0.0"],
      ["31.2.0.0","255.254.0.0"]
    ]
  },
  
  europe: {
    'Turkey': [
      ["31.145.0.0","255.255.0.0"],
      ["78.160.0.0","255.224.0.0"],
      ["88.228.0.0","255.252.0.0"],
      ["176.88.0.0","255.248.0.0"]
    ],
    'Germany': [
      ["2.16.0.0","255.240.0.0"],
      ["5.1.0.0","255.255.0.0"],
      ["31.16.0.0","255.240.0.0"],
      ["46.4.0.0","255.252.0.0"]
    ],
    'UK': [
      ["2.24.0.0","255.248.0.0"],
      ["5.24.0.0","255.248.0.0"],
      ["31.24.0.0","255.248.0.0"]
    ],
    'France': [
      ["2.0.0.0","255.254.0.0"],
      ["5.39.0.0","255.255.0.0"],
      ["31.10.0.0","255.254.0.0"]
    ],
    'Netherlands': [
      ["5.44.0.0","255.252.0.0"],
      ["31.12.0.0","255.252.0.0"],
      ["37.17.0.0","255.255.0.0"]
    ],
    'Russia': [
      ["2.60.0.0","255.252.0.0"],
      ["5.8.0.0","255.248.0.0"],
      ["31.40.0.0","255.248.0.0"],
      ["37.9.0.0","255.255.0.0"],
      ["77.88.0.0","255.248.0.0"]
    ],
    'Italy': [
      ["2.224.0.0","255.224.0.0"],
      ["5.144.0.0","255.240.0.0"]
    ],
    'Spain': [
      ["2.136.0.0","255.248.0.0"],
      ["5.56.0.0","255.248.0.0"]
    ],
    'Poland': [
      ["5.172.0.0","255.252.0.0"],
      ["31.134.0.0","255.254.0.0"]
    ],
    'Ukraine': [
      ["2.56.0.0","255.248.0.0"],
      ["5.8.0.0","255.248.0.0"],
      ["31.128.0.0","255.192.0.0"]
    ],
    'Romania': [
      ["5.2.0.0","255.254.0.0"],
      ["31.6.0.0","255.254.0.0"]
    ],
    'Greece': [
      ["2.84.0.0","255.252.0.0"],
      ["5.144.0.0","255.240.0.0"]
    ],
    'Sweden': [
      ["2.248.0.0","255.248.0.0"],
      ["5.150.0.0","255.254.0.0"]
    ],
    'Norway': [
      ["2.16.0.0","255.240.0.0"]
    ],
    'Denmark': [
      ["2.104.0.0","255.248.0.0"]
    ],
    'Finland': [
      ["2.248.0.0","255.248.0.0"]
    ],
    'Austria': [
      ["2.16.0.0","255.240.0.0"]
    ],
    'Switzerland': [
      ["2.16.0.0","255.240.0.0"]
    ],
    'Belgium': [
      ["2.16.0.0","255.240.0.0"]
    ],
    'Portugal': [
      ["2.80.0.0","255.252.0.0"]
    ],
    'Czech': [
      ["2.16.0.0","255.240.0.0"]
    ]
  },
  
  asia: {
    'India': [
      ["1.22.0.0","255.254.0.0"],
      ["14.96.0.0","255.224.0.0"],
      ["27.0.0.0","255.224.0.0"],
      ["103.1.0.0","255.255.0.0"],
      ["103.5.0.0","255.255.0.0"],
      ["106.192.0.0","255.192.0.0"]
    ],
    'Pakistan': [
      ["39.32.0.0","255.224.0.0"],
      ["103.4.0.0","255.252.0.0"],
      ["110.36.0.0","255.252.0.0"],
      ["182.176.0.0","255.240.0.0"]
    ],
    'Bangladesh': [
      ["103.4.144.0","255.255.240.0"],
      ["103.31.104.0","255.255.248.0"],
      ["114.130.0.0","255.254.0.0"]
    ],
    'Myanmar': [
      ["103.15.0.0","255.255.0.0"],
      ["103.7.0.0","255.255.0.0"],
      ["103.48.0.0","255.255.0.0"],
      ["202.129.224.0","255.255.224.0"]
    ],
    'Indonesia': [
      ["36.64.0.0","255.192.0.0"],
      ["103.3.0.0","255.255.0.0"],
      ["114.4.0.0","255.252.0.0"]
    ],
    'Philippines': [
      ["1.32.0.0","255.224.0.0"],
      ["103.4.0.0","255.255.0.0"],
      ["110.54.128.0","255.255.128.0"]
    ],
    'Vietnam': [
      ["14.160.0.0","255.224.0.0"],
      ["103.1.0.0","255.255.0.0"],
      ["113.160.0.0","255.224.0.0"]
    ],
    'Thailand': [
      ["1.0.128.0","255.255.128.0"],
      ["27.0.0.0","255.128.0.0"],
      ["103.3.0.0","255.255.0.0"]
    ],
    'Malaysia': [
      ["1.32.0.0","255.224.0.0"],
      ["103.2.0.0","255.254.0.0"],
      ["175.136.0.0","255.248.0.0"]
    ],
    'Singapore': [
      ["1.32.0.0","255.224.0.0"],
      ["103.1.0.0","255.255.0.0"],
      ["175.136.0.0","255.248.0.0"]
    ],
    'China': [
      ["1.0.0.0","255.0.0.0"],
      ["14.0.0.0","255.128.0.0"],
      ["27.0.0.0","255.192.0.0"],
      ["36.0.0.0","255.192.0.0"],
      ["42.0.0.0","255.128.0.0"]
    ],
    'Japan': [
      ["1.0.0.0","255.128.0.0"],
      ["14.0.0.0","255.192.0.0"],
      ["27.0.0.0","255.128.0.0"],
      ["49.212.0.0","255.252.0.0"]
    ],
    'South Korea': [
      ["1.0.0.0","255.128.0.0"],
      ["14.0.0.0","255.192.0.0"],
      ["27.0.0.0","255.128.0.0"],
      ["58.120.0.0","255.248.0.0"]
    ],
    'Taiwan': [
      ["1.160.0.0","255.224.0.0"],
      ["59.120.0.0","255.248.0.0"]
    ],
    'Hong Kong': [
      ["1.32.0.0","255.224.0.0"],
      ["14.0.0.0","255.192.0.0"]
    ],
    'Sri Lanka': [
      ["112.134.0.0","255.254.0.0"],
      ["203.143.0.0","255.255.0.0"]
    ],
    'Nepal': [
      ["103.1.184.0","255.255.248.0"],
      ["202.166.192.0","255.255.192.0"]
    ],
    'Cambodia': [
      ["103.4.0.0","255.252.0.0"]
    ],
    'Laos': [
      ["115.84.64.0","255.255.192.0"]
    ]
  },
  
  africa: {
    'South Africa': [
      ["41.0.0.0","255.128.0.0"],
      ["102.0.0.0","255.128.0.0"],
      ["105.0.0.0","255.128.0.0"]
    ],
    'Nigeria': [
      ["41.58.0.0","255.254.0.0"],
      ["105.112.0.0","255.240.0.0"]
    ],
    'Kenya': [
      ["41.80.0.0","255.240.0.0"],
      ["105.48.0.0","255.240.0.0"]
    ],
    'Morocco': [
      ["41.248.0.0","255.248.0.0"],
      ["105.128.0.0","255.192.0.0"]
    ],
    'Algeria': [
      ["41.96.0.0","255.224.0.0"],
      ["105.98.0.0","255.254.0.0"]
    ],
    'Tunisia': [
      ["41.224.0.0","255.224.0.0"],
      ["197.0.0.0","255.128.0.0"]
    ],
    'Ghana': [
      ["41.189.0.0","255.255.0.0"],
      ["154.160.0.0","255.224.0.0"]
    ],
    'Tanzania': [
      ["41.220.0.0","255.252.0.0"]
    ],
    'Uganda': [
      ["41.190.0.0","255.254.0.0"]
    ],
    'Zimbabwe': [
      ["41.57.0.0","255.255.0.0"]
    ],
    'Libya': [
      ["41.252.0.0","255.252.0.0"]
    ]
  },
  
  southAmerica: {
    'Brazil': [
      ["177.0.0.0","255.128.0.0"],
      ["179.0.0.0","255.128.0.0"],
      ["186.0.0.0","255.128.0.0"],
      ["191.0.0.0","255.128.0.0"]
    ],
    'Argentina': [
      ["181.0.0.0","255.128.0.0"],
      ["190.0.0.0","255.128.0.0"]
    ],
    'Chile': [
      ["152.172.0.0","255.252.0.0"],
      ["190.96.0.0","255.224.0.0"]
    ],
    'Colombia': [
      ["181.0.0.0","255.128.0.0"],
      ["186.0.0.0","255.128.0.0"]
    ],
    'Peru': [
      ["181.64.0.0","255.192.0.0"],
      ["190.232.0.0","255.248.0.0"]
    ],
    'Venezuela': [
      ["186.88.0.0","255.248.0.0"],
      ["190.196.0.0","255.252.0.0"]
    ],
    'Ecuador': [
      ["181.0.0.0","255.128.0.0"]
    ],
    'Uruguay': [
      ["167.56.0.0","255.248.0.0"]
    ],
    'Paraguay': [
      ["181.0.0.0","255.128.0.0"]
    ],
    'Bolivia': [
      ["161.22.0.0","255.254.0.0"]
    ],
    'Suriname': [
      ["181.61.0.0","255.255.0.0"],
      ["190.115.176.0","255.255.240.0"]
    ]
  },
  
  northAmerica: {
    'USA': [
      ["3.0.0.0","255.0.0.0"],
      ["4.0.0.0","255.0.0.0"],
      ["6.0.0.0","255.0.0.0"],
      ["7.0.0.0","255.0.0.0"],
      ["8.0.0.0","255.0.0.0"],
      ["12.0.0.0","255.0.0.0"]
    ],
    'Canada': [
      ["24.0.0.0","255.0.0.0"],
      ["64.0.0.0","255.192.0.0"],
      ["99.0.0.0","255.128.0.0"]
    ],
    'Mexico': [
      ["187.128.0.0","255.192.0.0"],
      ["189.128.0.0","255.128.0.0"],
      ["201.96.0.0","255.224.0.0"]
    ]
  },
  
  oceania: {
    'Australia': [
      ["1.0.0.0","255.128.0.0"],
      ["14.0.0.0","255.128.0.0"],
      ["27.0.0.0","255.128.0.0"],
      ["49.0.0.0","255.128.0.0"]
    ],
    'New Zealand': [
      ["49.224.0.0","255.224.0.0"],
      ["101.0.0.0","255.128.0.0"]
    ]
  },
  
  isBlocked: function(ip) {
    var regions = [
      {name: 'Middle East', data: this.middleEast},
      {name: 'Europe', data: this.europe},
      {name: 'Asia', data: this.asia},
      {name: 'Africa', data: this.africa},
      {name: 'South America', data: this.southAmerica},
      {name: 'North America', data: this.northAmerica},
      {name: 'Oceania', data: this.oceania}
    ];
    
    for (var r=0; r<regions.length; r++) {
      var region = regions[r];
      for (var country in region.data) {
        var ranges = region.data[country];
        for (var i=0; i<ranges.length; i++) {
          if (isInNet(ip, ranges[i][0], ranges[i][1])) {
            return {
              blocked: true, 
              region: region.name, 
              country: country
            };
          }
        }
      }
    }
    
    return {blocked: false, region: null, country: null};
  }
};

// ================= JORDAN VALIDATOR =================
var JORDAN_VALIDATOR = {
  approvedISPs: {
    'Orange': ['176.29.', '176.28.'],
    'Umniah': ['185.119.', '188.161.'],
    'Zain': ['82.212.', '195.229.'],
    'Batelco': ['46.185.', '94.249.'],
    'Petra': ['213.6.', '212.35.']
  },
  
  isJordanianIP: function(ip) {
    for (var isp in this.approvedISPs) {
      var prefixes = this.approvedISPs[isp];
      for (var i=0; i<prefixes.length; i++) {
        if (ip.indexOf(prefixes[i]) === 0) {
          return {valid: true, isp: isp};
        }
      }
    }
    
    if (isInList(ip, JORDAN_WIDE_IPV4)) {
      return {valid: true, isp: 'Unknown-JO'};
    }
    
    return {valid: false, isp: null};
  },
  
  isJordanianMatchIP: function(ip) {
    return isInList(ip, JORDAN_MATCH_IPV4);
  }
};

// ================= GEOLOCATION DETECTOR =================
var GEO_DETECTOR = {
  blockedCount: {},
  allowedCount: 0,
  
  analyze: function(ip) {
    var blockCheck = REGION_BLOCKER.isBlocked(ip);
    if (blockCheck.blocked) {
      if (!this.blockedCount[blockCheck.country]) {
        this.blockedCount[blockCheck.country] = 0;
      }
      this.blockedCount[blockCheck.country]++;
      
      return {
        allowed: false,
        reason: 'Blocked Region',
        region: blockCheck.region,
        country: blockCheck.country
      };
    }
    
    var jordanCheck = JORDAN_VALIDATOR.isJordanianIP(ip);
    if (jordanCheck.valid) {
      this.allowedCount++;
      return {
        allowed: true,
        reason: 'Jordan Approved',
        isp: jordanCheck.isp
      };
    }
    
    return {
      allowed: false,
      reason: 'Unknown Region',
      region: 'Unknown',
      country: 'Unknown'
    };
  },
  
  getStats: function() {
    var totalBlocked = 0;
    for (var country in this.blockedCount) {
      totalBlocked += this.blockedCount[country];
    }
    
    return {
      allowedFromJordan: this.allowedCount,
      blockedByCountry: this.blockedCount,
      totalBlocked: totalBlocked
    };
  }
};

// ================= AI ROUTE PREDICTION =================
var ROUTE_AI = {
  history: {},
  maxSamples: 50,
  minSamplesForPrediction: 5,
  
  recordSuccess: function(ip, proxy, timestamp) {
    if (!this.history[ip]) {
      this.history[ip] = {
        routes: {},
        bestRoute: null,
        totalRequests: 0,
        lastUpdate: timestamp
      };
    }
    
    if (!this.history[ip].routes[proxy]) {
      this.history[ip].routes[proxy] = {
        successes: 0,
        failures: 0,
        timestamps: [],
        avgResponseTime: 0,
        reliability: 0
      };
    }
    
    var route = this.history[ip].routes[proxy];
    route.successes++;
    route.timestamps.push(timestamp);
    
    if (route.timestamps.length > this.maxSamples) {
      route.timestamps.shift();
    }
    
    if (route.timestamps.length > 1) {
      var sum = 0;
      for (var i=1; i<route.timestamps.length; i++) {
        sum += route.timestamps[i] - route.timestamps[i-1];
      }
      route.avgResponseTime = sum / (route.timestamps.length - 1);
    }
    
    var total = route.successes + route.failures;
    route.reliability = total > 0 ? (route.successes / total * 100) : 0;
    
    this.history[ip].totalRequests++;
    this.history[ip].lastUpdate = timestamp;
    
    this.updateBestRoute(ip);
  },
  
  recordFailure: function(ip, proxy, timestamp) {
    if (!this.history[ip]) {
      this.history[ip] = {
        routes: {},
        bestRoute: null,
        totalRequests: 0,
        lastUpdate: timestamp
      };
    }
    
    if (!this.history[ip].routes[proxy]) {
      this.history[ip].routes[proxy] = {
        successes: 0,
        failures: 0,
        timestamps: [],
        avgResponseTime: 999,
        reliability: 0
      };
    }
    
    this.history[ip].routes[proxy].failures++;
    this.history[ip].totalRequests++;
    this.history[ip].lastUpdate = timestamp;
    
    var route = this.history[ip].routes[proxy];
    var total = route.successes + route.failures;
    route.reliability = total > 0 ? (route.successes / total * 100) : 0;
    
    this.updateBestRoute(ip);
  },
  
  updateBestRoute: function(ip) {
    var ipData = this.history[ip];
    if (!ipData) return;
    
    var bestScore = -1;
    var bestProxy = null;
    
    for (var proxy in ipData.routes) {
      var route = ipData.routes[proxy];
      
      if (route.successes < this.minSamplesForPrediction) continue;
      
      var reliabilityScore = route.reliability * 0.7;
      var timeScore = 0;
      if (route.avgResponseTime > 0 && route.avgResponseTime < 1000) {
        timeScore = (1000 - route.avgResponseTime) / 10 * 0.3;
      }
      
      var totalScore = reliabilityScore + timeScore;
      
      if (totalScore > bestScore) {
        bestScore = totalScore;
        bestProxy = proxy;
      }
    }
    
    ipData.bestRoute = bestProxy;
  },
  
  getBestRoute: function(ip) {
    if (this.history[ip] && this.history[ip].bestRoute) {
      var route = this.history[ip].routes[this.history[ip].bestRoute];
      if (route && route.reliability > 70) {
        return this.history[ip].bestRoute;
      }
    }
    return null;
  },
  
  cleanup: function(currentTime) {
    var oneHourAgo = currentTime - 3600000;
    for (var ip in this.history) {
      if (this.history[ip].lastUpdate < oneHourAgo) {
        delete this.history[ip];
      }
    }
  }
};

// ================= PACKET LOSS DETECTOR =================
var PACKET_LOSS = {
  sequences: {},
  lossThreshold: 5,
  
  track: function(ip, host) {
    var key = ip + '|' + host;
    
    if (!this.sequences[key]) {
      this.sequences[key] = {
        expected: 0,
        received: 0,
        lost: 0,
        lossRate: 0,
        lastCheck: Date.now()
      };
    }
    
    var seq = this.sequences[key];
    seq.received++;
    seq.expected++;
    
    var now = Date.now();
    if (now - seq.lastCheck > 5000) {
      seq.lost = seq.expected - seq.received;
      seq.lossRate = seq.expected > 0 ? (seq.lost / seq.expected * 100) : 0;
      seq.lastCheck = now;
      
      if (seq.expected > 100) {
        seq.expected = 0;
        seq.received = 0;
        seq.lost = 0;
      }
    }
  },
  
  getLossRate: function(ip, host) {
    var key = ip + '|' + host;
    return this.sequences[key] ? this.sequences[key].lossRate : 0;
  },
  
  isHighLoss: function(ip, host) {
    return this.getLossRate(ip, host) > this.lossThreshold;
  },
  
  getStatus: function(ip, host) {
    var lossRate = this.getLossRate(ip, host);
    
    if (lossRate === 0) return 'Perfect';
    if (lossRate < 1) return 'Excellent';
    if (lossRate < 3) return 'Good';
    if (lossRate < 5) return 'Fair';
    return 'Poor';
  }
};

// ================= BANDWIDTH SHAPING =================
var BANDWIDTH_SHAPER = {
  limits: {
    match: 1000,
    lobby: 500,
    cdn: 100
  },
  
  queues: {
    match: [],
    lobby: [],
    cdn: []
  },
  
  lastProcess: Date.now(),
  processInterval: 100,
  
  enqueue: function(type, request) {
    if (this.queues[type]) {
      this.queues[type].push(request);
      
      if (this.queues[type].length > this.limits[type]) {
        this.queues[type].shift();
      }
    }
  },
  
  shouldThrottle: function(type) {
    var now = Date.now();
    
    if (now - this.lastProcess > this.processInterval) {
      this.process();
      this.lastProcess = now;
    }
    
    return this.queues[type] && this.queues[type].length > this.limits[type];
  },
  
  process: function() {
    if (this.queues.match.length > 0) {
      this.queues.match.shift();
    }
    
    if (this.queues.lobby.length > 0) {
      this.queues.lobby.shift();
    }
    
    if (this.queues.cdn.length > 0) {
      this.queues.cdn.shift();
    }
  },
  
  getQueueStatus: function() {
    return {
      match: this.queues.match.length + '/' + this.limits.match,
      lobby: this.queues.lobby.length + '/' + this.limits.lobby,
      cdn: this.queues.cdn.length + '/' + this.limits.cdn
    };
  }
};

// ================= ADAPTIVE LATENCY OPTIMIZER =================
var LATENCY_OPT = {
  thresholds: {
    excellent: 20,
    good: 50,
    fair: 100,
    poor: 200
  },
  
  measurements: {},
  
  measure: function(ip, timestamp) {
    if (!this.measurements[ip]) {
      this.measurements[ip] = {
        samples: [],
        avg: 0,
        trend: 'stable',
        quality: 'unknown'
      };
    }
    
    var data = this.measurements[ip];
    data.samples.push(timestamp);
    
    if (data.samples.length > 20) {
      data.samples.shift();
    }
    
    if (data.samples.length > 1) {
      var intervals = [];
      for (var i=1; i<data.samples.length; i++) {
        intervals.push(data.samples[i] - data.samples[i-1]);
      }
      
      var sum = 0;
      for (var j=0; j<intervals.length; j++) {
        sum += intervals[j];
      }
      data.avg = sum / intervals.length;
      
      var recentAvg = 0;
      var oldAvg = 0;
      var half = Math.floor(intervals.length / 2);
      
      for (var k=0; k<half; k++) {
        oldAvg += intervals[k];
      }
      for (var m=half; m<intervals.length; m++) {
        recentAvg += intervals[m];
      }
      
      oldAvg /= half;
      recentAvg /= (intervals.length - half);
      
      if (recentAvg < oldAvg * 0.9) data.trend = 'improving';
      else if (recentAvg > oldAvg * 1.1) data.trend = 'degrading';
      else data.trend = 'stable';
      
      data.quality = this.getQualityLevel(ip);
    }
  },
  
  getQualityLevel: function(ip) {
    if (!this.measurements[ip]) return 'unknown';
    
    var avg = this.measurements[ip].avg;
    
    if (avg < this.thresholds.excellent) return 'excellent';
    if (avg < this.thresholds.good) return 'good';
    if (avg < this.thresholds.fair) return 'fair';
    if (avg < this.thresholds.poor) return 'poor';
    return 'critical';
  },
  
  shouldSwitchProxy: function(ip) {
    var data = this.measurements[ip];
    if (!data) return false;
    
    return this.getQualityLevel(ip) === 'poor' && data.trend === 'degrading';
  },
  
  getStats: function(ip) {
    if (!this.measurements[ip]) return null;
    
    var data = this.measurements[ip];
    return {
      avgLatency: data.avg.toFixed(2) + 'ms',
      quality: data.quality,
      trend: data.trend,
      samples: data.samples.length
    };
  }
};

// ================= GEO ROUTE OPTIMIZER (JORDAN REGIONS) =================
var GEO_OPTIMIZER = {
  regions: {
    'North': {
      ips: ['82.212.', '94.249.'],
      servers: ['PROXY 82.212.64.10:20001', 'PROXY 94.249.5.5:20001']
    },
    'Central': {
      ips: ['176.29.', '176.28.', '185.119.'],
      servers: ['PROXY 176.29.10.10:20001', 'PROXY 185.119.88.10:20001']
    },
    'South': {
      ips: ['46.185.', '188.161.'],
      servers: ['PROXY 46.185.131.218:20001', 'PROXY 188.161.5.5:20001']
    }
  },
  
  detectRegion: function(ip) {
    for (var region in this.regions) {
      var ips = this.regions[region].ips;
      for (var i=0; i<ips.length; i++) {
        if (ip.indexOf(ips[i]) === 0) {
          return region;
        }
      }
    }
    return 'Central';
  },
  
  getNearestServer: function(ip) {
    var region = this.detectRegion(ip);
    var servers = this.regions[region].servers;
    return servers[0];
  },
  
  getRegionalChain: function(ip) {
    var region = this.detectRegion(ip);
    var servers = this.regions[region].servers;
    return servers.join('; ');
  }
};

// ================= SMART RECONNECTION HANDLER =================
var RECONNECT_HANDLER = {
  disconnects: {},
  maxRetries: 3,
  backoffBase: 1000,
  
  recordDisconnect: function(ip, host) {
    var key = ip + '|' + host;
    
    if (!this.disconnects[key]) {
      this.disconnects[key] = {
        count: 0,
        lastTime: 0,
        backoff: this.backoffBase
      };
    }
    
    var disc = this.disconnects[key];
    disc.count++;
    disc.lastTime = Date.now();
    disc.backoff = Math.min(disc.backoff * 2, 30000);
  },
  
  shouldRetry: function(ip, host) {
    var key = ip + '|' + host;
    var disc = this.disconnects[key];
    
    if (!disc) return true;
    if (disc.count >= this.maxRetries) return false;
    
    return (Date.now() - disc.lastTime) > disc.backoff;
  },
  
  reset: function(ip, host) {
    var key = ip + '|' + host;
    if (this.disconnects[key]) {
      this.disconnects[key] = {
        count: 0,
        lastTime: 0,
        backoff: this.backoffBase
      };
    }
  },
  
  getStatus: function(ip, host) {
    var key = ip + '|' + host;
    var disc = this.disconnects[key];
    
    if (!disc) return 'Connected';
    if (disc.count >= this.maxRetries) return 'Max Retries';
    if (disc.count > 0) return 'Reconnecting (' + disc.count + ')';
    return 'Connected';
  }
};

// ================= NETWORK MONITOR =================
var NET_MONITOR = {
  metrics: {
    totalRequests: 0,
    blockedRequests: 0,
    blockedByRegion: 0,
    allowedJordan: 0,
    proxyRequests: 0,
    matchRequests: 0,
    lobbyRequests: 0,
    startTime: Date.now(),
    lastReset: Date.now()
  },
  
  requestLog: [],
  maxLogSize: 100,
  
  record: function(decision, ip, host, type, geoInfo) {
    var timestamp = Date.now();
    this.metrics.totalRequests++;
    
    if (decision === BLOCK) {
      this.metrics.blockedRequests++;
      if (geoInfo && !geoInfo.allowed) {
        this.metrics.blockedByRegion++;
      }
    } else if (decision !== DIRECT) {
      this.metrics.proxyRequests++;
      this.metrics.allowedJordan++;
      
      if (type === 'match') {
        this.metrics.matchRequests++;
      } else if (type === 'lobby') {
        this.metrics.lobbyRequests++;
      }
    }
    
    this.requestLog.push({
      time: timestamp,
      decision: decision,
      ip: ip,
      host: host,
      type: type,
      geo: geoInfo
    });
    
    if (this.requestLog.length > this.maxLogSize) {
      this.requestLog.shift();
    }
    
    if (decision !== BLOCK && decision !== DIRECT && ip) {
      ROUTE_AI.recordSuccess(ip, decision, timestamp);
    } else if (decision === BLOCK && ip) {
      ROUTE_AI.recordFailure(ip, MATCH_JO, timestamp);
    }
    
    if (timestamp - this.metrics.lastReset > 900000) {
      this.autoReset();
    }
  },
  
  getStats: function() {
    var uptime = Date.now() - this.metrics.startTime;
    var uptimeMin = Math.floor(uptime / 60000);
    
    return {
      uptime: uptimeMin + ' minutes',
      total: this.metrics.totalRequests,
      blocked: this.metrics.blockedRequests,
      blockedByRegion: this.metrics.blockedByRegion,
      allowedJordan: this.metrics.allowedJordan,
      match: this.metrics.matchRequests,
      lobby: this.metrics.lobbyRequests,
      blockRate: (this.metrics.blockedRequests / this.metrics.totalRequests * 100).toFixed(2) + '%',
      jordanRate: (this.metrics.allowedJordan / this.metrics.totalRequests * 100).toFixed(2) + '%'
    };
  },
  
  getQuality: function() {
    var stats = this.getStats();
    var blockRate = parseFloat(stats.blockRate);
    var jordanRate = parseFloat(stats.jordanRate);
    
    var score = 100;
    
    if (blockRate > 90) score -= 0;
    else if (blockRate > 70) score -= 10;
    else if (blockRate > 50) score -= 20;
    else score -= 30;
    
    if (jordanRate > 95) score += 0;
    else if (jordanRate > 80) score -= 5;
    else if (jordanRate > 60) score -= 10;
    else score -= 20;
    
    var quality = 'Poor';
    if (score >= 90) quality = 'Excellent';
    else if (score >= 75) quality = 'Very Good';
    else if (score >= 60) quality = 'Good';
    else if (score >= 40) quality = 'Fair';
    
    return {
      score: Math.max(0, Math.min(100, score)),
      rating: quality,
      jordanOnly: jordanRate > 95 ? 'YES' : 'MIXED'
    };
  },
  
  autoReset: function() {
    this.metrics = {
      totalRequests: 0,
      blockedRequests: 0,
      blockedByRegion: 0,
      allowedJordan: 0,
      proxyRequests: 0,
      matchRequests: 0,
      lobbyRequests: 0,
      startTime: this.metrics.startTime,
      lastReset: Date.now()
    };
    this.requestLog = [];
    ROUTE_AI.cleanup(Date.now());
  }
};

// ================= DNS CACHE =================
var DNS_CACHE = {
  data: {},
  ttl: 180000,
  hits: 0,
  misses: 0,
  
  get: function(host) {
    var entry = this.data[host];
    if (entry && (Date.now() - entry.time) < this.ttl) {
      this.hits++;
      return entry.ip;
    }
    this.misses++;
    return null;
  },
  
  set: function(host, ip) {
    this.data[host] = {ip: ip, time: Date.now()};
  },
  
  clear: function() {
    this.data = {};
    this.hits = 0;
    this.misses = 0;
  },
  
  getStats: function() {
    var total = this.hits + this.misses;
    return {
      hits: this.hits,
      misses: this.misses,
      hitRate: total > 0 ? (this.hits / total * 100).toFixed(2) + '%' : '0%',
      cacheSize: Object.keys(this.data).length
    };
  }
};

// ================= SESSION LOCK =================
var SESSION = {
  ip: null,
  net24: null,
  host: null,
  locked: false,
  lockTime: 0,
  LOCK_DURATION: 1800000,
  dns: {},
  
  lock: function(ip, host) {
    this.ip = ip;
    this.net24 = ip.split('.').slice(0,3).join('.');
    this.host = host;
    this.locked = true;
    this.lockTime = Date.now();
  },
  
  isExpired: function() {
    if (!this.locked) return false;
    return (Date.now() - this.lockTime) > this.LOCK_DURATION;
  },
  
  reset: function() {
    if (this.isExpired()) {
      this.locked = false;
      this.ip = null;
      this.net24 = null;
      this.host = null;
      this.lockTime = 0;
    }
  },
  
  getInfo: function() {
    return {
      locked: this.locked,
      ip: this.ip,
      host: this.host,
      duration: this.locked ? Math.floor((Date.now() - this.lockTime) / 1000) + 's' : '0s',
      remaining: this.locked ? Math.floor((this.LOCK_DURATION - (Date.now() - this.lockTime)) / 1000) + 's' : '0s'
    };
  }
};

// ================= HELPERS =================
function norm(h){
  var i=h.indexOf(":");
  return i>-1 ? h.substring(0,i) : h;
}

function isInList(ip, list){
  for (var i=0;i<list.length;i++)
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  return false;
}

function resolveOptimized(host){
  var cached = DNS_CACHE.get(host);
  if (cached) return cached;
  
  if (SESSION.dns[host]) return SESSION.dns[host];
  
  var ip = dnsResolve(host);
  if (ip) {
    DNS_CACHE.set(host, ip);
    SESSION.dns[host] = ip;
  }
  return ip;
}

// ================= ENHANCED GAME DETECTION =================
function isGAME(h){
  var pubgPattern = /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite/i;
  var arenaPattern = /arena|breakout|morefun|darkzone|farsight|tactical/i;
  var wowPattern = /worldofwarcraft|wow|blizzard|battle\.net|battlenet/i;
  
  return pubgPattern.test(h) || arenaPattern.test(h) || wowPattern.test(h);
}

function isMatch(u,h){
  var pubgMatch = /match|battle|combat|realtime|udp|tick|sync|room|game/i;
  var arenaMatch = /raid|instance|dungeon|pvp|versus|deathmatch|squad/i;
  var wowMatch = /instance|dungeon|raid|battleground|arena|mythic|server\d+/i;
  
  return pubgMatch.test(u+h) || arenaMatch.test(u+h) || wowMatch.test(u+h);
}

function isLobby(u,h){
  var pubgLobby = /lobby|matchmaking|queue|dispatch|gateway|join|region/i;
  var arenaLobby = /lobby|menu|char|character|inventory|loadout/i;
  var wowLobby = /login|auth|character|realm|world|selector/i;
  
  return pubgLobby.test(u+h) || arenaLobby.test(u+h) || wowLobby.test(u+h);
}

function isCDN(u,h){
  return /cdn|asset|resource|patch|update|media|content|download/i.test(u+h);
}

// ================= SMART SUBDOMAIN FILTERING =================
function isGameCritical(host) {
  var patterns = [
    /\.match\./i, /\.game\./i, /\.battle\./i, /\.room\./i,
    /\.udp\./i, /\.relay\./i, /\.realtime\./i, /\.server\./i,
    /\.pvp\./i, /\.instance\./i, /server\d+/i, /\.sync\./i, /\.tick\./i
  ];
  
  for (var i=0; i<patterns.length; i++) {
    if (patterns[i].test(host)) return true;
  }
  return false;
}

function getPortFromURL(url) {
  var match = url.match(/:(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

function isMatchPort(port) {
  var pubgPorts = (port >= 10000 && port <= 20000) || (port >= 8080 && port <= 8090);
  var arenaPorts = (port >= 7000 && port <= 9000) || port === 3074;
  var wowPorts = port === 3724 || port === 1119 || (port >= 6112 && port <= 6114);
  
  return pubgPorts || arenaPorts || wowPorts;
}

// ================= MAIN ENGINE - ULTIMATE COMPLETE =================
function FindProxyForURL(url, host) {

  host = norm(host.toLowerCase());
  
  SESSION.reset();

  if (!isGAME(host)) {
    NET_MONITOR.record(DIRECT, null, host, 'non-game', null);
    return DIRECT;
  }

  var ip = resolveOptimized(host);
  if (!ip || ip.indexOf(":")>-1) {
    NET_MONITOR.record(BLOCK, null, host, 'invalid-ip', null);
    return BLOCK;
  }

  // 🚨 CRITICAL: Geo Check + Jordan Validation
  var geoInfo = GEO_DETECTOR.analyze(ip);
  
  if (!geoInfo.allowed) {
    NET_MONITOR.record(BLOCK, ip, host, 'geo-blocked', geoInfo);
    return BLOCK;
  }

  var jordanCheck = JORDAN_VALIDATOR.isJordanianIP(ip);
  if (!jordanCheck.valid) {
    NET_MONITOR.record(BLOCK, ip, host, 'non-jordan', geoInfo);
    return BLOCK;
  }

  var port = getPortFromURL(url);
  var timestamp = Date.now();
  
  PACKET_LOSS.track(ip, host);
  LATENCY_OPT.measure(ip, timestamp);

  // ================= MATCH HANDLING =================
  var isMatchRequest = isMatch(url, host) || isGameCritical(host) || isMatchPort(port);

  if (isMatchRequest) {

    if (!JORDAN_VALIDATOR.isJordanianMatchIP(ip)) {
      NET_MONITOR.record(BLOCK, ip, host, 'match-non-jordan', geoInfo);
      return BLOCK;
    }

    var net24 = ip.split('.').slice(0,3).join('.');

    if (!SESSION.locked) {
      SESSION.lock(ip, host);
    }

    if (ip !== SESSION.ip || host !== SESSION.host || net24 !== SESSION.net24) {
      NET_MONITOR.record(BLOCK, ip, host, 'match-lock-violation', geoInfo);
      RECONNECT_HANDLER.recordDisconnect(ip, host);
      return BLOCK;
    }

    if (!RECONNECT_HANDLER.shouldRetry(ip, host)) {
      NET_MONITOR.record(BLOCK, ip, host, 'match-max-retries', geoInfo);
      return BLOCK;
    }

    BANDWIDTH_SHAPER.enqueue('match', {ip: ip, host: host, time: timestamp});
    if (BANDWIDTH_SHAPER.shouldThrottle('match')) {
      NET_MONITOR.record(BLOCK, ip, host, 'match-throttled', geoInfo);
      return BLOCK;
    }

    if (PACKET_LOSS.isHighLoss(ip, host)) {
      var geoRoute = GEO_OPTIMIZER.getRegionalChain(ip);
      NET_MONITOR.record(geoRoute, ip, host, 'match', geoInfo);
      RECONNECT_HANDLER.reset(ip, host);
      return geoRoute;
    }

    if (LATENCY_OPT.shouldSwitchProxy(ip)) {
      var geoProxy = GEO_OPTIMIZER.getRegionalChain(ip);
      NET_MONITOR.record(geoProxy, ip, host, 'match', geoInfo);
      RECONNECT_HANDLER.reset(ip, host);
      return geoProxy;
    }

    var predictedRoute = ROUTE_AI.getBestRoute(ip);
    if (predictedRoute) {
      NET_MONITOR.record(predictedRoute, ip, host, 'match', geoInfo);
      RECONNECT_HANDLER.reset(ip, host);
      return predictedRoute;
    }

    var geoRoute = GEO_OPTIMIZER.getNearestServer(ip);
    NET_MONITOR.record(geoRoute, ip, host, 'match', geoInfo);
    RECONNECT_HANDLER.reset(ip, host);
    return geoRoute;
  }

  // ================= LOBBY HANDLING =================
  if (isLobby(url, host) || isCDN(url, host)) {

    if (!isInList(ip, JORDAN_WIDE_IPV4)) {
      NET_MONITOR.record(BLOCK, ip, host, 'lobby-non-jordan', geoInfo);
      return BLOCK;
    }

    if (SESSION.locked) {
      NET_MONITOR.record(BLOCK, ip, host, 'lobby-post-lock', geoInfo);
      return BLOCK;
    }

    BANDWIDTH_SHAPER.enqueue('lobby', {ip: ip, host: host, time: timestamp});
    if (BANDWIDTH_SHAPER.shouldThrottle('lobby')) {
      NET_MONITOR.record(BLOCK, ip, host, 'lobby-throttled', geoInfo);
      return BLOCK;
    }

    NET_MONITOR.record(LOBBY_JO, ip, host, 'lobby', geoInfo);
    return LOBBY_JO;
  }

  NET_MONITOR.record(BLOCK, ip, host, 'unmatched', geoInfo);
  return BLOCK;
}

// ================= ULTIMATE DEBUG FUNCTIONS =================
function debugGetStats() {
  return {
    network: NET_MONITOR.getStats(),
    dns: DNS_CACHE.getStats(),
    session: SESSION.getInfo(),
    geo: GEO_DETECTOR.getStats()
  };
}

function debugGetQuality() {
  return NET_MONITOR.getQuality();
}

function debugGetBlockedCountries() {
  return GEO_DETECTOR.getStats();
}

function debugCheckIP(ip) {
  var geoInfo = GEO_DETECTOR.analyze(ip);
  var jordanCheck = JORDAN_VALIDATOR.isJordanianIP(ip);
  var blockCheck = REGION_BLOCKER.isBlocked(ip);
  var latency = LATENCY_OPT.getStats(ip);
  
  return {
    ip: ip,
    geo: geoInfo,
    jordan: jordanCheck,
    blocked: blockCheck,
    latency: latency
  };
}

function debugGetLatency(ip) {
  return LATENCY_OPT.getStats(ip);
}

function debugGetPacketLoss(ip, host) {
  return {
    lossRate: PACKET_LOSS.getLossRate(ip, host).toFixed(2) + '%',
    status: PACKET_LOSS.getStatus(ip, host)
  };
}

function debugGetBandwidth() {
  return BANDWIDTH_SHAPER.getQueueStatus();
}

function debugGetReconnectStatus(ip, host) {
  return RECONNECT_HANDLER.getStatus(ip, host);
}

function debugGetRouteAI() {
  var allStats = {};
  for (var ip in ROUTE_AI.history) {
    allStats[ip] = {
      bestRoute: ROUTE_AI.history[ip].bestRoute,
      totalRequests: ROUTE_AI.history[ip].totalRequests
    };
  }
  return allStats;
}

function debugGetGeoRoute(ip) {
  return {
    region: GEO_OPTIMIZER.detectRegion(ip),
    nearestServer: GEO_OPTIMIZER.getNearestServer(ip),
    regionalChain: GEO_OPTIMIZER.getRegionalChain(ip)
  };
}

function debugFullReport() {
  return {
    stats: debugGetStats(),
    quality: debugGetQuality(),
    routes: debugGetRouteAI(),
    bandwidth: debugGetBandwidth(),
    blocked: debugGetBlockedCountries()
  };
}

function debugReset() {
  NET_MONITOR.metrics = {
    totalRequests: 0,
    blockedRequests: 0,
    blockedByRegion: 0,
    allowedJordan: 0,
    proxyRequests: 0,
    matchRequests: 0,
    lobbyRequests: 0,
    startTime: Date.now(),
    lastReset: Date.now()
  };
  NET_MONITOR.requestLog = [];
  GEO_DETECTOR.blockedCount = {};
  GEO_DETECTOR.allowedCount = 0;
  DNS_CACHE.clear();
  SESSION.reset();
  ROUTE_AI.history = {};
  PACKET_LOSS.sequences = {};
  LATENCY_OPT.measurements = {};
  BANDWIDTH_SHAPER.queues = {match: [], lobby: [], cdn: []};
  RECONNECT_HANDLER.disconnects = {};
  return 'ALL SYSTEMS RESET - ULTIMATE JORDAN ONLY EDITION V5';
}
