import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { Car } from '../models/car';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = 'https://localhost:44361/api/';

  constructor(private httpClient: HttpClient) { }

  getCars() :Observable<ListResponseModel<Car>> {
   let newPath = this.apiUrl+"cars/getcardetail"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandName:string):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl+"cars/getcarsbybrandname?brandName="+brandName;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorName:string):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl+"cars/getcarsbybrandname?colorName="+colorName;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsById(id:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl+"cars/getbyid?id="+id;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

 

}
