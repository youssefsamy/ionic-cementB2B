import { Component } from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import {PersonalBankPage} from "../personal-bank/personal-bank";
import {CompanyBankPage} from "../company-bank/comapny-bank";
import {SettingsService} from "../../../services/settings.service";
import {EditBankPage} from "../edit-bank/edit-bank";

@Component({
    selector: 'page-select-bank',
    templateUrl: 'select-bank.html'
})
export class SelectBankPage {

    info:any = {
        email: '',
        password: ''
    };

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public setting: SettingsService
    ) {

    }

    ionViewDidLoad() {

    }

    selectCompanyBank() {
        if (this.setting.isLogged) {
            this.navCtrl.push(CompanyBankPage)
        } else {
            this.navCtrl.push(EditBankPage, {type: 'C'});
        }
    }

    selectPersonalBank() {
        if (this.setting.isLogged) {
            this.navCtrl.push(PersonalBankPage)
        } else {
            this.navCtrl.push(EditBankPage, {type: 'P'});
        }
    }
}