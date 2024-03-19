import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtDecode } from "jwt-decode";
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private jwtHelper: JwtHelperService;

  backendURL:string ="http://localhost:6767/"

  public validateToken(token:string){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("jwtToken")}`);
    return this.httpClient.get(this.backendURL+"check/validateJWT",{headers}).pipe(
      retry(0),
      catchError(this.processError)
    );
  }


  constructor(private httpClient:HttpClient) {
    this.jwtHelper = new JwtHelperService();
  }
  

  public decodeToken(token: string): any {
    return jwtDecode(token);
  }

  public getClaim(token: string, claimKey: string): any {
    const decodedToken = this.decodeToken(token);
    return decodedToken ? decodedToken[claimKey] : null;
  }

  processError(err: any) {
    let message = '';
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    //console.error(message);
    return throwError(() => message);
  }
  
}
