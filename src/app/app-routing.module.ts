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
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { UserComponent } from './components/user/user.component';
import { LoginGuard } from './guard/login.guard';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/color/:colorName",component:CarComponent},
  {path:"cars/brand/:brandName",component:CarComponent},
  {path:"cars/getbyid/:id",component:CarComponent},
  {path:"rentals",component:RentalComponent},
  {path:"getcarimages/:id",component:CarouselComponent},
  {path:"cars/add",component:CarAddComponent, canActivate:[LoginGuard]},
  {path:"cars/delete",component:CarDeleteComponent, canActivate:[LoginGuard]},
  {path:"cars/update",component:CarUpdateComponent, canActivate:[LoginGuard]},
  {path:"brands/add",component:BrandAddComponent, canActivate:[LoginGuard]},
  {path:"brands/delete",component:BrandDeleteComponent, canActivate:[LoginGuard]},
  {path:"brands/update",component:BrandUpdateComponent, canActivate:[LoginGuard]},
  {path:"colors/add",component:ColorAddComponent, canActivate:[LoginGuard]},
  {path:"colors/delete",component:ColorDeleteComponent, canActivate:[LoginGuard]},
  {path:"colors/update",component:ColorUpdateComponent, canActivate:[LoginGuard]},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"user",component:UserComponent},
  //{path:"cars/filter/:brandName/:colorName",component:CarComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
