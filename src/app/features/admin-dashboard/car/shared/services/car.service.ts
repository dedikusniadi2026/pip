import { Injectable } from '@angular/core';
import { CAR_DATA, Car } from '../../../../../core/mock/cars.mock';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private cars = CAR_DATA;

  getCars() {
    return this.cars;
  }

  addCar(car: Car) {
    this.cars.push(car);
  }
}
