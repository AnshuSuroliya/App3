import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckService } from '../Services/check.service';
import { JwtService } from '../Services/jwt.service';
import { RepoService } from '../Services/repo.service';
import { ValidatorService } from '../Services/validator.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{

  jwtToken :string  = "";
  userEmail:string = "";
  contents :any=[];
  repoErr:string ="";

  NewRepoWindow:boolean =false;
  newRepoName:string ="";
  repoDisc:string ="";
  tempUserEmail:string="";
  accessors:string[]=[];
  RepoNameError:string ="";
  emailError:string="";
  
  constructor(private route:ActivatedRoute,private router:Router,private reposService:RepoService,private jwtService: JwtService,private validatorService:ValidatorService,private checkservice:CheckService){}
  
  ngOnInit(): void {
    this.jwtToken=this.jwtToken+localStorage.getItem("jwtToken");
    this.userEmail = this.jwtService.getClaim(this.jwtToken,"email");
    localStorage.removeItem("repoName");
    localStorage.removeItem("owner");
    localStorage.setItem("path","");
    this.fetchRepos();
  }

  ToogleNewRepoWindow(value:boolean){
    this.NewRepoWindow = value;
  }


  addUser(){
    if(!this.validatorService.TestEmailSyntax(this.tempUserEmail)){
      this.emailError ="Enter Valid Email!";return;
    }else{this.emailError="";}

    this.checkservice.IsEmailRegistred(this.tempUserEmail).subscribe((res)=>{
      if(!res){
        this.emailError="Email is not registred!";
        return;
      }
      else {this.emailError="";
      this.accessors.push(this.tempUserEmail);
      this.tempUserEmail="";}
    })

  }

  removeUser(email:string){
    const index = this.accessors.indexOf(email);
    if (index > -1) { 
      this.accessors.splice(index, 1); 
    }
  }

  MakeNewRepo(){
    if(!this.validatorService.TestNameSyntax(this.newRepoName)){
      this.RepoNameError="Name must have Alphabats , numbers and underscore only!";return;
    }else{this.RepoNameError="";}

    this.reposService.createRepo({"name":this.newRepoName,"description":this.repoDisc,"emailList":this.accessors}).subscribe((res:any)=>{
      if(res["message"]=="Name exist!"){
        this.RepoNameError ="Collection Name exist!";
      }
      else{
        this.repoErr ="";
        this.fetchRepos();
      }
    })
    this.ToogleNewRepoWindow(false);
    this.newRepoName = "";
  }

  fetchRepos(){
    this.reposService.fetchRepos().subscribe((res:any)=>{
      this.contents = res["repos"];
      console.log(res);
    })
  }

  OpenRepo(owner:string,name:string){
    localStorage.setItem("repoName",name);
    localStorage.setItem("owner",owner);
    this.router.navigate(["repo"]);
  }

  ToManageRepo(name:string,owner:string){
    localStorage.setItem("repoName",name);
    localStorage.setItem("owner",owner);
      this.router.navigate(["manageRepo",name]);
  }

  isOwner(id:any){
    return (id==this.jwtService.getClaim(localStorage.getItem("jwtToken")+"", "Id"));
  }

  doubleClick(name:string){  
      console.log("open "+name);
  }

}
