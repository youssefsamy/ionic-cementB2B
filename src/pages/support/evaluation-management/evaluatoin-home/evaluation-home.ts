import { Component } from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import {Complaint} from "../complaint/complaint";
import {Praise} from "../praise/praise";
import {ClientApiService} from "../../../../services/client-api";

@Component({
    selector: 'page-evaluation-home',
    templateUrl: 'evaluation-home.html'
})
export class EvaluationHome {

    goodCount: any;
    badCount: any;

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public api: ClientApiService
    ) {

    }

    ionViewDidLoad() {
        this.api.getFeedbackCount().subscribe(res => {
            this.goodCount = res.good_count;
            this.badCount = res.bad_count;
        })
    }

    goToComplaint() {
        this.navCtrl.push(Complaint);
    }

    goToPraise() {
        this.navCtrl.push(Praise);
    }

}