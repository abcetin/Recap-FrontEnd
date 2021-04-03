import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder,FormControl,Validators} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-delete',
  templateUrl: './color-delete.component.html',
  styleUrls: ['./color-delete.component.css']
})
export class ColorDeleteComponent implements OnInit {

  colorDeleteForm:FormGroup;
  color:Color[];
  colors:Color[];
  id:number;
  colorId:number;

  constructor(private colorService:ColorService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createDeleteForm();
    this.getColors();
  }


  createDeleteForm(){
    this.colorDeleteForm = this.formBuilder.group({
      id:["",Validators.required],
      colorId:["",Validators.required],
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
    })
  }

  getColorById(id:number){
    this.colorService.getColorById(id).subscribe(response=>{
      this.color=response.data;
      for (let index = 0; index < this.color.length; index++) {
        const element = this.color[index];
        id=element.id;
        this.colorId=element.id
      }
    })
  }

  delete(){
    if(this.colorDeleteForm.valid){
      let colorModel = Object.assign({},this.colorDeleteForm.value);
      colorModel.id = parseInt(this.id.toString())
      this.colorService.colorDelte(colorModel.id).subscribe(response=>{
        this.toastrService.success("Renk Başarıyla Silindi");
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
  }

}
