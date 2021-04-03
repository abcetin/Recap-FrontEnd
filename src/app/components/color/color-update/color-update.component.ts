import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder,FormControl,Validators} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  colorUpdateForm:FormGroup;
  colors:Color[];
  color:Color[];
  id:number;
  colorId:number;
  colorName:string;

  constructor(private colorService:ColorService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createUpdateFrom();
    this.getColors();
  }

  createUpdateFrom(){
    this.colorUpdateForm = this.formBuilder.group({
      id:["",Validators.required],
      colorId:["",Validators.required],
      colorName : ["",Validators.required]
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data
    })
  }

  getColorById(id:number){
    this.colorService.getColorById(id).subscribe(response=>{
      this.color=response.data
      for (let index = 0; index < this.color.length; index++) {
        const element = this.color[index];
        this.id = element.id;
        this.colorId=element.colorId;
        this.colorName = element.colorName;
      }
    })
  }

  update(){
    if(this.colorUpdateForm.valid){
      let colorModel = Object.assign({},this.colorUpdateForm.value)
      this.colorService.colorUpdate(colorModel).subscribe(response=>{
        this.toastrService.success("Renk Başarıyla Güncellendi")
      },responseError=>{
        
          this.toastrService.error(responseError.error.message,"Doğrulama Hatası")
      })
    }
  }

}
