import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validator,FormBuilder, Validators } from "@angular/forms";
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
    private toastrService:ToastrService) { }

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
      })
    }
  }

}
