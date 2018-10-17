import {Component} from '@angular/core';
import {Events, NavController, NavParams} from 'ionic-angular';
import {ClientApiService} from "../../../services/client-api";
import {NotificationService} from "../../../services/notification.service";


declare var $: any;
@Component({
    selector: 'page-view-order',
    templateUrl: 'view-order.html'
})

export class ViewOrderPage {

    state = 'M';
    info = '';

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public api: ClientApiService,
        public notify: NotificationService,
        public params: NavParams
    ) {

    }

    ionViewDidLoad() {
        console.log(this.params.data);
        this.state = this.params.data.kind.substr(0,1);
        console.log(this.state);
        this.loadOrderDetail(this.params.data);
    }

    loadOrderDetail(info) {
        this.api.loadOrderDetail(info.kind.substr(0,1), info.id).subscribe(res => {
            console.log(res);
            this.info = res;
        });
    }

}
