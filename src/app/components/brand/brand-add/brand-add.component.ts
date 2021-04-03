import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder,FormControl,Validators} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAddFrom : FormGroup;
  

  constructor(private brandService:BrandService,
              private toastrService:ToastrService,
              private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createBrandAddFrom();
  }

  createBrandAddFrom(){
    this.brandAddFrom = this.formBuilder.group({
      brandId:["",Validators.required],
      brandName:["",Validators.required]
    })
  }

  
  add(){
    
    if(this.brandAddFrom.valid){
      let brandModel = Object.assign({},this.brandAddFrom.value);
      console.log(brandModel)
      this.brandService.brandAdd(brandModel).subscribe(response=>{
        this.toastrService.success("Model Başarıyla Eklendi")
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let index = 0; index < responseError.error.Errors.length; index++) {
            this.toastrService.error(responseError.error.Errors[index].ErrorMessage,"Doğrulama Hatası")

          }
        }
      })

    }
    else{
      this.toastrService.error("Ekleme İşlemi Başarısız Formu Kontrol Ediniz.")
    }
  }
}
