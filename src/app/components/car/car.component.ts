import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import { CarImageService } from 'src/app/services/carImage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  carImages:CarImage[]=[];
  currentCar: string;
  dataLoaded = false;
  baseUrl ="https://localhost:44361/";
  filterText = "";
  defaultImage:string;
  brandFilter:string;
  colorFilter:string;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if ( params['id']  ) {
        this.getCarsById(params['id']);
      }
      else if(params['colorName']){
        this.getCarsByColor(params['colorName']);
      }
      else if(params['brandName']){
        this.getCarsByBrand(params['brandName']);
      }
     
      else {
        this.getCars();
        
      }
    });
    //this.getCarsByColorAndBrand(this.brandFilter)
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByBrand(brandName: string) {
    this.carService.getCarsByBrand(brandName).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByColor(colorName: string) {
    this.carService.getCarsByColor(colorName).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsById(id: number) {
    this.carService.getCarsById(id).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  
  // getCarsByColorAndBrand(brand?:string,color?:string) {
  //   this.carService.getCarsByColorAndBrand(brand,color).subscribe((response) => {
  //     this.cars = response.data;
  //     this.dataLoaded = true;
  //   });
  // }
  setDataFromCarBrandFilter(data:string){
    
    this.brandFilter=data
    console.log(this.brandFilter);
   return this.brandFilter;
  } 
  setDataFromCarColorFilter(data:string){
    data=this.brandFilter;
    return this.colorFilter;
  }
}
