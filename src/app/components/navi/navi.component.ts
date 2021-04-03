import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { CustomerComponent } from '../customer/customer.component';
import { RentalComponent } from '../rental/rental.component';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  
  constructor(private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.localStorageService.removeLocalStorage("message");
  }

  

 

 


}
