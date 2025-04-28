import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllReservationsService, Reservation } from '../../services/all-reservations.service';

@Component({
  selector: 'app-all-reservations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-reservations.component.html',
  styleUrls: ['./all-reservations.component.css']
})
export class AllReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  loading = true;
  errorMessage = '';

  constructor(private reservationService: AllReservationsService) {}

  ngOnInit(): void {
    this.fetchReservations();
  }

  private fetchReservations(): void {
    this.reservationService.getAllReservations().subscribe({
      next: (data: Reservation[]) => {
        this.reservations = data;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Failed to load reservations:', error);
        this.errorMessage = 'Failed to load reservations. Please try again later.';
        this.loading = false;
      }
    });
  }
  getStatusColor(status: string | undefined): string {
    if (!status) return 'inherit';

    switch (status.toUpperCase()) {
      case 'DONE':
        return '#4CAF50'; // soft green
      case 'UN_DONE':
        return '#f44336'; // soft red
      default:
        return 'inherit'; // default color
    }
  }

}
