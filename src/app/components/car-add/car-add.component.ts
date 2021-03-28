import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder,FormControl,Validators} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  brands:Brand[]=[];
  colors:Color[]=[];
  carAddForm : FormGroup;
  selectBrandId:string="Marka Seçiniz";
  selectColorId:string="Renk Seçiniz";
  modelYear:string;
  
  constructor(private fromBuilder:FormBuilder,
    private carService:CarService,
    private toastrService:ToastrService,
    private colorService:ColorService,
    private brandService:BrandService) { }

  ngOnInit(): void {
    this.getColor();
    this.getBrand();
    this.createCarAddForm();
  }

  createCarAddForm(){
    this.carAddForm=this.fromBuilder.group({
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      carName:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
    })
  
  }
  
  add(){
    if(this.carAddForm.valid){
      let carModel= Object.assign({},this.carAddForm.value)
      carModel.colorId = parseInt(this.selectColorId);
      carModel.brandId = parseInt(this.selectBrandId);
      carModel.modelYear = this.modelYear.toString();
      console.log(carModel)
      this.carService.carAdd(carModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarıyla Eklendi")
      },resposenError=>{
        console.log(resposenError);
        
      })
    }else{
      this.toastrService.error("Araç Eklenemedi","Lütfen Formu Kontrol Edin");
      
    }

    console.log(this.selectBrandId,this.selectColorId,this.modelYear)
  }

  getColor(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
    })
  }

  getBrand(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;
    })
  }
}
