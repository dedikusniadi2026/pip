import { Component, inject } from "@angular/core";
import { Booking } from "../../shared/models/booking.model";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BookingCardComponent } from "../../components/booking-card/booking-card.component";
import { MatDialog } from "@angular/material/dialog";
import { AddBookingComponent } from "../../dialog/add-booking/add-booking.component";

@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.scss'],
    standalone: true,
    imports: [CommonModule, FormsModule, BookingCardComponent],
})
export class BookingComponent {

search = '';
statusFilter: string = 'All Status';
readonly dialog = inject(MatDialog);

bookings: Booking[] = [
{ id: 'BK001', customer: 'Asep Setiawan', driver: 'Budi Gunawan', place: 'Beach Resort, Bali', date: '2025-11-15', price: 150000, status: 'Confirmed', payment: 'paid' },
{ id: 'BK002', customer: 'Eka Kurniawan', driver: 'Agung Nugroho', place: 'Mountain View Hotel', date: '2025-11-16', price: 120000, status: 'Pending', payment: 'pending' },
{ id: 'BK003', customer: 'Dwi Kurniawan', driver: 'Siti Nurmala', place: 'City Center Mall', date: '2025-11-14', price: 80000, status: 'In progress', payment: 'paid' },
];


get filtered() {
    const q = this.search.trim().toLowerCase();
    return this.bookings.filter(b => {
    if (this.statusFilter !== 'All Status' && b.status !== this.statusFilter) return false;
    if (!q) return true;
    return [b.id, b.customer, b.driver, b.place].some(field => field.toLowerCase().includes(q));
    });
}

AddDialog() {
  const dialogRef = this.dialog.open(AddBookingComponent, {
    width: '600px', 
    height: 'auto',
    maxWidth: '90vw',
  });

  dialogRef.afterClosed().subscribe((result: any) => {
    if (result) {
      this.bookings.push({
        id: `BK${(this.bookings.length + 1).toString().padStart(3, '0')}`,
        customer: result.customer,
        driver: result.driver,
        place: result.pickupLocation + ' → ' + result.dropoffLocation,
        date: result.date,
        price: result.amount,
        status: 'Pending',
        payment: result.payment === 'cash' ? 'paid' : 'pending',
      });

      console.log('New booking added:', result);
      console.log('All bookings:', this.bookings);
    }
  });
}

}