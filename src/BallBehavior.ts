import { GameObjectBehavior } from "./GameObjectBehavior"
import * as PIXI from 'pixi.js';
import { GameApplication } from './GameApplication'

import { GameObject } from "./GameObject"

export class BallBehavior extends GameObjectBehavior {
    private ball: PIXI.Sprite;
    private velocity: number = 10;

    constructor(gameObjRef: GameObject) {
        super(gameObjRef)
    }

    protected init(): void {
        this.createBall()
    }
    private createBall() {
        const gfx: PIXI.Graphics = new PIXI.Graphics()
        gfx.beginFill(0xffffff)
        gfx.drawCircle(0, 0, 20);
        gfx.endFill()

        const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx)
        this.ball = new PIXI.Sprite(texture)

        this.gameObjRef.addChild(this.ball)
    }


    public update(delta: number) {
        if (this.gameObjRef.x + this.gameObjRef.width + this.velocity * delta < GameApplication.getApp().view.width) {

            this.gameObjRef.x += this.velocity * delta
        } else {
            this.gameObjRef.x = GameApplication.getApp().view.width - this.gameObjRef.width
        }



    }

}