const router    = require('express').Router();
const inventory = require('../data/inventoryData');

// GET /api/media/categories
router.get('/categories', (req, res) => {
  const cats = inventory.map(({ category, icon, color, adTypes }) => ({
    category, icon, color, adTypes,
  }));
  res.json({ categories: cats });
});

// GET /api/media/listings?category=Airports&adType=Digital Screens&city=Hyderabad
router.get('/listings', (req, res) => {
  const { category, adType, city } = req.query;
  let cat = inventory.find(c => c.category.toLowerCase() === (category || '').toLowerCase());
  if (!cat) return res.json({ listings: [] });
  let listings = cat.listings;
  if (adType) listings = listings.filter(l => l.adType.toLowerCase() === adType.toLowerCase());
  if (city)   listings = listings.filter(l => l.location.toLowerCase() === city.toLowerCase() || l.location === 'Pan India');
  res.json({ listings, total: listings.length });
});

// GET /api/media (legacy)
router.get('/', (req, res) => {
  const { city, type } = req.query;
  let all = inventory.flatMap(cat => cat.listings.map(l => ({ ...l, category: cat.category })));
  if (city) all = all.filter(l => l.location.toLowerCase() === city.toLowerCase());
  if (type) all = all.filter(l => l.category.toLowerCase() === type.toLowerCase());
  res.json({ media: all, total: all.length });
});

module.exports = router;
