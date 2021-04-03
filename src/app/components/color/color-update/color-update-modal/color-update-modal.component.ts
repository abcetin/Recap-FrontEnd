import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder,FormControl,Validators} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';
import { ColorDataService } from 'src/app/services/color-data.service';

@Component({
  selector: 'app-color-update-modal',
  templateUrl: './color-update-modal.component.html',
  styleUrls: ['./color-update-modal.component.css']
})
export class ColorUpdateModalComponent implements OnInit {

  colorUpdateFrom : FormGroup;
  id:number;
  colorId:number;
  colorName:string;


  constructor(private colorService:ColorService,
              private toastrService:ToastrService,
              private formBuilder:FormBuilder,
              private dataService:ColorDataService) { }

  ngOnInit(): void {
    this.createBrandAddFrom();
    this.dataService.currentId.subscribe(response=>this.id=response)
    this.dataService.currentColorId.subscribe(response=>this.colorId=response)
    this.dataService.currentColorName.subscribe(response=>this.colorName=response)
  }
  createBrandAddFrom(){
    this.colorUpdateFrom = this.formBuilder.group({
      id:[""],
      colorId:["",Validators.required],
      colorName:["",Validators.required]
    })
  }

  
  update(){
    
    if(this.colorUpdateFrom.valid){
      let colorModel = Object.assign({},this.colorUpdateFrom.value);
      colorModel.id = this.id
      console.log(colorModel)
      this.colorService.colorUpdate(colorModel).subscribe(response=>{
        this.toastrService.success("Marka Başarıyla Güncellendi")
      },responseError=>{
        this.toastrService.error(responseError.error.message,"Doğrulama Hatası")
      })

    }
    else{
      this.toastrService.error("Ekleme İşlemi Başarısız Formu Kontrol Ediniz.")
    }
  }
}
