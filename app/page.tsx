import css from './page.module.css';

import Link from 'next/link';
import clsx from 'clsx';

export default function Home() {
  return (
    <>
      <section className={clsx('container', css.hero)}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <p className={css.text}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <Link className={css.link} href="/catalog">
          View Catalog
        </Link>
      </section>
    </>
  );
}
