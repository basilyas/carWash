// system-statistics.component.ts
import { Component, OnInit } from '@angular/core';
import { SystemStatisticsService, SystemStatistics } from '../../services/system-statistics.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-system-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './system-statistics.component.html',
  styleUrl: './system-statistics.component.css'
})
export class SystemStatisticsComponent implements OnInit {
  statistics: SystemStatistics | null = null;
  isLoading = false;
  errorMessage = '';
  lastUpdated: Date = new Date();

  constructor(private statisticsService: SystemStatisticsService) {}

  ngOnInit(): void {
    this.fetchStatistics();
  }

  fetchStatistics(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.statisticsService.getStatistics().subscribe({
      next: (data) => {
        this.statistics = data;
        this.isLoading = false;
        this.lastUpdated = new Date();
      },
      error: (err) => {
        this.errorMessage = 'Failed to load system statistics. Please try again.';
        this.isLoading = false;
      }
    });
  }

  // Utility Methods
  formatNumber(num: number): string {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  getLastUpdatedTime(): string {
    return this.lastUpdated.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  getProgressPercentage(value: number, target: number): number {
    return Math.min(Math.round((value / target) * 100), 100);
  }

  getReservationPercentage(value: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  }

  getActiveReservations(): number {
    if (!this.statistics) return 0;
    return this.statistics.totalReservations - this.statistics.closedReservations - this.statistics.problematicReservations;
  }

  getSuccessRate(): number {
    if (!this.statistics || this.statistics.totalReservations === 0) return 0;
    return Math.round((this.statistics.closedReservations / this.statistics.totalReservations) * 100);
  }

  getAveragePartnersPerCustomer(): number {
    if (!this.statistics || this.statistics.customersNumber === 0) return 0;
    return Number((this.statistics.partnersNumber / this.statistics.customersNumber).toFixed(2));
  }

  getReservationsPerCar(): number {
    if (!this.statistics || this.statistics.carsNumber === 0) return 0;
    return Number((this.statistics.totalReservations / this.statistics.carsNumber).toFixed(1));
  }
}