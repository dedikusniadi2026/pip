import { Injectable, Inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tap } from 'rxjs/operators';
import { DriverService } from '../../../../core/services/driver.service';
import { Driver } from '../../../../core/models/driver.model';

export interface DriverState {
  drivers: Driver[];
  selectedDriver?: Driver;
}

@Injectable({ providedIn: 'root' }) 
export class DriverManagementPageStore extends ComponentStore<DriverState> {
  constructor(private driverService: DriverService) {
    super({ drivers: [] });
  }

  readonly drivers$ = this.select(state => state.drivers);
  readonly selectedDriver$ = this.select(state => state.selectedDriver);

 readonly loadDrivers = this.effect<void>(trigger$ =>
    trigger$.pipe(
      tap(() => {
        this.driverService.getDrivers().subscribe(drivers => {
          this.setState({ drivers });
        });
      })
    )
  );

  readonly selectDriver = this.updater((state, driver: Driver) => ({
    ...state,
    selectedDriver: driver
  }));

  readonly approveDriver = this.updater((state, driverId: string) => ({
    ...state,
    drivers: state.drivers.map(d =>
      d.driverId === driverId ? { ...d, contractStatus: 'Active' } : d
    )
  }));

  readonly rejectDriver = this.updater((state, payload: { driverId: string; reason: string }) => ({
    ...state,
    drivers: state.drivers.map(d =>
      d.driverId === payload.driverId ? { ...d, contractStatus: 'Rejected' as Driver['contractStatus'], notes: payload.reason } : d
    )
  }));

  readonly suspendDriver = this.updater((state, driverId: string) => ({
    ...state,
    drivers: state.drivers.map(d =>
      d.driverId === driverId ? { ...d, contractStatus: 'Suspended' as Driver['contractStatus'] } : d
    )
  }));

  readonly unsuspendDriver = this.updater((state, driverId: string) => ({
    ...state,
    drivers: state.drivers.map(d =>
      d.driverId === driverId ? { ...d, contractStatus: 'Active' } : d
    )
  }));
}
