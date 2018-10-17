import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {Events, Navbar, NavController, NavParams, Tabs} from 'ionic-angular';

import {CompletePage} from "../complete/complete";
import {ConfirmPage} from "../confirm/confirm";
import {PendingPage} from "../pending/pending";
import {PayPage} from "../pay/pay";
import {SettingsService} from "../../../../services/settings.service";
import {DeviceService} from "../../../../services/device.service";
import {NotificationService} from "../../../../services/notification.service";

@Component({
    selector: 'page-client-order-management-tab',
    templateUrl: 'client-order-management-tab.html'
})

export class ClientOrderManagementTabPage implements OnInit {

    @ViewChild(Navbar) navBar:Navbar;
    @ViewChild('myTabs') tabRef: Tabs;

    completePage = CompletePage;
    payPage = PayPage;
    confirmPage = ConfirmPage;
    pendingPage = PendingPage;

    tabIndex: number;

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public params: NavParams,
        public setting: SettingsService,
        public message: DeviceService,
        public zone: NgZone,
        public notify: NotificationService
    ) {
        console.log(this.params.data);
        this.tabIndex = this.params.get('tabIndex')? this.params.get('tabIndex') : 0;
    }


    ngOnInit() {

    }

    ionViewDidLoad() {

    }

    ionViewDidEnter() {

    }
}
