import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetail } from '../models/rentalDetail';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl="https://localhost:44361/api/";
  constructor(private httpClient:HttpClient) { }

  getRentals(): Observable<ListResponseModel<RentalDetail>>{
    let newPath= this.apiUrl+"rentals/getrentaldetail"
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }

  addRental(rental:Rental):Observable<ResponseModel>{
    let newPath= this.apiUrl+"rentals/add";
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }
  getById(id:number):Observable<ListResponseModel<Rental>>{
    let newPath= this.apiUrl+"rentals/getrentaldetailbyid?id="+id;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
}

