import { group } from '@angular/animations';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class UserInfoService {

    private accessToken: string = "941FE75A-C5BF-459D-9C3B-DB8062430D90";
    private generalSettings: any;
    private userSettings: any;
    userActivity;
    userInactive: Subject<any> = new Subject();
    constructor(public authService: OAuthService) { }

    public setGeneralSettings(gs: any) {
        this.generalSettings = gs;
    }

    public getGeneralSettings(): any {
        return this.generalSettings;
    }

    public getClaimValue(claim: string): any {
        var claims = this.authService.getIdentityClaims();
        return claims[claim];
    }

    get currentOktaId() {
        return this.getClaimValue('sub');
    }

    get currentAccessToken(): string {
        return this.userSettings.accessToken;
    }

    get currentUserEmail(): string {
        return this.getClaimValue('email');
    }

    get currentUserName(): string {
        return this.getClaimValue('name');
    }


    get currentMerchantId(): string {
        return this.userSettings.merchantId;
    }

    get currentParnerId(): string {
        return this.userSettings.parnerId;
    }

    IsCurrentUserInGroup(groupName: string): boolean {
        var groups: Array<string> = this.getClaimValue('groups');
        var index = groups.indexOf(groupName);
        return index >= 0;
    }

    setUserSettings(us: any) {
        this.userSettings = us;
    }

    private _needUserSettings = true;
    set needUserSettings(b: boolean) {
        this._needUserSettings = b;
    }
    get needUserSettings(): boolean {
        return this._needUserSettings;
    }

    get hasUserSettings(): boolean {
        return this.userSettings != null || this.userSettings != undefined;
    }
    get imageSize(): string {
        return this.generalSettings.imageSize;
    }
    public setTimeout() {
        if (this.hasUserSettings) {
            let sessionTime = parseInt(this.sessionTime) * 60000;
            this.userActivity = setTimeout(() => this.userInactive.next(undefined), sessionTime);
        }
    }

    public refreshUserState() {
        clearTimeout(this.userActivity);
        this.setTimeout();
    }
    get sessionTime(): string {
        return this.generalSettings.sessionTime;
    }

    get warningTime(): string {
        return this.generalSettings.warningTime;
    }
}
