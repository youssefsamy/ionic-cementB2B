import {Events, NavController, NavParams, Platform, ViewController} from "ionic-angular";

import {Component, OnInit} from '@angular/core';
import { OfflineOptions, ControlAnchor, NavigationControlType } from 'angular2-baidu-map';
import {SettingsService} from "../../../services/settings.service";


@Component({
    selector: 'page-factory-location-map',
    templateUrl: 'factory-location-map.html'
})

export class FactoryLocationMap implements OnInit  {

    mapApi = '';
    title = '';
    latitude: any;
    longitude: any;
    type: any;

    constructor(
        public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController,
        public navCtrl: NavController,
        public events: Events,
        public setting: SettingsService
    ) {
        this.mapApi = this.setting.mapApi;
        var business = this.params.get('business');
        this.latitude = business.latitude;
        this.longitude = business.longitude;
        this.type = business.type;
        this.title = business.name;
    }

    dismiss() {
        this.viewCtrl.dismiss('ddd');
    }


    opts: any;
    offlineOpts: OfflineOptions;

    ngOnInit() {
        console.log('Baidumap');
        this.opts = {
            center: {
                longitude: this.longitude,
                latitude: this.latitude
            },
            zoom: this.setting.mapZoom,
            markers: [{
                longitude: this.longitude,
                latitude: this.latitude,
                width: 100,
                height: 100,
                icon: this.type == 'M' ? 'assets/icon/marker-mix.png' : 'assets/icon/marker-balance.png'
            }],
            geolocationCtrl: {
                anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_RIGHT
            },
            scaleCtrl: {
                anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_LEFT
            },
            navCtrl: {
                type: NavigationControlType.BMAP_NAVIGATION_CONTROL_LARGE
            }
        };

        this.offlineOpts = {
            retryInterval: 5000,
            txt: '网络不给力'
        };
    }

    loadMap(map: any) {
        console.log('map instance here', map);
    }

    clickMarker(marker: any) {
        console.log('The clicked marker is', marker);
    }

    clickmap(e: any) {
        console.log(`Map clicked with coordinate: ${e.point.lng}, ${e.point.lat}`);
    }

    changeMarker(marker:any) {

    }
}