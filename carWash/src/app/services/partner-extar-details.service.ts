// partner-extra-details.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PartnerExtraDetailsService {

  private apiUrl = '/api/administrator/getPartnerExtraDetails';

  constructor(private http: HttpClient) {}

  getPartnerExtraDetails(partnerId: string): Observable<any> {
    const token = localStorage.getItem('authToken') || '';

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const params = new HttpParams().set('partnerId', partnerId);

    return this.http.post<any>(this.apiUrl, null, { params, headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error fetching partner extra details:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
