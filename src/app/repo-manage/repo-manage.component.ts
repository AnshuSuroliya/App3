import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckService } from '../Services/check.service';
import { JwtService } from '../Services/jwt.service';
import { RepoService } from '../Services/repo.service';
import { ValidatorService } from '../Services/validator.service';

@Component({
  selector: 'app-repo-manage',
  templateUrl: './repo-manage.component.html',
  styleUrls: ['./repo-manage.component.css']
})
export class RepoManageComponent implements OnInit {
  selfEmail:string ="";
  ownerEmail:string ="";
  owner:string="";
  repoName:string="";
  jwtToken :string  = "";
  content:any;
  emailList:string[]=[];
  tempUserEmail:string="";
  emailError:string="";

  constructor(private route:ActivatedRoute,private router:Router,private repoService:RepoService,private jwtService:JwtService,private validatorService:ValidatorService,private checkService:CheckService){}

  ngOnInit(): void {
    this.owner +=localStorage.getItem("owner");
    this.repoName +=localStorage.getItem("repoName");
    
    this.jwtToken=this.jwtToken+localStorage.getItem("jwtToken");
    this.selfEmail =this.jwtService.getClaim(this.jwtToken,"email");
    this.fetchRepo();
  }

  isOwner():Boolean{
    return true;
  }

  fetchRepo(){
     this.emailList=[];
     this.repoService.fetchRepo(this.repoName).subscribe((data:any)=>{
      this.content =data['repo']['accessUser'];
      for(let i=0;i<this.content.length;i++){
        if(this.content[i]['email']==this.selfEmail)continue;
        this.emailList.push(this.content[i]['email']);
      }
      this.ownerEmail = data['owner_email'];
      if(this.ownerEmail!=this.selfEmail){
        this.router.navigate([""]);
      }
    })
  }

  addUser(){
    if(!this.validatorService.TestEmailSyntax(this.tempUserEmail)){
      this.emailError ="Enter Valid Email!";return;
    }else{this.emailError="";}

    this.checkService.IsEmailRegistred(this.tempUserEmail).subscribe((res)=>{
      if(!res){
        this.emailError="Email not Registred!";return;
      }else{
        const index = this.emailList.indexOf(this.tempUserEmail);
        if (index > -1 || this.tempUserEmail==this.selfEmail) { 
          this.emailError ="User already have access!";
          ;return;
        } else{this.emailError="";}
    
        this.emailList.push(this.tempUserEmail);
        this.tempUserEmail="";
      }
    })

  }

  removeUser(){
    if(!this.validatorService.TestEmailSyntax(this.tempUserEmail)){
      this.emailError ="Enter Valid Email!";return;
    }else{this.emailError="";}

    if(this.tempUserEmail==this.selfEmail){this.emailError="Cannot Remove Owner!";return;}
    const index = this.emailList.indexOf(this.tempUserEmail);
    if (index > -1) { 
      this.emailError="";
      this.emailList.splice(index, 1); 
    }else{
      this.emailError="User Not Found!";return;
    }
    this.tempUserEmail="";
  }

  removeUserEmail(email:string){
    const index = this.emailList.indexOf(email);
    if (index > -1) { 
      this.emailList.splice(index, 1); 
    }
  }

  UpdateRepo(){
    this.repoService.updateRepo({"name":this.repoName,"emaillist":this.emailList}).subscribe((res:any)=>{
      alert(res['message']);
      this.fetchRepo();
    });
  }

  DeleteRepo(){
    this.repoService.deleteRepo({"name":this.repoName}).subscribe((res)=>{
      this.router.navigate([""]);
    })
  }

  GoToHome(){
    this.router.navigate([""]);
  }
}
