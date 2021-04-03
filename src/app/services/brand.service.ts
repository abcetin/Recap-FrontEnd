import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = "https://localhost:44361/api/brands/";
  
  constructor(private httpClient:HttpClient) { }

  getBrands() : Observable<ListResponseModel<Brand>>{
    let newPath = this.apiUrl+"getall"
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  brandAdd(brand:Brand):Observable<ResponseModel>{
    let newPath = "https://localhost:44361/api/brands/addbrand";
    return this.httpClient.post<ResponseModel>(newPath,brand)
  }
  brandDelete(id:number):Observable<ResponseModel>{
    let newPath = "https://localhost:44361/api/brands/deletebrand?id="+id;
    return this.httpClient.get<ResponseModel>(newPath)
  }
  brandUpdate(brand:Brand):Observable<ResponseModel>{
    let newPath = "https://localhost:44361/api/brands/updatebrand";
    return this.httpClient.post<ResponseModel>(newPath,brand)
  }

  getBrandById(id:number):Observable<ListResponseModel<Brand>>{
    let newPath = "https://localhost:44361/api/brands/getbrandbyid?id="+id;
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  getById(id:number):Observable<ListResponseModel<Brand>>{
    let newPath = "https://localhost:44361/api/brands/getbyid?id="+id;
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }
}
