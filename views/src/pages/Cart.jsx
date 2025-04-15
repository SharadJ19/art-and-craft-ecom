import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { 
    cartItems, 
    cartTotal, 
    cartCount,
    removeFromCart, 
    updateQuantity,
    clearCart 
  } = useCart();

  if (cartCount === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-4">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="btn btn-primary inline-block">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart ({cartCount} items)</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Product</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                  <th className="px-4 py-2 text-left">Total</th>
                  <th className="px-4 py-2 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <img 
                          src={item.image_url || '/images/default-product.png'} 
                          alt={item.name}
                          className="w-16 h-16 object-cover mr-4"
                        />
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">${(Number(item.price) || 0).toFixed(2)}</td>
                    <td className="px-4 py-4">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        className="input w-20"
                      />
                    </td>
                    <td className="px-4 py-4">${(Number(item.price) * item.quantity || 0).toFixed(2)}</td>
                    <td className="px-4 py-4">
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-between mt-6">
            <button 
              onClick={clearCart}
              className="btn btn-outline"
            >
              Clear Cart
            </button>
            <Link to="/products" className="btn btn-outline">Continue Shopping</Link>
          </div>
        </div>
        
        <div className="md:w-1/3">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-3 font-bold">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <Link 
              to="/checkout" 
              className="btn btn-primary w-full"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;