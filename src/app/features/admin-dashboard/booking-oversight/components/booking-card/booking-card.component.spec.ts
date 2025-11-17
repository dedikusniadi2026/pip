import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingCardComponent } from './booking-card.component';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Booking } from '../../shared/models/booking.model';

describe('BookingCardComponent', () => {
  let component: BookingCardComponent;
  let fixture: ComponentFixture<BookingCardComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  const mockBooking: Booking = {
    id: '123',
    customer: 'John Doe',
    driver: 'Location A',
    place: 'Location B',
    date: '2025-01-01',
    price: 100,
    status: 'Confirmed',
    payment: 'paid'
  };

  beforeEach(async () => {
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    dialogSpy.open.and.returnValue({
      afterClosed: () => of(true)
    } as any);

    await TestBed.configureTestingModule({
      imports: [BookingCardComponent],
      providers: [
        { provide: MatDialog, useValue: dialogSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookingCardComponent);
    component = fixture.componentInstance;
    component.booking = mockBooking;
    fixture.detectChanges();
  });

  it('should return correct classes for Confirmed status', () => {
    expect(component.statusClasses('Confirmed'))
      .toBe('bg-emerald-500 text-white');
  });

  it('should return correct classes for Pending status', () => {
    expect(component.statusClasses('Pending'))
      .toBe('bg-amber-400 text-slate-900');
  });

  it('should return correct classes for In progress status', () => {
    expect(component.statusClasses('In progress'))
      .toBe('bg-orange-400 text-slate-900');
  });

  it('should return empty string for unknown status', () => {
    expect(component.statusClasses('Unknown' as any))
      .toBe('');
  });

  it('should return correct classes when payment is paid', () => {
    expect(component.paymentClasses('paid'))
      .toBe('bg-teal-600 text-white');
  });

  it('should return correct classes when payment is unpaid', () => {
    expect(component.paymentClasses('unpaid' as any))
      .toBe('bg-slate-100 text-slate-700');
  });

  it('should open dialog when ViewDialog is called', () => {
    component.ViewDialog('123');
    expect(dialogSpy.open).toHaveBeenCalled();
  });

//   it('should pass correct ID to dialog', () => {
//     component.ViewDialog('123');
//     const args = dialogSpy.open.calls.mostRecent().args[1];
//     expect(args.data).toBe('123');
//   });
});
