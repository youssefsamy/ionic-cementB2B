import {Component} from "@angular/core";
import {SettingsService} from "../../../services/settings.service";
import {NotificationService} from "../../../services/notification.service";
import {NavController, NavParams, ViewController} from "ionic-angular";
import {ClientApiService} from "../../../services/client-api";

@Component({
    selector: 'page-reset-login-passwd',
    templateUrl: 'reset-login-passwd.html'
})

export class ResetLoginPasswordPage {

    confirmed = true;

    info = {
        current_password: '',
        new_password: '',
        confirm_password: ''
    }

    constructor(
        private setting: SettingsService,
        private notify: NotificationService,
        private navCtrl: NavController,
        private params: NavParams,
        private viewCtrl: ViewController,
        private api: ClientApiService
    ) {

    }

    confirm() {
        if (this.info.confirm_password == this.info.new_password) {
            this.confirmed = true;
        } else {
            this.confirmed = false;
        }
    }


    validate() {
        if (this.info.new_password.length < 6) {
            this.notify.showError('Password less than 6');
            return false;
        }
        return true;
    }

    submitPassword() {
        if (!this.validate() || !this.confirmed) return;
        this.api.resetPassword(this.info.new_password, this.info.current_password).subscribe(res => {
            if (res.success) {
                this.notify.showSuccess('成功');
                this.viewCtrl.dismiss()
            } else {
                this.notify.showError(res.error);
            }
        })
    }

    cancel() {
        this.viewCtrl.dismiss();
    }

}