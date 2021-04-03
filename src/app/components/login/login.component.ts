import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator, FormBuilder, Validators,} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    private toastrService: ToastrService,
    private router:Router,
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
          this.localStorageService.setLocalStorage("email",loginModel.email)
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
  
  
}
