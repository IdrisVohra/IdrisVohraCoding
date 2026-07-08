export type Transmission = 'Manual' | 'Automatic';
export type FuelType = 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
export type CarCategory = 'Hatchback' | 'Sedan' | 'SUV' | 'Compact';

export interface Car {
  id: string;
  name: string;
  model: string;
  brand: string;
  category: CarCategory;
  regNumber: string;
  pricePerDay: number;
  pricePerHour: number;
  image: string;
  year: number;
  seats: number;
  doors: number;
  transmission: Transmission;
  fuel: FuelType;
  ac: boolean;
  rating: number;
  description: string;
}
