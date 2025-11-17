import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentTableComponent } from "../../component/payment-table/payment-table.component";

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss'],
    standalone: true,
    imports: [CommonModule, PaymentTableComponent],
})
export class PaymentComponent {
     
}