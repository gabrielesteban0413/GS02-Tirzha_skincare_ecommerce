'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/infrastructure/react-query/query-client';

export function LayoutClient({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
