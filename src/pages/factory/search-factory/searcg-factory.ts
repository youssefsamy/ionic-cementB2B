import { Component } from '@angular/core';
import {Events, MenuController, ModalController, NavController, NavParams} from 'ionic-angular';
import {SearchFactoryResultPage} from "../search-factory-result/search-factory-result";
import {SettingsService} from "../../../services/settings.service";
import {NotificationService} from "../../../services/notification.service";
import {ClientApiService} from "../../../services/client-api";

declare var $: any;
@Component({
    selector: 'page-search-facgory',
    templateUrl: 'search-factory.html'
})
export class SearchFactoryPage {

    state: string = 'order';
    searchKey = '';

    city: any;

    allBusiness = [];
    histories = [];
    constructor(

        public navCtrl: NavController,
        public events: Events,
        public params: NavParams,
        public modalCtrl: ModalController,
        public setting: SettingsService,
        public notify: NotificationService,
        public api: ClientApiService

    ) {

        this.city = this.setting.city;

        this.allBusiness = this.params.get('business');
        console.log(this.histories, this.allBusiness);
        if (this.setting.userRole != 'custommer') {
            this.api.getBusiness().subscribe(res => {
                console.log(res);
                this.allBusiness = res.data;
            })
        }
        this.histories = this.setting.getStorage('searchHistory', []);

    }

    goToSearchFactoryResultPage() {

        if (this.searchKey == '') {
            this.notify.showError('请正确地输入所有信息'); return;
        }

        var results = this.search(this.searchKey);
        console.log(results);
        if (results.length == 0) {
            this.notify.showError('没有搜索结果');
            this.searchKey = '';
        } else {
            if ($.inArray(this.searchKey, this.histories) <= -1) {
                this.histories.unshift(this.searchKey);
                this.histories = this.histories.slice(0,20);
                this.setting.setStorage('searchHistory', this.histories);
            }
            this.navCtrl.push(SearchFactoryResultPage, {business: results, searchKey: this.searchKey});
        }


        /*this.navCtrl.push(SearchFactoryResultPage);*/
    }

    ionViewWillEnter() {
        this.searchKey = '';
    }

    search(key) {

        var results = new Array();
        if (this.allBusiness.length > 0) {
            this.allBusiness.forEach(function(item) {
                if (item['address'].includes(key)) results.push(item);
            })
        }
        return results;

    }

    searchFromHistory(index) {
        var results = this.search(this.histories[index]);
        if (results.length == 0) {
            this.notify.showError('没有搜索结果');
        } else {
            this.navCtrl.push(SearchFactoryResultPage, {business: results, searchKey: this.histories[index]});
        }

    }

}