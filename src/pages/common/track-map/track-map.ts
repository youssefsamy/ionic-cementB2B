import {Events, NavController, NavParams, Platform, ViewController} from "ionic-angular";

import {Component, NgZone, OnInit} from '@angular/core';
import {OfflineOptions, ControlAnchor, NavigationControlType} from 'angular2-baidu-map';
import {SettingsService} from "../../../services/settings.service";

import { Geolocation } from '@ionic-native/geolocation';
import {ClientApiService} from "../../../services/client-api";
import {TrackService} from "../../../services/track.service";


declare var BMap: any;
declare var BMAP_DRIVING_POLICY_LEAST_DISTANCE: any;
@Component({
    selector: 'page-track-map',
    templateUrl: 'track-map.html'
})

export class TrackMapPage implements OnInit  {

    id: any;

    mapApi = '';

    map: any;
    entity_name: any;

    businessPosition : any;
    customerPosition: any;

    businessMarker: any;
    servicerMarker = null;
    customerMarker: any;

    businessIcon: any;
    customerIcon: any;
    servicerIcon: any;

    trackResult: any;
    trackHandler = null;
    polyline = null;
    shortRoute: any;

    constructor(
        public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController,
        public navCtrl: NavController,
        public events: Events,
        public zone: NgZone,
        public setting: SettingsService,
        public geolocation: Geolocation,
        public api: ClientApiService,
        public track: TrackService
    ) {
        this.mapApi = this.setting.mapApi;
    }

    init() {
        let param = this.params.get('param');
        console.log(param);
        let business_id = param['business_id'];
        let customer_id = param['customer_id'];
        this.entity_name = param['entity_name'];

        if (business_id == 'null') {                                               /////    if Businesser, Repair track
            this.api.getUserDetail('customer', customer_id).subscribe(res => {
                if (res.success) {
                    this.customerPosition = new BMap.Point(res.data.longitude, res.data.latitude);
                    this.addCustomerMarker();
                    this.displayShortRoute();
                }
            })
        } else {                                                                /////////////  if Driver, Installer Track
            this.api.getUserDetail('business', business_id).subscribe(res => {
                if (res.success) {
                    this.businessPosition = new BMap.Point(res.data.longitude, res.data.latitude);
                    this.addBusinessMarkder();


                    /////////load customer marker
                    this.api.getUserDetail('customer', customer_id).subscribe(res => {
                        if (res.success) {
                            this.customerPosition = new BMap.Point(res.data.longitude, res.data.latitude);
                            this.addCustomerMarker();
                            this.displayShortRoute();
                        }
                    })
                }
            })
        }

        this.loadTrackData();
        this.trackHandler = setInterval(() => {
            this.loadTrackData()
        }, 20000);

    }

    ionViewWillLeave() {
        if (this.trackHandler) clearInterval(this.trackHandler);
    }

    displayShortRoute() {

        var _this = this;
        var drivingRoute = new BMap.DrivingRoute(this.map, {
            policy: BMAP_DRIVING_POLICY_LEAST_DISTANCE,

            onSearchComplete: function(searchResult) {
                var routePlan = searchResult.getPlan(0);
                console.log(routePlan.getNumRoutes());
                console.log(routePlan.getDistance());
                var route = routePlan.getRoute(0);
                var path = route.getPath();
                console.log(path);

                _this.shortRoute = new BMap.Polyline(path, {});
            //    _this.map.addOverlay(_this.shortRoute);
            }

        });
        drivingRoute.search(this.businessPosition, this.customerPosition);
    }

    displayTrackResult() {

        console.log('trackResult');

        var pointArray = new Array();
        let points = this.trackResult.points;
        let servicerPoint = this.trackResult.end_point;


        servicerPoint = new BMap.Point(servicerPoint.longitude, servicerPoint.latitude);
        this.addServicerMarker(servicerPoint);

        if (points.length > 0) {
            for (let i=0; i<points.length; i ++) {
                let point = new BMap.Point(points[i].longitude, points[i].latitude);
                pointArray.push(point);
            }
        }

        if (this.polyline) this.map.removeOverlay(this.polyline);

        this.polyline = new BMap.Polyline(pointArray, {});
        this.polyline.setStrokeColor('#ff00ff');

        this.map.addOverlay(this.polyline, {});
    }

    loadTrackData() {
        let _this = this;
         this.track.getTrackResult(this.entity_name, this.track.getCurrentTime()-20000, this.track.getCurrentTime())
             .then(function(res) {
                 var jsonResult = JSON.parse(res);
                 if (jsonResult.status == 0) {
                     _this.trackResult = jsonResult;
                     _this.displayTrackResult();
                 }
             })
    }

    addBusinessMarkder() {
        this.businessMarker = new BMap.Marker(this.businessPosition, {
            icon: this.businessIcon
        });
        this.map.addOverlay(this.businessMarker);
    }

    addCustomerMarker() {
        this.customerMarker = new BMap.Marker(this.customerPosition, {
            icon: this.customerIcon
        });
        this.map.addOverlay(this.customerMarker);
    }

    addServicerMarker(Position) {

        if (this.servicerMarker) this.map.removeOverlay(this.servicerMarker);

        this.servicerMarker = new BMap.Marker(Position, {
            icon: this.servicerIcon
        });
        this.map.addOverlay(this.servicerMarker);
    }

    initMarkerIcon() {
        var size = new BMap.Size(60, 60);
        this.businessIcon = new BMap.Icon('assets/icon/track-ship-position.png', size);
        this.customerIcon = new BMap.Icon('assets/icon/track-my-position.png', size);
        this.servicerIcon = new BMap.Icon('assets/icon/track-current-position.png', size);
    }


////////////************ map init *************//////////////////
    opts: any;
    offlineOpts: OfflineOptions;

    ngOnInit() {

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
        console.log(map);
        this.map = map;
        this.initMarkerIcon();
        this.init();
    }

    clickMarker(marker: any) {
        console.log('The clicked marker is', marker);

    }

    clickmap(e: any) {
        console.log(`Map clicked with coordinate: ${e.point.lng}, ${e.point.lat}`);
    }

    changeMarker(marker:any) {

    }
//////////************** map init end   *********////////////////////////


    track_test() {
        
    }
}