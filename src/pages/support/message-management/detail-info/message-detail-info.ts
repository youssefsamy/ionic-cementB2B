import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";

@Component({
    templateUrl: 'message-detail-info.html',
    selector: 'page-message-detail-info'
})

export class MessageDetailInfo {

    enablePrev: boolean;
    enableNext: boolean;
    currentIndex: number;
    notifications = [];
    size: number;

    constructor(
        private navParams: NavParams,
    ) {
        this.notifications = this.navParams.get('notifications');
        this.currentIndex = this.navParams.get('index');
        this.size = this.notifications.length;
        this.updateEnable();
    }

    ionViewDidLoad() {

    }

    updateEnable() {
        if (this.currentIndex == 0) {
            this.enablePrev = false
        } else {
            this.enablePrev = true
        }

        if (this.currentIndex == this.size - 1) {
            this.enableNext = false;
        } else {
            this.enableNext = true;
        }
    }

    next() {
        if (this.enableNext) {
            this.currentIndex ++;
            this.updateEnable();
        }
    }

    prev() {
        if (this.enablePrev) {
            this.currentIndex--
            this.updateEnable();
        }
    }
}