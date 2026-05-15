'use client';

import css from './CarList.module.css';

import type { Car } from '@/types/types';
import CardAuto from '@/components/CardAuto/CardAuto';

interface CarLisrProps {
  cars: Car[];
  handleLoad: () => void;
  isPage: boolean;
  fetching: boolean;
}

export default function CarList({
  cars,
  handleLoad,
  isPage,
  fetching,
}: CarLisrProps) {
  return (
    <div>
      <ul className={css.carList}>
        {cars.map(car => (
          <li key={car.id}>
            <CardAuto car={car} />
          </li>
        ))}
      </ul>
      <button
        className={css.btn}
        type="button"
        onClick={handleLoad}
        disabled={!isPage}
      >
        {fetching ? 'Loading...' : 'Load more'}
      </button>
    </div>
  );
}
