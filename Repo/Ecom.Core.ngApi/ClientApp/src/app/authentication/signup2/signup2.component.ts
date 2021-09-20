import { Component } from '@angular/core';
import { AppBase } from '../../app-base';
import { UserInfoService } from '../../services/user-info.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup2.component.html'
})
export class Signup2Component  {
    constructor(userInfo: UserInfoService) {
    }
}
