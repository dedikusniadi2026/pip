import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";

@Component({
    selector: "app-view-booking",
    templateUrl: "./view-booking.component.html",
    styleUrls: ["./view-booking.component.scss"],
    imports: [MatDialogModule, MatButtonModule,CommonModule,ReactiveFormsModule,HttpClientModule],
    standalone: true
})
export class ViewBookingComponent {}