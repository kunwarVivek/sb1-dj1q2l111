import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from '@tanstack/react-router';
import { Building2, MapPin, Users, DollarSign, Briefcase } from 'lucide-react';
import { DetailView } from '../../components/common/DetailView';
import { Modal } from '../../components/common/Modal';
import { Form } from '../../components/common/Form';
import { prospectSchema, type Prospect } from '../../types/prospect';
import { ActionButton } from '../../components/common/ActionButton';

const ProspectDetail: React.FC = () => {
  const { id } = useParams({ from: '/prospects/$id' });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data: prospect, isLoading } = useQuery({
    queryKey: ['prospects', id],
    queryFn: async () => {
      // Mock API call
      return {
        id,
        companyName: 'Tech Innovators Inc',
        industry: 'Technology',
        revenue: 5000000,
        employees: 50,
        location: 'San Francisco, CA',
        status: 'qualified',
        notes: 'Promising startup with strong growth potential',
      };
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: Prospect) => {
      // Mock update API call
      console.log('Updating prospect:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prospects'] });
      setIsEditModalOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      // Mock delete API call
      console.log('Deleting prospect:', id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prospects'] });
      navigate({ to: '/prospects' });
    },
  });

  const handleUpdate = async (data: Prospect) => {
    await updateMutation.mutateAsync({ ...data, id });
  };

  const handleDelete = async () => {
    await deleteMutation.mutateAsync();
    setIsDeleteModalOpen(false);
  };

  const getStatusColor = (status: Prospect['status']) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      qualified: 'bg-green-100 text-green-800',
      negotiating: 'bg-purple-100 text-purple-800',
      closed: 'bg-gray-100 text-gray-800',
    };
    return colors[status];
  };

  return (
    <>
      <DetailView
        title={prospect?.companyName || 'Prospect Details'}
        isLoading={isLoading}
        onEdit={() => setIsEditModalOpen(true)}
        onDelete={() => setIsDeleteModalOpen(true)}
      >
        {prospect && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Company Information</h2>
              <dl className="space-y-4">
                <div className="flex items-center">
                  <dt className="w-32 flex items-center text-gray-500">
                    <Building2 className="w-4 h-4 mr-2" />
                    Company
                  </dt>
                  <dd className="font-medium">{prospect.companyName}</dd>
                </div>
                <div className="flex items-center">
                  <dt className="w-32 flex items-center text-gray-500">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Industry
                  </dt>
                  <dd className="font-medium">{prospect.industry}</dd>
                </div>
                <div className="flex items-center">
                  <dt className="w-32 flex items-center text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    Location
                  </dt>
                  <dd className="font-medium">{prospect.location}</dd>
                </div>
                <div className="flex items-center">
                  <dt className="w-32 flex items-center text-gray-500">
                    <Users className="w-4 h-4 mr-2" />
                    Employees
                  </dt>
                  <dd className="font-medium">{prospect.employees}</dd>
                </div>
                <div className="flex items-center">
                  <dt className="w-32 flex items-center text-gray-500">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Revenue
                  </dt>
                  <dd className="font-medium">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 0,
                    }).format(prospect.revenue)}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Status & Notes</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Current Status</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(prospect.status)}`}>
                    {prospect.status.charAt(0).toUpperCase() + prospect.status.slice(1)}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Notes</h3>
                  <p className="text-gray-900">{prospect.notes}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </DetailView>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Prospect"
      >
        <Form
          schema={prospectSchema}
          defaultValues={prospect}
          onSubmit={handleUpdate}
          submitText="Update"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                name="companyName"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Industry</label>
              <input
                type="text"
                name="industry"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Revenue</label>
              <input
                type="number"
                name="revenue"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Employees</label>
              <input
                type="number"
                name="employees"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="negotiating">Negotiating</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                name="notes"
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </Form>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Prospect"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure you want to delete this prospect? This action cannot be undone.
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

export default ProspectDetail;