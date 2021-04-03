import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentDataService {

  private isPay = new  BehaviorSubject<boolean>(false);
  currentIsPay = this.isPay.asObservable();

  constructor() { }

  sendPay(isPay:boolean){
    this.isPay.next(isPay);
  }
}
