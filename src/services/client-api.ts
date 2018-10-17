import {Injectable} from '@angular/core';
import {Api} from "./api.service";


declare var $: any;

@Injectable()
export class ClientApiService extends Api {

    ///// Login

    login(phone, password) {
        return this.post('/login', {
            email: phone,
            password: password,
            device_id: this.settings.device_id,
        })
    }

    //////////////// Register from here

    sendVerifyCode(phoneNumber, passwordRest?) {
        return this.post('/register/code/send', {
            phone: phoneNumber,
            password_reset: passwordRest || 0
        });
    }

    verifyCode(phoneNumber, code) {
        return this.post('/register/code/verify', {
            phone: phoneNumber,
            sms_code: code
        });
    }

    register(phoneNumber, password) {
        return this.post('/register', {
            phone: phoneNumber,
            password: password
        });
    }

    forgetPassword(phoneNumber, password) {
        return this.post('/login/reset-password', {
            phone: phoneNumber,
            password: password
        })
    }

    registerCustomer(info) {
        console.log(info);
        return this.post('/register/customer', {
            name: info.name,
            phone: this.settings.phoneNumber,
            alias: info.alias,
            birthday: info.birthday,
            address: info.address,
            photo: info.photo,
            contact_number: info.contact_number,
            idcard_front: info.idcard_front,
            idcard_back: info.idcard_back,
            idcard_number: info.idcard_number,
            latitude: info.latitude,
            longitude: info.longitude,
            device_id: this.settings.device_id
        })
    }

    registerBusiness(info) {
        console.log(info);
        return this.post('/register/business', {
            name: info.name,
            phone: this.settings.phoneNumber,
            type: info.type,
            logo: info.logo,
            address: info.address,
            service_number: info.service_number,
            business_license: info.business_license,
            applicant_name: info.applicant_name,
            contact_number: info.contact_number,
            idcard_front: info.idcard_front,
            idcard_back: info.idcard_back,
            idcard_number: info.idcard_number,
            introduction: info.introduction,
            latitude: info.latitude,
            longitude: info.longitude,
            device_id: this.settings.device_id
        })
    }

    registerServicer(info) {
        console.log(info);
        return this.post('/register/servicer', {
            name: info.name,
            alias: info.alias,
            photo: info.photo,
            phone: this.settings.phoneNumber,
            type: info.type,
            birthday: info.birthday,
            address: info.address,
            contact_number: info.contact_number,
            certification: info.certification,
            period: info.period,
            driver_type: info.driver_type,
            company_name: info.company_name,
            company_duty: info.company_duty,
            idcard_front: info.idcard_front,
            idcard_back: info.idcard_back,
            idcard_number: info.idcard_number,
            latitude: info.latitude,
            longitude: info.longitude,
            device_id: this.settings.device_id
        })
    }


    editBank(info) {
        console.log(info);
        return this.post('/register/bankaccount/' + this.settings.userType + '/' + this.settings.userId, {
            account_type: info.account_type,
            account_name: info.account_name,
            account_cardno: info.account_cardno,
            bank_name: info.bank_name,
            account_bank_name: info.account_bank_name,
            account_location: info.account_location
        })
    }

    //*signup end//////


//////***************  CUSTOMER SIDE   *******************  //////

    //   mortar

    loadMortarKind() {
        return this.get('/mortar/kind/search');
    }

    loadMortarType() {
        return this.get('/mortar/type/search');
    }

    loadMortartRate() {
        return this.get('/mortar/rate/search');
    }

    loadMortarUse() {
        return this.get('/mortar/use/search');
    }

    submitMortar(info) {
        console.log(info);
        return this.post('/orders/M/add', {
            customer_id: this.settings.member_id,
            mortar_kind: info.selected_mortarKind,
            mortar_type: info.selected_mortarType,
            mortar_rate: info.selected_mortarRate,
            mortar_use: info.selected_mortarUse,
            amount: info.amount,
            budget: info.budget,
            note: info.note,
            contact_number: info.contact_number,
            address: info.address,
            latitude: info.latitude,
            longitude: info.longitude
        });
    }

    //  balance

    loadBalanceKind() {
        return this.get('/balance/kind/search');
    }

    loadBalanceType() {
        return this.get('/balance/type/search');
    }

    loadBalanceSubType() {
        return this.get('/balance/subtype/search');
    }

    loadBalanceConfig(kind, type, subtype) {
        return this.get('/balance/configuration/search', {
            kind: kind,
            type: type,
            subtype: subtype
        })
    }

