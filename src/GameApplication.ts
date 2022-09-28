/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-inferrable-types */

import * as PIXI from "pixi.js";

// import { Button } from './Button'
import { Button1 } from "./Button1";
import { Button2 } from "./Button2";
import { Button3 } from "./Button3";

export class GameApplication extends PIXI.Application {
    public static STAGE_WIDTH: number = 800;
    public static STAGE_HEIGHT: number = 600;

    private static app: GameApplication;
    private mainContainer: PIXI.Container;
    private ball: PIXI.Sprite;
    private velocity: number = 10;
    private btn1Down: boolean = false;
    private btn2Down: boolean = false;
    private btn3Down: boolean = false;
    private hitRightBorder: boolean = false;
    private hitTop: boolean = false
    private scaleVelocity: number = 0.05;
    private angle: number = 35;
    private radians: number = 0;

    private myTicker: PIXI.Ticker;

    constructor() {
        super(GameApplication.getAppOptions());
        this.init();
    }

    public static getApp(): GameApplication {
        return this.app;
    }

    private init() {
        this.myTicker = new PIXI.Ticker();
        this.myTicker.add(this.onTick, this);
        this.myTicker.start();
        GameApplication.app = this;
        this.mainContainer = new PIXI.Container();
        this.loader = new PIXI.Loader();
        this.loader.onComplete.add(this.onLoadComplete, this);

        window.onload = () => {
            const gameContainer: HTMLCanvasElement = document.getElementById(
                "gameContainer"
            ) as HTMLCanvasElement;
            gameContainer.appendChild(this.view);
            this.stage.addChild(this.mainContainer);

            this.resizeCanvas();
            this.loadAssets();
            this.showText();
            this.createButton();
            this.createContainers();
            this.createBall();

            this.view.style.position = "absolute";
            this.view.style.left = "50%";
            this.view.style.top = "50%";
            this.view.style.transform = "translate3d( -50%, -50%, 0 )";
        };
    }

    private static getAppOptions() {
        return {
            backgroundColor: 0x989c99,
            width: GameApplication.STAGE_WIDTH,
            height: GameApplication.STAGE_HEIGHT,
        };
    }

    private resizeCanvas(): void {
        this.onResize();
        this.onResize = this.onResize.bind(this);
        window.addEventListener("resize", this.onResize);
    }

    private onResize() {
        this.renderer.resize(
            GameApplication.STAGE_WIDTH,
            GameApplication.STAGE_HEIGHT
        );
    }

    private loadAssets() {
        this.loader.add("siren", "./assets/spritesheet/siren_anim.json");
        this.loader.load();
    }

    private showText() { }

    private createContainers() { }

    private createButton() {
        //
        const btn1: Button1 = new Button1("Button1");
        const btn2: Button2 = new Button2("Button2");
        const btn3: Button3 = new Button3("Button3");


        btn1.getDispacher().addListener("btn1up", this.onBtn1Up, this);
        btn1.getDispacher().addListener("btn1down", this.onBtn1Down, this);
        btn2.getDispacher().addListener("btn2up", this.onBtn2Up, this);
        btn2.getDispacher().addListener("btn2down", this.onBtn2Down, this);
        btn3.getDispacher().addListener("btn3up", this.onBtn3Up, this);
        btn3.getDispacher().addListener("btn3down", this.onBtn3Down, this);


        btn1.x = 50;
        btn1.y = 500;
        btn2.x = 300;
        btn2.y = 500;
        btn3.x = 550;
        btn3.y = 500;

        this.mainContainer.addChild(btn1);
        this.mainContainer.addChild(btn2);
        this.mainContainer.addChild(btn3);
    }

    private onBtn1Up() {
        this.btn1Down = false;
    }
    private onBtn1Down() {
        this.btn1Down = true;
    }
    private onBtn2Up() {
        this.btn2Down = false;
    }
    private onBtn2Down() {
        this.btn2Down = true;
    }
    private onBtn3Up() {
        this.btn3Down = false;
    }
    private onBtn3Down() {
        this.btn3Down = true;
    }

    private createBall() {
        const gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.beginFill(0xff0000);
        gfx.drawCircle(0, 0, 20);
        gfx.endFill();
        const texture: PIXI.Texture = this.renderer.generateTexture(gfx);
        this.ball = new PIXI.Sprite(texture);
        this.ball.x = 200;
        this.ball.y = 200;
        this.mainContainer.addChild(this.ball);
    }

    private onLoadComplete() { }
    private onTick(delta: number) {
        if (this.btn1Down) {
            if (
                this.ball.x + this.ball.width < this.view.width &&
                !this.hitRightBorder
            ) {
                this.ball.x += this.velocity * delta;

            } else {
                this.hitRightBorder = true;
            }
            if (this.ball.x > 0 && this.hitRightBorder) {
                this.ball.x -= this.velocity * delta;

            } else {
                this.hitRightBorder = false;
            }
        }
        if (this.btn2Down) {
            const scaleX: number = (this.ball.scale.x += this.scaleVelocity);
            const scaleY: number = (this.ball.scale.y += this.scaleVelocity);

            if (scaleX < 5 && scaleY < 5) {
                this.ball.scale.set(scaleX, scaleY);
            } else {
                this.ball.scale.set(5, 5);
            }
        }
        if (this.btn3Down) {
            if (
                this.ball.x + this.ball.width < this.view.width &&
                !this.hitRightBorder && !this.hitTop
            ) {

                this.radians = this.angle * Math.PI / 180;
                this.ball.x += Math.cos(this.radians) * this.velocity * delta;
                this.ball.y += Math.sin(this.radians) * this.velocity * delta;
            } else {
                this.hitRightBorder = true;
            }
            if (this.ball.x > 0 && this.hitRightBorder) {

                this.radians = this.angle * Math.PI / 180;
                this.ball.x -= Math.sin(this.radians) * this.velocity * delta;
                this.ball.y -= Math.cos(this.radians) * this.velocity * delta;
            } else {
                this.hitRightBorder = false;
            }
            if (this.ball.y < 0 && !this.hitRightBorder) {
                this.radians = this.angle * Math.PI / 360;
                this.ball.x -= Math.cos(this.radians) * this.velocity * delta;
                this.ball.y += Math.cos(this.radians) * this.velocity * delta;
            } else {
                this.hitTop = false
            }
            if (this.ball.y + this.ball.height > this.view.height) {
                this.radians = this.angle * Math.PI / 360;
                this.ball.x += Math.cos(this.radians) * this.velocity * delta;
                this.ball.y -= Math.sin(this.radians) * this.velocity * delta;
            }


        }

    }
}