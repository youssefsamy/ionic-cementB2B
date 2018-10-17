import { Component } from '@angular/core';
import {Events, MenuController, ModalController, NavController, NavParams} from 'ionic-angular';
import {FactoryHomePage} from "../factory.home/factory.home";
import {FactoryDetailPage} from "../factory-detail/factory-detail";


@Component({
    selector: 'page-search-factory-result',
    templateUrl: 'search-factory-result.html'
})
export class SearchFactoryResultPage {

    state: string = 'order';
    searchKey: any;
    businesses = [];

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public params: NavParams,
    ) {
        console.log(this.params.get('business'));
        this.businesses = this.params.get('business');
        this.searchKey = this.params.get('searchKey');
        console.log(this.searchKey);
    }


    goToFactoryDetailPage(index) {
        this.navCtrl.push(FactoryDetailPage, {business: this.businesses[index]});
    }
    }