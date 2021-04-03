import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand/brand-add/brand-add.component';
import { BrandDeleteComponent } from './components/brand/brand-delete/brand-delete.component';
import { BrandUpdateComponent } from './components/brand/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarComponent } from './components/car/car.component';
import { CarDeleteComponent } from './components/car/cardelete/cardelete.component';
import { CarUpdateComponent } from './components/car/carupdate/carupdate.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ColorAddComponent } from './components/color/color-add/color-add.component';
import { ColorDeleteComponent } from './components/color/color-delete/color-delete.component';
import { ColorUpdateComponent } from './components/color/color-update/color-update.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/color/:colorName",component:CarComponent},
  {path:"cars/brand/:brandName",component:CarComponent},
  {path:"cars/getbyid/:id",component:CarComponent},
  {path:"rentals",component:RentalComponent},
  {path:"getcarimages/:id",component:CarouselComponent},
  {path:"cars/add",component:CarAddComponent},
  {path:"cars/delete",component:CarDeleteComponent},
  {path:"cars/update",component:CarUpdateComponent},
  {path:"brands/add",component:BrandAddComponent},
  {path:"brands/delete",component:BrandDeleteComponent},
  {path:"brands/update",component:BrandUpdateComponent},
  {path:"colors/add",component:ColorAddComponent},
  {path:"colors/delete",component:ColorDeleteComponent},
  {path:"colors/update",component:ColorUpdateComponent},
  //{path:"cars/filter/:brandName/:colorName",component:CarComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
