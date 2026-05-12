export default function SearchFilters({ budgetMin, budgetMax, onBudgetMinChange, onBudgetMaxChange, locationQuery, onLocationChange, cityFilter, onCityChange, availability, onAvailabilityChange }) {
  const budgetButtons = [10000, 25000, 50000, 100000].map(n => `₹${(n / 1000).toFixed(0)}k`);
  const cities = ['Hyderabad', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai'];

  return (
    <div style={S.panel}>
      <div style={S.section}>
        <div style={S.sectionTitle}>Search Inventory</div>
        <div style={S.inputWrap}>
          <span style={S.inputLabel}>Search location, campaign or venue</span>
          <input
            value={locationQuery}
            onChange={(e) => onLocationChange(e.target.value)}
            placeholder="Search by city, venue or format"
            style={S.input}
          />
        </div>
      </div>

      <div style={S.section}>
        <div style={S.sectionTitle}>Budget Range</div>
        <div style={S.rangeRow}>
          <input type="number" value={budgetMin} min={0} onChange={(e) => onBudgetMinChange(Number(e.target.value || 0))} style={S.budgetInput} placeholder="Min" />
          <span style={S.rangeDivider}>to</span>
          <input type="number" value={budgetMax} min={0} onChange={(e) => onBudgetMaxChange(Number(e.target.value || 0))} style={S.budgetInput} placeholder="Max" />
        </div>
        <div style={S.budgetButtons}>
          {budgetButtons.map(label => {
            const value = Number(label.replace('₹', '').replace('k', '000'));
            return (
              <button key={label} type="button" onClick={() => { onBudgetMinChange(0); onBudgetMaxChange(value); }} style={S.budgetBtn}>
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div style={S.section}>
        <div style={S.sectionTitle}>City Selector</div>
        <div style={S.cityGrid}>
          {cities.map(city => (
            <button key={city} type="button" onClick={() => onCityChange(city)} style={{ ...S.cityBtn, background: cityFilter === city ? 'rgba(0,212,180,0.16)' : 'transparent', color: cityFilter === city ? '#00d4b4' : '#8fa3c0', borderColor: cityFilter === city ? '#00d4b4' : 'rgba(255,255,255,0.08)' }}>
              {city}
            </button>
          ))}
        </div>
      </div>

      <div style={S.section}>
        <div style={S.sectionTitle}>Availability</div>
        <div style={S.availGrid}>
          {['All', 'Available', 'Sold Out'].map(option => (
            <button key={option} type="button" onClick={() => onAvailabilityChange(option)} style={{ ...S.availBtn, background: availability === option ? 'rgba(0,212,180,0.16)' : 'transparent', color: availability === option ? '#00d4b4' : '#8fa3c0', borderColor: availability === option ? '#00d4b4' : 'rgba(255,255,255,0.08)' }}>
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const S = {
  panel: { marginTop: 24, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,212,180,0.12)', borderRadius: 20, padding: 18, display: 'flex', flexDirection: 'column', gap: 18 },
  section: { display: 'flex', flexDirection: 'column', gap: 10 },
  sectionTitle: { fontSize: 12, color: '#00d4b4', textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: 700 },
  inputWrap: { display: 'flex', flexDirection: 'column', gap: 8 },
  inputLabel: { fontSize: 11, color: '#8fa3c0' },
  input: { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '12px 14px', color: '#e8f0fe', outline: 'none', fontSize: 13 },
  rangeRow: { display: 'flex', gap: 10, alignItems: 'center' },
  budgetInput: { flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '10px 12px', color: '#e8f0fe', fontSize: 13 },
  rangeDivider: { color: '#8fa3c0', fontSize: 12 },
  budgetButtons: { display: 'flex', flexWrap: 'wrap', gap: 8 },
  budgetBtn: { flex: '1 0 40%', minWidth: 96, borderRadius: 14, border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: '#8fa3c0', padding: '10px 12px', cursor: 'pointer' },
  cityGrid: { display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 },
  cityBtn: { borderRadius: 14, border: '1px solid rgba(255,255,255,0.08)', padding: '10px 12px', cursor: 'pointer', fontSize: 13, fontWeight: 600 },
  availGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 },
  availBtn: { borderRadius: 14, border: '1px solid rgba(255,255,255,0.08)', padding: '10px 12px', cursor: 'pointer', fontSize: 13, fontWeight: 700 },
};
