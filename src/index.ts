/**
 * Created by Jose Andres on 02.16.17
 */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { TrackScrollDirective } from './track-scroll';

@NgModule({
    declarations: [TrackScrollDirective],
    exports: [TrackScrollDirective]
})
export class Ng2TrackScrollModule {
    static forRoot(): ModuleWithProviders {
        return { ngModule: Ng2TrackScrollModule, providers: [] };
    }
}
