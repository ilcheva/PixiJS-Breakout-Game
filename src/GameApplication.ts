/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-inferrable-types */

import * as PIXI from "pixi.js";


// import { Button } from './Button'
import { MoveBtn } from "./Buttons/MoveBtn";
import { ScaleUpBtn } from "./Buttons/ScaleUpBtn";
import { BounceBtn } from "./Buttons/BounceBtn";
import { ScaleDownBtn } from "./Buttons/ScaleDownBtn";

export class GameApplication extends PIXI.Application {
    public static STAGE_WIDTH: number = 800;
    public static STAGE_HEIGHT: number = 600;

    private static app: GameApplication;
    private mainContainer: PIXI.Container;
    private ball: PIXI.Sprite;
    private velocity: number = 10;
    private moveBtnDown: boolean = false;
    private scaleUpBtnDown: boolean = false;
    private bounceBtnDown: boolean = false;
    private scaleDownBtnDown: boolean = false;
    private hitRightBorder: boolean = false;
    private hitTop: boolean = false
    private scaleVelocity: number = 0.05;
    private angle: number = 45;
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
        const moveBtn: MoveBtn = new MoveBtn("Move");
        const bounceBtn: BounceBtn = new BounceBtn("Bounce");
        const scaleUpBtn: ScaleUpBtn = new ScaleUpBtn("Scale Up");
        const scaleDownBtn: ScaleDownBtn = new ScaleDownBtn("Scale Down");


        moveBtn.getDispacher().addListener("moveBtnup", this.onmoveBtnUp, this);
        moveBtn.getDispacher().addListener("moveBtndown", this.onmoveBtnDown, this);
        bounceBtn.getDispacher().addListener("bounceBtnup", this.onbounceBtnUp, this);
        bounceBtn.getDispacher().addListener("bounceBtndown", this.onbounceBtnDown, this);
        scaleUpBtn.getDispacher().addListener("scaleUpBtnup", this.onscaleUpBtnUp, this);
        scaleUpBtn.getDispacher().addListener("scaleUpBtndown", this.onscaleUpBtnDown, this);
        scaleDownBtn.getDispacher().addListener("scaleDownBtnup", this.onscaleDownBtnUp, this);
        scaleDownBtn.getDispacher().addListener("scaleDownBtndown", this.onscaleDownBtnDown, this);


        moveBtn.x = 40;
        moveBtn.y = this.view.height - moveBtn.height - 20;
        bounceBtn.x = 230;
        bounceBtn.y = this.view.height - scaleUpBtn.height - 20;
        scaleUpBtn.x = 420;
        scaleUpBtn.y = this.view.height - scaleUpBtn.height - 20;
        scaleDownBtn.x = this.view.width - scaleDownBtn.width - 40;
        scaleDownBtn.y = this.view.height - scaleUpBtn.height - 20;

        this.mainContainer.addChild(moveBtn);
        this.mainContainer.addChild(bounceBtn);
        this.mainContainer.addChild(scaleUpBtn);
        this.mainContainer.addChild(scaleDownBtn);
    }

    private onmoveBtnUp() {
        this.moveBtnDown = false;
    }
    private onmoveBtnDown() {
        this.moveBtnDown = true;
    }
    private onbounceBtnUp() {
        this.bounceBtnDown = false;
    }
    private onbounceBtnDown() {
        this.bounceBtnDown = true;
    }
    private onscaleUpBtnUp() {
        this.scaleUpBtnDown = false;
    }
    private onscaleUpBtnDown() {
        this.scaleUpBtnDown = true;
    }
    private onscaleDownBtnUp() {
        this.scaleDownBtnDown = false;
    }
    private onscaleDownBtnDown() {
        this.scaleDownBtnDown = true;
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
        if (this.moveBtnDown) {
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
        if (this.scaleUpBtnDown) {
            const scaleX: number = (this.ball.scale.x += this.scaleVelocity);
            const scaleY: number = (this.ball.scale.y += this.scaleVelocity);

            if (scaleX < 5 && scaleY < 5) {
                this.ball.scale.set(scaleX, scaleY);
            } else {
                this.ball.scale.set(5, 5);
                this.scaleUpBtnDown = false;
            }
        }
        if (this.scaleDownBtnDown) {
            const scaleX: number = (this.ball.scale.x -= this.scaleVelocity);
            const scaleY: number = (this.ball.scale.y -= this.scaleVelocity);

            if (this.ball.scale.x > 1 && this.ball.scale.y > 1) {
                this.ball.scale.set(scaleX, scaleY);
            } else {
                this.ball.scale.set(1, 1);
                this.scaleDownBtnDown = false;
            }
        }
        if (this.bounceBtnDown) {
            this.radians = this.angle * Math.PI / 180;
            const shiftX = Math.cos(this.radians) * this.velocity * delta;
            const shiftY = Math.sin(this.radians) * this.velocity * delta;
            this.ball.x += shiftX;
            this.ball.y += shiftY;

            if (this.ball.x + this.ball.width + shiftX >= this.view.width || this.ball.x + shiftX <= 0) {
                
                if (this.ball.x + this.ball.width + shiftX >= this.view.width) {
                    this.ball.x = this.view.width - this.ball.width;
                }
                if (this.ball.x + shiftX <= 0) {
                    this.ball.x = 0;
                }
                this.angle = 180 - this.angle;
            } else if (this.ball.y + this.ball.height + shiftY >= this.view.height || this.ball.y + shiftY <= 0) {
                
                if (this.ball.y + this.ball.height + shiftY >= this.view.height) {
                    this.ball.y = this.view.height - this.ball.height;
                }
                if (this.ball.y + shiftY <= 0) {
                    this.ball.y = 0;
                }
                this.angle = 360 - this.angle;

            }



        }

    }
}