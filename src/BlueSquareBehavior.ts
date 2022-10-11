


import * as PIXI from 'pixi.js';
import { GameObject } from "./GameObject";
import { GameObjectBehavior } from "./GameObjectBehavior";
import { GameApplication } from './GameApplication';
import { EventDispacher } from './EventDispacher';
import { BallBehavior } from './BallBehavior';


export class BlueSquareBehavior extends GameObjectBehavior {

    private square: PIXI.Sprite;
    private velocity: number = 10;
    private ballObjRef: GameObject;


    constructor(gameObjRef: GameObject) {
        super(gameObjRef);
    }
    public destroy() {
        this.square.destroy({ texture: true, baseTexture: true });
        this.gameObjRef.removeChild(this.square);
    }
    public setBallObjRef(gameObj: GameObject) {
        this.ballObjRef = gameObj;
    }
    protected init(): void {
        this.createSquare();
    }
    private createSquare() {
        const gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.beginFill(0x0000ff);
        gfx.drawRect(0, 0, 100, 100);
        gfx.endFill();

        const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
        this.square = new PIXI.Sprite(texture);

        this.gameObjRef.addChild(this.square);
    }
    

    public update(delta: number) {
        let wasHit: boolean = false;
        this.gameObjRef.y += delta * this.velocity;
        if (!wasHit && this.gameObjRef.y + this.gameObjRef.height >= GameApplication.getApp().view.height) {
            this.gameObjRef.y =GameApplication.getApp().view.height -this.gameObjRef.height;

        }  
    }
}