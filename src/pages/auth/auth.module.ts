import {NgModule} from "@angular/core";
import {LoginPage} from "./login/login";
import {IonicModule} from "ionic-angular";
import {ForgotPasswordPage} from "./forgot-password/forgot-password";
import {RegisterModule} from "./register/register.module";
/**
 * Created by Tall Prince on 2/6/2017.
 */
@NgModule({
    imports: [
        IonicModule,
        RegisterModule,
    ],
    declarations: [
        LoginPage,
        ForgotPasswordPage,
    ],
    entryComponents: [
        LoginPage,
        ForgotPasswordPage,
    ],
    providers: [
    ],
    exports: [
    ]
})
export class AuthModule { }