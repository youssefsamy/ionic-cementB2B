import {Component} from "@angular/core";
import {SettingsService} from "../../../services/settings.service";
import {NavController} from "ionic-angular";
import {FactoryDataAnalyticsPage} from "../../factory/data-analytics/data-analytics";
import {SupportOrderAnalyticsPage} from "../../support/support-order-analytics/support-order-analytics";
import {SupportIncomeAnalyticsPage} from "../../support/support-income-analytics/support-income-analytics";

@Component({

    selector: 'page-data-analytics',
    templateUrl: 'data-analytics.html'

})

export class DataAnalyticsPage {

    userRole: string;

    constructor(private setting: SettingsService, private navCtrl: NavController) {
        this.userRole = this.setting.userRole
    }

    goToFactoryDataAnalyticsPage() {
        this.navCtrl.push(FactoryDataAnalyticsPage);
    }


    goToSupportOrderAnalyticsPage() {
        this.navCtrl.push(SupportOrderAnalyticsPage);
    }

    goToSupportIncomeAnalyticsPage() {
        this.navCtrl.push(SupportIncomeAnalyticsPage);
    }
}