    submitBalance(info) {
        console.log(info);
        return this.post('/orders/B/add', {
            customer_id: this.settings.member_id,
            order_kind: info.order_kind,
            balance_kind: info.selected_balanceKind,
            balance_type: info.selected_balanceType,
            balance_subtype: info.selected_balanceSubType,
            balance_config: info.selected_balanceConfig,
            amount: info.amount,
            budget: info.budget,
            note: info.note,
            contact_number: info.contact_number,
            address: info.address,
            latitude: info.latitude,
            longitude: info.longitude
        });
    }


    //// order-status

    loadOrderMortar() {
        var params = {
            status: "0, 1, 2",
            condition: "100",
            customer_id: this.settings.member_id
        };
        return this.get('/orders/get', params);
    }

    loadOrderBalance() {
        var params = {
            status: "0, 1, 2",
            condition: "011",
            customer_id: this.settings.member_id
        };
        return this.get('/orders/get', params);

    }

    loadOrderAll() {
        var params = {
            status: "0, 1, 2",
            condition: "111",
            customer_id: this.settings.member_id
        };
        return this.get('/orders/get', params);
    }

    deleteOrder(kind, id) {
        return this.post('/orders/' + kind + '/' + id + '/delete', {});
    }

    loadOrderDetail(kind, id) {
        return this.get('/orders/detail/' + kind + '/' + id);
    }


    loadTemplate() {
        return this.get('/contract/template/get', {});
    }


    //////////// confirm order

    loadConfirmOrder() {

        var params = {
            status: "2,3",
            condition: "110",
            customer_id: this.settings.member_id
        };

        return this.get('/orders/get', params);
    }

    makeContract(kind, id) {
        console.log(kind + id);
        return this.post('/orders/substatus/' + kind + '/' + id + '/1', {});
    }


    //// pay order

    loadPayOrder() {
        var params = {
            status: "3",
            condition: "111",
            customer_id: this.settings.member_id
        };

        return this.get('/orders/get', params);
    }

    pay(kind, id) {
        console.log(kind + id);
        return this.post('/orders/substatus/' + kind + '/' + id + '/1', {});
    }


    /////  pending order

    loadPendingOrder() {
        var params = {
            status: '4',
            condition: '111',
            customer_id: this.settings.member_id
        };

        return this.get('/orders/get', params);
    }

    demandOrder(info) {
        console.log(info);
        return this.post('/delivery/orders/add', {
            customer_id: this.settings.member_id,
            order_id: info.id,
            order_kind: info.order_kind.substr(0, 1),
            order_no: info.order_no,
            contract_no: info.contract_no,
            delivery_amount: info.delivery_amount,
            delivery_date: info.delivery_date,
            contact_number: info.contact_number,
            address: info.address,
            latitude: info.latitude,
            longitude: info.longitude
        })
    }

    loadDeliveryOrders(order_id, condition) {
        var params = {
            customer_id: this.settings.member_id,
            order_id: order_id,
            status: 0,
            condition: condition
        };
        return this.get('/delivery/orders/get', params);
    }

    loadReceiveOrders(order_id, condition) {
        console.log(order_id);
        var params = {
            customer_id: this.settings.member_id,
            order_id: order_id,
            status: 1,
            condition: condition
        };

        return this.get('/delivery/orders/get', params);
    }

    loadEvaluationOrders(order_id, condition) {
        console.log(order_id);
        var params = {
            customer_id: this.settings.member_id,
            order_id: order_id,
            status: '2, 3',
            condition: condition
        };
        return this.get('/delivery/orders/get', params);
    }

    loadMyDelaveryOrders() {
        var params = {
            status: '6',
            condition: '010',
            customer_id: this.settings.member_id
        };

        return this.get('/orders/get', params);
    }

    /////////// leave feedback

    leaveFeedback(info) {

        console.log(info);

        var params = {
            customer_id: this.settings.member_id,
            order_id: info.order_id,
            delivery_id: info.delivery_id,
            business_id: info.business_id,
            servicer_id: info.servicer_id,
            business_marks: info.business_marks,
            business_content: info.business_content,
            business_image: info.business_image,
            servicer_marks: info.servicer_marks,
            servicer_content: info.servicer_content,
            servicer_image: info.servicer_image,
        }

        return this.post('/delivery/feedback/save', params);
    }

    leaveRepairerFeedBak(info) {
        console.log(info);

        var params = {
            customer_id: this.settings.member_id,
            order_id: info.order_id,
            delivery_id: info.delivery_id,
            business_id: info.business_id,
            servicer_id: info.servicer_id,
            servicer_marks: info.servicer_marks,
            servicer_content: info.servicer_content,
            servicer_image: info.servicer_image
        }

        return this.post('/order/repairer/feedback/save', params);
    }

