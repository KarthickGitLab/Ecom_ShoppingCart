import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppBase } from '../../app-base';
import { Role } from '../../models/Enums';
import { UserInfoService } from '../../services/user-info.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

    constructor(private router: Router,private userInfo: UserInfoService) {

    }

    ngOnInit(): void {
        if (this.userInfo.IsCurrentUserInGroup(Role.Admin)) {
            this.router.navigateByUrl('product-builder');
        }
        else if (this.userInfo.IsCurrentUserInGroup(Role.User)) {
            this.router.navigateByUrl('cart-builder');
        }
  }
  goToForms(){
    
    localStorage.removeItem('formId');
    this.router.navigate(['./forms', 'new']);
  }
 }
