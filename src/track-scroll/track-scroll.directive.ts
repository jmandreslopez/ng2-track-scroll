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
    private config: TrackScrollConfigModel;
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
                case 'middle':
                    scrollY = this.addOffset((window.innerHeight / 2) + window.scrollY);
                    break;

                case 'top':
                    scrollY = this.addOffset(window.scrollY);
                    break;

                case 'bottom':
                    scrollY = this.addOffset(window.innerHeight + window.scrollY);
                    break;

                default: break;
            }

            if (!_.isUndefined(scrollY)) {
                if (offsetTop <= scrollY && scrollY < offsetBottom) {
                    if (this.status === 'outside') {
                        this.status = 'inside';
                        this.trackScrollEnter.emit(true);
                    }
                }
                else {
                    this.status = 'outside';
                }
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
                    return scrollY;
            }
        }
    }

    public ngOnInit() {
        this.config = _.defaults(this.trackScrollConfig, new TrackScrollConfig());
    }
}
