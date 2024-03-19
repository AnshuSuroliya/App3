import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { JwtService } from '../Services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInService implements CanActivate {

  constructor(private router:Router ,private jwtHelper:JwtService) { }
  
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    await this.jwtHelper.validateToken(localStorage.getItem("jwtToken")+"").subscribe((res:any)=>{
        if(res==false || res=="false"){
          this.router.navigate(["authpage"]);
          return false;
        }
        return true;
    })
    return true;
  }
}
