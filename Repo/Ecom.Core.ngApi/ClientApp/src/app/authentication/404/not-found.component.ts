import { Component, AfterViewInit } from '@angular/core';
import { AppBase } from '../../app-base';
import { UserInfoService } from '../../services/user-info.service';
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html'
})
export class NotfoundComponent implements AfterViewInit {
    constructor(userInfo: UserInfoService) {
    }
  ngAfterViewInit() {}
}
