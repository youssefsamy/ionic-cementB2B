import { Component } from '@angular/core';
import {AlertController, App, Events, NavController, Platform, ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/auth/login/login";
import {MobileAccessibility} from "@ionic-native/mobile-accessibility";
import {SoundsService} from "../services/sounds.service";
import {SettingsService} from "../services/settings.service";
import {BackgroundMode} from "@ionic-native/background-mode";
import {TrackService} from "../services/track.service";
import {DeviceService} from "../services/device.service";
import {ClientApiService} from "../services/client-api";
import {AppMinimize} from "@ionic-native/app-minimize";
import {ClientHomePage} from "../pages/client/client.home/client.home";
import {FactoryHomePage} from "../pages/factory/factory.home/factory.home";
import {SupportMenusPage} from "../pages/support/menus/support.menus";



@Component({
    templateUrl: 'app.html'
})
export class MyApp {

    rootPage:any;
    isMinimize = false;



    constructor(
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        mobileAccessibility: MobileAccessibility,
        public events: Events,
        public alertCtrl: AlertController,
        public soundsService: SoundsService,
        public setting: SettingsService,
        public backgroundMode: BackgroundMode,
        public toastCtrl: ToastController,
        public track: TrackService,
        public device: DeviceService,
        public api: ClientApiService,
        public appMinimize: AppMinimize,
        public app: App,
    ) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            mobileAccessibility.usePreferredTextZoom(false);
            statusBar.styleDefault();



            events.subscribe('logout', () => {
                /*this.nav.setRoot(LoginPage);*/
            });

            events.subscribe('present:confirm', (data) => {
                this.showConfirm(data);
            })

            events.subscribe('toast:presented', (alertData) => {
                this.showToast(alertData);
            });


            this.soundsService.preloadAllSound();

            if (document.URL.startsWith('http')) {
                this.setting.setStorage('platform', 'browser');
            } else {
                this.setting.setStorage('platform', platform.is('android') ? 'android' :
                    platform.is('ios') ? 'ios' :
                        'other');
            }

            this.device.init();

            this.verifyLogged();


            splashScreen.hide();

            this.backgroundMode.enable();
        });
    }

    verifyLogged() {

        var lastLogedTime = this.setting.getStorage('loginTime', 'no');

        if (lastLogedTime == 'no') {
            this.rootPage = LoginPage;
        } else {
            var diffDays = Math.ceil((new Date().getTime() - lastLogedTime)/(1000*3600*24));

            if (diffDays >= 7) {
                this.rootPage = LoginPage;
            } else {
                this.getLogin()
            }
        }
    }

    getLogin() {

        this.setting.isLogged = false;

        console.log('location');
        this.device.connect();

        this.api.setLocationByGPS();
        /*this.track.stopUploadUserLocation();*/
        this.track.finishTracking();

        var phone = this.setting.getStorage('phonenumber');
        var password = this.setting.getStorage('password');

        this.api.login(phone, password).subscribe(res => {
            if (res.success) {


                this.setting.setLoggedInfo(res);      /// set user information from login.

                this.addBackButtonFunction();
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
                this.rootPage = LoginPage;
            }

        }, err => {
            this.rootPage = LoginPage;
        })
    }

    addBackButtonFunction() {
        /*platform.registerBackButtonAction(() => {
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
        });*/
    }

    goToHomePage(role) {
        switch (role) {
            case 'customer':
                this.rootPage = ClientHomePage; break;
            case 'business':
                this.rootPage = FactoryHomePage; break;
            case 'servicer':
                this.rootPage = SupportMenusPage; break;

        }
    }

    showConfirm(data) {
        let confirm = this.alertCtrl.create({
            title: data[0],
            message: data[1]? data[1] : '',
            buttons: [
                {
                    text: 'Yes',
                    handler: data[2] ? data[2] : () => {}
                },
                {
                    text: 'No',
                    handler: data[3] ? data[3] : () => {}
                }
            ]
        });
        confirm.present();
    }

    showToast(data) {

        if (this.setting.getStorage('beepTone') == 'yes') this.soundsService.playWarningSound();

        if (typeof data == "string") {
            data = [data];
        }

        let toast = this.toastCtrl.create({
            position: 'top',
            message: data[0],
            duration: data[2] ? data[2] : 2000
        });
        toast.onDidDismiss(() => {
            console.log('dismiss');
            if (data[1]) data[1]();
        });
        toast.present();
    }
}
