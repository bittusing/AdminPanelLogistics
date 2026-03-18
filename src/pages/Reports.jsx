import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar,
  TrendingUp,
  Package,
  DollarSign,
  Users,
  MessageSquare,
  Filter,
  Loader2,
  BarChart3,
  PieChart
} from 'lucide-react';
import api from '../config/api';

const Reports = () => {
  const [loading, setLoading] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0]
  });

  const reportTypes = [
    {
      id: 'orders',
      title: 'Orders Report',
      description: 'Detailed report of all orders with status and delivery information',
      icon: Package,
      color: 'blue',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      id: 'revenue',
      title: 'Revenue Report',
      description: 'Financial summary including payments, refunds, and revenue trends',
      icon: DollarSign,
      color: 'green',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      id: 'users',
      title: 'Users Report',
      description: 'User activity, registrations, and KYC status overview',
      icon: Users,
      color: 'purple',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      id: 'support',
      title: 'Support Tickets Report',
      description: 'Support ticket statistics and resolution metrics',
      icon: MessageSquare,
      color: 'orange',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    {
      id: 'performance',
      title: 'Performance Report',
      description: 'Delivery performance, success rates, and partner comparison',
      icon: TrendingUp,
      color: 'indigo',
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600'
    },
    {
      id: 'analytics',
      title: 'Analytics Report',
      description: 'Comprehensive analytics with charts and insights',
      icon: BarChart3,
      color: 'pink',
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600'
    }
  ];

  const handleGenerateReport = async (reportId) => {
    try {
      setLoading(true);
      setSelectedReport(reportId);

      const token = localStorage.getItem('adminToken');
      
      // API call to generate report
      const response = await api.get(`/admin/reports/${reportId}`, {
        params: {
          startDate: dateRange.from,
          endDate: dateRange.to
        },
        responseType: 'blob' // For CSV/PDF download
      });

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      // Determine file extension based on report type
      const extension = reportId === 'analytics' ? 'pdf' : 'csv';
      link.setAttribute('download', `${reportId}-report-${Date.now()}.${extension}`);
      
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      alert('Report downloaded successfully!');
    } catch (error) {
      console.error('Error generating report:', error);
      alert(error.response?.data?.message || 'Failed to generate report');
    } finally {
      setLoading(false);
      setSelectedReport(null);
    }
  };

  const handleQuickReport = (days) => {
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - days);
    
    setDateRange({
      from: from.toISOString().split('T')[0],
      to: to.toISOString().split('T')[0]
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports</h1>
        <p className="text-gray-600">Generate and download various reports for analysis</p>
      </div>

      {/* Date Range Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Date Range</h2>
        </div>
        
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Date
            </label>
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To Date
            </label>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Quick Date Filters */}
          <div className="flex gap-2">
            <button
              onClick={() => handleQuickReport(7)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              Last 7 Days
            </button>
            <button
              onClick={() => handleQuickReport(30)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              Last 30 Days
            </button>
            <button
              onClick={() => handleQuickReport(90)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              Last 90 Days
            </button>
          </div>
        </div>
      </div>

      {/* Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTypes.map((report) => {
          const Icon = report.icon;
          const isGenerating = loading && selectedReport === report.id;

          return (
            <div
              key={report.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              {/* Icon */}
              <div className={`w-12 h-12 ${report.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${report.iconColor}`} />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {report.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {report.description}
              </p>

              {/* Generate Button */}
              <button
                onClick={() => handleGenerateReport(report.id)}
                disabled={loading}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                  isGenerating
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Generate Report
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Info Section */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Report Information</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Reports are generated based on the selected date range</li>
              <li>• Most reports are downloaded as CSV files for easy analysis</li>
              <li>• Analytics report includes charts and is downloaded as PDF</li>
              <li>• Large reports may take a few moments to generate</li>
              <li>• All timestamps are in IST (Indian Standard Time)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Recent Reports Section (Optional - for future enhancement) */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Reports</h2>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-gray-500 text-center py-8">
            No recent reports. Generate a report to see it here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
