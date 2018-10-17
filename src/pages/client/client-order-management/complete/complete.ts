import { Component } from '@angular/core';
import {App, Events, ModalController, NavController} from 'ionic-angular';
import {ClientHomePage} from "../../client.home/client.home";
import {NotificationService} from "../../../../services/notification.service";
import {SettingsService} from "../../../../services/settings.service";
import {ClientApiService} from "../../../../services/client-api";
import {ViewOrderPage} from "../../view-order/view-order";
import {PayHistoryPage} from "../../pay-history/pay-history";
import {LeaveEvaluationPage} from "../../leave-evaluation/leave-evaluation";

@Component({
    selector: 'page-complete',
    templateUrl: 'complete.html'
})

export class CompletePage {

    orders = [];
    result = ''

    constructor(
        public navCtrl: NavController,
        public events: Events,
        private app: App,
        public notify: NotificationService,
        public setting: SettingsService,
        public api: ClientApiService,
        public modalCtrl: ModalController
    ) {

    }

    ionViewWillEnter() {
        this.setting.badge.complete = 0;
        this.loadCompleteOrders();
    }

    loadCompleteOrders() {




        this.api.loadCompleteOrders().subscribe(res => {
            console.log(res);

            if (this.orders.length == 0) this.result = '暂时没有订单'
            this.orders = res.data;
        })
    }

    pay(index) {

        this.setting.payType = 'complete_pay';

        var kind = this.orders[index]['order_kind'].substring(0,1);
        var id = this.orders[index]['id'];
        var budget = this.orders[index]['budget'];

        this.app.getRootNav().push(PayHistoryPage, {order_id: id, order_kind: kind, budget: budget});
    }

    showOrder(data) {
        console.log(data);
        this.app.getRootNav().push(ViewOrderPage, {kind: data.order_kind, id: data.id});
    }

    goBack() {
        this.app.getRootNav().pop();
    }

    goToHomePage() {
        this.app.getRootNav().setRoot(ClientHomePage);
    }

    goToFeedBackPage(index) {

        var order = this.orders[index];
        var modal = this.modalCtrl.create(LeaveEvaluationPage, {order: order});
        var _this = this;
        modal.onDidDismiss(data => {
            if (data == 'true') {
                _this.orders[index]['status'] = 6;
            }
        })
        modal.present();

    }
}