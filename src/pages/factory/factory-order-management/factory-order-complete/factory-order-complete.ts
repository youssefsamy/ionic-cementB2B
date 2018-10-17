import {Component} from '@angular/core';
import {App, Events, NavController, NavParams} from 'ionic-angular';
import {FactoryHomePage} from "../../factory.home/factory.home";
import {ClientApiService} from "../../../../services/client-api";
import {NotificationService} from "../../../../services/notification.service";
import {SettingsService} from "../../../../services/settings.service";
import {ViewDeliveryOrderPage} from "../../../common/view-delivery-order/view-delivery-order";



@Component({
    selector: 'page-factory-order-complete',
    templateUrl: 'factory-order-complete.html'
})

export class FactoryOrderCompletePage {

    orders = '';

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public params: NavParams,
        private app: App,
        public api: ClientApiService,
        public notify: NotificationService,
        public setting: SettingsService
    ) {

    }

    ionViewDidEnter() {
        this.loadCompleteOrders();
    }

    ionViewWillEnter() {
        this.setting.badge.business_third = 0;
    }


    loadCompleteOrders() {
        this.api.loadFCompleteOrders().subscribe(res => {
            console.log(res);
            this.orders = res.data;
        }, err => this.notify.showError(err));
    }

    goBack() {
        this.app.getRootNav().pop();
    }

    viewOrder(order) {
        this.app.getRootNav().push(ViewDeliveryOrderPage, {order: order});
    }

}