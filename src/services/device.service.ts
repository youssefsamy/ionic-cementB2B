import {Injectable} from "@angular/core";
import {JPushService} from "ionic2-jpush";
import {SettingsService} from "./settings.service";
import {NotificationService} from "./notification.service";
import {Observable, Subject} from "rxjs";

@Injectable()
export class DeviceService {

    public selectedContact:any = {};

    public postObserver = new Subject();
    public messageObserver = new Subject();

    public jpushObserver;

    constructor(
        private jPushPlugin: JPushService,
        private settings: SettingsService,
        private notify: NotificationService
    ) {

    }

    initJPush() {
        this.jPushPlugin.init()
            .then(res => {
                // stop plugin when user not logged in
                // alert('push plugin inited');

                this.jPushPlugin.openNotification()
                    .subscribe( res => {
                        this.jPushPlugin.clearAllNotification().then(() => {

                        });
                    });

                return this.jPushPlugin.getRegistrationID();
            })
            .then(regID => {
                this.settings.device_id = regID;
            })
            .catch(err => {
                //this.notify.showError('jpush init error');
                setTimeout(() => {
                    this.initJPush();
                }, 1000);
            });
    }

    init() {

        if (this.settings.getStorage('platform') == 'browser') return;

        this.initJPush();

        // check if app is in forground or background mode
        document.addEventListener('pause', () => {
            this.settings.setStorage('background', true);
            this.updatePushSetting();
        });

        document.addEventListener('resume', () => {
            this.settings.setStorage('background', false);
            this.updatePushSetting();
        });
    }

    connect() {

        // check if app runs in browser
        if (this.settings.getStorage('platform') == 'browser') return;

        this.postObserver = new Subject();
        this.messageObserver = new Subject();

        this.jpushObserver = this.jPushPlugin.receiveMessage().subscribe( res => {

            if (res.message == 'Message') {
                this.messageObserver.next(JSON.parse(res.extras.detail));
            } else if (res.message == 'Post') {
                this.postObserver.next(JSON.parse(res.extras.detail));

            }
            // this.jPushPlugin.clearAllNotification().then(() => {
            //
            // });
        });

        this.updatePushSetting();

        this.messageObserver.subscribe(message => {
            this.settings.receiveMessage(message);
            this.settings.pushSetted = true;
        })
    }

    updatePushSetting() {

        if (document.URL.startsWith('http')) return;

        // check if push stopped
        this.jPushPlugin.isPushStopped().then(res => {
            // alert('jpush state:' + res);
            if (res == 0) {
                this.initJPush();
            }
        });

        let pushSetting = this.settings.getUserSetting('push_setting') || {};
        let tags = [];

        if (this.settings.isLogged) {
            tags.push('login');
        }

        // check background or foreground
        if (!this.settings.getStorage('background')) {
            tags.push('foreground');
        }

        if (this.settings.getStorage('systemNotification', 'yes') == 'yes') {
            tags.push('systemNotification');
        }

        if (this.settings.getStorage('orderNotification', 'yes') == 'yes') {
            tags.push('orderNotification');
        }

        if (this.settings.getStorage('platform') != 'browser') {
            this.jPushPlugin.setTags(tags).then(() => {
                console.log('push setting is updated');
                /*alert(JSON.stringify(tags))*/
            });
        }
    }

    getMessageEvent():Observable<any> {
        return this.messageObserver
    }

}
