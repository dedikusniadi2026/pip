export interface Booking {
id: string;
touristName: string;
driverName: string;
pickupLocation: string;
dropoffLocation: string;
date: string;
status: 'Pending' | 'Confirmed' | 'InProgress' | 'Completed' | 'Cancelled';
paymentStatus: 'Unpaid' | 'ProofUploaded' | 'CashPaid' | 'TransferVerified';
paymentProofUrl?: string;
}