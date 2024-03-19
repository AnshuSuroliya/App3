import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileHandlerService } from '../Services/file-handler.service';
import { JwtService } from '../Services/jwt.service';

@Component({
  selector: 'app-show-img',
  templateUrl: './show-img.component.html',
  styleUrls: ['./show-img.component.css']
})
export class ShowImgComponent {
  imageUrl: string | ArrayBuffer | null = null;
  viewingImg:boolean =false;
  path :string ="";
  name:string ='';
  owner:string="";

  ScannedData:any ={"Invoice_Id":"3123123","Date":"18/3/2001","Total":"56757","Tax":"678","Subtotal":"57435"}
  ScannedAddress:any={"Name":"Rohit","Phone":"8901564207","Address":"Vill-Kuksi, 123028,Mahendragarh"}
  
  constructor(private route:ActivatedRoute,private router:Router,private fileService:FileHandlerService,private jwtService: JwtService){}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => { 
      this.path = params['path']; 
    });
    this.owner +=localStorage.getItem("owner");
    this.fetchFile()
  }
  


  fetchFile(){
    this.fileService.fetchFile(this.path,this.owner).subscribe((data:any)=>{
       this.imageUrl =this.Base64ToImgConverter(data["content"]);
       this.ScannedData["Invoice_Id"] = data['scannedData']["invoice_id"];
       this.ScannedData["Subtotal"] = data['scannedData']["subtotal"];
       this.ScannedData["Tax"] = data['scannedData']["tax"];
       this.ScannedData["Total"] = data['scannedData']["total_amount"];
       this.ScannedData["Date"] = data['scannedData']["date"];


       this.ScannedAddress["Name"]=data['address']['name'];
       this.ScannedAddress["Address"]=data['address']['address'];
       this.ScannedAddress["Phone"]=data['address']['phone'];
     })
  }

  Base64ToImgConverter(data:string):string{
    return 'data:image/png;base64,' + data;
  }

  DownloadInvoice(){

  }

  Close(){
    this.router.navigate(['repo']);
  }
}
