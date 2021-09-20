"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var MainComponent = /** @class */ (function () {
    function MainComponent(router, oauthService, userInfo, appservice) {
        this.router = router;
        this.oauthService = oauthService;
        this.userInfo = userInfo;
        this.appservice = appservice;
        this.showModal = false;
        this.counter = 0;
        this.tick = 1000;
        this.isTimeLabelactive = false;
    }
    MainComponent.prototype.goToForms = function () {
        localStorage.removeItem('formId');
        this.router.navigate(['./forms', 'new']);
    };
    Object.defineProperty(MainComponent.prototype, "givenName", {
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
    MainComponent.prototype.login = function () {
        this.oauthService.initImplicitFlow();
    };
    MainComponent.prototype.logout = function () {
        this.oauthService.logOut();
    };
    MainComponent.prototype.redirectPortal = function () {
    };
    MainComponent.prototype.ngOnInit = function () {
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
    MainComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this.countDown = null;
    };
    //   relogin() {
    //       this.showModal = false;
    //       location.reload();
    //   }
    MainComponent.prototype.relogin = function () {
        var _this = this;
        this.showModal = false;
        this.countDown.unsubscribe();
        var currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.router.navigate([currentUrl]);
        });
    };
    MainComponent.prototype.userLogout = function () {
        this.showModal = false;
        this.oauthService.logOut();
    };
    MainComponent = __decorate([
        core_1.Component({
            selector: 'app-main',
            templateUrl: './main.component.html',
            styleUrls: ['./main.component.css']
        })
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;
//# sourceMappingURL=main.component.js.map