import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowImgComponent } from './show-img.component';
import { HttpClientModule } from '@angular/common/http';
import { FileHandlerService } from '../Services/file-handler.service';
import { JwtService } from '../Services/jwt.service';



@NgModule({
  declarations: [ShowImgComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([{ path: '', component: ShowImgComponent }]),
  ],
  providers:[
      FileHandlerService,
      JwtService
  ]
})
export class ImgModule {}
