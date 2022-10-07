import * as PIXI from 'pixi.js';
import { GameObject } from "./GameObject";
import { GameObjectBehavior } from "./GameObjectBehavior";
import { GameApplication } from './GameApplication';
import { EventDispacher } from './EventDispacher';
import { BallBehavior } from './BallBehavior';


export class SquareBehavior extends GameObjectBehavior {

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
        gfx.beginFill(0xffffff);
        gfx.drawRect(0, 0, 100, 100);
        gfx.endFill();

        const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
        this.square = new PIXI.Sprite(texture);

        this.gameObjRef.addChild(this.square);
    }
   
    private move(delta: number) {
       
    }

    public update(delta: number) {
        let wasHit: boolean = false;


        if (!wasHit && this.ballObjRef.x + this.ballObjRef.width >= this.gameObjRef.x && this.ballObjRef.x < this.gameObjRef.x + this.gameObjRef.width &&
            this.ballObjRef.y + this.ballObjRef.height >= this.gameObjRef.y && this.ballObjRef.y < this.gameObjRef.y + this.gameObjRef.height) {
            wasHit = true;

            EventDispacher.getInstance().getDispacher().emit('updatescore');
          
        }


        if (wasHit) {
           this.move(delta);
        }

        // colision manager 
        // state pattern 
        //modular controller



    }
}