    leaveBusinesserFeedBak(info) {

        var params = {
            customer_id: this.settings.member_id,
            order_id: info.order_id,
            delivery_id: info.delivery_id,
            business_id: info.business_id,
            servicer_id: info.servicer_id,
            servicer_marks: info.servicer_marks,
            servicer_content: info.servicer_content,
            servicer_image: info.servicer_image
        }

        return this.post('/order/businesser/feedback/save', params);
    }

    skipRepairerFeedback(id) {
        return this.post('/order/repairer/feedback/skip', {
            order_id: id
        })
    }

    skipDeliveryOrderFeedback(id) {
        return this.post(' /delivery/feedback/skip', {
            delivery_id: id
        })
    }

    hasFeedBack(order_id, servicer_id) {
        return this.get('/order/businesser/feedback/count', {
            order_id: order_id,
            servicer_id: servicer_id,
            order_kind: 'B'
        })
    }

    ///load Complete orders

    loadCompleteOrders() {
        var params = {
            status: "5,6",
            condition: "111",
            customer_id: this.settings.member_id
        };

        return this.get('/orders/get', params);
    }

    submitQrcode(qrcode) {
        return this.post('/qrcode/verify', {qrCode: qrcode});
    }

    getBusiness() {
        return this.get('/business/getAll', {});
    }

    getDITrackOrders() {              //////   Get Driver, Installer Trackorders

        var params;

        if (this.settings.userRole == 'customer') {

            params = {
                condition: 110,
                status: 1,
                sub_status: 1,
                customer_id: this.settings.member_id
            }

        } else {
            params = {
                condition: 110,
                status: 1,
                sub_status: 1,
                business_id: this.settings.member_id
            }
        }

        return this.get('/delivery/orders/get', params);
    }

    getRTrackOrders() {                   //////   Get Repairer Trackorders

        let params = {
            condition: '001',
            status: 4,
            sub_status: 3,
            customer_id: this.settings.member_id
        }

        return this.get('/orders/get', params);
    }

    getBTrackOrders() {                 //////   Get Businesser Trackorders

        let params = {
            condition: '010',
            status: 0,
            sub_status: 3,
            customer_id: this.settings.member_id
        }

        return this.get('/orders/get', params);
    }

    getBank() {

        return this.get('/bank/get', {});

    }

    payOffline(info) {
        console.log(info)
        return this.post('/transaction/offlinePay', {
            description: info.description,
            order_id: info.order_id,
            order_kind: info.order_kind,
            amount: info.amount,
            bank: info.bank
        })
    }

    payOnline(info) {
        console.log(info)
        return this.post('/transaction/onlinePay', {
            description: info.description,
            order_id: info.order_id,
            order_kind: info.order_kind,
            amount: info.amount,
        })
    }

    getPayList(order_id, order_kind) {
        return this.get('/transaction/getPayList', {
            user_id: this.settings.userId,
            order_id: order_id,
            order_kind: order_kind
        })
    }

    getFreight(order_id) {
        return this.get('/freight/get', {
            order_id: order_id
        })
    }

    confirmFreight(order_id) {
        return this.post('/freight/confirm', {
            order_id: order_id
        })
    }


////////////////**********  End Customer side ************////////////////

///////////////***********   business side    *********////////////////


    //// load pending Orders

    loadFPendingOrders() {

        var condition = this.settings.userType == 'M' ? '100' : '010';
        console.log(this.settings.userType);
        var params = {
            status: '0',
            condition: condition,
            business_id: this.settings.member_id
        };

        return this.get('/delivery/orders/get', params);
    }

    acceptFOrder(id) {
        return this.post('/orders/allocation/business/accept', {
            id: id,
        });
    }

    refuseFOrder(id) {
        return this.post('/delivery/orders/substatus/' + id + '/2', {});
    }


    //// load Sending Orders

    loadFSendingOrders() {

        var condition = this.settings.userType == 'M' ? '100' : '010';
        console.log(this.settings.userType);
        var params = {
            status: '1',
            condition: condition,
            business_id: this.settings.member_id
        };

        return this.get('/delivery/orders/get', params);
    }

    loadFCompleteOrders() {
        var condition = this.settings.userType == 'M' ? '100' : '010';
        console.log(this.settings.userType);
        var params = {
            status: '2, 3',
            condition: condition,
            business_id: this.settings.member_id
        };

        return this.get('/delivery/orders/get', params);
    }

    getCoupons(id) {
        return this.get('/premium/get', {
            business_id: id,
        });
    }

