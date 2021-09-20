import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, DatePipe,DecimalPipe} from '@angular/common';
import { OAuthModule } from 'angular-oauth2-oidc';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { DataTablesModule } from 'angular-datatables'; 
import { NgxSelectModule, INgxSelectOptions } from 'ngx-select-ex';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ToastrModule } from 'ngx-toastr';
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component'; 
import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap'; 
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';  
import { AppService } from './app-service.service';   
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { GridsterModule } from 'angular-gridster2';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { CreditCardDirectivesModule } from 'angular-cc-library'; 
import { NgApexchartsModule } from "ng-apexcharts";
import { MatDialogModule } from '@angular/material/dialog';  
import { DragDropModule } from '@angular/cdk/drag-drop'; 
import { HomepageComponent } from './pages/homepage/homepage.component';
import { MainComponent } from './layouts/main/main.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ColorPickerModule } from 'ngx-color-picker';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NgxMaskModule} from 'ngx-mask';
import { TwoDigitDecimaNumberDirective } from './core/pipes/two-digit-decima-number.directive';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger'
import { AuthGuard } from './shared/auth/auth.guard.service';
import { LoginComponent } from './pages/login/login.component';
import { FormatTimePipe } from './core/pipes/format-time.pipe';
import { ProductBuilderComponent } from './product-builder/product-builder.component';
import { CartBuilderComponent } from './cart-builder/cart-builder.component';
import { CartViewerComponent } from './cart-builder/cart-viewer/cart-viewer.component';
import { ThankyouComponent } from './thankyou/thankyou.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelSpeed: 1,
    wheelPropagation: true,
    minScrollbarLength: 20
};

@NgModule({
    declarations: [
        AppComponent,
        FullComponent,
        BlankComponent, HomepageComponent,  MainComponent,  CartBuilderComponent, CartViewerComponent,TwoDigitDecimaNumberDirective, LoginComponent,
        FormatTimePipe, ProductBuilderComponent, CartBuilderComponent, ThankyouComponent
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        BrowserModule,
        NgApexchartsModule,
        FormsModule,
        ReactiveFormsModule,
        DataTablesModule,
        HttpClientModule,
        NgbModule,
        ToastrModule.forRoot(),
        Ng2SearchPipeModule,
        OAuthModule.forRoot(),
        RouterModule.forRoot(Approutes),
        PerfectScrollbarModule,
        NgxSelectModule,
        AgmCoreModule.forRoot({ apiKey: 'AIzaSyDoliAneRffQDyA7Ul9cDk3tLe7vaU4yP8' }),
        MatIconModule,
        GridsterModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        DigitOnlyModule,
        CreditCardDirectivesModule,
        MatDialogModule, 
        DragDropModule,
        SlickCarouselModule,
        NgScrollbarModule,
        ColorPickerModule,
        AccordionModule.forRoot(),
        NgxMaskModule.forRoot(),
        MatSlideToggleModule,
        LoggerModule.forRoot(
            {
                serverLogLevel: NgxLoggerLevel.DEBUG,
                serverLoggingUrl: '/api/log',
                level: NgxLoggerLevel.OFF,
            }),

    ],
    exports: [RouterModule],
    providers: [
        AppService,  
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },DatePipe,
        DecimalPipe,
        AuthGuard,
        { provide: 'BASE_URL', useFactory: getBaseUrl }
    ],    
    bootstrap: [AppComponent]
})
export class AppModule { }
export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}
