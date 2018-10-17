import {Component, NgZone} from '@angular/core';
import {AlertController, Events, ModalController, NavController} from 'ionic-angular';
import {ControlAnchor, NavigationControlType, OfflineOptions} from "angular2-baidu-map";
import {SearchFactoryPage} from "../../factory/search-factory/searcg-factory";
import {ClientOrderManagementTabPage} from "../client-order-management/tab/client-order-management-tab";
import {ClientCenterHomePage} from "../mine/mine-home/mine-home";
import {SettingsService} from "../../../services/settings.service";
import {BarcodeScanner} from "@ionic-native/barcode-scanner"
import {ClientApiService} from "../../../services/client-api";
import {NotificationService} from "../../../services/notification.service";
import {SystemInfo} from "../../support/message-management/system-info/system-info";
import {TrackMapPage} from "../../common/track-map/track-map";
import {FactoryDetailPage} from "../../factory/factory-detail/factory-detail";
import {SelectTrackPage} from "../../common/select-track/select-track";
import {QrcodeModalPage} from "../../common/qrcode-modal/qrcode-modal";
import {OrderStatusPage} from "../order-status/order-status";
import {SearchFactoryResultPage} from "../../factory/search-factory-result/search-factory-result";
import {DeviceService} from "../../../services/device.service";
import {LeaveEvaluationPage} from "../leave-evaluation/leave-evaluation";
import {FreightPage} from "../fright/freight";

declare var BMap: any;
declare var $: any;

@Component({
    selector: 'page-client-home',
    templateUrl: 'client.home.html'
})
export class ClientHomePage {

    isMinimize = false;

    isReleaseModalShow = false;
    isQrcodeModalShow = false;
    state = "mortar";

    base64Image: string;

    mapApi = '';
    myMarkerIcon: any;
    mortarMarkerIcon: any;
    balanceMarkerIcon: any;

    businesses = [];
    allBusiness = [];
    searchKey = '';
    map: any;

