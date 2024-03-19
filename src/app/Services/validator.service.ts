import { Injectable } from '@angular/core';
import { CheckService } from './check.service';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor(private checkService:CheckService) { }

  TestEmailSyntax(email:string){
    if(email.length<5)return false;
    var validRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.match(validRegex);
  }

  IsUserRegistred(email:string):boolean{
    this.checkService.IsEmailRegistred(email).subscribe((res:any)=>{
      return res;
    })
    return false;
  }

  TestNameSyntax(name:string){
    const nameRegex = /^(?=.*[A-Za-z])[A-Za-z0-9_]*$/;
    return nameRegex.test(name);
  }


                
}
