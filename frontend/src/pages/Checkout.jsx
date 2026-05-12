import { useState }    from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart }     from '../context/CartContext';
import { useAuth }     from '../context/AuthContext';
import api             from '../api/api';

export default function Checkout() {
  const { items, subtotal, gst, grandTotal, clearCart } = useCart();
  const { user }    = useAuth();
  const navigate    = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error,   setError]   = useState('');

  const placeOrder = async () => {
    setLoading(true);
    setError('');
    try {
      await api.post('/orders/place');
      await clearCart();
      setSuccess(true);
      setTimeout(() => navigate('/orders'), 2500);
    } catch (err) {
      setError(err.response?.data?.message || 'Order failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0f1a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <div style={{ fontSize: 72 }}>✅</div>
        <h2 style={{ fontFamily: 'Syne,sans-serif', color: '#00d4b4', fontSize: 30 }}>Order Placed Successfully!</h2>
        <p style={{ color: '#8fa3c0', fontSize: 15 }}>Redirecting to your orders...</p>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0f1a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <div style={{ fontSize: 48 }}>🛒</div>
        <h2 style={{ fontFamily: 'Syne,sans-serif', color: '#fff' }}>Your cart is empty</h2>
        <a href="/browse" style={{ color: '#00d4b4', fontSize: 15 }}>Browse media →</a>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1a', padding: '60px 20px', color: '#e8f0fe' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 30, fontWeight: 800, color: '#fff' }}>Checkout</h2>

        {error && <div style={{ background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.3)', borderRadius: 8, padding: '12px 16px', color: '#ff6b6b', fontSize: 13 }}>{error}</div>}

        {/* Order summary */}
        <div style={S.card}>
          <h3 style={S.cardTitle}>📋 Order Summary ({items.length} items)</h3>
          {items.map(item => (
            <div key={item.mediaId} style={S.itemRow}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#e8f0fe' }}>{item.name}</div>
                <div style={{ fontSize: 12, color: '#8fa3c0', marginTop: 3 }}>{item.type} · {item.vendor} · {item.city}</div>
              </div>
              <strong style={{ color: '#00d4b4', fontFamily: 'Syne,sans-serif', fontSize: 15 }}>
                ₹{item.price.toLocaleString()}
              </strong>
            </div>
          ))}
          <div style={{ borderTop: '1px solid rgba(0,212,180,0.18)', marginTop: 16, paddingTop: 16 }}>
            <div style={S.totRow}><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
            <div style={S.totRow}><span>GST (18%)</span><span>₹{gst.toLocaleString()}</span></div>
            <div style={{ ...S.totRow, marginTop: 10, fontSize: 18 }}>
              <strong style={{ color: '#fff' }}>Grand Total</strong>
              <strong style={{ color: '#00d4b4', fontFamily: 'Syne,sans-serif', fontSize: 24 }}>₹{grandTotal.toLocaleString()}</strong>
            </div>
          </div>
        </div>

        {/* Billing details */}
        <div style={S.card}>
          <h3 style={S.cardTitle}>👤 Billing Details</h3>
          {[['Name', user.name], ['Email', user.email], user.phone && ['Phone', user.phone], user.company && ['Company', user.company]].filter(Boolean).map(([k, v]) => (
            <div key={k} style={{ display: 'flex', gap: 20, marginBottom: 10, fontSize: 14 }}>
              <span style={{ color: '#8fa3c0', minWidth: 80 }}>{k}</span>
              <span style={{ color: '#e8f0fe' }}>{v}</span>
            </div>
          ))}
        </div>

        {/* Payment note */}
        <div style={{ background: 'rgba(0,212,180,0.06)', border: '1px solid rgba(0,212,180,0.2)', borderRadius: 12, padding: 18, fontSize: 13, color: '#8fa3c0', lineHeight: 1.8 }}>
          💳 <strong style={{ color: '#00d4b4' }}>Razorpay / Stripe payment</strong> will be integrated here when you're ready.
          Clicking below places the order as <strong style={{ color: '#f59e0b' }}>pending</strong> in MongoDB.
          Once you add a payment gateway, update the status to <strong style={{ color: '#00d4b4' }}>paid</strong> after successful payment.
        </div>

        {/* Place order button */}
        <button onClick={placeOrder} disabled={loading} style={{
          padding: 18, background: 'linear-gradient(135deg,#00d4b4,#00b89c)',
          color: '#000', border: 'none', borderRadius: 12,
          fontSize: 17, fontWeight: 800, cursor: 'pointer',
          boxShadow: '0 4px 24px rgba(0,212,180,0.35)', fontFamily: 'DM Sans,sans-serif',
          opacity: loading ? 0.7 : 1,
        }}>
          {loading ? 'Placing Order...' : `✅ Confirm & Place Order — ₹${grandTotal.toLocaleString()}`}
        </button>
      </div>
    </div>
  );
}

const S = {
  card:     { background: '#0d1525', border: '1px solid rgba(0,212,180,0.18)', borderRadius: 16, padding: 24 },
  cardTitle:{ fontFamily: 'Syne,sans-serif', fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 18 },
  itemRow:  { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid rgba(255,255,255,0.04)' },
  totRow:   { display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#8fa3c0', marginBottom: 6 },
};
