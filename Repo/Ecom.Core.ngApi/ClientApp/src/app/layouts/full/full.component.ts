import { Component, OnInit, Injectable,  OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
declare var $: any;

import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { OAuthService } from 'angular-oauth2-oidc'; 
import { AppService } from "../../app-service.service";
import { AppBase } from '../../app-base';
import { UserInfoService } from '../../services/user-info.service';
import { timer, Subscription } from "rxjs";
import { Role } from "../../models/Enums";

@Component({
    selector: "app-full-layout",
    templateUrl: "./full.component.html",
    styleUrls: ["./full.component.scss"],
})
@Injectable({ providedIn: 'root' })
export class FullComponent  implements OnInit, OnDestroy {
    public config: PerfectScrollbarConfigInterface = {};
    public showModal: boolean = false;
    private subscription: Subscription;
    public countDown: Subscription;
    public counter = 0;
    public tick = 1000;

    constructor(public router: Router, private oauthService: OAuthService, private service: AppService, private userInfo: UserInfoService) {

    }

        
    ngOnInit() { 
        this.subscription = this.userInfo.userInactive.subscribe(() => {
            if (!this.showModal) {
                this.showModal = true;
                if (this.userInfo.hasUserSettings)
                    this.counter = parseInt(this.userInfo.warningTime) * 60; // Multiples of 60 seconds
                if (this.counter > 0)
                    this.countDown = timer(0, this.tick).subscribe(() => {
                      if (this.counter <= 0)
                         this.oauthService.logOut(); // Log out automatically 
                      else
                       --this.counter;
                    });
            }            
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.countDown = null;
    }
    // relogin() {
    //     this.showModal = false;
    //     location.reload();
    // }
    relogin() {
        this.showModal = false;
        this.countDown.unsubscribe();
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
        });        
    }
    
    public logout() {
        this.showModal = false;
        this.oauthService.logOut();
        localStorage.clear();
    }

    
    get givenName() {
        const claims = this.oauthService.getIdentityClaims();
        if (!claims) {
            return null;
        }
        return claims['name'];
    }
    toHomePage() {
        if (this.userInfo.IsCurrentUserInGroup(Role.Admin)) {
            this.router.navigateByUrl('product-builder');
        }
        else if (this.userInfo.IsCurrentUserInGroup(Role.User)) {
            this.router.navigateByUrl('cart-builder');
        }
    }
}
