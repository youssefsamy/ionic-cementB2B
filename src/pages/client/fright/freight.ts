/**
 * Created by KSS on 2017.11.09.
 */

import {Component} from "@angular/core";
import {NavController, NavParams, ViewController} from "ionic-angular";
import {ClientApiService} from "../../../services/client-api";
import {NotificationService} from "../../../services/notification.service";

@Component({
    templateUrl: 'freight.html',
    selector: 'page-freight'
})
export class FreightPage {

    order_id;
    enablePrev = false;
    enableNext = false;
    currentIndex = 0;
    contentList = [];

    result = '';

    constructor(
        private navCtrl: NavController,
        private api: ClientApiService,
        private param : NavParams,
        private viewCtrl: ViewController,
        private notify: NotificationService
    ) {
        this.order_id = this.param.get('order_id')
        this.getFreight();
    }

    close() {
        this.viewCtrl.dismiss();
    }

    confirm() {
        this.notify.showLoading();

        this.api.confirmFreight(this.order_id).subscribe(res => {

            this.notify.closeLoading();

            if (res.success) {
                this.notify.showSuccess('确认成功');
                this.navCtrl.pop();
            } else {
                this.notify.showError(res.msg);
                this.navCtrl.pop();
            }

        }, err => {
            this.notify.closeLoading();
            this.notify.showError(err);
        })
    }

    getFreight() {
        this.notify.showLoading();

        this.api.getFreight(this.order_id).subscribe(res => {

            this.notify.closeLoading()
            this.contentList = res.data;
            this.contentList.length == 0? this.result = '暂时没有订单': this.result = '';
            this.updateEnable();


        }, err => {
            this.notify.closeLoading();
            this.notify.showError(err);
        })
    }

    updateEnable() {
        if (this.currentIndex == 0) {
            this.enablePrev = false
        } else {
            this.enablePrev = true
        }

        if (this.currentIndex == this.contentList.length - 1) {
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
