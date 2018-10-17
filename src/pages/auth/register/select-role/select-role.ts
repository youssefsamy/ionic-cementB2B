import { Component } from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import {RegisterCustomerFormPage} from "../customer-form/register.customer-form";
import {RegisterSelectSupportPage} from "../support-form/select-support/select-support";
import {SettingsService} from "../../../../services/settings.service";
import {ClientApiService} from "../../../../services/client-api";

@Component({
    selector: 'page-register-select-role',
    templateUrl: 'select-role.html'
})
export class RegisterSelectRolePage {

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public setting: SettingsService,
        public api: ClientApiService
    ) {

    }

    ionViewDidLoad() {

    }

    selectCustomer() {
        this.navCtrl.push(RegisterCustomerFormPage);
    }

    selectSupport() {
        this.navCtrl.push(RegisterSelectSupportPage);
    }
}
