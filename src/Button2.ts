

import { Button } from "./Button";
import { EventDispacher } from './EventDispacher';
export class Button2 extends Button {
    constructor(label: string) {
        super(label);
    }
    protected init() {
        super.init();
    }

    protected onPointerUp() {
        super.onPointerUp;
        EventDispacher.getInstance().getDispacher().emit('initBtnUp');
    }
    protected onPointerDown() {
        super.onPointerDown;
        EventDispacher.getInstance().getDispacher().emit('initBtnDown');


    }
}
