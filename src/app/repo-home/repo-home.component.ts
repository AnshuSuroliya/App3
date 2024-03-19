import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FileHandlerService } from '../Services/file-handler.service';
import { JwtService } from '../Services/jwt.service';
import { RepoService } from '../Services/repo.service';

@Component({
  selector: 'app-repo-home',
  templateUrl: './repo-home.component.html',
  styleUrls: ['./repo-home.component.css']
})
export class RepoHomeComponent {
  path:string ="";
  owner:string="";
  repoName:string="";
  contents :any=[{"name":""},{"name":""}];
  jwtToken :string  = "";
  pathArray:string[] =[""];
  SelectedFileName:string="";
  SelectedType:string="file";
  SelectedFile:string="";
  Selected:boolean=false;
  
  constructor(private route:ActivatedRoute,private router:Router,private fileService:FileHandlerService,private jwtService: JwtService,private repoService:RepoService){}
  
  ngOnInit(): void {
    this.owner +=localStorage.getItem("owner");
    this.repoName +=localStorage.getItem("repoName");
    this.path=""+localStorage.getItem("path");
    this.pathArray = this.path.split('/');
    this.pathArray.pop();
    this.jwtToken=this.jwtToken+localStorage.getItem("jwtToken");
    this.fetchContent(this.path);
  }

  checkAcess(){
    this.repoService.CheckAccess(this.owner,this.repoName).subscribe((res:any)=>{
      if(res==false || res=="false"){
        this.router.navigate([""]);
      }
    })
  }

  goTo(i:number){
    let newpath ="";
    for(let j=0;j<=i;j++){
      newpath+=this.pathArray[j]+"/"
    }
    this.path =newpath;
    while(this.pathArray.length-1>i){this.pathArray.pop();console.log(this.pathArray);}
    this.fetchContent(this.path);
  }

  fetchContent(path:string){
      this.fileService.fetchContent(this.repoName,path,this.owner).subscribe((data:any)=>{
        this.contents =data["files"];
        
        this.contents.forEach((dir: { [x: string]: any; }) => {
          this.fileService.isFileScanned({"path":this.repoName+"/contents/"+path+dir['name'] ,"owner":this.owner}).subscribe((res2)=>{
            dir['scanned'] = res2;
          })
          console.log(dir);
          
        });

      })

      setTimeout(() => {
        this.Selected=false;this.SelectedFile="";
      }, 250);
  }

  doubleClick(name:string,type:string,url:string){  
    if(type =='dir'){
      this.pathArray.push(name);
      this.path =this.path+name+"/";
      localStorage.setItem("path",this.path);
      this.fetchContent(this.path);
    
    }
    else{ 
      let index = name.lastIndexOf('.');
      const ext = name.substring(index).toUpperCase();

      if(ext!=".JPG" && ext!=".PNG" && ext!='.WEBP'){
        alert("can only process Images!");
        return;
      }

      localStorage.setItem("path",this.path);
      this.router.navigate(["showImg",url]);
    }
  }

  
  deSelectFile(){
    document.getElementById(this.SelectedFileName)?.classList.remove("bg-blue-100");
    this.SelectedFile ="";
    this.Selected=false;
    this.SelectedFileName="";
  }

  SingleClick(name:string,type:string,url:string){
    setTimeout(() => {
      document.getElementById(name)?.classList.add("bg-blue-100");
      this.SelectedFileName = name;
      this.SelectedFile =url;
      this.Selected =true;
      this.SelectedType=type;
      console.log(this.SelectedFile);
    }, 200);
  }

  DeleteFile(){
    if(this.SelectedType=='dir'){
      this.DeleteFolder(this.SelectedFileName);
      return;
    }

    this.fileService.deleteFile(this.SelectedFile,this.owner).subscribe((res:any)=>{
        console.log(res);    
    })

    setTimeout(() => {
      this.fetchContent(this.path);  
    }, 300);
  }

  DeleteFolder(name:string){
    let isEmpty =false;
    this.fileService.fetchContent(this.repoName,this.path+name+"/",this.owner).subscribe((res:any)=>{
      console.log(res);
      isEmpty = res['files'].length==1;
      if(!isEmpty){
        alert("Folder must be Empty before deleting!");
        return;
      }
      else{
        this.fileService.deleteFile(this.SelectedFile+"/INIT",this.owner).subscribe((res:any)=>{  
        })
        setTimeout(() => {
          this.fetchContent(this.path);  
        }, 300);
      }
    })
  }

  MakeNewFile(){
    this.router.navigate(['addDirectory',this.path,'file']);
  }
  MakeNewFolder(){
    if(this.pathArray.length>=6){
      alert("cannot create any more nested Folders!")
      return;
    }
    this.router.navigate(['addDirectory',this.path,'folder']);
  }

  goBack(){
    if(this.path==""){
      this.router.navigate(['']);
      return;
    }
    
    this.pathArray.pop();
     let i = this.path.lastIndexOf("/");
     this.path =this.path.substring(0,i);
     i = this.path.lastIndexOf("/");
     this.path =this.path.substring(0,i+1);
     localStorage.setItem("path",this.path);
     console.log(this.path);
     this.fetchContent(this.path);
     
  }

}
