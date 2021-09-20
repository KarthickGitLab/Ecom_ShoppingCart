"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var SignupComponent = /** @class */ (function () {
    function SignupComponent(router, userInfo) {
        this.router = router;
        this.regularForm = Object.create(null);
    }
    SignupComponent.prototype.ngOnInit = function () {
        this.regularForm = new forms_1.FormGroup({
            'username': new forms_1.FormControl(null, [forms_1.Validators.required, forms_1.Validators.email]),
            'password': new forms_1.FormControl(null, [forms_1.Validators.required, forms_1.Validators.minLength(4), forms_1.Validators.maxLength(24)]),
            'firstName': new forms_1.FormControl(null, [forms_1.Validators.required]),
            'lastName': new forms_1.FormControl(null, [forms_1.Validators.required])
        }, { updateOn: 'blur' });
    };
    SignupComponent.prototype.onSubmit = function () {
        if (this.regularForm.invalid) {
            return;
        }
    };
    SignupComponent = __decorate([
        core_1.Component({
            selector: 'app-signup',
            templateUrl: './signup.component.html',
            styleUrls: ['./signup.component.css']
        })
    ], SignupComponent);
    return SignupComponent;
}());
exports.SignupComponent = SignupComponent;
//# sourceMappingURL=signup.component.js.map