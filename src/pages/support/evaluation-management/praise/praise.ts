import { Component } from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import {ClientApiService} from "../../../../services/client-api";
import {SettingsService} from "../../../../services/settings.service";

@Component({
    selector: 'page-praise',
    templateUrl: 'praise.html'
})
export class Praise {

    evaluations = [];
    userRole : string;

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public api: ClientApiService,
        public setting: SettingsService
    ) {

        this.userRole = this.setting.userRole;

        this.api.getEvaluations(4, 5).subscribe(res => {
            console.log(res);
            this.evaluations = res.data;
        })
    }

    ionViewDidLoad() {

    }

}