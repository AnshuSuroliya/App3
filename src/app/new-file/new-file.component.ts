import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FileHandlerService } from '../Services/file-handler.service';

@Component({
  selector: 'app-new-file',
  templateUrl: './new-file.component.html',
  styleUrls: ['./new-file.component.css']
})
export class NewFileComponent implements OnInit {
  path :string ="";
  type:string ='files';
  repoName:string="";
  owner:string="";
  formDisabled:boolean =false;
  updating:boolean =false;
  CreateError="";

  imageInput:File |null =null;
  name:string="";

  constructor(private router :Router,private route:ActivatedRoute,private fileService:FileHandlerService){
  }
  
  ngOnInit(): void {
    this.path =this.route.snapshot.params["path"];
    this.type =this.route.snapshot.params["type"];
    this.repoName +=localStorage.getItem("repoName");
    this.owner +=localStorage.getItem("owner");
  }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.imageInput = fileList[0];
    }
  }
 
  goBack(){
    this.router.navigate(["repo"]);
  }

  UploadFile(){
    this.name = this.name.toUpperCase();
    let savename =this.name;
    if(this.type=='file')savename += "." +this.imageInput?.name.split(".")[1].toUpperCase();
    
    let formData =new FormData();
    formData.append("name",savename);
    formData.append("path",this.path);
    formData.append("repoName",this.repoName);
    formData.append("owner",this.owner);
    if(this.imageInput!=null){
      formData.append("file",this.imageInput);
    }
    
    if(this.type=="file"){
            this.fileService.uploadFile(formData).subscribe((res :any)=>{
              console.log(res);
              this.updating =false;
                if(res['message']=="Saved!"){
                  this.router.navigate(["repo"])
                  this.CreateError="";
                }
                else{
                  this.CreateError=res['message'];
                  if(res['message']=="Duplicate"){
                    this.updating =false;
                  }
                }
                this.formDisabled =false;
            })
    }else{
              this.fileService.uploadFolder(formData).subscribe((res :any)=>{
                console.log(res);
                  if(res['message']=="Saved!"){
                    this.router.navigate(["repo"]);
                    this.CreateError="";
                  }
                  else{
                    this.CreateError=res['message'];
                  }
                  this.formDisabled =false;
              })
    }
   
  }

  UpdateFile(){
    //if(this.type=='file')this.name = this.name.toUpperCase()+"." +this.imageInput?.name.split(".")[1].toUpperCase();
    let formData =new FormData();
    formData.append("name",this.name);
    formData.append("path",this.path);
    formData.append("repoName",this.repoName);
    formData.append("owner",this.owner);
    if(this.imageInput!=null){
      formData.append("file",this.imageInput);
    } 
    
    this.fileService.updateFile(formData).subscribe((res :any)=>{
          if(res['message']=="Saved!"){
              this.router.navigate(["repo"])
                this.CreateError="";
              }
              else{
                this.CreateError=res['message'];
              }
              this.formDisabled =false;
            })
  }

}
