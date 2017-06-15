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
    public track(event: Event) {
        if (!_.isUndefined(this.config) && !_.isEmpty(this.config)) {
            let offsetTop = this.getCoords(this.element.nativeElement).top;
            let offsetHeight = this.element.nativeElement.offsetHeight;
            let offsetBottom = offsetTop + offsetHeight;
            let scrollY: number = undefined;

            switch (this.config.position) {
                case 'middle': // Half the screen
                    scrollY = this.addOffset((window.innerHeight / 2) + (window.scrollY || window.pageYOffset));
                    break;

                case 'top': // Top of the screen
                    scrollY = this.addOffset(window.scrollY || window.pageYOffset);
                    break;

                case 'bottom': // Bottom of the screen
                    scrollY = this.addOffset(window.innerHeight + (window.scrollY || window.pageYOffset));
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
            if (this.config.position === 'top') {
                return scrollY + this.config.offset; // add offset
            }
            else if (this.config.position === 'bottom') {
                return scrollY - this.config.offset; // minus offset
            }
            else if (this.config.position === 'middle') {
                switch (this.config.offsetPosition) {
                    case 'top':
                        return scrollY - this.config.offset;
                    case 'bottom':
                        return scrollY + this.config.offset;
                    default:
                        break;
                }
            }
        }

        return scrollY;
    }

    /**
     * Get the real element coordinates
     *
     * Thanks to @basil
     * See: http://stackoverflow.com/questions/5598743/finding-elements-position-relative-to-the-document
     *
     * @Input el: HTMLElement
     * @return { top: number, left: number }
     */
    getCoords(el: HTMLElement): { top: number, left: number} {
        let box = el.getBoundingClientRect();

        let body = document.body;
        let docEl = document.documentElement;

        let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        let scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

        let clientTop = docEl.clientTop || body.clientTop || 0;
        let clientLeft = docEl.clientLeft || body.clientLeft || 0;

        let top  = box.top +  scrollTop - clientTop;
        let left = box.left + scrollLeft - clientLeft;

        return {
            top: Math.round(top),
            left: Math.round(left)
        };
    }

    public ngOnInit() {
        this.config = _.defaults(this.trackScrollConfig, new TrackScrollConfig());
    }
}
