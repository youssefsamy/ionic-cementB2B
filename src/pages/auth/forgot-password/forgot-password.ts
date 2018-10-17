import {Component, NgZone} from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import {NotificationService} from "../../../services/notification.service";
import {ClientApiService} from "../../../services/client-api";
import {LoginPage} from "../login/login";

@Component({
    selector: 'page-forgot-password',
    templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {

    time: any = '';
    clock: any = null;
    verified = false;

    info:any = {
        phone: '',
        password: '',
        confirm_password: '',
    };

    confirmed = true;

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public notify: NotificationService,
        public api: ClientApiService,
        private zone: NgZone
    ) {

    }

    ionViewDidLoad() {

    }


    confirm() {
        if (this.info.confirm_password == this.info.password) {
            this.confirmed = true;
        } else {
            this.confirmed = false;
        }
    }

    validate() {
        if (this.info.password.length < 6) {
            this.notify.showError('Password less than 6');
            return false;
        }
        return true;
    }

    receiveVerifyCode() {
        if (this.info.phone == '') {
            this.notify.showError('请正确地输入所有信息');
            return;
        }
        this.verified = false;

        this.notify.showLoading()
        this.api.sendVerifyCode(this.info.phone, 1).subscribe(res => {

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

        this.api.verifyCode(this.info.phone, this.info.sms_code).subscribe(res => {
            if (res.success) {
                this.verified = true;
                this.resetPassword();
            } else {
                this.notify.showError(res.error);
            }
        });
    }

    resetPassword() {
        if (this.verified == true) {
            if (!this.validate() || !this.confirmed) {
                this.verified = false;
                return
            }
            if (this.info.phone == '') {
                this.notify.showError('请正确地输入所有信息');
                this.verified = false
                return;
            }
            this.api.forgetPassword(this.info.phone, this.info.password).subscribe(res => {
                if (res.success) {
                    this.notify.showSuccess('成功');
                    this.navCtrl.setRoot(LoginPage);
                } else {
                    this.notify.showError(res.error);
                    this.verified = false;
                }
            })
        } else {
            this.verifyCode();
        }
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
