import {Component} from '@angular/core';
import {App, Events, NavController, NavParams} from 'ionic-angular';
import {PersonalBankPage} from "../personal-bank/personal-bank";
import {CompanyBankPage} from "../company-bank/comapny-bank";
import {SettingsService} from "../../../services/settings.service";
import {ClientApiService} from "../../../services/client-api";
import {NotificationService} from "../../../services/notification.service";
import {LoginPage} from "../../auth/login/login";


@Component({
    selector: 'page-edit-bank',
    templateUrl: 'edit-bank.html'
})
export class EditBankPage {

    title = 'Edit Bank';
    bank_type: any;

    info = {
        account_type: '',
        account_name: '',
        account_cardno: '',
        bank_name: '',
        account_bank_name: '',
        account_location: '',
    }

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public params: NavParams,
        public setting: SettingsService,
        public api: ClientApiService,
        public notify: NotificationService,
        public app: App
    ) {

    }

    ionViewDidLoad() {
        this.bank_type = this.params.get('type');
        console.log(this.params);
        console.log(this.bank_type);

        this.bank_type == 'P' ? this.title = "编辑个人账户" : this.title = "编辑公司账户";
    }

    goToBankPage() {
        if (this.bank_type == '0') {
            this.navCtrl.push(PersonalBankPage);
        } else {
            this.navCtrl.push(CompanyBankPage);
        }
    }


    EditBank() {
        if (!this.validate()) {
            this.notify.showError('请正确地输入所有信息');
            return;
        }
        this.info.account_type = this.bank_type;

        var _this = this;
        console.log(this.info);
        this.api.editBank(this.info).subscribe(res => {
            if (res.success) {
                _this.setting.userBankType = _this.bank_type;
                _this.notify.showSuccess('成功');
                if (_this.setting.isLogged == false) {
                    _this.setting.initUserSetting();
                    _this.app.getRootNav().setRoot(LoginPage);
                }
            } else {
                _this.notify.showError(res.error);
            }
        })
    }

    validate() {
        if (
            this.info.account_location == '' ||
            this.info.account_cardno == '' ||
            this.info.account_bank_name == '' ||
            this.info.bank_name == '' ||
            this.info.account_name == ''
        ) {
            return false;
        }
        return true;
    }
}