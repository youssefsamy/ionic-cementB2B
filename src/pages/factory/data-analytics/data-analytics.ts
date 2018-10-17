import {Component, OnInit} from "@angular/core";
import {ClientApiService} from "../../../services/client-api";
import {NotificationService} from "../../../services/notification.service";

@Component({
    selector: 'page-factory-data-analytics',
    templateUrl: 'data-analytics.html'
})

export class FactoryDataAnalyticsPage implements OnInit {

    state = 'today';
    datas = [];

    income_money: number;
    order_count: number;

    constructor(private api: ClientApiService,
                private notify: NotificationService) {

    }

    ionViewWillEnter() {
        this.changeState();
        console.log('sdfsd');
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
            case 'all':
                to_date = '';
                from_date = '';
                break;
        }

        this.api.getBusinessData(from_date, to_date).subscribe(res => {
            if (res.success) {
                this.income_money = res.income_money;
                this.order_count = res.order_count;
            }
        })
    }
}
