import {Component} from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import {ClientApiService} from "../../../services/client-api";
import {NotificationService} from "../../../services/notification.service";
import {SubmitMortarPage} from "../submit-mortar/submit-mortar";
import {SubmitBalancePage} from "../submit-balance/submit-balance";

declare var $: any;
@Component({
    selector: 'page-select-order',
    templateUrl: 'select-order.html'
})

export class SelectOrderPage {


    constructor(
        public navCtrl: NavController,
        public events: Events,
        public api: ClientApiService,
        public notify: NotificationService
    ) {

    }

    ionViewDidLoad() {

    }

    goToMortar() {
        this.navCtrl.push(SubmitMortarPage);
    }

    goToBalance() {
        this.navCtrl.push(SubmitBalancePage);
    }
}
