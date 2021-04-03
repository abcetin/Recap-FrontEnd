import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cardelete',
  templateUrl: './cardelete.component.html',
  styleUrls: ['./cardelete.component.css'],
})
export class CarDeleteComponent implements OnInit {
  cardeleteForm: FormGroup;
  carDetails: CarDetail[];
  selectId: number=0;
  selectBrand: string = 'Marka';
  selectColor: string = 'Renk';
  selectCar: string = 'Model';
  modelYear: string = 'Model Yılı';
  dailyPrice: number;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createDeleteFrom();
    this.getAllCarDetail();
  }

  createDeleteFrom() {
    this.cardeleteForm = this.formBuilder.group({
      id: ['', Validators.required],
      brandName: ['', Validators.required],
      colorName: ['', Validators.required],
      carName: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
    });
  }

  delete() {
    if (this.cardeleteForm.valid) {
      let carModel = Object.assign({}, this.cardeleteForm.value);
      carModel.id=parseInt(this.selectId.toString())
      console.log(carModel);
      this.carService.carDelete(carModel.id).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarıyla Silindi');
        },
        (responseError) => {
          if(responseError.error.Errors.length>0)
        {
         for (let i = 0; i <responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
         }
        }
        }
      );
    } else {
      this.toastrService.error('Araç Silinemedi', 'Lütfen Formu Kontrol Edin');
    }
  }

  getAllCarDetail() {
    this.carService.getCarDetails().subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  getCarsById(id: number) {
    this.carService.getCarDetailsById(id).subscribe((response) => {
      this.carDetails = response.data;
      for (let index = 0; index < this.carDetails.length; index++) {
        const element = this.carDetails[index];
        this.selectBrand = element.brandName;
        this.selectCar = element.carName;
        this.selectColor = element.colorName;
        this.modelYear = element.modelYear;
        this.dailyPrice = element.dailyPrice;
      }
    });
  }
}
