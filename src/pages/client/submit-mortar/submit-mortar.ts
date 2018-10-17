import {Component} from '@angular/core';
import {Events, ModalController, NavController} from 'ionic-angular';
import {ClientApiService} from "../../../services/client-api";
import {NotificationService} from "../../../services/notification.service";
import {OrderStatusPage} from "../order-status/order-status";
import {MapDialog} from "../../common/MapDialog/mapdialog";


declare var $: any;
@Component({
    selector: 'page-submit-mortar',
    templateUrl: 'submit-mortar.html'
})

export class SubmitMortarPage {

    mortarKind: any;
    mortarType: any;
    mortarRate: any;
    mortarUse: any;

    info = {
        selected_mortarKind: '',
        selected_mortarRate: '',
        selected_mortarType: '',
        selected_mortarUse: '',
        amount: '',
        budget: '',
        contact_number: '',
        address: '',
        latitude: '',
        longitude: '',
        note: ''
    }

    constructor(public navCtrl: NavController,
                public events: Events,
                public api: ClientApiService,
                public notify: NotificationService,
                public modalCtrl: ModalController
    ) {

    }

    ionViewDidLoad() {
        this.loadMortartInfo();
    }

    loadMortartInfo() {

        this.api.loadMortarKind().subscribe(res => {
            this.mortarKind = res.data;
            if (res.data.length > 0)
                this.info.selected_mortarKind = res.data[0].id;
            console.log(res.data);
        }, err => {
            this.notify.showError(err);
        });

        this.api.loadMortartRate().subscribe(res => {
            this.mortarRate = res.data;
            if (res.data.length > 0)
                /*this.info.selected_mortarRate = res.data[0].id;*/
            console.log(res.data);
        }, err => {
            this.notify.showError(err);
        });

        this.api.loadMortarType().subscribe(res => {
            this.mortarType = res.data;
            if (res.data.length > 0)
                this.info.selected_mortarType = res.data[0].id;
            console.log(res.data);
        }, err => {
            this.notify.showError(err);
        });

        this.api.loadMortarUse().subscribe(res => {
            this.mortarUse = res.data;
            if (res.data.length > 0)
                this.info.selected_mortarUse = res.data[0].id;
            console.log(res.data);
        }, err => {
            this.notify.showError(err);
        });

    }

    submitMortar() {

        if (!this.validate()) {
            this.notify.showError('请正确地输入所有信息');
            return;
        }

        this.notify.showLoading();

        this.api.submitMortar(this.info).subscribe(res => {

            this.notify.closeLoading()
            console.log(res);
            if (res.success) {
                this.notify.showSuccess("成功");
                this.navCtrl.push(OrderStatusPage, {state: 'mortar'});
            } else {
                this.notify.showError(res.error);
            }
        })
    }

    cancel() {
        this.navCtrl.push(OrderStatusPage, {state: 'mortar'});
    }

    updateAddress(characterNum) {
        console.log('sdfds');
        let modal = this.modalCtrl.create(MapDialog, characterNum);
        modal.onDidDismiss(data => {
            this.info.address = data.address;
            this.info.latitude = data.latitude;
            this.info.longitude = data.longitude;
        });

        modal.present();
    }

    validate() {

        if (
            this.info.contact_number == '' ||
            this.info.amount == '' ||
            this.info.budget == '' ||
            this.info.address == ''
        ) {
            return false;
        }

        return true;
    }
}