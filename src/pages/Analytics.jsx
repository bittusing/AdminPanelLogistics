import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Package, DollarSign } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../config/api';

const Analytics = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('30days');

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const [revenueRes, ordersRes, customersRes] = await Promise.all([
        api.get(`/admin/analytics/revenue?period=${period}`),
        api.get(`/admin/analytics/orders?period=${period}`),
        api.get('/admin/customers/top?limit=5')
      ]);

      setRevenueData(revenueRes.data.data.revenue);
      setOrderData(ordersRes.data.data.ordersByDay);
      setTopCustomers(customersRes.data.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Detailed insights and trends</p>
        </div>
        
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="90days">Last 90 Days</option>
        </select>
      </div>

      {/* Revenue & Profit Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Revenue & Profit Trend</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} name="Revenue (₹)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Orders Trend */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Orders Trend</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={orderData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id.date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#10B981" name="Orders" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Customers */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Top Customers</h2>
        <div className="space-y-4">
          {topCustomers.map((customer, index) => (
            <div key={customer._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">{index + 1}</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{customer.name}</div>
                  <div className="text-sm text-gray-500">{customer.email}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900">₹{customer.totalSpent.toLocaleString()}</div>
                <div className="text-sm text-gray-500">{customer.totalOrders} orders</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
