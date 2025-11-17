import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';
import { DriverService } from "../../shared/services/driver.service";

@Component({
  selector: 'add-dialog',
  templateUrl: './add.component.html',
  standalone: true,
  imports: [
    MatDialogModule, 
    MatButtonModule,
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddDialog {
  form: any;
  constructor(
    public fb: FormBuilder,
    private dialogRef: MatDialogRef<AddDialog>,
    private driverService: DriverService
  ) {

    this.form = this.fb.group({
    name: [''],
    phone: [''],
    email: [''],
    address: [''],
    sim: [''],
    brand: [''],
    platnumber: [''],
    status: ['Active'],
  });
  }

  save() {
    if (this.form.valid) {
      this.driverService.addDriver(this.form.value);
      this.dialogRef.close(this.form.value);
    }
  }
}
