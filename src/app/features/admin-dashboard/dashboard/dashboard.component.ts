import { Component, OnInit } from '@angular/core';
import { BookingTrendsChartComponent } from './component/booking-trends-chart/booking-trends-chart.component';
import { PopularDestinationsComponent } from "./component/popular-destination/popular-destination.component";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    imports: [BookingTrendsChartComponent, PopularDestinationsComponent]
})
export class DashboardComponent implements OnInit {
    
    constructor() { }

    ngOnInit(): void {
       
    }

}