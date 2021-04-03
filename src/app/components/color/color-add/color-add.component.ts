import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder,FormControl,Validators} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colorAddFrom:FormGroup;


  constructor(private colorService:ColorService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createAddForm();
  }


  createAddForm(){
    this.colorAddFrom = this.formBuilder.group({
      colorId:["",Validators.required],
      colorName:["",Validators.required]
    })
  }

  add(){
    if(this.colorAddFrom.valid){
      let colorModel= Object.assign({},this.colorAddFrom.value);
      this.colorService.colorAdd(colorModel).subscribe(response=>{
        this.toastrService.success("Renk Başarıyla Eklendi");
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let index = 0; index < responseError.error.Errors.length; index++) {
            
            this.toastrService.error(responseError.error.Errors[index].ErrorMessage,"Doğrulama Hatası");
            
          }
        }else{
          this.toastrService.error(responseError.error.message,"Doğrulama Hatası")
        }
      })
    }
    else{
      this.toastrService.error("Renk Ekleme İşlemi Başarısız");
    }
  }

}
