import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RepoService } from '../Services/repo.service';
import { RepoManageComponent } from './repo-manage.component';



@NgModule({
  declarations: [
    RepoManageComponent
  ],
  imports: [
      FormsModule,
    BrowserModule,
    
  ],
  providers: [
    RepoService
  ],
  bootstrap: [RepoManageComponent]
})
export class RepoManageModule { }
