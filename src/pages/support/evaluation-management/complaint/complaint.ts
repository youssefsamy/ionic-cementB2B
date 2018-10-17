import { Component } from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import {ClientApiService} from "../../../../services/client-api";
import {SettingsService} from "../../../../services/settings.service";

@Component({
    selector: 'page-complaint',
    templateUrl: 'complaint.html'
})
export class Complaint {

    evaluations = [];
    userRole : string;

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public api: ClientApiService,
        public setting: SettingsService,
    ) {

        this.userRole = this.setting.userRole;
        console.log(this.userRole);

        this.api.getEvaluations(0, 3).subscribe(res => {
            console.log(res);
            this.evaluations = res.data;
        })
    }

    ionViewDidLoad() {

    }

}