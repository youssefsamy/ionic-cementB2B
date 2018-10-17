import { NgModule, ModuleWithProviders } from '@angular/core';
import {SpinnerEffectDirective} from "./directives/spinner-effect/spinner-effect";

import {FormsModule} from "@angular/forms";
import {IonicModule} from "ionic-angular";
import {BaiduMapModule} from "angular2-baidu-map";

// https://angular.io/styleguide#!#04-10
@NgModule({
    imports: [
        IonicModule,
        FormsModule,
        BaiduMapModule
    ],
    providers: [
    ],
    declarations: [
        SpinnerEffectDirective,
    ],
    entryComponents: [
    ],
    exports: [
        SpinnerEffectDirective,
    ]
})

// https://github.com/ocombe/ng2-translate/issues/209
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}
