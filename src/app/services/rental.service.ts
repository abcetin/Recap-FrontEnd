import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalResponseModule } from '../models/rentalResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl="https://localhost:44361/api/rentals/getrentaldetail";
  constructor(private httpClient:HttpClient) { }

  getRentals(): Observable<RentalResponseModule>{
    return this.httpClient.get<RentalResponseModule>(this.apiUrl);
  }
}
