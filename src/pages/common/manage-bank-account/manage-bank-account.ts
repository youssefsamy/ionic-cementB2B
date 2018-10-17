/**
 * Created by KSS on 2017.11.13.
 */

import {Component} from "@angular/core";
import {NavController} from "ionic-angular";

@Component({
    templateUrl: 'manage-bank-account.html',
    selector: 'page-manage-bank-account'
})

export class ManageBankAccountPage {

    constructor(
        public navCtrl: NavController
    ) {

    }

    apply() {
        this.navCtrl.pop();
    }

}
