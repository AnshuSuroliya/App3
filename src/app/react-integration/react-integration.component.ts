import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

declare const ReactMicrofrontend: any;
declare const AuthenticationApp: any;

@Component({
  selector: 'app-react-integration',
  template: `
    <div #reactMicrofrontendContainer></div>
    <div #authenticationContainer></div>
  `,
  styleUrls: ['./react-integration.component.css']
})
export class ReactIntegrationComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Initialize React Microfrontend
    ReactMicrofrontend.init(document.querySelector('#reactMicrofrontendContainer'));

    // Initialize Authentication React App
    AuthenticationApp.init(document.querySelector('#authenticationContainer'));
  }

  ngOnDestroy(): void {
    // Cleanup resources
  }
}