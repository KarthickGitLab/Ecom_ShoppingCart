"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login2Component = void 0;
var core_1 = require("@angular/core");
var Login2Component = /** @class */ (function () {
    function Login2Component(userInfo) {
        this.loginform = true;
        this.recoverform = false;
    }
    Login2Component.prototype.showRecoverForm = function () {
        this.loginform = !this.loginform;
        this.recoverform = !this.recoverform;
    };
    Login2Component = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login2.component.html'
        })
    ], Login2Component);
    return Login2Component;
}());
exports.Login2Component = Login2Component;
//# sourceMappingURL=login2.component.js.map