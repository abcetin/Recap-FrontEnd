import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  currentCar: string;
  dataLoaded = false;
  baseUrl ="https://localhost:44361/";

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandName'] || params['colorName'] || params['id']  ) {
        this.getCarsByBrand(params['brandName']);
        this.getCarsByColor(params['colorName']);
        this.getCarsById(params['id']);
        console.log(params['id']);
        console.log(params['colorName']);
        console.log(params['brandName'])
      } else {
        this.getCars();
        
      }
      
      
    });
    
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
  
  


  getAllCarClass() {
    if (!this.currentCar) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }

  setCurrentAllCar() {
    this.getCars();
  }

  setCurrentCar(id: string) {
    this.currentCar = id;
  }

  getCurrentCarClass(id: string) {
    if (id == this.currentCar) {
      return 'list-group-item active';
    } else id == null;
    {
      return 'list-group-item';
    }
  }

 

}
