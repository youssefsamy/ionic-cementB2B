import {Component} from '@angular/core';
import {Events, NavController, NavParams} from 'ionic-angular';
import {OfflinePayPage} from "../offline-pay-page/offline-pay-page";
import {OnlinePayPage} from "../online-pay-page/online-pay-page";

@Component({
    selector: 'page-select-pay-way',
    templateUrl: 'select-pay-way.html'
})

export class SelectPayWayPage {

    payInfo: any;

    constructor(
        public navCtrl: NavController,
        public events: Events,
        private params: NavParams
    ) {

    }

    ionViewDidLoad() {
        if (this.params.get('payInfo')) this.payInfo = this.params.get('payInfo');
    }

    goToOnlinePayPage() {
        this.navCtrl.push(OnlinePayPage, {payInfo: this.payInfo});
    }

    goToOfflinePayPage() {
        this.navCtrl.push(OfflinePayPage, {payInfo: this.payInfo});
    }
}
