import { useState }           from 'react';
import { Link, useNavigate }  from 'react-router-dom';
import { useAuth }            from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate  = useNavigate();
  const [form,    setForm]    = useState({ email: '', password: '' });
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={S.page}>
      <div style={S.card}>
        <div style={S.logoBox}>Q</div>
        <h2 style={S.title}>Welcome back</h2>
        <p style={S.sub}>Sign in to your QMedia account</p>

        {error && <div style={S.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={S.form}>
          <input
            style={S.input} type="email" placeholder="Email address"
            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required
          />
          <input
            style={S.input} type="password" placeholder="Password"
            value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required
          />
          <button style={S.btn} type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>

        <p style={S.switch}>
          Don't have an account?{' '}
          <Link to="/register" style={S.switchLink}>Create one</Link>
        </p>
      </div>
    </div>
  );
}

const S = {
  page:       { minHeight: '100vh', background: '#0a0f1a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 },
  card:       { background: '#0d1525', border: '1px solid rgba(0,212,180,0.2)', borderRadius: 20, padding: 44, width: '100%', maxWidth: 420, textAlign: 'center' },
  logoBox:    { width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(135deg,#00d4b4,#006655)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 26, color: '#fff', margin: '0 auto 22px' },
  title:      { fontFamily: 'Syne,sans-serif', fontSize: 26, fontWeight: 800, color: '#fff', marginBottom: 6 },
  sub:        { color: '#8fa3c0', fontSize: 14, marginBottom: 28 },
  error:      { background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.3)', borderRadius: 8, padding: '10px 14px', color: '#ff6b6b', fontSize: 13, marginBottom: 16, textAlign: 'left' },
  form:       { display: 'flex', flexDirection: 'column', gap: 14 },
  input:      { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(0,212,180,0.2)', borderRadius: 10, padding: '13px 16px', color: '#e8f0fe', fontSize: 14, outline: 'none', fontFamily: 'DM Sans,sans-serif' },
  btn:        { background: 'linear-gradient(135deg,#00d4b4,#00b89c)', color: '#000', border: 'none', borderRadius: 10, padding: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'DM Sans,sans-serif', marginTop: 4 },
  switch:     { marginTop: 22, fontSize: 13, color: '#8fa3c0' },
  switchLink: { color: '#00d4b4', textDecoration: 'none', fontWeight: 600 },
};
