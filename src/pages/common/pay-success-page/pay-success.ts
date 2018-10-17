import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {SettingsService} from "../../../services/settings.service";
import {ClientOrderManagementTabPage} from "../../client/client-order-management/tab/client-order-management-tab";

@Component({
    templateUrl: 'pay-success.html',
    selector: 'page-pay-success'
})

export class PaySuccessPage {

    payType: any;

    constructor(
        private navCtrl: NavController,
        private params: NavParams,
        private setting: SettingsService
    ) {

    }

    checkOrder() {
        if (this.setting.payType == 'normal_pay') {
            this.navCtrl.push(ClientOrderManagementTabPage, {tabIndex: 2});
        } else if (this.setting.payType == 'pre_pay') {
            this.navCtrl.push(ClientOrderManagementTabPage, {tabIndex: 1});
        } else if (this.setting.payType == 'complete_pay') {
            this.navCtrl.push(ClientOrderManagementTabPage, {tabIndex: 3});
        }
    }
}
