import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  apiUrl="https://localhost:44361/api/cards/"

  constructor(private httpClient:HttpClient) { }

  addCard(card:Card):Observable<ResponseModel>{
    let newUrl = this.apiUrl+"addcard"
    return this.httpClient.post<ResponseModel>(newUrl,card)
  }

  isAdded(){
    if(localStorage.getItem("message")){
      return true;
    }
    else{
      return false;
    }
  }
  
}
