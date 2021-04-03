import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorDataService {

  private id = new  BehaviorSubject<number>(0);
  private colorId = new BehaviorSubject<number>(0);
  private colorName = new BehaviorSubject<string>("");
  currentId = this.id.asObservable();
  currentColorId = this.colorId.asObservable();
  currentColorName = this.colorName.asObservable();


  constructor() { }

  sendColor(id?:number, colorId? :number,colorName?:string){
    this.id.next(id);
    this.colorId.next(colorId);
    this.colorName.next(colorName);
  }
}
