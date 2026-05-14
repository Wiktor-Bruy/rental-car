import type { Metadata } from 'next';
import Image from 'next/image';

import { getCar } from '@/lib/api/apiFunc';
import { getAddress } from '@/lib/getAddress';
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

  const carNameArr = car.img.split('/');
  const carNameId = carNameArr[carNameArr.length - 1].slice(0, 4);
  const arrAddress = getAddress(car.address);

  return (
    <section>
      <div>
        <div>
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
        <div>
          <p>
            <span>
              {car.brand} {car.model}
            </span>
            <span>id {carNameId}</span>
          </p>
          <p>
            <svg width={12} height={15}>
              <use href="/icons.svg#location"></use>
            </svg>
            <span>
              {arrAddress[1]}, {arrAddress[2]}
            </span>
            <span>Mileage: {car.mileage} km</span>
          </p>
          <p>${car.rentalPrice}</p>
          <p>{car.description}</p>
        </div>

        <div>
          <p>Rental Conditions:</p>
          <ul>
            {car.rentalConditions.map(condition => (
              <li key={condition}>
                <svg width={16} height={16}>
                  <use href="/icons.svg#check"></use>
                </svg>
                <span>{condition}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p>Car Specifications:</p>
          <ul>
            <li>
              <svg width={16} height={16}>
                <use href="/icons.svg#calendar"></use>
              </svg>
              <span>Year: {car.year}</span>
            </li>
            <li>
              <svg width={16} height={16}>
                <use href="/icons.svg#car"></use>
              </svg>
              <span>Type: {car.type}</span>
            </li>
            <li>
              <svg width={16} height={16}>
                <use href="/icons.svg#fuel"></use>
              </svg>
              <span>Fuel Consumption: {car.fuelConsumption}</span>
            </li>
            <li>
              <svg width={16} height={16}>
                <use href="/icons.svg#engine"></use>
              </svg>
              <span>Engine Size: {car.engineSize}</span>
            </li>
          </ul>
        </div>

        <div>
          <p>Accessories and functionalities:</p>
          <ul>
            {car.accessories.map(elem => (
              <li key={elem}>
                <svg width={16} height={16}>
                  <use href="/icons.svg#check"></use>
                </svg>
                <span>{elem}</span>
              </li>
            ))}
            {car.functionalities.map(elem => (
              <li key={elem}>
                <svg width={16} height={16}>
                  <use href="/icons.svg#check"></use>
                </svg>
                <span>{elem}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
