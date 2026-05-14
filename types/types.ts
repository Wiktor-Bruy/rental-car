export interface Car {
  id: string;
  img: string;
  brand: string;
  model: string;
  year: number;
  rentalPrice: string;
  address: string;
  rentalCompany: string;
  type: string;
  mileage: number;
}

export interface CarDetails {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: string;
  rentalCompany: string;
  address: string;
  rentalConditions: string[];
  mileage: number;
}
