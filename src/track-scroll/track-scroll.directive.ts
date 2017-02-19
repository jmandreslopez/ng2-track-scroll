/**
 * Created by Jose Andres on 02.16.17
 */

import * as _ from 'lodash';
import { Directive, OnInit, Input, Output, HostListener, EventEmitter, ElementRef } from '@angular/core';
import { TrackScrollConfig, TrackScrollConfigModel } from './track-scroll.config';

@Directive({
    selector: '[trackScroll]'
})
export class TrackScrollDirective implements OnInit {
    @Input() trackScrollConfig: TrackScrollConfigModel = {};
    @Output() trackScrollEnter = new EventEmitter<boolean>();
    @Output() trackScrollLeave = new EventEmitter<boolean>();
    private config: TrackScrollConfigModel;
    private prestatus: string = '';
    private status: string = 'outside';

    constructor(private element: ElementRef) {
        //
    }

    @HostListener('document:scroll', ['$event'])
    private track() {
        if (!_.isUndefined(this.config) && !_.isEmpty(this.config)) {
            let offsetTop = this.element.nativeElement.offsetTop;
            let offsetHeight = this.element.nativeElement.offsetHeight;
            let offsetBottom = offsetTop + offsetHeight;

            let scrollY: number = undefined;
            switch (this.config.position) {
                case 'middle': // Half the screen
                    scrollY = this.addOffset((window.innerHeight / 2) + window.scrollY);
                    break;

                case 'top': // Top of the screen
                    scrollY = this.addOffset(window.scrollY);
                    break;

                case 'bottom': // Bottom of the screen
                    scrollY = this.addOffset(window.innerHeight + window.scrollY);
                    break;

                default: break;
            }

            // Save status
            this.prestatus = this.status;

            if (!_.isUndefined(scrollY)) {

                // If scrollY is between the element's height
                if (offsetTop <= scrollY && scrollY < offsetBottom) {
                    if (this.status === 'outside') {
                        this.status = 'inside';

                        // Emit enter event
                        this.trackScrollEnter.emit(true);
                    }
                }
                else {
                    this.status = 'outside';
                }
            }

            // Emit leave event if the status changed
            if (this.status !== this.prestatus && this.status === 'outside') {
                this.trackScrollLeave.emit(true);
            }
        }
    }

    /**
     * Add offset to the already calculated scrollY
     *
     * @input scrollY: number
     * @return number
     */
    private addOffset(scrollY: number): number {
        if (this.config.offset > 0) {
            switch (this.config.offsetPosition) {
                case 'top':
                    return scrollY - this.config.offset;
                case 'bottom':
                    return scrollY + this.config.offset;
                default:
                    break;
            }
        }

        return scrollY;
    }

    public ngOnInit() {
        this.config = _.defaults(this.trackScrollConfig, new TrackScrollConfig());
    }
}
