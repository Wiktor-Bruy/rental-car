'use client';

// import css from './FormCatalog.module.css'

import { useFormik } from 'formik';
import { useId } from 'react';

import { generatePrices } from '@/lib/generatePrices';

interface FormProps {
  brands: string[];
}

export default function FormCatalog({ brands }: FormProps) {
  const prices = generatePrices(250);
  const id = useId();

  const formik = useFormik({
    initialValues: {
      brand: '',
      price: '',
      mileFor: 0,
      mileTo: 0,
    },
    onSubmit: values => {
      console.log(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor={`brand-${id}`}>Car brand</label>
        <select name="brand" id={`brand-${id}`} onChange={formik.handleChange}>
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
          {prices.map(price => (
            <option key={price} value={price}>
              {price}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`mileage-${id}`}>Сar mileage / km</label>
        <input
          name="mileFor"
          type="number"
          min={1000}
          id={`mileage-${id}`}
          onChange={formik.handleChange}
        />
        <input
          name="mileTo"
          type="number"
          min={1000}
          onChange={formik.handleChange}
        />
      </div>

      <button type="submit">Search</button>
    </form>
  );
}
