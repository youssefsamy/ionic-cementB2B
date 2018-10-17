import { Component } from '@angular/core';
import {App, Events, NavController} from 'ionic-angular';
import {ClientHomePage} from "../../client.home/client.home";
import {NotificationService} from "../../../../services/notification.service";
import {SettingsService} from "../../../../services/settings.service";
import {ClientApiService} from "../../../../services/client-api";
import {ViewOrderPage} from "../../view-order/view-order";
import {SelectPayWayPage} from "../../select-pay-way/select-pay-way";

@Component({
    selector: 'page-pay',
    templateUrl: 'pay.html'
})

export class PayPage {

    orders = [];
    result = '';

    constructor(
        public navCtrl: NavController,
        public events: Events,
        private app: App,
        public notify: NotificationService,
        public setting: SettingsService,
        public api: ClientApiService
    ) {

    }

    goToHomePage() {
        this.app.getRootNav().setRoot(ClientHomePage);
    }

    ionViewWillEnter() {
        this.setting.badge.pay = 0;
        this.loadPayInfo();
    }

    loadPayInfo() {



        this.api.loadPayOrder().subscribe(res => {
            console.log(res);

            if (this.orders.length == 0) this.result = '暂时没有订单';
            this.orders = res.data;
        })
    }

    pay(index) {

        let info = {
            description: '预付款',
            order_id: this.orders[index]['id'],
            order_kind: this.orders[index]['order_kind'].substring(0,1)
        }

        this.setting.payType = 'pre_pay';

        this.app.getRootNav().push(SelectPayWayPage, {payInfo: info});

        /*var kind = this.orders[index]['order_kind'];
        var id = this.orders[index]['id'];
        this.api.pay(kind.substr(0,1), id).subscribe(res => {
            if (res.success == true) {
                this.notify.showSuccess('成功');
                this.orders[index]['sub_status'] = 1;
            }
        })*/
    }

    showOrder(data) {
        console.log(data);
        this.app.getRootNav().push(ViewOrderPage, {kind: data.order_kind, id: data.id});
    }

    goBack() {
        this.app.getRootNav().pop();
    }
}