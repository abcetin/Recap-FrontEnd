import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { BrandDataService } from 'src/app/services/brandData.service';
import { BrandUpdateModalComponent } from './brand-update/brand-update-modal/brand-update-modal.component';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  currentBrand: string = '';
  dataLoaded = false;
  filterText = '';
  modalRef: BsModalRef;
  selectBrand: Brand;
  brandId: number;
  id: number;
  brandName: string;

  constructor(
    private brandService: BrandService,
    public modalService: BsModalService,
    private dataService: BrandDataService,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.dataService.currentId.subscribe((response) => (this.id = response));
    this.dataService.currentBrandId.subscribe((response) => (this.brandId = response));
    this.dataService.currentBrandName.subscribe((response) => (this.brandName = response));
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded = true;
    });
  }

  getAllBrandClass() {
    if (!this.currentBrand) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }

  setCurrentAllBrand(brand: string) {
    this.currentBrand = brand;
  }

  setCurrentBrand(brand: string) {
    this.currentBrand = brand;
  }

  getCurrentBrandClass(brand: string) {
    if (brand == this.currentBrand) {
      return 'list-group-item active';
    } else brand == null;
    {
      return 'list-group-item';
    }
  }

  updateButton(brand: Brand) {
    if (localStorage.getItem('token')) {
      this.modalRef = this.modalService.show(BrandUpdateModalComponent);
      this.selectBrand = brand;
      this.id = this.selectBrand.id;
      this.brandId = this.selectBrand.brandId;
      this.brandName = this.selectBrand.brandName;
      this.dataService.sendBrand(this.id, this.brandId, this.brandName);
    } else {
      this.toastrService.info("Lütfen Giriş Yapınız")
    }
  }
}
