import { Component } from '@angular/core';
import {NavParams, Events, ModalController, NavController, AlertController} from 'ionic-angular';
import {MapDialog} from '../../../../common/MapDialog/mapdialog';
import {ClientApiService} from "../../../../../services/client-api";
import {NotificationService} from "../../../../../services/notification.service";
import {SettingsService} from "../../../../../services/settings.service";
import {EditBankPage} from "../../../../common/edit-bank/edit-bank";
import {ImagePicker} from "@ionic-native/image-picker";
import {Crop} from "@ionic-native/crop";
import { Camera, CameraOptions } from '@ionic-native/camera';

declare var $: any;
@Component({
    selector: 'page-register-support',
    templateUrl: 'register.support.html'
})
export class RegisterSupport {

    monthnames = ['01','02','03','04','05','06','07','08','09','10','11','12'];

    info = {
        name: '',
        alias: '',
        photo: '',
        type: '',
        birthday: '',
        address: '',
        contact_number: '',
        certification: '',
        period: '',
        driver_type: '',
        company_name: '',
        company_duty: '',
        idcard_front: '',
        idcard_back: '',
        idcard_number: '',
        latitude: '',
        longitude: ''
    }

    role;

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public modalCtrl: ModalController,
        public params: NavParams,
        public setting: SettingsService,
        public api: ClientApiService,
        public notify: NotificationService,
        private imagePicker: ImagePicker,
        private camera: Camera,
        private crop: Crop,
        private alertCtrl: AlertController

    ) {
        this.role = params.data.role;

        switch (this.role) {
            case 'driver':
                this.info.type = 'D'; break;
            case 'installer':
                this.info.type = 'I'; break;
            case 'repairer':
                this.info.type = 'R'; break;
            case 'businesser':
                this.info.type = 'B'; break;
        }
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
        console.log('sdfds');
        let modal = this.modalCtrl.create(MapDialog, characterNum);
        modal.onDidDismiss(data => {
            this.info.address = data.address;
            this.info.latitude = data.latitude;
            this.info.longitude = data.longitude;
        });

        modal.present();
    }

    goToEditBankPage() {
        this.navCtrl.push(EditBankPage, {type: 'P'});
    }

    register() {

        if (!this.validate()) {
            return;
        }

        this.notify.showLoading();

        this.api.register(this.setting.phoneNumber, this.setting.password).subscribe(res => {

            if (res.success) {

                this.api.registerServicer(this.info).subscribe(res => {

                    this.notify.closeLoading();

                    if (res.success) {
                        this.notify.showSuccess('注册成功');
                        this.setting.userType = "S";
                        this.setting.userRole = this.role;
                        this.setting.userId = res.user_id;

                        this.goToEditBankPage();
                    } else {
                        this.notify.showError(res.error);
                    }
                })

            } else {
                this.notify.closeLoading();
                this.notify.showError(res.error);

            }
        })


    }

    triggerDatePicker() {
        $('#date_time').trigger('click');
    }

    validate() {
        if (
            this.info.photo == ''||
            this.info.alias == '' ||
            this.info.name == '' ||
            this.info.birthday == '' ||
            this.info.address == '' ||
            this.info.latitude == '' ||
            this.info.longitude == '' ||
            this.info.contact_number == ''
        ) {
            return false;
        }

        if (this.info.photo == '') {
            this.notify.showError('请上传头像')
            return false;
        }

        if (this.info.alias == '') {
            this.notify.showError('请输入用户名')
            return false;
        }

        if (this.info.name == '') {
            this.notify.showError('请输入姓名')
            return false;
        }

        if (this.info.birthday == '') {
            this.notify.showError('请输入生日')
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

        if (this.info.contact_number == '') {
            this.notify.showError('请输入联系电话')
            return false;
        }


        switch (this.role) {
            case 'driver':

                if (this.info.certification == '') {
                    this.notify.showError('请输入资质证明')
                    return false;
                }

                if (this.info.period == '') {
                    this.notify.showError('请输入驾龄')
                    return false;
                }

                if (this.info.driver_type == '') {
                    this.notify.showError('请输入驾驶等级')
                    return false;
                }

                break;

            case 'installer':
                if (this.info.certification == '') {
                    if (this.info.certification == '') {
                        this.notify.showError('请输入资质证明')
                        return false;
                    }
                }
                break;
            case 'repairer':
                if (this.info.certification == '') {
                    if (this.info.certification == '') {
                        this.notify.showError('请输入资质证明')
                        return false;
                    }
                }
                break;
            case 'businesser':

                if (this.info.idcard_number == '') {
                    this.notify.showError('请正确输入身份证号码')
                    return false;
                }

                if (this.info.idcard_front == '') {
                    this.notify.showError('请上传身份证正面')
                    return false;
                }

                if (this.info.idcard_back == '') {
                    this.notify.showError('请上传身份证背面')
                    return false;
                }

                if (this.info.company_duty == '') {
                    this.notify.showError('请输入职务')
                    return false;
                }

                if (this.info.company_name == '') {
                    this.notify.showError('请输入公司名称')
                    return false;
                }

                break;
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
                                    case 'photo':
                                        this.info.photo = res.url; break;
                                    case 'certification':
                                        this.info.certification = res.url; break;
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
                    case 'photo':
                        this.info.photo = res.url; break;
                    case 'certification':
                        this.info.certification = res.url; break;
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
