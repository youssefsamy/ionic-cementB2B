import { Component } from '@angular/core';
import {AlertController, Events, MenuController, Modal, ModalController, NavController} from 'ionic-angular';
import {QrcodeModalPage} from "../../common/qrcode-modal/qrcode-modal";
import {ClientApiService} from "../../../services/client-api";
import {NotificationService} from "../../../services/notification.service";
import {SettingsService} from "../../../services/settings.service";
import {SupportLocationMap} from "../support-location-map/support-location-map";
import {SystemInfo} from "../message-management/system-info/system-info";
import {SettingHome} from "../personal-center/setting/setting.home";
import {TrackService} from "../../../services/track.service";

@Component({
    selector: 'page-support-home',
    templateUrl: 'support.home.html'
})
export class SupportHomePage {

    state: string = 'order';
    user: any;

    orders = [];
    pending_orders = [];
    complete_orders = [];

    userType = '';

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public menuCtrl: MenuController,
        public modalCtrl: ModalController,
        public api: ClientApiService,
        public notify: NotificationService,
        public setting: SettingsService,
        public track: TrackService,
        public alertCtrl: AlertController
    ) {
        this.userType = this.setting.userType;
    }


    ionViewWillEnter() {
        this.stateChanged();
        this.api.getUserInfo().subscribe(res => {
            console.log(res.data);
            this.user = res.data;
        })
    }

    login() {

    }

    openMenu() {
        this.menuCtrl.open();
    }

    stateChanged() {
        switch (this.state) {
            case 'order':
                this.setting.badge.servicer_first = 0;
                this.api.loadSOrders().subscribe(res => {
                    console.log(res);
                    this.orders = res.data;
                }); break;
            case 'pending':
                this.setting.badge.servicer_second = 0;
                this.api.loadSPendingOrders().subscribe(res => {
                    console.log(res);
                    this.pending_orders = res.data;
                }); break;
            case 'completed':
                this.setting.badge.servicer_third = 0;
                this.api.loadSCompleteOrders().subscribe(res => {
                    console.log(res);
                    this.complete_orders = res.data;
                }); break;
        }
    }

    accept(index) {
        var id = this.orders[index]['id'];

        this.notify.showLoading();
        this.api.acceptSOrder(id).subscribe(res => {
            this.notify.closeLoading();
            if (res.success) {
                this.orders.splice(index, 1);
            } else {
                this.notify.showError('error');
            }
        }, err => {
            this.notify.showError(err);
        });
    }

    startService(index) {


        /*this.startUploadTrack('b2b_track_B_' + this.pending_orders[index]['id']);*/

        var id = this.pending_orders[index]['id'];
        this.api.startSService(id).subscribe(res => {
            if (res.success) {
                if (this.userType == 'B' || this.userType == 'R') {
                    this.pending_orders[index]['sub_status'] = 3;

                    /*this.startUploadTrack('b2b_track_B_' + this.pending_orders[index]['id']);*/
                    this.setting.setStorage('isServicing', 'yes');
                    this.setting.setStorage('entity_name', 'b2b_track_B_' + this.pending_orders[index]['id']);

                } else {
                    this.pending_orders[index]['sub_status'] = 1;

                    /*this.startUploadTrack('b2b_track_D_' + this.pending_orders[index]['id']);*/
                    this.setting.setStorage('isServicing', 'yes');
                    this.setting.setStorage('entity_name', 'b2b_track_D_' + this.pending_orders[index]['id']);
                }
            } else {
                this.notify.showError('error');
            }
        }, err => {
            this.notify.showError(err);
        })
    }

    startUploadTrack(entity_name) {
        this.track.startUploadTrack(entity_name);
    }

    getQrcode(index) {
        var id = this.pending_orders[index]['id'];
        this.api.getSQrcode(id).subscribe(res => {
            if (res.success) {
                console.log(res.qrCode);
                this.showQrcode(res.qrCode);
            } else {
                this.notify.showError('error');
            }
        })
    }

    showQrcode(qrcode) {
        var modal = this.modalCtrl.create(QrcodeModalPage, {qrCode: qrcode});

        modal.onDidDismiss(data => {

        });

        modal.present();
    }

    endService(index) {

        let confirm = this.alertCtrl.create({
            title: '警告',
            message: '确定完成服务吗？',
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

                        this.api.endService(this.pending_orders[index]['id']).subscribe(res => {

                            if (res.success) {

                                this.notify.showSuccess('成功');

                                this.setting.badge.servicer_second = 0;

                                this.api.loadSPendingOrders().subscribe(res => {
                                    console.log(res);
                                    this.pending_orders = res.data;
                                });

                            }
                        })

                    }
                },

            ]
        });
        confirm.present();
    }

    allowBalance(index) {
        var id = this.pending_orders[index]['id'];
        this.notify.showLoading();
        this.api.allowBalance(id).subscribe(res => {
            this.notify.closeLoading();
            if (res.success) {
                this.pending_orders.splice(index, 1);
            } else {
                this.notify.showError('error');
            }
        }, err => {
            this.notify.showError(err);
        });
    }

    rejectBalance(index) {
        var id = this.pending_orders[index]['id'];
        this.notify.showLoading()
        this.api.rejectBalance(id).subscribe(res => {
            this.notify.closeLoading();
            if (res.success) {
                this.pending_orders.splice(index, 1);
            } else {
                this.notify.showError('error');
            }
        }, err => {
            this.notify.showError(err);
        });
    }

    viewLocation() {

        let modal = this.modalCtrl.create(SupportLocationMap, {servicer: this.user});
        modal.present();

    }

    goToNotification() {
        this.navCtrl.push(SystemInfo);
    }

    goToSettingPage() {
        this.navCtrl.push(SettingHome)
    }
}
