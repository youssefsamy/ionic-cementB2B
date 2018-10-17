import { Component } from '@angular/core';
import {Events, ModalController, NavController, NavParams} from 'ionic-angular';
import {FactoryLocationMap} from "../factory-location-map/factory-location-map";
import {ClientApiService} from "../../../services/client-api";
import {NotificationService} from "../../../services/notification.service";


@Component({
    selector: 'page-factory-detail',
    templateUrl: 'factory-detail.html'
})
export class FactoryDetailPage {
    rate: number = 4.3;

    business = '';
    coupons = [];

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public modalCtrl: ModalController,
        public params: NavParams,
        public api: ClientApiService,
        public notify: NotificationService
    ) {
        this.business = this.params.get('business');
        this.loadCoupons();
    }

    ionViewDidLoad() {

    }

    viewMap() {
        var modal = this.modalCtrl.create(FactoryLocationMap, {business: this.business});
        modal.present();
    }

    loadCoupons() {
        this.api.getCoupons(this.business['id']).subscribe(res => {
            this.coupons = res.data;
        })
    }

    showImage(coupon) {
        this.notify.showGallery(coupon['photo']);
    }

}