import {Events, NavController, NavParams, Platform, ViewController} from "ionic-angular";

import {Component, NgZone, OnInit} from '@angular/core';
import {OfflineOptions, ControlAnchor, NavigationControlType} from 'angular2-baidu-map';
import {SettingsService} from "../../../services/settings.service";
import {ClientApiService} from "../../../services/client-api";

declare var BMap: any;
declare var $:any;

@Component({
    selector: 'page-map-dialog',
    templateUrl: 'mapdialog.html'
})

export class MapDialog implements OnInit  {

    mapApi = '';

    map: any;

    location = {
        address : '',
        latitude: 0,
        longitude: 0
    }

    constructor(
        public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController,
        public navCtrl: NavController,
        public events: Events,
        public zone: NgZone,
        public setting: SettingsService,
        public api: ClientApiService
    ) {
        this.mapApi = this.setting.mapApi;
    }

    dismiss() {
        this.viewCtrl.dismiss(this.location);
    }

    opts: any;
    offlineOpts: OfflineOptions;



    ngOnInit() {

        console.log(this.setting.longitude + ':' + this.setting.latitude);
        this.opts = {
            center: {
                longitude: this.setting.longitude,
                latitude: this.setting.latitude
            },
            zoom: this.setting.mapZoom,
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

        this.map = map;

        let lng = this.opts.center.longitude
        let lat = this.opts.center.latitude


        let marker = new BMap.Marker(new BMap.Point(lng, lat), {});
        let icon = marker.getIcon(); console.log(icon);
        icon.setSize(new BMap.Size(90, 90));
        marker.setIcon(icon);
        this.map.addOverlay(marker);

        var myGeo = new BMap.Geocoder();
        var _this = this;

        myGeo.getLocation(new BMap.Point(lng, lat), function(result){
            if (result){

                console.log(result);
                _this.zone.run(() => {
                    _this.location.address = result.address;
                    _this.location.latitude = _this.opts.center.latitude;
                    _this.location.longitude = _this.opts.center.longitude;
                });
            }
        });


    }

    clickmap(e: any) {

        console.log(`Map clicked with coordinate: ${e.point.lng}, ${e.point.lat}`);



        var lng = e.point.lng;
        var lat = e.point.lat;

        this.map.clearOverlays();
        let marker = new BMap.Marker(new BMap.Point(lng, lat), {});
        let icon = marker.getIcon(); console.log(icon);
        icon.setSize(new BMap.Size(90, 90));
        marker.setIcon(icon);
        this.map.addOverlay(marker);
        //
        // var myGeo = new BMap.Geocoder();
        // var _this = this;
        // myGeo.getLocation(new BMap.Point(lng, lat), function(result){
        //     if (result){
        //         _this.zone.run(() => {
        //             console.log(result);
        //             _this.location.address = result.address;
        //             _this.location.latitude = lat;
        //             _this.location.longitude = lng;
        //         });
        //     }
        // });

        var _this = this;

        $.ajax({
            method: 'GET',
            url: 'http://api.map.baidu.com/geocoder/v2/',
            data: {
                ak: this.setting.mapApi,
                location: lat + ',' + lng,
                output: 'json'
            }
        }).then(function(res) {
            var result = JSON.parse(res);
            _this.location.latitude = lat;
            _this.location.longitude = lng;
            _this.location.address = result.result.formatted_address + (result.result.sematic_description != ''? '(' + result.result.sematic_description + ')': '');
        })

    }

    changeMarker(marker:any) {

    }

    updateCoordinate(longitude, latitude){
        console.log('sdf');
        this.opts = {
            center: {
                longitude: longitude,
                latitude: latitude
            }
        };
    }
}