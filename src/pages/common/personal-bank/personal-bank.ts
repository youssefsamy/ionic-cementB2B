import { Component } from '@angular/core';
import {Events, NavController, NavParams} from 'ionic-angular';
import {UserInfo} from "../../support/personal-center/user-info/user-info";


@Component({
    selector: 'page-personal-bank',
    templateUrl: 'personal-bank.html'
})
export class PersonalBankPage {

    userinfo = ''

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public params: NavParams
    ) {

    }

    ionViewDidLoad() {
        this.userinfo = this.params.get('info');
        console.log(this.userinfo)
    }

    goBack() {
        this.navCtrl.push(UserInfo);
    }

}