import { Component, EventEmitter, Injectable, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OAuthService } from 'angular-oauth2-oidc';
import { Guid } from 'guid-typescript';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../app-service.service';
import { FullComponent } from '../layouts/full/full.component';
import { Role } from '../models/Enums';
import { CartProduct, Product } from '../Models/Product';
import { UserInfoService } from '../services/user-info.service';
import { CartViewerComponent } from './cart-viewer/cart-viewer.component';

@Component({
    selector: 'app-cart-builder',
    templateUrl: './cart-builder.component.html',
    styleUrls: ['./cart-builder.component.css']
})
@Injectable({ providedIn: 'root' })
export class CartBuilderComponent implements OnInit {

    @ViewChild(CartViewerComponent, { static: true }) child;

    productListResult: Product[] = [];
    productsList: Product[] = [];
    productList: CartProduct[] = [];
    cartProductList: CartProduct[] = [];
    cartItems: number = 0;

    page = 1;
    pageSize = 4;
    csearchTerm: string = "";

    constructor(private modalService: NgbModal, private fullComponent: FullComponent, private userInfo: UserInfoService, private appService: AppService, private toastr: ToastrService) {
        this.userInfo.refreshUserState();
    }

    ngOnInit() {
    
        if (!this.userInfo.IsCurrentUserInGroup(Role.User)) {
            this.fullComponent.logout();
        }
        this.loadProducts();
        this.productListResult.forEach((product, index) => {
            let cartProduct: CartProduct = this.clearCartProduct();
            cartProduct.CreatedBy = product.CreatedBy;
            cartProduct.CreatedOn = product.CreatedOn;
            cartProduct.ImageUrl = product.ImageUrl;
            cartProduct.IsActive = product.IsActive;
            cartProduct.Name = product.Name;
            cartProduct.Price = product.Price;
            cartProduct.ProductId = product.ProductId;
            cartProduct.Quantity = 1;
            cartProduct.SkuCode = product.SkuCode;
            cartProduct.TotalAmount = product.Price;
            cartProduct.UpdatedBy = product.UpdatedBy;
            cartProduct.UpdatedOn = product.UpdatedOn;
            this.productList.push(cartProduct);
        });
    }
    clearCartProduct(): CartProduct {
        return {
            CreatedBy: '',
            CreatedOn: new Date(),
            ImageUrl: '',
            IsActive: true,
            Name: '',
            Price: 0,
            ProductId: Guid.createEmpty().toString(),
            Quantity: 1,
            SkuCode: '',
            TotalAmount: 0,
            UpdatedBy: '',
            UpdatedOn: new Date(),
        };
    }
    loadProducts() {
        this.appService.GetProductList().subscribe((data: any) => {
            this.productListResult = data ? data : [];
            this.productListResult = this.productListResult.filter(p => p.IsActive == true);
            this.productsList = this.productListResult;
            this.toastr.success('Fetch Products successfully');
        }, (err) => { console.error("Cart Builder Component loadProduct Method Exceptpion : " + err.message); this.productListResult = []; });
    }
    //#region displaying Cart in model pop up
    displayCart(model: any) {
        //this.child.loadCartItems(this.cartProductList, this.cartItems);
       
        const modalRef = this.modalService.open(CartViewerComponent, {
            size: 'xl',
            centered: true,
            backdrop: 'static'
        });
        modalRef.componentInstance.cartProductsItemObj = { CartProductList: this.cartProductList,CartItems: this.cartItems };

        //this.modalService.open(model, {
        //    centered: true,
        //    backdrop: 'static',
        //    size: 'xl'
        //});
        //this.forms.SaleItems = $("#spnSaleItemString").text()?.trim() == "" ? this.forms.SaleItems : JSON.parse($("#spnSaleItemString").text());
        //modalRef.componentInstance.formSaleItemObj = { SaleItems: this.forms?.SaleItems, CurrencySymbol: $("#span_currency").text(), Forms: this.forms };// this.forms?.SaleItems ? this.forms?.SaleItems : this.CallAutoSave();
        //this.productAdded = this.cartProductList;
        //this.productAdded.emit(this.cartProductList);
    }
    //#endregion

    //#region Clear Cart Products List
    emptyCart() {
        this.cartProductList = [];
    }
    //endregion

    //#region Add Prodcut To Cart
    addProductToCart(product: CartProduct) {
        debugger;
        const productExistInCart = this.cartProductList.find(
            productInCart => productInCart.SkuCode === product.SkuCode
        );
        this.cartItems += 1;
        if (!productExistInCart) {
            this.cartProductList.push({ ...product, Quantity: 1, TotalAmount:product.Price });
            return;
        }
        productExistInCart.Quantity += 1;
        productExistInCart.TotalAmount = productExistInCart.Quantity * productExistInCart.Price;
        let productIndex = this.cartProductList.findIndex(p => p.SkuCode == productExistInCart.SkuCode);
        this.cartProductList[productIndex] = productExistInCart;
    }
    //endregion

    //loadProductsFromViewer(products: CartProduct[]) {
    //    this.cartProductList = products;
    //}

    //loadItemsFromViewer(items: number) {
    //    this.cartItems = items;
    //}

     loadItemsProductsFromViewer(items: number,products: CartProduct[]) {
        this.cartItems = items;
        this.cartProductList = products;this.ngOnInit();
    }

    //#region On Change of Page Size
    onChangePageSize(val: any) {
        this.pageSize = val;
        
    }
    //#endregion

    //#region On Search of Product
    onSearchProduct(term: string) {
        this.productsList = this.productListResult.filter(
            x => x.Name?.toLowerCase().indexOf(term.toLowerCase()) !== -1 ||
                x.Price.toString() == term ||
                x.SkuCode?.toLowerCase().indexOf(term.toLowerCase()) !== -1);
    }
    //#endregion
}
