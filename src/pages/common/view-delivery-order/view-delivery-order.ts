import {Component} from '@angular/core';
import {Events, NavController, NavParams} from 'ionic-angular';
import {ClientApiService} from "../../../services/client-api";
import {NotificationService} from "../../../services/notification.service";
import {SettingsService} from "../../../services/settings.service";


declare var $: any;
@Component({
    selector: 'page-view-delivery-order',
    templateUrl: 'view-delivery-order.html'
})

export class ViewDeliveryOrderPage {

    state = 'M';
    info = {
        address: ''
    };
    userRole = '';

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public api: ClientApiService,
        public notify: NotificationService,
        public params: NavParams,
        public setting: SettingsService
    ) {
        this.userRole = this.setting.userRole;
    }

    ionViewDidLoad() {
        console.log(this.params.data);
        this.info = this.params.get('order');
        console.log(this.info);
        this.state = this.info['order_kind'];
    }
}