import {Injectable} from "@angular/core";
import {SettingsService} from "./settings.service";
import {NotificationService} from "./notification.service";
import {ClientApiService} from "./client-api";
import {BackgroundGeolocation} from "@ionic-native/background-geolocation";
import 'rxjs/add/operator/filter';
import {Geoposition, Geolocation} from "@ionic-native/geolocation";

declare var $: any;
@Injectable()
export class TrackService {

    clock = null;
    public watch: any;
    isTrack: boolean;

    userLocationUploadHandler = null;
    trackUploadHandler = null;

    index = 0;

    constructor(
        private setting: SettingsService,
        private notify: NotificationService,
        private api: ClientApiService,
        private backgroundGeolocation: BackgroundGeolocation,
        private geolocation: Geolocation
    ) {

    }


    getEntityLatestPoint(info) {
        return $.ajax({
            method: 'GET',
            url: 'Http://yingyan.baidu.com/api/v3/track/getlatestpoint',
            data: {
                ak: this.setting.mapApi,
                service_id: this.setting.mapService_id,
                entity_name: info.entity_name,
                process_option: info.process_option
            }
        })
    }

    get

    uploadEntityPoint(info) {
        return $.ajax({
            method: 'POST',
            url: 'http://yingyan.baidu.com/api/v3/track/addpoint',
            data: {
                ak: this.setting.mapApi,
                service_id: this.setting.mapService_id,
                entity_name: info.entity_name,
                latitude: info.latitude,
                longitude: info.longitude,
                loc_time: info.loc_time,
                coord_type_input: 'bd09ll',
            }
        }).then(function (res) {
            console.log(res);
        })
    }

    uploadLocation(entity_name) {

        let longitude: any;
        let latitude: any;
        let time: any;
        let info: any;

        this.api.getLocationByGPS().then(res => {

            longitude = res.coords.longitude;
            latitude = res.coords.latitude;
            time = this.getCurrentTime();

            info = {
                longitude: longitude,
                latitude: latitude,
                loc_time: this.getCurrentTime(),
                entity_name: entity_name
            }

            this.uploadEntityPoint(info);

        })

        /* this.index++;
         let longitude = 124.33;
         let latitude = 40.13;
         let time: any;
         let info: any;

         this.api.getLocation().subscribe(res => {

         time = this.getCurrentTime();
         info = {
         longitude: longitude + 0.0001*this.index,
         latitude: latitude + 0.0001*this.index,
         loc_time: this.getCurrentTime(),
         entity_name: entity_name
         }

         this.uploadEntityPoint(info);

         })*/

    }

    startUploadUserLocation() {
        /*this.userLocationUploadHandler = setInterval(() => {
         if (this.setting.getWorkState() == 'yes') {
         this.uploadLocation('b2b_user_' + this.setting.userId);
         }
         }, 300000);*/

        let config = {
            desiredAccuracy: 0,
            stationaryRadius: 20,
            distanceFilter: 10,
            debug: false,
            interval: 10000,
            startForeground: false
        };

        let longitude: any;
        let latitude: any;
        let time: any;
        let info: any;

        this.backgroundGeolocation.configure(config).subscribe((location) => {
            console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
            time = this.getCurrentTime();

            if (this.setting.getWorkState() == 'yes') {                 ////////////upload user location
                info = {
                    longitude: location.longitude,
                    latitude: location.latitude,
                    loc_time: this.getCurrentTime(),
                    entity_name: 'b2b_user_' + this.setting.userId
                }

                this.setting.longitude = location.longitude;
                this.setting.latitude = location.latitude;

                this.uploadEntityPoint(info);
            }



            if (this.setting.getStorage('isServicing', 'no') == 'yes') {            //////// upload track
                info = {
                    longitude: location.longitude,
                    latitude: location.latitude,
                    loc_time: this.getCurrentTime(),
                    entity_name: this.setting.getStorage('entity_name'),
                }

                this.uploadEntityPoint(info);
            }

        }, (err) => {
            console.log(err);
        });

        // Turn ON the background-geolocation system.
        this.backgroundGeolocation.start();

        // Foreground Tracking
        let options = {
            frequency: 10000,
            enableHighAccuracy: false
        };

        this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {

            console.log(position);

            time = this.getCurrentTime();

            if (this.setting.getWorkState() == 'yes') {            ////////////upload user location
                info = {
                    longitude: position.coords.longitude,
                    latitude: position.coords.longitude,
                    loc_time: this.getCurrentTime(),
                    entity_name: 'b2b_user_' + this.setting.userId
                }

                this.setting.longitude = position.coords.longitude,
                this.setting.latitude = position.coords.latitude

                this.uploadEntityPoint(info);
            }

            if (this.setting.getStorage('isServicing', 'no') == 'yes') {           //////// upload track
                info = {
                    longitude: position.coords.longitude,
                    latitude: position.coords.longitude,
                    loc_time: this.getCurrentTime(),
                    entity_name: this.setting.getStorage('entity_name'),
                }

                this.uploadEntityPoint(info);
            }
        });
    }

    finishTracking() {

        if (this.setting.getStorage('platform') == 'browser') {
            this.backgroundGeolocation.finish();
            if (this.watch) this.watch.unsubscribe();
        }
    }

    stopUploadUserLocation() {
        if (this.userLocationUploadHandler) {
            clearInterval(this.userLocationUploadHandler);
            this.userLocationUploadHandler = null;
        }
    }

    startUploadTrack(entity_name) {
        /*this.trackUploadHandler = setInterval(() => {
            this.uploadLocation(entity_name);
        }, 20000)*/
    }

    stopUploadTrack() {
        if (this.trackUploadHandler) {
            clearInterval(this.trackUploadHandler);
            this.trackUploadHandler = null;
        }
    }

    getTrackResult(entity_name, startTime, endTime) {
        return $.ajax({
            method: 'GET',
            url: 'Http://yingyan.baidu.com/api/v3/track/gettrack',
            data: {
                ak: this.setting.mapApi,
                service_id: this.setting.mapService_id,
                entity_name: entity_name,
                start_time: startTime,
                end_time: endTime,
                page_size: 4000
            }
        })
    }

    getCurrentTime() {
        return Math.round(new Date().getTime() / 1000);
    }
}