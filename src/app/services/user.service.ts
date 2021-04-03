import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:44361/api/users"

  constructor(private httpClient:HttpClient) { }

  getUserByEmail(email:string):Observable<ListResponseModel<User>>{
    let newPath= this.apiUrl+"/getbyemail?email="+email
    return this.httpClient.get<ListResponseModel<User>>(newPath)
  }

  updateUser(user:User):Observable<ResponseModel>{
    let newPath = this.apiUrl + "/update"
    return this.httpClient.post<ResponseModel>(newPath,user)
  }
}
