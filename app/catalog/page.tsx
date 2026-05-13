import type { Metadata } from 'next';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';

import CatalogClient from './Catalog.client';
import { getCars } from '@/lib/api/apiFunc';

export const metadata: Metadata = {
  title: 'Catalog',
  description: 'Catalog page',
};

export default async function Catalog() {
  const brand = '';
  const price = '';
  const minMile = '';
  const maxMile = '';
  const page = 1;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', page, brand, price, minMile, maxMile],
    queryFn: () => getCars(page),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogClient />
    </HydrationBoundary>
  );
}
