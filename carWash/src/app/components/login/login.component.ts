import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./login.component.css'],
  standalone: true
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  login() {
    this.loginService.login(this.username, this.password).subscribe({
      next: (res) => {
        console.log('Login success:', res);
        localStorage.setItem('authToken', res.token); // or whatever the token field is
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = 'Login failed: Invalid username or password';
        console.error('Login error:', err);
      }
    });
  }
}
