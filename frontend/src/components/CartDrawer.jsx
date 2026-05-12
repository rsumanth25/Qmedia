import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { items, removeItem, subtotal, gst, grandTotal, cartOpen, setCartOpen } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!cartOpen) return null;

  const handleCheckout = () => {
    setCartOpen(false);
    user ? navigate('/checkout') : navigate('/login');
  };

  return (
    <>
      <div onClick={() => setCartOpen(false)} style={S.backdrop} />
      <div style={S.panel}>
        <div style={S.header}>
          <h3 style={{ fontFamily: 'Syne,sans-serif', color: '#fff', margin: 0 }}>🛒 Your Cart</h3>
          <button onClick={() => setCartOpen(false)} style={S.closeBtn}>✕</button>
        </div>
        <div style={S.list}>
          {items.length === 0 ? (
            <p style={S.emptyText}>
              Your cart is empty.<br />Browse media and add items.
            </p>
          ) : items.map(item => (
            <div key={item.mediaId} style={S.item}>
              <div style={{ flex: 1 }}>
                <div style={S.iName}>{item.name}</div>
                <div style={S.iSub}>{item.type} · {item.vendor} · {item.city}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={S.iPrice}>₹{item.price.toLocaleString()}</div>
                <button onClick={() => removeItem(item.mediaId)} style={S.removeBtn}>✕ Remove</button>
              </div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div style={S.footer}>
            <div style={S.row}><span style={S.footerLabel}>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
            <div style={S.row}><span style={S.footerLabel}>GST (18%)</span><span>₹{gst.toLocaleString()}</span></div>
            <div style={{ ...S.row, marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(0,212,180,0.18)' }}>
              <strong style={S.footerTotalLabel}>Grand Total</strong>
              <strong style={S.footerTotalValue}>₹{grandTotal.toLocaleString()}</strong>
            </div>
            <button style={S.checkoutBtn} onClick={handleCheckout}>Proceed to Checkout →</button>
          </div>
        )}
      </div>
    </>
  );
}

const S = {
  backdrop: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 999 },
  panel: {
    position: 'fixed', right: 0, top: 0, width: 360, height: '100vh', background: '#0d1525', borderLeft: '1px solid rgba(0,212,180,0.18)', zIndex: 1000,
    display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '-12px 0 40px rgba(0,0,0,0.4)',
  },
  header: { padding: 20, borderBottom: '1px solid rgba(0,212,180,0.18)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  closeBtn: { background: 'none', border: 'none', color: '#8fa3c0', fontSize: 20, cursor: 'pointer' },
  list: { flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 },
  item: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,212,180,0.15)', borderRadius: 12, padding: 14, display: 'flex', gap: 12 },
  iName: { fontSize: 13, fontWeight: 600, color: '#e8f0fe', marginBottom: 4 },
  iSub: { fontSize: 11, color: '#8fa3c0' },
  iPrice: { fontSize: 15, fontWeight: 700, color: '#00d4b4', fontFamily: 'Syne,sans-serif' },
  removeBtn: { background: 'none', border: 'none', color: '#8fa3c0', fontSize: 11, cursor: 'pointer', marginTop: 6 },
  emptyText: { color: '#8fa3c0', textAlign: 'center', padding: '40px 0', fontSize: 14, lineHeight: 1.6 },
  footer: { padding: 18, borderTop: '1px solid rgba(0,212,180,0.18)' },
  row: { display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14, color: '#e8f0fe' },
  footerLabel: { color: '#8fa3c0' },
  footerTotalLabel: { color: '#fff', fontSize: 15 },
  footerTotalValue: { color: '#00d4b4', fontSize: 22, fontFamily: 'Syne,sans-serif' },
  checkoutBtn: { width: '100%', marginTop: 14, padding: 14, background: 'linear-gradient(135deg,#00d4b4,#00b89c)', color: '#000', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer' },
};
