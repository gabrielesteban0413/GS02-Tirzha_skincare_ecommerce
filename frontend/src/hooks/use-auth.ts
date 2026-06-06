'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi, LoginPayload, RegisterPayload, AuthResponse } from '@/infrastructure/api/auth.api';
import { useAuthStore } from '@/stores/auth.store';

export function useLogin() {
  const queryClient = useQueryClient();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: (data: LoginPayload) => authApi.login(data),
    onSuccess: (data: AuthResponse) => {
      setAuth(data.user, data.token);
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: (data: RegisterPayload) => authApi.register(data),
    onSuccess: (data: AuthResponse) => {
      setAuth(data.user, data.token);
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      logout();
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => authApi.getCurrentUser(),
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
}

export function useAuth() {
  const { user, isAuthenticated, token } = useAuthStore();
  const { data: currentUser } = useCurrentUser();
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();

  return {
    user: user || currentUser || null,
    isAuthenticated,
    token,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    isLoading:
      loginMutation.isPending || registerMutation.isPending || logoutMutation.isPending,
    error: loginMutation.error || registerMutation.error || logoutMutation.error,
  };
}
