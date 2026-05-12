// InteractiveMap.jsx
// Right panel — React Leaflet map with dynamic markers and add-to-cart popup
import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

const CITY_CENTERS = {
  Hyderabad: [17.385, 78.4867],
  Mumbai: [19.076, 72.8777],
  Delhi: [28.6139, 77.2090],
  Bangalore: [12.9716, 77.5946],
  Chennai: [13.0827, 80.2707],
  default: [20.5937, 78.9629],
};

function MapUpdater({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function InteractiveMap({ listings = [], categoryColor, hoveredListing, cityFilter, onAddToCart }) {
  const center = CITY_CENTERS[cityFilter] || CITY_CENTERS.default;
  const zoom = cityFilter ? 11 : 5;

  useEffect(() => {
    window.qmediaAddToCart = onAddToCart || (() => {});
    return () => {
      window.qmediaAddToCart = undefined;
    };
  }, [onAddToCart]);

  const activeListings = useMemo(() => listings.filter(item => item?.lat && item?.lng), [listings]);

  const createIcon = (item) => {
    const color = item.availability ? (categoryColor || '#00d4b4') : '#ef4444';
    const hovered = hoveredListing?.id === item.id;
    return new L.DivIcon({
      className: 'qmedia-map-marker',
      html: `<div style="background:${color};color:#000;font-size:${hovered ? '12px':'10px'};font-weight:700;padding:${hovered ? '6px 12px':'4px 9px'};border-radius:10px;white-space:nowrap;box-shadow:0 12px 24px ${color}55;border:${hovered ? '2px solid #fff':'none'};transform:${hovered ? 'scale(1.05)':'scale(1)'};transition:all 0.15s;">${item.adType}</div>`,
      iconAnchor: [20, 10],
    });
  };

  return (
    <div style={S.wrap}>
      <div style={S.legend}>
        <div style={S.legendItem}><span style={{ ...S.dot, background: categoryColor || '#00d4b4' }} />Available</div>
        <div style={S.legendItem}><span style={{ ...S.dot, background: '#ef4444' }} />Sold Out</div>
        <div style={S.legendCount}>{activeListings.length} locations</div>
      </div>
      <MapContainer center={center} zoom={zoom} scrollWheelZoom style={S.map}>
        <MapUpdater center={center} zoom={zoom} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap" />
        {activeListings.map(item => (
          <Marker key={item.id} position={[item.lat, item.lng]} icon={createIcon(item)}>
            <Popup>
              <div style={S.popup}>
                <div style={S.popupBanner} />
                <div style={S.popupType}>{item.adType}</div>
                <div style={S.popupTitle}>{item.title}</div>
                <div style={S.popupMeta}>📍 {item.location} · {item.area}</div>
                <div style={S.popupPrice}>₹{item.minSpend.toLocaleString()}</div>
                <button
                  type="button"
                  onClick={() => item.availability && onAddToCart(item)}
                  disabled={!item.availability}
                  style={{ ...S.popupButton, opacity: item.availability ? 1 : 0.4, cursor: item.availability ? 'pointer' : 'not-allowed' }}
                >
                  {item.availability ? 'Add to Cart' : 'Unavailable'}
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

const S = {
  wrap: { width: 360, minWidth: 320, minHeight: 680, display: 'flex', flexDirection: 'column', background: '#0d1525', borderLeft: '1px solid rgba(0,212,180,0.12)', flexShrink: 0, borderRadius: '24px 0 0 24px', overflow: 'hidden' },
  legend: { padding: '16px 18px', borderBottom: '1px solid rgba(0,212,180,0.1)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 },
  legendItem: { display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#8fa3c0' },
  dot: { width: 8, height: 8, borderRadius: '50%' },
  legendCount: { marginLeft: 'auto', fontSize: 11, color: '#4a6080' },
  map: { flex: 1, height: '100%', minHeight: 560, width: '100%' },
  popup: { minWidth: 220, display: 'flex', flexDirection: 'column', gap: 10, fontFamily: 'sans-serif', color: '#111827' },
  popupBanner: { height: 100, borderRadius: 16, background: 'linear-gradient(135deg, rgba(0,212,180,0.25), rgba(15,23,42,0.95))' },
  popupType: { fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.8, color: '#64748b' },
  popupTitle: { fontSize: 14, fontWeight: 700, color: '#0f172a' },
  popupMeta: { fontSize: 11, color: '#475569' },
  popupPrice: { fontSize: 15, fontWeight: 700, color: '#0f766e' },
  popupButton: { border: 'none', borderRadius: 12, padding: '10px 12px', fontWeight: 700, color: '#000', background: '#00d4b4' },
};
