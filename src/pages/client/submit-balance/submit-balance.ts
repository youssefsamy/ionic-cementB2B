import {Component} from '@angular/core';
import {Events, ModalController, NavController} from 'ionic-angular';
import {ClientApiService} from "../../../services/client-api";
import {NotificationService} from "../../../services/notification.service";
import {OrderStatusPage} from "../order-status/order-status";
import {MapDialog} from "../../common/MapDialog/mapdialog";

@Component({
    selector: 'page-submit-balance',
    templateUrl: 'submit-balance.html'
})

export class SubmitBalancePage {

    balanceKind: any;
    balanceType: any;
    balanceSubType: any;
    balanceConfig: any;

    myDeliveryOrders = [];
    selectedOrderIndex = 0;

    info = {
        amount: '',
        budget: '',
        contact_number: '',
        note: '',
        order_kind: 'I',
        selected_balanceKind: '',
        selected_balanceType: '',
        selected_balanceSubType: '',
        selected_balanceConfig: '',
        address: '',
        latitude: '',
        longitude: ''
    }

    orderInfo = {
        selected_balanceKind: '',
        selected_balanceType: '',
        selected_balanceSubType: '',
        selected_balanceConfig: '',
    }

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public api: ClientApiService,
        public notify: NotificationService,
        public modalCtrl: ModalController,
    ) {
        this.api.loadMyDelaveryOrders().subscribe(res => {
            console.log(res.data);
            this.myDeliveryOrders = res.data;
            if (this.myDeliveryOrders.length > 0) {
                let NewOrder = {
                    contract_no: 'new Order',
                }
                this.myDeliveryOrders.unshift(NewOrder);
                console.log(this.myDeliveryOrders);
            }
        })
    }

    ionViewDidLoad() {
        this.loadBalanceInfo();
    }

    loadBalanceInfo() {
        this.api.loadBalanceKind().subscribe(res => {
            this.balanceKind = res.data;
            if (res.data.length > 0)
                this.info.selected_balanceKind = res.data[0].id;
            console.log(res.data);
        }, err => {
            this.notify.showError(err);
        });

        this.api.loadBalanceType().subscribe(res => {
            this.balanceType = res.data;
            if (res.data.length > 0)
                this.info.selected_balanceType = res.data[0].id;
            console.log(res.data);
        }, err => {
            this.notify.showError(err);
        });

        this.api.loadBalanceSubType().subscribe(res => {
            this.balanceSubType = res.data;
            if (res.data.length > 0)
                this.info.selected_balanceSubType = res.data[0].id;
            console.log(res.data);
        }, err => {
            this.notify.showError(err);
        });
    }



    submitBalance() {

        if (!this.validate()) {
            this.notify.showError('请正确地输入所有信息');
            return;
        }

        if (this.selectedOrderIndex != 0  && this.info.order_kind == 'R') {
            this.info.selected_balanceKind = this.orderInfo['balance_kind'];
            this.info.selected_balanceType = this.orderInfo['balance_type'];
            this.info.selected_balanceSubType = this.orderInfo['balance_subtype'];
            this.info.selected_balanceConfig = this.orderInfo['balance_config'];
        }

        this.api.submitBalance(this.info).subscribe(res => {
            console.log(res);
            if (res.success) {
                this.notify.showSuccess("成功");
                this.navCtrl.push(OrderStatusPage, {state: 'balance'});
            } else {
                this.notify.showError(res.error);
            }
        })
    }

    cancel() {
        this.navCtrl.push(OrderStatusPage, {state: 'balance'});
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

    changeKind(kind) {
        console.log(kind);
    }

    reloadConfig() {

        if (this.info.selected_balanceType != '' && this.info.selected_balanceKind != '' && this.info.selected_balanceSubType != '') {

            this.notify.showLoading();

            this.api.loadBalanceConfig(this.info.selected_balanceKind, this.info.selected_balanceType, this.info.selected_balanceSubType)
                .subscribe(res => {
                    this.notify.closeLoading();
                    this.balanceConfig = res.data;
                    if (this.balanceConfig.length > 0) {
                        this.info.selected_balanceConfig = this.balanceConfig[0].id;    
                    } else {
                        this.info.selected_balanceConfig = '';
                    }
                    
                })

        }
    }

    selectOrder(index) {
        if (index != 0) {
            this.api.loadOrderDetail('B', this.myDeliveryOrders[index]['id']).subscribe(res => {
                console.log(res);
                this.orderInfo = res;
            });
        }
    }
}