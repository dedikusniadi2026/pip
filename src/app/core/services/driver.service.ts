import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ContractStatus, Driver } from '../models/driver.model';
import { DRIVERS_MOCK } from '../mock/drivers.mock';

@Injectable({ providedIn: 'root' })
export class DriverService {
  private driversSubject = new BehaviorSubject<Driver[]>(DRIVERS_MOCK);

  getDrivers(): Observable<Driver[]> {
    return this.driversSubject.asObservable();
  }

 approveDriver(driverId: string): Observable<Driver | undefined> {
  const drivers = this.driversSubject.value.map(d =>
    d.driverId === driverId
      ? { ...d, contractStatus: 'Active' as ContractStatus }
      : d
  );
  this.driversSubject.next(drivers);
  return of(drivers.find(d => d.driverId === driverId));
}

  rejectDriver(driverId: string, reason: string): Observable<Driver | undefined> {
    const drivers = this.driversSubject.value.map(d =>
      d.driverId === driverId ? { ...d, contractStatus: 'Rejected' as ContractStatus, notes: reason } : d
    );
    this.driversSubject.next(drivers);
    return of(drivers.find(d => d.driverId === driverId));
  }

  suspendDriver(driverId: string): Observable<Driver | undefined> {
    const drivers = this.driversSubject.value.map(d =>
      d.driverId === driverId ? { ...d, contractStatus: 'Suspended' as ContractStatus } : d
    );
    this.driversSubject.next(drivers);
    return of(drivers.find(d => d.driverId === driverId));
  }

  unsuspendDriver(driverId: string): Observable<Driver | undefined> {
    const drivers = this.driversSubject.value.map(d =>
      d.driverId === driverId ? { ...d, contractStatus: 'Active' as ContractStatus } : d
    );
    this.driversSubject.next(drivers);
    return of(drivers.find(d => d.driverId === driverId));
  }
}
