import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder,FormControl,Validators} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';
import { BrandDataService } from 'src/app/services/brandData.service';

@Component({
  selector: 'app-brand-update-modal',
  templateUrl: '/brand-update-modal.component.html',
  styleUrls: ['/brand-update-modal.component.css'],
  inputs: ['brandId'],
})
export class BrandUpdateModalComponent implements OnInit {

  brandUpdateFrom : FormGroup;
  id:number;
  brandId:number;
  brandName:string;


  constructor(private brandService:BrandService,
              private toastrService:ToastrService,
              private formBuilder:FormBuilder,
              private dataService:BrandDataService) { }

  ngOnInit(): void {
    this.createBrandAddFrom();
    this.dataService.currentId.subscribe(response=>this.id=response)
    this.dataService.currentBrandId.subscribe(response=>this.brandId=response)
    this.dataService.currentBrandName.subscribe(response=>this.brandName=response)
  }
  createBrandAddFrom(){
    this.brandUpdateFrom = this.formBuilder.group({
      id:[""],
      brandId:["",Validators.required],
      brandName:["",Validators.required]
    })
  }

  
  update(){
    
    if(this.brandUpdateFrom.valid){
      let brandModel = Object.assign({},this.brandUpdateFrom.value);
      brandModel.id = this.id
      console.log(brandModel)
      this.brandService.brandUpdate(brandModel).subscribe(response=>{
        this.toastrService.success("Marka Başarıyla Güncellendi")
      },responseError=>{
        this.toastrService.error(responseError.error.message,"Doğrulama Hatası")
      })

    }
    else{
      this.toastrService.error("Ekleme İşlemi Başarısız Formu Kontrol Ediniz.")
    }
  }

}

