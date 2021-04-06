import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CardService } from 'src/app/services/card.service';
import {FormGroup, FormBuilder,FormControl,Validators} from '@angular/forms';
import { PaymentDataService } from 'src/app/services/payment-data.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Card } from 'src/app/models/card';


@Component({
  selector: 'app-payment-modal ',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css']
})
export  class PaymentModalComponent implements OnInit {
  
  cards:Card[];
  cardAddForm:FormGroup;
  id:number;
  isPay:boolean=false;
  cardOwner:string;
  cardNumber:string;
  mounth:string;
  year:string;
  ccv:string;

  constructor(public modalRef: BsModalRef,
    private cardService:CardService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.createCardAddForm();
    this.getCardByUserId();
  }

  createCardAddForm(){
    this.cardAddForm= this.formBuilder.group({
      userId:[""],
      cardNumber:["",Validators.required],
      cardOwner:["",Validators.required],
      mounth:["",Validators.required],
      year:["",Validators.required],
      ccv:["",Validators.required]
    })
  }

  getCardByUserId(){
    let userId = this.localStorageService.getLocalStroge("userId")
    this.cardService.getCardByUserId(parseInt(userId)).subscribe(response=>{
      this.cards=response.data;
      console.log(this.cards)
      for (let index = 0; index < this.cards.length; index++) {
        const element = this.cards[index];
        this.id=element.id;
        this.cardOwner = element.cardOwner
        this.cardNumber = element.cardNumber;
        this.mounth = element.mounth;
        this.year = element.year;
        this.ccv = element.ccv;
      }
    })
  }

  getCardById(id:number){
    this.cardService.getCardById(id).subscribe(response=>{
      this.cardOwner = response.data.cardOwner;
      this.cardNumber = response.data.cardNumber;
      this.mounth = response.data.mounth;
      this.year = response.data.year;
      this.ccv = response.data.ccv;
    })
  }

  addCard(){
    let userId=this.localStorageService.getLocalStroge("userId");
    if(this.cardAddForm.valid){
      let cardModel=Object.assign({},this.cardAddForm.value);
      cardModel.userId = parseInt(userId);
      this.cardService.addCard(cardModel).subscribe(response=>{
        this.toastrService.success(response.message,"Ödeme Başarılı")
        this.localStorageService.setLocalStorage("message",response.message)
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let index = 0; index < responseError.error.Errors.length; index++) {
            this.toastrService.error(responseError.error.Errors[index].ErrorMessage,"Doğrulama Hatası")
          }
        }
      });
      
    }
    else{
      this.toastrService.error("Ödeme Onaylanmadı","Lütfen Formu Kontrol Edin");
      
    }
  }
  

}


