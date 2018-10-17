import { Component } from '@angular/core';
import {App, Events, ModalController, NavController} from 'ionic-angular';
import {ClientHomePage} from "../../client.home/client.home";
import {PendingManagementTabPage} from "../../pending-management/tab/pending-management-tab";
import {NotificationService} from "../../../../services/notification.service";
import {SettingsService} from "../../../../services/settings.service";
import {ClientApiService} from "../../../../services/client-api";
import {ViewOrderPage} from "../../view-order/view-order";
import {LeaveEvaluationPage} from "../../leave-evaluation/leave-evaluation";
import {PayHistoryPage} from "../../pay-history/pay-history";
import {CallModalPage} from "../../../common/call-modal/call-modal";
import {TrackMapPage} from "../../../common/track-map/track-map";

@Component({
    selector: 'page-pending',
    templateUrl: 'pending.html'
})

export class PendingPage {

    orders = [];
    result = '';

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
        this.setting.badge.pending = 0;
        this.loadPendingOrder();
    }



    goToHomePage() {
        this.app.getRootNav().setRoot(ClientHomePage);
    }

    goToPendingManagementPage(data) {
        this.app.getRootNav().push(PendingManagementTabPage,data);
    }


    loadPendingOrder() {
        this.api.loadPendingOrder().subscribe(res => {

            if (this.orders.length == 0) this.result = '暂时没有订单';

            this.orders = res.data;
        }, err => {
            this.notify.closeLoading()
            this.notify.showError(err);
        })
    }

    showOrder(data) {
        console.log(data);
        this.app.getRootNav().push(ViewOrderPage, {kind: data.order_kind, id: data.id});
    }

    goToFeedBackPage(index) {

        var order = this.orders[index];
        var modal = this.modalCtrl.create(LeaveEvaluationPage, {order: order});
        var _this = this;
        modal.onDidDismiss(data => {
            _this.orders.splice(index, 1);
        });

        modal.present();
    }

    pay(index) {

        var kind = this.orders[index]['order_kind'].substring(0,1);
        var id = this.orders[index]['id'];
        var budget = this.orders[index]['budget'];

        this.setting.payType = 'normal_pay';

        this.app.getRootNav().push(PayHistoryPage, {order_id: id, order_kind: kind, budget: budget})

    }

    goBack() {
        this.app.getRootNav().pop();
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

    track(order) {

        let params = {
            business_id: 'null',
            customer_id: this.setting.member_id,
            entity_name: 'b2b_track_B_' + order['id'],
        }

        this.app.getRootNav().push(TrackMapPage, {param: params});
    }
}