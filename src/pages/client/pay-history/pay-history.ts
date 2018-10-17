import {Component, OnInit} from "@angular/core";
import {ClientApiService} from "../../../services/client-api";
import {NavController, NavParams} from "ionic-angular";
import {NotificationService} from "../../../services/notification.service";
import {SelectPayWayPage} from "../select-pay-way/select-pay-way";

@Component({
    selector: 'page-pay-history',
    templateUrl: 'pay-history.html'
})

export class PayHistoryPage implements OnInit{

    balance;
    order_id: any;
    order_kind: any;
    payList = [];
    total = 0;
    budget = 0;

    constructor(
        private api: ClientApiService,
        private params: NavParams,
        private navCtrl: NavController,
    ) {

    }

    ngOnInit() {
        this.api.getBalance().subscribe(res => {
            if (res.success) {
                this.balance = res.balance;
            }
        })

        if (this.params.get('order_id')) this.order_id = this.params.get('order_id');
        if (this.params.get('order_kind')) this.order_kind = this.params.get('order_kind');
        if (this.params.get('budget')) this.budget = this.params.get('budget')

        this.api.getPayList(this.order_id, this.order_kind).subscribe(res => {
            console.log(res);

            this.total = 0;
            if (res.data.length > 0) {

                this.payList = res.data;

                for(let i = 0; i < res.data.length; i ++) {
                    this.total += Number(res.data[i]['total']);
                }

            }
        })
    }

    pay() {
        let info = {
            description: '',
            order_id: this.order_id,
            order_kind: this.order_kind
        }

        this.navCtrl.push(SelectPayWayPage, {payInfo: info});
    }

    cancel() {

    }

}