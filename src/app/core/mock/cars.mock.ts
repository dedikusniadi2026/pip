export interface Car {
  brand: string;
  model: string;
  year: string;
  platNumber: string;
  capacity: number;
  color: string;
  sim: string;
  last: string;
  km: number;
}

export const CAR_DATA: Car[] = [
  {
    brand: 'Toyota',
    model: 'Avanza',
    year: '2022',
    platNumber: 'B 1234 CD',
    capacity: 7,
    color: 'Silver',
    sim: 'ahmad',
    last: '2025-01-10',
    km: 4500
  }
];
