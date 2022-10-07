

import { Button } from "./Button";
import { EventDispacher } from './EventDispacher';


export class Button1 extends Button {
    constructor(label: string) {
        super(label);
    }
    protected init() {
        super.init();
    }


    protected onPointerUp() {
        super.onPointerUp;


        EventDispacher.getInstance().getDispacher().emit('changeBtnUp');

    }

    protected onPointerDown() {
        super.onPointerDown();
        EventDispacher.getInstance().getDispacher().emit('changeBtnDown');

    }


}
