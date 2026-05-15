'use client';

import css from './loading.module.css';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => router.push('/'), 3500);
  }, [router]);

  return <div className={css.pageBox}></div>;
}
