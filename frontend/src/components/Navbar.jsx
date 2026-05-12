import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout }       = useAuth();
  const { items, setCartOpen } = useCart();
  const navigate               = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav style={S.nav}>
      {/* Logo */}
      <Link to="/" style={S.logo}>
        <div style={S.logoIcon}>Q</div>
        <span style={S.logoText}>Qmedia</span>
      </Link>

      {/* Nav links */}
      <div style={S.links}>
        <Link to="/" style={S.link}>Services</Link>
        <Link to="/" style={S.link}>About</Link>
        <Link to="/" style={S.link}>Contact Us</Link>
      </div>

      {/* Right side */}
      <div style={S.right}>
        {/* Cart button */}
        <button style={S.cartBtn} onClick={() => setCartOpen(v => !v)}>
          🛒 Cart
          {items.length > 0 && <span style={S.badge}>{items.length}</span>}
        </button>

        {user ? (
          <>
            <Link to="/orders" style={S.link}>My Orders</Link>
            <span style={{ color: '#8fa3c0', fontSize: 13 }}>
              Hi, {user.name.split(' ')[0]} 👋
            </span>
            <button style={S.loginBtn} onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login"    style={S.loginBtn}>Login</Link>
            <Link to="/register" style={S.signupBtn}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const S = {
  nav:      { position: 'sticky', top: 0, zIndex: 1000, background: 'rgba(10,15,26,0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(0,212,180,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', height: 60 },
  logo:     { display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' },
  logoIcon: { width: 34, height: 34, borderRadius: 8, background: 'linear-gradient(135deg,#00d4b4,#006655)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 18, color: '#fff', fontFamily: 'Syne, sans-serif' },
  logoText: { fontWeight: 700, fontSize: 20, color: '#00d4b4', fontFamily: 'Syne, sans-serif' },
  links:    { display: 'flex', gap: 28 },
  link:     { color: '#8fa3c0', textDecoration: 'none', fontSize: 14, fontWeight: 500 },
  right:    { display: 'flex', alignItems: 'center', gap: 12 },
  cartBtn:  { position: 'relative', background: 'rgba(0,212,180,0.15)', border: '1px solid rgba(0,212,180,0.3)', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', color: '#00d4b4', fontSize: 14, fontWeight: 500 },
  badge:    { position: 'absolute', top: -6, right: -6, background: '#00d4b4', color: '#000', fontSize: 10, fontWeight: 700, width: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  loginBtn: { border: '1.5px solid rgba(0,212,180,0.3)', color: '#00d4b4', background: 'transparent', padding: '7px 18px', borderRadius: 20, fontSize: 13, fontWeight: 500, cursor: 'pointer', textDecoration: 'none' },
  signupBtn:{ background: 'linear-gradient(135deg,#00d4b4,#00b89c)', color: '#000', border: 'none', padding: '7px 18px', borderRadius: 20, fontSize: 13, fontWeight: 700, cursor: 'pointer', textDecoration: 'none' },
};
