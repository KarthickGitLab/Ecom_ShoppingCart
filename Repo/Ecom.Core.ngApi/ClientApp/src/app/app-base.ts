import { UserInfoService } from './services/user-info.service'

export class AppBase {

    constructor(protected className: string,  protected userInfo: UserInfoService) {
        this.userInfo.refreshUserState();
    }
    private authRetry = 0;
    protected loadComponentData(fn: () => void) {
        if (this.authRetry++ > 25) {
            return;
        }
        setTimeout(function (thisComponent) {
            if (!thisComponent.userInfo.hasUserSettings) {
                thisComponent.loadData(fn);
            }
            else {
                fn();
            }
        }, 250, this);
    }

}
