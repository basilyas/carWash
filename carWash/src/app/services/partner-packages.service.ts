import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// PartnerPackage Interface
export interface PartnerPackage {
  id: string;
  vat: string;
  country: string;
  countryCode: string;
  city: string;
  packageName: string;
  packageDescription: string;
  currency: string;
  duration: string;
  numberOfServices: string;
  active: boolean;

  extraDetails: {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string;
  };

  priceDTO: {
    netPrice: number;
    totalPrice: number;
    price: number;
    salePrice: number;
    vat: number;
    systemProfitPercentage: number;
    salePercentage: number;
  };

  questions: {
    id?: string;
    text: string;
    type: number;
    expectedAnswer: string;
    mandatory: boolean;
  }[];

  serviceProducts: {
    id: string;
    productCode: string;
    internalID: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    externalID: string;
    status: string;
    salePercentage: number;
    systemProfitPercentage: number;
    generalCosts: number;
  }[];

  stockProducts: {
    id: string;
    productCode: string;
    internalID: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    externalID: string;
    status: string;
    salePercentage: number;
    systemProfitPercentage: number;
    generalCosts: number;
  }[];

  regionDTOs: {
    id: string;
    countryCode: string;
    country: string;
    city: string;
  }[];
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
