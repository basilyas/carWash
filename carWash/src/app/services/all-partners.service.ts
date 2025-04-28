import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Partner {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  phoneNumber: string;
  isAdmin: boolean;
  isApproved: boolean;
  isSuspended: boolean;
  displayName: string;
  stars: number;
  reviews: number;
}

@Injectable({
  providedIn: 'root'
})
export class AllPartnersService {
  private readonly apiUrl = '/api/administrator/getAllPartners';

  constructor(private http: HttpClient) {}

  getAllPartners(): Observable<Partner[]> {
    const token = localStorage.getItem('authToken') || '';

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<Partner[]>(this.apiUrl, {}, { headers }).pipe(
      catchError(error => {
        console.error('Fetch partners error:', error);
        return throwError(() => error);
      })
    );
  }
}
