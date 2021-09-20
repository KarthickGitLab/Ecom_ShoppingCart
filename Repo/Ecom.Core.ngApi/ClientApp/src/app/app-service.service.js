"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var AppService = /** @class */ (function () {
    function AppService(http, oauthService, userInfo, baseUrl) {
        this.http = http;
        this.oauthService = oauthService;
        this.userInfo = userInfo;
        //private qrurl: string = environment.qrCodeURI;
        //private restApiUrl: string = environment.restApiURI;
        this.baseUrl = "";
        this.baseUrl = baseUrl;
        var authHeader = this.userInfo.authService.authorizationHeader();
        this.headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': authHeader });
    }
    //#region GetCurrent Okta
    AppService.prototype.getCurrentOkta = function () {
        var claims = this.oauthService.getIdentityClaims();
        return claims ? claims['sub'] : '00ug48xt4lDoMI8OD5d5';
    };
    //#endregion
    AppService.prototype.updateHeaders = function (contentType) {
        var authHeader = this.userInfo.authService.authorizationHeader();
        this.headers = new http_1.HttpHeaders({ 'Authorization': authHeader });
        if (contentType != null) {
            this.headers = new http_1.HttpHeaders({ 'Content-Type': contentType, 'Authorization': authHeader });
        }
    };
    //#region Get General Settings from API
    AppService.prototype.getGeneralSettings = function () {
        //this.info("getGeneralSettings", "In getGeneralSettings");
        return this.http.get(this.baseUrl + "api/Settings/generalsettings");
    };
    //#endregion
    //#region Get user Settings from API
    AppService.prototype.getUserSettings = function () {
        //this.info("getUserSettings", "In getUserSettings. calling the api");
        var authHeader = this.userInfo.authService.authorizationHeader();
        this.headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': authHeader });
        return this.http.get(this.baseUrl + "api/Settings/usersettings?oktaId=" + this.getCurrentOkta(), { headers: this.headers });
    };
    //#endregion
    //#region Get Product List
    AppService.prototype.GetProductList = function () {
        try {
            //this.updateHeaders('application/json');
            //return this.http.get(this.baseUrl + 'api/Form/UseTemplate' + '?id=' + 'terst' + '', { headers: this.headers });
            //var authHeader = this.userInfo.authService.authorizationHeader();
            //this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': authHeader });
            //this.updateHeaders('application/json'); 
            return this.http.get(this.baseUrl + 'api/Product/GetProductList', { headers: this.headers });
        }
        catch (e) {
            throw e;
        }
    };
    //#endregion
    //#region Get Product By Id
    AppService.prototype.GetProductById = function (id) {
        try {
            return this.http.get(this.baseUrl + 'api/Product/GetProductById' + '?Id=' + id + '', { headers: this.headers });
        }
        catch (e) {
            throw e;
        }
    };
    //#endregion
    //#region Delete Product By Id
    AppService.prototype.DeleteProductById = function (id) {
        try {
            return this.http.delete(this.baseUrl + 'api/Product/DeleteProductById' + '?Id=' + id + '', { headers: this.headers });
        }
        catch (e) {
            throw e;
        }
    };
    //#endregion
    //#region Add or Update Product
    AppService.prototype.AddUpdateProduct = function (product) {
        try {
            return this.http.post(this.baseUrl + 'api/Product/AddUpdateProduct', product, { headers: this.headers });
        }
        catch (e) {
            throw e;
        }
    };
    AppService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __param(3, core_1.Inject('BASE_URL'))
    ], AppService);
    return AppService;
}());
exports.AppService = AppService;
//# sourceMappingURL=app-service.service.js.map