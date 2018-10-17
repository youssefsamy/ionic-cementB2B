import {Component, OnInit} from "@angular/core";
import {ClientApiService} from "../../../services/client-api";
import {NotificationService} from "../../../services/notification.service";

@Component({
    selector: 'page-support-income-analytics',
    templateUrl: 'support-income-analytics.html'
})

export class SupportIncomeAnalyticsPage implements OnInit {

    state = 'today';
    datas = [];

    pay_amount: number;
    pending_amount: number;

    constructor(private api: ClientApiService,
                private notify: NotificationService) {

    }

    ionViewWillEnter() {
        this.changeState();
    }

    ngOnInit() {

    }

    changeState() {

        let to_date;
        let from_date;

        switch(this.state) {
            case 'today':
                to_date = this.api.getDate();
                from_date = this.api.getDate();
                break;
            case 'week':
                to_date = this.api.getDate();
                from_date = this.api.getDate(7);
                break;
            case 'month':
                to_date = this.api.getDate();
                from_date = this.api.getDate(30);
                break;
            case 'all':
                to_date = '';
                from_date = '';
                break;
        }

        this.api.getServicerIncome(from_date, to_date).subscribe(res => {
            if (res.success) {
                this.pay_amount = res.pay_amount;
                this.pending_amount = res.pending_amount;
            }
        })
    }
}