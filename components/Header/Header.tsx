'use client';

import css from './Header.module.css';

import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const [homePage, setHomePage] = useState(false);
  const [catalogPage, setCatalogPage] = useState(false);
  const path = usePathname();
  useEffect(() => {
    if (path.endsWith('catalog')) {
      setTimeout(() => setCatalogPage(true));
    } else {
      setTimeout(() => setCatalogPage(false));
    }

    if (path === '/') {
      setTimeout(() => setHomePage(true));
    } else {
      setTimeout(() => setHomePage(false));
    }
  }, [path]);

  return (
    <header className={clsx('container', css.box)}>
      <Link className={css.logo} title="logo" href="/">
        <svg width={104} height={16}>
          <use href="/icons.svg#logo"></use>
        </svg>
      </Link>
      <nav className={css.nav}>
        <Link
          className={clsx(css.link, homePage && css.cuteentPage)}
          title="home link"
          href="/"
        >
          Home
        </Link>
        <Link
          className={clsx(css.link, catalogPage && css.cuteentPage)}
          title="catalog link"
          href="/catalog"
        >
          Catalog
        </Link>
      </nav>
    </header>
  );
}
