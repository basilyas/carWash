// navbar.component.ts
import { Component, VERSION } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showAboutModal = false;
  angularVersion = VERSION.full;

  openAbout(event: Event): void {
    event.preventDefault();
    this.showAboutModal = true;
  }

  closeAbout(): void {
    this.showAboutModal = false;
  }
}