import { Component, ComponentRef, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, FormControl,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  template:
    '<app-payment-modal [checkPayment]="checkPay" ></app-payment-modal>',
  styleUrls: ['./rental-add.component.css'],
})
export class RentalAddComponent implements OnInit {
  dataLoaded = false;
  rentalAddForm: FormGroup;
  carId:number;
  cars: CarDetail[] = [];
  rental:Rental[]=[];
  customers: Customer[] = [];
  customerId: string ="Müşteri Seçiniz";
  rentDate:string = new Date().toLocaleDateString('en-CA');
  returnDate: string = new Date().toLocaleDateString('en-CA');
  modalRef: BsModalRef;
  click : boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    public modalService: BsModalService,
    private customerService: CustomerService,
    private rentalService: RentalService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.carId=params['id'];
        this.getCars(params['id']);
        this.createRentalAddForm(params['id']);
        this.getRentalsId(params['id'])
      }
    });
    this.getCustomers();
  }

  getCars(id: number) {
    this.carService.getCarDetailsById(id).subscribe((response) => {
      this.cars = response.data;
    });
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
    });
  }

  createRentalAddForm(id: number) {
    this.rentalAddForm = this.formBuilder.group({
      carId:parseInt(id.toString()),
      customerId: ['', Validators.required],
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required],
    });
  }
  
  getRentalsId(id:number){
    this.rentalService.getById(id).subscribe(response=>{
      this.rental=response.data;
      if(this.rental.length==0 ){
        this.click=false
      }
      else{
        this.toastrService.error("Bu araç Hali Hazırda kiralanmıştır.");
        this.click=true
      }
    })
  }
  
  addToCart() {
      if (this.rentalAddForm.valid) {
        this.dataLoaded = true;
        let rentalModel = Object.assign({}, this.rentalAddForm.value);
        (rentalModel.customerId = parseInt(this.customerId.toString()));
        rentalModel.carId=parseInt(this.carId.toString());
        
        if(localStorage.getItem("message")){
          this.rentalService.addRental(rentalModel).subscribe(
            (response) => {
              this.toastrService.success(response.message);
            },
            (responseError) => {
              if (responseError.error.Errors.length > 0) {
                for (let i = 0; i < responseError.error.Errors.length; i++) {
                  this.toastrService.error(responseError.error.Errors[i].ErrorMessage,'Doğrulama Hatası' );
                }
              }
            }
          );
          localStorage.removeItem("message");
        }
        else{
          this.toastrService.info("Lütfen Ödeme İşlemini Gerçekleştirin")
        } 
      } else {
        this.toastrService.error('Lütfen Bilgileri Eksiksiz Doldurun.');
      }
  }

  getRentMinDate() {
    var today = new Date();
    today.setDate(today.getDate());
    return today.toISOString().slice(0, 10);
  }
  getReturnMinDate() {
    var today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().slice(0, 10);
  }

  openModal(){
    this.modalRef = this.modalService.show(PaymentModalComponent); 
  }
}
