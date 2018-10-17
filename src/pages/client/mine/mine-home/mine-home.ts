import { Component } from '@angular/core';
import {AlertController, App, Events, NavController} from 'ionic-angular';
import {SettingHome} from "../../../support/personal-center/setting/setting.home";
import {OrderStatusPage} from "../../order-status/order-status";
import {ClientApiService} from "../../../../services/client-api";
import {NotificationService} from "../../../../services/notification.service";
import {FundManagementHomePage} from "../../../common/fund-management/home/fund-management-home";
import {FactoryCouponPage} from "../../../factory/factory-coupon/factory-coupon";
import {DataAnalyticsPage} from "../../../common/data-analytics/data-analytics";
import {AdvertisePage} from "../../../common/advertise/advertise";
import {SettingsService} from "../../../../services/settings.service";
import {LoginPage} from "../../../auth/login/login";
import {UserInfo} from "../../../support/personal-center/user-info/user-info";
import {AboutUsPage} from "../../../common/aboutus/aboutus";


@Component({
    selector: 'page-mine-home',
    templateUrl: 'mine-home.html'
})
export class ClientCenterHomePage {


    user = '';
    isCloseAvailabe: any;

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public api: ClientApiService,
        public notify: NotificationService,
        public alertCtrl: AlertController,
        public setting: SettingsService,
        public app: App
    ) {
        this.api.getUserInfo().subscribe(res => {
            console.log(res.data);
            this.user = res.data;
        })
    }

    ionViewWillEnter() {
        this.api.closeAvailable().subscribe(res => {
            if (res.success) {
                if (res.possible) {
                    this.isCloseAvailabe = true;
                }
                else {
                    this.isCloseAvailabe = false;
                }
            }
        })
    }

    goToSettingPage() {
        this.navCtrl.push(SettingHome);
    }

    goToOrderStatus() {
        this.navCtrl.push(OrderStatusPage, {state: 'mortar'});
    }

    showImage(photo) {
        this.notify.showGallery(photo);
    }

    goToFundManagementHome() {
        this.navCtrl.push(FundManagementHomePage);
    }

    goToCouponPage() {
        this.navCtrl.push(FactoryCouponPage, {role: 'all'});
    }

    goToDataAnalyticsPage() {
        this.navCtrl.push(DataAnalyticsPage);
    }

    goToAdvertisePage() {
        this.navCtrl.push(AdvertisePage);
    }

    logout() {
        let alert = this.alertCtrl.create({
            title: '退出',
            message: '确定要退出吗?',
            cssClass: 'soundAlert',
            buttons: [
                {
                    text: '取  消',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: '确  定',
                    handler: () => {
                        this.setting.initUserSetting();
                        this.setting.isLogged = false;
                        this.setting.removeStorage('loginTime');
                        this.setting.removeStorage('phonenumber');
                        this.setting.removeStorage('password');
                        this.app.getRootNav().setRoot(LoginPage);
                    }
                },
            ]
        })
        alert.present()
    }

    delete() {
        let alert = this.alertCtrl.create({
            title: '退出',
            message: '确定要注销账户吗?',
            cssClass: 'soundAlert',
            buttons: [
                {
                    text: '取  消',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: '确  定',
                    handler: () => {
                        this.notify.showLoading();
                        this.api.closeUser().subscribe(res => {
                            this.notify.closeLoading()
                            if (res.success) {
                                this.notify.showSuccess('注销成功');
                                this.setting.initUserSetting();
                                this.setting.isLogged = false;
                                this.setting.removeStorage('loginTime');
                                this.setting.removeStorage('phonenumber');
                                this.setting.removeStorage('password');
                                this.app.getRootNav().setRoot(LoginPage);
                            }
                        })

                    }
                },
            ]
        })
        alert.present()
    }

    goToUserInfo() {
        this.navCtrl.push(UserInfo);
    }

    goToAboutUsPage() {
        this.navCtrl.push(AboutUsPage);
    }
}