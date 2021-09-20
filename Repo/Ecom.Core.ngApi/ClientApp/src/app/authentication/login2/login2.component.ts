import { Component } from '@angular/core';
import { AppBase } from '../../app-base';
import { UserInfoService } from '../../services/user-info.service';
@Component({
  selector: 'app-login',
  templateUrl: './login2.component.html'
})
export class Login2Component {
    constructor(userInfo: UserInfoService) {
    }

  loginform = true;
  recoverform = false;

  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }
}
