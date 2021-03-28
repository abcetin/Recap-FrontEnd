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

  apiUrl = 'https://localhost:44361/api/cars/';

  constructor(private httpClient: HttpClient) { }

  getCars() :Observable<ListResponseModel<Car>> {
   let newPath = this.apiUrl+"getcardetail"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandName:string):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl+"getcarsbybrandname?brandName="+brandName;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorName:string):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl+"getcarsbybrandname?colorName="+colorName;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  // getCarsByColorAndBrand(brandName?:string,colorName?:string):Observable<ListResponseModel<Car>>{
  //   let newPath = this.apiUrl+"getcarsbybrandname?brandName="+brandName+"colorName="+colorName;
  //   return this.httpClient.get<ListResponseModel<Car>>(newPath);
  // }

  getCarsById(id:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl+"getbyid?id="+id;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

 

}
