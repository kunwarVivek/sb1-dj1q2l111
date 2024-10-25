import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { z } from 'zod';

interface CrudOptions<T> {
  resource: string;
  schema: z.ZodType<T>;
  queryKey: string;
}

export function useCrud<T>({ resource, schema, queryKey }: CrudOptions<T>) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await axios.get(`/api/${resource}`);
      return schema.array().parse(response.data);
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newItem: Omit<T, 'id'>) => {
      const response = await axios.post(`/api/${resource}`, newItem);
      return schema.parse(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<T> }) => {
      const response = await axios.patch(`/api/${resource}/${id}`, data);
      return schema.parse(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/${resource}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  return {
    data,
    isLoading,
    error,
    create: createMutation.mutate,
    update: updateMutation.mutate,
    remove: deleteMutation.mutate,
    isCreating: createMutation.isLoading,
    isUpdating: updateMutation.isLoading,
    isDeleting: deleteMutation.isLoading,
  };
}