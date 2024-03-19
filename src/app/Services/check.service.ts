import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckService {
  backendURL:string ="http://localhost:6767/"

  constructor(private httpClient:HttpClient) { } 

  IsEmailRegistred(email:string){
    return this.httpClient.get(this.backendURL+"check/email?email="+email).pipe(
      retry(0),
      catchError(this.processError)
    );
  }

  getUserDetails(id:string){
    return this.httpClient.get(this.backendURL+"check/get/user?id="+id).pipe(
      retry(0),
      catchError(this.processError)
    );
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
