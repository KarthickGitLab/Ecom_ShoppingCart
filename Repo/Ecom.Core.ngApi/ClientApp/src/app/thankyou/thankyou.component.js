"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThankyouComponent = void 0;
var core_1 = require("@angular/core");
var ThankyouComponent = /** @class */ (function () {
    function ThankyouComponent(userInfo, fullComponent, router) {
        this.userInfo = userInfo;
        this.fullComponent = fullComponent;
        this.router = router;
        this.userInfo.refreshUserState();
    }
    ThankyouComponent.prototype.ngOnInit = function () {
    };
    ThankyouComponent.prototype.gotoCart = function () {
        this.router.navigateByUrl('cart-builder');
    };
    ThankyouComponent = __decorate([
        core_1.Component({
            selector: 'app-thankyou',
            templateUrl: './thankyou.component.html',
            styleUrls: ['./thankyou.component.css']
        })
    ], ThankyouComponent);
    return ThankyouComponent;
}());
exports.ThankyouComponent = ThankyouComponent;
//# sourceMappingURL=thankyou.component.js.map