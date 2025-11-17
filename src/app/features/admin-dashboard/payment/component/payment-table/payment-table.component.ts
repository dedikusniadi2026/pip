import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-payment-table',
    templateUrl: './payment-table.component.html',
    styleUrls: ['./payment-table.component.scss'],
     standalone: true,
    imports: [CommonModule],
})
export class PaymentTableComponent {
    paymentData = [
    {
      paymentId: 'PAY-001',
      bookingId: 'BK-001',
      customer: 'Sarah Johnson',
      driver: 'Ahmad Rizki',
      amount: 350000,
      method: 'cash',
      status: 'paid',
      date: '2024-11-10'
    },
    {
      paymentId: 'PAY-002',
      bookingId: 'BK-002',
      customer: 'Michael Chen',
      driver: 'Budi gunawan',
      amount: 150000,
      method: 'transfer',
      status: 'pending',
      date: '2024-11-11'
    },
    {
      paymentId: 'PAY-003',
      bookingId: 'BK-003',
      customer: 'Emma Wilson',
      driver: 'Faisal Abdullah',
      amount: 200000,
      method: 'cash',
      status: 'pending',
      date: '2024-11-12'
    },
    {
      paymentId: 'PAY-004',
      bookingId: 'BK-004',
      customer: 'David Lee',
      driver: 'Dedi Kurniawan',
      amount: 400000,
      method: 'transfer',
      status: 'paid',
      date: '2024-11-08'
    },
    {
      paymentId: 'PAY-005',
      bookingId: 'BK-006',
      customer: 'James Anderson',
      driver: 'Budi gunawan',
      amount: 180000,
      method: 'cash',
      status: 'paid',
      date: '2024-11-09'
    }
  ];
}