    publishCoupon(info) {

        let params = {
            business_id: this.settings.member_id,
            photo: info.photo,
            download: info.download,
            amount: info.amount,
            range: info.range,
            condition: info.condition
        }

        return this.post('/premium/save', params);
    }


///////////**************       End Business side   **********//////////////

//////////////***************     Servicer side   ************//////////////////////

    /// load orders

    loadSOrders() {

        console.log(this.settings.latitude);
        console.log(this.settings.longitude);

        var params = {
            allocation_type: this.settings.userType,
            latitude: this.settings.latitude,
            longitude: this.settings.longitude,
        }

        return this.get('/orders/allocation', params);
    }

    acceptSOrder(id) {
        return this.post('/orders/allocation/accept/' + id, {});
    }

    loadSPendingOrders() {

        var userType = this.settings.userType;
        var url, status, condition;
        switch (userType) {
            case 'D':
                url = '/delivery/orders/get';
                status = '1';
                condition = '100';
                break;
            case 'B':
                url = '/orders/get';
                status = '0';
                condition = '010';
                break;
            case 'I':
                url = '/delivery/orders/get';
                status = '1';
                condition = '010';
                break;
            case 'R':
                url = '/orders/get';
                status = '4';
                condition = '001';
                break;
        }

        var params = {
            servicer_id: this.settings.member_id,
            status: status,
            condition: condition
        }
        return this.get(url, params);
    }

    startSService(id) {
        if (this.settings.userType == 'B' || this.settings.userType == 'R') {
            return this.post('/orders/substatus/B/' + id + '/3', {});
        } else {
            return this.post('/delivery/orders/substatus/' + id + '/1', {});
        }

    }

    getSQrcode(id) {
        return this.get('/qrcode/orders/get', {
            servicer_id: this.settings.member_id,
            order_id: id
        })
    }

    allowBalance(id) {
        return this.post('/orders/allow', {
            kind: 'B',
            id: id
        })
    }

    rejectBalance(id) {
        return this.post('/orders/reject', {
            kind: 'B',
            id: id
        })
    }

    loadSCompleteOrders() {
        var userType = this.settings.userType;
        var url, status, condition;
        switch (userType) {
            case 'D':
                url = '/delivery/orders/get';
                status = '2, 3';
                condition = '100';
                break;
            case 'B':
                url = '/orders/get';
                status = '1, 2, 3, 4, 5, 6';
                condition = '010';
                break;
            case 'I':
                url = '/delivery/orders/get';
                status = '2, 3';
                condition = '010';
                break;
            case 'R':
                url = '/orders/get';
                status = '5, 6';
                condition = '001';
                break;
        }

        var params = {
            servicer_id: this.settings.member_id,
            status: status,
            condition: condition
        }
        return this.get(url, params);
    }

    uploadTrackLocation(info) {
        console.log(info);
        var params = {
            AK: info['Ak'],
            service_id: info['Service_id'],
            entity_name: info['Entity_name'],
            latitude: info['Latitude'],
            longitude: info['Longitude'],
            loc_time: info['Loc_time'],
            coord_type_input: info['Coord_type_input']
        }

        return this.postBaidu('http://yingyan.baidu.com/api/v3/track/addpoint', params);
    }

    endService(id) {
        return this.post('/qrcode/manually/verify', {
            order_id: id
        })
    }

//// ***************** End Servicer side   *******************///////////////

///********************   Common Side   **************************///

    getContactNumber(id) {
        return this.get('/phonenumber/' + id, {})
    }

    /// homepage

    getUserInfo() {
        switch (this.settings.userRole) {
            case 'customer':
                return this.get('/customers/detail/' + this.settings.member_id, {});
            case 'business':
                return this.get('/business/detail/' + this.settings.member_id, {});
            case 'servicer':
                return this.get('/servicers/detail/' + this.settings.member_id, {});
        }
    }

    getUserDetail(userRole, id) {
        switch (userRole) {
            case 'customer':
                return this.get('/customers/detail/' + id, {});
            case 'business':
                return this.get('/business/detail/' + id, {});
            case 'servicer':
                return this.get('/servicers/detail/' + id, {});
        }
    }

    getSystemNotification() {
        return this.get('/notifications/search', {});
    }

    getBalance() {
        return this.get('/transaction/getBalance', {
            user_id: this.settings.userId
        })
    }

    getEvaluations(min, max) {

        let params = {
            min_marks: min,
            max_marks: max,
        }

        if (this.settings.userRole == 'business') params['business_id'] = this.settings.member_id;
        if (this.settings.userRole == 'servicer') params['servicer_id'] = this.settings.member_id;

        console.log(params);

        return this.get('/feedback/get', params)
    }

