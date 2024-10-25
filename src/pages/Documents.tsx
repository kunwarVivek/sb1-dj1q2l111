import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FileText, Upload, Download, Trash2, Plus } from 'lucide-react';
import { z } from 'zod';
import { DataTable } from '../components/common/DataTable';
import { ActionButton } from '../components/common/ActionButton';
import { Modal } from '../components/common/Modal';

const documentSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  size: z.number(),
  uploadedBy: z.string(),
  uploadedAt: z.string(),
  lastModified: z.string(),
});

type Document = z.infer<typeof documentSchema>;

// Mock API functions for demonstration
const fetchDocuments = async (): Promise<Document[]> => {
  return [
    {
      id: '1',
      name: 'Financial Report 2023.pdf',
      type: 'PDF',
      size: 2500000,
      uploadedBy: 'John Doe',
      uploadedAt: '2024-03-20T10:00:00Z',
      lastModified: '2024-03-20T10:00:00Z',
    },
    {
      id: '2',
      name: 'Due Diligence Checklist.xlsx',
      type: 'Excel',
      size: 1500000,
      uploadedBy: 'Jane Smith',
      uploadedAt: '2024-03-19T15:30:00Z',
      lastModified: '2024-03-19T15:30:00Z',
    },
  ];
};

const Documents: React.FC = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: documents = [], isLoading } = useQuery({
    queryKey: ['documents'],
    queryFn: fetchDocuments,
  });

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      // Mock upload function
      console.log('Uploading file:', file.name);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      setIsUploadModalOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      // Mock delete function
      console.log('Deleting document:', id);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });

  const columns = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-gray-400" />
          <span>{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: 'type',
      header: 'Type',
    },
    {
      accessorKey: 'size',
      header: 'Size',
      cell: ({ row }) => formatFileSize(row.original.size),
    },
    {
      accessorKey: 'uploadedBy',
      header: 'Uploaded By',
    },
    {
      accessorKey: 'uploadedAt',
      header: 'Upload Date',
      cell: ({ row }) => new Date(row.original.uploadedAt).toLocaleDateString(),
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <ActionButton
            variant="secondary"
            size="sm"
            icon={<Download className="w-4 h-4" />}
            onClick={() => handleDownload(row.original)}
          >
            Download
          </ActionButton>
          <ActionButton
            variant="danger"
            size="sm"
            icon={<Trash2 className="w-4 h-4" />}
            onClick={() => handleDelete(row.original.id)}
          >
            Delete
          </ActionButton>
        </div>
      ),
    },
  ];

  const handleDownload = (document: Document) => {
    // Mock download function
    console.log('Downloading:', document.name);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await uploadMutation.mutateAsync(file);
    }
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Documents</h1>
        <ActionButton
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsUploadModalOpen(true)}
        >
          Upload Document
        </ActionButton>
      </div>

      <DataTable
        data={documents}
        columns={columns}
        isLoading={isLoading}
        searchPlaceholder="Search documents..."
      />

      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload Document"
      >
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center space-y-2"
            >
              <Upload className="w-8 h-8 text-gray-400" />
              <span className="text-sm text-gray-600">
                Click to upload or drag and drop
              </span>
              <span className="text-xs text-gray-500">
                PDF, DOCX, XLSX, up to 10MB
              </span>
            </label>
          </div>
          <div className="flex justify-end space-x-2">
            <ActionButton
              variant="secondary"
              onClick={() => setIsUploadModalOpen(false)}
            >
              Cancel
            </ActionButton>
            <ActionButton
              isLoading={uploadMutation.isLoading}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              Upload
            </ActionButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Documents;