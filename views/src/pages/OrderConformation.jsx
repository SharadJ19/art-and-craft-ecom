import { useState, useEffect } from 'react';
import { useNavigate, useParams,Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const OrderConfirmation = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await api.get(`/orders/${id}`);
        // Convert total to number if it's a string
        if (orderData && typeof orderData.total === 'string') {
          orderData.total = parseFloat(orderData.total);
        }
        setOrder(orderData);
      } catch (error) {
        console.error('Failed to fetch order:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, navigate]);

  if (loading) return <div>Loading...</div>;
  if (!order) return <div>Order not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Order Confirmation</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Thank you for your order!</h2>
        <p className="mb-2">Order ID: {order.id}</p>
        <p className="mb-2">Total: ${order.total?.toFixed(2)}</p>
        <p className="mb-4">Status: {order.status}</p>
        <Link to="/products" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;