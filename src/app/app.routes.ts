import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/admin-dashboard/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { DriversManagementComponent } from './features/admin-dashboard/driver-management/containers/driver-management.component';
import { RequestBookingComponent } from './features/admin-customer/request-booking/request-booking.component';
import { BookingComponent } from './features/admin-dashboard/booking-oversight/containers/booking/booking.component';
import { PaymentComponent } from './features/admin-dashboard/payment/containers/payment/payment.component';
import { TripHistoryComponent } from './features/admin-dashboard/trip-history/containers/trip-history.component';
import { CarComponent } from './features/admin-dashboard/car/container/car/car.component';
import { DetailComponent } from './features/admin-dashboard/car/component/detail/detail.component';

export const routes: Routes = [
{ path: 'login', component: LoginComponent },
    {path: 'admin',
            component:LayoutComponent,
            canActivate:[authGuard],
            children:[
                {path: 'dashboard', component:DashboardComponent},
                {path: 'drivers', component: DriversManagementComponent},
                {path: 'booking', component: BookingComponent},
                {path: 'payment', component: PaymentComponent},
                {path: 'history', component: TripHistoryComponent},
                {path:'car', component:CarComponent},
                {path: 'car/detail', component: DetailComponent},
                {path: 'booking-customers', component: RequestBookingComponent},
                { path: '', redirectTo: 'dashboard', pathMatch: 'full' } 
            ]
        },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];
