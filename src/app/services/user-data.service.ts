import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private email = new  BehaviorSubject<string>("");
  currentEmail = this.email.asObservable();

  constructor() { }

  sendEmail(email:string){
    this.email.next(email);
  }
}
