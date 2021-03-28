import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerComponent } from '../customer/customer.component';
import { RentalComponent } from '../rental/rental.component';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  constructor(
    ) { }

  ngOnInit(): void {
    localStorage.removeItem("message");
  }

 


}
