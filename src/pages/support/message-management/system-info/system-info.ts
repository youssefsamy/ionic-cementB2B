import { Component } from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import {ClientApiService} from "../../../../services/client-api";
import {MessageDetailInfo} from "../detail-info/message-detail-info";
import {SettingsService} from "../../../../services/settings.service";

@Component({
    selector: 'page-system-info',
    templateUrl: 'system-info.html'
})
export class SystemInfo {

    notifications = [];
    result = '';

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public api: ClientApiService,
        public setting: SettingsService
    ) {

    }

    ionViewDidLoad() {
        this.setting.badge.notify = 0;
    }

    ionViewDidEnter() {

        this.setting.badge.notify = 0;
        this.getSystemNotification();
    }

    getSystemNotification() {
        this.api.getSystemNotification().subscribe(res => {
            console.log(res);
            this.notifications = res.data;
            if (this.notifications.length == 0) this.result = '暂时没有消息';
        })
    }

    goToDetailPage(index) {
        this.navCtrl.push(MessageDetailInfo, {notifications: this.notifications, index: index});
    }

}
