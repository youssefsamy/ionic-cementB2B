import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {ClientCenterHomePage} from "./mine-home/mine-home";

/**
 * Created by Tall Prince on 2/6/2017.
 */
@NgModule({

    imports: [
        IonicModule,
    ],
    declarations: [
        ClientCenterHomePage
    ],
    entryComponents: [
        ClientCenterHomePage
    ],
    providers: [
    ],
    exports: [
    ]
})
export class ClientCenterModule { }
