import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AllPartnersComponent } from './components/all-partners/all-partners.component';
import { authGuard } from './auth.guard';
import { AllCustomersComponent } from './components/all-customers/all-customers.component';
import { SystemStatisticsComponent } from './components/system-statistics/system-statistics.component';
import { AllReservationsComponent } from './components/all-reservations/all-reservations.component';
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'all_partners', pathMatch: 'full' },
      { path: 'all_partners', component: AllPartnersComponent },
      { path: 'all_customers', component: AllCustomersComponent },
      { path: 'system_statistics', component: SystemStatisticsComponent },
      { path: 'all_reservations', component: AllReservationsComponent },
    ],
    component: DashboardComponent
  }
];

