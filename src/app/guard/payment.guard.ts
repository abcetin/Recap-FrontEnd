import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CardService } from '../services/card.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentGuard implements CanActivate {

  constructor(private cardService:CardService,
    private toastrService:ToastrService, ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if(this.cardService.isAdded()){
        return true;
      }
      else{
        this.toastrService.info("Ödeme İşlemini Gerçekleştiriniz")
        return false;
      }
  }
  
}
