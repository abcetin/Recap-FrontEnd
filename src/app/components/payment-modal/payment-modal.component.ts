import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CardService } from 'src/app/services/card.service';
import {FormGroup, FormBuilder,FormControl,Validators} from '@angular/forms';
import { PaymentDataService } from 'src/app/services/payment-data.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';


@Component({
  selector: 'app-payment-modal ',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css']
})
export  class PaymentModalComponent implements OnInit {
  
  
  cardAddForm:FormGroup;
  isPay:boolean=false;

  constructor(public modalRef: BsModalRef,
    private cardService:CardService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private paymentDataService:PaymentDataService,
    private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.createCardAddForm();
    this.paymentDataService.currentIsPay.subscribe(response=>this.isPay=response)
  }

  createCardAddForm(){
    this.cardAddForm= this.formBuilder.group({
      cartNumber:["",Validators.required],
      cartOwner:["",Validators.required],
      mounth:["",Validators.required],
      year:["",Validators.required],
      ccv:["",Validators.required]
    })
  }

  addCard(){
    if(this.cardAddForm.valid){
      let cardModel=Object.assign({},this.cardAddForm.value);
      this.cardService.addCard(cardModel).subscribe(response=>{
        this.toastrService.success(response.message,"Ödeme Başarılı")
        this.localStorageService.setLocalStorage("message",response.message)
        this.isPay=true
        console.log(this.isPay)
        this.paymentDataService.sendPay(this.isPay);
      },responseError=>{
        if(responseError.error.Errors.length>0)
        {
         for (let i = 0; i <responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
         }
        }
      });
      
    }
    else{
      this.toastrService.error("Ödeme Onaylanmadı","Lütfen Formu Kontrol Edin");
      
    }
  }
  

}


