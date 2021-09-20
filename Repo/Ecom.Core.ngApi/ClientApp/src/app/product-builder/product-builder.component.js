"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductBuilderComponent = exports.NgbdSortableHeader = exports.compare = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var guid_typescript_1 = require("guid-typescript");
var Enums_1 = require("../models/Enums");
var rotate = { 'asc': 'desc', 'desc': '', '': 'asc' };
var compare = function (v1, v2) { return v1 < v2 ? -1 : v1 > v2 ? 1 : 0; };
exports.compare = compare;
var NgbdSortableHeader = /** @class */ (function () {
    function NgbdSortableHeader() {
        this.direction = '';
        this.sort = new core_1.EventEmitter();
    }
    NgbdSortableHeader.prototype.rotate = function () {
        this.direction = rotate[this.direction];
        this.sort.emit({ column: this.sortable, direction: this.direction });
    };
    __decorate([
        core_1.Input()
    ], NgbdSortableHeader.prototype, "sortable", void 0);
    __decorate([
        core_1.Input()
    ], NgbdSortableHeader.prototype, "direction", void 0);
    __decorate([
        core_1.Output()
    ], NgbdSortableHeader.prototype, "sort", void 0);
    NgbdSortableHeader = __decorate([
        core_1.Directive({
            selector: 'th[sortable]',
            host: {
                '[class.asc]': 'direction === "asc"',
                '[class.desc]': 'direction === "desc"',
                '(click)': 'rotate()'
            }
        })
    ], NgbdSortableHeader);
    return NgbdSortableHeader;
}());
exports.NgbdSortableHeader = NgbdSortableHeader;
var ProductBuilderComponent = /** @class */ (function () {
    function ProductBuilderComponent(userInfo, fullComponent, appService, toastr) {
        this.userInfo = userInfo;
        this.fullComponent = fullComponent;
        this.appService = appService;
        this.toastr = toastr;
        this.productForm = Object.create(null);
        this.currentIntent = "Create Product";
        this.product = this.clearProduct();
        this.productListResult = [];
        this.productList = [];
        this.cpage = 1;
        this.cpageSize = 5;
        this.page = 1;
        this.pageSize = 5;
        this._csearchTerm = '';
        this.userInfo.refreshUserState();
    }
    ProductBuilderComponent.prototype.ngOnInit = function () {
        if (!this.userInfo.IsCurrentUserInGroup(Enums_1.Role.Admin)) {
            this.fullComponent.logout();
        }
        var oktaId = this.userInfo.currentOktaId;
        console.log(oktaId);
        if (this.userInfo.IsCurrentUserInGroup(Enums_1.Role.Admin)) {
            console.log("Is Admin");
        }
        else if (this.userInfo.IsCurrentUserInGroup(Enums_1.Role.User)) {
            console.log("Is User");
        }
        this.productForm = new forms_1.FormGroup({
            'Name': new forms_1.FormControl('', [forms_1.Validators.required]),
            'SkuCode': new forms_1.FormControl('', [forms_1.Validators.required]),
            'ImageUrl': new forms_1.FormControl('', [forms_1.Validators.required]),
            'Price': new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.min(0.01), forms_1.Validators.max(9999.99)]),
            'IsActive': new forms_1.FormControl(null)
        });
        this.loadProductList();
    };
    Object.defineProperty(ProductBuilderComponent.prototype, "csearchTerm", {
        //#region Table Sorting , Filter , Search
        get: function () {
            return this._csearchTerm;
        },
        set: function (val) {
            this._csearchTerm = val;
            this.productList = this.cfilter(val);
        },
        enumerable: false,
        configurable: true
    });
    ProductBuilderComponent.prototype.cfilter = function (v) {
        return this.productListResult.filter(function (x) {
            var _a, _b, _c, _d;
            return (x.Name != null && ((_a = x.Name) === null || _a === void 0 ? void 0 : _a.toLowerCase().indexOf(v.toLowerCase())) !== -1) ||
                (x.Price != null && ((_b = x.Price) === null || _b === void 0 ? void 0 : _b.toString()) == v) ||
                (x.SkuCode != null && ((_c = x.SkuCode) === null || _c === void 0 ? void 0 : _c.toLowerCase().indexOf(v.toLowerCase())) !== -1) ||
                (x.ImageUrl != null && ((_d = x.ImageUrl) === null || _d === void 0 ? void 0 : _d.toLowerCase().indexOf(v.toLowerCase())) !== -1);
        });
    };
    ProductBuilderComponent.prototype.onSort = function (_a) {
        var column = _a.column, direction = _a.direction;
        this.headers.forEach(function (header) {
            if (header.sortable !== column) {
                header.direction = '';
            }
        });
        if (direction === '') {
            this.productList = this.productListResult;
        }
        else {
            this.productList = __spreadArray([], this.productListResult).sort(function (a, b) {
                var res = exports.compare(a[column], b[column]);
                return direction === 'asc' ? res : -res;
            });
        }
    };
    //#endRegion
    //#region Clear Object
    ProductBuilderComponent.prototype.clearProduct = function () {
        return {
            Name: '',
            SkuCode: this.generateNextSku(),
            ImageUrl: this.generateNextImageUrl(),
            Price: 1.00,
            IsActive: true,
            ProductId: guid_typescript_1.Guid.create().toString(),
            CreatedBy: this.userInfo.currentOktaId,
            UpdatedBy: this.userInfo.currentOktaId,
            CreatedOn: new Date(),
            UpdatedOn: new Date()
        };
    };
    //#endRegion
    //#region Load Product List
    ProductBuilderComponent.prototype.loadProductList = function () {
        var _this = this;
        this.appService.GetProductList().subscribe(function (data) {
            //let jsonData: any = JSON.parse(data);
            _this.productList = data ? data : [];
            _this.productListResult = _this.productList;
            _this.toastr.success('Fetch Products successfully');
            _this.currentIntent = "Create Product";
        }, function (err) { console.error("Product Builder Component loadProductList Method Exceptpion : " + err.message); _this.productList = []; });
    };
    //#endregion
    //#region Add or Update Product
    ProductBuilderComponent.prototype.addUpdateProduct = function (product) {
        var _this = this;
        if (!this.productForm.invalid) {
            this.appService.AddUpdateProduct(product).subscribe(function (data) {
                _this.toastr.success(product.Name + ' saved successfully');
                _this.product = _this.clearProduct();
                _this.loadProductList();
            }, function (err) { console.error("Product Builder Component addUpdateProduct Method Exceptpion : " + err.message); });
        }
        else {
            this.productForm.markAllAsTouched();
        }
    };
    //#endregion
    //#region Get Product By Id
    ProductBuilderComponent.prototype.getProductById = function (id) {
        var _this = this;
        this.appService.GetProductById(id).subscribe(function (data) {
            if (data) {
                _this.product = data;
                _this.toastr.success('Fetch ' + _this.product.Name + ' successfully');
                _this.currentIntent = "Update Product";
            }
            else {
                _this.toastr.error('Problem while editing' + _this.product.Name + ' .');
            }
        }, function (err) { console.error("Product Builder Component getProductById Method Exceptpion : " + err.message); });
    };
    //#endregion
    //#region Delete Product By Id
    ProductBuilderComponent.prototype.deleteProductById = function (product) {
        var _this = this;
        this.appService.DeleteProductById(product.ProductId).subscribe(function (data) {
            _this.toastr.success('Deleted ' + product.Name + ' successfully');
            _this.loadProductList();
        }, function (err) { console.error("Product Builder Component deleteProductById Method Exceptpion : " + err.message); });
    };
    //#endregion
    //region Generate Next SKU
    ProductBuilderComponent.prototype.generateNextSku = function () {
        var result = '';
        var skuLength = 8;
        var skuChar = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (var i = skuLength; i > 0; --i)
            result += skuChar[Math.floor(Math.random() * skuChar.length)];
        return result;
    };
    //endRegion
    //region Generate Next Image Url
    ProductBuilderComponent.prototype.generateNextImageUrl = function () {
        var imageurl = "https://picsum.photos/id/";
        var result = '';
        var skuLength = 3;
        var skuChar = "0123456789";
        for (var i = skuLength; i > 0; --i)
            result += skuChar[Math.floor(Math.random() * skuChar.length)];
        return imageurl + result + '/200/300';
    };
    //endRegion
    //region Clear Form
    ProductBuilderComponent.prototype.onClearForm = function () {
        this.product = this.clearProduct();
    };
    //endRegion
    //region Edit Product
    ProductBuilderComponent.prototype.editProduct = function (product) {
        this.getProductById(product.ProductId);
    };
    //endRegion
    //region Delete Product
    ProductBuilderComponent.prototype.deleteProduct = function (product) {
        if (confirm("Are you sure to delete " + product.Name + " ?")) {
            this.deleteProductById(product);
        }
    };
    __decorate([
        core_1.ViewChildren(NgbdSortableHeader)
    ], ProductBuilderComponent.prototype, "headers", void 0);
    ProductBuilderComponent = __decorate([
        core_1.Component({
            selector: 'app-product-builder',
            templateUrl: './product-builder.component.html',
            styleUrls: ['./product-builder.component.css']
        })
    ], ProductBuilderComponent);
    return ProductBuilderComponent;
}());
exports.ProductBuilderComponent = ProductBuilderComponent;
//# sourceMappingURL=product-builder.component.js.map