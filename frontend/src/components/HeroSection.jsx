import { useState } from 'react';

export default function HeroSection({ onExplore, onSearch, onCategorySelect, categories = [] }) {
  const [query, setQuery] = useState('');

  return (
    <section style={S.container}>
      <div style={S.heroLeft}>
        <div style={S.badge}>India's #1 Media Buying Platform</div>
        <h1 style={S.title}>Plan Your Campaign.</h1>
        <p style={S.description}>Stay ahead in advertising with live media inventory for airports, cinema, digital, radio, outdoor and influencer campaigns.</p>

        <div style={S.searchPanel}>
          <span style={S.searchIcon}>🔍</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search inventory, venue or campaign"
            style={S.searchInput}
          />
          <button style={S.searchBtn} onClick={() => onSearch(query)}>Search</button>
        </div>

        <div style={S.chipRow}>
          {(categories.length ? categories.map(cat => cat.category) : ['Airports/Planes','Outdoor','Cinema','Digital','Television','Radio','Influencer','Magazine','Newspaper','Events']).map(item => (
            <button key={item} style={S.chip} onClick={() => onCategorySelect ? onCategorySelect(item) : onSearch(item)}>{item}</button>
          ))}
        </div>
      </div>

      <div style={S.heroRight}>
        <div style={S.previewCard}>
          <div style={S.previewHead}>Campaign Table</div>
          <div style={S.previewTable}>
            <div style={{ ...S.tableRow, ...S.tableHeader }}>
              <span>Name</span>
              <span>Vendor</span>
              <span>Cost</span>
            </div>
            <div style={S.tableRow}><span>Bill board</span><span>SK Ads</span><span>₹100000</span></div>
            <div style={S.tableRow}><span>Cinema</span><span>SK Ads</span><span>₹30000</span></div>
            <div style={S.tableRow}><span>Radio</span><span>FM201</span><span>₹70000</span></div>
          </div>
          <button style={S.ctaBtn} onClick={() => onSearch(query || 'Airports')}>Start Now</button>
        </div>
      </div>
    </section>
  );
}

const S = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1.05fr 0.95fr',
    gap: 32,
    padding: '64px 60px 40px',
    alignItems: 'center',
    background: 'radial-gradient(circle at top right, rgba(0,212,180,0.18), transparent 35%), #0a0f1a',
  },
  heroLeft: { display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 620 },
  badge: { alignSelf: 'flex-start', background: 'rgba(0,212,180,0.12)', border: '1px solid rgba(0,212,180,0.25)', color: '#00d4b4', borderRadius: 999, padding: '8px 16px', fontSize: 12, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase' },
  title: { fontFamily: 'Syne,sans-serif', fontSize: 'clamp(3rem, 5vw, 5.4rem)', lineHeight: 1.02, margin: 0, color: '#fff' },
  description: { maxWidth: 540, fontSize: 16, lineHeight: 1.8, color: '#8fa3c0' },
  searchPanel: { display: 'flex', gap: 12, alignItems: 'center', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '12px 16px' },
  searchIcon: { fontSize: 18, color: '#00d4b4' },
  searchInput: { flex: 1, border: 'none', outline: 'none', background: 'transparent', color: '#e8f0fe', fontSize: 14, minWidth: 0 },
  searchBtn: { border: 'none', borderRadius: 14, padding: '12px 20px', background: 'linear-gradient(135deg,#00d4b4,#0ea5e9)', color: '#000', fontWeight: 700, cursor: 'pointer' },
  chipRow: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10, marginTop: 20 },
  chip: { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '12px 16px', color: '#8fa3c0', fontSize: 13, cursor: 'pointer' },
  heroRight: { display: 'flex', justifyContent: 'center' },
  previewCard: { width: '100%', maxWidth: 420, background: 'rgba(13,27,46,0.92)', border: '1px solid rgba(0,212,180,0.18)', borderRadius: 22, padding: 28, boxShadow: '0 30px 80px rgba(0,0,0,0.3)' },
  previewHead: { fontSize: 12, color: '#8fa3c0', textTransform: 'uppercase', letterSpacing: 1.4, marginBottom: 22 },
  previewTable: { display: 'grid', gap: 12, marginBottom: 24 },
  tableRow: { display: 'flex', justifyContent: 'space-between', gap: 20, fontSize: 14, color: '#e8f0fe', fontWeight: 600 },
  tableHeader: { color: '#94a3c0', borderBottom: '1px solid rgba(255,255,255,0.12)', paddingBottom: 12, fontWeight: 700 },
  ctaBtn: { width: '100%', border: 'none', borderRadius: 16, padding: '14px 0', background: 'linear-gradient(135deg,#00d4b4,#0ea5e9)', color: '#000', fontSize: 15, fontWeight: 700, cursor: 'pointer' },
};
