import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { Search, Filter, Plus, Edit2, Trash2 } from 'lucide-react';
import { DataTable } from '../components/common/DataTable';
import { Modal } from '../components/common/Modal';
import { Form } from '../components/common/Form';
import { prospectSchema, type Prospect } from '../types/prospect';
import { ActionButton } from '../components/common/ActionButton';

const Prospecting: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: prospects = [], isLoading } = useQuery({
    queryKey: ['prospects'],
    queryFn: async () => {
      // Mock API call
      return [
        {
          id: '1',
          companyName: 'Tech Innovators Inc',
          industry: 'Technology',
          revenue: 5000000,
          employees: 50,
          location: 'San Francisco, CA',
          status: 'qualified',
          notes: 'Promising startup with strong growth potential',
        },
        {
          id: '2',
          companyName: 'Global Solutions Ltd',
          industry: 'Consulting',
          revenue: 15000000,
          employees: 150,
          location: 'New York, NY',
          status: 'contacted',
          notes: 'Established consulting firm',
        },
      ];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: Omit<Prospect, 'id'>) => {
      // Mock API call
      console.log('Creating prospect:', data);
      return { ...data, id: Date.now().toString() };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prospects'] });
      setIsCreateModalOpen(false);
    },
  });

  const columns = [
    {
      header: 'Company Name',
      accessorKey: 'companyName',
    },
    {
      header: 'Industry',
      accessorKey: 'industry',
    },
    {
      header: 'Revenue',
      accessorKey: 'revenue',
      cell: ({ getValue }: any) => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
      }).format(getValue()),
    },
    {
      header: 'Location',
      accessorKey: 'location',
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ getValue }: any) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(getValue())}`}>
          {getValue().charAt(0).toUpperCase() + getValue().slice(1)}
        </span>
      ),
    },
    {
      header: 'Actions',
      cell: ({ row }: any) => (
        <div className="flex space-x-2">
          <ActionButton
            variant="secondary"
            size="sm"
            icon={<Edit2 className="w-4 h-4" />}
            onClick={(e) => {
              e.stopPropagation();
              navigate({ to: '/prospects/$id', params: { id: row.original.id } });
            }}
          >
            Edit
          </ActionButton>
        </div>
      ),
    },
  ];

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

  const handleCreate = async (data: Omit<Prospect, 'id'>) => {
    await createMutation.mutateAsync(data);
  };

  const filteredProspects = prospects.filter(prospect =>
    prospect.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prospect.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prospect.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Prospects</h1>
        <ActionButton
          onClick={() => setIsCreateModalOpen(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          Add Prospect
        </ActionButton>
      </div>

      <div className="flex space-x-4 mb-6">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search prospects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <ActionButton
          variant="secondary"
          icon={<Filter className="w-4 h-4" />}
        >
          Filter
        </ActionButton>
      </div>

      <DataTable
        data={filteredProspects}
        columns={columns}
        isLoading={isLoading}
        onRowClick={(row) => navigate({ to: '/prospects/$id', params: { id: row.original.id } })}
      />

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Add New Prospect"
      >
        <Form
          schema={prospectSchema}
          onSubmit={handleCreate}
          submitText="Create"
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
    </div>
  );
};

export default Prospecting;