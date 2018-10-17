import { Component } from '@angular/core';
import {Events, NavController} from 'ionic-angular';

@Component({
    selector: 'page-order-match',
    templateUrl: 'order-match.html'
})
export class OrderMatch {

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
