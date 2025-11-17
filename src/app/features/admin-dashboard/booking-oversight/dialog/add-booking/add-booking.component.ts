import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import L from "leaflet";
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

@Component({
  selector: "app-add-booking",
  templateUrl: "./add-booking.component.html",
  styleUrls: ["./add-booking.component.scss"],
  imports: [MatDialogModule, MatButtonModule, CommonModule, ReactiveFormsModule, HttpClientModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBookingComponent {
  bookingForm: FormGroup;
  paymentTypes = ['Cash', 'Bank Transfer'];
  costPerKm = 10000;

  map!: L.Map;
  pickupMarker!: L.Marker;
  dropoffMarker!: L.Marker;
  routeLine!: L.Polyline;
  distanceKm: number = 0;
  estimatedCost: number = 0;

  pickupSuggestions: any[] = [];
  dropoffSuggestions: any[] = [];
  private resizeObserver?: ResizeObserver;

  bookings: any[] = [];

  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef<HTMLDivElement>;

  constructor(private http: HttpClient,private dialogRef: MatDialogRef<AddBookingComponent>) {
    this.bookingForm = new FormGroup({
      travelDate: new FormControl('', Validators.required),
      customer: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      driver: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      note: new FormControl(''),
      amount: new FormControl({ value: '', disabled: true }, Validators.required),
      payment: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email]),
      pickupLocation: new FormControl('', Validators.required),
      dropoffLocation: new FormControl('', Validators.required),
    });

    const DefaultIcon = L.icon({
      iconRetinaUrl: markerIcon2x as string,
      iconUrl: markerIcon as string,
      shadowUrl: markerShadow as string,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28]
    });
    (L.Marker.prototype as any).options.icon = DefaultIcon;
  }

  ngAfterViewInit(): void {
    this.map = L.map('map').setView([-6.200000, 106.816666], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    setTimeout(() => {
      this.initMap();
      this.map.invalidateSize(true);
    }, 50);

    if (this.mapContainer) {
      this.resizeObserver = new ResizeObserver(() => {
        if (this.map) this.map.invalidateSize();
      });
      this.resizeObserver.observe(this.mapContainer.nativeElement);
    }

    window.addEventListener('resize', this.onWindowResize);
  }

  private initMap() {
    if (this.map) return;
    this.map = L.map(this.mapContainer.nativeElement, {
      center: [-6.200000, 106.816666],
      zoom: 12,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.map.on('click', (e: any) => {
      const coords = e.latlng;
      if (!this.pickupMarker) this.addMarker(coords, 'pickup');
      else if (!this.dropoffMarker) this.addMarker(coords, 'dropoff');
    });
  }

  private onWindowResize = () => {
    if (this.map) this.map.invalidateSize();
  }

  addMarker(coords: L.LatLng, field: 'pickup' | 'dropoff') {
    const marker = L.marker(coords, { draggable: true }).addTo(this.map).bindPopup(field === 'pickup' ? 'Pickup' : 'Drop-off');

    marker.on('dragend', () => {
      const pos = marker.getLatLng();
      this.bookingForm.patchValue({ [field + 'Location']: `${pos.lat},${pos.lng}` });
      this.updateRoute();
    });

    if (field === 'pickup') {
      if (this.pickupMarker) this.map.removeLayer(this.pickupMarker);
      this.pickupMarker = marker;
    } else {
      if (this.dropoffMarker) this.map.removeLayer(this.dropoffMarker);
      this.dropoffMarker = marker;
    }

    this.bookingForm.patchValue({ [field + 'Location']: `${coords.lat},${coords.lng}` });
    this.updateRoute();
    this.fitMapBounds();
  }

  searchAddress(query: string, field: 'pickup' | 'dropoff') {
    if (query.length < 3) {
      if (field === 'pickup') this.pickupSuggestions = [];
      else this.dropoffSuggestions = [];
      return;
    }
    this.http.get<any[]>(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`)
      .subscribe(results => {
        if (field === 'pickup') this.pickupSuggestions = results;
        else this.dropoffSuggestions = results;
      });
  }

  selectSuggestion(loc: any, field: 'pickup' | 'dropoff') {
    const coords = { lat: parseFloat(loc.lat), lng: parseFloat(loc.lon) };
    this.addMarker(L.latLng(coords.lat, coords.lng), field);
    this.bookingForm.patchValue({ [field + 'Location']: loc.display_name });
    if (field === 'pickup') this.pickupSuggestions = [];
    else this.dropoffSuggestions = [];
  }

  fitMapBounds() {
    const markers = [];
    if (this.pickupMarker) markers.push(this.pickupMarker);
    if (this.dropoffMarker) markers.push(this.dropoffMarker);
    if (markers.length > 0) {
      const group = new L.FeatureGroup(markers);
      this.map.fitBounds(group.getBounds(), { padding: [50, 50] });
    }
  }

  updateRoute() {
    if (this.pickupMarker && this.dropoffMarker) {
      const latlngs = [this.pickupMarker.getLatLng(), this.dropoffMarker.getLatLng()];

      if (this.routeLine) this.map.removeLayer(this.routeLine);
      this.routeLine = L.polyline(latlngs, { color: 'blue', weight: 4 }).addTo(this.map);

      const R = 6371;
      const dLat = (latlngs[1].lat - latlngs[0].lat) * Math.PI / 180;
      const dLng = (latlngs[1].lng - latlngs[0].lng) * Math.PI / 180;
      const a = Math.sin(dLat / 2) ** 2 + Math.cos(latlngs[0].lat * Math.PI / 180) * Math.cos(latlngs[1].lat * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      this.distanceKm = Math.round(R * c * 100) / 100;

      this.estimatedCost = this.distanceKm * this.costPerKm;
      this.bookingForm.patchValue({ amount: this.estimatedCost });
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.bookingForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit() {
    // if (this.bookingForm.invalid) {
    //   this.bookingForm.markAllAsTouched();
    //   return;
    // }

    const bookingData = this.bookingForm.getRawValue();
    this.bookings.push(bookingData);

    console.log('Booking submitted:', bookingData);
    console.log('All bookings:', this.bookings);

    this.bookingForm.reset();
    this.bookingForm.patchValue({ amount: '' });
    if (this.pickupMarker) this.map.removeLayer(this.pickupMarker);
    if (this.dropoffMarker) this.map.removeLayer(this.dropoffMarker);
    if (this.routeLine) this.map.removeLayer(this.routeLine);
    this.pickupMarker = undefined!;
    this.dropoffMarker = undefined!;
    this.routeLine = undefined!;
    this.distanceKm = 0;
    this.estimatedCost = 0;

      this.dialogRef.close(bookingData); // opsional: bisa kirim data kembali ke parent

  }
}
