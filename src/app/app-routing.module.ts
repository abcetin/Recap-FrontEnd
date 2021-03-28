import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/color/:colorName",component:CarComponent},
  {path:"cars/brand/:brandName",component:CarComponent},
  {path:"cars/getbyid/:id",component:CarComponent},
  {path:"rentals",component:RentalComponent},
  {path:"getcarimages/:id",component:CarouselComponent},
  //{path:"cars/filter/:brandName/:colorName",component:CarComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
