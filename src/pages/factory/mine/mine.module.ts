import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {FactoryCenterHomePage} from "./mine-home/mine-home";

/**
 * Created by Tall Prince on 2/6/2017.
 */
@NgModule({
    imports: [
        IonicModule,
    ],
    declarations: [
        FactoryCenterHomePage
    ],
    entryComponents: [
        FactoryCenterHomePage
    ],
    providers: [
    ],
    exports: [
    ]
})
export class FactoryCenterModule { }
