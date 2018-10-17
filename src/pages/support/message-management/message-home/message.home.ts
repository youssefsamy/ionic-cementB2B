import { Component } from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import {OrderMatch} from "../order-match/order-match";
import {SystemInfo} from "../system-info/system-info";

@Component({
    selector: 'page-message-home',
    templateUrl: 'message-home.html'
})
export class MessageHome {

    info:any = {
        email: '',
        password: ''
    };

    constructor(
        public navCtrl: NavController,
        public events: Events,
    ) {

    }

    ionViewDidLoad() {

    }

    goToOrderMatch() {
        this.navCtrl.push(OrderMatch);
    }

    goToSystemInfo() {
        this.navCtrl.push(SystemInfo);
    }
}