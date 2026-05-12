import { useState }           from 'react';
import { Link, useNavigate }  from 'react-router-dom';
import { useAuth }            from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate     = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', company: '' });
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form.name, form.email, form.password, form.phone, form.company);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={S.page}>
      <div style={S.card}>
        <div style={S.logoBox}>Q</div>
        <h2 style={S.title}>Create Account</h2>
        <p style={S.sub}>Start planning your ad campaigns today</p>

        {error && <div style={S.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={S.form}>
          <input style={S.input} placeholder="Full Name"              value={form.name}     onChange={set('name')}     required />
          <input style={S.input} type="email" placeholder="Email"     value={form.email}    onChange={set('email')}    required />
          <input style={S.input} type="password" placeholder="Password (min 6 characters)" value={form.password} onChange={set('password')} required />
          <input style={S.input} placeholder="Phone Number (optional)" value={form.phone}   onChange={set('phone')} />
          <input style={S.input} placeholder="Company Name (optional)" value={form.company} onChange={set('company')} />
          <button style={S.btn} type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account →'}
          </button>
        </form>

        <p style={S.switch}>
          Already have an account?{' '}
          <Link to="/login" style={S.switchLink}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}

const S = {
  page:       { minHeight: '100vh', background: '#0a0f1a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 },
  card:       { background: '#0d1525', border: '1px solid rgba(0,212,180,0.2)', borderRadius: 20, padding: 44, width: '100%', maxWidth: 460, textAlign: 'center' },
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
