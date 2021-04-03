import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FilterCarsPipe } from './pipes/filter-cars.pipe';
import { FilterColorPipe } from './pipes/filter-color.pipe';
import { FilterBrandPipe } from './pipes/filter-brand.pipe';


import {ToastrModule} from 'ngx-toastr';
import {ModalModule} from 'ngx-bootstrap/modal';
import { PaymentModalComponent } from './components/payment-modal/payment-modal.component';
import { PaymentCalculatePipe } from './pipes/payment-calculate.pipe';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RentalAddComponent } from './components/rental-add/rental-add.component';
import { CarFilterComponent } from './components/car-filter/car-filter.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDeleteComponent } from './components/car/cardelete/cardelete.component';
import { CarUpdateComponent } from './components/car/carupdate/carupdate.component';
import { BrandAddComponent } from './components/brand/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand/brand-update/brand-update.component';
import { BrandDeleteComponent } from './components/brand/brand-delete/brand-delete.component';
import { BrandUpdateModalComponent } from './components/brand/brand-update/brand-update-modal/brand-update-modal.component';
import { ColorAddComponent } from './components/color/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color/color-update/color-update.component';
import { ColorDeleteComponent } from './components/color/color-delete/color-delete.component';
import { ColorUpdateModalComponent } from './components/color/color-update/color-update-modal/color-update-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    NaviComponent,
    CarouselComponent,
    FilterCarsPipe,
    FilterColorPipe,
    FilterBrandPipe,
    RentalAddComponent,
    PaymentModalComponent,
    PaymentCalculatePipe,
    CarFilterComponent,
    CarAddComponent,
    SidebarComponent,
    CarDeleteComponent,
    CarUpdateComponent,
    BrandAddComponent,
    BrandUpdateComponent,
    BrandDeleteComponent,
    BrandUpdateModalComponent,
    ColorAddComponent,
    ColorUpdateComponent,
    ColorDeleteComponent,
    ColorUpdateModalComponent,
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

