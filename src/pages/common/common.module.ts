import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {BaiduMapModule} from "angular2-baidu-map";

import {MapDialog} from "./MapDialog/mapdialog";
import {CompanyBankPage} from "./company-bank/comapny-bank";
import {SelectBankPage} from "./select-bank/select-bank";
import {PersonalBankPage} from "./personal-bank/personal-bank";
import {EditBankPage} from "./edit-bank/edit-bank";
import {CallModalPage} from "./call-modal/call-modal";
import {QrcodeModalPage} from "./qrcode-modal/qrcode-modal";
import {QRCodeModule} from "angular2-qrcode";
import {TrackMapPage} from "./track-map/track-map";
import {ViewDeliveryOrderPage} from "./view-delivery-order/view-delivery-order";

import {Geolocation} from "@ionic-native/geolocation";
import {SelectSoundPage} from "./select-sound/select-sound";
import {FundManagementModule} from "./fund-management/fund-management.module";
import {DataAnalyticsPage} from "./data-analytics/data-analytics";
import {AdvertisePage} from "./advertise/advertise";
import {SelectTrackPage} from "./select-track/select-track";
import {ResetLoginPasswordPage} from "./reset-login-passwd/reset-login-passwd";
import {WithdrawPage} from "./withdraw/withdraw";
import {ResetCurrencyPasswordPage} from "./reset-currency-passwd/reset-currency-passwd";
import {PaySuccessPage} from "./pay-success-page/pay-success";
import {AboutUsPage} from "./aboutus/aboutus";
import {ManageBankAccountPage} from "./manage-bank-account/manage-bank-account";

/**
 * Created by Tall Prince on 2/6/2017.
 */
@NgModule({
    imports: [
        IonicModule,
        BaiduMapModule,
        QRCodeModule,
        FundManagementModule

    ],
    declarations: [
        MapDialog,
        CompanyBankPage,
        SelectBankPage,
        PersonalBankPage,
        EditBankPage,
        CallModalPage,
        QrcodeModalPage,
        TrackMapPage,
        ViewDeliveryOrderPage,
        SelectSoundPage,
        DataAnalyticsPage,
        AdvertisePage,
        SelectTrackPage,
        ResetLoginPasswordPage,
        WithdrawPage,
        ResetCurrencyPasswordPage,
        PaySuccessPage,
        AboutUsPage,
        ManageBankAccountPage
    ],
    entryComponents: [
        MapDialog,
        CompanyBankPage,
        SelectBankPage,
        PersonalBankPage,
        EditBankPage,
        CallModalPage,
        QrcodeModalPage,
        TrackMapPage,
        ViewDeliveryOrderPage,
        SelectSoundPage,
        DataAnalyticsPage,
        AdvertisePage,
        SelectTrackPage,
        ResetLoginPasswordPage,
        WithdrawPage,
        ResetCurrencyPasswordPage,
        PaySuccessPage,
        AboutUsPage,
        ManageBankAccountPage
    ],
    providers: [
        Geolocation
    ],
    exports: [
    ]
})
export class CommonModule {}