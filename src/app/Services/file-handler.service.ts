import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileHandlerService {

  backendURL:string ="http://localhost:6767/"

  constructor(private httpClient:HttpClient) { } 

  fetchRepos(){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("jwtToken")}`);
    return this.httpClient.get(this.backendURL+"repo/getAll",{headers}).pipe(
      retry(0),
      catchError(this.processError)
    );
  }

  createRepo(name:string){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("jwtToken")}`);
    return this.httpClient.post(this.backendURL+"repo/create",{name:name},{headers}).pipe(
      retry(0),
      catchError(this.processError)
    );
  }


  fetchContent(repoName:string,path:string,owner:string){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("jwtToken")}`);
    return this.httpClient.post(this.backendURL+"repository/fetch/content",{"reponame":repoName,path:path,owner:owner},{headers}).pipe(
      retry(0),
      catchError(this.processError)
    );
  }

  isFileScanned(data:any){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("jwtToken")}`);
    return this.httpClient.post(this.backendURL+"repository/isFileScanned",data,{headers}).pipe(
      retry(0),
      catchError(this.processError)
    );
  }

  fetchFile(path:string,owner:string){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("jwtToken")}`);
    return this.httpClient.post(this.backendURL+"repository/fetch/file",{path:path,owner:owner},{headers}).pipe(
      retry(0),
      catchError(this.processError)
    );
  }

  uploadFile(data:FormData){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("jwtToken")}`);
    return this.httpClient.post(this.backendURL+"repository/upload/file",data,{headers}).pipe(
      retry(0),
      catchError(this.processError)
    );
  }
  updateFile(data:FormData){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("jwtToken")}`);
    return this.httpClient.post(this.backendURL+"repository/update/file",data,{headers}).pipe(
      retry(0),
      catchError(this.processError)
    );
  }

  uploadFolder(data:FormData){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("jwtToken")}`);
    return this.httpClient.post(this.backendURL+"repository/upload/folder",data,{headers}).pipe(
      retry(0),
      catchError(this.processError)
    );
  }

  getScannedFile(githubFileId:string){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("jwtToken")}`);
    return this.httpClient.post(this.backendURL+"ScannedFiles/fetch",githubFileId,{headers}).pipe(
      retry(0),
      catchError(this.processError)
    );
  }

  deleteFile(path:string,owner:string){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("jwtToken")}`);
    return this.httpClient.post(this.backendURL+"repository/delete/file",{"path":path,owner:owner},{headers}).pipe(
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
