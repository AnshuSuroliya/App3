import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomePageComponent } from './home-page.component';
import { FileHandlerService } from '../Services/file-handler.service';
import { JwtService } from '../Services/jwt.service';
import { RepoService } from '../Services/repo.service';
import { CheckService } from '../Services/check.service';
import { ValidatorService } from '../Services/validator.service';



@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: HomePageComponent }]),
  ],
  providers:[
      FileHandlerService,
      JwtService,
      RepoService,
      CheckService,
      ValidatorService
  ]
})
export class HomePageModule {}
