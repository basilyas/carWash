// app.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, NavigationEnd, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { CommonModule } from '@angular/common';
import { SuspendUserComponent } from './components/suspend-user/suspend-user.component';
import { AllPartnersComponent } from './components/all-partners/all-partners.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  imports: [
    RouterOutlet, 
    ReactiveFormsModule, 
    CommonModule,
    HttpClientModule, 
    LoginComponent,
    SuspendUserComponent,
    AllPartnersComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'carWash';
  showSidebar = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Hide sidebar and footer only on login page
      this.showSidebar = !event.url.includes('/login');
      
      // You can also check for specific routes if needed
      // this.showSidebar = !['/login', '/register', '/forgot-password'].includes(event.url);
    });
  }
}