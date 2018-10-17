import {Component} from "@angular/core";
import {ClientApiService} from "../../../services/client-api";
import {NotificationService} from "../../../services/notification.service";
import {NavController, NavParams} from "ionic-angular";
import {SettingsService} from "../../../services/settings.service";
import {PaySuccessPage} from "../../common/pay-success-page/pay-success";

@Component({
    selector: 'page-online-pay',
    templateUrl: 'online-pay-page.html'
})

export class OnlinePayPage {

    balance: any;
    amount: number;
    selected_type = 'online';

    payInfo: any;

    constructor(
        private api: ClientApiService,
        private notify: NotificationService,
        private navCtrl: NavController,
        private params: NavParams,
        private setting: SettingsService
    ) {
        this.api.getBalance().subscribe(res => {
            if (res.success) {
                this.balance = res.balance;
            }
        })
    }

    ionViewDidLoad() {
        if (this.params.get('payInfo')) this.payInfo = this.params.get('payInfo');
    }

    pay() {
        if (this.selected_type == 'online') {
            if (!this.validate()) return;
            this.payInfo['amount'] = this.amount;

            console.log('payType: ' + this.setting.payType);

            this.notify.showLoading();

            this.api.payOnline(this.payInfo).subscribe(res => {

                this.notify.closeLoading();
                if (res.success) {
                    if (this.setting.payType == 'normal_pay') {
                        this.navCtrl.push(PaySuccessPage);
                    } else {
                        this.api.pay(this.payInfo['order_kind'], this.payInfo['order_id']).subscribe(res => {
                            if (res.success == true) {
                                this.navCtrl.push(PaySuccessPage);
                            } else {
                                this.notify.showError(res.error);
                            }
                        })
                    }

                } else {
                    this.notify.showError(res.error);
                }
            });
        }

    }

    selectType(type) {
        this.selected_type = type;
    }

    validate() {

        if (this.amount == 0) {
            this.notify.showError('请输入金额'); return false;
        } else if(this.amount > Number(this.balance)) {
            this.notify.showError("支付金额超过余额"); return false;
        }

        return true;

    }
}