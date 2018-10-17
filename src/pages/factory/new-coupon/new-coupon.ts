import {Component} from "@angular/core";
import {ClientApiService} from "../../../services/client-api";
import {NotificationService} from "../../../services/notification.service";
import {ViewController} from "ionic-angular";


declare var $: any;
@Component({
    selector: 'page-new-coupon',
    templateUrl: 'new-coupon.html'
})

export class NewCouponPage {


    info: any = {
        photo: '',
        range: '',
        download: '',
        condition: '',
        amount: '',
    }

    constructor(
        public api: ClientApiService,
        public notify: NotificationService,
        public viewCtrl: ViewController
    ) {

    }

    publish() {

        if (!this.validate()) {
            this.notify.showError('请正确地输入所有信息。');
            return;
        }

        this.notify.showLoading();

        this.api.publishCoupon(this.info).subscribe(res => {

            this.notify.closeLoading();
            if (res.success) {
                this.notify.showSuccess('成功');
                this.viewCtrl.dismiss('success');
            } else {
                this.notify.showError('失败');
            }
        })
    }

    cancel() {
        this.viewCtrl.dismiss('cancel');
    }

    uploadphoto() {
        $('#uploadphoto').trigger('click');
    }

    fileChangeListener($event) {

        let file: File = $event.target.files[0];

        this.notify.showLoading();

        this.api.uploadImage(file).subscribe(url => {

            this.notify.closeLoading();
            console.log(url);
            this.info.photo = url;
        }, err => {
            this.notify.closeLoading();
            this.notify.showError('保存失败');
        });
    }

    validate() {
        if (
            this.info.photo == '' ||
                this.info.range == '' ||
                this.info.download == '' ||
                this.info.condition == '' ||
                this.info.amount == ''
        ) {
            return false;
        }

        return true;
    }

}