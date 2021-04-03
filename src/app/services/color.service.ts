import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = "https://localhost:44361/api/colors/getall";

  constructor(private httpClient:HttpClient) { }

  getColors() : Observable<ListResponseModel<Color>>{
     return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl);
  }
  colorAdd(color:Color):Observable<ResponseModel>{
    let newPath = "https://localhost:44361/api/colors/addcolor";
    return this.httpClient.post<ResponseModel>(newPath,color)
  }
  colorDelte(id:number):Observable<ResponseModel>{
    let newPath = "https://localhost:44361/api/colors/deletecolor?id="+id;
    return this.httpClient.get<ResponseModel>(newPath)
  }
  colorUpdate(color:Color):Observable<ResponseModel>{
    let newPath = "https://localhost:44361/api/colors/updatecolor";
    return this.httpClient.post<ResponseModel>(newPath,color)
  }

  getColorById(id:number):Observable<ListResponseModel<Color>>{
    let newPath= "https://localhost:44361/api/colors/getcolorbyid?id=" + id;
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
    
  }
}
