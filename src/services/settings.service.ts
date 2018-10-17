import { Injectable } from '@angular/core';
import {NotificationService} from "./notification.service";

@Injectable()
export class SettingsService {

    // public apiUrl = "http://39.106.116.31/api";
    // public imageUrl = "http://39.106.116.31";

    public apiUrl = 'http://apolloyr.kepotech.net/b2b_server.api/public/api';
    public imageUrl = 'http://apolloyr.kepotech.net/b2b_server.api/public';

    //////user setting
    public user;
    public phoneNumber;
    public userId;
    public userType;
    public userRole;
    public userBankType;
    public userName;
    public member_id;
    public isLogged;
    public password;
    ////user setting end

    storagePrefix = 'cementb2b_';

    /// Baidu map setting
    public mapApi = 'GKYh4lgPWLeXx4rERwYqiiB2r73FmRip'; /////'TLURinKOxBbwDNoSKmVh9jOqHmrH6UAG'
    public mapZoom = 15;
    public mapService_id = 149070;

    public longitude;
    public latitude;
    public city;

    public payType;

    /// system infor setting
    public defaultErrorSound = 'opener';
    public defaultSuccessSound = 'awesome';

    public tabBadge: number = 2;

    public device_id;

    public pushSetted = false;


    public badge = {
        confirm: 0,
        pay: 0,
        pending: 0,
        complete: 0,
        business_first: 0,
        business_second: 0,
        business_third: 0,
        servicer_first: 0,
        servicer_second: 0,
        servicer_third: 0,
        notify: 0
    }

    constructor () {
        this.user = {};
    }

    initUserSetting() {
        this.phoneNumber = '';
        this.userId = '';
        this.userType = '';
        this.userRole = '';
        this.userBankType = '';
        this.member_id = '';
    }

    setLoggedInfo(info) {
        this.userId = info.id;
        this.userName = info.name;
        this.phoneNumber = info.phone;
        this.userRole = info.role;
        this.member_id = info.member_id;
        this.userType = info.member_type;
        this.userBankType = info.bank_type;
    }

    getWarningSound() {
        return this.getStorage('warningSound', this.defaultErrorSound);
    }

    setWarningSound(sId) {
        this.setStorage('warningSound', sId);
    }

    getWorkState() {
        return this.getStorage('workState', 'yes');
    }

    setWorkState(state) {
        this.setStorage('workState', state);
    }

    getSuccessSound() {
        return this.getStorage('successSound', this.defaultSuccessSound);
    }


    getUserSetting(name, defaultVal?) {
        return name ? (this.user[name] || defaultVal) : this.user;
    }

    getStorage (key, defaultVal?) {
        return window.localStorage[this.storagePrefix + this.userId + key] ?
            JSON.parse(window.localStorage[this.storagePrefix + this.userId + key]) : defaultVal || undefined;
    };

    setStorage (key, val) {
        window.localStorage.setItem(this.storagePrefix + this.userId + key, JSON.stringify(val));
    }

    removeStorage (key) {
        window.localStorage.removeItem(this.storagePrefix + this.userId + key);
    }

    receiveMessage(message) {

        switch (message.kind) {
            case 'allow':
                this.badge.confirm++; break;
            case 'contract':
                this.badge.pay++; break;
            case 'prepayment':
                this.badge.pending++; break;
            case 'process':
                this.badge.complete++; break;
            case 'repair_allow':
                this.badge.pay++; break;
            case 'new_delivery':
                this.badge.business_first++; break;
            case 'servicer_accept':
                this.badge.business_second++;
                this.badge.servicer_second++;break;
            case 'verify':
                this.badge.business_third++; break;
            case 'allocation':
                this.badge.servicer_first++;break;
            case 'sevicer_verify':
                this.badge.servicer_third++;break;
            case 'system_notification':
                this.badge.notify = 1; break;
        }
    }


}