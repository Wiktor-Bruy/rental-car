'use client';

import css from './CardAuto.module.css';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import type { Car } from '@/types/types';

interface CardAutoProps {
  car: Car;
}

export default function CardAuto({ car }: CardAutoProps) {
  const [like, setLike] = useState(false);
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
      <div className={css.cardBox}>
        <div className={css.boxImage} onClick={handleLike}>
          <Image
            src={car.img}
            alt="photo auto"
            width={276}
            height={268}
            loading="eager"
          />
          <div className={css.like}>
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
          <p className={css.brandText}>
            <span>{car.brand} </span>
            <span className={css.model}>{car.model}, </span>
            <span>{car.year}</span>
          </p>
          <p>${car.rentalPrice}</p>
        </div>

        <div className={css.detailsBox}>
          <p>{car.location.city}</p>
          <span className={css.line}></span>
          <p>{car.location.country}</p>
          <span className={css.line}></span>
          <p>{car.rentalCompany}</p>
          <span className={css.line}></span>
          <p>{car.type}</p>
          <span className={css.line}></span>
          <p>{car.mileage}km</p>
        </div>
      </div>

      <button
        className={css.btn}
        onClick={() => handleClick(car.id)}
        type="button"
      >
        Read more
      </button>
    </div>
  );
}
