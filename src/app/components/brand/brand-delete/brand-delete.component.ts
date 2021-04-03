import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder,FormControl,Validators} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-delete',
  templateUrl: './brand-delete.component.html',
  styleUrls: ['./brand-delete.component.css']
})
export class BrandDeleteComponent implements OnInit {

  brandDeleteFrom : FormGroup;
  brands:Brand[]=[];
  brand:Brand[];
  public id:number;
  public brandId:number;
  
  constructor(private brandService:BrandService,
              private toastrService:ToastrService,
              private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getBrands();
    this.createBrandDeleteFrom();
    
  }

  createBrandDeleteFrom(){
    this.brandDeleteFrom = this.formBuilder.group({
      id:["",Validators.required],
      brandId:["",Validators.required]
    })
    
  }

  getById(id:number){
    this.brandService.getById(id).subscribe(response=>{
      this.brand=response.data;
      for (let index = 0; index < this.brand.length; index++) {
        const element = this.brand[index];
        this.id=element.id;
        this.brandId=element.brandId;
      }
    })
  }
  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;
    })
  }

  delete(){
    
    if(this.brandDeleteFrom.valid){
      let brandModel = Object.assign({},this.brandDeleteFrom.value);
      brandModel.id=this.id;
      console.log(brandModel)
      this.brandService.brandDelete(brandModel.id).subscribe(response=>{
        this.toastrService.success("Model Başarıyla Silindi")
      },responseError=>{

        if(responseError.error.Errors.length>0){
          for (let index = 0; index < responseError.error.Errors.length; index++) {
            this.toastrService.error(responseError.error.Errors[index].ErrorMessage,"Doğrulama Hatası")

          }
        }
        
        console.log(responseError.error)
      })
    }
    else{
      this.toastrService.error("Ekleme İşlemi Başarısız Formu Kontrol Ediniz.")
    }
  }

}
