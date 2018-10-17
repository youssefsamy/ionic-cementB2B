import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {SupportHomePage} from "./home/support.home";
import {EvaluationManagementModule} from "./evaluation-management/evaluation-management.module";
import {MessageManagementModule} from "./message-management/message-management.module";
import {PersonalCenterModule} from "./personal-center/personal-center.module";
import {SupportMenusPage} from "./menus/support.menus";
import {SupportLocationMap} from "./support-location-map/support-location-map";
import {BaiduMapModule} from "angular2-baidu-map";
import {Ionic2RatingModule} from "ionic2-rating";
import {SupportOrderAnalyticsPage} from "./support-order-analytics/support-order-analytics";
import {SupportIncomeAnalyticsPage} from "./support-income-analytics/support-income-analytics";
/**
 * Created by Tall Prince on 2/6/2017.
 */
@NgModule({
    imports: [
        IonicModule,
        EvaluationManagementModule,
        MessageManagementModule,
        PersonalCenterModule,
        Ionic2RatingModule,
        BaiduMapModule,
    ],
    declarations: [
        SupportHomePage,
        SupportMenusPage,
        SupportLocationMap,
        SupportOrderAnalyticsPage,
        SupportIncomeAnalyticsPage,
    ],
    entryComponents: [
        SupportHomePage,
        SupportMenusPage,
        SupportLocationMap,
        SupportOrderAnalyticsPage,
        SupportIncomeAnalyticsPage
    ],
    providers: [
    ],
    exports: [
    ]
})
export class SupportModule { }