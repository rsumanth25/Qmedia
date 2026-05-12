import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../api/api';
import HeroSection from '../components/HeroSection';
import CategorySidebar from '../components/marketplace/CategorySidebar';
import AdTypeTabs from '../components/marketplace/AdTypeTabs';
import InventoryListings from '../components/marketplace/InventoryListings';
import MarketplaceMap from '../components/marketplace/MarketplaceMap';

const DEFAULT_CATEGORIES = [
  { category: 'Airports', icon: '✈️', color: '#3b82f6', adTypes: ['Digital Screens','Lightbox','Wall Signage','Hoarding','Totem','Scroller','Promotional Space','Travelator','FIDS Screen','Luggage Trolley'] },
  { category: 'Airlines', icon: '🛫', color: '#0ea5e9', adTypes: ['E-Boarding Pass & E-Ticket','Boarding Pass','Seat Back Branding','Inflight Sampling','Meal Tray Placement','Inflight Announcement','Cup Branding','Tarmac Coach - Interior'] },
  { category: 'Cinema', icon: '🎬', color: '#f59e0b', adTypes: ['Slide Ad - On Screen','Video Ad - On Screen'] },
  { category: 'Digital', icon: '💻', color: '#8b5cf6', adTypes: ['Video','Banner','Homescreen Masthead','RoadBlock','App Installs','Pause Ads','Billboards'] },
  { category: 'Influencers', icon: '🌟', color: '#a855f7', adTypes: ['Podcast','Instagram Reels','Instagram Story','Video','Instagram Post'] },
  { category: 'CTV', icon: '📺', color: '#06b6d4', adTypes: ['Video','Boot Up Screen'] },
  { category: 'Newspaper', icon: '📰', color: '#6b7280', adTypes: ['Custom Sized Ads','Quarter Size','Half Page','Full Page','Jacket Front Size','Jacket Back Size','Jacket Both Sides','Innovative Ads','Pointer Ads','Skybus','Display Classified Ads','Advertorial','Obituary Ads','Public Notice'] },
  { category: 'Hyperlocal', icon: '📍', color: '#14b8a6', adTypes: ['Custom Sized Ads','Quarter Page','Half Page','Full Cab','Door Branding'] },
  { category: 'BTL', icon: '🎪', color: '#f97316', adTypes: ['Interior Train Branding','Exterior Train Branding','Full Train Branding','Jingle'] },
  { category: 'Outdoor', icon: '🏙️', color: '#10b981', adTypes: ['Bus Shelter','Printing Charges','Mounting Charges'] },
  { category: 'Radio', icon: '📻', color: '#ec4899', adTypes: ['Jingle','RJ Mentions','Contest','Sponsorship Tags','Content Creation','Road Block','Studio Shift','Time Check','Outdoor Broadcasting','IPL Associate Package','IPL CoPowered','IPL Presenting Sponsor','IPL Title Package'] },
  { category: 'Sports', icon: '🏏', color: '#22c55e', adTypes: ['Video','Banner','Connected TV','Squeeze Ups','CTL and PPL Packages','Feature Packages'] },
  { category: 'Television', icon: '📡', color: '#0ea5e9', adTypes: ['Video Ad','L Band','J Band','Aston Band','Laptop Branding','Program Integration','Scroller','Headline Sponsorship','Black & White Video Ad','Logo Bug','Show Sponsorship'] },
  { category: 'Magazine', icon: '📖', color: '#e879f9', adTypes: ['Half Page','Full Page','Article','Double Spread','Cover Page'] },
  { category: 'Digital PR', icon: '🔗', color: '#14b8a6', adTypes: ['PR Essentials Package','PR Impact Plus Package'] },
];

