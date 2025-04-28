import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { CommonModule } from '@angular/common';
import { SuspendUserComponent } from './components/suspend-user/suspend-user.component';
import { AllPartnersComponent } from './components/all-partners/all-partners.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
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
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule,HttpClientModule , LoginComponent,SuspendUserComponent,AllPartnersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'carWash';
}
