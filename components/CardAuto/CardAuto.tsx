'use client';

import css from './CardAuto.module.css';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import type { Car } from '@/types/types';
// import { getAddress } from '@/lib/getAddress';

interface CardAutoProps {
  car: Car;
}

export default function CardAuto({ car }: CardAutoProps) {
  const [like, setLike] = useState(false);
  // const arrAddress = getAddress(car.address);
  const router = useRouter();

  function handleLike() {
    if (like) {
      setLike(false);
    } else {
      setLike(true);
    }
  }

  function handleClick(id: string) {
    router.push(`/catalog/${id}`);
  }

  return (
    <div className={css.card}>
      <div className={css.boxImage} onClick={handleLike}>
        <Image
          src={car.img}
          alt="photo auto"
          width={276}
          height={268}
          loading="eager"
        />
        <div>
          {!like ? (
            <svg width={16} height={16}>
              <use href="/icons.svg#like"></use>
            </svg>
          ) : (
            <svg width={16} height={16}>
              <use href="/icons.svg#like-full"></use>
            </svg>
          )}
        </div>
      </div>

      <div className={css.infoBox}>
        <div className={css.brandBox}>
          <p>
            {car.brand}
            <span>{car.model}</span>,{car.year}
          </p>
          <p>${car.rentalPrice}</p>
        </div>
      </div>

      <div className={css.detailsBox}>
        <p>{car.location.city}</p>
        <p>{car.location.country}</p>
        <p>{car.rentalCompany}</p>
        <p>{car.type}</p>
        <p>{car.mileage}km</p>
      </div>

      <button onClick={() => handleClick(car.id)} type="button">
        Read more
      </button>
    </div>
  );
}
