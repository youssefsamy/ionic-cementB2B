import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {BaiduMapModule} from "angular2-baidu-map";
import {ClientOrderManagementModule} from "./client-order-management/client-order-management.module";

import {ClientHomePage} from "./client.home/client.home";
import {SelectOrderPage} from "./select-order/select-order";
import {SubmitMortarPage} from "./submit-mortar/submit-mortar";
import {SubmitBalancePage} from "./submit-balance/submit-balance";
import {OrderStatusPage} from "./order-status/order-status";
import {ViewOrderPage} from "./view-order/view-order";
import {DraftContractPage} from "./draft-contract/draft-contract";
import {PendingManagementModule} from "./pending-management/pending-management.module";
import {ClientCenterModule} from "./mine/mine.module";
import {OrderDemandPage} from "./order-demand/order-demand";
import {DatePipe} from "@angular/common";
import {LeaveEvaluationPage} from "./leave-evaluation/leave-evaluation";


import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {Geolocation} from "@ionic-native/geolocation";
import {SelectPayWayPage} from "./select-pay-way/select-pay-way";
import {OfflinePayPage} from "./offline-pay-page/offline-pay-page";
import {OnlinePayPage} from "./online-pay-page/online-pay-page";
import {PayHistoryPage} from "./pay-history/pay-history";
import {FreightPage} from "./fright/freight";


/**
 * Created by Tall Prince on 2/6/2017.
 */
@NgModule({
    imports: [
        IonicModule,
        BaiduMapModule,
        ClientOrderManagementModule,
        PendingManagementModule,
        ClientCenterModule,
    ],
    declarations: [
        ClientHomePage,
        SelectOrderPage,
        SubmitMortarPage,
        SubmitBalancePage,
        OrderStatusPage,
        ViewOrderPage,
        DraftContractPage,
        OrderDemandPage,
        LeaveEvaluationPage,
        SelectPayWayPage,
        OfflinePayPage,
        OnlinePayPage,
        PayHistoryPage,
        FreightPage
    ],
    entryComponents: [
        ClientHomePage,
        SelectOrderPage,
        SubmitMortarPage,
        SubmitBalancePage,
        OrderStatusPage,
        ViewOrderPage,
        DraftContractPage,
        OrderDemandPage,
        LeaveEvaluationPage,
        SelectPayWayPage,
        OfflinePayPage,
        OnlinePayPage,
        PayHistoryPage,
        FreightPage
    ],
    providers: [
        DatePipe,
        BarcodeScanner,
        Geolocation
    ],
    exports: [
    ]
})
export class ClientModule {}