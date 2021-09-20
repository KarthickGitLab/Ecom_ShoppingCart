"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartBuilderComponent = void 0;
var core_1 = require("@angular/core");
var guid_typescript_1 = require("guid-typescript");
var Enums_1 = require("../models/Enums");
var cart_viewer_component_1 = require("./cart-viewer/cart-viewer.component");
var CartBuilderComponent = /** @class */ (function () {
    function CartBuilderComponent(modalService, fullComponent, userInfo, appService, toastr) {
        this.modalService = modalService;
        this.fullComponent = fullComponent;
        this.userInfo = userInfo;
        this.appService = appService;
        this.toastr = toastr;
        this.productListResult = [];
        this.productsList = [];
        this.productList = [];
        this.cartProductList = [];
        this.cartItems = 0;
        this.page = 1;
        this.pageSize = 4;
        this.csearchTerm = "";
        this.userInfo.refreshUserState();
    }
    CartBuilderComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.userInfo.IsCurrentUserInGroup(Enums_1.Role.User)) {
            this.fullComponent.logout();
        }
        this.loadProducts();
        this.productListResult.forEach(function (product, index) {
            var cartProduct = _this.clearCartProduct();
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
            _this.productList.push(cartProduct);
        });
    };
    CartBuilderComponent.prototype.clearCartProduct = function () {
        return {
            CreatedBy: '',
            CreatedOn: new Date(),
            ImageUrl: '',
            IsActive: true,
            Name: '',
            Price: 0,
            ProductId: guid_typescript_1.Guid.createEmpty().toString(),
            Quantity: 1,
            SkuCode: '',
            TotalAmount: 0,
            UpdatedBy: '',
            UpdatedOn: new Date(),
        };
    };
    CartBuilderComponent.prototype.loadProducts = function () {
        var _this = this;
        this.appService.GetProductList().subscribe(function (data) {
            _this.productListResult = data ? data : [];
            _this.productListResult = _this.productListResult.filter(function (p) { return p.IsActive == true; });
            _this.productsList = _this.productListResult;
            _this.toastr.success('Fetch Products successfully');
        }, function (err) { console.error("Cart Builder Component loadProduct Method Exceptpion : " + err.message); _this.productListResult = []; });
    };
    //#region displaying Cart in model pop up
    CartBuilderComponent.prototype.displayCart = function (model) {
        //this.child.loadCartItems(this.cartProductList, this.cartItems);
        var modalRef = this.modalService.open(cart_viewer_component_1.CartViewerComponent, {
            size: 'xl',
            centered: true,
            backdrop: 'static'
        });
        modalRef.componentInstance.cartProductsItemObj = { CartProductList: this.cartProductList, CartItems: this.cartItems };
        //this.modalService.open(model, {
        //    centered: true,
        //    backdrop: 'static',
        //    size: 'xl'
        //});
        //this.forms.SaleItems = $("#spnSaleItemString").text()?.trim() == "" ? this.forms.SaleItems : JSON.parse($("#spnSaleItemString").text());
        //modalRef.componentInstance.formSaleItemObj = { SaleItems: this.forms?.SaleItems, CurrencySymbol: $("#span_currency").text(), Forms: this.forms };// this.forms?.SaleItems ? this.forms?.SaleItems : this.CallAutoSave();
        //this.productAdded = this.cartProductList;
        //this.productAdded.emit(this.cartProductList);
    };
    //#endregion
    //#region Clear Cart Products List
    CartBuilderComponent.prototype.emptyCart = function () {
        this.cartProductList = [];
    };
    //endregion
    //#region Add Prodcut To Cart
    CartBuilderComponent.prototype.addProductToCart = function (product) {
        debugger;
        var productExistInCart = this.cartProductList.find(function (productInCart) { return productInCart.SkuCode === product.SkuCode; });
        this.cartItems += 1;
        if (!productExistInCart) {
            this.cartProductList.push(__assign(__assign({}, product), { Quantity: 1, TotalAmount: product.Price }));
            return;
        }
        productExistInCart.Quantity += 1;
        productExistInCart.TotalAmount = productExistInCart.Quantity * productExistInCart.Price;
        var productIndex = this.cartProductList.findIndex(function (p) { return p.SkuCode == productExistInCart.SkuCode; });
        this.cartProductList[productIndex] = productExistInCart;
    };
    //endregion
    //loadProductsFromViewer(products: CartProduct[]) {
    //    this.cartProductList = products;
    //}
    //loadItemsFromViewer(items: number) {
    //    this.cartItems = items;
    //}
    CartBuilderComponent.prototype.loadItemsProductsFromViewer = function (items, products) {
        this.cartItems = items;
        this.cartProductList = products;
        this.ngOnInit();
    };
    //#region On Change of Page Size
    CartBuilderComponent.prototype.onChangePageSize = function (val) {
        this.pageSize = val;
    };
    //#endregion
    //#region On Search of Product
    CartBuilderComponent.prototype.onSearchProduct = function (term) {
        this.productsList = this.productListResult.filter(function (x) {
            var _a, _b;
            return ((_a = x.Name) === null || _a === void 0 ? void 0 : _a.toLowerCase().indexOf(term.toLowerCase())) !== -1 ||
                x.Price.toString() == term ||
                ((_b = x.SkuCode) === null || _b === void 0 ? void 0 : _b.toLowerCase().indexOf(term.toLowerCase())) !== -1;
        });
    };
    __decorate([
        core_1.ViewChild(cart_viewer_component_1.CartViewerComponent, { static: true })
    ], CartBuilderComponent.prototype, "child", void 0);
    CartBuilderComponent = __decorate([
        core_1.Component({
            selector: 'app-cart-builder',
            templateUrl: './cart-builder.component.html',
            styleUrls: ['./cart-builder.component.css']
        }),
        core_1.Injectable({ providedIn: 'root' })
    ], CartBuilderComponent);
    return CartBuilderComponent;
}());
exports.CartBuilderComponent = CartBuilderComponent;
//# sourceMappingURL=cart-builder.component.js.map