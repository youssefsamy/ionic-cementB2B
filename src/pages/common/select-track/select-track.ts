import {Component} from "@angular/core";
import {ClientApiService} from "../../../services/client-api";
import {NotificationService} from "../../../services/notification.service";
import {ModalController, NavController, NavParams} from "ionic-angular";
import {ViewDeliveryOrderPage} from "../view-delivery-order/view-delivery-order";
import {CallModalPage} from "../call-modal/call-modal";
import {TrackMapPage} from "../track-map/track-map";
import {SettingsService} from "../../../services/settings.service";
import {ViewOrderPage} from "../../client/view-order/view-order";

@Component({
    selector: 'page-select-track',
    templateUrl: 'select-track.html'
})

export class SelectTrackPage {

    diOrders = [];           ////  Driver, Installer Orders
    bOrders = [];            ////   Businesser Orders
    rOrders = [];            ////   Repairer Orders
    result = '';


    constructor(
        public api: ClientApiService,
        public notify: NotificationService,
        public navCtrl: NavController,
        public params: NavParams,
        public modalCtrl: ModalController,
        public settings: SettingsService
    ) {

    }

    ionViewDidLoad() {
        this.loadTrackOrders()
    }

    loadTrackOrders() {

        this.notify.showLoading()

        this.api.getDITrackOrders().subscribe(res => {
            console.log(res.data);
            this.diOrders = res.data;

            if (this.settings.userRole == 'customer') {

                this.api.getRTrackOrders().subscribe(res => {

                    console.log(res);
                    this.rOrders = res.data;

                    this.api.getBTrackOrders().subscribe(res => {

                        console.log(res);
                        this.bOrders = res.data;
                        this.result = '暂时没有订单'

                        this.notify.closeLoading()
                    })

                })
            } else {
                this.notify.closeLoading()
            }
        })



    }

    showOrder(order) {
        this.navCtrl.push(ViewOrderPage, {kind: order.order_kind, id: order.id});
    }

    showDeliveryOrder(order) {
        this.navCtrl.push(ViewDeliveryOrderPage, {order: order});
    }

    callPerson(order) {
        let modal = this.modalCtrl.create(CallModalPage);
        modal.onDidDismiss(data => {
            if (data == 'ok') {
                this.api.getContactNumber(order['servicer_id']).subscribe(res => {

                    if (res == '') {
                        this.notify.showError('Phone number error');
                        return;
                    }
                    this.makePhonecall(res);

                })
            }
        })

        modal.present()
    }

    makePhonecall(number) {
        this.notify.phoneCall(number);
    }

    track(order) {

        let params = {
            business_id: order['business_id'],
            customer_id: order['customer_id'],
            entity_name: 'b2b_track_D_' + order['id'],
        }
        this.navCtrl.push(TrackMapPage, {param: params});
    }

    trackRB(order) {
        let params = {
            business_id: 'null',
            customer_id: order['customer_id'],
            entity_name: 'b2b_track_B_' + order['id'],
        }
        this.navCtrl.push(TrackMapPage, {param: params});
    }

}