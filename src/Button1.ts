

import { Button } from "./Button";
// import { GameApplication } from "./GameApplication";


export class Button1 extends Button {
    constructor(label: string) {
        super(label)
    }
    protected init() {
        super.init()
    }


    protected onPointerUp() {
        super.onPointerUp


        this.dispacher.emit('btn1up')
    }

    protected onPointerDown() {
        super.onPointerDown()
        this.dispacher.emit('btn1down')

    }


}
