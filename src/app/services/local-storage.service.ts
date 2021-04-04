import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setLocalStorage(key:string,value:any){
    return localStorage.setItem(key,value)
  }

  getLocalStroge(key:string){
    return localStorage.getItem(key)
  }
  
  removeLocalStorage(key:string){
    return localStorage.removeItem(key)
  }

  clear(){
    return localStorage.clear();
  }
}
