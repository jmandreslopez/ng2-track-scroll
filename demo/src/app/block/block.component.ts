import { Component } from '@angular/core';

@Component({
    selector: 'block',
    styleUrls: ['block.component.css'],
    templateUrl: 'block.component.html'
})
export class BlockComponent {
    public background: string = '#999';
    public config = {
        // position: 'top',
        // offset: 200
    };

    enterBlock() {
        this.background = '#F99';
    }
    leaveBlock() {
        this.background = '#999';
    }
}
