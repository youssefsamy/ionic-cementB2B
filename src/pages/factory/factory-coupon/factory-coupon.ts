import { Component } from '@angular/core';
import {Events, ModalController, NavController, NavParams} from 'ionic-angular';
import {NewCouponPage} from "../new-coupon/new-coupon";
import {ClientApiService} from "../../../services/client-api";
import {SettingsService} from "../../../services/settings.service";
import {NotificationService} from "../../../services/notification.service";

@Component({
    selector: 'page-factory-coupon',
    templateUrl: 'factory-coupon.html'
})
export class FactoryCouponPage {

    coupons = [];

    role = 'mine';

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public params: NavParams,
        public modalCtrl: ModalController,
        public api: ClientApiService,
        public settings: SettingsService,
        public notify: NotificationService
    ) {

        if (this.params.get('role')) this.role = this.params.get('role');
        this.loadCoupons()
    }

    ionViewDidLoad() {

    }


    newCoupon() {
        let modal = this.modalCtrl.create(NewCouponPage);
        modal.onDidDismiss(data => {
            if (data == 'success') this.loadCoupons();
        })
        modal.present();
    }

    loadCoupons() {

        if (this.role == 'mine') {
            this.api.getCoupons(this.settings.member_id).subscribe(res => {
                console.log(res);
                this.coupons = res.data
            })
        } else if (this.role == 'all') {
            this.api.getPremium().subscribe(res => {
                console.log(res.data);
                this.coupons = res.data
            })
        }


    }

    showImage(coupon) {
        this.notify.showGallery(coupon['photo']);
    }

}