import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepoHomeComponent } from './repo-home.component';
import { HttpClientModule } from '@angular/common/http';
import { FileHandlerService } from '../Services/file-handler.service';
import { JwtService } from '../Services/jwt.service';
import { CheckService } from '../Services/check.service';
import { ValidatorService } from '../Services/validator.service';



@NgModule({
  declarations: [RepoHomeComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([{ path: '', component:RepoHomeComponent}]),
  ],
  providers:[
      FileHandlerService,
      JwtService,
      CheckService,
      ValidatorService
  ]
})
export class RepoModule {}
