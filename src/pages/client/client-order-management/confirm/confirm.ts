import { Component } from '@angular/core';
import {AlertController, App, Events, ModalController, NavController} from 'ionic-angular';
import {ClientHomePage} from "../../client.home/client.home";
import {NotificationService} from "../../../../services/notification.service";
import {SettingsService} from "../../../../services/settings.service";
import {ClientApiService} from "../../../../services/client-api";
import {ViewOrderPage} from "../../view-order/view-order";
import {LeaveEvaluationPage} from "../../leave-evaluation/leave-evaluation";

declare var $: any;
@Component({
    selector: 'page-confirm',
    templateUrl: 'confirm.html'
})

export class ConfirmPage {


    info:any = {
        email: '',
        password: '',
    };

    result = '';

    orders = [];

    constructor(
        public navCtrl: NavController,
        public events: Events,
        private app: App,
        public notify: NotificationService,
        public setting: SettingsService,
        public api: ClientApiService,
        public alertCtrl: AlertController,
        public modalCtrl: ModalController
    ) {

    }
    ionViewWillEnter() {
        this.setting.badge.confirm = 0;
        this.loadConfirmInfo();
    }

    goToHomePage() {
        this.app.getRootNav().setRoot(ClientHomePage);
    }

    /// load Data from Server
    loadConfirmInfo() {


        this.api.loadConfirmOrder().subscribe(res => {
            this.orders = res.data;
            if (this.orders.length == 0) this.result = '暂时没有订单';
            console.log(this.orders);
        })
    }

    makeContract(index) {

        if (this.orders[index]['order_kind'] == 'BI') {

            this.api.hasFeedBack(this.orders[index]['id'], this.orders[index]['servicer_id']).subscribe(res => {

                if (res.success) {
                    if (res.count == 0) {
                        let alert = this.alertCtrl.create({
                            title: '通知',
                            message: '请对业务员进行评价。',
                            cssClass: 'soundAlert',
                            buttons: [
                                {
                                    text: 'skip',
                                    handler: () => {
                                        let alert1 = this.alertCtrl.create({
                                            title: '通知',
                                            message: '您确定线下发走合同吗?',
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
                                                        var kind = this.orders[index]['order_kind'];
                                                        var id = this.orders[index]['id'];
                                                        this.notify.showLoading();

                                                        this.api.makeContract(kind.substr(0,1), id).subscribe(res => {
                                                            this.notify.closeLoading();
                                                            if (res.success == true) {
                                                                this.notify.showSuccess(' 成功');
                                                                this.orders[index]['sub_status'] = 1;
                                                            }
                                                        })
                                                    }
                                                },
                                            ]
                                        })

                                        alert1.present();
                                    }
                                },
                                {
                                    text: '确  定',
                                    handler: () => {
                                        let modal = this.modalCtrl.create(LeaveEvaluationPage, {'order': this.orders[index], businesser_evaluation: true});
                                        modal.present();
                                    }
                                },
                            ]
                        })

                        alert.present();

                    } else {
                        let alert = this.alertCtrl.create({
                            title: '通知',
                            message: '您确定线下发走合同吗?',
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
                                        var kind = this.orders[index]['order_kind'];
                                        var id = this.orders[index]['id'];
                                        this.notify.showLoading();

                                        this.api.makeContract(kind.substr(0,1), id).subscribe(res => {
                                            this.notify.closeLoading();
                                            if (res.success == true) {
                                                this.notify.showSuccess(' 成功');
                                                this.orders[index]['sub_status'] = 1;
                                            }
                                        })
                                    }
                                },
                            ]
                        })

                        alert.present();
                    }
                }
            })

        } else {

            let alert = this.alertCtrl.create({
                title: '通知',
                message: '您确定线下发走合同吗?',
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
                            var kind = this.orders[index]['order_kind'];
                            var id = this.orders[index]['id'];
                            this.notify.showLoading();
                            this.api.makeContract(kind.substr(0,1), id).subscribe(res => {
                                this.notify.closeLoading()
                                if (res.success == true) {
                                    this.notify.showSuccess(' 成功');
                                    this.orders[index]['sub_status'] = 1;
                                }
                            })
                        }
                    },
                ]
            })

            alert.present();
        }


    }

    downloadContract(index) {
        var url = this.orders[index]['contract_url'];
        window.open(url);
    }

    showOrder(data) {
        console.log(data);
        this.app.getRootNav().push(ViewOrderPage, {kind: data.order_kind, id: data.id});
    }

    goBack() {
        this.app.getRootNav().pop();
    }
}