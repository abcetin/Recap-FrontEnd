import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator, FormBuilder, Validators,} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: string;
  user:User[];
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    private toastrService: ToastrService,
    private router:Router,
    private userService:UserService,
    private localStorageService:LocalStorageService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(
        (response) => {
          this.localStorageService.setLocalStorage("token",response.data.token);
          this.localStorageService.setLocalStorage("email",loginModel.email);
          this.getUserByEmail()
          setTimeout(async () =>{return window.location.reload(await this.router.navigate(["/"]))},435);
          this.toastrService.success('Giriş Başarılı');
          
        },
        (responseError) => {
          this.toastrService.error(responseError.error, 'Doğrulama Hatası');
        }
      );
    } else {
      this.toastrService.error('Lütfen Formu Kontrol Ediniz.');
    }
  }
  getUserByEmail(){
    let email = this.localStorageService.getLocalStroge("email");
    this.userService.getUserByEmail(email).subscribe(response=>{
      this.user=response.data;
      for (let index = 0; index < this.user.length; index++) {
        const element = this.user[index];
        this.localStorageService.setLocalStorage("userId",element.userId)
      }
    })
  }
  
  
}
