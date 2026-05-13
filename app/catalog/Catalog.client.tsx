'use client';

import clsx from 'clsx';
import { useState, useEffect } from 'react';

import { getBrands } from '@/lib/api/apiFunc';

import FormCatalog from '@/components/FormCatalog/FormCatalog';

export default function CatalogClient() {
  const [brands, setBrands] = useState<string[] | []>([]);

  useEffect(() => {
    async function fetchBrands() {
      const brands = await getBrands();
      if (brands) {
        setBrands(brands);
      }
    }
    fetchBrands();
  }, []);
  return (
    <section className={clsx('container')}>
      <FormCatalog brands={brands} />
    </section>
  );
}
