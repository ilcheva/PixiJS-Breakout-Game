import * as PIXI from 'pixi.js';

export class EventDispacher {
    public dispacher: PIXI.utils.EventEmitter;
    private static instance: EventDispacher;

    private constructor() {
        this.init();
    }
    private init() {
        this.dispacher = new PIXI.utils.EventEmitter();
    }
    public static getInstance(): EventDispacher {
        if (!this.instance) {
            this.instance = new EventDispacher();
        }
        return this.instance;
    }
    public getDispacher(): PIXI.utils.EventEmitter {
        return this.dispacher;
    }
}