import { Component } from '@angular/core';
import {App, Events, ModalController, NavController, NavParams} from 'ionic-angular';
import {ClientApiService} from "../../../../services/client-api";
import {NotificationService} from "../../../../services/notification.service";
import {SettingsService} from "../../../../services/settings.service";
import {LeaveEvaluationPage} from "../../leave-evaluation/leave-evaluation";
import {ViewDeliveryOrderPage} from "../../../common/view-delivery-order/view-delivery-order";



@Component({
    selector: 'page-evaluation',
    templateUrl: 'evaluation.html'
})
export class EvaluationPage {

    order = '';
    evaluationOrders = [];
    result = '';

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public params: NavParams,
        public api: ClientApiService,
        public notify: NotificationService,
        public setting: SettingsService,
        public modalCtrl: ModalController,
        private app: App
    ) {
        this.order = this.params.data;

    }

    ionViewDidEnter() {
        this.loadEvaluationOrders();
    }

    goBack() {
        this.app.getRootNav().pop();
    }

    loadEvaluationOrders() {
        var condition;
        if (this.order['order_kind'] == 'MM') {
            condition = '10';
        } else {
            condition = '01';
        }
        this.api.loadEvaluationOrders(this.order['id'], condition).subscribe(res => {
            console.log(res);
            this.evaluationOrders = res.data;
            if (this.evaluationOrders.length == 0) this.result = '暂时没有订单';
        }, err => this.notify.showError(err));
    }

    goToLeaveEvaluationPage(order) {

        var modal = this.modalCtrl.create(LeaveEvaluationPage, {'order': order});
        modal.onDidDismiss(data => {

            if (data == 'true') this.loadEvaluationOrders();
        });
        modal.present();
    }

    showOrder(order) {
        console.log(order);
        this.app.getRootNav().push(ViewDeliveryOrderPage, {order: order});
    }

}