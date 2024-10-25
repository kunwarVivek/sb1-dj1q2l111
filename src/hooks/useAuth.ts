import { useQuery, useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import axios from 'axios';
import { User, userSchema } from '../types/user';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const useAuth = () => {
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await axios.get('/api/auth/me');
      return userSchema.parse(response.data);
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: z.infer<typeof loginSchema>) => {
      const response = await axios.post('/api/auth/login', credentials);
      return userSchema.parse(response.data);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await axios.post('/api/auth/logout');
    },
  });

  return {
    user,
    isLoadingUser,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isLoading,
    isLoggingOut: logoutMutation.isLoading,
  };
};