import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DashboardComponent } from "./dashboard.component";
import { BookingTrendsChartComponent } from "./component/booking-trends-chart/booking-trends-chart.component";
import { PopularDestinationsComponent } from "./component/popular-destination/popular-destination.component";

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DashboardComponent,BookingTrendsChartComponent,PopularDestinationsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should run ngOnit wirthout errors', () => {
        expect(() => {
            component.ngOnInit();
        }).not.toThrow();
    });

    it('should render booking-trends-chart', () => {
        const fixture = TestBed.createComponent(DashboardComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('app-booking-trends-chart')).toBeTruthy();
    });

    it('should render popular-destination', () => {
        const fixture = TestBed.createComponent(DashboardComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('app-popular-destinations')).toBeTruthy();
    });
})