// CategorySidebar.jsx
// Left panel — main category list + search
export default function CategorySidebar({ categories, selected, onSelect, search, onSearch }) {
  return (
    <div style={S.sidebar}>
      <div style={S.label}>MEDIA CATEGORIES</div>

      <div style={S.list}>
        {categories.map(cat => {
          const active = selected === cat.category;
          return (
            <button
              key={cat.category}
              onClick={() => onSelect(cat.category)}
              style={{
                ...S.catBtn,
                background: active ? `${cat.color}20` : 'transparent',
                borderColor: active ? cat.color : 'transparent',
                color: active ? '#fff' : '#8fa3c0',
              }}
            >
              <span style={{ ...S.catDot, background: cat.color }} />
              <span style={S.catIcon}>{cat.icon}</span>
              <span style={S.catName}>{cat.category}</span>
              {active && <span style={{ ...S.activePip, background: cat.color }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const S = {
  sidebar:     { width: 220, background: '#0a0f1a', borderRight: '1px solid rgba(0,212,180,0.12)', display: 'flex', flexDirection: 'column', flexShrink: 0 },
  label: { padding: '16px 20px 10px', fontSize: 10, color: '#4a6080', letterSpacing: 1.2, fontWeight: 700 },
  list:        { flex: 1, overflowY: 'auto', padding: '0 8px 16px' },
  catBtn:      { width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '10px 10px', borderRadius: 8, border: '1px solid transparent', cursor: 'pointer', marginBottom: 2, transition: 'all 0.15s', fontFamily: 'DM Sans,sans-serif', position: 'relative' },
  catDot:      { width: 6, height: 6, borderRadius: '50%', flexShrink: 0 },
  catIcon:     { fontSize: 15, flexShrink: 0 },
  catName:     { fontSize: 13, fontWeight: 500, flex: 1, textAlign: 'left' },
  activePip:   { position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: 3, height: 20, borderRadius: 2 },
};
