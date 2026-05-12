// ─────────────────────────────────────────────────────────────────────────────
// inventoryData.js
// Hierarchical advertising inventory:
//   Category → Ad Types → Listings
// To add a new listing: find the right category + adType and push to listings[].
// To add a new adType: add to adTypes[] and add listings for it.
// ─────────────────────────────────────────────────────────────────────────────

const inventory = [

  // ════════════════════════════════════════════════════════════════════════════
  //  AIRPORTS
  // ════════════════════════════════════════════════════════════════════════════
  {
    category: 'Airports',
    icon: '✈️',
    color: '#3b82f6',
    adTypes: [
      'Digital Screens', 'Lightbox', 'Wall Signage', 'Hoarding',
      'Totem', 'Scroller', 'Promotional Space', 'Travelator',
      'FIDS Screen', 'Luggage Trolley',
    ],
    listings: [
      { id: 1,  title: 'Rajiv Gandhi Airport – Digital Screen T1',  adType: 'Digital Screens',    location: 'Hyderabad', area: 'Terminal 1 Arrivals',    minSpend: 24000, price: 24000, availability: true,  lat: 17.2403, lng: 78.4294, mediaType: 'Indoor Digital' },
      { id: 2,  title: 'Rajiv Gandhi Airport – Lightbox T2',        adType: 'Lightbox',           location: 'Hyderabad', area: 'Terminal 2 Departure',  minSpend: 18000, price: 18000, availability: true,  lat: 17.2410, lng: 78.4300, mediaType: 'Indoor Static' },
      { id: 3,  title: 'Rajiv Gandhi Airport – Travelator Panel',   adType: 'Travelator',         location: 'Hyderabad', area: 'Terminal 1 Corridor',  minSpend: 30000, price: 30000, availability: true,  lat: 17.2398, lng: 78.4280, mediaType: 'Indoor Static' },
      { id: 4,  title: 'Rajiv Gandhi Airport – FIDS Screen',        adType: 'FIDS Screen',        location: 'Hyderabad', area: 'Boarding Gate 5',      minSpend: 15000, price: 15000, availability: false, lat: 17.2415, lng: 78.4310, mediaType: 'Indoor Digital' },
      { id: 5,  title: 'Rajiv Gandhi Airport – Luggage Trolley',    adType: 'Luggage Trolley',    location: 'Hyderabad', area: 'Baggage Claim',        minSpend: 12000, price: 12000, availability: true,  lat: 17.2390, lng: 78.4270, mediaType: 'Ambient' },
      { id: 6,  title: 'Mumbai Airport T2 – Digital Screen',        adType: 'Digital Screens',    location: 'Mumbai',    area: 'Terminal 2 Check-in',  minSpend: 55000, price: 55000, availability: true,  lat: 19.0896, lng: 72.8656, mediaType: 'Indoor Digital' },
      { id: 7,  title: 'Mumbai Airport T2 – Totem Display',         adType: 'Totem',              location: 'Mumbai',    area: 'Terminal 2 Arrivals',  minSpend: 40000, price: 40000, availability: true,  lat: 19.0900, lng: 72.8660, mediaType: 'Indoor Digital' },
      { id: 8,  title: 'Mumbai Airport T2 – Promotional Space',     adType: 'Promotional Space',  location: 'Mumbai',    area: 'Pre-Security Zone',    minSpend: 80000, price: 80000, availability: true,  lat: 19.0890, lng: 72.8650, mediaType: 'Experiential' },
      { id: 9,  title: 'IGI Airport Delhi – Digital Screen',        adType: 'Digital Screens',    location: 'Delhi',     area: 'Terminal 3 Departure', minSpend: 60000, price: 60000, availability: true,  lat: 28.5562, lng: 77.1000, mediaType: 'Indoor Digital' },
      { id: 10, title: 'IGI Airport Delhi – Wall Signage',          adType: 'Wall Signage',       location: 'Delhi',     area: 'Terminal 1 Entry',     minSpend: 35000, price: 35000, availability: true,  lat: 28.5570, lng: 77.1010, mediaType: 'Indoor Static' },
      { id: 11, title: 'IGI Airport Delhi – Lightbox Row',          adType: 'Lightbox',           location: 'Delhi',     area: 'Security Queue Area',  minSpend: 28000, price: 28000, availability: false, lat: 28.5558, lng: 77.0995, mediaType: 'Indoor Static' },
      { id: 12, title: 'Bangalore Airport – Scroller',              adType: 'Scroller',           location: 'Bangalore', area: 'T1 Arrivals Hall',     minSpend: 22000, price: 22000, availability: true,  lat: 13.1986, lng: 77.7066, mediaType: 'Indoor Digital' },
      { id: 13, title: 'Bangalore Airport – Hoarding',              adType: 'Hoarding',           location: 'Bangalore', area: 'Airport Entry Road',   minSpend: 45000, price: 45000, availability: true,  lat: 13.2000, lng: 77.7080, mediaType: 'Outdoor Static' },
      { id: 14, title: 'Chennai Airport – FIDS Screen',             adType: 'FIDS Screen',        location: 'Chennai',   area: 'Domestic Terminal',    minSpend: 20000, price: 20000, availability: true,  lat: 12.9941, lng: 80.1709, mediaType: 'Indoor Digital' },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  //  OUTDOOR
  // ════════════════════════════════════════════════════════════════════════════
  {
    category: 'Outdoor',
    icon: '🏙️',
    color: '#10b981',
    adTypes: [
      'Billboard', 'Hoarding', 'Pole Kiosk', 'Bus Shelter',
      'Gantry', 'Unipole', 'Mobile Van', 'Wall Paint',
      'Metro Pillar', 'Flyover Panel',
    ],
    listings: [
      { id: 101, title: 'Hitech City Billboard – 40x20 ft',       adType: 'Billboard',    location: 'Hyderabad', area: 'Hitech City Main Road',   minSpend: 18000, price: 18000, availability: true,  lat: 17.4474, lng: 78.3762, mediaType: 'Outdoor Static' },
      { id: 102, title: 'Banjara Hills Hoarding – 60x30 ft',      adType: 'Hoarding',     location: 'Hyderabad', area: 'Road No. 12',             minSpend: 22000, price: 22000, availability: true,  lat: 17.4156, lng: 78.4347, mediaType: 'Outdoor Static' },
      { id: 103, title: 'MG Road Bus Shelter – Double Panel',     adType: 'Bus Shelter',  location: 'Hyderabad', area: 'MG Road',                 minSpend: 9000,  price: 9000,  availability: true,  lat: 17.3920, lng: 78.4680, mediaType: 'Outdoor Static' },
      { id: 104, title: 'Jubilee Hills Unipole',                  adType: 'Unipole',      location: 'Hyderabad', area: 'Jubilee Hills Checkpost', minSpend: 32000, price: 32000, availability: true,  lat: 17.4320, lng: 78.4071, mediaType: 'Outdoor Static' },
      { id: 105, title: 'Kondapur Gantry – 100x15 ft',           adType: 'Gantry',       location: 'Hyderabad', area: 'Kondapur Junction',       minSpend: 55000, price: 55000, availability: false, lat: 17.4600, lng: 78.3500, mediaType: 'Outdoor Static' },
      { id: 106, title: 'Andheri Flyover Panel',                  adType: 'Flyover Panel',location: 'Mumbai',    area: 'Andheri W Flyover',       minSpend: 28000, price: 28000, availability: true,  lat: 19.1136, lng: 72.8697, mediaType: 'Outdoor Static' },
      { id: 107, title: 'BKC Billboard – 40x20 ft',               adType: 'Billboard',    location: 'Mumbai',    area: 'Bandra Kurla Complex',    minSpend: 45000, price: 45000, availability: true,  lat: 19.0596, lng: 72.8656, mediaType: 'Outdoor Static' },
      { id: 108, title: 'CP Pole Kiosk Network – 10 Units',       adType: 'Pole Kiosk',   location: 'Delhi',     area: 'Connaught Place',         minSpend: 15000, price: 15000, availability: true,  lat: 28.6315, lng: 77.2167, mediaType: 'Outdoor Static' },
      { id: 109, title: 'MG Road Hoarding – 80x20 ft',            adType: 'Hoarding',     location: 'Bangalore', area: 'MG Road',                 minSpend: 38000, price: 38000, availability: true,  lat: 12.9716, lng: 77.5946, mediaType: 'Outdoor Static' },
      { id: 110, title: 'Anna Salai Mobile Van Campaign',         adType: 'Mobile Van',   location: 'Chennai',   area: 'Anna Salai',              minSpend: 12000, price: 12000, availability: true,  lat: 13.0827, lng: 80.2707, mediaType: 'Mobile' },
      { id: 111, title: 'Metro Pillar Branding – 20 Pillars',     adType: 'Metro Pillar', location: 'Hyderabad', area: 'MGBS to Ameerpet',        minSpend: 40000, price: 40000, availability: true,  lat: 17.3850, lng: 78.4700, mediaType: 'Outdoor Static' },
      { id: 112, title: 'Wall Paint – Secunderabad',              adType: 'Wall Paint',   location: 'Hyderabad', area: 'Secunderabad Station Rd', minSpend: 8000,  price: 8000,  availability: true,  lat: 17.4399, lng: 78.4983, mediaType: 'Outdoor Static' },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  //  CINEMA
  // ════════════════════════════════════════════════════════════════════════════
  {
    category: 'Cinema',
    icon: '🎬',
    color: '#f59e0b',
    adTypes: [
      'Screen Ads', 'Foyer Branding', 'Food Court Branding',
      'Standee', 'Ticket Sleeve', 'Seat Branding', 'ATM Branding',
    ],
    listings: [
      { id: 201, title: 'PVR Inorbit Hyderabad – Screen Ad',      adType: 'Screen Ads',          location: 'Hyderabad', area: 'All 6 Screens',         minSpend: 15000, price: 15000, availability: true,  lat: 17.4333, lng: 78.3840, mediaType: 'On-Screen' },
      { id: 202, title: 'PVR Inorbit – Foyer Branding',           adType: 'Foyer Branding',      location: 'Hyderabad', area: 'Main Foyer',            minSpend: 25000, price: 25000, availability: true,  lat: 17.4333, lng: 78.3840, mediaType: 'Indoor Static' },
      { id: 203, title: 'IMAX AMB – Screen Ad Premium',           adType: 'Screen Ads',          location: 'Hyderabad', area: 'IMAX Screen',           minSpend: 35000, price: 35000, availability: false, lat: 17.4399, lng: 78.3489, mediaType: 'On-Screen' },
      { id: 204, title: 'AMB – Standee Network (8 Units)',        adType: 'Standee',             location: 'Hyderabad', area: 'Lobby & Corridor',      minSpend: 12000, price: 12000, availability: true,  lat: 17.4399, lng: 78.3490, mediaType: 'Indoor Static' },
      { id: 205, title: 'PVR BKC Mumbai – Screen Ad',             adType: 'Screen Ads',          location: 'Mumbai',    area: 'All 5 Screens',         minSpend: 30000, price: 30000, availability: true,  lat: 19.0588, lng: 72.8656, mediaType: 'On-Screen' },
      { id: 206, title: 'PVR BKC – Food Court Branding',          adType: 'Food Court Branding', location: 'Mumbai',    area: 'Food Court',            minSpend: 22000, price: 22000, availability: true,  lat: 19.0590, lng: 72.8660, mediaType: 'Indoor Static' },
      { id: 207, title: 'Cinepolis Select City Delhi – Screen',   adType: 'Screen Ads',          location: 'Delhi',     area: 'All 4 Screens',         minSpend: 25000, price: 25000, availability: true,  lat: 28.5274, lng: 77.2190, mediaType: 'On-Screen' },
      { id: 208, title: 'Cinepolis – Ticket Sleeve Campaign',     adType: 'Ticket Sleeve',       location: 'Delhi',     area: 'All Counters',          minSpend: 8000,  price: 8000,  availability: true,  lat: 28.5270, lng: 77.2185, mediaType: 'Print' },
      { id: 209, title: 'PVR Orion Bangalore – Seat Branding',   adType: 'Seat Branding',       location: 'Bangalore', area: 'Screen 1 & 2',          minSpend: 18000, price: 18000, availability: true,  lat: 12.9923, lng: 77.5665, mediaType: 'Indoor Static' },
      { id: 210, title: 'Sathyam Cinemas Chennai – Screen Ad',   adType: 'Screen Ads',          location: 'Chennai',   area: 'All 9 Screens',         minSpend: 20000, price: 20000, availability: true,  lat: 13.0594, lng: 80.2500, mediaType: 'On-Screen' },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  //  DIGITAL
  // ════════════════════════════════════════════════════════════════════════════
  {
    category: 'Digital',
    icon: '💻',
    color: '#8b5cf6',
    adTypes: [
      'Google Display', 'Facebook / Instagram', 'YouTube',
      'Programmatic', 'Native Ads', 'Search Ads', 'CTV / OTT',
      'Email Marketing', 'WhatsApp Campaigns',
    ],
    listings: [
      { id: 301, title: 'Google Display Network – Hyderabad Geo',  adType: 'Google Display',      location: 'Hyderabad', area: 'City Geo-Target',       minSpend: 8000,  price: 8000,  availability: true, lat: 17.3850, lng: 78.4867, mediaType: 'Digital' },
      { id: 302, title: 'Facebook + Instagram – Hyderabad',        adType: 'Facebook / Instagram', location: 'Hyderabad', area: 'City Audience',         minSpend: 5000,  price: 5000,  availability: true, lat: 17.4000, lng: 78.4600, mediaType: 'Digital' },
      { id: 303, title: 'YouTube Pre-Roll – Telangana',            adType: 'YouTube',             location: 'Hyderabad', area: 'State Audience',        minSpend: 10000, price: 10000, availability: true, lat: 17.3900, lng: 78.4700, mediaType: 'Digital' },
      { id: 304, title: 'Programmatic Display – Mumbai Premium',   adType: 'Programmatic',        location: 'Mumbai',    area: 'Premium Sites',         minSpend: 15000, price: 15000, availability: true, lat: 19.0760, lng: 72.8777, mediaType: 'Digital' },
      { id: 305, title: 'CTV / OTT – Hotstar Maharashtra',        adType: 'CTV / OTT',           location: 'Mumbai',    area: 'State Audience',        minSpend: 25000, price: 25000, availability: true, lat: 19.0000, lng: 72.9000, mediaType: 'Digital' },
      { id: 306, title: 'Google Search Ads – Delhi NCR',           adType: 'Search Ads',          location: 'Delhi',     area: 'NCR Keyword Target',    minSpend: 12000, price: 12000, availability: true, lat: 28.6139, lng: 77.2090, mediaType: 'Digital' },
      { id: 307, title: 'WhatsApp Broadcast – Bangalore 1L Users', adType: 'WhatsApp Campaigns',  location: 'Bangalore', area: 'City 1 Lakh Users',     minSpend: 7000,  price: 7000,  availability: true, lat: 12.9716, lng: 77.5946, mediaType: 'Digital' },
      { id: 308, title: 'Native Ads – Dailyhunt Tamil Nadu',       adType: 'Native Ads',          location: 'Chennai',   area: 'Tamil News Audience',   minSpend: 6000,  price: 6000,  availability: true, lat: 13.0827, lng: 80.2707, mediaType: 'Digital' },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  //  AIRLINES
  // ════════════════════════════════════════════════════════════════════════════
  {
    category: 'Airlines',
    icon: '🛫',
    color: '#0ea5e9',
    adTypes: [
      'E-Boarding Pass & E-Ticket', 'Boarding Pass', 'Seat Back Branding', 'Inflight Sampling', 'Meal Tray Placement', 'Inflight Announcement', 'Cup Branding', 'Tarmac Coach - Interior',
    ],
    listings: [
      { id: 1101, title: 'IndiGo Boarding Pass Branding',       adType: 'Boarding Pass',          location: 'Pan India', area: 'Digital Distribution',      minSpend: 80000,  price: 80000, availability: true,  lat: 20.5937, lng: 78.9629, mediaType: 'Aviation' },
      { id: 1102, title: 'Air India Meal Tray Placement',        adType: 'Meal Tray Placement',    location: 'International Routes', area: 'Economy Cabin',          minSpend: 150000, price: 150000, availability: true,  lat: 20.5937, lng: 78.9629, mediaType: 'Aviation' },
      { id: 1103, title: 'Vistara Seat Back Branding',           adType: 'Seat Back Branding',     location: 'Pan India', area: 'Premium Economy',        minSpend: 95000,  price: 95000,  availability: true,  lat: 20.5937, lng: 78.9629, mediaType: 'Aviation' },
      { id: 1104, title: 'SpiceJet Inflight Sampling',           adType: 'Inflight Sampling',      location: 'Domestic Routes', area: 'Cabin Service',          minSpend: 70000,  price: 70000,  availability: true,  lat: 20.5937, lng: 78.9629, mediaType: 'Aviation' },
      { id: 1105, title: 'GoAir Tarmac Coach Interior Signage',  adType: 'Tarmac Coach - Interior', location: 'Mumbai',      area: 'Pre-boarding Gate',      minSpend: 65000,  price: 65000,  availability: false, lat: 19.0896, lng: 72.8656, mediaType: 'Aviation' },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  //  CTV
  // ════════════════════════════════════════════════════════════════════════════
  {
    category: 'CTV',
    icon: '📺',
    color: '#06b6d4',
    adTypes: ['Video', 'Boot Up Screen'],
    listings: [
      { id: 1201, title: 'Hotstar CTV Pre-roll Campaign',      adType: 'Video',          location: 'Mumbai',    area: 'OTT Audience',        minSpend: 50000,  price: 50000,  availability: true,  lat: 19.0760, lng: 72.8777, mediaType: 'CTV' },
      { id: 1202, title: 'SonyLiv Boot Up Screen Takeover',     adType: 'Boot Up Screen', location: 'Delhi',     area: 'Launch Experience',   minSpend: 65000,  price: 65000,  availability: true,  lat: 28.6139, lng: 77.2090, mediaType: 'CTV' },
      { id: 1203, title: 'Zee5 Video Buy – Regional Push',     adType: 'Video',          location: 'Bangalore', area: 'Regional Reach',       minSpend: 42000,  price: 42000,  availability: true,  lat: 12.9716, lng: 77.5946, mediaType: 'CTV' },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  //  MAGAZINE
  // ════════════════════════════════════════════════════════════════════════════
  {
    category: 'Magazine',
    icon: '📖',
    color: '#e879f9',
    adTypes: ['Half Page','Full Page','Article','Double Spread','Cover Page'],
    listings: [
      { id: 1301, title: 'India Today – Half Page Hyderabad',  adType: 'Half Page',      location: 'Hyderabad', area: 'City Edition',         minSpend: 55000,  price: 55000,  availability: true,  lat: 17.3850, lng: 78.4867, mediaType: 'Print' },
      { id: 1302, title: 'Femina Cover Page Feature',          adType: 'Cover Page',     location: 'Mumbai',    area: 'National Edition',   minSpend: 180000, price: 180000, availability: false, lat: 19.0760, lng: 72.8777, mediaType: 'Print' },
      { id: 1303, title: 'BetterHomes Full Page Campaign',     adType: 'Full Page',      location: 'Delhi',     area: 'Luxury Edition',     minSpend: 95000,  price: 95000,  availability: true,  lat: 28.6139, lng: 77.2090, mediaType: 'Print' },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  //  DIGITAL PR
  // ════════════════════════════════════════════════════════════════════════════
  {
    category: 'Digital PR',
    icon: '🔗',
    color: '#14b8a6',
    adTypes: ['PR Essentials Package','PR Impact Plus Package'],
    listings: [
      { id: 1401, title: 'Pan India PR Essentials',     adType: 'PR Essentials Package', location: 'Pan India', area: 'Digital PR Rollout', minSpend: 60000, price: 60000, availability: true,  lat: 20.5937, lng: 78.9629, mediaType: 'Digital PR' },
      { id: 1402, title: 'Impact Plus Media Package',     adType: 'PR Impact Plus Package', location: 'Mumbai',    area: 'Corporate Launch',   minSpend: 120000,price: 120000,availability: true,  lat: 19.0760, lng: 72.8777, mediaType: 'Digital PR' },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  //  RADIO
  // ════════════════════════════════════════════════════════════════════════════
  {
    category: 'Radio',
    icon: '📻',
    color: '#ec4899',
    adTypes: [
      'On-Air Spot', 'RJ Mention', 'Sponsorship',
      'Roadblock', 'Jingle', 'Live Event Integration',
    ],
    listings: [
      { id: 401, title: 'Radio Mirchi 98.3 – 30 Sec Spot Hyd',    adType: 'On-Air Spot',   location: 'Hyderabad', area: 'Prime Time',            minSpend: 12000, price: 12000, availability: true, lat: 17.3850, lng: 78.4867, mediaType: 'Radio' },
      { id: 402, title: 'Red FM 93.5 – RJ Mention Morning',        adType: 'RJ Mention',    location: 'Hyderabad', area: 'Morning Show',          minSpend: 8000,  price: 8000,  availability: true, lat: 17.3982, lng: 78.4800, mediaType: 'Radio' },
      { id: 403, title: 'Radio City 91.1 – Program Sponsorship',   adType: 'Sponsorship',   location: 'Mumbai',    area: 'Evening Drive',         minSpend: 25000, price: 25000, availability: true, lat: 19.0760, lng: 72.8777, mediaType: 'Radio' },
      { id: 404, title: 'Big FM 92.7 – Morning Roadblock Delhi',   adType: 'Roadblock',     location: 'Delhi',     area: 'Morning 7–9 AM',        minSpend: 30000, price: 30000, availability: true, lat: 28.6139, lng: 77.2090, mediaType: 'Radio' },
      { id: 405, title: 'Radio Indigo 91.9 – Jingle Campaign',     adType: 'Jingle',        location: 'Bangalore', area: 'All Day Rotation',      minSpend: 18000, price: 18000, availability: true, lat: 12.9716, lng: 77.5946, mediaType: 'Radio' },
      { id: 406, title: 'Suryan FM – On-Air Spot Tamil',           adType: 'On-Air Spot',   location: 'Chennai',   area: 'Peak Hours',            minSpend: 10000, price: 10000, availability: true, lat: 13.0827, lng: 80.2707, mediaType: 'Radio' },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  //  TELEVISION
  // ════════════════════════════════════════════════════════════════════════════
  {
    category: 'Television',
    icon: '📺',
    color: '#06b6d4',
    adTypes: [
      'Commercial Spot', 'Program Sponsorship', 'Brand Integration',
      'News Ticker', 'Live Event Sponsorship', 'CTV',
    ],
    listings: [
      { id: 501, title: 'Zee Telugu – Prime Time 30 Sec',         adType: 'Commercial Spot',       location: 'Hyderabad', area: 'Prime Time 8–11 PM',    minSpend: 45000, price: 45000, availability: true, lat: 17.4010, lng: 78.4540, mediaType: 'Television' },
      { id: 502, title: 'ETV Telugu – Program Sponsorship',       adType: 'Program Sponsorship',   location: 'Hyderabad', area: 'Saregamapa Show',       minSpend: 80000, price: 80000, availability: true, lat: 17.4100, lng: 78.4600, mediaType: 'Television' },
      { id: 503, title: 'Star Maa – News Ticker Hyderabad',       adType: 'News Ticker',           location: 'Hyderabad', area: '6 PM News',             minSpend: 20000, price: 20000, availability: true, lat: 17.3900, lng: 78.4500, mediaType: 'Television' },
      { id: 504, title: 'Star Plus – Prime Time 30 Sec',          adType: 'Commercial Spot',       location: 'Mumbai',    area: 'National Prime Time',   minSpend: 120000,price: 120000,availability: true, lat: 19.0760, lng: 72.8777, mediaType: 'Television' },
      { id: 505, title: 'Sony LIV – CTV Ad Pan India',            adType: 'CTV',                   location: 'Mumbai',    area: 'Pan India OTT',         minSpend: 50000, price: 50000, availability: true, lat: 19.0500, lng: 72.9000, mediaType: 'CTV' },
      { id: 506, title: 'Sun TV – Prime Time 30 Sec',             adType: 'Commercial Spot',       location: 'Chennai',   area: 'Prime Time 8–11 PM',    minSpend: 60000, price: 60000, availability: true, lat: 13.0827, lng: 80.2707, mediaType: 'Television' },
      { id: 507, title: 'Star Vijay – Brand Integration',         adType: 'Brand Integration',     location: 'Chennai',   area: 'Comedy Show',           minSpend: 95000, price: 95000, availability: false,lat: 13.0800, lng: 80.2600, mediaType: 'Television' },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  //  BTL
  // ════════════════════════════════════════════════════════════════════════════
  {
    category: 'BTL',
    icon: '🎪',
    color: '#f97316',
    adTypes: [
      'Mall Activation', 'Society Activation', 'College Activation',
      'Metro Station Branding', 'Hospital Branding', 'IT Park Activation',
      'Kiosk', 'Product Sampling', 'Road Show',
    ],
    listings: [
      { id: 601, title: 'Inorbit Mall Hyderabad – Activation Space', adType: 'Mall Activation',       location: 'Hyderabad', area: 'Ground Floor Atrium',   minSpend: 30000, price: 30000, availability: true,  lat: 17.4333, lng: 78.3840, mediaType: 'Experiential' },
      { id: 602, title: 'Delhi Metro Station – Branding Package',    adType: 'Metro Station Branding',location: 'Delhi',     area: 'Rajiv Chowk Station',   minSpend: 50000, price: 50000, availability: true,  lat: 28.6329, lng: 77.2197, mediaType: 'Indoor Static' },
      { id: 603, title: 'Prestige Tech Park – IT Activation',        adType: 'IT Park Activation',    location: 'Bangalore', area: 'Main Atrium',           minSpend: 25000, price: 25000, availability: true,  lat: 12.9152, lng: 77.6828, mediaType: 'Experiential' },
      { id: 604, title: 'Phoenix Palassio Mall – Kiosk',             adType: 'Kiosk',                 location: 'Hyderabad', area: 'L1 Food Court Entry',   minSpend: 18000, price: 18000, availability: true,  lat: 17.4800, lng: 78.3900, mediaType: 'Experiential' },
      { id: 605, title: 'Hiranandani Mumbai – Society Activation',   adType: 'Society Activation',    location: 'Mumbai',    area: 'Powai Hiranandani',     minSpend: 20000, price: 20000, availability: false, lat: 19.1178, lng: 72.9060, mediaType: 'Experiential' },
      { id: 606, title: 'BITS Pilani – College Activation',          adType: 'College Activation',    location: 'Hyderabad', area: 'BITS Hyderabad Campus', minSpend: 15000, price: 15000, availability: true,  lat: 17.5449, lng: 78.5718, mediaType: 'Experiential' },
      { id: 607, title: 'Apollo Hospital – Branding Package',        adType: 'Hospital Branding',     location: 'Hyderabad', area: 'Jubilee Hills Apollo',  minSpend: 22000, price: 22000, availability: true,  lat: 17.4216, lng: 78.4311, mediaType: 'Indoor Static' },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  //  INFLUENCERS
  // ════════════════════════════════════════════════════════════════════════════
  {
    category: 'Influencers',
    icon: '🌟',
    color: '#a855f7',
    adTypes: [
      'Mega Influencer', 'Macro Influencer', 'Micro Influencer',
      'Nano Influencer', 'Celebrity', 'Brand Ambassador',
    ],
    listings: [
      { id: 701, title: 'Hyderabad Food Blogger – 500K Followers',  adType: 'Macro Influencer', location: 'Hyderabad', area: 'Instagram + YouTube',  minSpend: 25000, price: 25000, availability: true, lat: 17.3850, lng: 78.4867, mediaType: 'Social Media' },
      { id: 702, title: 'Telugu Tech YouTuber – 1M Subscribers',    adType: 'Mega Influencer',  location: 'Hyderabad', area: 'YouTube',              minSpend: 60000, price: 60000, availability: true, lat: 17.4000, lng: 78.4500, mediaType: 'Social Media' },
      { id: 703, title: 'Mumbai Fashion Blogger – 200K',            adType: 'Macro Influencer', location: 'Mumbai',    area: 'Instagram',            minSpend: 18000, price: 18000, availability: true, lat: 19.0760, lng: 72.8777, mediaType: 'Social Media' },
      { id: 704, title: 'Delhi Lifestyle Micro Influencer – 50K',   adType: 'Micro Influencer', location: 'Delhi',     area: 'Instagram + Reels',    minSpend: 8000,  price: 8000,  availability: true, lat: 28.6139, lng: 77.2090, mediaType: 'Social Media' },
      { id: 705, title: 'Bangalore Startup Influencer – 100K',      adType: 'Macro Influencer', location: 'Bangalore', area: 'LinkedIn + Instagram', minSpend: 12000, price: 12000, availability: true, lat: 12.9716, lng: 77.5946, mediaType: 'Social Media' },
      { id: 706, title: 'Tamil Nadu Celebrity Endorsement',         adType: 'Celebrity',        location: 'Chennai',   area: 'Pan Tamil Media',      minSpend: 250000,price: 250000,availability: true, lat: 13.0827, lng: 80.2707, mediaType: 'Celebrity' },
      { id: 707, title: 'Nano Influencer Pack – 20 Creators',       adType: 'Nano Influencer',  location: 'Hyderabad', area: 'Instagram Stories',    minSpend: 5000,  price: 5000,  availability: true, lat: 17.4100, lng: 78.4400, mediaType: 'Social Media' },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  //  NEWSPAPER
  // ════════════════════════════════════════════════════════════════════════════
  {
    category: 'Newspaper',
    icon: '📰',
    color: '#6b7280',
    adTypes: [
      'Full Page', 'Half Page', 'Quarter Page', 'Strip Ad',
      'Front Page Jacket', 'Cover Page', 'Classifieds', 'Insert',
    ],
    listings: [
      { id: 801, title: 'Deccan Chronicle – Full Page Hyderabad',   adType: 'Full Page',       location: 'Hyderabad', area: 'Main Edition',          minSpend: 80000, price: 80000, availability: true,  lat: 17.3850, lng: 78.4867, mediaType: 'Print' },
      { id: 802, title: 'Eenadu – Half Page Telugu',                adType: 'Half Page',       location: 'Hyderabad', area: 'Telangana Edition',     minSpend: 45000, price: 45000, availability: true,  lat: 17.4000, lng: 78.4600, mediaType: 'Print' },
      { id: 803, title: 'Sakshi – Quarter Page',                    adType: 'Quarter Page',    location: 'Hyderabad', area: 'City Edition',          minSpend: 22000, price: 22000, availability: true,  lat: 17.3900, lng: 78.4700, mediaType: 'Print' },
      { id: 804, title: 'TOI Mumbai – Front Page Jacket',           adType: 'Front Page Jacket',location: 'Mumbai',   area: 'Mumbai Edition',        minSpend: 250000,price: 250000,availability: true,  lat: 19.0760, lng: 72.8777, mediaType: 'Print' },
      { id: 805, title: 'TOI Mumbai – Full Page Main',              adType: 'Full Page',       location: 'Mumbai',    area: 'Main Section',          minSpend: 180000,price: 180000,availability: false, lat: 19.0700, lng: 72.8700, mediaType: 'Print' },
      { id: 806, title: 'HT Delhi – Strip Ad',                      adType: 'Strip Ad',        location: 'Delhi',     area: 'Front Page Bottom',     minSpend: 30000, price: 30000, availability: true,  lat: 28.6139, lng: 77.2090, mediaType: 'Print' },
      { id: 807, title: 'Deccan Herald – Half Page Bangalore',      adType: 'Half Page',       location: 'Bangalore', area: 'City Edition',          minSpend: 55000, price: 55000, availability: true,  lat: 12.9716, lng: 77.5946, mediaType: 'Print' },
      { id: 808, title: 'The Hindu – Full Page Chennai',            adType: 'Full Page',       location: 'Chennai',   area: 'Main Edition',          minSpend: 120000,price: 120000,availability: true,  lat: 13.0827, lng: 80.2707, mediaType: 'Print' },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  //  HYPERLOCAL
  // ════════════════════════════════════════════════════════════════════════════
  {
    category: 'Hyperlocal',
    icon: '📍',
    color: '#14b8a6',
    adTypes: [
      'Resident Welfare Association', 'Apartment Complex', 'Local Cable TV',
      'Locality App Ads', 'Community Newspaper', 'Door Hanger',
    ],
    listings: [
      { id: 901, title: 'RWA Branding – Kondapur 500 Homes',        adType: 'Resident Welfare Association', location: 'Hyderabad', area: 'Kondapur',   minSpend: 5000,  price: 5000,  availability: true, lat: 17.4600, lng: 78.3500, mediaType: 'Hyperlocal' },
      { id: 902, title: 'Apartment Complex – Gachibowli 1000 Flats',adType: 'Apartment Complex',            location: 'Hyderabad', area: 'Gachibowli', minSpend: 8000,  price: 8000,  availability: true, lat: 17.4400, lng: 78.3500, mediaType: 'Hyperlocal' },
      { id: 903, title: 'Local Cable TV – Kukatpally',               adType: 'Local Cable TV',              location: 'Hyderabad', area: 'Kukatpally', minSpend: 3000,  price: 3000,  availability: true, lat: 17.4849, lng: 78.3987, mediaType: 'Hyperlocal' },
      { id: 904, title: 'MyGate App Ads – Powai Mumbai',             adType: 'Locality App Ads',            location: 'Mumbai',    area: 'Powai',      minSpend: 10000, price: 10000, availability: true, lat: 19.1178, lng: 72.9060, mediaType: 'Digital' },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  //  SPORTS
  // ════════════════════════════════════════════════════════════════════════════
  {
    category: 'Sports',
    icon: '🏏',
    color: '#22c55e',
    adTypes: [
      'Stadium Hoarding', 'Jersey Branding', 'Scoreboard Ad',
      'LED Perimeter', 'IPL Sponsorship', 'Event Sponsorship',
    ],
    listings: [
      { id: 1001, title: 'SRH – Stadium Hoarding Uppal',          adType: 'Stadium Hoarding', location: 'Hyderabad', area: 'Rajiv Gandhi Stadium', minSpend: 150000, price: 150000, availability: true, lat: 17.4034, lng: 78.5522, mediaType: 'Outdoor Static' },
      { id: 1002, title: 'SRH – LED Perimeter Board',             adType: 'LED Perimeter',    location: 'Hyderabad', area: 'All IPL Matches',      minSpend: 500000, price: 500000, availability: true, lat: 17.4034, lng: 78.5522, mediaType: 'Digital' },
      { id: 1003, title: 'MI – Stadium Hoarding Wankhede',        adType: 'Stadium Hoarding', location: 'Mumbai',    area: 'Wankhede Stadium',     minSpend: 200000, price: 200000, availability: true, lat: 18.9388, lng: 72.8250, mediaType: 'Outdoor Static' },
      { id: 1004, title: 'Delhi Capitals – Scoreboard Ad',        adType: 'Scoreboard Ad',    location: 'Delhi',     area: 'Arun Jaitley Stadium', minSpend: 120000, price: 120000, availability: true, lat: 28.6363, lng: 77.2169, mediaType: 'Digital' },
      { id: 1005, title: 'RCB – Jersey Branding Season',          adType: 'Jersey Branding',  location: 'Bangalore', area: 'Full IPL Season',      minSpend: 5000000,price: 5000000,availability: false,lat: 12.9352, lng: 77.5970, mediaType: 'Branding' },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  //  MAGAZINE
  // ════════════════════════════════════════════════════════════════════════════
  {
    category: 'Magazine',
    icon: '📖',
    color: '#e11d48',
    adTypes: [
      'Cover Page', 'Inside Front Cover', 'Full Page', 'Half Page',
      'Back Cover', 'Advertorial', 'Insert',
    ],
    listings: [
      { id: 1101, title: 'Forbes India – Full Page',              adType: 'Full Page',         location: 'Mumbai', area: 'Business Edition', minSpend: 150000, price: 150000, availability: true,  lat: 19.0760, lng: 72.8777, mediaType: 'Print' },
      { id: 1102, title: 'Filmfare – Cover Page Ad',              adType: 'Cover Page',        location: 'Mumbai', area: 'National Edition', minSpend: 300000, price: 300000, availability: false, lat: 19.0700, lng: 72.8700, mediaType: 'Print' },
      { id: 1103, title: 'Outlook Business – Advertorial',        adType: 'Advertorial',       location: 'Delhi',  area: 'National Edition', minSpend: 80000,  price: 80000,  availability: true,  lat: 28.6139, lng: 77.2090, mediaType: 'Print' },
      { id: 1104, title: 'Femina – Half Page',                    adType: 'Half Page',         location: 'Mumbai', area: 'National Edition', minSpend: 90000,  price: 90000,  availability: true,  lat: 19.0600, lng: 72.8600, mediaType: 'Print' },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  //  DIGITAL PR
  // ════════════════════════════════════════════════════════════════════════════
  {
    category: 'Digital PR',
    icon: '🔗',
    color: '#0ea5e9',
    adTypes: [
      'Press Release', 'News Article', 'Blog Placement',
      'Podcast Mention', 'Newsletter Ad', 'Affiliate',
    ],
    listings: [
      { id: 1201, title: 'YourStory – Startup Article',           adType: 'News Article',    location: 'Bangalore', area: 'Startup Ecosystem',    minSpend: 15000, price: 15000, availability: true, lat: 12.9716, lng: 77.5946, mediaType: 'Digital PR' },
      { id: 1202, title: 'Inc42 – Press Release',                 adType: 'Press Release',   location: 'Delhi',     area: 'Tech Business',        minSpend: 12000, price: 12000, availability: true, lat: 28.6139, lng: 77.2090, mediaType: 'Digital PR' },
      { id: 1203, title: 'Gadgets360 – Blog Placement',           adType: 'Blog Placement',  location: 'Delhi',     area: 'Tech Audience',        minSpend: 8000,  price: 8000,  availability: true, lat: 28.6000, lng: 77.2000, mediaType: 'Digital PR' },
      { id: 1204, title: 'Podcast Sponsorship – The Ranveer Show',adType: 'Podcast Mention', location: 'Mumbai',    area: 'National Audience',    minSpend: 50000, price: 50000, availability: true, lat: 19.0760, lng: 72.8777, mediaType: 'Digital PR' },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  //  AIRLINES
  // ════════════════════════════════════════════════════════════════════════════
  {
    category: 'Airlines',
    icon: '🛫',
    color: '#0369a1',
    adTypes: [
      'In-Flight Magazine', 'Tray Table', 'Boarding Pass Ad',
      'Overhead Bin', 'IFE Screen', 'Headrest Cover',
    ],
    listings: [
      { id: 1301, title: 'IndiGo – Tray Table Branding',          adType: 'Tray Table',        location: 'Pan India', area: 'All Domestic Flights', minSpend: 80000,  price: 80000,  availability: true, lat: 17.2403, lng: 78.4294, mediaType: 'Ambient' },
      { id: 1302, title: 'Air India – In-Flight Magazine Page',    adType: 'In-Flight Magazine',location: 'Pan India', area: 'International Routes', minSpend: 60000,  price: 60000,  availability: true, lat: 19.0896, lng: 72.8656, mediaType: 'Print' },
      { id: 1303, title: 'SpiceJet – Boarding Pass Ad',           adType: 'Boarding Pass Ad',  location: 'Pan India', area: 'All Domestic Routes',  minSpend: 30000,  price: 30000,  availability: true, lat: 28.5562, lng: 77.1000, mediaType: 'Print' },
      { id: 1304, title: 'Vistara – IFE Screen Pre-Roll',         adType: 'IFE Screen',        location: 'Pan India', area: 'Premium Flights',      minSpend: 120000, price: 120000, availability: false,lat: 13.1986, lng: 77.7066, mediaType: 'Digital' },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  //  CTV
  // ════════════════════════════════════════════════════════════════════════════
  {
    category: 'CTV',
    icon: '📡',
    color: '#7c3aed',
    adTypes: [
      'Pre-Roll', 'Mid-Roll', 'Pause Ad', 'Display Ad',
      'Branded Content', 'Live Stream Sponsorship',
    ],
    listings: [
      { id: 1401, title: 'Hotstar – Pre-Roll IPL 30 Sec',         adType: 'Pre-Roll',            location: 'Pan India', area: 'IPL Matches',          minSpend: 100000, price: 100000, availability: true, lat: 19.0760, lng: 72.8777, mediaType: 'CTV' },
      { id: 1402, title: 'Sony LIV – Mid-Roll Drama',             adType: 'Mid-Roll',            location: 'Pan India', area: 'Prime Drama Shows',    minSpend: 50000,  price: 50000,  availability: true, lat: 19.0600, lng: 72.8600, mediaType: 'CTV' },
      { id: 1403, title: 'Zee5 – Pause Ad Tamil Market',          adType: 'Pause Ad',            location: 'Chennai',   area: 'Tamil Content',        minSpend: 25000,  price: 25000,  availability: true, lat: 13.0827, lng: 80.2707, mediaType: 'CTV' },
      { id: 1404, title: 'Aha – Branded Content Telugu',          adType: 'Branded Content',     location: 'Hyderabad', area: 'Telugu OTT Audience',  minSpend: 80000,  price: 80000,  availability: true, lat: 17.3850, lng: 78.4867, mediaType: 'CTV' },
    ],
  },
];

module.exports = inventory;
