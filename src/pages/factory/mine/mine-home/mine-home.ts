import { Component } from '@angular/core';
import {AlertController, App, Events, NavController, NavParams} from 'ionic-angular';
import {SettingHome} from "../../../support/personal-center/setting/setting.home";
import {NotificationService} from "../../../../services/notification.service";
import {AdvertisePage} from "../../../common/advertise/advertise";
import {FundManagementHomePage} from "../../../common/fund-management/home/fund-management-home";
import {DataAnalyticsPage} from "../../../common/data-analytics/data-analytics";
import {FactoryCouponPage} from "../../factory-coupon/factory-coupon";
import {LoginPage} from "../../../auth/login/login";
import {SettingsService} from "../../../../services/settings.service";
import {ClientApiService} from "../../../../services/client-api";
import {EvaluationHome} from "../../../support/evaluation-management/evaluatoin-home/evaluation-home";
import {UserInfo} from "../../../support/personal-center/user-info/user-info";
import {AboutUsPage} from "../../../common/aboutus/aboutus";

@Component({
    selector: 'page-factory-mine-home',
    templateUrl: 'mine-home.html'
})
export class FactoryCenterHomePage {

    info = '';
    isCloseAvailabe: any;

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public params: NavParams,
        public notify: NotificationService,
        public setting: SettingsService,
        public api: ClientApiService,
        public app: App,
        public alertCtrl: AlertController
    ) {
        console.log(this.params.get('user'));
        this.info = this.params.get('user');
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


    showImage(photo) {
        this.notify.showGallery(photo);
    }

    goToAdvertisePage() {
        this.navCtrl.push(AdvertisePage);
    }


    goToFundManagementHome() {
        this.navCtrl.push(FundManagementHomePage);
    }

    goToDataAnalyticsPage() {
        this.navCtrl.push(DataAnalyticsPage);
    }

    goToCouponPage() {
        this.navCtrl.push(FactoryCouponPage);
    }

    goToSettingPage() {
        this.navCtrl.push(SettingHome);
    }

    goToEvaluationPage() {
        this.navCtrl.push(EvaluationHome);
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

                        this.api.closeUser().subscribe(res => {
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