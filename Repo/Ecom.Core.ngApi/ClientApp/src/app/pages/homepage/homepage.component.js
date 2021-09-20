"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomepageComponent = void 0;
var core_1 = require("@angular/core");
var Enums_1 = require("../../models/Enums");
var HomepageComponent = /** @class */ (function () {
    function HomepageComponent(router, userInfo) {
        this.router = router;
        this.userInfo = userInfo;
    }
    HomepageComponent.prototype.ngOnInit = function () {
        if (this.userInfo.IsCurrentUserInGroup(Enums_1.Role.Admin)) {
            this.router.navigateByUrl('product-builder');
        }
        else if (this.userInfo.IsCurrentUserInGroup(Enums_1.Role.User)) {
            this.router.navigateByUrl('cart-builder');
        }
    };
    HomepageComponent.prototype.goToForms = function () {
        localStorage.removeItem('formId');
        this.router.navigate(['./forms', 'new']);
    };
    HomepageComponent = __decorate([
        core_1.Component({
            selector: 'app-homepage',
            templateUrl: './homepage.component.html',
            styleUrls: ['./homepage.component.css']
        })
    ], HomepageComponent);
    return HomepageComponent;
}());
exports.HomepageComponent = HomepageComponent;
//# sourceMappingURL=homepage.component.js.map