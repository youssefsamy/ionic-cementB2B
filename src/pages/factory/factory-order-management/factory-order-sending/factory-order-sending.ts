import {Component} from '@angular/core';
import {App, Events, NavController, NavParams} from 'ionic-angular';
import {FactoryHomePage} from "../../factory.home/factory.home";
import {ClientApiService} from "../../../../services/client-api";
import {NotificationService} from "../../../../services/notification.service";
import {SettingsService} from "../../../../services/settings.service";
import {ViewDeliveryOrderPage} from "../../../common/view-delivery-order/view-delivery-order";
import {TrackMapPage} from "../../../common/track-map/track-map";



@Component({
    selector: 'page-factory-order-sending',
    templateUrl: 'factory-order-sending.html'
})

export class FactoryOrderSendingPage {

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
        this.loadOrders();
    }

    ionViewWillEnter() {
        this.setting.badge.business_second = 0;
    }

    loadOrders() {
        this.api.loadFSendingOrders().subscribe(res => {
            console.log(res);
            this.orders = res.data;
        })
    }

    goBack() {
        this.app.getRootNav().pop();
    }

    showOrder(order) {
        this.app.getRootNav().push(ViewDeliveryOrderPage, {order: order});
    }

    track(order) {

        let params = {
            business_id: order['business_id'],
            customer_id: order['customer_id'],
            entity_name: 'b2b_track_D_' + order['id'],
        }

        this.app.getRootNav().push(TrackMapPage, {param: params});
    }
}