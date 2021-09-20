import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'; 
import { environment } from '../environments/environment'; 
import { OAuthService } from 'angular-oauth2-oidc';
import { UserInfoService } from './services/user-info.service';
import { Guid } from 'guid-typescript';
import { Product } from './models/Product';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    private headers: HttpHeaders;
    //private qrurl: string = environment.qrCodeURI;
    //private restApiUrl: string = environment.restApiURI;
   
    private baseUrl: string = ``;


    constructor(private http: HttpClient, private oauthService: OAuthService, private userInfo: UserInfoService, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl;
        var authHeader = this.userInfo.authService.authorizationHeader();
        this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': authHeader });
    }

    //#region GetCurrent Okta
    public getCurrentOkta(): string {
        var claims = this.oauthService.getIdentityClaims();
        return claims ? claims['sub'] : '00ug48xt4lDoMI8OD5d5';
    }
    //#endregion

    private updateHeaders(contentType: string) {
        var authHeader = this.userInfo.authService.authorizationHeader();
        this.headers = new HttpHeaders({'Authorization': authHeader });
        if (contentType != null) {
            this.headers = new HttpHeaders({ 'Content-Type': contentType, 'Authorization': authHeader });
        }

    }
   
    //#region Get General Settings from API
    public getGeneralSettings(): any {
        
        //this.info("getGeneralSettings", "In getGeneralSettings");
        return this.http.get(`${this.baseUrl}api/Settings/generalsettings`);
    }
    //#endregion

    //#region Get user Settings from API
    public getUserSettings(): any {
        //this.info("getUserSettings", "In getUserSettings. calling the api");
        
        var authHeader = this.userInfo.authService.authorizationHeader();

        this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': authHeader });

        return this.http.get(`${this.baseUrl}api/Settings/usersettings?oktaId=${this.getCurrentOkta()}`, { headers: this.headers });
    }
    //#endregion
    
    //#region Get Product List
    public GetProductList() {
        try {
            //this.updateHeaders('application/json');
            //return this.http.get(this.baseUrl + 'api/Form/UseTemplate' + '?id=' + 'terst' + '', { headers: this.headers });

            //var authHeader = this.userInfo.authService.authorizationHeader();
            //this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': authHeader });
            //this.updateHeaders('application/json'); 
            return this.http.get(this.baseUrl + 'api/Product/GetProductList', { headers: this.headers });
        } catch (e) { throw e; }
    }
    //#endregion

    //#region Get Product By Id
    public GetProductById(id: string) {
        try {
            return this.http.get(this.baseUrl + 'api/Product/GetProductById' + '?Id=' + id + '', { headers: this.headers });
        } catch (e) { throw e; }
    }
    //#endregion

    //#region Delete Product By Id
    public DeleteProductById(id: string) {
        try {
            return this.http.delete(this.baseUrl + 'api/Product/DeleteProductById' + '?Id=' + id + '', { headers: this.headers });
        } catch (e) { throw e; }
    }
    //#endregion

    //#region Add or Update Product
    public AddUpdateProduct(product: Product) {
        try {
            return this.http.post(this.baseUrl + 'api/Product/AddUpdateProduct', product, { headers: this.headers });
        } catch (e) { throw e; }
    }
    //#endregion
}
