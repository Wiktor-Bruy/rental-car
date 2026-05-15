import css from './page.module.css';

import type { Metadata } from 'next';
import Image from 'next/image';
import clsx from 'clsx';

import { getCar } from '@/lib/api/apiFunc';
import FormArend from '@/components/FormArend/FormArend';

export const metadata: Metadata = {
  title: 'Car Details',
  description: 'Detail for this car',
};

interface AutoDetailsProps {
  params: Promise<{ carId: string }>;
}

export default async function AutoDetails({ params }: AutoDetailsProps) {
  const { carId } = await params;
  const car = await getCar(carId);

  return (
    <section className={clsx('container', css.section)}>
      <div className={css.leftBox}>
        <div className={css.imgBox}>
          <Image
            src={car.img}
            alt="Photo this auto"
            width={640}
            height={512}
            loading="eager"
          />
        </div>
        <FormArend id={carId} />
      </div>

      <div>
        <div className={css.brandBox}>
          <p className={css.brand}>
            <span>
              {car.brand} {car.model}, {car.year}
            </span>
            <span className={css.id}>id {car.stockNumber}</span>
          </p>
          <p className={clsx(css.text, css.location)}>
            <svg width={12} height={15}>
              <use href="/icons.svg#location"></use>
            </svg>
            <span className={css.city}>
              {car.location.city}, {car.location.country}
            </span>
            <span className={css.mileage}>Mileage: {car.mileage} km</span>
          </p>
          <p className={css.price}>${car.rentalPrice}</p>
          <p className={css.text}>{car.description}</p>
        </div>

        <div className={css.conditionBox}>
          <p className={css.title}>Rental Conditions:</p>
          <ul className={css.list}>
            {car.rentalConditions.map(condition => (
              <li className={css.item} key={condition}>
                <svg width={16} height={16}>
                  <use href="/icons.svg#check"></use>
                </svg>
                <span className={css.text}>{condition}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={css.spcfBox}>
          <p className={css.title}>Car Specifications:</p>
          <ul className={css.list}>
            <li className={css.item}>
              <svg width={16} height={16}>
                <use href="/icons.svg#calendar"></use>
              </svg>
              <span className={css.text}>Year: {car.year}</span>
            </li>
            <li className={css.item}>
              <svg width={16} height={16}>
                <use href="/icons.svg#car"></use>
              </svg>
              <span className={css.text}>Type: {car.type}</span>
            </li>
            <li className={css.item}>
              <svg width={16} height={16}>
                <use href="/icons.svg#fuel"></use>
              </svg>
              <span className={css.text}>
                Fuel Consumption: {car.fuelConsumption}
              </span>
            </li>
            <li className={css.item}>
              <svg width={16} height={16}>
                <use href="/icons.svg#engine"></use>
              </svg>
              <span className={css.text}>Engine Size: {car.engineSize}</span>
            </li>
          </ul>
        </div>

        <div>
          <p className={css.title}>Accessories and functionalities:</p>
          <ul className={css.list}>
            {car.features.map(elem => (
              <li className={css.item} key={elem}>
                <svg width={16} height={16}>
                  <use href="/icons.svg#check"></use>
                </svg>
                <span className={css.text}>{elem}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
