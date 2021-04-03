import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandDataService {

  private id = new  BehaviorSubject<number>(0);
  private brandId = new BehaviorSubject<number>(0);
  private brandName = new BehaviorSubject<string>("");
  currentId = this.id.asObservable();
  currentBrandId = this.brandId.asObservable();
  currentBrandName = this.brandName.asObservable();


  

  constructor() { }

  sendBrand(id?:number, brandId? :number,brandName?:string){
    this.id.next(id);
    this.brandId.next(brandId);
    this.brandName.next(brandName);
  }

}
