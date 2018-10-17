import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {BaiduMapModule} from "angular2-baidu-map";

import {ClientOrderManagementTabPage} from "./tab/client-order-management-tab";
import {CompletePage} from "./complete/complete";
import {ConfirmPage} from "./confirm/confirm";
import {PendingPage} from "./pending/pending";
import {PayPage} from "./pay/pay";

/**
 * Created by Tall Prince on 2/6/2017.
 */
@NgModule({
    imports: [
        IonicModule,
        BaiduMapModule
    ],
    declarations: [
        ClientOrderManagementTabPage,
        CompletePage,
        ConfirmPage,
        PendingPage,
        PayPage
    ],
    entryComponents: [
        ClientOrderManagementTabPage,
        CompletePage,
        ConfirmPage,
        PendingPage,
        PayPage
    ],
    providers: [
    ],
    exports: [
    ]
})
export class ClientOrderManagementModule { }