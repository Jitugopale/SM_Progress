import React, { useEffect, useState } from 'react';
import {
  Users, Package, Settings, FileText, UserCheck, Phone,
  TrendingUp, Activity, BarChart3, ArrowUp, ArrowDown
} from 'lucide-react';

const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    totalClients: 0,
    totalProducts: 0,
    totalServices: 0,
    totalRequests: 0,
    totalStaff: 0,
    totalCallMaster: 0,
  });

  const [loading, setLoading] = useState(true);

  const cardData = [
    { 
      key: 'totalClients', 
      label: 'Total Clients', 
      icon: Users, 
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      change: '+12.5%',
      isPositive: true
    },
    { 
      key: 'totalProducts', 
      label: 'Total Products', 
      icon: Package, 
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      change: '+8.3%',
      isPositive: true
    },
    { 
      key: 'totalServices', 
      label: 'Total Services', 
      icon: Settings, 
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      change: '+15.7%',
      isPositive: true
    },
    { 
      key: 'totalRequests', 
      label: 'Total Requests', 
      icon: FileText, 
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      change: '-3.2%',
      isPositive: false
    },
    { 
      key: 'totalStaff', 
      label: 'Total Staff', 
      icon: UserCheck, 
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      change: '+5.1%',
      isPositive: true
    },
    { 
      key: 'totalCallMaster', 
      label: 'Call Center Staff', 
      icon: Phone, 
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-50',
      textColor: 'text-cyan-600',
      change: '+2.8%',
      isPositive: true
    },
  ];

  // Simulate API fetch
  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setCounts({
          totalClients: 145,
          totalProducts: 89,
          totalServices: 32,
          totalRequests: 67,
          totalStaff: 28,
          totalCallMaster: 12,
        });
        setLoading(false);
      }, 1500);
    };

    fetchCounts();
  }, []);

  // Custom Chart Components
  const SimpleBarChart = ({ data, title }) => {
    const maxValue = Math.max(...data.map(item => item.value));
    
    return (
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600">Comparative overview</p>
          </div>
        </div>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-16 text-xs text-gray-600 font-medium">{item.name}</div>
              <div className="flex-1 bg-gray-200 rounded-full h-3 relative overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                />
              </div>
              <div className="w-8 text-xs text-gray-700 font-semibold">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const SimplePieChart = ({ data, title }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];
    
    return (
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <Activity className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600">Distribution breakdown</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 mb-4">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              {data.map((item, index) => {
                const percentage = (item.value / total) * 100;
                const strokeDasharray = `${percentage * 3.14159} ${314.159 - percentage * 3.14159}`;
                const strokeDashoffset = data.slice(0, index).reduce((acc, prev) => acc - (prev.value / total) * 314.159, 0);
                
                return (
                  <circle
                    key={index}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={colors[index]}
                    strokeWidth="8"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-500"
                  />
                );
              })}
            </svg>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full">
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors[index] }}
                />
                <span className="text-xs text-gray-600">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const SimpleLineChart = ({ data, title }) => {
    const maxValue = Math.max(...data.map(item => item.value));
    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * 280;
      const y = 120 - (item.value / maxValue) * 100;
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600">Growth trends</p>
          </div>
        </div>
        <div className="relative">
          <svg className="w-full h-32" viewBox="0 0 300 140">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
            <polyline
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
              className="animate-pulse"
            />
            {data.map((item, index) => {
              const x = (index / (data.length - 1)) * 280;
              const y = 120 - (item.value / maxValue) * 100;
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#8B5CF6"
                  className="hover:r-6 transition-all cursor-pointer"
                />
              );
            })}
          </svg>
        </div>
      </div>
    );
  };

  const chartData = [
    { name: 'Clients', value: counts.totalClients || 0 },
    { name: 'Products', value: counts.totalProducts || 0 },
    { name: 'Services', value: counts.totalServices || 0 },
    { name: 'Requests', value: counts.totalRequests || 0 },
    { name: 'Staff', value: counts.totalStaff || 0 },
    { name: 'Call Staff', value: counts.totalCallMaster || 0 },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6 min-h-screen">
      <div className="max-w-full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            {/* <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <BarChart3 className="w-8 h-8 text-white" />
            </div> */}
            <div>
              <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {cardData.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.key}
                className="group relative overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${card.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`w-6 h-6 ${card.textColor}`} />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-800">
                        {counts[card.key].toLocaleString()}
                      </div>
                      <div className={`flex items-center gap-1 text-sm ${card.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {card.isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                        <span>{card.change}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">{card.label}</h3>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${card.color} transition-all duration-1000 ease-out`}
                        style={{ width: `${Math.min((counts[card.key] / 200) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${card.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <SimpleBarChart data={chartData} title="Overview" />
          <SimplePieChart data={chartData} title="Distribution" />
          <SimpleLineChart data={chartData} title="Trends" />
        </div>

        {/* Summary Stats */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">{counts.totalClients + counts.totalProducts}</div>
              <div className="text-sm text-blue-700">Total Assets</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl">
              <div className="text-2xl font-bold text-emerald-600">{counts.totalStaff + counts.totalCallMaster}</div>
              <div className="text-sm text-emerald-700">Total Team</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl">
              <div className="text-2xl font-bold text-amber-600">{counts.totalRequests}</div>
              <div className="text-sm text-amber-700">Pending Requests</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <div className="text-2xl font-bold text-purple-600">98.5%</div>
              <div className="text-sm text-purple-700">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;