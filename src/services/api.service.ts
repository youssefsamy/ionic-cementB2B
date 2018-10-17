import {Injectable} from '@angular/core';
import {Http, Headers, URLSearchParams} from '@angular/http';
import {Observable} from "rxjs";
import {SettingsService} from "./settings.service";
import {Events} from "ionic-angular";
import {Geolocation} from '@ionic-native/geolocation';
import {FileTransfer, FileTransferObject} from "@ionic-native/file-transfer";
import {File} from '@ionic-native/file';

@Injectable()
export class Api {

    fileTransfer: FileTransferObject;

    constructor(protected http: Http,
                public settings: SettingsService,
                private events: Events,
                public geolocation: Geolocation,
                private transfer: FileTransfer,
                private file: File,) {
        this.fileTransfer = this.transfer.create();
    }


    createAuthorizationHeader(headers: Headers) {
        headers.append('Authorization', 'Bearer ' + this.settings.getUserSetting('token'));
        headers.append('Access-Control-Allow-Origin', '*');
    }

    get(url, data?) {

        let headers = new Headers();
        this.createAuthorizationHeader(headers);

        let params: URLSearchParams = new URLSearchParams();
        if (data) {
            for (var key in data) {
                params.set(key, data[key]);
            }
        }

        return this.http.get(this.settings.apiUrl + url, {
            headers: headers,
            search: params
        }).map(res => res.json()).catch(this.handleError);
    }

    post(url, data) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);

        // append token

        return this.http.post(this.settings.apiUrl + url, data, {
            headers: headers
        }).map(res => res.json()).catch(this.handleError);
    }

    postBaidu(url, data) {
        return this.http.post(url, data, {}).map(res => res.json()).catch(this.handleError);
    }

    getBaidu(url) {
        return this.http.get(url, {}).map(res => res.json()).catch(this.handleError);
    }


    uploadImage(file) {
        let headers = new Headers();

        this.createAuthorizationHeader(headers);
        headers.append('Accept', 'application/json');

        var formData = new FormData();

        formData.append("file", file, file.name);

        return this.http.post(this.settings.apiUrl + '/upload/image', formData, {
            headers: headers
        }).map(res => this.settings.imageUrl + res.json().url).catch(this.handleError);
    }

    uploadPhoto(data) {
        return this.post('/upload/imageContent', {
            image: data
        })
    }

    protected handleError(error: any) {
        if ((error.status == 401) && !error.url.endsWith('/login')) {

            // document.location.href = '/login';
            this.events.publish('logout', {});
        }
        // In a real world app, you might use a remote logging infrastructure

        return Observable.throw(error);
    }

    compareAddress(addr, sAddr) {
        if (addr.includes(sAddr)) return true;
        return false;
    }


    downloadFile(url) {
        return this.fileTransfer.download(url, this.file.dataDirectory + 'template.txt')
    }

    getDate(before = 0) {

        let today = new Date();
        let date = new Date(today.getTime() - (before * 24 * 60 * 60 * 1000));

        var d = date.getDate();
        var m = date.getMonth() + 1; //January is 0!

        var mm, dd;

        var yyyy = date.getFullYear();
        if (d < 10) {
            dd = '0' + d;
        } else {
            dd = d;
        }
        if (m < 10) {
            mm = '0' + m;
        } else {
            mm = m;
        }

        return yyyy + '-' + mm + '-' + dd;
    }

    getImageBase64String(url) {
        console.log(url);
        return new Promise((resolve: any, reject: any) => {
            // Convert image to base64 string
            var canvas: any = document.createElement('CANVAS'),
                ctx: any = canvas.getContext('2d'),
                img: any = new Image;

            img.crossOrigin = 'Anonymous';

            img.onload = () => {
                var dataURL: any = null;
                canvas.height = img.height;
                canvas.width = img.width;
                ctx.drawImage(img, 0, 0);

                // set image quality
                dataURL = canvas.toDataURL('image/jpeg', 1.0);
                canvas = null;
                resolve(dataURL);
            };

            img.onerror = (err) => {
                console.log('getImageBase64String - error', err);
                reject(err);
            };
            img.src = url;
        });
    }
}

