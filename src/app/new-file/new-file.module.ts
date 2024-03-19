import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewFileComponent } from './new-file.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FileHandlerService } from '../Services/file-handler.service';



@NgModule({
  declarations: [NewFileComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: NewFileComponent }]),
  ],
  providers:[
    FileHandlerService
  ]
})
export class DirectoryModule {}
