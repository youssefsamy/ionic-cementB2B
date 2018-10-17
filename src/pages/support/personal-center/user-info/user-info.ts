import { Component } from '@angular/core';
import {Events, NavController} from 'ionic-angular';

import {Margin} from "../margin/margin";
import {PersonalBankPage} from "../../../common/personal-bank/personal-bank";
import {ClientApiService} from "../../../../services/client-api";
import {SettingsService} from "../../../../services/settings.service";
import {CompanyBankPage} from "../../../common/company-bank/comapny-bank";
import {NotificationService} from "../../../../services/notification.service";

@Component({
    selector: 'page-user-info',
    templateUrl: 'user-info.html'
})
export class UserInfo {

    userinfo = '';
    userRole = '';

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public api: ClientApiService,
        public setting: SettingsService,
        public notify: NotificationService
    ) {
        this.userRole = this.setting.userRole;
    }

    ionViewDidLoad() {
        this.api.getUserDetail(this.setting.userRole, this.setting.member_id).subscribe(res => {
            if (res.success) {
                this.userinfo = res.data;
            }
        })
    }

    goToCardCertification() {

        if (this.setting.userBankType == 'P') {
            this.navCtrl.push(PersonalBankPage, {info: this.userinfo});
        } else {
            this.navCtrl.push(CompanyBankPage, {info: this.userinfo});
        }

    }

    goToMargin() {
        this.navCtrl.push(Margin);
    }

    showImage() {
        if (this.userRole == 'business') {
            this.notify.showGallery(this.userinfo['logo']);
        } else {
            this.notify.showGallery(this.userinfo['photo']);
        }

    }

}