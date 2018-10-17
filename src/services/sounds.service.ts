import {Injectable} from "@angular/core";
import {NativeAudio} from "@ionic-native/native-audio";
import {SettingsService} from "./settings.service";
import {AlertController} from "ionic-angular";

@Injectable()
export class SoundsService {

    sounds: sound[] = [
        {sId: 'awesome', name: 'Awesome', uri: 'assets/sound/awesomemorning_alarm.mp3'},
        {sId: 'opener', name: 'Opener', uri: 'assets/sound/opener.mp3'},
        {sId: 'alarmClock', name: 'Alarm Clock', uri: 'assets/sound/alarm_clock.mp3'},
        {sId: 'appleRing', name: 'Apple Ring', uri: 'assets/sound/apple_ring.mp3'},
        {sId: 'huawei', name: 'Huawei', uri: 'assets/sound/huawei_ripple.mp3'},
        {sId: 'alarm_clock_3', name: 'Alarm Clock3', uri: 'assets/sound/alarm_clock_3.mp3'},
        {sId: 'alarm2', name: 'Alarm2', uri: 'assets/sound/alarm2.mp3'},
        {sId: 'alarma_musical', name: 'Alarma Musical', uri: 'assets/sound/alarma_musical.mp3'},
        {sId: 'alarme_de_carro', name: 'Alarm De Carro', uri: 'assets/sound/alarme_de_carro.mp3'},
        {sId: 'alcatel_illuminate', name: 'Alcatel Illuminate', uri: 'assets/sound/alcatel_illuminate.mp3'},
        {sId: 'amazing_grace', name: 'Amazing Grace', uri: 'assets/sound/amazing_grace.mp3'},
        {sId: 'army_alarm', name: 'Army Alarm', uri: 'assets/sound/army_alarm.mp3'},
        {sId: 'bass', name: 'Bass', uri: 'assets/sound/bass.mp3'},
        {sId: 'best_wake_up', name: 'Best Wake up', uri: 'assets/sound/best_wake_up.mp3'},
        {sId: 'bird', name: 'Bird', uri: 'assets/sound/bird.mp3'},
        {sId: 'bongo', name: 'Bongo', uri: 'assets/sound/bongo.mp3'},
        {sId: 'budilnik', name: 'Budilnik', uri: 'assets/sound/budilnik.mp3'},
        {sId: 'car_alarm', name: 'Car Alarm', uri: 'assets/sound/car_alarm.mp3'},
        {sId: 'galaxy_s4_bubbles', name: 'Galaxy S4 Bubbles', uri: 'assets/sound/galaxy_s4_bubbles.mp3'},
        {sId: 'highhat', name: 'Highhat', uri: 'assets/sound/highhat.mp3'},
        {sId: 'morning_alarm', name: 'Morning Alarm', uri: 'assets/sound/morning_alarm.mp3'},
        {sId: 'nuclear_alarm', name: 'Nuclear Alarm', uri: 'assets/sound/nuclear_alarm.mp3'},
        {sId: 'police', name: 'Police', uri: 'assets/sound/police.mp3'},
        {sId: 'ringtone128632', name: 'Ringtone', uri: 'assets/sound/ringtone128632.mp3'},
        {sId: 'rooster', name: 'Rooster', uri: 'assets/sound/rooster.mp3'},
        {sId: 'snare', name: 'Snare', uri: 'assets/sound/snare.mp3'},
        {sId: 'tactical', name: 'Tactical', uri: 'assets/sound/tactical.mp3'},
        {sId: 'warning', name: 'Warning', uri: 'assets/sound/warning.mp3'},
        {sId: 'warning9999', name: 'Warning9999', uri: 'assets/sound/warning9999.mp3'},
    ]

    constructor (
        public nativeAudio: NativeAudio,
        public settings: SettingsService,
        public alertCtrl: AlertController
    ) {

    }

    preloadAllSound() {
        for (let i = 0; i < this.sounds.length; i++) {
            this.nativeAudio.preloadSimple(this.sounds[i].sId, this.sounds[i].uri).then(success => {
                console.log(success);
                /*alert('success');*/
            }, err => {
                /*alert('error');
                alert(err);*/
                console.log(err);
            });
        }
    }

    preload(sId, url) {
        this.nativeAudio.preloadSimple(sId, url).then(success => {

        }, err => {
            console.log(err);
        });
    }

    playSound(sId) {
        this.nativeAudio.play(sId, () => {
            console.log('sound is done playing');
        })
    }

    playWarningSound() {
        this.nativeAudio.play(this.settings.getWarningSound(), () => {
            console.log('sound is done playing');
        })
    }

    getSounds() {
        return this.sounds;
    }

    stopSound(sId) {
        this.nativeAudio.stop(sId).then(success => {
            console.log(success);
        }, err => {
            console.log(err);
        })
    }
}

export class sound {
    sId: string;
    name: string;
    uri: string;
}
