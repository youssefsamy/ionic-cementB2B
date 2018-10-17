import {SettingsService} from "../../../../../services/settings.service";
import { Component } from '@angular/core';
import {NavParams, Events, ModalController, NavController, AlertController} from 'ionic-angular';
import {MapDialog} from '../../../../common/MapDialog/mapdialog';
import {SelectBankPage} from "../../../../common/select-bank/select-bank";
import {ClientApiService} from "../../../../../services/client-api";
import {NotificationService} from "../../../../../services/notification.service";
import {ImagePicker} from "@ionic-native/image-picker";
import { Camera, CameraOptions } from '@ionic-native/camera';
import {Crop} from "@ionic-native/crop";

@Component({
    selector: 'page-register-factory',
    templateUrl: 'register.factory.html'
})
export class RegisterFactory {

    info = {
        name: '',
        phone: '',
        type: '',
        logo: '',
        address: '',
        service_number: '',
        business_license: '',
        applicant_name: '',
        contact_number: '',
        idcard_front: '',
        idcard_back: '',
        idcard_number: '',
        introduction: '',
        latitude: '',
        longitude: ''
    }

    role;

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public modalCtrl: ModalController,
        public params: NavParams,
        public api: ClientApiService,
        public notify: NotificationService,
        public setting: SettingsService,
        public alertCtrl: AlertController,
        private imagePicker: ImagePicker,
        private camera: Camera,
        private crop: Crop,
    ) {
        this.role = params.data.role;
        console.log(this.role);
        this.role == 'mortar' ? this.info.type = "M" : this.info.type = "B";
    }

    ionViewDidLoad() {
        this.info.latitude = this.setting.latitude;
        this.info.longitude = this.setting.longitude;
        var _this = this;
        this.api.getAddress(this.info.longitude, this.info.latitude).then(function (res) {
            res = JSON.parse(res);
            _this.info.address = res.result.formatted_address;
        })
    }

    updateAddress(characterNum) {
        let modal = this.modalCtrl.create(MapDialog, characterNum);
        modal.onDidDismiss(data => {
            this.info.address = data.address;
            this.info.latitude = data.latitude;
            this.info.longitude = data.longitude;
        });

        modal.present();
    }

    register() {
        if (!this.validate()) return;

        this.notify.showLoading()

        this.api.register(this.setting.phoneNumber, this.setting.password).subscribe(res => {


            if (res.success) {
                this.api.registerBusiness(this.info).subscribe(res => {

                    this.notify.closeLoading()

                    if (res.success) {
                        this.notify.showSuccess('注册成功');
                        this.navCtrl.push(SelectBankPage);
                        this.setting.userRole = this.role;
                        this.setting.userType = 'B';
                        this.setting.userId = res.user_id;
                    } else {
                        this.notify.showError(res.error);
                    }
                })
            } else {

                this.notify.closeLoading()
                this.notify.showError(res.error);

            }
        })

    }

    validate() {

        if (this.info.logo == '') {
            this.notify.showError('请输入LOGO')
            return false;
        }

        if (this.info.name == '') {
            this.notify.showError('请输入企业名称')
            return false;
        }

        if (this.info.service_number == '') {
            this.notify.showError('请输入服务电话')
            return false;
        }

        if (this.info.address == '') {
            this.notify.showError('请正确输入地址')
            return false;
        }

        if (this.info.latitude == '') {
            this.notify.showError('请正确输入地址')
            return false;
        }

        if (this.info.longitude == '') {
            this.notify.showError('请正确输入地址')
            return false;
        }

        if (this.info.idcard_back == '') {
            this.notify.showError('请上传身份证背面')
            return false;
        }

        if (this.info.idcard_front == '') {
            this.notify.showError('请上传身份证正面')
            return false;
        }

        if (this.info.idcard_number == '') {
            this.notify.showError('请正确输入身份证号码')
            return false;
        }

        if (this.info.applicant_name == '') {
            this.notify.showError('请输入申请人姓名')
            return false;
        }

        if (this.info.business_license == '') {
            this.notify.showError('请上传营业执照')
            return false;
        }

        if (this.info.introduction == '') {
            this.notify.showError('请输入企业简介')
            return false;
        }

        if (this.info.contact_number == '') {
            this.notify.showError('请输入联系电话')
            return false;
        }

        return true;
    }


    uploadPhoto(name = 'front') {
        let alert = this.alertCtrl.create();
        // alert.setTitle('Lightsaber color');

        alert.addInput({
            type: 'radio',
            label: '从手机相册选择',
            value: 'library',
            checked: true
        });

        alert.addInput({
            type: 'radio',
            label: '拍照',
            value: 'camera'
        });

        alert.addButton('取消');
        alert.addButton({
            text: '确定',
            handler: data => {
                if (data == 'library') {
                    this.getPictureFromLibrary(name);
                } else {
                    this.getPictureFromCamera(name);
                }
            }
        });
        alert.present();
    }

    getPictureFromLibrary(name) {

        this.imagePicker.getPictures({
            maximumImagesCount: 1,
            quality: 70,
            outputType: 0, // image data
        }).then((results) => {
            if (!results.length) return;
            this.crop.crop(results[0], {quality: 75})
                .then(
                    newImage => {

                        this.api.getImageBase64String(newImage).then(imageData => {

                            this.notify.showLoading();

                            this.api.uploadPhoto(imageData).subscribe(res => {

                                this.notify.closeLoading();
                                switch (name) {
                                    case 'logo':
                                        this.info.logo = res.url; break;
                                    case 'business_license':
                                        this.info.business_license = res.url; break;
                                    case 'front':
                                        this.info.idcard_front = res.url; break;
                                    case 'back':
                                        this.info.idcard_back = res.url; break;
                                }

                            }, err => {

                            });
                        })
                    },
                    error => {

                    }
                );
        });
    }

    getPictureFromCamera(name) {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            allowEdit: true,
        }

        this.camera.getPicture(options).then((imageData) => {
            // let base64Image = 'data:image/jpeg;base64,' + imageData;

            this.notify.showLoading();

            this.api.uploadPhoto(imageData).subscribe(res => {

                this.notify.closeLoading();
                switch (name) {
                    case 'logo':
                        this.info.logo = res.url; break;
                    case 'business_license':
                        this.info.business_license = res.url; break;
                    case 'front':
                        this.info.idcard_front = res.url; break;
                    case 'back':
                        this.info.idcard_back = res.url; break;
                }

            }, err => {

            });
        });
    }

    showImage(url) {
        this.notify.showGallery(url);
    }


}