import { Component } from '@angular/core';
import {Events, NavController, NavParams} from 'ionic-angular';


@Component({
    selector: 'page-company-bank',
    templateUrl: 'company-bank.html'
})
export class CompanyBankPage {

    userinfo = ''

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public params: NavParams
    ) {

    }

    ionViewDidLoad() {
        this.userinfo = this.params.get('info')
        console.log(this.userinfo)
    }
}
