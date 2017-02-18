/**
 * Created by Jose Andres on 02.16.17
 */

export class TrackScrollConfigModel {
    position?: string; // 'top', 'middle', 'bottom'
    offset?: number; // px
    offsetPosition?: string; // 'top', 'bottom'
}

export class TrackScrollConfig {
    position: string;
    offset: number;
    offsetPosition: string;

    constructor() {
        this.position = 'middle';
        this.offset = 0;
        this.offsetPosition = 'bottom';
    }
}
