// ListingCard.jsx
// Individual media inventory listing card
import { useState } from 'react';

export default function ListingCard({ listing, categoryColor, inCart, onToggleCart, onHover }) {
  const [wished, setWished] = useState(false);

  // Generate a deterministic gradient thumbnail from the listing title
  const thumbColors = [
    ['#0d2438','#0a3d2e'], ['#1a0d38','#0d1a40'], ['#1a2a0d','#0d2a2a'],
    ['#2a0d1a','#1a0d2a'], ['#0d1a2a','#2a1a0d'], ['#0a2a3d','#1a3d0a'],
  ];
  const colorIdx = listing.id % thumbColors.length;
  const [c1, c2] = thumbColors[colorIdx];

  return (
    <div
      style={S.card}
      onMouseEnter={() => onHover && onHover(listing)}
      onMouseLeave={() => onHover && onHover(null)}
    >
      {/* Thumbnail */}
      <div style={{ ...S.thumb, background: `linear-gradient(135deg, ${c1}, ${c2})` }}>
        <div style={S.thumbIcon}>
          {listing.adType.includes('Digital') || listing.adType.includes('Screen') ? '🖥️' :
           listing.adType.includes('Billboard') || listing.adType.includes('Hoarding') ? '🏗️' :
           listing.adType.includes('Radio') || listing.adType.includes('Spot') ? '🎙️' :
           listing.adType.includes('Screen Ad') ? '🎬' :
           listing.adType.includes('Social') || listing.adType.includes('Instagram') ? '📱' :
           listing.mediaType === 'Print' ? '📰' : '📍'}
        </div>
        {/* Availability badge */}
        <div style={{ ...S.availBadge, background: listing.availability ? 'rgba(0,212,180,0.9)' : 'rgba(239,68,68,0.9)' }}>
          {listing.availability ? '● Available' : '● Sold Out'}
        </div>
        {/* Wishlist */}
        <button
          style={{ ...S.wishBtn, color: wished ? '#f43f5e' : 'rgba(255,255,255,0.5)' }}
          onClick={(e) => { e.stopPropagation(); setWished(v => !v); }}
        >
          {wished ? '♥' : '♡'}
        </button>
      </div>

      {/* Content */}
      <div style={S.body}>
        {/* Ad type badge */}
        <div style={{ ...S.typeBadge, background: `${categoryColor}20`, color: categoryColor, border: `1px solid ${categoryColor}40` }}>
          {listing.adType}
        </div>

        <div style={S.title}>{listing.title}</div>

        <div style={S.meta}>
          <span>📍 {listing.location}</span>
          <span style={{ color: '#4a6080' }}>·</span>
          <span>{listing.area}</span>
        </div>

        <div style={S.mediaType}>{listing.mediaType}</div>

        {/* Pricing */}
        <div style={S.priceRow}>
          <div>
            <div style={S.priceLabel}>Min Spend</div>
            <div style={S.price}>₹{listing.minSpend.toLocaleString()}</div>
          </div>
          <button
            disabled={!listing.availability}
            onClick={() => listing.availability && onToggleCart(listing)}
            style={{
              ...S.cartBtn,
              background: inCart ? categoryColor : 'transparent',
              color:       inCart ? '#000' : categoryColor,
              border:      `1px solid ${categoryColor}`,
              opacity:     listing.availability ? 1 : 0.4,
              cursor:      listing.availability ? 'pointer' : 'not-allowed',
            }}
          >
            {inCart ? '✓ Added' : '+ Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

const S = {
  card:       { background: '#0d1525', border: '1px solid rgba(0,212,180,0.12)', borderRadius: 12, overflow: 'hidden', transition: 'all 0.2s', cursor: 'default' },
  thumb:      { height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  thumbIcon:  { fontSize: 36 },
  availBadge: { position: 'absolute', top: 8, left: 8, fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 10, color: '#000', letterSpacing: 0.3 },
  wishBtn:    { position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.4)', border: 'none', borderRadius: '50%', width: 28, height: 28, cursor: 'pointer', fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  body:       { padding: '12px 14px' },
  typeBadge:  { display: 'inline-block', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 10, marginBottom: 8, letterSpacing: 0.3 },
  title:      { fontSize: 13, fontWeight: 600, color: '#e8f0fe', marginBottom: 6, lineHeight: 1.4 },
  meta:       { display: 'flex', gap: 5, fontSize: 11, color: '#8fa3c0', marginBottom: 4, flexWrap: 'wrap' },
  mediaType:  { fontSize: 10, color: '#4a6080', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 },
  priceRow:   { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' },
  priceLabel: { fontSize: 10, color: '#4a6080', marginBottom: 2 },
  price:      { fontSize: 16, fontWeight: 700, color: '#00d4b4', fontFamily: 'Syne,sans-serif' },
  cartBtn:    { fontSize: 12, fontWeight: 700, padding: '6px 14px', borderRadius: 8, fontFamily: 'DM Sans,sans-serif', transition: 'all 0.15s' },
};
