/**
 * Created by Jose Andres on 02.16.17
 */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackScrollDirective } from './track-scroll';

@NgModule({
    imports: [CommonModule],
    declarations: [TrackScrollDirective],
    exports: [TrackScrollDirective]
})
export class TrackScrollModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: TrackScrollModule
        };
    }
}
