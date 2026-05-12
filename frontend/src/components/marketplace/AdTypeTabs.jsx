// AdTypeTabs.jsx
// Horizontal pill tabs showing ad types for the selected category
export default function AdTypeTabs({ adTypes, selected, onSelect, categoryColor }) {
  return (
    <div style={S.wrap}>
      <button
        onClick={() => onSelect('All')}
        style={{
          ...S.pill,
          background: selected === 'All' ? categoryColor : 'rgba(255,255,255,0.04)',
          color:       selected === 'All' ? '#000' : '#8fa3c0',
          border:      `1px solid ${selected === 'All' ? categoryColor : 'rgba(255,255,255,0.08)'}`,
          fontWeight:  selected === 'All' ? 700 : 500,
        }}
      >
        All Types
      </button>

      {adTypes.map(type => {
        const active = selected === type;
        return (
          <button
            key={type}
            onClick={() => onSelect(type)}
            style={{
              ...S.pill,
              background: active ? categoryColor : 'rgba(255,255,255,0.04)',
              color:       active ? '#000' : '#8fa3c0',
              border:      `1px solid ${active ? categoryColor : 'rgba(255,255,255,0.08)'}`,
              fontWeight:  active ? 700 : 500,
            }}
          >
            {type}
          </button>
        );
      })}
    </div>
  );
}

const S = {
  wrap: {
    display: 'flex', gap: 8, padding: '14px 16px', overflowX: 'auto',
    borderBottom: '1px solid rgba(0,212,180,0.1)', background: '#0d1525', flexShrink: 0,
    scrollbarWidth: 'none',
  },
  pill: {
    flexShrink: 0, padding: '6px 14px', borderRadius: 20,
    fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap',
    transition: 'all 0.15s', fontFamily: 'DM Sans,sans-serif',
  },
};
