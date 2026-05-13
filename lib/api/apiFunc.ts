import { api } from './api';
import type { Car } from '@/types/types';

export async function getBrands(): Promise<string[]> {
  const res = await api.get<string[]>('/brands');
  return res.data;
}

export async function getCars(
  page: number,
  brand?: string,
  rentalPrice?: string,
  minMileage?: number,
  maxMileage?: number,
  limit?: number
): Promise<Car[]> {
  const isBrand = brand != '';
  const ipPrice = rentalPrice != '';
  const isLimit = limit != undefined;
  const isMin = minMileage != 0;
  const isMax = maxMileage != 0;

  if (ipPrice && isBrand && isLimit && isMin && isMax) {
    const res = await api.get<Car[]>(
      `/cars?brand=${brand}&rentalPrice=${rentalPrice}&minMileage=${minMileage}&maxMileage=${maxMileage}&limit=${limit}&page=${page}`
    );
    return res.data;
  }

  if (ipPrice && isBrand && isMin && isMax) {
    const res = await api.get<Car[]>(
      `/cars?brand=${brand}&rentalPrice=${rentalPrice}&minMileage=${minMileage}&maxMileage=${maxMileage}&limit=12&page=${page}`
    );
    return res.data;
  }

  if (ipPrice && isBrand && isMin) {
    const res = await api.get<Car[]>(
      `/cars?brand=${brand}&rentalPrice=${rentalPrice}&minMileage=${minMileage}&limit=12&page=${page}`
    );
    return res.data;
  }

  if (ipPrice && isBrand) {
    const res = await api.get<Car[]>(
      `/cars?brand=${brand}&rentalPrice=${rentalPrice}&limit=12&page=${page}`
    );
    return res.data;
  }

  if (isBrand) {
    const res = await api.get<Car[]>(
      `/cars?brand=${brand}&limit=12&page=${page}`
    );
    return res.data;
  }

  const res = await api.get<Car[]>(`/cars?limit=12&page=${page}`);
  return res.data;
}
