import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

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

  constructor(private colorService:ColorService) { }

  ngOnInit(): void {
    this.getColors();
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
}
