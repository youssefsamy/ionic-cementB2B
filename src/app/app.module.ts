import { NgModule, ErrorHandler } from '@angular/core';
import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {HttpModule, JsonpModule} from "@angular/http";
import {PagesModule} from "../pages/pages.module";
import {ClientApiService} from "../services/client-api";
import {Api} from "../services/api.service";
import {SettingsService} from "../services/settings.service";
import {NotificationService} from "../services/notification.service";
import {MobileAccessibility} from "@ionic-native/mobile-accessibility";
import {NativeAudio} from "@ionic-native/native-audio";
import {SoundsService} from "../services/sounds.service";
import {FileChooser} from "@ionic-native/file-chooser";
import * as ionicGalleryModal from 'ionic-gallery-modal';
import {BackgroundMode} from "@ionic-native/background-mode";
import {CallNumber} from "@ionic-native/call-number";

import {FileTransfer } from "@ionic-native/file-transfer";
import { File } from '@ionic-native/file';
import {TrackService} from "../services/track.service";
import {DeviceService} from "../services/device.service";
import {IonJPushModule} from "ionic2-jpush";
import {BackgroundGeolocation} from "@ionic-native/background-geolocation";
import { Geolocation } from '@ionic-native/geolocation';
import {ImagePicker} from "@ionic-native/image-picker";
import { Camera, CameraOptions } from '@ionic-native/camera';
import {Crop} from "@ionic-native/crop";
import {AppMinimize} from "@ionic-native/app-minimize";
import {BaiduMapModule} from "angular2-baidu-map";


@NgModule({
    declarations: [
        MyApp,
    ],
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        PagesModule,
        IonJPushModule,
        BaiduMapModule,
        ionicGalleryModal.GalleryModalModule,
        IonicModule.forRoot(MyApp, {
            backButtonText: '',
            iconMode: 'ios',
            mode: 'ios',
            pageTransition: 'ios-transition'
        }),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Api,
        SettingsService,
        ClientApiService,
        NotificationService,
        DeviceService,
        TrackService,
        MobileAccessibility,
        NativeAudio,
        SoundsService,
        FileChooser,
        Geolocation,
        BackgroundGeolocation,
        CallNumber,
        BackgroundMode,
        FileTransfer,
        ImagePicker,
        Camera,
        Crop,
        File,
        AppMinimize,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: ionicGalleryModal.GalleryModalHammerConfig,
        },
    ]
})
export class AppModule {}
