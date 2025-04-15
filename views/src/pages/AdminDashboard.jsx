import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    recentOrders: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/admin/stats');
        setStats(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    };

    if (user?.isAdmin) {
      fetchStats();
    }
  }, [user]);

  if (!user || !user.isAdmin) {
    return (
      <div>
        <h1>Access Denied</h1>
        <p>You don't have permission to access this page.</p>
      </div>
    );
  }

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <div>
        <div>
          <h3>Total Products</h3>
          <p>{stats.totalProducts}</p>
        </div>

        <div>
          <h3>Total Orders</h3>
          <p>{stats.totalOrders}</p>
        </div>

        <div>
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
      </div>

      <div>
        <h2>Recent Orders</h2>

        {stats.recentOrders.length === 0 ? (
          <div>No recent orders</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.user.name}</td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                  <td>${order.total.toFixed(2)}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={async (e) => {
                        try {
                          await api.put(`/admin/orders/${order.id}`, { status: e.target.value });
                          setStats(prev => ({
                            ...prev,
                            recentOrders: prev.recentOrders.map(o =>
                              o.id === order.id ? { ...o, status: e.target.value } : o
                            )
                          }));
                        } catch (err) {
                          console.error('Failed to update order status:', err);
                        }
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;