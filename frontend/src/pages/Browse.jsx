// Browse.jsx — Full hierarchical advertising marketplace
// Flow: Category → Ad Types → Listings + Map
import { useState, useEffect, useCallback } from 'react';
import api from '../api/api';
import { useCart } from '../context/CartContext';
import CategorySidebar from '../components/marketplace/CategorySidebar';
import AdTypeTabs      from '../components/marketplace/AdTypeTabs';
import AdListings      from '../components/marketplace/AdListings';
import InteractiveMap  from '../components/marketplace/InteractiveMap';

let leafletLoaded = false;
function loadLeaflet() {
  if (leafletLoaded) return Promise.resolve();
  return new Promise(resolve => {
    if (!document.getElementById('lft-css')) {
      const link = document.createElement('link');
      link.id = 'lft-css'; link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
      document.head.appendChild(link);
    }
    if (document.getElementById('lft-js')) { leafletLoaded = true; return resolve(); }
    const script = document.createElement('script');
    script.id = 'lft-js';
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
    script.onload = () => { leafletLoaded = true; resolve(); };
    document.head.appendChild(script);
  });
}

export default function Browse() {
  const { items, addItem, removeItem } = useCart();
  const [categories,     setCategories]     = useState([]);
  const [selectedCat,    setSelectedCat]    = useState('Airports');
  const [selectedAdType, setSelectedAdType] = useState('All');
  const [listings,       setListings]       = useState([]);
  const [loading,        setLoading]        = useState(false);
  const [cityFilter,     setCityFilter]     = useState('');
  const [catSearch,      setCatSearch]      = useState('');
  const [hoveredListing, setHoveredListing] = useState(null);
  const [mapReady,       setMapReady]       = useState(false);

  const currentCat = categories.find(c => c.category === selectedCat) || {};

  useEffect(() => { loadLeaflet().then(() => setMapReady(true)); }, []);

  useEffect(() => {
    api.get('/media/categories').then(res => setCategories(res.data.categories)).catch(() => {});
  }, []);

  const fetchListings = useCallback(() => {
    if (!selectedCat) return;
    setLoading(true);
    const params = new URLSearchParams({ category: selectedCat });
    if (selectedAdType && selectedAdType !== 'All') params.append('adType', selectedAdType);
    if (cityFilter) params.append('city', cityFilter);
    api.get(`/media/listings?${params}`)
      .then(res => setListings(res.data.listings || []))
      .catch(() => setListings([]))
      .finally(() => setLoading(false));
  }, [selectedCat, selectedAdType, cityFilter]);

  useEffect(() => { fetchListings(); }, [fetchListings]);

  const handleCatSelect = (cat) => {
    setSelectedCat(cat); setSelectedAdType('All'); setCityFilter('');
  };

  const handleToggleCart = (listing) => {
    const inCart = items.some(i => i.mediaId === listing.id);
    if (inCart) { removeItem(listing.id); return; }
    addItem({ mediaId: listing.id, name: listing.title, type: listing.adType, vendor: listing.area, city: listing.location, price: listing.minSpend, planPrice: listing.minSpend });
  };

  const filteredCats = categories.filter(c => c.category.toLowerCase().includes(catSearch.toLowerCase()));
  const sub   = items.reduce((s, i) => s + i.price, 0);
  const gst   = Math.round(sub * 0.18);
  const grand = sub + gst;
  const cc    = currentCat.color || '#00d4b4';

  return (
    <div style={S.page}>
      {/* Header */}
      <div style={S.header}>
        <div>
          <h2 style={S.title}>
            {currentCat.icon} {selectedCat}
            {selectedAdType !== 'All' && <span style={{ color: cc, fontWeight: 400, fontSize: 18 }}> › {selectedAdType}</span>}
          </h2>
          <p style={S.sub}>Browse inventory · Select ad type · Add to cart · Checkout</p>
        </div>
        {items.length > 0 && (
          <div style={{ ...S.cartPill, borderColor: cc }}>
            🛒 <strong style={{ color: cc }}>{items.length}</strong> items &nbsp;·&nbsp;
            <strong style={{ color: '#fff' }}>₹{sub.toLocaleString()}</strong>
          </div>
        )}
      </div>

      {/* Main 3-column layout */}
      <div style={S.layout}>
        <CategorySidebar categories={filteredCats} selected={selectedCat} onSelect={handleCatSelect} search={catSearch} onSearch={setCatSearch} />

        <div style={S.center}>
          {currentCat.adTypes && (
            <AdTypeTabs adTypes={currentCat.adTypes} selected={selectedAdType} onSelect={setSelectedAdType} categoryColor={cc} />
          )}
          <div style={S.content}>
            <AdListings listings={listings} loading={loading} categoryColor={cc} categoryName={selectedCat} adType={selectedAdType} cartItems={items} onToggleCart={handleToggleCart} onHoverListing={setHoveredListing} cityFilter={cityFilter} onCityChange={setCityFilter} />
            {mapReady && <InteractiveMap listings={listings} categoryColor={cc} hoveredListing={hoveredListing} cityFilter={cityFilter} />}
          </div>
        </div>
      </div>

      {/* Below-map cart summary */}
      {items.length > 0 && (
        <div style={S.belowCart}>
          <div style={S.bcTop}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 18 }}>🛒</span>
              <span style={S.bcTitle}>Campaign Cart</span>
              <span style={{ ...S.bcBadge, background: cc }}>{items.length} item{items.length !== 1 ? 's' : ''}</span>
            </div>
            <div style={{ fontSize: 13, color: '#8fa3c0' }}>
              Total: <strong style={{ color: cc, fontSize: 18, fontFamily: 'Syne,sans-serif', marginLeft: 5 }}>₹{sub.toLocaleString()}</strong>
            </div>
          </div>

          <div style={S.bcRow}>
            {items.map(item => (
              <div key={item.mediaId} style={S.bcCard}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#e8f0fe', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
                  <div style={{ fontSize: 10, color: '#8fa3c0' }}>{item.type} · {item.city}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: cc, fontFamily: 'Syne,sans-serif' }}>₹{item.price.toLocaleString()}</div>
                  <button onClick={() => removeItem(item.mediaId)} style={S.bcDel}>✕</button>
                </div>
              </div>
            ))}
          </div>

          <div style={S.bcFoot}>
            <div style={S.bcTots}>
              {[['Subtotal', sub], ['GST 18%', gst], ['Grand Total', grand]].map(([l, v]) => (
                <div key={l} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 10, color: '#4a6080', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 }}>{l}</div>
                  <div style={{ fontSize: l === 'Grand Total' ? 20 : 14, fontWeight: 700, color: l === 'Grand Total' ? cc : '#e8f0fe', fontFamily: 'Syne,sans-serif' }}>₹{v.toLocaleString()}</div>
                </div>
              ))}
            </div>
            <a href="/checkout" style={{ ...S.checkBtn, background: `linear-gradient(135deg,${cc},${cc}cc)` }}>
              Proceed to Checkout →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