    getPremium() {

        return this.get('/premium/get', {});

    }


    loadAdvertise() {
        return this.get('/advertise/search', {});
    }

    resetPassword(new_password, old_password) {
        return this.post('/account/change-password', {
            new: new_password,
            old: old_password
        })
    }

    resetCurrencyPassword(user_password, new_password) {
        return this.post('/account/change-currency-password', {
            user_password: user_password,
            new: new_password
        })
    }

    changeWorkState(allow) {
        console.log(allow);
        if (this.settings.userRole == 'business') {
            return this.post('/business/update/' + this.settings.member_id, {
                show_allow: allow,
            })
        } else {
            return this.post('/servicers/update/' + this.settings.member_id, {
                show_allow: allow,
            })
        }
    }

    getBusinessData(from_date, to_date) {
        return this.get('/statistics/business/order', {
            business_id: this.settings.member_id,
            from_date: from_date,
            to_date: to_date
        })
    }

    getServicerData(from_date, to_date) {
        return this.get('/statistics/servicer/order', {
            servicer_id: this.settings.member_id,
            from_date: from_date,
            to_date: to_date
        })
    }

    getServicerIncome(from_date, to_date) {
        return this.get('/statistics/servicer/transaction', {
            servicer_id: this.settings.member_id,
            from_date: from_date,
            to_date: to_date
        })
    }

    getFeedbackCount() {

        var params: any;

        if (this.settings.userRole == 'business') {
            params = {
                'business_id': this.settings.member_id
            }
        } else if (this.settings.userRole == 'servicer') {
            params = {
                'servicer_id': this.settings.member_id
            }
        }


        return this.get('/feedback/count', params);

    }


    ///////////////////

    setLocation() {

        this.getLocation().subscribe(res => {
            console.log(res);
            if (res.status == 0) {
                console.log('success');
                this.settings.longitude = res.content.point.x;
                this.settings.latitude = res.content.point.y;

                console.log(this.settings.longitude + ':' + this.settings.latitude)
            }
        })
    }

    getLocation() {
        return this.getBaidu('http://api.map.baidu.com/location/ip?ak=' + this.settings.mapApi + '&coor=bd09ll');
    }

    setLocationByGPS() {
        console.log('location');

        this.geolocation.getCurrentPosition().then((resp) => {

            this.settings.latitude = resp.coords.latitude;
            this.settings.longitude = resp.coords.longitude;

            console.log(this.settings.longitude + ":" + this.settings.latitude);

            this.setCity(resp.coords.longitude, resp.coords.latitude);


        }).catch((error) => {
            alert('location error')
        });
    }

    setCity(lng, lat) {

        var _this = this;
        $.ajax({
            method: 'GET',
            url: 'http://api.map.baidu.com/geocoder/v2/',
            data: {
                ak: this.settings.mapApi,
                location: lat + ',' + lng,
                output: 'json'
            }
        }).then(function (res) {
            res = JSON.parse(res);
            _this.settings.city = res.result.addressComponent.city;
            console.log(_this.settings.city);
        })
    }

    getAddress(lng, lat) {
        return $.ajax({
            method: 'GET',
            url: 'http://api.map.baidu.com/geocoder/v2/',
            data: {
                ak: this.settings.mapApi,
                location: 39 + ',' + 112,
                /*location: lat + ',' + lng,*/
                output: 'json'
            }
        })
    }

    getLocationByGPS() {
        return this.geolocation.getCurrentPosition();
    }

    closeAvailable() {
        return this.get('/account/delete/possible', {});
    }

    closeUser() {
        return this.post('/account/delete', {});
    }


    /*xmlToJson(xml) {

     // Create the return object
     var obj = {};

     if (xml.nodeType == 1) { // element
     // do attributes
     if (xml.attributes.length > 0) {
     obj["@attributes"] = {};
     for (var j = 0; j < xml.attributes.length; j++) {
     var attribute = xml.attributes.item(j);
     obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
     }
     }
     } else if (xml.nodeType == 3) { // text
     obj = xml.nodeValue;
     }

     // do children
     if (xml.hasChildNodes()) {
     for (var i = 0; i < xml.childNodes.length; i++) {
     var item = xml.childNodes.item(i);
     var nodeName = item.nodeName;
     if (typeof(obj[nodeName]) == "undefined") {
     obj[nodeName] = this.xmlToJson(item);
     } else {
     if (typeof(obj[nodeName].push) == "undefined") {
     var old = obj[nodeName];
     obj[nodeName] = [];
     obj[nodeName].push(old);
     }
     obj[nodeName].push(this.xmlToJson(item));
     }
     }
     }
     return obj;
     };
     */
}