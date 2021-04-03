import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css'],
})
export class BrandUpdateComponent implements OnInit {
  brandUpdateFrom: FormGroup;
  brands: Brand[] = [];
  brand: Brand[];
  id: number;
  brandId: number;
  brandName: string;

  constructor(
    private brandService: BrandService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.createBrandAddFrom();
    this.getBrands();
  }

  createBrandAddFrom() {
    this.brandUpdateFrom = this.formBuilder.group({
      id: ['', Validators.required],
      brandId: ['', Validators.required],
      brandName: ['', Validators.required],
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getById(id: number) {
    this.brandService.getById(id).subscribe((response) => {
      this.brand = response.data;
      for (let index = 0; index < this.brand.length; index++) {
        const element = this.brand[index];
        this.id = element.id;
        this.brandId = element.brandId;
        this.brandName = element.brandName;
      }
    });
  }

  update() {
    
      if (this.brandUpdateFrom.valid) {
        let brandModel = Object.assign({}, this.brandUpdateFrom.value);
        this.brandService.brandUpdate(brandModel).subscribe(
          (response) => {
            this.toastrService.success('Model Başarıyla Güncellendi');
          },
          (responseError) => {
            if (responseError.error.Errors.length > 0) {
              for (
                let index = 0;
                index < responseError.error.Errors.length;
                index++
              ) {
                this.toastrService.error(
                  responseError.error.Errors[index].ErrorMessage,
                  'Doğrulama Hatası'
                );
              }
            } else {
              this.toastrService.error(
                responseError.error.message,
                'Doğrulama Hatası'
              );
            }
          }
        );
      } else {
        this.toastrService.error(
          'Ekleme İşlemi Başarısız Formu Kontrol Ediniz.'
        );
      }
    } 
  }

