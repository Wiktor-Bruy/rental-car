export interface Location {
  country: string;
  city: string;
  address: string;
}

export interface Car {
  id: string;
  img: string;
  brand: string;
  model: string;
  year: number;
  rentalPrice: string;
  location: Location;
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
  fuelConsumption: number;
  engineSize: string;
  rentalPrice: string;
  rentalCompany: string;
  rentalConditions: string[];
  mileage: number;
  stockNumber: number;
  features: string[];
  location: Location;
}
