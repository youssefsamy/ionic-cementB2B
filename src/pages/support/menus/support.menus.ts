import { Component } from '@angular/core';
import {Events, MenuController, NavController, ViewController} from 'ionic-angular';
import {SupportHomePage} from "../home/support.home";
import {EvaluationHome} from "../evaluation-management/evaluatoin-home/evaluation-home";
import {MessageHome} from "../message-management/message-home/message.home";
import {PersonalCenterHome} from "../personal-center/personal-center-home/personal-center-home";
import {ClientApiService} from "../../../services/client-api";
import {FundManagementHomePage} from "../../common/fund-management/home/fund-management-home";
import {SettingsService} from "../../../services/settings.service";
import {SystemInfo} from "../message-management/system-info/system-info";
import {DataAnalyticsPage} from "../../common/data-analytics/data-analytics";
import {AdvertisePage} from "../../common/advertise/advertise";

@Component({
    selector: 'page-support-menus',
    templateUrl: 'support.menus.html'
})
export class SupportMenusPage {

    rootPage = SupportHomePage;

    name: string;

    constructor(
        public menu: MenuController,
        public navCtrl: NavController,
        public api: ClientApiService,
        public setting: SettingsService,
        public viewCtrl: ViewController
    ) {
        this.name = this.setting.userName;
    }

    ionViewDidLoad() {

    }

    goEvaluation() {
        this.navCtrl.push(EvaluationHome);
    }

    goMessage() {
        this.navCtrl.push(SystemInfo);
    }

    goPersonalCenter() {
        this.navCtrl.push(PersonalCenterHome);
    }

    openPage(page) {
        this.rootPage = page;
    }

    goToFundManagementHome() {
        this.navCtrl.push(FundManagementHomePage);
    }

    goToDataAnalyticsPage() {
        this.navCtrl.push(DataAnalyticsPage);
    }

    goToAdvertisePage() {
        this.navCtrl.push(AdvertisePage);
    }
}
