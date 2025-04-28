import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export interface Reservation {
  id: string;
  number: number;
  latitude: number;
  longitude: number;
  arrivalTimeFrom: string;
  arrivalTimeTo: string;
  reservationPaymentToken: string;
  isTimePassedChecked: boolean;
  isPartnerResponseTimePassedChecked: boolean;
  isPendingPayment: boolean;
  lastPartnerAssignTime: string;
  description: string;
  taskObject: TaskObject;
  feedback: Feedback;
  reservationEvents: ReservationEvent[];
  transactions: Transaction[];
  customer: User;
  active: boolean;
  timePassedChecked: boolean;
  partnerResponseTimePassedChecked: boolean;
  totalItemsPrice: number;
  pendingPayment: boolean;
  totalTransactionsAmount: number;
  lastReservationEvents: ReservationEvent;
  assignedPartners: User[];
}

export interface TaskObject {
  id: string;
  nickName: string;
  extraDetails: ExtraDetail[];
}

export interface ExtraDetail {
  id: string;
  propertyKey: string;
  propertyValue: string;
  taskObject: string;
}

export interface Feedback {
  id: string;
  message: string;
  feedbackType: string;
  messageOfPartner: string;
  feedbackTypeOfPartner: string;
  feedbackStars: string;
  partnerLatitude: number;
  partnerLongitude: number;
  created: string;
}

export interface ReservationEvent {
  id: string;
  partnerId: string;
  customerId: string;
  reservationStatus: string;
  statusColor: string;
  statusText: string;
  statusExtraText: string;
  created: string;
}

export interface Transaction {
  amount: TransactionAmount;
  description: string;
  related_resources: any; 
}

export interface TransactionAmount {
  currency: string;
  details: {
    subtotal: string;
    shipping: string;
    shipping_discount: string;
  };
  total: string;
}

export interface User {
  id: string;
  methodUID: string;
  name: string;
  email: string;
  photoUrl: string;
  utcTimeZoneOffset: UtcTimeZoneOffset;
  fcmToken: string;
  isAdmin: boolean;
  isApproved: boolean;
  isSuspended: boolean;
  phoneNumber: string;
  isPhoneVerified: string;
  number: number;
  displayName: string;
  stars?: number;
  reviews?: number;
  sendViaWhatsApp?: boolean;
  sendViaNotification?: boolean;
}

export interface UtcTimeZoneOffset {
  totalSeconds: number;
  id: string;
  rules: UtcTimeZoneRules;
}

export interface UtcTimeZoneRules {
  fixedOffset: boolean;
  transitions: Transition[];
  transitionRules: TransitionRule[];
}

export interface Transition {
  offsetBefore: Offset;
  offsetAfter: Offset;
  duration: Duration;
  gap: boolean;
  dateTimeAfter: string;
  dateTimeBefore: string;
  overlap: boolean;
  instant: string;
}

export interface Offset {
  totalSeconds: number;
  id: string;
}

export interface Duration {
  seconds: number;
  zero: boolean;
  nano: number;
  negative: boolean;
  units: DurationUnit[];
}

export interface DurationUnit {
  durationEstimated: boolean;
  timeBased: boolean;
  dateBased: boolean;
}

export interface TransitionRule {
  month: string;
  timeDefinition: string;
  standardOffset: Offset;
  offsetBefore: Offset;
  offsetAfter: Offset;
  dayOfWeek: string;
  dayOfMonthIndicator: number;
  localTime: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  midnightEndOfDay: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class AllReservationsService {

  private apiUrl = '/api/administrator/getAllReservations';

  constructor(private http: HttpClient) { }

  getAllReservations(): Observable<Reservation[]> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = {};
    return this.http.post<Reservation[]>(this.apiUrl, body, { headers }).pipe(
          catchError((error) => {
            console.error('Fetch reservations error:', error);
            return throwError(() => error);
          })
        );
      }

    }
