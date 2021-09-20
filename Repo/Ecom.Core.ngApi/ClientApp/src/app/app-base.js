"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppBase = void 0;
var AppBase = /** @class */ (function () {
    function AppBase(className, userInfo) {
        this.className = className;
        this.userInfo = userInfo;
        this.authRetry = 0;
        this.userInfo.refreshUserState();
    }
    AppBase.prototype.loadComponentData = function (fn) {
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
    };
    return AppBase;
}());
exports.AppBase = AppBase;
//# sourceMappingURL=app-base.js.map