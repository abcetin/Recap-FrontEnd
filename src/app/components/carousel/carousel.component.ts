import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import { CarImageService } from 'src/app/services/carImage.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  carImages: CarImage[] = [];
  cars:Car[]=[];
  baseUrl = 'https://localhost:44361/';
  images:string[]=[];

  constructor(
    private carImageService: CarImageService,
    private carService:CarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getCars(params['id']);
        this.getCarImages(params['id']);
      }
      else{
        console.log("İd Alınamadı")
      }
    });
  }

  getCarImages(id: number) {
    this.carImageService.getCarImageDetail(id).subscribe((response) => {
      this.carImages = response.data;
    });
  }
  getCars(id:number){
    this.carService.getCarsById(id).subscribe(response=>{
      this.cars=response.data;
    })
  }

  getImagePath(image: string[]) {
    return this.baseUrl + image;
  }

  getSliderClass(isFirst:boolean,isLast:boolean,isEven:boolean,isOdd:boolean){
    return{
      active : isFirst,
    lastactive: isLast,
    even:isEven,
    odd:isOdd
    };
  }
}
