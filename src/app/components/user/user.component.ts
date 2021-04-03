import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator, FormBuilder, Validators,} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user:User[];
  firstName:string;
  lastName:string;
  email:string;
  password:string;
  userUpdateFrom:FormGroup;

  constructor(private formBuilder:FormBuilder,
    private userService:UserService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createUserFrom();
    this.getUserByEmail();
  }

  getUserByEmail(){
    let email = localStorage.getItem("email")
    this.userService.getUserByEmail(email).subscribe(response=>{
      this.user=response.data;
      for (let index = 0; index < this.user.length; index++) {
        const element = this.user[index];
        this.firstName=element.firstName;
        this.lastName=element.lastName;
        this.email=element.email;
      }
    })
  }

  createUserFrom(){
    this.userUpdateFrom = this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  update(){
    if(this.userUpdateFrom.valid){
      let userModel = Object.assign({},this.userUpdateFrom.value)
      console.log(userModel)
      this.userService.updateUser(userModel).subscribe(response=>{
        this.toastrService.success("Güncelleme İşlemi Başarılı")
      },responseError=>{
        console.log(responseError.error)
      })
    }
  }

}
