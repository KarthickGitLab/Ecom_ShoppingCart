import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Guid } from 'guid-typescript';
import { CartProduct, Product } from '../../Models/Product';
import { CartBuilderComponent } from '../cart-builder.component';

@Component({
    selector: 'app-cart-viewer',
    templateUrl: './cart-viewer.component.html',
    styleUrls: ['./cart-viewer.component.css']
})
export class CartViewerComponent implements OnInit {
    productsInCart: CartProduct[]=[];
    cartItems: number = 0;

    @Output() products = new EventEmitter<CartProduct[]>();
    @Output() items = new EventEmitter<number>();
    @Input() cartProductsItemObj: any ;

    constructor(private modalService: NgbModal, private cartBuilder: CartBuilderComponent, private router: Router) { }

    ngOnInit() {
        this.loadCartItems(this.cartProductsItemObj.CartProductList, this.cartProductsItemObj.CartItems);
    }

    loadCartItems(productsList: CartProduct[], cartItems: number) {
        debugger;
        this.productsInCart = productsList;
        this.cartItems = cartItems; 
    }

    calculateProduct(product: CartProduct) {
        if (product.Quantity == 0) {
            this.removeProduct(product);
            return;
        }
        product.TotalAmount = product.Quantity * product.Price;
        let cartIndex = this.productsInCart.findIndex(x => x.ProductId == product.ProductId);
        this.productsInCart[cartIndex] = product;
    }

    calculateCartItem() {
        return this.productsInCart.reduce((a, p) => (a += p.Quantity), 0);
    }

    calculateTotal() {
        return this.productsInCart.reduce((a, p) => (a += p.TotalAmount), 0);
    }

    removeProduct(product: CartProduct) {
        this.productsInCart = this.productsInCart.filter(
            ({ ProductId }) => ProductId !== product.ProductId
        );
        this.calculateTotal();
    }

    closeCartView() {
        //this.products.emit(this.productsInCart);
        //this.items.emit(this.calculateCartItem());
        this.modalService.dismissAll();
        this.cartBuilder.loadItemsProductsFromViewer(this.calculateCartItem(),this.productsInCart);
    }

    proceedPayment() {
        // Save cart items in Check Out Table
        console.log(this.productsInCart);
        this.modalService.dismissAll();
        this.router.navigateByUrl('thankyou');
    }
}
