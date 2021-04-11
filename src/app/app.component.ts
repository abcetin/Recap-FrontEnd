import { Component } from '@angular/core';
import { User } from './models/user';
import { FindexService } from './services/findex.service';
import { LocalStorageService } from './services/local-storage.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rentacar';
  userId:number;
  constructor(private localStorageService:LocalStorageService,
    private findexService:FindexService,) {
    
  }
  ngOnInit(): void {
    this.userId = parseInt(this.localStorageService.getLocalStroge("userId"));
    
    this.getUserFindex(this.userId);
  }

  
  getUserFindex(id:number){
    this.findexService.getUserFindex(id).subscribe(response=>{
      this.localStorageService.setLocalStorage("findex",response.data.findexPuan)
    })
  }

  

}
