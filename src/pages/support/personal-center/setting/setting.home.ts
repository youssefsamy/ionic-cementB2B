import { Component } from '@angular/core';
import {Events, ModalController, NavController} from 'ionic-angular';
import {SoundsService} from "../../../../services/sounds.service";
import {SelectSoundPage} from "../../../common/select-sound/select-sound";
import {SettingsService} from "../../../../services/settings.service";
import {ResetLoginPasswordPage} from "../../../common/reset-login-passwd/reset-login-passwd";
import {ClientApiService} from "../../../../services/client-api";
import {ResetCurrencyPasswordPage} from "../../../common/reset-currency-passwd/reset-currency-passwd";
import {DeviceService} from "../../../../services/device.service";

@Component({
    selector: 'page-setting.home',
    templateUrl: 'setting.home.html'
})
export class SettingHome {

    beepTone: boolean
    workState: boolean;
    systemNotificationState;
    orderNotificationState

    warningSound = '';

    userRole: string;

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public soundService: SoundsService,
        public setting: SettingsService,
        public modalCtrl: ModalController,
        public api: ClientApiService,
        public device: DeviceService
    ) {
        this.beepTone = this.setting.getStorage('beepTone') == 'yes' ? true: false;
        console.log(this.beepTone);
        this.userRole = this.setting.userRole;console.log(this.userRole);
        this.workState = this.setting.getWorkState() == 'yes' ? true: false;
        this.systemNotificationState = this.setting.getStorage('systemNotification', 'yes') == 'yes' ? true: false;
        this.orderNotificationState = this.setting.getStorage('orderNotification', 'yes') == 'yes' ? true: false;
    }

    ionViewWillEnter() {
        this.warningSound = this.setting.getWarningSound();
    }

    selectWarningSound() {
        this.navCtrl.push(SelectSoundPage);
    }

    changeBeepTone() {
        console.log(this.beepTone);
        this.setting.setStorage('beepTone', this.beepTone == true? 'yes': 'no');
    }

    changeLoginPassword() {
        let modal = this.modalCtrl.create(ResetLoginPasswordPage);
        modal.onDidDismiss(data => {

        })
        modal.present();
    }

    changeCurrencyPassword() {
        let modal = this.modalCtrl.create(ResetCurrencyPasswordPage);
        modal.onDidDismiss(data => {

        })
        modal.present();
    }

    changeWorkState() {
        console.log(this.workState);
        this.api.changeWorkState(this.workState == true? 1: 0).subscribe(res => {
            if (res.success) {
                this.setting.setWorkState(this.workState == true? 'yes': 'no');
            }
        })
    }

    changeSystemNotificationState() {
        console.log(this.systemNotificationState);
        this.setting.setStorage('systemNotification', this.systemNotificationState == true? 'yes': 'no');
        this.device.updatePushSetting();
    }

    changeOrderNotificationState() {
        console.log(this.orderNotificationState);
        this.setting.setStorage('orderNotification', this.orderNotificationState == true? 'yes': 'no');
        this.device.updatePushSetting();
    }

}