import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Partner {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  phoneNumber: string;
  displayName: string;
  stars: number;
  reviews: number;
  isApproved: boolean;
  isSuspended: boolean;
}

export interface PartnerExtraDetails {
  id: string;
  nickName: string;
  preferredPhoneNumber: string;
  locale: any;
  homeLatitude: number;
  homeLongitude: number;
  workLatitude: number;
  workLongitude: number;
  coverPhotoUrl: string;
  isPhoneVerified: string;
  regions: Array<{ id: string; countryCode: string; country: string; city: string }>;
  user: any;
  userExtraDetails: any;
}
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
export class PartnersService {
  private allPartnersUrl     = '/api/administrator/getAllPartners';
  private extraDetailsUrl    = '/api/administrator/getPartnerExtraDetails';
  private getPackagesUrl     = '/api/administrator/getPartnerPackages';
  private approveUserUrl     = '/api/administrator/approveUser';
  private suspendUserUrl     = '/api/administrator/suspendUser';
  private servicesUrl    = '/api/administrator/stor/services/get';
  private regionsUrl          = '/api/administrator/regions/get';
  private addPartnerPackageUrl = '/api/administrator/addPartnerPackage';
  private removePartnerPackageUrl = '/api/administrator/removePartnerPackage';
  private updateQuestionUrl = '/api/administrator/package/questions/update';


  constructor(private http: HttpClient) {}

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getAllPartners(): Observable<Partner[]> {
    return this.http.post<Partner[]>(this.allPartnersUrl, {}, { headers: this.authHeaders() });
  }

  getPartnerExtraDetails(partnerId: string): Observable<PartnerExtraDetails> {
    const params = new HttpParams().set('partnerId', partnerId);
    return this.http.post<PartnerExtraDetails>(
      this.extraDetailsUrl,
      {},
      { headers: this.authHeaders(), params }
    );
  }

  getPartnerPackages(partnerId: string): Observable<PartnerPackage[]> {
    const params = new HttpParams().set('partnerId', partnerId);
    return this.http.post<PartnerPackage[]>(
      this.getPackagesUrl,
      {},
      { headers: this.authHeaders(), params }
    );
  }

  approveUser(userId: string, isApproved: boolean): Observable<string> {
    const params = new HttpParams()
      .set('userId', userId)
      .set('isApproved', String(isApproved));
    return this.http.post<string>(
      this.approveUserUrl,
      {},
      { headers: this.authHeaders(), params, responseType: 'text' as 'json' }
    );
  }

  suspendUser(userId: string, isSuspended: boolean): Observable<string> {
    const params = new HttpParams()
      .set('userId', userId)
      .set('isSuspended', String(isSuspended));
    return this.http.post<string>(
      this.suspendUserUrl,
      {},
      { headers: this.authHeaders(), params, responseType: 'text' as 'json' }
    );
  }

  addPartnerPackage(partnerId: string, packageData: any): Observable<any> {

    const params = new HttpParams().set('partnerId', partnerId);
    return this.http.post(this.addPartnerPackageUrl, packageData, { headers: this.authHeaders(), params });
  }
  removePartnerPackage(partnerId: string, packageId: string): Observable<{}> {
  const params = new HttpParams()
    .set('partnerId', partnerId)
    .set('packageId', packageId);

  return this.http.post<{}>(
    this.removePartnerPackageUrl,
    {},
    { headers: this.authHeaders(), params }
  );
}
updateQuestion(
  partnerId: string,
  packageId: string,
  updatedQuestions: {
    id: string;
    text: string;
    type: number;
    expectedAnswer: string;
    mandatory: boolean;
  }[]
): Observable<string> {
  const params = new HttpParams()
    .set('partnerId', partnerId)
    .set('packageId', packageId);

  return this.http.post<string>(
    this.updateQuestionUrl,
    updatedQuestions,
    { headers: this.authHeaders(), params, responseType: 'text' as 'json' }
  );
}



}
