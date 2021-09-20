"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBaseUrl = exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var common_1 = require("@angular/common");
var angular_oauth2_oidc_1 = require("angular-oauth2-oidc");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var ngx_slick_carousel_1 = require("ngx-slick-carousel");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var core_2 = require("@agm/core");
var angular_datatables_1 = require("angular-datatables");
var ngx_select_ex_1 = require("ngx-select-ex");
var ng2_search_filter_1 = require("ng2-search-filter");
var ngx_toastr_1 = require("ngx-toastr");
var full_component_1 = require("./layouts/full/full.component");
var blank_component_1 = require("./layouts/blank/blank.component");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var ngx_perfect_scrollbar_1 = require("ngx-perfect-scrollbar");
var ngx_perfect_scrollbar_2 = require("ngx-perfect-scrollbar");
var app_service_service_1 = require("./app-service.service");
var icon_1 = require("@angular/material/icon");
var form_field_1 = require("@angular/material/form-field");
var select_1 = require("@angular/material/select");
var input_1 = require("@angular/material/input");
var angular_gridster2_1 = require("angular-gridster2");
var digit_only_1 = require("@uiowa/digit-only");
var angular_cc_library_1 = require("angular-cc-library");
var ng_apexcharts_1 = require("ng-apexcharts");
var dialog_1 = require("@angular/material/dialog");
var drag_drop_1 = require("@angular/cdk/drag-drop");
var homepage_component_1 = require("./pages/homepage/homepage.component");
var main_component_1 = require("./layouts/main/main.component");
var ngx_scrollbar_1 = require("ngx-scrollbar");
var ngx_color_picker_1 = require("ngx-color-picker");
var accordion_1 = require("ngx-bootstrap/accordion");
var slide_toggle_1 = require("@angular/material/slide-toggle");
var ngx_mask_1 = require("ngx-mask");
var two_digit_decima_number_directive_1 = require("./core/pipes/two-digit-decima-number.directive");
var ngx_logger_1 = require("ngx-logger");
var auth_guard_service_1 = require("./shared/auth/auth.guard.service");
var login_component_1 = require("./pages/login/login.component");
var format_time_pipe_1 = require("./core/pipes/format-time.pipe");
var product_builder_component_1 = require("./product-builder/product-builder.component");
var cart_builder_component_1 = require("./cart-builder/cart-builder.component");
var cart_viewer_component_1 = require("./cart-builder/cart-viewer/cart-viewer.component");
var thankyou_component_1 = require("./thankyou/thankyou.component");
var DEFAULT_PERFECT_SCROLLBAR_CONFIG = {
    suppressScrollX: true,
    wheelSpeed: 1,
    wheelPropagation: true,
    minScrollbarLength: 20
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                full_component_1.FullComponent,
                blank_component_1.BlankComponent, homepage_component_1.HomepageComponent, main_component_1.MainComponent, cart_builder_component_1.CartBuilderComponent, cart_viewer_component_1.CartViewerComponent, two_digit_decima_number_directive_1.TwoDigitDecimaNumberDirective, login_component_1.LoginComponent,
                format_time_pipe_1.FormatTimePipe, product_builder_component_1.ProductBuilderComponent, cart_builder_component_1.CartBuilderComponent, thankyou_component_1.ThankyouComponent
            ],
            imports: [
                common_1.CommonModule,
                animations_1.BrowserAnimationsModule,
                platform_browser_1.BrowserModule,
                ng_apexcharts_1.NgApexchartsModule,
                forms_1.FormsModule,
                forms_2.ReactiveFormsModule,
                angular_datatables_1.DataTablesModule,
                http_1.HttpClientModule,
                ng_bootstrap_1.NgbModule,
                ngx_toastr_1.ToastrModule.forRoot(),
                ng2_search_filter_1.Ng2SearchPipeModule,
                angular_oauth2_oidc_1.OAuthModule.forRoot(),
                router_1.RouterModule.forRoot(app_routing_module_1.Approutes),
                ngx_perfect_scrollbar_1.PerfectScrollbarModule,
                ngx_select_ex_1.NgxSelectModule,
                core_2.AgmCoreModule.forRoot({ apiKey: 'AIzaSyDoliAneRffQDyA7Ul9cDk3tLe7vaU4yP8' }),
                icon_1.MatIconModule,
                angular_gridster2_1.GridsterModule,
                form_field_1.MatFormFieldModule,
                select_1.MatSelectModule,
                input_1.MatInputModule,
                digit_only_1.DigitOnlyModule,
                angular_cc_library_1.CreditCardDirectivesModule,
                dialog_1.MatDialogModule,
                drag_drop_1.DragDropModule,
                ngx_slick_carousel_1.SlickCarouselModule,
                ngx_scrollbar_1.NgScrollbarModule,
                ngx_color_picker_1.ColorPickerModule,
                accordion_1.AccordionModule.forRoot(),
                ngx_mask_1.NgxMaskModule.forRoot(),
                slide_toggle_1.MatSlideToggleModule,
                ngx_logger_1.LoggerModule.forRoot({
                    serverLogLevel: ngx_logger_1.NgxLoggerLevel.DEBUG,
                    serverLoggingUrl: '/api/log',
                    level: ngx_logger_1.NgxLoggerLevel.OFF,
                }),
            ],
            exports: [router_1.RouterModule],
            providers: [
                app_service_service_1.AppService,
                {
                    provide: ngx_perfect_scrollbar_2.PERFECT_SCROLLBAR_CONFIG,
                    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
                }, common_1.DatePipe,
                common_1.DecimalPipe,
                auth_guard_service_1.AuthGuard,
                { provide: 'BASE_URL', useFactory: getBaseUrl }
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}
exports.getBaseUrl = getBaseUrl;
//# sourceMappingURL=app.module.js.map