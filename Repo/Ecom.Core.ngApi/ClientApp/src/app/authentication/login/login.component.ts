import { Component } from '@angular/core';
import { AppBase } from '../../app-base';
import { UserInfoService } from '../../services/user-info.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent  {
    constructor(userInfo: UserInfoService) {
    }

  loginform = true;
  recoverform = false;

  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }
}
