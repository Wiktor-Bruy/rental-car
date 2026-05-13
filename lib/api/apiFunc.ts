import { api } from './api';
import type { Car } from '@/types/types';

interface CarResponse {
  page: string;
  totalPages: number;
  cars: Car[];
}

interface FetchCars {
  page: number;
  brand?: string;
  rentalPrice?: string;
  minMileage?: number;
  maxMileage?: number;
  limit?: number;
}

export async function getBrands(): Promise<string[]> {
  const res = await api.get<string[]>('/brands');
  return res.data;
}

export async function getCars({
  page,
  brand,
  rentalPrice,
  minMileage,
  maxMileage,
}: FetchCars): Promise<CarResponse> {
  const isBrand = brand != '';
  const isPrice = rentalPrice != '';
  const isMin = minMileage != 0;
  const isMax = maxMileage != 0;

  const res = await api.get('/cars', {
    params: {
      ...(isBrand && { brand }),
      ...(isPrice && { rentalPrice }),
      ...(isMin && { minMileage }),
      ...(isMax && { maxMileage }),
      limit: 12,
      page,
    },
  });
  return res.data;
}
