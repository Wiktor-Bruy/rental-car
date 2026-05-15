'use client';

import css from './FormCatalog.module.css';

import { useFormik } from 'formik';
import { useId } from 'react';
import clsx from 'clsx';

import { generatePrices } from '@/lib/generatePrices';

interface FormProps {
  filters: {
    brands: string[];
    price: {
      min: string;
      max: string;
    };
  };
  handleSubmit: (
    brand: string,
    price: string,
    mileFor: number,
    mileTo: number
  ) => void;
}

export default function FormCatalog({ filters, handleSubmit }: FormProps) {
  const min = Number(filters.price.min);
  const max = Number(filters.price.max);
  const prices = generatePrices(min, max);
  const id = useId();

  const formik = useFormik({
    initialValues: {
      brand: '',
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
    <form className={css.form} onSubmit={formik.handleSubmit}>
      <div className={css.inputGroup}>
        <label className={css.label} htmlFor={`brand-${id}`}>
          Car brand
        </label>
        <select
          className={clsx(css.input, css.select)}
          name="brand"
          id={`brand-${id}`}
          onChange={formik.handleChange}
        >
          <option value={''}>Choose a brand</option>
          {filters.brands.map(brand => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className={css.inputGroup}>
        <label className={css.label} htmlFor={`price-${id}`}>
          Price/ 1 hour
        </label>
        <select
          className={clsx(css.input, css.select, css.price)}
          name="price"
          id={`price-${id}`}
          onChange={formik.handleChange}
        >
          <option value={''}>Choose a price</option>
          {prices.map(price => (
            <option key={price} value={price}>
              {price}
            </option>
          ))}
        </select>
      </div>

      <div className={css.inputGroup}>
        <label className={css.label} htmlFor={`mileage-${id}`}>
          Сar mileage / km
        </label>
        <div className={css.mileBox}>
          <div className={css.minMile}>
            <span>From</span>
            <input
              className={css.inputMile}
              name="mileFor"
              type="number"
              min={0}
              step={500}
              id={`mileage-${id}`}
              onChange={formik.handleChange}
            />
          </div>
          <div className={css.maxMile}>
            <span>To</span>
            <input
              className={css.inputMile}
              name="mileTo"
              type="number"
              min={0}
              step={500}
              onChange={formik.handleChange}
            />
          </div>
        </div>
      </div>

      <button className={css.btn} type="submit">
        Search
      </button>
    </form>
  );
}
