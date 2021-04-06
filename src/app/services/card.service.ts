import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card';
import { ListResponseModel } from '../models/listResponseModel';
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

  getCardByUserId(id:number):Observable<ListResponseModel<Card>>{
    let newUrl = this.apiUrl +"getbyuserid?id="+id;
    return this.httpClient.get<ListResponseModel<Card>>(newUrl)
  }

  getCardById(id:number){
    let newUrl = this.apiUrl+"getbyid?id="+id;
    return this.httpClient.get<SingleResponseModel<Card>>(newUrl);
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
