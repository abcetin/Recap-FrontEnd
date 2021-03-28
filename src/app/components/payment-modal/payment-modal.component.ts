import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CardService } from 'src/app/services/card.service';
import {FormGroup, FormBuilder,FormControl,Validators} from '@angular/forms';


@Component({
  selector: 'app-payment-modal ',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css']
})
export  class PaymentModalComponent implements OnInit {
  
  
  cardAddForm:FormGroup;

  constructor(public modalRef: BsModalRef,
    private cardService:CardService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createCardAddForm();
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
        localStorage.setItem("message",response.message)
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


