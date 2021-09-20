import { Component } from '@angular/core';
import { AppBase } from '../../app-base';
import { UserInfoService } from '../../services/user-info.service';
@Component({
  selector: 'app-lock',
  templateUrl: './lock.component.html'
})
export class LockComponent {
    constructor(userInfo: UserInfoService) {
    }
}
