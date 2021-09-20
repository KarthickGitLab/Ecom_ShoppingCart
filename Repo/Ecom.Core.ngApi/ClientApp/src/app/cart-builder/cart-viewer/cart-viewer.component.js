"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartViewerComponent = void 0;
var core_1 = require("@angular/core");
var CartViewerComponent = /** @class */ (function () {
    function CartViewerComponent(modalService, cartBuilder, router) {
        this.modalService = modalService;
        this.cartBuilder = cartBuilder;
        this.router = router;
        this.productsInCart = [];
        this.cartItems = 0;
        this.products = new core_1.EventEmitter();
        this.items = new core_1.EventEmitter();
    }
    CartViewerComponent.prototype.ngOnInit = function () {
        this.loadCartItems(this.cartProductsItemObj.CartProductList, this.cartProductsItemObj.CartItems);
    };
    CartViewerComponent.prototype.loadCartItems = function (productsList, cartItems) {
        debugger;
        this.productsInCart = productsList;
        this.cartItems = cartItems;
    };
    CartViewerComponent.prototype.calculateProduct = function (product) {
        if (product.Quantity == 0) {
            this.removeProduct(product);
            return;
        }
        product.TotalAmount = product.Quantity * product.Price;
        var cartIndex = this.productsInCart.findIndex(function (x) { return x.ProductId == product.ProductId; });
        this.productsInCart[cartIndex] = product;
    };
    CartViewerComponent.prototype.calculateCartItem = function () {
        return this.productsInCart.reduce(function (a, p) { return (a += p.Quantity); }, 0);
    };
    CartViewerComponent.prototype.calculateTotal = function () {
        return this.productsInCart.reduce(function (a, p) { return (a += p.TotalAmount); }, 0);
    };
    CartViewerComponent.prototype.removeProduct = function (product) {
        this.productsInCart = this.productsInCart.filter(function (_a) {
            var ProductId = _a.ProductId;
            return ProductId !== product.ProductId;
        });
        this.calculateTotal();
    };
    CartViewerComponent.prototype.closeCartView = function () {
        this.products.emit(this.productsInCart);
        this.items.emit(this.calculateCartItem());
        this.modalService.dismissAll();
        this.cartBuilder.loadItemsFromViewer(this.calculateCartItem());
        this.cartBuilder.loadProductsFromViewer(this.productsInCart);
    };
    CartViewerComponent.prototype.proceedPayment = function () {
        // Save cart items in Check Out Table
        console.log(this.productsInCart);
        this.router.navigateByUrl('thankyou');
    };
    __decorate([
        core_1.Output()
    ], CartViewerComponent.prototype, "products", void 0);
    __decorate([
        core_1.Output()
    ], CartViewerComponent.prototype, "items", void 0);
    __decorate([
        core_1.Input()
    ], CartViewerComponent.prototype, "cartProductsItemObj", void 0);
    CartViewerComponent = __decorate([
        core_1.Component({
            selector: 'app-cart-viewer',
            templateUrl: './cart-viewer.component.html',
            styleUrls: ['./cart-viewer.component.css']
        })
    ], CartViewerComponent);
    return CartViewerComponent;
}());
exports.CartViewerComponent = CartViewerComponent;
//# sourceMappingURL=cart-viewer.component.js.map