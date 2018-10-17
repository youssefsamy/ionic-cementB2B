import { Component } from '@angular/core';
import {App, Events, ModalController, NavController, NavParams} from 'ionic-angular';
import {ClientApiService} from "../../../../services/client-api";
import {NotificationService} from "../../../../services/notification.service";
import {SettingsService} from "../../../../services/settings.service";
import {CallModalPage} from "../../../common/call-modal/call-modal";
import {ViewDeliveryOrderPage} from "../../../common/view-delivery-order/view-delivery-order";
import {TrackMapPage} from "../../../common/track-map/track-map";



@Component({
    selector: 'page-receive',
    templateUrl: 'receive.html'
})
export class ReceivePage {

    order = '';
    receiveOrders = [];
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
        console.log(this.params.data);
        this.order = this.params.data;
    }

    ionViewDidEnter() {
        this.loadReceiveOrders();
    }


    goBack() {
        this.app.getRootNav().pop();
    }

    loadReceiveOrders() {
        console.log(this.order);
        var condition;
        if (this.order['order_kind'] == 'MM') {
            condition = '10';
        } else {
            condition = '01';
        }
        this.api.loadReceiveOrders(this.order['id'], condition).subscribe(res => {
            console.log(res.data);
            this.receiveOrders = res.data;

            if(this.receiveOrders.length == 0) this.result = '暂时没有订单';
        })
    }

    callPerson(order) {
        var call_modal = this.modalCtrl.create(CallModalPage);

        call_modal.onDidDismiss(data => {
            if (data == 'ok') {
                this.api.getContactNumber(order['servicer_id']).subscribe(res => {

                    if (res == '') {
                        this.notify.showError('Phone number error');
                        return;
                    }
                    this.makePhonecall(res);

                })
            }
        });

        call_modal.present()
    }

    makePhonecall(number) {
        this.notify.phoneCall(number);
    }

    showOrder(order) {
        console.log(order);
        this.app.getRootNav().push(ViewDeliveryOrderPage, {order: order});
    }

    track(order) {

        let params = {
            business_id: order['business_id'],
            customer_id: this.setting.member_id,
            entity_name: 'b2b_track_D_' + order['id'],
        }

        this.app.getRootNav().push(TrackMapPage, {param: params});
    }
}