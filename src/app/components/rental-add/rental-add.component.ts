import { Component, ComponentRef, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, FormControl,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { User } from 'src/app/models/user';
import { UserFindex } from 'src/app/models/userFindex';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { FindexService } from 'src/app/services/findex.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';
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
  user:User[];
  findex:number;
  carFindex:number;
  firstName:string;
  lastName:string;
  userId:number;
  carId:number;
  cars: CarDetail[] = [];
  rental:Rental[]=[];
  companyName:string;
  rentDate:string ;
  returnDate: string ;
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
    private localStorageService:LocalStorageService,
    private userService:UserService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.carId=params['id'];
        this.getCars(params['id']);
        this.createRentalAddForm(params['id']);
        this.getRentalsId(params['id']);
        this.checkFindex();
      }
    });
    this.getRentMinDate();
    this.getReturnMinDate();
    this.getUserByEmail();
    this.getCustomerByUserId();
    console.log(this.findex)
  }

  getCars(id: number) {
    this.carService.getCarDetailsById(id).subscribe((response) => {
      this.cars = response.data;
      for (let index = 0; index < this.cars.length; index++) {
        const element = this.cars[index];
        this.findex = parseInt(this.localStorageService.getLocalStroge("findex"));
        if(element.findexPuan>this.findex){
          this.click=true;
          this.toastrService.error("Findex Puanınınz Yetersiz")
        }
        else{
          this.click=false;
        }
      }
    });
  }

  getCustomerByUserId() {
    let userId = this.localStorageService.getLocalStroge("userId")
    this.customerService.getCustomerByUSerId(parseInt(userId)).subscribe((response) => {
      this.companyName= response.data.companyName;
    });
  }

  getUserByEmail(){
    let email = this.localStorageService.getLocalStroge("email");
    this.userService.getUserByEmail(email).subscribe(response=>{
      this.user=response.data;
      for (let index = 0; index < this.user.length; index++) {
        const element = this.user[index];
        this.firstName=element.firstName;
        this.lastName = element.lastName;
      }
    })
  }

  
  createRentalAddForm(id: number) {
    this.rentalAddForm = this.formBuilder.group({
      carId:parseInt(id.toString()),
      customerId: [''],
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required],
    });
  }
  
  getRentalsId(id:number){
    this.rentalService.getById(id).subscribe(response=>{
      this.rental=response.data;
      for (let index = 0; index < this.rental.length; index++) {
        const element = this.rental[index];
        if(element.returnDate.toString() <= this.rentDate ){
          this.click=false;
        }
        else{
          this.toastrService.error("Bu araç Hali Hazırda kiralanmıştır.");
          this.click=true
        }
      }
    })
  }
  
  addToCart() {
    
    let customerId = this.localStorageService.getLocalStroge("userId")
    
      if (this.rentalAddForm.valid) {
        this.dataLoaded = true;
        let rentalModel = Object.assign({}, this.rentalAddForm.value);
        (rentalModel.customerId = parseInt(customerId));
        rentalModel.carId=parseInt(this.carId.toString());
        if(this.localStorageService.getLocalStroge("message")){
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
          this.localStorageService.removeLocalStorage("message")
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
    today.setDate(today.getDate()+1);
    this.rentDate =  today.toISOString().slice(0, 10);
    return this.rentDate;
  }
  getReturnMinDate() {
    var today = new Date();
    today.setDate(today.getDate() + 2);
    this.returnDate =  today.toISOString().slice(0, 10);
    return this.returnDate;
  }

  checkFindex(){
    this.carFindex = parseInt(this.localStorageService.getLocalStroge("carFindex"));
    
  }

  openModal(){
    this.modalRef = this.modalService.show(PaymentModalComponent);
  }
}