export default function Home() {
  const { items, addItem, removeItem } = useCart();
  const navigate = useNavigate();
  const marketplaceRef = useRef(null);

  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [selectedCat, setSelectedCat] = useState('Airports');
  const [selectedAdType, setSelectedAdType] = useState('All');
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const currentCat = useMemo(() => categories.find(cat => cat.category === selectedCat) || DEFAULT_CATEGORIES[0], [categories, selectedCat]);
  const categoryColor = currentCat.color || '#00d4b4';
  const isMobile = windowWidth < 920;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    api.get('/media/categories')
      .then(res => {
        if (res.data.categories?.length) {
          setCategories(res.data.categories.map(cat => ({ ...cat, icon: cat.icon || '📌' })));
        }
      })
      .catch(() => {});
  }, []);

  const fetchListings = useCallback(() => {
    if (!selectedCat) return;
    setLoading(true);
    const params = new URLSearchParams({ category: selectedCat });
    if (selectedAdType !== 'All') params.append('adType', selectedAdType);
    api.get(`/media/listings?${params}`)
      .then(res => setListings(res.data.listings || []))
      .catch(() => setListings([]))
      .finally(() => setLoading(false));
  }, [selectedCat, selectedAdType]);

  useEffect(() => { fetchListings(); }, [fetchListings]);

  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();
    const fresh = listings.filter(listing => {
      const textMatch = !query ||
        listing.title.toLowerCase().includes(query) ||
        listing.area.toLowerCase().includes(query) ||
        listing.location.toLowerCase().includes(query) ||
        listing.adType.toLowerCase().includes(query);
      const cityMatch = !cityFilter || listing.location.toLowerCase() === cityFilter.toLowerCase();
      return textMatch && cityMatch;
    });

    if (query) {
      const match = categories.find(cat => query.includes(cat.category.toLowerCase()));
      if (match && match.category !== selectedCat) {
        setSelectedCat(match.category);
      }
    }

    setFilteredListings(fresh);
  }, [listings, searchQuery, categories, selectedCat, cityFilter]);

  const handleCatSelect = (category) => {
    setSelectedCat(category);
    setSelectedAdType('All');
    setSearchQuery('');
  };

  const handleCategorySelect = (category) => {
    setSelectedCat(category);
    setSelectedAdType('All');
    setSearchQuery('');
    setCityFilter('');
    scrollToMarketplace();
  };

  const handleSearchSubmit = (query) => {
    const text = query.trim();
    setSearchQuery(text);
    if (!text) return;

    const match = categories.find(cat => text.toLowerCase().includes(cat.category.toLowerCase()));
    if (match && match.category !== selectedCat) {
      setSelectedCat(match.category);
    }
    scrollToMarketplace();
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleAddToCart = (listing) => {
    if (!listing || !listing.availability) return;
    addItem({
      mediaId: listing.id,
      name: listing.title,
      type: listing.adType,
      vendor: listing.area,
      city: listing.location,
      price: listing.minSpend,
      planPrice: listing.minSpend,
    });
  };

  const handleToggleCart = (listing) => {
    const inCart = items.some(item => item.mediaId === listing.id);
    if (inCart) removeItem(listing.id);
    else handleAddToCart(listing);
  };

  const filteredCats = categories;

  const totalValue = items.reduce((sum, item) => sum + item.price, 0);

  const scrollToMarketplace = () => marketplaceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div style={S.page}>
      <HeroSection onExplore={scrollToMarketplace} onSearch={handleSearchSubmit} onCategorySelect={handleCategorySelect} categories={categories} />

      <div style={S.marketIntro}>
        <div>
          <div style={S.kicker}>Live Marketplace</div>
          <h2 style={S.marketTitle}>Browse inventory, compare media packs and book ads—all inside the homepage.</h2>
          <p style={S.marketCopy}>Select your channel, pick a live campaign slot and review geolocated listings with our market map panel.</p>
        </div>
        <button style={S.marketButton} onClick={scrollToMarketplace}>Open Dashboard</button>
      </div>

      <section ref={marketplaceRef} style={S.marketplaceSection}>
        <div style={S.marketHeader}>
          <div>
            <div style={S.marketLabel}>Marketplace Dashboard</div>
            <h3 style={S.marketHeading}>{currentCat.icon} {currentCat.category}</h3>
            <p style={S.marketSub}>{selectedAdType === 'All' ? 'Browse all active ad inventory for this channel.' : `Showing ${selectedAdType} listings with live availability.`}</p>
          </div>
          <div style={S.metaPill}>Live items: <strong>{filteredListings.length}</strong></div>
        </div>

        <div style={{ ...S.marketGrid, gridTemplateColumns: isMobile ? '1fr' : '280px minmax(540px,1fr) 360px', alignItems: 'start' }}>
          <div style={S.leftPanel}>
            <div style={S.stickyLeft}>
            <CategorySidebar categories={filteredCats} selected={selectedCat} onSelect={handleCatSelect} />
          </div>
          </div>

          <div style={S.centerPanel}>
            <div style={S.marketSearchRow}>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit(searchQuery)}
                placeholder="Search campaigns, venues or formats"
                style={S.marketSearchInput}
              />
            </div>
            <AdTypeTabs adTypes={currentCat.adTypes || []} selected={selectedAdType} onSelect={setSelectedAdType} categoryColor={categoryColor} />
            <InventoryListings
              listings={filteredListings}
              loading={loading}
              categoryColor={categoryColor}
              categoryName={selectedCat}
              adType={selectedAdType}
              cartItems={items}
              onToggleCart={handleToggleCart}
              onHoverListing={() => {} }
              cityFilter={cityFilter}
              onCityChange={setCityFilter}
            />
          </div>

          <MarketplaceMap
            listings={filteredListings}
            categoryColor={categoryColor}
            hoveredListing={null}
            onAddToCart={handleAddToCart}
          />
        </div>

        {items.length > 0 && (
          <div style={S.cartSection}>
            <div style={S.cartHeader}>
              <div>
                <div style={S.cartTitle}>Campaign Cart</div>
                <div style={S.cartSummary}>{items.length} item{items.length > 1 ? 's' : ''} · ₹{totalValue.toLocaleString()}</div>
              </div>
              <button style={S.checkoutBtn} onClick={handleCheckout}>Proceed to Checkout</button>
            </div>

            <div style={S.cartItemsGrid}>
              {items.map(item => (
                <div key={item.mediaId} style={S.cartItem}>
                  <div>
                    <div style={S.itemName}>{item.name}</div>
                    <div style={S.itemMeta}>{item.type} · {item.city}</div>
                  </div>
                  <div style={S.itemRight}>
                    <div style={S.itemPrice}>₹{item.price.toLocaleString()}</div>
                    <button style={S.itemRemove} onClick={() => removeItem(item.mediaId)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <footer style={S.footer}>
        <div style={S.footerGrid}>
          <div>
            <div style={S.brandRow}><span style={S.brandIcon}>Q</span><span style={S.brandText}>Qmedia</span></div>
            <p style={S.brandCopy}>India's leading media buying platform. Empowering brands to advertise across 15+ channels.</p>
          </div>
          <div>
            <div style={S.footerHeading}>Services</div>
            {['Digital','Television','Radio','Outdoor','Cinema','Influencer'].map(item => <div key={item} style={S.footerLink}>{item}</div>)}
          </div>
          <div>
            <div style={S.footerHeading}>Company</div>
            {['About Us','Clients','Blog','Careers','Press'].map(item => <div key={item} style={S.footerLink}>{item}</div>)}
          </div>
          <div>
            <div style={S.footerHeading}>Tools</div>
            {['Budget Estimator','Media Planner','ROAS Calculator','AI Tools'].map(item => <div key={item} style={S.footerLink}>{item}</div>)}
          </div>
        </div>
        <div style={S.footerBottom}>
          <div style={S.copyright}>© 2026 Q Media. All rights reserved.</div>
          <div style={S.footerBadges}>
            {['Google Certified','INS Accredited'].map(badge => <span key={badge} style={S.badge}>{badge}</span>)}
          </div>
        </div>
      </footer>
    </div>
  );
}

const S = {
  page: { background: '#0a0f1a', color: '#e8f0fe', minHeight: '100vh', overflowX: 'hidden' },
  marketIntro: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, padding: '0 60px 40px', flexWrap: 'wrap' },
  kicker: { textTransform: 'uppercase', fontSize: 12, letterSpacing: 1.5, color: '#00d4b4', fontWeight: 700, marginBottom: 8 },
  marketTitle: { fontFamily: 'Syne,sans-serif', fontSize: 30, margin: 0, maxWidth: 760, lineHeight: 1.15, color: '#fff' },
  marketCopy: { maxWidth: 620, color: '#8fa3c0', fontSize: 15, lineHeight: 1.8 },
  marketButton: { background: 'linear-gradient(135deg,#00d4b4,#0ea5e9)', color: '#000', border: 'none', borderRadius: 14, padding: '14px 24px', fontWeight: 700, cursor: 'pointer' },
  marketplaceSection: { padding: '0 60px 60px' },
  marketHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginBottom: 24, flexWrap: 'wrap' },
  marketLabel: { fontSize: 12, color: '#00d4b4', textTransform: 'uppercase', letterSpacing: 1.6, marginBottom: 6 },
  marketHeading: { fontFamily: 'Syne,sans-serif', fontSize: 28, margin: 0, color: '#fff' },
  marketSub: { color: '#94a3c0', fontSize: 14, marginTop: 4, maxWidth: 600 },
  metaPill: { padding: '10px 16px', borderRadius: 999, background: 'rgba(0,212,180,0.1)', color: '#00d4b4', fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap' },
  marketGrid: { display: 'grid', gap: 24 },
  leftPanel: { display: 'flex', justifyContent: 'flex-start' },
  stickyLeft: { position: 'sticky', top: 24, alignSelf: 'flex-start' },
  centerPanel: { display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden', gap: 18 },
  marketSearchRow: { marginBottom: 16 },
  marketSearchInput: { width: '100%', padding: '14px 18px', borderRadius: 18, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#e8f0fe', outline: 'none', fontSize: 14 },
  cartSection: { marginTop: 30, borderTop: '1px solid rgba(0,212,180,0.18)', paddingTop: 28, background: 'rgba(13,27,46,0.95)', borderRadius: 24, padding: 24 },
  cartHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginBottom: 22, flexWrap: 'wrap' },
  cartTitle: { fontSize: 16, fontWeight: 700, color: '#fff' },
  cartSummary: { color: '#8fa3c0', fontSize: 14, marginTop: 4 },
  checkoutBtn: { border: 'none', borderRadius: 16, padding: '14px 24px', background: 'linear-gradient(135deg,#00d4b4,#0ea5e9)', color: '#000', fontWeight: 700, cursor: 'pointer' },
  cartItemsGrid: { display: 'grid', gap: 14 },
  cartItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,212,180,0.12)', borderRadius: 18, padding: '18px 20px' },
  itemName: { fontSize: 14, fontWeight: 700, color: '#fff' },
  itemMeta: { color: '#8fa3c0', fontSize: 12, marginTop: 4 },
  itemRight: { display: 'flex', alignItems: 'center', gap: 14, textAlign: 'right' },
  itemPrice: { fontSize: 15, fontWeight: 700, color: '#00d4b4' },
  itemRemove: { border: 'none', borderRadius: 14, padding: '10px 16px', background: 'rgba(255,255,255,0.06)', color: '#e8f0fe', cursor: 'pointer' },
  cartButton: { border: 'none', borderRadius: 14, padding: '12px 20px', background: 'linear-gradient(135deg,#00d4b4,#00b89c)', color: '#000', fontWeight: 700, cursor: 'pointer' },
  footer: { background: '#0d1525', borderTop: '1px solid rgba(0,212,180,0.18)', padding: '50px 60px 60px' },
  footerGrid: { display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 36, marginBottom: 36 },
  brandRow: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 },
  brandIcon: { width: 34, height: 34, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#00d4b4,#006655)', color: '#fff', fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 18 },
  brandText: { fontSize: 18, fontWeight: 700, color: '#00d4b4', fontFamily: 'Syne,sans-serif' },
  brandCopy: { color: '#8fa3c0', fontSize: 14, lineHeight: 1.8, maxWidth: 280 },
  footerHeading: { fontSize: 12, color: '#00d4b4', textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 16, fontWeight: 700 },
  footerLink: { fontSize: 14, color: '#8fa3c0', marginBottom: 10, cursor: 'pointer' },
  footerBottom: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' },
  copyright: { color: '#8fa3c0', fontSize: 13 },
  footerBadges: { display: 'flex', gap: 10, flexWrap: 'wrap' },
  badge: { background: 'rgba(0,212,180,0.08)', border: '1px solid rgba(0,212,180,0.3)', borderRadius: 10, padding: '6px 14px', fontSize: 12, color: '#00d4b4' },
};
