import { Component } from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import {ClientApiService} from "../../../../services/client-api";
import {WithdrawPage} from "../../withdraw/withdraw";
import {ManageBankAccountPage} from "../../manage-bank-account/manage-bank-account";

@Component({
    selector: 'page-fund-management-home',
    templateUrl: 'fund-management-home.html'
})
export class FundManagementHomePage {

    balanceInfo: any = {
        balance: 0,
        outmoney: 0
    };

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public api: ClientApiService
    ) {
        this.api.getBalance().subscribe(res => {
            this.balanceInfo['balance'] = res.balance;
            this.balanceInfo['outmoney'] = res.outmoney;
        })
    }

    ionViewDidLoad() {

    }

    goToWithdrawPage() {
        this.navCtrl.push(WithdrawPage);
    }

    viewFund() {

    }

    goToManagmentBankAccount() {
        this.navCtrl.push(ManageBankAccountPage);
    }
}