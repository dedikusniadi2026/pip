import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Driver } from '../../../../../core/models/driver.model';

@Component({
  selector: 'app-driver-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './driver-table.component.html'
})
export class DriverTableComponent {
  @Input() drivers: Driver[] = [];
  @Output() approve = new EventEmitter<string>();
  @Output() reject = new EventEmitter<{ driverId: string; reason: string }>();
  @Output() suspend = new EventEmitter<string>();
  @Output() unsuspend = new EventEmitter<string>();
  @Output() review = new EventEmitter<Driver>();

  searchTerm: string = '';
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  sort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  

}
