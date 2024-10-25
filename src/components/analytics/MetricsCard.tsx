import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string | number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  description?: string;
}

export const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  change,
  icon,
  description,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      <div className="mt-2">
        <p className="text-3xl font-semibold">{value}</p>
        {change && (
          <p className={`text-sm mt-1 flex items-center ${
            change.isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {change.isPositive ? (
              <ArrowUp className="w-4 h-4 mr-1" />
            ) : (
              <ArrowDown className="w-4 h-4 mr-1" />
            )}
            {change.value}
          </p>
        )}
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>
    </div>
  );
};