import { Component } from '@angular/core';
import {AlertController, App, Events, NavController} from 'ionic-angular';
import {SettingHome} from '../setting/setting.home';
import {UserInfo} from '../user-info/user-info';
import {FundManagementHomePage} from "../../../common/fund-management/home/fund-management-home";
import {ClientApiService} from "../../../../services/client-api";
import {NotificationService} from "../../../../services/notification.service";
import {SettingsService} from "../../../../services/settings.service";
import {FactoryCouponPage} from "../../../factory/factory-coupon/factory-coupon";
import {LoginPage} from "../../../auth/login/login";
import {AboutUsPage} from "../../../common/aboutus/aboutus";

@Component({
    selector: 'page-personal-center-home',
    templateUrl: 'personal-center-home.html'
})
export class PersonalCenterHome {

    name;

    user = '';
    isCloseAvailabe: any;


    myCoupon: any;

    balanceInfo : any =  {
        balance : 0,
        outmoney: 0
    };

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public api: ClientApiService,
        public notify: NotificationService,
        public setting: SettingsService,
        public alertCtrl: AlertController,
        public app: App,
    ) {

        this.api.getUserInfo().subscribe(res => {
            console.log(res.data);
            this.user = res.data;
        })

        this.name = this.setting.userName

        this.api.getBalance().subscribe(res => {
            this.balanceInfo.balance = res.balance;
            this.balanceInfo.outmoney = res.outmoney;
        }, err => {
            this.notify.showError(err);
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


    goToFundManagement() {
        this.navCtrl.push(FundManagementHomePage);
    }

    goToSettingHome() {
        this.navCtrl.push(SettingHome);
    }

    goToUserInfo() {
        this.navCtrl.push(UserInfo);
    }

    showImage(photo) {
        this.notify.showGallery(photo);
    }

    goToCouponPage() {
        this.navCtrl.push(FactoryCouponPage, {role: 'all'});
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

    goToAboutUsPage() {
        this.navCtrl.push(AboutUsPage);
    }
}