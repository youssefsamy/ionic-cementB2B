import {Component} from '@angular/core';
import {App, Events, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {DatePipe} from "@angular/common";
import {ClientApiService} from "../../../services/client-api";
import {NotificationService} from "../../../services/notification.service";

declare var $: any;
@Component({
    selector: 'page-leave-evaluation',
    templateUrl: 'leave-evaluation.html'
})

export class LeaveEvaluationPage {

    business_mark = 5;
    business_msg = '';
    business_images = [];

    servicer_mark = 5;
    servicer_msg = '';
    servicer_images = [];

    businesser_mark = 5;
    businesser_msg = '';
    businesser_images = [];

    businesser_evaluation = false;


    order = '';
    order_kind = '';

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public params: NavParams,
        public datepipe: DatePipe,
        public viewCtrl: ViewController,
        public modalCtrl: ModalController,
        public api: ClientApiService,
        public notify: NotificationService,
        private app: App
    ) {

        this.order = this.params.get('order');
        this.order_kind = this.order['order_kind'];
        console.log(this.order_kind);
        console.log(this.order);
        if (this.params.get('businesser_evaluation')) this.businesser_evaluation = true;
    }

    ionViewDidLoad() {

    }

    evaluate() {

        if (!this.validate()) {
            this.notify.validateError('请正确地输入所有信息');
            return;
        }

        this.notify.showLoading();


        var info;

        if (this.businesser_evaluation) {
            info = {
                order_id: this.order['id'],
                servicer_id: this.order['servicer_id'],
                servicer_marks: this.businesser_mark,
                servicer_content: this.businesser_msg,
                servicer_image: JSON.stringify(this.businesser_images),
            }

            this.api.leaveBusinesserFeedBak(info).subscribe(res => {

                this.notify.closeLoading()

                if (res.success) {
                    this.notify.showSuccess('成功');
                    this.viewCtrl.dismiss('true');
                }
            });

        } else if (this.order_kind == 'BR') {
            info = {
                order_id: this.order['id'],
                servicer_id: this.order['servicer_id'],
                servicer_marks: this.servicer_mark,
                servicer_content: this.servicer_msg,
                servicer_image: JSON.stringify(this.servicer_images),
            }

            this.api.leaveRepairerFeedBak(info).subscribe(res => {

                this.notify.closeLoading()

                if (res.success) {
                    this.notify.showSuccess('成功');
                    this.viewCtrl.dismiss('true');
                }
            });
        } else {
            info = {
                order_id: this.order['order_id'],
                delivery_id: this.order['id'],
                business_id: this.order['business_id'],
                servicer_id: this.order['servicer_id'],
                business_marks: this.business_mark,
                business_content: this.business_msg,
                business_image: JSON.stringify(this.business_images),
                servicer_marks: this.servicer_mark,
                servicer_content: this.servicer_msg,
                servicer_image: JSON.stringify(this.servicer_images),
            }

            this.api.leaveFeedback(info).subscribe(res => {

                this.notify.closeLoading()

                if (res.success) {
                    this.notify.showSuccess('成功');
                    this.viewCtrl.dismiss('true');
                }
            },error => {
                this.notify.closeLoading();
                this.notify.showError(error);
            })
        }

    }

    skip() {

        if (this.businesser_evaluation) {
            this.viewCtrl.dismiss();
        } else if (this.order_kind == 'BR') {
            this.api.skipRepairerFeedback(this.order['id']).subscribe(res => {
                if (res.success) {
                    this.viewCtrl.dismiss();
                }
            })
        } else {
            this.api.skipDeliveryOrderFeedback(this.order['id']).subscribe(res => {
                if (res.success) {
                    this.viewCtrl.dismiss();
                }
            })
        }

    }

    validate() {
        if (this.businesser_evaluation) {
            if (this.businesser_msg == '') return false;
        } else if (this.order_kind == 'BR') {
            if (this.servicer_msg == '') return false;
            return true;
        } else {
            if (this.servicer_msg == '' || this.business_msg == '') return false;
            return true;
        }

        return true;
    }

    fileChangeListener($event, type) {

        this.notify.showLoading();

        let file: File = $event.target.files[0];

        this.api.uploadImage(file).subscribe(url => {

            this.notify.closeLoading();

            console.log(url);
            switch (type) {
                case 'servicerimg':
                    this.servicer_images.push(url);
                    break;
                case 'businessimg':
                    this.business_images.push(url);
                    break;
                case 'businesserimg':
                    this.businesser_images.push(url);
                    break;
            }
        }, err => {
            this.notify.showError('保存失败');
        });
    }

    uploadservicerImage() {
        $('#uploadservicerimg').trigger('click');
    }

    uploadbusinessImage() {
        $('#uploadbusinessimg').trigger('click');
    }

    uploadbusinesserImage() {
        $('#uploadbusinesserimg').trigger('click');
    }

    showImage(url) {
        this.notify.showGallery(url);
    }
}