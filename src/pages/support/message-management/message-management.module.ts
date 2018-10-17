import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {MessageHome} from "./message-home/message.home";
import {OrderMatch} from "./order-match/order-match";
import {SystemInfo} from "./system-info/system-info";
import {MessageDetailInfo} from "./detail-info/message-detail-info";

/**
 * Created by Tall Prince on 2/6/2017.
 */
@NgModule({
    imports: [
        IonicModule,
    ],
    declarations: [
        MessageHome,
        OrderMatch,
        SystemInfo,
        MessageDetailInfo,
    ],
    entryComponents: [
        MessageHome,
        OrderMatch,
        SystemInfo,
        MessageDetailInfo
    ],
    providers: [
    ],
    exports: [
    ]
})
export class MessageManagementModule { }


