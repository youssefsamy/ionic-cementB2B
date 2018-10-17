import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {AuthModule} from "./auth/auth.module";
import {SupportModule} from "./support/support.module";
import {FactoryModule} from "./factory/factory.module";
import {ClientModule} from "./client/client.module";
import {CommonModule} from "./common/common.module";

/**
 * Created by Tall Prince on 2/6/2017.
 */
@NgModule({
    imports: [
        SharedModule,
        AuthModule,
        SupportModule,
        FactoryModule,
        ClientModule,
        CommonModule
    ],
    declarations: [
    ],
    entryComponents: [
    ],
    providers: [
    ],
    exports: [

    ]
})
export class PagesModule { }