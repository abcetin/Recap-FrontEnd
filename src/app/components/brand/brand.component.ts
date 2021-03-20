import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brands : Brand[] = [];
  currentBrand:string="";
  dataLoaded = false;
  
  constructor(private brandService : BrandService) { }

  ngOnInit(): void {
   
    this.getBrands();
  }

  getBrands(){
    this.brandService.getBrands().subscribe((response) =>{
      this.brands = response.data;
      this.dataLoaded=true;
    });
  }

  getAllBrandClass(){
    if(!this.currentBrand){
      return 'list-group-item active';
    }
    else{
      return 'list-group-item';
    }
  }

  setCurrentAllBrand(brand:string){
    this.currentBrand=brand;
  }

  setCurrentBrand(brand:string){
   this.currentBrand=brand;
  }

  getCurrentBrandClass(brand:string){
    if(brand==this.currentBrand){
      return "list-group-item active"
    }
    else(brand==null)
    {
      return 'list-group-item'
    }
  }

}
