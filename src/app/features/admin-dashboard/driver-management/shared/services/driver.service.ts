import { Injectable } from '@angular/core';

export interface Driver {
  name: string;
  phone: string;
  email: string;
  address: string;
  sim: string;
  brand: string;
  platenumber: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class DriverService {

  private drivers: Driver[] = [
    {
      name: "Joko Santoso",
      phone: "08123456789",
      email: "joko@mail.com",
      address: "Jl ABC No 1",
      sim: "12345",
      brand: "Toyota Avanza",
      platenumber: "B1234AA",
      status: "Active"
    }
  ];

  getAllDrivers() {
    return this.drivers;
  }

  addDriver(driver: Driver) {
    this.drivers.push(driver);
  }
}
