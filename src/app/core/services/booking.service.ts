import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Booking } from '../models/booking.model';
import { BOOKINGS_MOCK } from '../mock/bookings.mock';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private bookingsSubject = new BehaviorSubject<Booking[]>(BOOKINGS_MOCK);

  getBookings(): Observable<Booking[]> {
    return this.bookingsSubject.asObservable();
  }

  verifyPayment(bookingId: string, verified: boolean): Observable<Booking> {
    const booking = this.bookingsSubject.value.find(b => b.id === bookingId);
    if (booking) booking.paymentStatus = verified ? 'TransferVerified' : 'ProofUploaded';
    this.bookingsSubject.next(this.bookingsSubject.value);
    return of(booking!);
  }
}
