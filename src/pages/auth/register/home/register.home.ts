import {Component, NgZone} from '@angular/core';
import {Events, NavController} from 'ionic-angular';


import {RegisterSelectRolePage} from "../select-role/select-role";


import {ClientApiService} from "../../../../services/client-api";
import {NotificationService} from "../../../../services/notification.service";
import {SettingsService} from "../../../../services/settings.service";


@Component({
    selector: 'page-register-home',
    templateUrl: 'register.home.html'
})
export class RegisterHomePage {

    time: any = '';
    clock: any = null;
    verified = false;

    info: any = {
        phone: '',
        sms_code: '',
        password: ''
    };

    constructor(public navCtrl: NavController,
                public events: Events,
                public api: ClientApiService,
                public notify: NotificationService,
                public setting: SettingsService,
                private zone: NgZone) {
    }

    ionViewDidLoad() {

    }

    register() {
        if (this.verified == true) {
            if (this.info.phone == '' || this.info.password == '') {
                this.notify.showError('请正确地输入所有信息');
                this.verified = false;
                return;
            }
            this.setting.phoneNumber = this.info.phone;
            this.setting.password = this.info.password;
            this.navCtrl.push(RegisterSelectRolePage);
        } else {
            this.verifyCode();
        }

        /*this.navCtrl.push(RegisterSelectRolePage);*/
    }

    receiveCode() {

        if (this.info.phone == '') {
            this.notify.showError('请正确地输入所有信息');
            return;
        }
        this.verified = false;

        this.notify.showLoading()
        this.api.sendVerifyCode(this.info.phone).subscribe(res => {

            this.notify.closeLoading();

            if (res.success) {
                this.notify.showSuccess('验证码已发送，有效时间为十分钟。');
                this.startTimer(60);
            } else {
                this.notify.showError(res.error);
            }
        })
    }

    verifyCode() {

        if (this.info.sms_code == '') {
            this.notify.showError('请输入验证码');
            return;
        }

        if (this.info.password.length < 6) {
            this.notify.showError('Password less than 6');
            return;
        }

        this.notify.showLoading()

        this.api.verifyCode(this.info.phone, this.info.sms_code).subscribe(res => {

            this.notify.closeLoading();
            if (res.success) {
                this.verified = true;
                this.register();
            } else {
                this.notify.showError(res.error);
            }
        });
    }

    startTimer(secs) {

        if (this.clock && !this.clock !== null) {
            this.time = secs;
            return;
        }

        this.time = secs;

        this.clock = setInterval(() => {
            this.zone.run(() => {
                this.time--;

                if (this.time <= 0) {
                    this.stopTimer();
                    this.time = '';
                }
            });

        }, 1000);
    }

    stopTimer() {
        clearInterval(this.clock);
        this.clock = null;
    }

}
