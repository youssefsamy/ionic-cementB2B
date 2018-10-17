import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import { Ionic2RatingModule } from 'ionic2-rating';
import {BaiduMapModule} from "angular2-baidu-map";

import {FactoryHomePage} from "./factory.home/factory.home";
import {SearchFactoryPage} from "./search-factory/searcg-factory";
import {SearchFactoryResultPage} from "./search-factory-result/search-factory-result";
import {FactoryDetailPage} from "./factory-detail/factory-detail";
import {FactoryLocationMap} from "./factory-location-map/factory-location-map";
import {FactoryOrderManagementModule} from "./factory-order-management/factory-order-management.module";
import {FactoryCenterModule} from "./mine/mine.module";
import {FactoryCouponPage} from "./factory-coupon/factory-coupon";
import {NewCouponPage} from "./new-coupon/new-coupon";
import {FactoryDataAnalyticsPage} from "./data-analytics/data-analytics";


@NgModule({
    imports: [
        IonicModule,
        Ionic2RatingModule,
        BaiduMapModule,
        FactoryOrderManagementModule,
        FactoryCenterModule,
    ],
    declarations: [
        FactoryHomePage,
        SearchFactoryPage,
        SearchFactoryResultPage,
        FactoryDetailPage,
        FactoryLocationMap,
        FactoryCouponPage,
        NewCouponPage,
        FactoryDataAnalyticsPage,
    ],
    entryComponents: [
        FactoryHomePage,
        SearchFactoryPage,
        SearchFactoryResultPage,
        FactoryDetailPage,
        FactoryLocationMap,
        FactoryCouponPage,
        NewCouponPage,
        FactoryDataAnalyticsPage
    ],
    providers: [
    ],
    exports: [

    ]
})
export class FactoryModule { }
