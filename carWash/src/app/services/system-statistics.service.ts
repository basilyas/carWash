import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface SystemStatistics {
  customersNumber: number;
  partnersNumber: number;
  carsNumber: number;
  totalReservations: number;
  problematicReservations: number;
  closedReservations: number;
}

@Injectable({
  providedIn: 'root'
})
export class SystemStatisticsService {
  private apiUrl = '/api/administrator/statistics/systemStatistics';

  constructor(private http: HttpClient) {}

  getStatistics(): Observable<SystemStatistics> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<SystemStatistics>(this.apiUrl, {}, { headers }).pipe(
      catchError((error) => {
        console.error('Statistics fetch failed:', error);
        return throwError(() => error);
      })
    );
  }

}
