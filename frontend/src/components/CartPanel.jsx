import { useCart }    from '../context/CartContext';
import { useAuth }    from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function CartPanel() {
  const { items, removeItem, subtotal, gst, grandTotal, cartOpen, setCartOpen } = useCart();
  const { user }   = useAuth();
  const navigate   = useNavigate();

  if (!cartOpen) return null;

  const handleCheckout = () => {
    setCartOpen(false);
    user ? navigate('/checkout') : navigate('/login');
  };

  return (
    <>
      {/* Dark backdrop */}
      <div onClick={() => setCartOpen(false)} style={S.backdrop} />

      {/* Slide-in panel */}
      <div style={S.panel}>
        <div style={S.header}>
          <h3 style={{ fontFamily: 'Syne,sans-serif', color: '#fff', margin: 0 }}>🛒 Your Cart</h3>
          <button onClick={() => setCartOpen(false)} style={S.closeBtn}>✕</button>
        </div>

        {/* Items list */}
        <div style={S.list}>
          {items.length === 0 ? (
            <p style={{ color: '#8fa3c0', textAlign: 'center', padding: '40px 0', fontSize: 14 }}>
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

        {/* Footer totals */}
        {items.length > 0 && (
          <div style={S.footer}>
            <div style={S.row}><span style={{ color: '#8fa3c0' }}>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
            <div style={S.row}><span style={{ color: '#8fa3c0' }}>GST (18%)</span><span>₹{gst.toLocaleString()}</span></div>
            <div style={{ ...S.row, marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(0,212,180,0.18)' }}>
              <strong style={{ color: '#fff', fontSize: 15 }}>Grand Total</strong>
              <strong style={{ color: '#00d4b4', fontSize: 22, fontFamily: 'Syne,sans-serif' }}>
                ₹{grandTotal.toLocaleString()}
              </strong>
            </div>
            <button style={S.checkoutBtn} onClick={handleCheckout}>
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
    </>
  );
}

const S = {
  backdrop:    { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999 },
  panel:       { position: 'fixed', right: 0, top: 0, width: 360, height: '100vh', background: '#0d1525', borderLeft: '1px solid rgba(0,212,180,0.18)', zIndex: 1000, display: 'flex', flexDirection: 'column' },
  header:      { padding: 20, borderBottom: '1px solid rgba(0,212,180,0.18)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  closeBtn:    { background: 'none', border: 'none', color: '#8fa3c0', fontSize: 20, cursor: 'pointer' },
  list:        { flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 10 },
  item:        { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,212,180,0.15)', borderRadius: 10, padding: 12, display: 'flex', gap: 12 },
  iName:       { fontSize: 13, fontWeight: 600, color: '#e8f0fe', marginBottom: 3 },
  iSub:        { fontSize: 11, color: '#8fa3c0' },
  iPrice:      { fontSize: 15, fontWeight: 700, color: '#00d4b4', fontFamily: 'Syne,sans-serif' },
  removeBtn:   { background: 'none', border: 'none', color: '#8fa3c0', fontSize: 11, cursor: 'pointer', marginTop: 4 },
  footer:      { padding: 18, borderTop: '1px solid rgba(0,212,180,0.18)' },
  row:         { display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 14, color: '#e8f0fe' },
  checkoutBtn: { width: '100%', marginTop: 14, padding: 14, background: 'linear-gradient(135deg,#00d4b4,#00b89c)', color: '#000', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer' },
};
