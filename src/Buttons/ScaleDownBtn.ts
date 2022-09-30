import { Button } from "../Button";

export class ScaleDownBtn extends Button {
    constructor(label: string) {
        super(label);
    }
    protected init() {
        super.init();
    }

    protected onPointerUp() {
        super.onPointerUp;
        this.dispacher.emit('scaleDownBtnup')
    }
    protected onPointerDown() {
        super.onPointerDown;
        this.dispacher.emit('scaleDownBtndown')
    }
}
