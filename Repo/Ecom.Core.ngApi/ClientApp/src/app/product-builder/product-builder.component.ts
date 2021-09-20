import { Component, Directive, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { Toast, ToastrService } from 'ngx-toastr';
import { AppService } from '../app-service.service';
import { FullComponent } from '../layouts/full/full.component';
import { Role } from '../models/Enums';
import { Product } from '../models/Product';
import { UserInfoService } from '../services/user-info.service';

export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { 'asc': 'desc', 'desc': '', '': 'asc' };
export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
export interface SortEvent {column: string;direction: SortDirection;}

@Directive({
    selector: 'th[sortable]',
    host: {
        '[class.asc]': 'direction === "asc"',
        '[class.desc]': 'direction === "desc"',
        '(click)': 'rotate()'
    }
})
export class NgbdSortableHeader {

    @Input() sortable: string;
    @Input() direction: SortDirection = '';
    @Output() sort = new EventEmitter<SortEvent>();

    rotate() {
        this.direction = rotate[this.direction];
        this.sort.emit({ column: this.sortable, direction: this.direction });
    }
}


@Component({
    selector: 'app-product-builder',
    templateUrl: './product-builder.component.html',
    styleUrls: ['./product-builder.component.css']
})
export class ProductBuilderComponent implements OnInit {
    productForm: FormGroup = Object.create(null);
    currentIntent: string = "Create Product";
    product: Product = this.clearProduct();
    productListResult: Product[] = [];
    productList: Product[] = [];
    cpage = 1;
    cpageSize = 5;
    page = 1;
    pageSize = 5;
    
    @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
    _csearchTerm: string = '';

    constructor(private userInfo: UserInfoService, private fullComponent: FullComponent, private appService: AppService, private toastr: ToastrService) {
        this.userInfo.refreshUserState();
    }

    ngOnInit(): void {
        if (!this.userInfo.IsCurrentUserInGroup(Role.Admin)) {
            this.fullComponent.logout();
        }
        let oktaId = this.userInfo.currentOktaId;
        console.log(oktaId);

        if (this.userInfo.IsCurrentUserInGroup(Role.Admin)) {
            console.log("Is Admin");
        }
        else if (this.userInfo.IsCurrentUserInGroup(Role.User)) {
            console.log("Is User");
        }

        this.productForm = new FormGroup({
            'Name': new FormControl('', [Validators.required]),
            'SkuCode': new FormControl('', [Validators.required]),
            'ImageUrl': new FormControl('', [Validators.required]),
            'Price': new FormControl('', [Validators.required, Validators.min(0.01), Validators.max(9999.99)]),
            'IsActive': new FormControl(null)
        });

        this.loadProductList();
    }

    //#region Table Sorting , Filter , Search
    get csearchTerm(): string {
        return this._csearchTerm;
    }
    set csearchTerm(val: string) {
        this._csearchTerm = val;
        this.productList = this.cfilter(val);
    }

    cfilter(v: string) {
        return this.productListResult.filter(x => (x.Name != null && x.Name?.toLowerCase().indexOf(v.toLowerCase()) !== -1) ||
            (x.Price != null && x.Price?.toString() == v) ||
            (x.SkuCode != null && x.SkuCode?.toLowerCase().indexOf(v.toLowerCase()) !== -1) ||
            (x.ImageUrl != null && x.ImageUrl?.toLowerCase().indexOf(v.toLowerCase()) !== -1)
        );

    }
    onSort({ column, direction }: SortEvent) {
        
        this.headers.forEach(header => {
            if (header.sortable !== column) {
                header.direction = '';
            }
        });

        if (direction === '') {
            this.productList = this.productListResult;
        } else {
            this.productList = [...this.productListResult].sort((a, b) => {
                const res = compare(a[column], b[column]);
                return direction === 'asc' ? res : -res;
            });
        }
    }
    //#endRegion

    //#region Clear Object
    clearProduct():Product {
        return {
            Name: '',
            SkuCode: this.generateNextSku(),
            ImageUrl: this.generateNextImageUrl(),
            Price: 1.00,
            IsActive: true,
            ProductId: Guid.create().toString(),
            CreatedBy: this.userInfo.currentOktaId,
            UpdatedBy: this.userInfo.currentOktaId,
            CreatedOn: new Date(),
            UpdatedOn: new Date()
        };
    }
    //#endRegion

    //#region Load Product List
    loadProductList() {
        
        this.appService.GetProductList().subscribe((data: any) => {
            //let jsonData: any = JSON.parse(data);
            this.productList = data ? data : [];
            this.productListResult = this.productList;
            this.toastr.success('Fetch Products successfully');
            this.currentIntent = "Create Product";
        }, (err) => { console.error("Product Builder Component loadProductList Method Exceptpion : " + err.message); this.productList = []; });
    }
    //#endregion

    //#region Add or Update Product
    addUpdateProduct(product: Product): any {
        
        if (!this.productForm.invalid) {
            this.appService.AddUpdateProduct(product).subscribe((data: any) => {
                
                this.toastr.success(product.Name + ' saved successfully');
                this.product = this.clearProduct();
                this.loadProductList();
            }, (err) => { console.error("Product Builder Component addUpdateProduct Method Exceptpion : " + err.message); });
        }
        else { this.productForm.markAllAsTouched(); }
       
    }
    //#endregion

    //#region Get Product By Id
    getProductById(id: string): any {
        
        this.appService.GetProductById(id).subscribe((data: any) => {
            
            if (data) {
                this.product = data;
                this.toastr.success('Fetch ' + this.product.Name + ' successfully');
                this.currentIntent = "Update Product";
            } else { this.toastr.error('Problem while editing' + this.product.Name + ' .'); }
            
        }, (err) => { console.error("Product Builder Component getProductById Method Exceptpion : " + err.message); });
    }
    //#endregion

    //#region Delete Product By Id
    deleteProductById(product: Product): any {
        
        this.appService.DeleteProductById(product.ProductId).subscribe((data: any) => {
            
                this.toastr.success('Deleted ' + product.Name + ' successfully');
                this.loadProductList();
        }, (err) => { console.error("Product Builder Component deleteProductById Method Exceptpion : " + err.message); });
    }
    //#endregion

    //region Generate Next SKU
    generateNextSku() {
        let result = '';
        let skuLength = 8;
        let skuChar = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (var i = skuLength; i > 0; --i) result += skuChar[Math.floor(Math.random() * skuChar.length)];
        return result;
    }
  //endRegion

    //region Generate Next Image Url
    generateNextImageUrl() {
        let imageurl = "https://picsum.photos/id/";
        let result = '';
        let skuLength = 3;
        let skuChar = "0123456789";
        for (var i = skuLength; i > 0; --i) result += skuChar[Math.floor(Math.random() * skuChar.length)];
        return imageurl + result +'/200/300';
    }
  //endRegion

    //region Clear Form
    onClearForm() {
        this.product = this.clearProduct();
    }
  //endRegion

    //region Edit Product
    editProduct(product: Product) {
        this.getProductById(product.ProductId);
    }
  //endRegion

    //region Delete Product
    deleteProduct(product: Product) {
        if (confirm("Are you sure to delete " + product.Name + " ?")) {
            this.deleteProductById(product);
        }
    }
  //endRegion
}
