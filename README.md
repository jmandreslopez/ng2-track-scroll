# ng2-track-scroll [![npm version](https://img.shields.io/npm/v/ng2-track-scroll.svg?style=flat)](https://www.npmjs.com/package/ng2-page-scroll) [![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

Track Scroll for Angular2 using a directive

## Features

- easy-to-use directive: tracks when element enters a certain point of the window just by adding `trackScroll` directive
- customizable: adjust tracker position, and pixel offset

## Quick Start

```
npm install ng2-track-scroll --save
```

## Demo

Coming soon

## Table of contents

- [Setup](#setup)
- [Usage](#usage)
- [Configuration](#configuration)

## Setup

First you need to install the npm module:
```sh
npm install ng2-track-scroll --save
```

Then add the `Ng2TrackScrollModule` to the imports array of your application module (or a shared module):

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2TrackScrollModule } from 'ng2-track-scroll'; // <-- import the module
import { AppComponent} from './app.component';

@NgModule({
    imports: [
      BrowserModule, 
      Ng2TrackScrollModule.forRoot() // <-- include it in your app module
    ], 
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
  //
}
```

## Usage 

In your template you should add the `trackScroll` attribute to elements you want to enable tracking.
As soon as the tracking point gets past an `trackScrollEnter` event will be triggered, and as soon as the height of the element gets past an `trackScrollLeave` event will be triggered.

```js

@Component({
   selector: 'main-element',
   template: `
        ...
        <h1 trackScroll 
            (trackScrollEnter)="enter()" 
            (trackScrollLeave)="leave()">Component Title</h1>
        <!-- Further content here -->
        ...
   `
})
export class MainElementComponent {
  
  enter() {
    console.log('Track scroll enter is working!');
  }

  leave() {
    console.log('Track scroll leave is working too!');
  }
}
```

## Configuration

In your template you could pass some configurations, adding `[trackScrollConfig]="{ ... }"` with any of the options to overwrite.

| Option           | Type    | Default  | Description   |
| ---------------- | ------- | -------- |-------------- |
| `position`       | string  | 'middle' | Position of the tracking point. <br> Options: 'top', 'middle', 'bottom'
| `offset`         | number  | 0 (px)   | Amount of pixels to add to the tracking point
| `offsetPosition` | string  | 'bottom' | If you select position 'middle' and specify an offset amount, you could indicate if you want to add them on above or below the tracking point. <br> Options: 'top, 'bottom'

```js

@Component({
   selector: 'main-element',
   template: `
        ...
        <h1 trackScroll [trackScrollConfig]="{ position: 'top', offset: 300 }" 
            (trackScrollEnter)="enter()"
            (trackScrollLeave)="leave()">Component Title</h1>
        <!-- Further content here -->
        ...
   `
})
export class MainElementComponent {
  
  enter() {
    console.log('Track scroll enter is working!');
  }

  leave() {
    console.log('Track scroll leave is working too!');
  }
}
```
## TODO:

* Add new configurations
* Test across browsers

## License

[MIT](LICENSE)
