import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {BaiduMapModule} from "angular2-baidu-map";
import {FactoryOrderManagementTabPage} from "./tab/factory-order-management-tab";
import {FactoryOrderCompletePage} from "./factory-order-complete/factory-order-complete";
import {FactoryOrderPendingPage} from "./factory-order-pending/factory-order-pending";
import {FactoryOrderSendingPage} from "./factory-order-sending/factory-order-sending";

/**
 * Created by Tall Prince on 2/6/2017.
 */
@NgModule({
    imports: [
        IonicModule,
        BaiduMapModule
    ],
    declarations: [
        FactoryOrderManagementTabPage,
        FactoryOrderCompletePage,
        FactoryOrderPendingPage,
        FactoryOrderSendingPage
    ],
    entryComponents: [
        FactoryOrderManagementTabPage,
        FactoryOrderCompletePage,
        FactoryOrderPendingPage,
        FactoryOrderSendingPage
    ],
    providers: [
    ],
    exports: [
    ]
})
export class FactoryOrderManagementModule { }