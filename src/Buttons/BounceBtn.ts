import { Button } from "../Button";

export class BounceBtn extends Button {
    constructor(label: string) {
        super(label);
    }
    protected init() {
        super.init();
    }

    protected onPointerUp() {

        this.background.alpha = 0;
        this.dispacher.emit('bounceBtnup');

    }
    protected onPointerDown() {
        this.background.alpha = 1;
        this.dispacher.emit('bounceBtndown');

    }
}
