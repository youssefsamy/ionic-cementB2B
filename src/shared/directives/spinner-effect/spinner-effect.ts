import {Directive, ElementRef, Input, OnChanges} from "@angular/core";
/**
 * Created by Tall Prince on 1/7/2017.
 */

declare var $:any;
@Directive({
    selector: '[spinnerEffect]'
})
export class SpinnerEffectDirective implements OnChanges {

    @Input('spinnerEffect') active: boolean;

    constructor(private el: ElementRef) {
        $(el.nativeElement).addClass('spinner-effect');
        $(el.nativeElement).append('<div class="spinner-mask"><div class="spinner"><i class="fa fa-circle-o-notch fa-spin fa-fw"></i></div></div>');
    }

    ngOnChanges(changes: any): void {
        if (this.active) {
            $(this.el.nativeElement).find('.spinner-mask').show();
        } else {
            $(this.el.nativeElement).find('.spinner-mask').hide();
        }
    }

}