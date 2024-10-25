import React from 'react';
import { Link } from '@tanstack/react-router';
import { BarChart3, Briefcase, FileText, TrendingUp, Users, Database, GitMerge, AlertCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const recentDeals = [
    { id: 1, name: 'Tech Innovators Acquisition', type: 'Acquisition', status: 'Due Diligence', value: '$50M' },
    { id: 2, name: 'Global Solutions Merger', type: 'Merger', status: 'Prospecting', value: '$120M' },
    { id: 3, name: 'AI Dynamics Partnership', type: 'Partnership', status: 'Post-Merger', value: '$75M' },
  ];

  const vdrActivity = [
    { id: 1, user: 'John Smith', document: 'Financial Statements 2023', action: 'Downloaded', time: '2 hours ago' },
    { id: 2, user: 'Sarah Johnson', document: 'Legal Agreements', action: 'Uploaded', time: '4 hours ago' },
    { id: 3, user: 'Mike Wilson', document: 'Due Diligence Report', action: 'Viewed', time: '5 hours ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link
          to="/deals/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          New Deal
        </Link>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Deals"
          value="12"
          change="+2"
          icon={<Briefcase className="w-8 h-8 text-indigo-600" />}
        />
        <MetricCard
          title="Total Pipeline Value"
          value="$245M"
          change="+15%"
          icon={<TrendingUp className="w-8 h-8 text-green-600" />}
        />
        <MetricCard
          title="Due Diligence Tasks"
          value="45"
          change="+8"
          icon={<FileText className="w-8 h-8 text-blue-600" />}
        />
        <MetricCard
          title="Active VDR Users"
          value="28"
          change="+5"
          icon={<Users className="w-8 h-8 text-purple-600" />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Deals */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Recent Deals</h2>
          </div>
          <div className="p-4">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm font-medium text-gray-500">
                  <th className="pb-2">Deal Name</th>
                  <th className="pb-2">Type</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Value</th>
                </tr>
              </thead>
              <tbody>
                {recentDeals.map((deal) => (
                  <tr key={deal.id} className="border-t border-gray-100">
                    <td className="py-3">{deal.name}</td>
                    <td className="py-3">{deal.type}</td>
                    <td className="py-3">
                      <StatusBadge status={deal.status} />
                    </td>
                    <td className="py-3">{deal.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* VDR Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Recent VDR Activity</h2>
          </div>
          <div className="p-4">
            {vdrActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 py-3 border-b border-gray-100 last:border-0">
                <Database className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span>{' '}
                    {activity.action.toLowerCase()}{' '}
                    <span className="font-medium">{activity.document}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AlertCard
          title="Due Diligence Deadlines"
          items={[
            { text: 'Financial Review for Tech Innovators', deadline: '2 days' },
            { text: 'Legal Documentation for Global Solutions', deadline: '5 days' },
          ]}
        />
        <AlertCard
          title="Post-Merger Tasks"
          items={[
            { text: 'System Integration Review', deadline: 'Today' },
            { text: 'Employee Training Program', deadline: '3 days' },
          ]}
        />
        <AlertCard
          title="Important Updates"
          items={[
            { text: 'New Compliance Requirements Added', deadline: 'New' },
            { text: 'Q2 Financial Reports Due', deadline: '1 week' },
          ]}
        />
      </div>
    </div>
  );
};

const MetricCard: React.FC<{
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}> = ({ title, value, change, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      {icon}
    </div>
    <div className="mt-2">
      <p className="text-3xl font-semibold">{value}</p>
      <p className="text-sm text-green-600 mt-1">+{change} from last month</p>
    </div>
  </div>
);

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const colors = {
    'Due Diligence': 'bg-yellow-100 text-yellow-800',
    'Prospecting': 'bg-blue-100 text-blue-800',
    'Post-Merger': 'bg-green-100 text-green-800',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
      {status}
    </span>
  );
};

const AlertCard: React.FC<{
  title: string;
  items: Array<{ text: string; deadline: string }>;
}> = ({ title, items }) => (
  <div className="bg-white rounded-lg shadow">
    <div className="p-4 border-b border-gray-200">
      <h2 className="text-lg font-semibold">{title}</h2>
    </div>
    <div className="p-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <span className="text-sm">{item.text}</span>
          </div>
          <span className="text-sm font-medium text-gray-500">{item.deadline}</span>
        </div>
      ))}
    </div>
  </div>
);

export default Dashboard;