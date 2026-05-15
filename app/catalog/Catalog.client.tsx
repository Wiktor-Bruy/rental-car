'use client';

import css from './page.module.css';

import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getFilters, getCars, type Filters } from '@/lib/api/apiFunc';
import FormCatalog from '@/components/FormCatalog/FormCatalog';
import CarList from '@/components/CarList/CarList';

export default function CatalogClient() {
  const [filters, setFilters] = useState<Filters | null>(null);
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [minMile, setMinMile] = useState(0);
  const [maxMile, setMaxMile] = useState(0);

  useEffect(() => {
    async function fetchFilters() {
      const filters = await getFilters();
      if (filters) {
        setFilters(filters);
      }
    }
    fetchFilters();
  }, []);

  function changeParams(
    brand: string,
    price: string,
    mileFor: number,
    mileTo: number
  ) {
    setBrand(brand);
    setPrice(price);
    setMinMile(mileFor);
    setMaxMile(mileTo);
  }

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['cars', brand, price, minMile, maxMile],
    queryFn: ({ queryKey, pageParam }) => {
      const brand = queryKey[1] as string;
      const price = queryKey[2] as string;
      const minMile = queryKey[3] as number;
      const maxMile = queryKey[4] as number;
      return getCars({
        page: pageParam,
        brand: brand,
        price: price,
        minMileage: minMile,
        maxMileage: maxMile,
      });
    },
    initialPageParam: 1,
    getNextPageParam: lastResponse => {
      if (!lastResponse) {
        return undefined;
      }
      const nextPage = lastResponse.page + 1;
      return nextPage <= lastResponse.totalPages ? nextPage : undefined;
    },
    select: data => {
      return {
        ...data,
        cars: data?.pages?.flatMap(page => page?.cars ?? []),
      };
    },
  });

  const cars = data?.cars ?? [];
  const isCars = cars && cars.length > 0;

  return (
    <section className={clsx('container', css.section)}>
      {filters && <FormCatalog filters={filters} handleSubmit={changeParams} />}
      {isCars ? (
        <CarList
          cars={cars}
          handleLoad={() => fetchNextPage()}
          fetching={isFetching}
          isPage={hasNextPage}
        />
      ) : (
        <p className={css.text}>
          An error occurred, or no vehicles were found matching your search
          criteria...
        </p>
      )}
    </section>
  );
}
