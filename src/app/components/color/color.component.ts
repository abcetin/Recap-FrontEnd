import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Color } from 'src/app/models/color';
import { ColorDataService } from 'src/app/services/color-data.service';
import { ColorService } from 'src/app/services/color.service';
import { ColorUpdateModalComponent } from './color-update/color-update-modal/color-update-modal.component';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  colors : Color[] =[]
  dataLoaded = false;
  currentColor:string;
  filterText="";
  modalRef:BsModalRef;
  selectColor:Color;
  colorId:number;
  id:number;
  colorName:string;

  constructor(private colorService:ColorService,
    private colorDataSerivce:ColorDataService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getColors();
    this.colorDataSerivce.currentId.subscribe(response=>this.id = response);
    this.colorDataSerivce.currentColorId.subscribe(response=>this.colorId = response);
    this.colorDataSerivce.currentColorName.subscribe(response=>this.colorName = response);
  }
  getColors(){
    this.colorService.getColors().subscribe((response) => {
      this.colors=response.data;
      this.dataLoaded=true;
    })
  }

  getAllColorClass(){
    if(!this.currentColor){
      return 'list-group-item active';
    }
    else{
      return 'list-group-item';
    }
  }

  setCurrentAllColor(color:string){
    color="";
    this.currentColor=color;
  }

  setCurrentColor(color:string){
   this.currentColor=color;
  }

  getCurrentColorClass(color:string){
    if(color==this.currentColor){
      return "list-group-item active"
    }
    else
    {
      return 'list-group-item'
    }
  }

  update(color:Color){
    this.modalRef = this.modalService.show(ColorUpdateModalComponent)
    this.selectColor = color;
    this.id = this.selectColor.id;
    this.colorId = this.selectColor.colorId;
    this.colorName = this.selectColor.colorName;
    this.colorDataSerivce.sendColor(this.id,this.colorId,this.colorName)
  }
}
