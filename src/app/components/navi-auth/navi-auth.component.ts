import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi-auth',
  templateUrl: './navi-auth.component.html',
  styleUrls: ['./navi-auth.component.css']
})
export class NaviAuthComponent implements OnInit {
  checkLogin:boolean=false;
  id:number;
  user:User[];
  firstName:string;
  lastName:string;

  constructor(private authService:AuthServiceService,
    private userService:UserService,
    private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.checkUserLogin();
    this.getUserByEmail();
  }
  checkUserLogin(){
    if(this.authService.isAuthenticated()){
      this.checkLogin=true;
    }
    else{
      this.checkLogin=false;
    }
  }

  getUserByEmail(){
    let email = localStorage.getItem("email")
    this.userService.getUserByEmail(email).subscribe(response=>{
      this.user=response.data;
      for (let index = 0; index < this.user.length; index++) {
        const element = this.user[index];
        this.id=element.userId;
        this.firstName = element.firstName;
        this.lastName = element.lastName;
      }
    })
  }

  quit(){
    this.localStorageService.clear();
    window.location.reload()
  }


}
