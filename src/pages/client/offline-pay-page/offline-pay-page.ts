import {Component, OnInit} from "@angular/core";
import {ClientApiService} from "../../../services/client-api";
import {NotificationService} from "../../../services/notification.service";
import {NavController, NavParams} from "ionic-angular";
import {SettingsService} from "../../../services/settings.service";
import {PaySuccessPage} from "../../common/pay-success-page/pay-success";

@Component({
    selector: 'page-offline-pay',
    templateUrl: 'offline-pay-page.html'
})

export class OfflinePayPage implements OnInit{

    banks = [];
    selected_index: number;
    amount: '';

    payInfo: any;

    constructor(
        private api: ClientApiService,
        private notify: NotificationService,
        private params: NavParams,
        private navCtrl: NavController,
        private setting: SettingsService
    ) {

    }

    ionViewDidLoad() {
        if (this.params.get('payInfo')) this.payInfo = this.params.get('payInfo');
    }

    ngOnInit() {
        this.notify.showLoading();
        this.api.getBank().subscribe(res => {
            this.notify.closeLoading();
            console.log(res.data);
            this.banks = res.data;
            if (this.banks.length > 0) {
                this.selected_index = 0;
            }
        }, err => {this.notify.closeLoading(); this.notify.showError(err)});
    }


    select(index) {
        this.selected_index = index;
    }

    pay() {
        if (this.amount == '' || this.amount == 0) {
            this.notify.showError('请输入金额');
            return;
        } else if(this.banks.length == 0) {
            this.notify.showError('请咨询管理员银行账户信息');
            return;
        }
        this.payInfo['amount'] = this.amount;
        this.payInfo['bank'] = this.banks[this.selected_index]['id'];

        console.log('payType: ' + this.setting.payType);

        this.notify.showLoading();

        this.api.payOffline(this.payInfo).subscribe(res => {

            if (res.success) {

                if (this.setting.payType == 'normal_pay') {
                    this.notify.closeLoading();
                    this.navCtrl.push(PaySuccessPage);
                } else {
                    this.api.pay(this.payInfo['order_kind'], this.payInfo['order_id']).subscribe(res => {
                        this.notify.closeLoading();
                        if (res.success == true) {
                            this.navCtrl.push(PaySuccessPage);
                        } else {
                            this.notify.showError(res.error);
                        }
                    })
                }
            } else {
                this.notify.closeLoading();
                this.notify.showError(res.error);
            }
        });
    }

}