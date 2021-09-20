import { Component,HostListener } from '@angular/core';
import {  OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';

import { AppService } from './app-service.service';
import { AppBase } from './app-base';
import { UserInfoService } from './services/user-info.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    private generalSettings: any = null;
    title = 'app';
    constructor(private oauthService: OAuthService, private appService: AppService,
        private userInfo: UserInfoService, private router: Router) {
        
        appService.getGeneralSettings().subscribe(
            (data: any) => {
                this.userInfo.setGeneralSettings(data);
                this.generalSettings = data;
                this.oauthService.redirectUri = window.location.origin;
                this.oauthService.clientId = this.generalSettings.oktaClientId;
                this.oauthService.scope = this.generalSettings.oktaScope;
                this.oauthService.issuer = this.generalSettings.oktaAuthUrl;
                this.oauthService.tokenValidationHandler = new JwksValidationHandler();
                // Load Discovery Document and then try to login the user
                this.oauthService.loadDiscoveryDocumentAndTryLogin().then(b => {
                    if (b) {
                        if (this.oauthService.hasValidAccessToken()) {
                            this.userInfo.needUserSettings = false;
                            this.appService.getUserSettings().subscribe(
                                (data: any) => {
                                    this.userInfo.setUserSettings(data);
                                    this.router.navigate(['/home']);
                                },
                                (err) => {
                                });
                           
                        }
                        else {
                        }
                    }
                    else {
                        if (window.location.href.indexOf("publish") > -1) {
                            return;
                        }
                        if (!this.oauthService.hasValidAccessToken()) {
                            this.oauthService.initImplicitFlow();
                        } 
                    }
                });

            },
            (err) => {
            });
    }

    // This listener is used to identify the user actions.
    @HostListener('window:mousemove')
    @HostListener('window:mousedown')
    @HostListener('window:keypress')
    @HostListener('window:keyup')
    @HostListener('window:scroll')
    @HostListener('window:touchstart')
    @HostListener('window:keydown')
    refreshUserState() {
        this.userInfo.refreshUserState();
    }
}
