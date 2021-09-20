"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var Enums_1 = require("../../models/Enums");
var FullComponent = /** @class */ (function () {
    function FullComponent(router, oauthService, service, userInfo) {
        this.router = router;
        this.oauthService = oauthService;
        this.service = service;
        this.userInfo = userInfo;
        this.config = {};
        this.showModal = false;
        this.counter = 0;
        this.tick = 1000;
    }
    FullComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.userInfo.userInactive.subscribe(function () {
            if (!_this.showModal) {
                _this.showModal = true;
                if (_this.userInfo.hasUserSettings)
                    _this.counter = parseInt(_this.userInfo.warningTime) * 60; // Multiples of 60 seconds
                if (_this.counter > 0)
                    _this.countDown = rxjs_1.timer(0, _this.tick).subscribe(function () {
                        if (_this.counter <= 0)
                            _this.oauthService.logOut(); // Log out automatically 
                        else
                            --_this.counter;
                    });
            }
        });
    };
    FullComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this.countDown = null;
    };
    // relogin() {
    //     this.showModal = false;
    //     location.reload();
    // }
    FullComponent.prototype.relogin = function () {
        var _this = this;
        this.showModal = false;
        this.countDown.unsubscribe();
        var currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.router.navigate([currentUrl]);
        });
    };
    FullComponent.prototype.logout = function () {
        this.showModal = false;
        this.oauthService.logOut();
        localStorage.clear();
    };
    Object.defineProperty(FullComponent.prototype, "givenName", {
        get: function () {
            var claims = this.oauthService.getIdentityClaims();
            if (!claims) {
                return null;
            }
            return claims['name'];
        },
        enumerable: false,
        configurable: true
    });
    FullComponent.prototype.toHomePage = function () {
        if (this.userInfo.IsCurrentUserInGroup(Enums_1.Role.Admin)) {
            this.router.navigateByUrl('product-builder');
        }
        else if (this.userInfo.IsCurrentUserInGroup(Enums_1.Role.User)) {
            this.router.navigateByUrl('cart-builder');
        }
    };
    FullComponent = __decorate([
        core_1.Component({
            selector: "app-full-layout",
            templateUrl: "./full.component.html",
            styleUrls: ["./full.component.scss"],
        }),
        core_1.Injectable({ providedIn: 'root' })
    ], FullComponent);
    return FullComponent;
}());
exports.FullComponent = FullComponent;
//# sourceMappingURL=full.component.js.map