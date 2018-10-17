import { Injectable } from '@angular/core';
import {AlertController, ToastController, ModalController, Toast, LoadingController, Loading} from "ionic-angular";
import {SoundsService} from "./sounds.service";
import {SettingsService} from "./settings.service";
import {GalleryModal} from "ionic-gallery-modal";
import {CallNumber} from "@ionic-native/call-number";

@Injectable()
export class NotificationService {

    toast: Toast = null;
    loading: Loading = null;

    constructor(
        public alertCtrl: AlertController,
        public toastCtrl: ToastController,
        public soundService: SoundsService,
        public setting: SettingsService,
        public modalCtrl: ModalController,
        public loadingCtrl: LoadingController,
        public callNumber: CallNumber
    ) {

    }

    notice(data) {
        alert(data);
    }

    showSuccess(data, duration?) {

        this.toast ? this.toast.dismiss() : false;
        this.toast = this.toastCtrl.create({
            message: data,
            duration: duration? duration: 2000,
            position: 'top'
        })
        this.toast.present();
    }

    showError(data, duration?) {

        if (this.setting.getStorage('beepTone') == 'yes') this.soundService.playWarningSound();

        this.toast ? this.toast.dismiss() : false;
        this.toast = this.toastCtrl.create({
            message: data,
            duration: duration? duration: 2000,
            position: 'top'
        })
        this.toast.present();
    }

    validateError(data, duration = 2000) {

        this.toast ? this.toast.dismiss() : false;
        this.toast = this.toastCtrl.create({
            message: data,
            duration: duration,
            position: 'top'
        })
        this.toast.present();
    }

    showMarkerInfo(info, handler) {
        let confirm = this.alertCtrl.create({
            title: info['name'],
            message: '评分: ' + (info[''] ? info[''] : '0:00'),
            cssClass: 'markerAlert',
            buttons: [
                {
                    text: '取  消',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: '详  情',
                    handler: handler
                }
            ]
        });
        confirm.present();
    }

    showLoading() {
        this.loading ? this.loading.dismiss() : false;
        this.loading = this.loadingCtrl.create({
            duration: 30000,
            dismissOnPageChange: true,
        });
        this.loading.present();
    }

    closeLoading() {
        if (this.loading) this.loading.dismiss();
    }



    showGallery(url) {
        let photos = [{url: url}];

        let modal = this.modalCtrl.create(GalleryModal, {
            photos: photos,
            initialSlide: 0
        });
        modal.present();

    }

    phoneCall(number) {

        this.callNumber.callNumber(number, true)
            .then(() => {})
            .catch(() => {});

    }


}