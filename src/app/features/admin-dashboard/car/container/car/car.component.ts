import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddCarDialogComponent } from '../../dialog/add/add.component';
import { FormsModule } from '@angular/forms';
import { CdkObserveContent } from "@angular/cdk/observers";
import { CarService } from '../../shared/services/car.service';
import { Car } from '../../../../../core/mock/cars.mock';
import { Router } from '@angular/router';

@Component({
    selector: 'app-car',
    templateUrl: './car.component.html',
    styleUrls: ['./car.component.scss'],
    standalone: true,
    imports: [CommonModule, FormsModule, MatDialogModule],
})
export class CarComponent {

  readonly dialog = inject(MatDialog);
  cars: Car[] = [];

  constructor(public carService: CarService,public router: Router) {
    this.cars = this.carService.getCars();
  }

     vehicles = [
      {
        name: 'Toyota Innova',
        year: 2022,
        plate: 'B 1234 XYZ',
        status: 'active',
        driver: 'Ahmad Rizki',
        capacity: '7 seats',
        color: 'Silver',
        mileage: '45,000 km',
        lastService: '2024-10-15'
      },
      {
        name: 'Honda Mobilio',
        year: 2021,
        plate: 'B 5678 ABC',
        status: 'active',
        driver: 'Budi gunawan',
        capacity: '7 seats',
        color: 'White',
        mileage: '52,000 km',
        lastService: '2024-10-20'
      },
      {
        name: 'Suzuki Ertiga',
        year: 2023,
        plate: 'B 9012 DEF',
        status: 'maintenance',
        driver: 'Dedi Kurniawan',
        capacity: '7 seats',
        color: 'Black',
        mileage: '28,000 km',
        lastService: '2024-11-05'
      }
  ];
    drivers: any;


  AddDialog() {
    const dialogRef = this.dialog.open(AddCarDialogComponent, {
      width: '600px',
      maxWidth: '90vw',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cars = [...this.carService.getCars()];
      }
    });
  }    


  viewDetails() {
    this.router.navigate(['/admin/car/detail']);
  }
}
