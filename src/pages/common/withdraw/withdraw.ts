import {Component, OnInit} from "@angular/core";
import {NavController} from "ionic-angular";
import {ClientApiService} from "../../../services/client-api";

@Component({
    selector: 'page-withdraw',
    templateUrl: 'withdraw.html'
})

export class WithdrawPage implements OnInit{

    confirmed = true;
    password = '';
    confirm_password = '';

    balance: any;

    constructor(
        private navCtrl: NavController,
        private api: ClientApiService
    ) {

    }

    ngOnInit() {
        this.api.getBalance().subscribe(res => {
            this.balance = res.balance;
        })
    }

    confirm() {
        if (this.confirm_password == this.password) {
            this.confirmed = true;
        } else {
            this.confirmed = false;
        }
    }

    cancel() {
        this.navCtrl.pop();
    }

}