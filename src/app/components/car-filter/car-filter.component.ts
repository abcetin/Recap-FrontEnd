import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css'],
})
export class CarFilterComponent implements OnInit {
  constructor(
    private brandService: BrandService,
    private colorService: ColorService
  ) {}
  brands: Brand[] = [];
  colors: Color[] = [];
  brandFilter:string;
  colorFilter:string;
  ngOnInit(): void {
    this.getBrands();
    this.getColors();
  }

  getBrands(){
    this.brandService.getBrands().subscribe((response) =>{
      this.brands = response.data;
    });
  }
  getColors(){
    this.colorService.getColors().subscribe((response) => {
      this.colors=response.data;
      
    })
  }

 
 
}
