import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl = 'https://localhost:44361/api/';

  constructor(private httpClient:HttpClient) { }

  getCarImageDetail(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl+"carimages/getimages?id="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
}
