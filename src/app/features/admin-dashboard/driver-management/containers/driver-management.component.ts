import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddDialog } from '../dialog/add/add.component';
import { DriverService } from '../shared/services/driver.service';
interface Driver {
  showDropdown: boolean;
  id: number;
  name: string;
  car: string;
  email: string;
  phone: string;
  rating: number;
  trips: number;
  status: 'Active' | 'Busy' | 'InActive';
  avatar?: string;
}

@Component({
  selector: 'app-drivers-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './driver-management.component.html'
})
export class DriversManagementComponent {
  searchTerm = '';

  readonly dialog = inject(MatDialog);

  constructor(public driverService: DriverService) { }

  drivers: Driver[] = [
    {
      id: 1,
      name: 'Ahmad Rizki',
      car: 'Toyota Innova',
      email: 'ahmad.rizki@email.com',
      phone: '+62 812-3456-7890',
      rating: 4.8,
      trips: 156,
      status: 'Active',
      avatar: 'https://avatar.iran.liara.run/username?username=ahmad+rizki',
      showDropdown: false
    },
    {
      id: 2,
      name: 'Budi Gunawan',
      car: 'Honda Mobilio',
      email: 'budi.santoso@email.com',
      phone: '+62 813-4567-8901',
      rating: 4.9,
      trips: 203,
      status: 'Active',
      avatar: 'https://avatar.iran.liara.run/username?username=budi+gunawan',
      showDropdown: false
    },
    {
      id: 3,
      name: 'Dedi Kurniawan',
      car: 'Suzuki Ertiga',
      email: 'dedi.k@email.com',
      phone: '+62 814-5678-9012',
      rating: 4.7,
      trips: 134,
      status: 'Busy',
      avatar: 'https://avatar.iran.liara.run/username?username=dedi+kurniawan',
      showDropdown: false
    }
  ];

  newDriver: Partial<Driver> = {};

  get filteredDrivers() {
    return this.drivers.filter(d =>
      d.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  addDriver() {
    if (!this.newDriver.name || !this.newDriver.email) return;
    this.drivers.push({
      id: Date.now(),
      name: this.newDriver.name!,
      car: this.newDriver.car || '-',
      email: this.newDriver.email!,
      phone: this.newDriver.phone || '-',
      rating: 0,
      trips: 0,
      status: 'Active',
      showDropdown: false
    });
    this.newDriver = {};
  }

  deleteDriver(id: number) {
    this.drivers = this.drivers.filter(d => d.id !== id);
  }

toggleDropdown(driverId: number) {
  this.drivers = this.drivers.map(d => ({
    ...d,
    showDropdown: d.id === driverId ? !d.showDropdown : false
  }));
}

suspendDriver(id: number) {
  this.drivers = this.drivers.map(d =>
    d.id === id
      ? {
          ...d,
          status: d.status === 'InActive' ? 'Active' : 'InActive',
          showDropdown: false
        }
      : d
  );
}




AddDialog() {
  const dialogRef = this.dialog.open(AddDialog, {
    width: '600px',
    maxWidth: '90vw',
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {

      this.drivers.push({
        id: Date.now(),
        name: result.name,
        car: result.brand,
        email: result.email,
        phone: result.phone,
        rating: 0,
        trips: 0,
        status: result.status,
        avatar: `https://avatar.iran.liara.run/username?username=${result.name.replace(/\s+/g, '+')}`,
        showDropdown: false
      });

      console.log("Driver baru ditambahkan:", result);
    }
  });
}

}
