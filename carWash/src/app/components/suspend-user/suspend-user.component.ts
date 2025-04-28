import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SuspendUserService } from '../../services/suspend-user.service';

@Component({
  selector: 'app-suspend-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './suspend-user.component.html',
  styleUrl: './suspend-user.component.css'
})
export class SuspendUserComponent {
}
