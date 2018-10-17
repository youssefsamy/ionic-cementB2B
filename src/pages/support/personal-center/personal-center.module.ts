import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {PersonalCenterHome} from "./personal-center-home/personal-center-home";
import {SettingHome} from "./setting/setting.home";
import {UserInfo} from "./user-info/user-info";
import {Margin} from "./margin/margin";
import {Recharge} from "./recharge/recharge";

/**
 * Created by Tall Prince on 2/6/2017.
 */
@NgModule({
    imports: [
        IonicModule,
    ],
    declarations: [
        PersonalCenterHome,
        SettingHome,
        UserInfo,
        Margin,
        Recharge
    ],
    entryComponents: [
        PersonalCenterHome,
        SettingHome,
        UserInfo,
        Margin,
        Recharge
    ],
    providers: [
    ],
    exports: [
    ]
})
export class PersonalCenterModule { }
