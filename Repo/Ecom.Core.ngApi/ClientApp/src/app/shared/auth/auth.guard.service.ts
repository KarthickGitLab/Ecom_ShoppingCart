import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { AppBase } from '../../app-base';
import { UserInfoService } from '../../services/user-info.service';
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private oauthService: OAuthService, private router: Router,private userInfo: UserInfoService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.oauthService.hasValidIdToken()) {
            return true;
        }
        //this.router.navigate(['/dashboard']);
        this.oauthService.initImplicitFlow();
        return false;
    }
}
