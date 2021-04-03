import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: CarDetail[] = [];
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
  }

  getCars() {
    this.carService.getCarDetails().subscribe((response) => {
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
    this.carService.getCarDetailsById(id).subscribe((response) => {
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

}
