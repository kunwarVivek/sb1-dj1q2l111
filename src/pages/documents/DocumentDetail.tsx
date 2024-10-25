import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from '@tanstack/react-router';
import { FileText, Download, Calendar, User } from 'lucide-react';
import { DetailView } from '../../components/common/DetailView';
import { Modal } from '../../components/common/Modal';
import { ActionButton } from '../../components/common/ActionButton';

const DocumentDetail: React.FC = () => {
  const { id } = useParams({ from: '/documents/$id' });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data: document, isLoading } = useQuery({
    queryKey: ['documents', id],
    queryFn: async () => {
      // Mock API call
      return {
        id,
        name: 'Financial Report 2023.pdf',
        type: 'PDF',
        size: 2500000,
        uploadedBy: 'John Doe',
        uploadedAt: '2024-03-20T10:00:00Z',
        lastModified: '2024-03-20T10:00:00Z',
        description: 'Annual financial report for fiscal year 2023',
        version: '1.0',
        tags: ['finance', 'annual-report', '2023'],
      };
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      // Mock delete API call
      console.log('Deleting document:', id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      navigate({ to: '/documents' });
    },
  });

  const handleDelete = async () => {
    await deleteMutation.mutateAsync();
    setIsDeleteModalOpen(false);
  };

  const formatFileSize = (bytes: number) => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  return (
    <>
      <DetailView
        title={document?.name || 'Document Details'}
        isLoading={isLoading}
        onDelete={() => setIsDeleteModalOpen(true)}
      >
        {document && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Document Information</h2>
              <dl className="space-y-4">
                <div className="flex items-center">
                  <dt className="w-32 flex items-center text-gray-500">
                    <FileText className="w-4 h-4 mr-2" />
                    Type
                  </dt>
                  <dd className="font-medium">{document.type}</dd>
                </div>
                <div className="flex items-center">
                  <dt className="w-32 flex items-center text-gray-500">
                    Size
                  </dt>
                  <dd className="font-medium">{formatFileSize(document.size)}</dd>
                </div>
                <div className="flex items-center">
                  <dt className="w-32 flex items-center text-gray-500">
                    <User className="w-4 h-4 mr-2" />
                    Uploaded By
                  </dt>
                  <dd className="font-medium">{document.uploadedBy}</dd>
                </div>
                <div className="flex items-center">
                  <dt className="w-32 flex items-center text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    Upload Date
                  </dt>
                  <dd className="font-medium">
                    {new Date(document.uploadedAt).toLocaleDateString()}
                  </dd>
                </div>
                <div className="flex items-center">
                  <dt className="w-32 flex items-center text-gray-500">
                    Version
                  </dt>
                  <dd className="font-medium">{document.version}</dd>
                </div>
              </dl>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Additional Details</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                  <p className="text-gray-900">{document.description}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {document.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <ActionButton
                variant="secondary"
                size="lg"
                icon={<Download className="w-5 h-5" />}
                className="w-full"
              >
                Download Document
              </ActionButton>
            </div>
          </div>
        )}
      </DetailView>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Document"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure you want to delete this document? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-2">
            <ActionButton
              variant="secondary"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </ActionButton>
            <ActionButton
              variant="danger"
              onClick={handleDelete}
              isLoading={deleteMutation.isLoading}
            >
              Delete
            </ActionButton>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DocumentDetail;