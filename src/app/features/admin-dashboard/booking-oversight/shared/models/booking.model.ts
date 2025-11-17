export interface Booking {
id: string;
customer: string;
driver: string;
place: string;
date: string;
price: number;
status: 'Confirmed' | 'Pending' | 'In progress';
payment: 'paid' | 'pending';
}