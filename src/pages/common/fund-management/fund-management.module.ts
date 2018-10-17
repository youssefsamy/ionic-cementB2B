import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {FundManagementHomePage} from "./home/fund-management-home";

/**
 * Created by Tall Prince on 2/6/2017.
 */
@NgModule({
    imports: [
        IonicModule,
    ],
    declarations: [
        FundManagementHomePage
    ],
    entryComponents: [
        FundManagementHomePage
    ],
    providers: [
    ],
    exports: [
    ]
})
export class FundManagementModule { }