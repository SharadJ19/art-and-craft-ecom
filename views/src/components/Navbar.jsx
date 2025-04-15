import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  return (
    <nav className="bg-white shadow-sm py-3">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo + Brand */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
          <span className="text-xl font-bold text-black">ArtCraft</span>
        </Link>
        
        {/* Navigation Links */}
        <div className="flex gap-6">
          <Link to="/" className="text-gray-700 hover:text-black">Home</Link>
          <Link to="/products" className="text-gray-700 hover:text-black">Products</Link>
          {user?.isAdmin && (
            <Link to="/admin" className="text-gray-700 hover:text-black">Admin</Link>
          )}
        </div>
        
        {/* User Section */}
        <div className="flex items-center gap-4">
          <Link to="/cart" className="text-gray-700 hover:text-black">
            Cart ({cartCount})
          </Link>
          
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="text-gray-700 hover:text-black">{user.name}</Link>
              <button 
                onClick={logout}
                className="border border-gray-300 px-3 py-1 rounded hover:bg-gray-50"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="border border-gray-300 px-3 py-1 rounded hover:bg-gray-50">Login</Link>
              <Link to="/register" className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
