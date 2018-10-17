import {Component, OnInit, ViewChild} from '@angular/core';
import {App, Events, Navbar, NavController, NavParams, Tabs} from 'ionic-angular';
import {FactoryOrderPendingPage} from "../factory-order-pending/factory-order-pending";
import {FactoryOrderSendingPage} from "../factory-order-sending/factory-order-sending";
import {FactoryOrderCompletePage} from "../factory-order-complete/factory-order-complete";
import {SettingsService} from "../../../../services/settings.service";

@Component({
    selector: 'page-factory-order-management-tab',
    templateUrl: 'factory-order-management-tab.html'
})

export class FactoryOrderManagementTabPage implements OnInit {

    @ViewChild(Navbar) navBar:Navbar;
    @ViewChild('myTabs') tabRef: Tabs;

    tabIndex: number;

    pendingPage = FactoryOrderPendingPage;
    sendingPage = FactoryOrderSendingPage;
    completePage = FactoryOrderCompletePage;

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public params: NavParams,
        public setting: SettingsService
    ) {
        console.log(this.params.data);
        this.tabIndex = this.params.get('tabIndex')? this.params.get('tabIndex') : 0;
    }


    ngOnInit() {

    }

    ionViewDidLoad() {


        /*this.navBar.backButtonClick = (e:UIEvent) => {
         console.log("Back button clicked");
         this.navCtrl.parent.viewCtrl.dismiss();
         };*/
    }

    ionViewDidEnter() {

    }

}
