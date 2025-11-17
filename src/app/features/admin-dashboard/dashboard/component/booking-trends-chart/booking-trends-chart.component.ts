import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-booking-trends-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-trends-chart.component.html',
  styleUrls: ['./booking-trends-chart.component.scss']
})
export class BookingTrendsChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chartRef', { static: true }) chartRef!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  ngAfterViewInit(): void {
    const ctx = this.chartRef.nativeElement.getContext('2d')!;

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(0, 112, 192, 0.35)');
    gradient.addColorStop(1, 'rgba(0, 112, 192, 0.02)');

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          'Jan','Feb','Mar','Apr','May','Jun',
          'Jul','Aug','Sep','Oct','Nov','Dec'
        ],
        datasets: [
          {
            label: 'Bookings',
            data: [60, 78, 90, 82, 95, 110, 130, 145, 135, 150, 160, 178],
            fill: true,
            backgroundColor: gradient,
            borderColor: '#0066A1',
            borderWidth: 2,
            tension: 0.35,
            pointRadius: 0,
            pointHoverRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        hover: {
          mode: 'index',
          intersect: false
        },

        scales: {
          x: {
            grid: {
              color: 'rgba(0,0,0,0.08)',
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0,0,0,0.08)',
            },
            ticks: {
              stepSize: 45
            }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            intersect: false,
            mode: 'index'
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.chart) this.chart.destroy();
  }
}
