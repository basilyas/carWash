import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const url = `/api/authorization/administrator/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

    return this.http.post(url, {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Login error:', error);
        return throwError(() => error);
      })
    );
  }

}
