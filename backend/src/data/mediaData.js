// ─────────────────────────────────────────────────────────────
// mediaData.js  –  All media inventory
// To ADD a new ad: copy any row, give it a new unique id,
// fill in the details, save. That's it.
// ─────────────────────────────────────────────────────────────
module.exports = [
  // ── HYDERABAD ──────────────────────────────────────────────
  { id:1,  name:'Rajiv International Airport', type:'Airports',   vendor:'Airport Ads', price:24000, planPrice:24000, lat:17.2403, lng:78.4294, city:'Hyderabad' },
  { id:2,  name:'Billboard – Hitech City',     type:'Outdoor',    vendor:'SK Ads',      price:18000, planPrice:16000, lat:17.4474, lng:78.3762, city:'Hyderabad' },
  { id:3,  name:'Billboard – Banjara Hills',   type:'Outdoor',    vendor:'SK Ads',      price:22000, planPrice:20000, lat:17.4156, lng:78.4347, city:'Hyderabad' },
  { id:4,  name:'PVR Cinemas – Inorbit',       type:'Cinema',     vendor:'PVR',         price:15000, planPrice:13000, lat:17.4333, lng:78.3840, city:'Hyderabad' },
  { id:5,  name:'Radio Mirchi 98.3 FM',        type:'Radio',      vendor:'FM201',       price:12000, planPrice:10000, lat:17.3850, lng:78.4867, city:'Hyderabad' },
  { id:6,  name:'Google Display Network',      type:'Digital',    vendor:'Google',      price:8000,  planPrice:7000,  lat:17.4239, lng:78.4738, city:'Hyderabad' },
  { id:7,  name:'Facebook / Instagram Ads',    type:'Digital',    vendor:'Meta',        price:5000,  planPrice:4500,  lat:17.4450, lng:78.3490, city:'Hyderabad' },
  { id:8,  name:'Telangana BTL Activation',    type:'BTL',        vendor:'EventPro',    price:30000, planPrice:28000, lat:17.3616, lng:78.4747, city:'Hyderabad' },
  { id:9,  name:'Zee Telugu – Prime Time',     type:'Television', vendor:'Zee',         price:45000, planPrice:42000, lat:17.4010, lng:78.4540, city:'Hyderabad' },
  { id:10, name:'Bus Shelter – MG Road',       type:'Outdoor',    vendor:'Laqshya',     price:9000,  planPrice:8000,  lat:17.3920, lng:78.4680, city:'Hyderabad' },
  { id:11, name:'IMAX – AMB Cinemas',          type:'Cinema',     vendor:'AMB',         price:20000, planPrice:18000, lat:17.4399, lng:78.3489, city:'Hyderabad' },
  { id:12, name:'Red FM 93.5 Hyderabad',       type:'Radio',      vendor:'Red FM',      price:10000, planPrice:9000,  lat:17.3982, lng:78.4800, city:'Hyderabad' },
  // ── MUMBAI ─────────────────────────────────────────────────
  { id:13, name:'Mumbai Airport T2',           type:'Airports',   vendor:'MIAL',        price:55000, planPrice:50000, lat:19.0896, lng:72.8656, city:'Mumbai' },
  { id:14, name:'CST Billboard',               type:'Outdoor',    vendor:'Times OOH',   price:25000, planPrice:22000, lat:18.9402, lng:72.8356, city:'Mumbai' },
  { id:15, name:'PVR BKC – Cinema',            type:'Cinema',     vendor:'PVR',         price:18000, planPrice:16000, lat:19.0588, lng:72.8656, city:'Mumbai' },
  { id:16, name:'Radio City 91.1 FM Mumbai',   type:'Radio',      vendor:'Radio City',  price:15000, planPrice:13000, lat:19.0760, lng:72.8777, city:'Mumbai' },
  // ── DELHI ──────────────────────────────────────────────────
  { id:17, name:'Delhi Metro Digital',         type:'BTL',        vendor:'DMRC',        price:20000, planPrice:18000, lat:28.6139, lng:77.2090, city:'Delhi' },
  { id:18, name:'IGI Airport Delhi',           type:'Airports',   vendor:'Airport Ads', price:60000, planPrice:55000, lat:28.5562, lng:77.1000, city:'Delhi' },
  { id:19, name:'Connaught Place Hoarding',    type:'Outdoor',    vendor:'Selvel OOH',  price:30000, planPrice:27000, lat:28.6315, lng:77.2167, city:'Delhi' },
  // ── BANGALORE ──────────────────────────────────────────────
  { id:20, name:'Bangalore Hoardings MG Road', type:'Outdoor',    vendor:'Times OOH',   price:17000, planPrice:15000, lat:12.9716, lng:77.5946, city:'Bangalore' },
  { id:21, name:'Kempegowda Airport Bangalore',type:'Airports',   vendor:'BIAL',        price:50000, planPrice:45000, lat:13.1986, lng:77.7066, city:'Bangalore' },
  { id:22, name:'Namma Metro Branding',        type:'BTL',        vendor:'BMRCL',       price:18000, planPrice:16000, lat:12.9780, lng:77.5730, city:'Bangalore' },
  // ── CHENNAI ────────────────────────────────────────────────
  { id:23, name:'Sun TV – Prime Time',         type:'Television', vendor:'Sun TV',      price:60000, planPrice:55000, lat:13.0827, lng:80.2707, city:'Chennai' },
  { id:24, name:'Chennai Airport',             type:'Airports',   vendor:'AAI',         price:40000, planPrice:36000, lat:12.9941, lng:80.1709, city:'Chennai' },
  { id:25, name:'Marina Beach Billboard',      type:'Outdoor',    vendor:'Laqshya',     price:14000, planPrice:12000, lat:13.0500, lng:80.2824, city:'Chennai' },
];
