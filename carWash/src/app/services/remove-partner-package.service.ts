import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RemovePartnerPackageService {
  private apiUrl = '/api/administrator/removePartnerPackage';

  constructor(private http: HttpClient) {}

  removePackage(partnerId: string, packageId: string): Observable<{}> {
    let token = localStorage.getItem('authToken') || '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const params = new HttpParams()
      .set('partnerId', partnerId)
      .set('packageId', packageId);

    return this.http.post<{}>(this.apiUrl, null, {headers, params });
  }
}
