import {Component, NgZone} from '@angular/core';
import {App, Events, NavController, Platform} from 'ionic-angular';
import {RegisterHomePage} from "../register/home/register.home";
import {SupportMenusPage} from "../../support/menus/support.menus";
import {FactoryHomePage} from "../../factory/factory.home/factory.home";
import {ClientHomePage} from "../../client/client.home/client.home";
import {SettingsService} from "../../../services/settings.service";
import {ClientApiService} from "../../../services/client-api";
import {NotificationService} from "../../../services/notification.service";
import {ForgotPasswordPage} from "../forgot-password/forgot-password";

import {FileChooser} from "@ionic-native/file-chooser";
import {SoundsService} from "../../../services/sounds.service";
import {TrackService} from "../../../services/track.service";
import {DeviceService} from "../../../services/device.service";
import {RegisterCustomerFormPage} from "../register/customer-form/register.customer-form";
import {AppMinimize} from "@ionic-native/app-minimize";
import {AboutUsPage} from "../../common/aboutus/aboutus";
import {FreightPage} from "../../client/fright/freight";
import {ManageBankAccountPage} from "../../common/manage-bank-account/manage-bank-account";


@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

    info:any = {
        phone: '',
        password: ''
    };

    device_id: any;
    isMinimize = false;

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public setting: SettingsService,
        public api: ClientApiService,
        public notify: NotificationService,
        public filechooser: FileChooser,
        public track: TrackService,
        public device: DeviceService,
        public zone: NgZone,
        public platform: Platform,
        public appMinimize: AppMinimize,
        public app: App,
    ) {

    }

    ionViewDidLoad() {
        this.setting.isLogged = false;
        console.log('location');
        if (!this.setting.pushSetted) {
            this.device.connect();
        }
    }

    ionViewWillEnter() {
        console.log('login')
        this.api.setLocationByGPS();
        /*this.track.stopUploadUserLocation();*/
        this.track.finishTracking();
    }


    ///// User Login
    login() {


        console.log(this.info);
        if (!this.validate()) return;

        this.notify.showLoading();

        this.api.login(this.info.phone, this.info.password).subscribe(res => {


            this.notify.closeLoading();
            if (res.success) {

                this.addBackButtonFunction();

                console.log(res);

                this.setting.setLoggedInfo(res);      /// set user information from login.

                this.setting.setStorage('phonenumber', this.info.phone);
                this.setting.setStorage('password', this.info.password);
                this.setting.setStorage('loginTime', new Date().getTime());


                this.setting.user.token = res.token;
                this.setting.isLogged = true;

                this.track.startUploadUserLocation();    //////////start upload user location
                this.device.updatePushSetting();
                /*if (this.setting.getStorage('isServicing', 'no') == 'yes') {

                    this.track.isTrack = true;
                    this.track.startUploadTrack(this.setting.getStorage('entity_name'));
                }*/

                /*this.setCity(this.setting.longitude, this.setting.latitude);*/
                this.goToHomePage(res.role);

            } else {
                this.notify.showError(res.error);
            }

        }, err => {
            this.notify.showError(err);
            this.notify.closeLoading();
        })
    }

    addBackButtonFunction() {
        this.platform.registerBackButtonAction(() => {
            if (this.app.getActiveNav().getViews().length > 1) {
                this.app.getActiveNav().pop();
            } else if (this.app.getRootNav().getViews().length > 1) {
                this.app.getRootNav().pop();
            }
            else {
                if (this.isMinimize == true) {
                    this.appMinimize.minimize();
                } else {

                    this.isMinimize = true;
                    this.notify.showSuccess('再按一次退出');
                }

            }
        });

        document.addEventListener('resume', () => {
            this.isMinimize = false;
        });
    }

    ////  Go to Register Page
    goToRegister() {
        this.navCtrl.push(RegisterHomePage);
    }

    ///// Go to ResetPassword Page
    goToForgetPassword() {
        this.navCtrl.push(ForgotPasswordPage);
    }

    goToHomePage(role) {
        switch (role) {
            case 'customer':
                this.navCtrl.setRoot(ClientHomePage); break;
            case 'business':
                this.navCtrl.setRoot(FactoryHomePage); break;
            case 'servicer':
                this.navCtrl.setRoot(SupportMenusPage); break;

        }
    }

    validate() {
        if (this.info.phone == '' || this.info.password == '') {
            this.notify.showError('请正确地输入所有信息');
            return false;
        }
        return true;
    }

    getTrack() {
        this.track.getTrackResult('b2b_track_B_10', this.track.getCurrentTime() - 20000, this.track.getCurrentTime()).then(function(res) {
            console.log(res);
        })
    }

    stop() {
        this.navCtrl.push(ManageBankAccountPage);
    }

    changePhone() {
        console.log(this.setting.getStorage('phonenumber'));
        if (this.setting.getStorage('phonenumber') == this.info.phone && this.info.phone != '') {
            this.info.password = this.setting.getStorage('password', '');
        } else {
            this.info.password = '';
        }
    }
}
