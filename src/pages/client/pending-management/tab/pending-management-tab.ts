import {Component, OnInit, ViewChild} from '@angular/core';
import {Events, Navbar, NavController, NavParams} from 'ionic-angular';
import {MatchPage} from "../match/match";
import {EvaluationPage} from "../evaluation/evaluation";
import {ReceivePage} from "../receive/receive";


@Component({
    selector: 'page-pending-management-tab',
    templateUrl: 'pending-management-tab.html'
})

export class PendingManagementTabPage implements OnInit {

    @ViewChild(Navbar) navBar:Navbar;

    matchPage = MatchPage;
    receivePage = ReceivePage;
    evaluationPage = EvaluationPage;

    order = '';

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public params: NavParams
    ) {
        this.order = this.params.data;
        console.log(this.order);
    }


    ngOnInit() {
    }

    ionViewDidLoad() {

    }


    onPageWillEnter() {

    }

    ionViewWillEnter() {

    }

    ionViewDidEnter() {

    }

}
