import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {RegisterSelectSupportPage} from "./select-support/select-support";
import {RegisterSupport} from "./register.support/register.support";
import {RegisterFactory} from "./register.factory/register.factory";
import {FormsModule} from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';

/**
 * Created by Tall Prince on 2/6/2017.
 */
@NgModule({
    imports: [
        IonicModule,
        FormsModule,
        BrowserModule,
    ],
    declarations: [
        RegisterSelectSupportPage,
        RegisterSupport,
        RegisterFactory
    ],
    entryComponents: [
        RegisterSelectSupportPage,
        RegisterSupport,
        RegisterFactory
    ],
    providers: [
    ],
    exports: [
    ],
})
export class RegisterSupportModule { }