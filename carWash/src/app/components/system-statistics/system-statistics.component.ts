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

  constructor(private statisticsService: SystemStatisticsService) {}

  ngOnInit(): void {
    this.fetchStatistics();
  }

  fetchStatistics(): void {
    this.isLoading = true;
    this.statisticsService.getStatistics().subscribe({
      next: (data) => {
        this.statistics = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load system statistics.';
        this.isLoading = false;
      }
    });
  }
}
