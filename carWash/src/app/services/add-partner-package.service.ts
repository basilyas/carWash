import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddPartnerPackageService {
  private readonly apiUrl = '/api/administrator/addPartnerPackage';

  constructor(private http: HttpClient) {}

  addPartnerPackage(partnerId: string, packageData: any): Observable<string> {
    const token = localStorage.getItem('authToken'); // or sessionStorage, depending on where you store it

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const params = new HttpParams().set('partnerId', partnerId);

    return this.http.post<string>(this.apiUrl, packageData, { params, headers });
  }
}
