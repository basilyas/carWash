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
  currency: string;
  extraDetails: Record<'additionalProp1' | 'additionalProp2' | 'additionalProp3', string>;
  serviceProducts: Product[];
  stockProducts: Product[];
  questions: Question[];
  regionDTOs: RegionDTO[];
  priceDTO: PriceDTO;
  active: boolean;
}

export interface Product {
  id: string;
  productCode: string;
  internalID: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  externalID: string;
  status: 'Publish' | string;
  salePercentage: number;
  systemProfitPercentage: number;
  generalCosts: number;
}

export interface Question {
  id: string;
  text: string;
  type: number;
  expectedAnswer: string;
  mandatory: boolean;
}

export interface RegionDTO {
  id: string;
  countryCode: string;
  country: string;
  city: string;
}

export interface PriceDTO {
  netPrice: number;
  totalPrice: number;
  price: number;
  salePrice: number;
  vat: number;
  systemProfitPercentage: number;
  salePercentage: number;
}
export interface ServiceRegionResponse {
  countryCode: string;
  country: string;
  city: string;
  vat: number;
  services: Product[];  // Product shape reused for services
  products: Product[];
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
  private servicesRegionsUrl    = '/api/administrator/stor/services/get';
  private regionsUrl          = '/api/administrator/regions/get';
  private addPartnerPackageUrl = '/api/administrator/addPartnerPackage';

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
  getServicesByRegions(regions: RegionDTO[]): Observable<ServiceRegionResponse[]> {
    return this.http.post<ServiceRegionResponse[]>(
      this.servicesRegionsUrl,
      regions,
      { headers: this.authHeaders() }
    );
  }
  getRegions(countryCode: string): Observable<RegionDTO[]> {
    const params = new HttpParams().set('countryCode', countryCode);
    console.log('getRegions POST to', this.regionsUrl, 'params=', params.toString());
    return this.http.post<RegionDTO[]>(
      this.regionsUrl,
      {},
      { headers: this.authHeaders(), params }
    );
  }
  addPartnerPackage(partnerId: string, pkg: PartnerPackage): Observable<string> {
    const url = `${this.addPartnerPackageUrl}?partnerId=${partnerId}`;
    console.log('addPartnerPackage URL:', url);
    console.log('addPartnerPackage body:', pkg);
    return this.http.post<string>(
      url,
      pkg,
      { headers: this.authHeaders(), responseType: 'text' as 'json' }
    );
  }
}
