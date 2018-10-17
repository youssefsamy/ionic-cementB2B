import {Component} from '@angular/core';
import {App, Events, NavController, NavParams} from 'ionic-angular';
import {FactoryHomePage} from "../../factory.home/factory.home";
import {ClientApiService} from "../../../../services/client-api";
import {NotificationService} from "../../../../services/notification.service";
import {SettingsService} from "../../../../services/settings.service";
import {ViewDeliveryOrderPage} from "../../../common/view-delivery-order/view-delivery-order";

@Component({
    selector: 'page-factory-order-pending',
    templateUrl: 'factory-order-pending.html'
})

export class FactoryOrderPendingPage {

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

    ionViewDidLoad() {

    }

    ionViewDidEnter() {
        this.loadOrders();
    }

    ionViewWillEnter() {
        this.setting.badge.business_first = 0;
    }

    loadOrders() {
        console.log('dsf');
        this.api.loadFPendingOrders().subscribe(res => {
            console.log(res);
            this.orders = res.data;
        })
    }

    accept(index) {

        this.notify.showLoading();
        this.api.acceptFOrder(this.orders[index]['id']).subscribe(res => {

            this.notify.closeLoading();
            console.log(res);
            if (res.success) this.orders[index]['sub_status'] = 3;

        })
    }

    refuse(index) {

        this.notify.showLoading();
        this.api.refuseFOrder(this.orders[index]['id']).subscribe(res => {
            this.notify.closeLoading();
            console.log(res);
            if (res.success) this.orders[index]['sub_status'] = 2;
        })
    }

    goBack() {
        this.app.getRootNav().pop();
    }

    viewOrder(order) {
        this.app.getRootNav().push(ViewDeliveryOrderPage, {order: order});
    }
}