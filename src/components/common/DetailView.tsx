import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { ActionButton } from './ActionButton';

interface DetailViewProps {
  title: string;
  children: React.ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
  isLoading?: boolean;
  breadcrumbs?: Array<{ label: string; to: string }>;
}

export const DetailView: React.FC<DetailViewProps> = ({
  title,
  children,
  onEdit,
  onDelete,
  isLoading,
  breadcrumbs,
}) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        {breadcrumbs && (
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={crumb.to}>
                  {index > 0 && <span className="text-gray-400">/</span>}
                  <li>
                    <a
                      href={crumb.to}
                      className="text-sm text-gray-500 hover:text-gray-700"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate({ to: crumb.to });
                      }}
                    >
                      {crumb.label}
                    </a>
                  </li>
                </React.Fragment>
              ))}
            </ol>
          </nav>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <ActionButton
              variant="secondary"
              size="sm"
              icon={<ArrowLeft className="w-4 h-4" />}
              onClick={() => navigate(-1)}
            >
              Back
            </ActionButton>
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
          <div className="flex space-x-2">
            {onEdit && (
              <ActionButton onClick={onEdit}>
                Edit
              </ActionButton>
            )}
            {onDelete && (
              <ActionButton
                variant="danger"
                onClick={onDelete}
              >
                Delete
              </ActionButton>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg">
        {children}
      </div>
    </div>
  );
};