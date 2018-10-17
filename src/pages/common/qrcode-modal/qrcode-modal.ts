import { Component } from '@angular/core';
import {Events, NavController, NavParams, ViewController} from 'ionic-angular';

declare  var $: any;
@Component({
    selector: 'page-qrcode-modal',
    templateUrl: 'qrcode-modal.html'
})
export class QrcodeModalPage {

    qrCode = '';

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public viewCtrl: ViewController,
        public params: NavParams
    ) {
        this.qrCode = this.params.get('qrCode');
        console.log(this.qrCode);
    }

    ionViewDidLoad() {
        var _this = this;
        $('ion-content.qrmodal-content').click(function(e) {
            if (e.target.nodeName != 'IMG') _this.viewCtrl.dismiss();
        })
    }

    dismiss(state) {
        this.viewCtrl.dismiss(state);
    }

}