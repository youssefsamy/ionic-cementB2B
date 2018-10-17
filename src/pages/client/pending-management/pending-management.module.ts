import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {BaiduMapModule} from "angular2-baidu-map";

import {PendingManagementTabPage} from "./tab/pending-management-tab";
import {EvaluationPage} from "./evaluation/evaluation";
import {ReceivePage} from "./receive/receive";
import {MatchPage} from "./match/match";
/**
 * Created by Tall Prince on 2/6/2017.
 */
@NgModule({
    imports: [
        IonicModule,
        BaiduMapModule
    ],
    declarations: [
        PendingManagementTabPage,
        EvaluationPage,
        ReceivePage,
        MatchPage
    ],
    entryComponents: [
        PendingManagementTabPage,
        EvaluationPage,
        ReceivePage,
        MatchPage
    ],
    providers: [
    ],
    exports: [
    ]
})
export class PendingManagementModule { }