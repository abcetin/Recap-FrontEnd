import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validator,FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;

  constructor(private formBuilder:FormBuilder,
    private authService:AuthServiceService,
    private toastrService:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      firstName: ["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }
  
  register(){
    if(this.registerForm.valid){
      let registerModel  = Object.assign({},this.registerForm.value)
      this.authService.register(registerModel).subscribe(response=>{
        this.toastrService.success("Kayıt İşlemi Başarılı")
        setTimeout(async () =>{return window.location.reload(await this.router.navigate(["login"]))},435);
      },responseError=>{
        this.toastrService.error(responseError.error)
      })
    }
  }

}
