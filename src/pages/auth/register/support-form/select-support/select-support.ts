import { Component } from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import {RegisterSupport} from "../register.support/register.support";
import {RegisterFactory} from "../register.factory/register.factory";

@Component({
    selector: 'page-register-select-support',
    templateUrl: 'select-support.html'
})
export class RegisterSelectSupportPage {

    info = {
        name: '',
        type: '',
        birthday: {
            year: '',
            month: '',
            day: '',
        },
        address: '',
        contact_number: '',


    }

    constructor(
        public navCtrl: NavController,
        public events: Events,
    ) {

    }

    ionViewDidLoad() {

    }

    selectSupport(param) {
        this.navCtrl.push(RegisterSupport, param);
    }

    selectFactory(param) {
        this.navCtrl.push(RegisterFactory, param);
    }

}
