import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Booking } from '../../shared/models/booking.model';
import { ViewBookingComponent } from '../../dialog/view-booking/view-booking.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
selector: 'app-booking-card',
standalone: true,
imports: [CommonModule],
templateUrl: './booking-card.component.html',
})
export class BookingCardComponent {
@Input() booking!: Booking;
readonly dialog = inject(MatDialog);

statusClasses(status: Booking['status']) {
    switch (status) {
    case 'Confirmed': return 'bg-emerald-500 text-white';
    case 'Pending': return 'bg-amber-400 text-slate-900';
    case 'In progress': return 'bg-orange-400 text-slate-900';
    default: return '';
  }
}

 ViewDialog(id: string) {
  const dialogRef = this.dialog.open(ViewBookingComponent, {
    width: '600px', 
    height: 'auto',
    maxWidth: '90vw',
    data: id
  });
 }

paymentClasses(payment: Booking['payment']) {
    return payment === 'paid' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700';
}
}