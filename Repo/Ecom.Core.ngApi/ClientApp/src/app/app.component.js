"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var angular_oauth2_oidc_jwks_1 = require("angular-oauth2-oidc-jwks");
var AppComponent = /** @class */ (function () {
    function AppComponent(oauthService, appService, userInfo, router) {
        var _this = this;
        this.oauthService = oauthService;
        this.appService = appService;
        this.userInfo = userInfo;
        this.router = router;
        this.generalSettings = null;
        this.title = 'app';
        appService.getGeneralSettings().subscribe(function (data) {
            _this.userInfo.setGeneralSettings(data);
            _this.generalSettings = data;
            _this.oauthService.redirectUri = window.location.origin;
            _this.oauthService.clientId = _this.generalSettings.oktaClientId;
            _this.oauthService.scope = _this.generalSettings.oktaScope;
            _this.oauthService.issuer = _this.generalSettings.oktaAuthUrl;
            _this.oauthService.tokenValidationHandler = new angular_oauth2_oidc_jwks_1.JwksValidationHandler();
            // Load Discovery Document and then try to login the user
            _this.oauthService.loadDiscoveryDocumentAndTryLogin().then(function (b) {
                if (b) {
                    if (_this.oauthService.hasValidAccessToken()) {
                        _this.userInfo.needUserSettings = false;
                        _this.appService.getUserSettings().subscribe(function (data) {
                            _this.userInfo.setUserSettings(data);
                            _this.router.navigate(['/home']);
                        }, function (err) {
                        });
                    }
                    else {
                    }
                }
                else {
                    if (window.location.href.indexOf("publish") > -1) {
                        return;
                    }
                    if (!_this.oauthService.hasValidAccessToken()) {
                        _this.oauthService.initImplicitFlow();
                    }
                }
            });
        }, function (err) {
        });
    }
    // This listener is used to identify the user actions.
    AppComponent.prototype.refreshUserState = function () {
        this.userInfo.refreshUserState();
    };
    __decorate([
        core_1.HostListener('window:mousemove'),
        core_1.HostListener('window:mousedown'),
        core_1.HostListener('window:keypress'),
        core_1.HostListener('window:keyup'),
        core_1.HostListener('window:scroll'),
        core_1.HostListener('window:touchstart'),
        core_1.HostListener('window:keydown')
    ], AppComponent.prototype, "refreshUserState", null);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map