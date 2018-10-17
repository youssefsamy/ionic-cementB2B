import { Component } from '@angular/core';
import {App, Events, ModalController, NavController, NavParams} from 'ionic-angular';
import {ClientApiService} from "../../../../services/client-api";
import {NotificationService} from "../../../../services/notification.service";
import {SettingsService} from "../../../../services/settings.service";
import {OrderDemandPage} from "../../order-demand/order-demand";
import {ViewDeliveryOrderPage} from "../../../common/view-delivery-order/view-delivery-order";



@Component({
    selector: 'page-match',
    templateUrl: 'match.html'
})
export class MatchPage {

    order = '';
    deliveryOrders = [];
    result = '';

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public params: NavParams,
        public api: ClientApiService,
        public notify: NotificationService,
        public setting: SettingsService,
        public app: App,
        public modalCtrl: ModalController
    ) {
        this.order = this.params.data;
    }

    ionViewDidLoad() {

    }

    ionViewDidEnter() {
        this.loadDeliveryOrders();
    }

    loadDeliveryOrders() {
        var condition;
        if (this.order['order_kind'] == 'MM') {
            condition = '10';
        } else {
            condition = '01';
        }
        this.api.loadDeliveryOrders(this.order['id'], condition).subscribe(res => {
            this.deliveryOrders = res.data;
            if (this.deliveryOrders.length == 0) this.result = '暂时没有订单';
        }, err => this.notify.showError(err));
    }

    goBack() {
        this.app.getRootNav().pop();
    }

    goToOrderDemandPage() {

        let modal = this.modalCtrl.create(OrderDemandPage, {order: this.order});
        modal.onDidDismiss(data => {
            if (data == 'success') {
                this.loadDeliveryOrders();
            }
        })
        modal.present();
    }

    showOrder(order) {
        console.log(order);
        this.app.getRootNav().push(ViewDeliveryOrderPage, {order: order});
    }
}