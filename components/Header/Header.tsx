import css from './Header.module.css';

import Link from 'next/link';
import clsx from 'clsx';

export default function Header() {
  return (
    <header className={clsx('container', css.box)}>
      <Link className={css.logo} title="logo" href="/">
        <svg width={104} height={16}>
          <use href="/icons.svg#logo"></use>
        </svg>
      </Link>
      <nav className={css.nav}>
        <Link className={clsx(css.link)} title="home link" href="/">
          Home
        </Link>
        <Link className={clsx(css.link)} title="catalog link" href="/catalog">
          Catalog
        </Link>
      </nav>
    </header>
  );
}