    longitude: any;
    latitude: any;
    city: any;

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public setting: SettingsService,
        private barcodeScanner: BarcodeScanner,
        public modalCtrl: ModalController,
        public zone: NgZone,
        public api: ClientApiService,
        public notify: NotificationService,
        public alertCtrl: AlertController,
        public message: DeviceService
    )
    {
        this.mapApi = this.setting.mapApi;
        this.longitude = this.setting.longitude;
        this.latitude = this.setting.latitude;
        console.log(this.longitude + ':' + this.latitude);
        this.city = this.setting.city;


    }

    ionViewDidLoad() {
        $('ion-content').click(function (e) {
            console.log(e.currentTarget);
        })

        console.log('badge');
        console.log(this.setting.badge.confirm );
        console.log(this.setting.badge.pay );
        console.log(this.setting.badge.pending);
        console.log(this.setting.badge.complete);
    }

    ionViewWillEnter() {
        this.isReleaseModalShow = false;
        this.isQrcodeModalShow = false;
    }

    changeState(state) {
        this.state = state;
        this.loadMarkers(state);
    }

    goToSearchFactoryPage() {
        this.navCtrl.push(SearchFactoryPage, {business: this.allBusiness});
    }

    ////goToClientOrderMangementPage;

    goToClientOrderMangementPage() {
        this.navCtrl.push(ClientOrderManagementTabPage);
    }

    goToMessageHomePage() {
        this.navCtrl.push(SystemInfo);
    }

    goToSubmitOrderPage() {
        this.isReleaseModalShow = false;
        this.navCtrl.push(OrderStatusPage, {state: 'mortar'});
    }


    goToPendingPage() {
        this.isReleaseModalShow = false;
        this.navCtrl.push(ClientOrderManagementTabPage, {tabIndex: 2});
    }

    track() {
        this.navCtrl.push(SelectTrackPage);
    }

    showTrackOrdersPopup(trackOrders) {
        let alert = this.alertCtrl.create();
        alert.setTitle('Choose Order to track');

        trackOrders.forEach(function (order) {
            alert.addInput({
                type: 'radio',
                label: order['order_no'] + '_' + order['delivery_no'],
                value: order['id'],
                checked: order['id'] == trackOrders[0]['id']
            });

        })

        alert.addButton('取  消');
        alert.addButton({
            text: '确  定',
            handler: data => {
                this.navCtrl.push(TrackMapPage, {order_id: data});
            }
        });
        alert.present();
    }

    initMarkerIcon() {
        var size = new BMap.Size(70, 70);
        this.myMarkerIcon = new BMap.Icon('assets/icon/marker-my.png', size);
        this.balanceMarkerIcon = new BMap.Icon('assets/icon/marker-balance.png', size);
        this.mortarMarkerIcon = new BMap.Icon('assets/icon/marker-mix.png', size);
    }

    loadMarkers(state) {

        this.map.clearOverlays();   /// delete all markers

        marker = new BMap.Marker(new BMap.Point(this.longitude, this.latitude), {
            icon: this.myMarkerIcon,
        });
        this.map.addOverlay(marker);

        /// add other markers

        let __this = this;
        var marker;
        if (this.businesses.length == 0) return;
        this.businesses.forEach(function (business) {
            if (business.type == 'M') {
                marker = new BMap.Marker(new BMap.Point(business.longitude, business.latitude), {
                    icon: __this.mortarMarkerIcon,
                });
                marker.addEventListener('click', () => {
                    __this.notify.showMarkerInfo(business, () => {
                        __this.viewDetail(business)
                    });
                })
                console.log(marker);
                if (state == 'mortar' || state == 'all') __this.map.addOverlay(marker);

            } else {
                marker = new BMap.Marker(new BMap.Point(business.longitude, business.latitude), {
                    icon: __this.balanceMarkerIcon,
                });
                marker.addEventListener('click', () => {
                    __this.notify.showMarkerInfo(business, () => {
                        __this.viewDetail(business)
                    });
                })
                if (state == 'balance' || state == 'all') __this.map.addOverlay(marker);
            }
        })

    }

    viewDetail(business) {
        console.log(business);
        this.navCtrl.push(FactoryDetailPage, {business: business});
    }


    goToClientCenterHomePage() {
        this.navCtrl.push(ClientCenterHomePage);
    }

    showMyQrcode() {
        this.isQrcodeModalShow = false;
        let modal = this.modalCtrl.create(QrcodeModalPage, {qrCode: this.setting.userRole + this.setting.member_id});
        modal.present();
    }

    scanQrcode() {

        this.isQrcodeModalShow = false;

        this.barcodeScanner.scan({

            disableAnimations: false,
            prompt: "请将二维码放在扫描框中"

        }).then((barcodeData) => {

            this.submitQrcode(barcodeData.text);

        }, (err) => {
            // An error occurred
            alert(err);
        });
    }

    submitQrcode(qrcode) {
        this.notify.showLoading()
        this.api.submitQrcode(qrcode).subscribe(res => {
            this.notify.closeLoading();
            if (res.success) {
                this.notify.showSuccess('成功');


                let splits = qrcode.split("_");
                if (splits[0] == 'B') {
                    this.navCtrl.push(LeaveEvaluationPage, {'order': res.order, businesser_evaluation: true});
                } else if (splits[0] == 'D') {
                    let order_id = splits[2];
                    this.navCtrl.push(FreightPage, {order_id: order_id});
                }
            } else {
                this.notify.showError('失败');
            }
        }, err => {
            this.notify.closeLoading();
            this.notify.showError(err);
        })
    }

    getBusiness() {
        this.api.getBusiness().subscribe(res => {
            console.log(res.data);
            this.allBusiness = res.data;
            this.search();
        })
    }

    search() {
        this.businesses = new Array();
        var __this = this;
        var searchKey = this.searchKey;
        if (this.allBusiness.length > 0) {
            this.allBusiness.forEach(function (item) {
                if (item['name'].includes(searchKey)) __this.businesses.push(item);
            })
        }
        this.loadMarkers(this.state);
    }

    onInput(e) {
        this.search();
    }

    onCancel(e) {
        this.search();
    }

    goToSearchResult() {
        this.search()
        this.navCtrl.push(SearchFactoryResultPage, {business: this.businesses});
    }


    /******************   Map options **************/////////////////////

    opts: any;
    offlineOpts: OfflineOptions;

    ngOnInit() {

        console.log('Baidumap');
        this.opts = {
            center: {
                longitude: this.longitude,
                latitude: this.latitude,
            },
            zoom: 15,
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
        this.initMarkerIcon();                     /////////// init marker icons
        this.getBusiness();                       ////////    get current location;
    }

    clickMarker(marker: any) {
        console.log('The clicked marker is', marker);
    }

    clickmap(e: any) {
        console.log(`Map clicked with coordinate: ${e.point.lng}, ${e.point.lat}`);
    }

    /******************    End  Map options **************/////////////////////

}