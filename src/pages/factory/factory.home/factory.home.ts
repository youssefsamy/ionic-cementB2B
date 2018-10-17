import { Component } from '@angular/core';
import {Events, MenuController, NavController} from 'ionic-angular';
import {SearchFactoryPage} from "../search-factory/searcg-factory";
import {FactoryOrderManagementTabPage} from "../factory-order-management/tab/factory-order-management-tab";
import {ClientApiService} from "../../../services/client-api";
import {FactoryDetailPage} from "../factory-detail/factory-detail";
import {FactoryCenterHomePage} from "../mine/mine-home/mine-home";
import {FundManagementHomePage} from "../../common/fund-management/home/fund-management-home";
import {NotificationService} from "../../../services/notification.service";
import {FactoryCouponPage} from "../factory-coupon/factory-coupon";
import {SettingsService} from "../../../services/settings.service";
import {SystemInfo} from "../../support/message-management/system-info/system-info";
import {SelectTrackPage} from "../../common/select-track/select-track";

@Component({
    selector: 'page-factory-home',
    templateUrl: 'factory.home.html'
})
export class FactoryHomePage {

    state: string = 'order';
    user = '';

    balanceInfo : any =  {
        balance : 0,
        outmoney: 0
    };

    coupons = [];

    city: any;

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public notify:NotificationService,
        public api: ClientApiService,
        public settings: SettingsService
    ) {
        this.city = this.settings.city;
    }

    ionViewWillEnter() {
        this.api.getUserInfo().subscribe(res => {
            console.log(res.data);
            this.user = res.data;
        })

        this.api.getBalance().subscribe(res => {
            this.balanceInfo.balance = res.balance;
            this.balanceInfo.outmoney = res.outmoney;
        }, err => {
            this.notify.showError(err);
        })

        this.loadCoupons();
    }

    goToOrderManagePage(page) {
        this.navCtrl.push(FactoryOrderManagementTabPage, page);
    }

    goToSearchFactoryPage() {
        this.navCtrl.push(SearchFactoryPage);
    }

    goToFactoryDetailPage(index) {
        this.navCtrl.push(FactoryDetailPage, {business: this.user});
    }

    goToFactoryCenterHomePage() {
        this.navCtrl.push(FactoryCenterHomePage, {user: this.user});
    }

    goToFundManagementHome() {
        this.navCtrl.push(FundManagementHomePage);
    }


    goToFactoryCouponPage() {
        this.navCtrl.push(FactoryCouponPage);
    }

    loadCoupons() {
        this.api.getCoupons(this.settings.member_id).subscribe(res => {
            console.log(res);
            this.coupons = res.data
        })
    }

    showImage(coupon) {
        this.notify.showGallery(coupon['photo']);
    }

    goToMessageHomePage() {
        this.navCtrl.push(SystemInfo);
    }

    goToTrack() {
        this.navCtrl.push(SelectTrackPage);
    }
}