const S = {
  page:      { background: '#0a0f1a', minHeight: '100vh', display: 'flex', flexDirection: 'column', color: '#e8f0fe' },
  header:    { padding: '16px 24px', borderBottom: '1px solid rgba(0,212,180,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 },
  title:     { fontFamily: 'Syne,sans-serif', fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 3 },
  sub:       { fontSize: 12, color: '#8fa3c0' },
  cartPill:  { background: 'rgba(0,212,180,0.06)', border: '1px solid', borderRadius: 10, padding: '8px 16px', fontSize: 13, color: '#8fa3c0' },
  layout:    { display: 'flex', flex: 1, overflow: 'hidden', height: 'calc(100vh - 130px)' },
  center:    { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  content:   { flex: 1, display: 'flex', overflow: 'hidden' },
  belowCart: { background: '#0d1525', borderTop: '2px solid rgba(0,212,180,0.2)', flexShrink: 0 },
  bcTop:     { padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,212,180,0.04)', borderBottom: '1px solid rgba(0,212,180,0.1)' },
  bcTitle:   { fontFamily: 'Syne,sans-serif', fontSize: 15, fontWeight: 700, color: '#fff' },
  bcBadge:   { color: '#000', fontSize: 10, fontWeight: 700, padding: '2px 9px', borderRadius: 20 },
  bcRow:     { display: 'flex', gap: 10, padding: '10px 20px', overflowX: 'auto', scrollbarWidth: 'none' },
  bcCard:    { flexShrink: 0, minWidth: 200, maxWidth: 240, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,212,180,0.12)', borderRadius: 8, padding: '9px 11px', display: 'flex', gap: 8 },
  bcDel:     { background: 'none', border: 'none', color: '#4a6080', fontSize: 11, cursor: 'pointer', display: 'block', marginTop: 3 },
  bcFoot:    { padding: '10px 20px', borderTop: '1px solid rgba(0,212,180,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  bcTots:    { display: 'flex', gap: 28 },
  checkBtn:  { color: '#000', borderRadius: 10, padding: '11px 24px', fontSize: 14, fontWeight: 800, cursor: 'pointer', textDecoration: 'none', fontFamily: 'DM Sans,sans-serif', flexShrink: 0 },
};
