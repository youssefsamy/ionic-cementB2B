import {Component} from '@angular/core';
import {Events, NavController, NavParams} from 'ionic-angular';
import {ClientApiService} from "../../../services/client-api";
import {NotificationService} from "../../../services/notification.service";
import {SettingsService} from "../../../services/settings.service";

declare var $: any;
@Component({
    selector: 'page-draft-contract',
    templateUrl: 'draft-contract.html'
})

export class DraftContractPage {

    selected_template: any;

    templates = [];

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public api: ClientApiService,
        public notify: NotificationService,
        public params: NavParams,
        public setting: SettingsService,

    ) {

    }

    ionViewWillEnter() {
        this.loadTemplate();
    }

    loadTemplate() {

        this.api.loadTemplate().subscribe(res => {
            console.log(res.data);
            this.templates = res.data;
            if (this.templates.length > 0) this.selected_template = this.templates[0]['fileurl'];

        })

    }

    downloadTemplate() {
        window.open(this.setting.imageUrl + this.selected_template);
    }

    cancel() {
        this.navCtrl.pop();
    }


}
