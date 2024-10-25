import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';
import { ArrowUp, ArrowDown } from 'lucide-react';

const Analytics: React.FC = () => {
  const dealValueData = [
    { name: 'Jan', value: 400, prospects: 50, dueDiligence: 20, closed: 5 },
    { name: 'Feb', value: 300, prospects: 45, dueDiligence: 25, closed: 8 },
    { name: 'Mar', value: 600, prospects: 60, dueDiligence: 30, closed: 12 },
    { name: 'Apr', value: 800, prospects: 75, dueDiligence: 35, closed: 15 },
    { name: 'May', value: 500, prospects: 65, dueDiligence: 28, closed: 10 },
    { name: 'Jun', value: 700, prospects: 70, dueDiligence: 32, closed: 14 },
  ];

  const vdrMetrics = [
    { name: 'Financial', uploads: 145, views: 289, downloads: 78 },
    { name: 'Legal', uploads: 89, views: 167, downloads: 45 },
    { name: 'Operations', uploads: 123, views: 234, downloads: 56 },
    { name: 'HR', uploads: 67, views: 145, downloads: 34 },
    { name: 'Tech', uploads: 178, views: 345, downloads: 89 },
  ];

  const dealStageData = [
    { name: 'Prospecting', value: 35 },
    { name: 'Due Diligence', value: 25 },
    { name: 'Negotiation', value: 20 },
    { name: 'Closing', value: 15 },
    { name: 'Post-Merger', value: 5 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
      
      {/* Deal Pipeline Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Deal Pipeline</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dealValueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="prospects" stackId="1" stroke="#8884d8" fill="#8884d8" />
              <Area type="monotone" dataKey="dueDiligence" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
              <Area type="monotone" dataKey="closed" stackId="1" stroke="#ffc658" fill="#ffc658" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Deal Stages Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dealStageData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {dealStageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">VDR Activity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vdrMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="uploads" fill="#8884d8" />
              <Bar dataKey="downloads" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Prospecting Success Rate"
          value="32%"
          change="+5%"
          isPositive={true}
        />
        <MetricCard
          title="Due Diligence Completion"
          value="85%"
          change="+12%"
          isPositive={true}
        />
        <MetricCard
          title="Average Deal Cycle"
          value="45 days"
          change="-8%"
          isPositive={true}
        />
        <MetricCard
          title="Post-Merger Success"
          value="92%"
          change="+3%"
          isPositive={true}
        />
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Deal Value Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dealValueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Activity Summary</h2>
          <div className="space-y-4">
            <ActivityRow
              label="New Prospects"
              value="45"
              change="+12%"
              isPositive={true}
            />
            <ActivityRow
              label="Active Due Diligence"
              value="28"
              change="+5%"
              isPositive={true}
            />
            <ActivityRow
              label="VDR Documents"
              value="1,234"
              change="+25%"
              isPositive={true}
            />
            <ActivityRow
              label="Completed Mergers"
              value="8"
              change="+2"
              isPositive={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard: React.FC<{
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}> = ({ title, value, change, isPositive }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <div className="mt-2 flex items-baseline">
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
      <p className={`ml-2 flex items-baseline text-sm font-semibold ${
        isPositive ? 'text-green-600' : 'text-red-600'
      }`}>
        {isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
        <span className="ml-1">{change}</span>
      </p>
    </div>
  </div>
);

const ActivityRow: React.FC<{
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}> = ({ label, value, change, isPositive }) => (
  <div className="flex items-center justify-between">
    <span className="text-gray-600">{label}</span>
    <div className="flex items-center">
      <span className="font-semibold">{value}</span>
      <span className={`ml-2 flex items-center ${
        isPositive ? 'text-green-600' : 'text-red-600'
      }`}>
        {isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
        {change}
      </span>
    </div>
  </div>
);

export default Analytics;