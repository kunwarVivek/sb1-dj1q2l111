import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Tenant, tenantSchema } from '../types/tenant';

export const useTenant = (tenantId?: string) => {
  const { data: tenant, isLoading } = useQuery({
    queryKey: ['tenant', tenantId],
    queryFn: async () => {
      const response = await axios.get(`/api/tenants/${tenantId}`);
      return tenantSchema.parse(response.data);
    },
    enabled: !!tenantId,
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedTenant: Partial<Tenant>) => {
      const response = await axios.patch(`/api/tenants/${tenantId}`, updatedTenant);
      return tenantSchema.parse(response.data);
    },
  });

  return {
    tenant,
    isLoading,
    updateTenant: updateMutation.mutate,
    isUpdating: updateMutation.isLoading,
  };
};