import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar          from './components/Navbar';
import CartDrawer      from './components/CartDrawer';
import ProtectedRoute  from './components/ProtectedRoute';
import Home     from './pages/Home';
import Login    from './pages/Login';
import Register from './pages/Register';
import Browse   from './pages/Browse';
import Checkout from './pages/Checkout';
import Orders   from './pages/Orders';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <Routes>
            <Route path="/"         element={<Home />} />
            <Route path="/login"    element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/browse"   element={<Browse />} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/orders"   element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
