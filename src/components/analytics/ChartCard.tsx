import React from 'react';
import { ResponsiveContainer } from 'recharts';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  description?: string;
  height?: number;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  children,
  description,
  height = 300,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-gray-500 mb-4">{description}</p>
      )}
      <div style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  );
};