import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CarService } from '../../shared/services/car.service';
import { MatButtonModule } from '@angular/material/button';
import { Car } from '../../../../../core/mock/cars.mock';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
      standalone: true,
   imports: [
    MatDialogModule, 
    MatButtonModule,
    ReactiveFormsModule
  ],
})
export class AddCarDialogComponent {

  fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<AddCarDialogComponent>);
  carService = inject(CarService);

  form = this.fb.group({
    brand: ['', Validators.required],
    model: ['', Validators.required],
    year: ['', Validators.required],
    platNumber: ['', Validators.required],
    capacity: ['', Validators.required],
    color: ['', Validators.required],
    sim: ['', Validators.required],
    last: ['', Validators.required],
    km: ['', Validators.required]
  });

onAdd() {
  if (this.form.invalid) return;

  const payload = {
    brand: this.form.value.brand ?? '',
    model: this.form.value.model ?? '',
    year: this.form.value.year ?? '',
    platNumber: this.form.value.platNumber ?? '',
    capacity: Number(this.form.value.capacity ?? 0),
    color: this.form.value.color ?? '',
    sim: this.form.value.sim ?? '',
    last: this.form.value.last ?? '',
    km: Number(this.form.value.km ?? 0),
  } as Car;


  console.log('Payload:', payload);

  this.carService.addCar(payload);
  this.dialogRef.close(true);
}

}
