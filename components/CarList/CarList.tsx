'use client';

import type { Car } from '@/types/types';
import CardAuto from '@/components/CardAuto/CardAuto';

interface CarLisrProps {
  cars: Car[];
  handleLoad: () => void;
  isButton: boolean;
  fetching: boolean;
}

export default function CarList({
  cars,
  handleLoad,
  isButton,
  fetching,
}: CarLisrProps) {
  return (
    <>
      <ul>
        {cars.map(car => (
          <li key={car.id}>
            <CardAuto car={car} />
          </li>
        ))}
      </ul>
      <button type="button" onClick={handleLoad} disabled={isButton}>
        {fetching ? 'Loading...' : 'Load more'}
      </button>
    </>
  );
}
