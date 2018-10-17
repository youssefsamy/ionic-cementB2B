import { Component } from '@angular/core';
import {Events, NavController} from 'ionic-angular';

@Component({
    selector: 'page-recharge',
    templateUrl: 'recharge.html'
})
export class Recharge {

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

}