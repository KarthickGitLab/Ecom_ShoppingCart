import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'; 
import { AppBase } from '../../app-base';
import { UserInfoService } from '../../services/user-info.service';

@Component({
  selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{ 
    regularForm: FormGroup = Object.create(null); 
     
    result: any;
    constructor(private router: Router, userInfo: UserInfoService) {
    }
    ngOnInit() {
        this.regularForm = new FormGroup({
            'username': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]), 
            'firstName': new FormControl(null, [Validators.required]),
            'lastName': new FormControl(null, [Validators.required])
        }, { updateOn: 'blur' });
    }

    onSubmit() {
        if (this.regularForm.invalid) {
            return;
        }        

    }
}
