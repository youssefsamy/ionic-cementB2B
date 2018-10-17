import {Component} from "@angular/core";
import {ClientApiService} from "../../../services/client-api";
import {NotificationService} from "../../../services/notification.service";

@Component({
    selector: 'page-advertise',
    templateUrl: 'advertise.html'
})

export class AdvertisePage {

    advertises = []

    constructor(public api: ClientApiService, public notify: NotificationService) {

    }

    ionViewDidLoad() {
        this.notify.showLoading();
        this.api.loadAdvertise().subscribe(res => {

            this.notify.closeLoading();
            this.advertises = res.data;
            console.log(res.data);

        })
    }

}