import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Driver } from '../../../../../core/models/driver.model';

@Component({
  selector: 'app-driver-review-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './driver-review-modal.component.html',
  styleUrls: ['./driver-review-modal.component.scss']
})
export class DriverReviewModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { driver: Driver },
    public dialogRef: MatDialogRef<DriverReviewModalComponent>  ) {}

  close() {
    this.dialogRef.close();
  }

  approve() {
    this.dialogRef.close({ action: 'approve', driverId: this.data.driver.driverId });
  }

  reject() {
    this.dialogRef.close({ action: 'reject', driverId: this.data.driver.driverId });
  }
}
