import { Component } from '@angular/core';
import { ChartOptions, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-popular-destinations',
  templateUrl: './popular-destination.component.html',
  styleUrls: ['./popular-destination.component.scss'],
  standalone: true,
    imports: [BaseChartDirective],

})
export class PopularDestinationsComponent {
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 160,
        ticks: {
          stepSize: 40
        }
      }
    }
  };

  public barChartData: ChartData<'bar'> = {
    labels: ['Bali', 'Jakarta', 'Yogyakarta', 'Bandung', 'Surabaya'],
    datasets: [
      {
        data: [150, 130, 95, 85, 75],
        backgroundColor: '#0066A1',
        borderRadius: 5,
      },
    ],
  };

   public barChartType: 'bar' = 'bar';

}
