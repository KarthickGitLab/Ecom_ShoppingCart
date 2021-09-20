import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { AppBase } from '../../app-base';
import { UserInfoService } from '../../services/user-info.service';
import { Role } from '../../models/Enums';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private oauthService: OAuthService, private router: Router, private userInfo: UserInfoService) {

    }

    ngOnInit(): void {
        if (this.oauthService.hasValidIdToken()) {
            if (this.userInfo.IsCurrentUserInGroup(Role.Admin)) {
                this.router.navigateByUrl('product-builder');
            }
            else if (this.userInfo.IsCurrentUserInGroup(Role.User)) {
                this.router.navigateByUrl('cart-builder');
            }
        }
    }

}
