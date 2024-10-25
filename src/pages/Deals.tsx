import React, { useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Deal, dealSchema } from '../types/deal';
import { useCrud } from '../hooks/useCrud';
import { DataTable } from '../components/common/DataTable';
import { Modal } from '../components/common/Modal';
import { Form, FormField } from '../components/common/Form';
import { DealPhaseIndicator } from '../components/deals/DealPhaseIndicator';

const columnHelper = createColumnHelper<Deal>();

const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('phase', {
    header: 'Phase',
    cell: info => <DealPhaseIndicator currentPhase={info.getValue()} />,
  }),
  columnHelper.accessor('value', {
    header: 'Value',
    cell: info => `$${info.getValue().toLocaleString()}`,
  }),
  columnHelper.accessor('targetCompany', {
    header: 'Target Company',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => info.getValue(),
  }),
  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <button
          onClick={() => handleEdit(row.original)}
          className="text-blue-600 hover:text-blue-800"
        >
          <Edit2 className="h-4 w-4" />
        </button>
        <button
          onClick={() => handleDelete(row.original.id!)}
          className="text-red-600 hover:text-red-800"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    ),
  }),
];

export default function Deals() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  const {
    data: deals = [],
    isLoading,
    create,
    update,
    remove,
  } = useCrud({
    resource: 'deals',
    schema: dealSchema,
    queryKey: 'deals',
  });

  const handleCreate = () => {
    setSelectedDeal(null);
    setIsModalOpen(true);
  };

  const handleEdit = (deal: Deal) => {
    setSelectedDeal(deal);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      await remove(id);
    }
  };

  const handleSubmit = async (data: Omit<Deal, 'id'>) => {
    if (selectedDeal) {
      await update({ id: selectedDeal.id!, data });
    } else {
      await create(data);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Deals</h1>
        <button
          onClick={handleCreate}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          <span>New Deal</span>
        </button>
      </div>

      <DataTable
        data={deals}
        columns={columns}
        isLoading={isLoading}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedDeal ? 'Edit Deal' : 'New Deal'}
      >
        <Form
          schema={dealSchema}
          defaultValues={selectedDeal || undefined}
          onSubmit={handleSubmit}
          submitText={selectedDeal ? 'Update' : 'Create'}
        >
          <FormField name="name" label="Deal Name" />
          <FormField name="targetCompany" label="Target Company" />
          <FormField name="value" label="Value" type="number" />
          <FormField name="status" label="Status" />
          <FormField name="description" label="Description" />
        </Form>
      </Modal>
    </div>
  );
}