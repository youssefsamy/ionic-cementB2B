import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {RegisterHomePage} from "./home/register.home";
import {RegisterSelectRolePage} from "./select-role/select-role";
import {RegisterCustomerFormPage} from "./customer-form/register.customer-form";
import {RegisterSupportModule} from "./support-form/support-form.module";
/**
 * Created by Tall Prince on 2/6/2017.
 */
@NgModule({
    imports: [
        IonicModule,
        RegisterSupportModule,

    ],
    declarations: [
        RegisterHomePage,
        RegisterSelectRolePage,
        RegisterCustomerFormPage,
    ],
    entryComponents: [
        RegisterHomePage,
        RegisterSelectRolePage,
        RegisterCustomerFormPage,
    ],
    providers: [
    ],
    exports: [
    ]
})
export class RegisterModule { }