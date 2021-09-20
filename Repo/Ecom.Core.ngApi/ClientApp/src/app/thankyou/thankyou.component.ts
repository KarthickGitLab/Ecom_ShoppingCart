import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FullComponent } from '../layouts/full/full.component';
import { UserInfoService } from '../services/user-info.service';

@Component({
    selector: 'app-thankyou',
    templateUrl: './thankyou.component.html',
    styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {

    constructor(private userInfo: UserInfoService, private fullComponent: FullComponent, private router: Router) {
        this.userInfo.refreshUserState();
    }

    ngOnInit(): void {
        localStorage.clear();
    }
    gotoCart() {
        this.router.navigateByUrl('cart-builder');
    }
}
