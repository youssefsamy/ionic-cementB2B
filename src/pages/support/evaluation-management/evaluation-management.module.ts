import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {EvaluationHome} from "./evaluatoin-home/evaluation-home";
import {Complaint} from "./complaint/complaint";
import {Praise} from "./praise/praise";
import {Ionic2RatingModule} from "ionic2-rating";
/**
 * Created by Tall Prince on 2/6/2017.
 */
@NgModule({
    imports: [
        IonicModule,
        Ionic2RatingModule
    ],
    declarations: [
        EvaluationHome,
        Complaint,
        Praise
    ],
    entryComponents: [
        EvaluationHome,
        Complaint,
        Praise
    ],
    providers: [
    ],
    exports: [
    ]
})
export class EvaluationManagementModule { }

