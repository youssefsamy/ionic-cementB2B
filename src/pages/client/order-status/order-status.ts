import { Component } from '@angular/core';
import {AlertController, App, Events, ModalController, NavController, NavParams} from 'ionic-angular';
import {ClientHomePage} from "../client.home/client.home";
import {ClientApiService} from "../../../services/client-api";
import {NotificationService} from "../../../services/notification.service";
import {SettingsService} from "../../../services/settings.service";
import {ViewOrderPage} from "../view-order/view-order";
import {DraftContractPage} from "../draft-contract/draft-contract";
import {SelectOrderPage} from "../select-order/select-order";
import {CallModalPage} from "../../common/call-modal/call-modal";
import {TrackMapPage} from "../../common/track-map/track-map";


@Component({
    selector: 'page-order-status',
    templateUrl: 'order-status.html'
})
export class OrderStatusPage {

    state: string = 'mortar';

    orderMortar: any;
    orderBalance: any;
    orderAll: any;

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public params: NavParams,
        public api: ClientApiService,
        public notify: NotificationService,
        public setting: SettingsService,
        public modalCtrl: ModalController,
        public app: App,
        public alertCtrl: AlertController

    ) {

    }

    ionViewDidLoad() {
        if (this.params) {
            console.log(this.params);
            this.state = this.params.get('state');
            console.log(this.state);
        }

        this.loadOrders();
    }

    goToHomePage() {
        this.app.getRootNav().setRoot(ClientHomePage);
    }


    loadOrders() {
        this.api.loadOrderMortar().subscribe(res => {
            console.log(res);
            this.orderMortar = res.data;
        }, err => {
            this.notify.showError(err);
        })

        this.api.loadOrderBalance().subscribe(res => {
            console.log(res);
            this.orderBalance = res.data;
        }, err => {
            this.notify.showError(err);
        })

        this.api.loadOrderAll().subscribe(res => {
            console.log(res);
            this.orderAll = res.data;
        }, err => {
            this.notify.showError(err);
        })
    }

    showOrder(data) {
        console.log(data);
        this.navCtrl.push(ViewOrderPage, {kind: data.order_kind, id: data.id});
    }


    goToDraftContractPage(data) {
        console.log(data);
        this.navCtrl.push(DraftContractPage, data);
    }

    SelectOrderPage() {
        this.navCtrl.push(SelectOrderPage);
    }

    segmentChanged(e) {
        this.loadOrders();
    }

    downloadFile(url) {

    }

    deleteOrder(order) {

        let alert = this.alertCtrl.create({
            title: '警告',
            message: '确定要删除吗？',
            cssClass: 'soundAlert',
            buttons: [
                {
                    text: '取  消',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: '确  定',
                    handler: () => {
                        this.notify.showLoading();
                        this.api.deleteOrder(order['order_kind'].substring(0, 1), order['id']).subscribe(res => {
                            if (res.success) {

                                this.notify.closeLoading();
                                this.loadOrders();
                            }
                        })
                    }
                },
            ]
        })
        alert.present()

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