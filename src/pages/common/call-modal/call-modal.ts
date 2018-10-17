import { Component } from '@angular/core';
import {Events, NavController, ViewController} from 'ionic-angular';


@Component({
    selector: 'page-call-modal',
    templateUrl: 'call-modal.html'
})
export class CallModalPage {

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public viewCtrl: ViewController,
    ) {

    }

    ionViewDidLoad() {

    }

    dismiss(state) {
        this.viewCtrl.dismiss(state);
    }



}
