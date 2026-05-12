import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';

const STATUS_COLOR = { pending: '#f59e0b', paid: '#00d4b4', failed: '#ef4444' };
const STATUS_ICON  = { pending: '⏳', paid: '✅', failed: '❌' };

export default function Orders() {
  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders/my')
      .then(res => setOrders(res.data.orders))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0f1a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8fa3c0', fontSize: 16 }}>
        Loading your orders...
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1a', padding: '60px 20px', color: '#e8f0fe' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 30, fontWeight: 800, color: '#fff' }}>My Orders</h2>
          <Link to="/browse" style={{ color: '#00d4b4', fontSize: 14, textDecoration: 'none' }}>+ New Campaign</Link>
        </div>

        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#8fa3c0' }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>📋</div>
            <div style={{ fontSize: 18, marginBottom: 10 }}>No orders yet</div>
            <Link to="/browse" style={{ color: '#00d4b4', fontSize: 15 }}>Browse media and start your first campaign →</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {orders.map(order => (
              <div key={order._id} style={S.card}>

                {/* Card header */}
                <div style={S.header}>
                  <div>
                    <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, color: '#fff', fontSize: 15 }}>
                      Order #{order._id.slice(-8).toUpperCase()}
                    </div>
                    <div style={{ color: '#8fa3c0', fontSize: 12, marginTop: 4 }}>
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'long', year: 'numeric',
                        hour: '2-digit', minute: '2-digit',
                      })}
                    </div>
                  </div>
                  <div style={{
                    padding: '5px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                    background: `${STATUS_COLOR[order.status]}20`,
                    color: STATUS_COLOR[order.status],
                    border: `1px solid ${STATUS_COLOR[order.status]}40`,
                  }}>
                    {STATUS_ICON[order.status]} {order.status.toUpperCase()}
                  </div>
                </div>

                {/* Items */}
                <div style={{ marginBottom: 16 }}>
                  {order.items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, paddingBottom: 10, borderBottom: i < order.items.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#e8f0fe' }}>{item.name}</div>
                        <div style={{ fontSize: 11, color: '#8fa3c0', marginTop: 2 }}>{item.type} · {item.vendor} · {item.city}</div>
                      </div>
                      <span style={{ color: '#00d4b4', fontWeight: 600, fontFamily: 'Syne,sans-serif', fontSize: 14 }}>
                        ₹{item.price.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div style={{ background: 'rgba(0,212,180,0.04)', borderRadius: 10, padding: '14px 16px' }}>
                  <div style={S.totRow}><span>Subtotal</span><span>₹{order.subtotal.toLocaleString()}</span></div>
                  <div style={S.totRow}><span>GST (18%)</span><span>₹{order.gst.toLocaleString()}</span></div>
                  <div style={{ ...S.totRow, marginTop: 8, paddingTop: 8, borderTop: '1px solid rgba(0,212,180,0.18)' }}>
                    <strong style={{ color: '#fff', fontSize: 15 }}>Grand Total</strong>
                    <strong style={{ color: '#00d4b4', fontFamily: 'Syne,sans-serif', fontSize: 22 }}>
                      ₹{order.grandTotal.toLocaleString()}
                    </strong>
                  </div>
                </div>

                {order.paymentId && (
                  <div style={{ marginTop: 10, fontSize: 11, color: '#8fa3c0' }}>
                    Payment ID: {order.paymentId}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const S = {
  card:   { background: '#0d1525', border: '1px solid rgba(0,212,180,0.18)', borderRadius: 16, padding: 24 },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, paddingBottom: 18, borderBottom: '1px solid rgba(0,212,180,0.18)' },
  totRow: { display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#8fa3c0', marginBottom: 5 },
};
