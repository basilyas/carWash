import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// PartnerPackage Interface
export interface PartnerPackage {
  active: boolean;
  city: string;
  country: string;
  Region:string;
  countryCode: string;
  currency: string;
  extraDetails: {
    Caravans: string;
    PrivateCars: string;
    SUVs: string;
    VansOrSimilar: string;
  };
  duration: string;
  id: string;
  numberOfServices: string;
  packageDescription: string;
  packageName: string;
  priceDTO: {
    netPrice: number | null;
    price: number | null;
    salePercentage: number | null;
    salePrice: number | null;
    systemProfitPercentage: number;
    totalPrice: number | null;
    vat: number;
  };
  questions: any[]; // Update this if you expect a specific structure for the questions array
  regionDTOs: {
    city: string;
    country: string;
    countryCode: string;
    id: string;
  }[];
  serviceProducts: {
    id: string;
    productCode: string;
    internalID: string;
    name: string;
    description: string;
  }[];
  stockProducts: any[]; // Update this if you expect a specific structure for stockProducts
  vat: string;
}

@Injectable({
  providedIn: 'root'
})
export class PartnerPackagesService {

  private apiUrl = '/api/administrator/getPartnerPackages';

  constructor(private http: HttpClient) {}

  // Update return type to Observable<PartnerPackage[]>
  getPartnerPackages(partnerId: string): Observable<PartnerPackage[]> {
    if (!partnerId) {
      return throwError(() => new Error('Partner ID is required.'));
    }

    const token = localStorage.getItem('authToken') || '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const params = new HttpParams().set('partnerId', partnerId);

    // ✅ Send an empty object {} as body instead of null
    return this.http.post<PartnerPackage[]>(this.apiUrl, { id: partnerId }, { params, headers })
  .pipe(
    catchError(this.handleError)
  );


  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error fetching partner packages:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
