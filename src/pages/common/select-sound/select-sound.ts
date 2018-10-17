import {Component} from "@angular/core";
import {sound, SoundsService} from "../../../services/sounds.service";
import {SettingsService} from "../../../services/settings.service";
import {AlertController, NavController} from "ionic-angular";

@Component({
    selector: 'page-select-sound',
    templateUrl: 'select-sound.html',
})

export class SelectSoundPage {

    sounds: sound[];
    selectedSound: string;
    currentSound: string;

    constructor(
        public soundService: SoundsService,
        public setting: SettingsService,
        public navCtrl: NavController,
        public alertCtrl: AlertController
    ) {
        this.sounds = soundService.getSounds();
        this.currentSound = this.setting.getWarningSound();
        console.log(this.sounds);
    }

    ionViewWillLeave() {
        if(this.selectedSound) {
            this.soundService.stopSound(this.selectedSound);
        }
    }

    selectSound(sound) {
        if(this.selectedSound == sound.sId) {
            this.soundService.stopSound(sound.sId);
            return;
        }

        if (this.selectedSound) this.soundService.stopSound(this.selectedSound);
        this.selectedSound = sound.sId;
        console.log(this.selectedSound);
        this.soundService.playSound(this.selectedSound);

    }

    apply(sound) {

        let confirm = this.alertCtrl.create({
            title: '警告',
            message: '确定启用这个提示音吗？',
            cssClass: 'soundAlert',
            buttons: [
                {
                    text: '取  消',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: '确  定',
                    handler: () => {
                        if (this.selectedSound) this.soundService.stopSound(this.selectedSound);
                        this.setting.setWarningSound(sound.sId);
                        this.navCtrl.pop();
                    }
                },

            ]
        });
        confirm.present();

    }
}