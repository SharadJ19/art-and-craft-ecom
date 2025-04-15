import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Profile = () => {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await api.get('/orders/myorders');
        setOrders(ordersData);
      } catch (err) {
        console.error('Order fetch error:', err);
        if (err.response?.status === 401) {
          logout();
        }
        setError(err.message || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user, logout]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">User Profile</h2>

      {user && (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <p className="mb-2"><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-xl font-bold mb-4">My Orders</h3>
        {loading ? (
          <p>Loading orders...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <strong>Order #{order.id}</strong>
                    <span className="ml-4 px-3 py-1 bg-gray-100 rounded-full text-sm">
                      {order.status}
                    </span>
                  </div>
                  <span className="font-bold">${order.total}</span>
                </div>
                <ul className="border-t border-gray-200 pt-3">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex justify-between py-2">
                      <span>
                        {item.product.name} - Qty: {item.quantity}
                      </span>
                      <span>${item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;