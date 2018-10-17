import { Component } from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import {Recharge} from '../recharge/recharge';

@Component({
    selector: 'page-margin',
    templateUrl: 'margin.html'
})
export class Margin {

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

    goToRecharge() {
        this.navCtrl.push(Recharge);
    }

}