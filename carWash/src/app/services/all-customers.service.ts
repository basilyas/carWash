import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Customer {
  id: string;
  methodUID: string;
  name: string;
  email: string;
  photoUrl: string;
  phoneNumber: string;
  displayName: string;
  fcmToken: string;
  isAdmin: boolean;
  isApproved: boolean;
  isSuspended: boolean;
  isPhoneVerified: string;
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class AllCustomersService {
  private apiUrl = '/api/administrator/getAllCustomers';

  constructor(private http: HttpClient) {}

  getAllCustomers(): Observable<Customer[]> {
    let token = '';

    if (typeof window !== 'undefined') {
      token = localStorage.getItem('authToken') || '';
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<Customer[]>(this.apiUrl, {}, { headers }).pipe(
      catchError((error) => {
        console.error('Fetch customers error:', error);
        return throwError(() => error);
      })
    );
  }
}
