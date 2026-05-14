'use client';

import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getBrands, getCars } from '@/lib/api/apiFunc';
import FormCatalog from '@/components/FormCatalog/FormCatalog';
import CarList from '@/components/CarList/CarList';

export default function CatalogClient() {
  const [brands, setBrands] = useState<string[] | []>([]);
  const [brand, setBrand] = useState('All');
  const [price, setPrice] = useState('');
  const [minMile, setMinMile] = useState(0);
  const [maxMile, setMaxMile] = useState(0);

  useEffect(() => {
    async function fetchBrands() {
      const brands = await getBrands();
      if (brands) {
        setBrands(brands);
      }
    }
    fetchBrands();
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
      const nextPage = Number(lastResponse.page) + 1;
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
    <section className={clsx('container')}>
      <FormCatalog brands={brands} handleSubmit={changeParams} />
      {isCars && (
        <CarList
          cars={cars}
          handleLoad={() => fetchNextPage()}
          fetching={isFetching}
          isButton={!hasNextPage}
        />
      )}
    </section>
  );
}
