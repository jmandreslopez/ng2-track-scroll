import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2TrackScrollModule } from 'ng2-track-scroll';
import { AppComponent } from './app.component';
import { BlockComponent } from './block';

@NgModule({
    imports: [
        BrowserModule,
        Ng2TrackScrollModule.forRoot()
    ],
    declarations: [
        AppComponent,
        BlockComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    //
}
