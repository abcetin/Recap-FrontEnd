import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder,FormControl,Validators} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';


@Component({
  selector: 'app-carupdate',
  templateUrl: './carupdate.component.html',
  styleUrls: ['./carupdate.component.css']
})
export class CarUpdateComponent implements OnInit {

  dataLoaded=false;
  carUpdateForm:FormGroup;
  carDetails:CarDetail[];
  car:Car[];
  brands:Brand[];
  colors:Color[];
  selectId: number=0;
  selectBrand: string = 'Marka Seçiniz';
  selectColor: string = 'Renk Seçiniz';
  selectCar: string = 'Model';
  modelYear: string = 'Model Yılı';
  dailyPrice: number;


  constructor(
    private formBuilder:FormBuilder,
    private carService:CarService,
    private toastrService:ToastrService,
    private brandService:BrandService,
    private colorService:ColorService,
  ) { }

  ngOnInit(): void {
    this.createUpdateForm();
    this.getCarDetails();
    this.getColor();
    this.getBrand();
    
  }

  createUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      id:['', Validators.required],
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      carName: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
    })
    
  }
  
  getCarByİd(id:number){
  }

  update(){
    console.log(this.selectColor)
    if(this.carUpdateForm.valid){
      let carModel = Object.assign({},this.carUpdateForm.value);
      carModel.id=parseInt(this.selectId.toString())
      carModel.brandId = parseInt(this.selectBrand);
      carModel.colorId = parseInt(this.selectColor)
      console.log(carModel);
      this.carService.carUpdate(carModel).subscribe(response=>{
        this.toastrService.success("Baraşıyla Güncellendi",response.message);
      },responseError=>{
        if(responseError.error.Errors.length>0)
        {
         for (let i = 0; i <responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
         }
        }
      })
    }
    else{
      this.toastrService.error("Güncelleme İşlemi Başarısız Oldu")
    }
  }
  getCarDetailById(id: number) {
    this.carService.getCarById(id).subscribe((response) => {
      this.dataLoaded=true;
      this.car = response.data;
      for (let index = 0; index < this.car.length; index++) {
        const element = this.car[index];
        this.selectBrand = element.brandId;
        this.selectCar = element.carName;
        this.selectColor = element.colorId;
        this.modelYear = element.modelYear;
        this.dailyPrice = element.dailyPrice;
      }
    });
  }

  // getCarById(id:number){
  //   this.carService.getCarById(id).subscribe(response=>{
  //     this.carUpdateForm.get('id')?.setValue(response.data.id);
  //     this.carUpdateForm.get('brandId')?.setValue(response.data.brandId);
  //     this.carUpdateForm.get('colorId')?.setValue(response.data.colorId); 
  //     this.carUpdateForm.get('modelYear')?.setValue(response.data.modelYear);    
  //     this.carUpdateForm.get('dailyPrice')?.setValue(response.data.dailyPrice);      
  //   })
  // }

  getCarDetails(){
    this.carService.getCarDetails().subscribe(response=>{
      this.carDetails = response.data;
    })
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
