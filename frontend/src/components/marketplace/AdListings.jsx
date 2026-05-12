// AdListings.jsx
// Center panel — grid of listing cards
import ListingCard from './ListingCard';

export default function AdListings({
  listings, loading, categoryColor, categoryName, adType,
  cartItems, onToggleCart, onHoverListing, cityFilter, onCityChange,
}) {
  const cities = ['All Cities', 'Hyderabad', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai'];

  return (
    <div style={S.wrap}>
      {/* Top bar */}
      <div style={S.topBar}>
        <div>
          <span style={S.count}>{listings.length} listings</span>
          <span style={S.breadcrumb}>
            {categoryName}{adType && adType !== 'All' ? ` › ${adType}` : ''}
          </span>
        </div>

        {/* City filter */}
        <div style={S.cityRow}>
          {cities.map(c => (
            <button
              key={c}
              onClick={() => onCityChange(c === 'All Cities' ? '' : c)}
              style={{
                ...S.cityPill,
                background: (cityFilter === c || (!cityFilter && c === 'All Cities')) ? 'rgba(0,212,180,0.15)' : 'transparent',
                color:      (cityFilter === c || (!cityFilter && c === 'All Cities')) ? '#00d4b4' : '#8fa3c0',
                border:     `1px solid ${(cityFilter === c || (!cityFilter && c === 'All Cities')) ? 'rgba(0,212,180,0.4)' : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div style={S.empty}>Loading...</div>
      ) : listings.length === 0 ? (
        <div style={S.empty}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
          <div>No listings found for this selection.</div>
          <div style={{ fontSize: 12, marginTop: 8, color: '#4a6080' }}>Try changing the city or ad type filter.</div>
        </div>
      ) : (
        <div style={S.grid}>
          {listings.map(listing => (
            <ListingCard
              key={listing.id}
              listing={listing}
              categoryColor={categoryColor}
              inCart={cartItems.some(i => i.mediaId === listing.id)}
              onToggleCart={onToggleCart}
              onHover={onHoverListing}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const S = {
  wrap:       { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#0a0f1a' },
  topBar:     { padding: '12px 16px', borderBottom: '1px solid rgba(0,212,180,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, flexShrink: 0 },
  count:      { fontFamily: 'Syne,sans-serif', fontWeight: 700, color: '#fff', fontSize: 15, marginRight: 8 },
  breadcrumb: { fontSize: 12, color: '#8fa3c0' },
  cityRow:    { display: 'flex', gap: 6, flexWrap: 'wrap' },
  cityPill:   { padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 500, cursor: 'pointer', fontFamily: 'DM Sans,sans-serif', transition: 'all 0.15s' },
  grid:       { flex: 1, overflowY: 'auto', padding: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(230px,1fr))', gap: 14, alignContent: 'start' },
  empty:      { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#8fa3c0', fontSize: 14, padding: 40 },
};
