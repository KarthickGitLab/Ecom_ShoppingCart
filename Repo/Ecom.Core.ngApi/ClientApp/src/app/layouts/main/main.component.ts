import { Component , OnInit,  OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { AppBase } from '../../app-base';
import { UserInfoService } from '../../services/user-info.service';
import { AppService } from '../../app-service.service';
import { timer, Subscription } from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  public showModal: boolean = false;
  private subscription: Subscription;
  public countDown: Subscription;
  public counter = 0;
  public tick = 1000;

  isTimeLabelactive:boolean=false;
    constructor(private router: Router, private oauthService: OAuthService,private userInfo: UserInfoService, private appservice: AppService) { 
      

  }

  goToForms(){
    localStorage.removeItem('formId');
    this.router.navigate(['./forms', 'new']);
  
  }
  get givenName() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
        return null;
    }
    return claims['name'];
  }
    login() {
        this.oauthService.initImplicitFlow();
    }

    logout() {
        this.oauthService.logOut();
    }
    redirectPortal() {
     
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
//   relogin() {
//       this.showModal = false;
//       location.reload();
//   }
  relogin() {
    this.showModal = false;
    this.countDown.unsubscribe();
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
        });        
    }
  public userLogout() {
      this.showModal = false;
      this.oauthService.logOut();
  }

}
