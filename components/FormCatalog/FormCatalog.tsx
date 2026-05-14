'use client';

// import css from './FormCatalog.module.css'

import { useFormik } from 'formik';
import { useId } from 'react';

import { generatePrices } from '@/lib/generatePrices';

interface FormProps {
  brands: string[];
  handleSubmit: (
    brand: string,
    price: string,
    mileFor: number,
    mileTo: number
  ) => void;
}

export default function FormCatalog({ brands, handleSubmit }: FormProps) {
  const prices = generatePrices(250);
  const id = useId();

  const formik = useFormik({
    initialValues: {
      brand: 'All',
      price: '',
      mileFor: 0,
      mileTo: 0,
    },
    onSubmit: values => {
      const brand = values.brand;
      const price = values.price;
      const mileFor = values.mileFor;
      const mileTo = values.mileTo;
      handleSubmit(brand, price, mileFor, mileTo);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor={`brand-${id}`}>Car brand</label>
        <select name="brand" id={`brand-${id}`} onChange={formik.handleChange}>
          <option selected={true} disabled={true} value={'All'}>
            Choose a brand
          </option>
          {brands.map(brand => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`price-${id}`}>Price/ 1 hour</label>
        <select name="price" id={`price-${id}`} onChange={formik.handleChange}>
          <option selected={true} disabled={true} value={''}>
            Choose a price
          </option>
          {prices.map(price => (
            <option key={price} value={price}>
              {price}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`mileage-${id}`}>Сar mileage / km</label>
        <div>
          <span>From</span>
          <input
            name="mileFor"
            type="number"
            min={1000}
            step={500}
            id={`mileage-${id}`}
            onChange={formik.handleChange}
          />
        </div>

        <div>
          <span>To</span>
          <input
            name="mileTo"
            type="number"
            min={1000}
            step={500}
            onChange={formik.handleChange}
          />
        </div>
      </div>

      <button type="submit">Search</button>
    </form>
  );
}
