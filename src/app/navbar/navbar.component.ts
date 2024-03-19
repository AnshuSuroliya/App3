import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  
  jwtToken:string ="";
  ngOnInit(): void {
    this.jwtToken=this.jwtToken+localStorage.getItem("jwtToken");
  }

  toggleSearchBar(){
    document.getElementsByClassName("nav")[0].classList.toggle("search");
    document.getElementsByClassName("nav")[0].classList.toggle("no-search");
    document.getElementsByClassName("search-input")[0].classList.toggle("search-active");
  }

  toggleMenu(){
    document.getElementsByClassName("nav")[0].classList.toggle("mobile-nav");
    document.getElementsByClassName("nav-item")[0].classList.toggle("is-active");
    document.getElementsByClassName("menu-toggle")[0].classList.toggle("is-active");
  }
  
}
