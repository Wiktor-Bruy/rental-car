'use client';

import css from './loading.module.css';

import { Audio } from 'react-loader-spinner';

export default function Loading() {
  return (
    <div className={css.box}>
      <div className={css.loader}>
        <Audio width={80} height={80} color="#022ef2" />
      </div>
    </div>
  );
}
