import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserFindex } from '../models/userFindex';

@Injectable({
  providedIn: 'root'
})
export class FindexService {

  apiUrl="https://localhost:44361/api/userfindex"

  constructor(private httpClient:HttpClient) { }

  getUserFindex(userId:number){
    let path= this.apiUrl+"/getuserfindex?userId=" + userId
    return this.httpClient.get<SingleResponseModel<UserFindex>>(path)
  }

  add(id:number):Observable< ResponseModel>{
    let path = this.apiUrl+"add"
    return this.httpClient.post<ResponseModel>(path,id);
  }
}
