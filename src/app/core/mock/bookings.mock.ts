import { Booking } from '../models/booking.model';

export const BOOKINGS_MOCK: Booking[] = [
  { id: 'b1', touristName: 'Alice', driverName: 'Asep Koswara', pickupLocation: 'Hotel XYZ', dropoffLocation: 'Airport', date: '2025-11-06T09:00:00', status: 'Pending', paymentStatus: 'ProofUploaded', paymentProofUrl: '' },
  { id: 'b2', touristName: 'Charlie', driverName: 'Dedi Kusniadi', pickupLocation: 'Station ABC', dropoffLocation: 'City Center', date: '2025-11-06T14:00:00', status: 'Confirmed', paymentStatus: 'CashPaid' }
];
