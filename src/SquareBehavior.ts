import { GameObject } from "./GameObject"
import { GameObjectBehavior } from "./GameObjectBehavior"
import * as PIXI from 'pixi.js';
import { GameApplication } from './GameApplication'



export class SquareBehavior extends GameObjectBehavior {

    private square: PIXI.Sprite;
    private velocity: number = 10;

    constructor(gameObjRef: GameObject) {
        super(gameObjRef)
    }
    public destroy() {
        this.square.destroy({ texture: true, baseTexture: true })
        this.gameObjRef.removeChild(this.square)
    }

    protected init(): void {
        this.createSquare()
    }
    private createSquare() {
        const gfx: PIXI.Graphics = new PIXI.Graphics()
        gfx.beginFill(0xffffff)
        gfx.drawRect(0, 0, 20, 20);
        gfx.endFill()

        const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx)
        this.square = new PIXI.Sprite(texture)

        this.gameObjRef.addChild(this.square)
    }


    public update(delta: number) {
        // if (this.gameObjRef.x + this.gameObjRef.width + this.velocity * delta < GameApplication.getApp().view.width) {

        //     this.gameObjRef.x += this.velocity * delta
        // } else {
        //     this.gameObjRef.x = GameApplication.getApp().view.width - this.gameObjRef.width
        // }



    }
}