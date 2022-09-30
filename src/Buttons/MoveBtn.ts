

import { Button } from "../Button";
// import { GameApplication } from "./GameApplication";


export class MoveBtn extends Button {
    constructor(label: string) {
        super(label)
    }
    protected init() {
        super.init()
    }


    protected onPointerUp() {
        super.onPointerUp


        this.dispacher.emit('moveBtnup')
    }

    protected onPointerDown() {
        super.onPointerDown()
        this.dispacher.emit('moveBtndown')

    }


}
