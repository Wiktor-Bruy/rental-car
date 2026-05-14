import { api } from './api';
import type { Car, CarDetails } from '@/types/types';

export interface CarResponse {
  page: string;
  totalPages: number;
  cars: Car[];
}

export interface RequestRental {
  name: string;
  email: string;
  date: Date;
  comment?: string;
}

interface FetchCars {
  page: number;
  brand?: string;
  price?: string;
  minMileage?: number;
  maxMileage?: number;
}

export async function getBrands(): Promise<string[]> {
  const res = await api.get<string[]>('/brands');
  return res.data;
}

export async function getCars({
  page,
  brand,
  price,
  minMileage,
  maxMileage,
}: FetchCars): Promise<CarResponse> {
  const isBrand = brand != 'All';
  const isPrice = price != '';
  const isMin = minMileage != 0;
  const isMax = maxMileage != 0;

  const res = await api.get('/cars', {
    params: {
      ...(isBrand && { brand }),
      ...(isPrice && { price }),
      ...(isMin && { minMileage }),
      ...(isMax && { maxMileage }),
      perPage: 12,
      page,
    },
  });
  return res.data;
}

export async function getCar(id: string): Promise<CarDetails> {
  const res = await api.get(`/cars/${id}`);
  return res.data;
}

export async function blocingCar(
  data: RequestRental,
  id: string
): Promise<string> {
  const res = await api.post(`/cars/${id}/booking-requests`, data);
  return res.data;
}
