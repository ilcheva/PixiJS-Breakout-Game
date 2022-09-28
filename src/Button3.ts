import { Button } from "./Button";

export class Button3 extends Button {
    constructor(label: string) {
        super(label);
    }
    protected init() {
        super.init();
    }

    protected onPointerUp() {

        this.background.alpha = 0;
        this.dispacher.emit('btn3up');

    }
    protected onPointerDown() {
        this.background.alpha = 1;
        this.dispacher.emit('btn3down');

    }
}
