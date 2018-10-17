import {Component, OnInit} from "@angular/core";
import {ClientApiService} from "../../../services/client-api";
import {NotificationService} from "../../../services/notification.service";

@Component({
    selector: 'page-support-order-analytics',
    templateUrl: 'support-order-analytics.html'
})

export class SupportOrderAnalyticsPage implements OnInit {

    state = 'today';
    datas = [];

    allocation_count: number;
    servicing_count: number;
    complete_count: number;

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
            case 'month':
                to_date = this.api.getDate();
                from_date = this.api.getDate(30);
                break;
            case 'all':
                to_date = '';
                from_date = '';
                break;
        }

        this.api.getServicerData(from_date, to_date).subscribe(res => {
            if (res.success) {
                this.allocation_count = res.allocation_count;
                this.servicing_count = res.servicing_count;
                this.complete_count = res.complete_count
            }
        })
    }
}