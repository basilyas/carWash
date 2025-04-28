// src/app/services/suspend-user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SuspendUserService {
  private apiUrl = '/api/administrator/suspendUser';

  constructor(private http: HttpClient) {}

  suspendUser(userId: string, isSuspended: boolean): Observable<any> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = {
      userId: userId,
      isSuspended: isSuspended
    };

    // Send both query parameters AND body
    return this.http.post<any>(
      `${this.apiUrl}?userId=${userId}&isSuspended=${isSuspended}`,
      body,
      { headers }
    ).pipe(
      catchError((error) => {
        console.error('Suspend user error:', error);
        return throwError(() => error);
      })
    );
  }
}
