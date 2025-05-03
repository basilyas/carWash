import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Question {
  id: string;
  text: string;
  type: number;
  expectedAnswer: string;
  mandatory: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private baseUrl = '/api/administrator/package/questions/update';

  constructor(private http: HttpClient) {}

  updateQuestions(partnerId: string, packageId: string, data: any): Observable<string> {
    let token = localStorage.getItem('authToken') || '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const params = new HttpParams()
      .set('partnerId', partnerId)
      .set('packageId', packageId);

    return this.http.post<string>(this.baseUrl, data, { headers, params });
  }

}
