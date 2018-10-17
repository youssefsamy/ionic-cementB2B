import {Component} from '@angular/core';
import {App, Events, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {DatePipe} from "@angular/common";
import {MapDialog} from "../../common/MapDialog/mapdialog";
import {ClientApiService} from "../../../services/client-api";
import {NotificationService} from "../../../services/notification.service";

declare var $: any;
@Component({
    selector: 'page-order-demand',
    templateUrl: 'order-demand.html'
})

export class OrderDemandPage {

    monthnames = ['01','02','03','04','05','06','07','08','09','10','11','12'];

    order = {
        id: '',
        order_kind: '',
        order_no: '',
        contract_no: '',
        delivery_amount: '',
        delivery_date: '',
        contact_number: '',
        address: '',
        latitude: '',
        longitude: ''
    };

    date = '';
    order_date;
    pareantPage: any;

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public params: NavParams,
        public datepipe: DatePipe,
        public modalCtrl: ModalController,
        public api: ClientApiService,
        public notify: NotificationService,
        private app: App,
        public viewCtrl: ViewController
    ) {

        console.log(this.params.data);
        let order = this.params.get('order');
        console.log(order);

        this.order.id = order.id;
        this.order.order_kind = order.order_kind;
        this.order.order_no = order.order_no;
        this.order.contract_no = order.contract_no;
        this.order.contact_number = order.contact_number;

        var pDate=new Date(this.params.data.order.order_date);
        this.order_date = this.datepipe.transform(pDate, 'yyyy-MM-dd');

        console.log(order);
    }

    ionViewDidLoad() {

    }


    triggerDatePicker() {
        console.log(this.date);
        $('#date_time').trigger('click');
    }

    updateAddress(characterNum) {
        let modal = this.modalCtrl.create(MapDialog, characterNum);
        modal.onDidDismiss(data => {
            console.log(data);
            this.order['address'] = data.address;
            this.order['latitude'] = data.latitude;
            this.order['longitude'] = data.longitude;
        });

        modal.present();
    }

    demandOrder() {

        if (!this.validate()) {
            this.notify.showError('请正确地输入所有信息');
            return;
        }

        this.notify.showLoading()

        this.api.demandOrder(this.order).subscribe(res => {

            this.notify.closeLoading();
            console.log(res);
            if (res.success) {
                this.notify.showSuccess('成功');
                this.viewCtrl.dismiss('success');
            } else {
                this.notify.showError(res.error);
            }
        }, err => {

            this.notify.closeLoading();
            this.notify.showError(err);
        })
    }

    validate() {

        if (
            this.order['delivery_date'] == '' ||
            this.order['delivery_amount'] == '' ||
            this.order['address'] == ''

        ) {
            return false;
        }

        return true;
    }

    cancel() {
        this.viewCtrl.dismiss();
    }
}