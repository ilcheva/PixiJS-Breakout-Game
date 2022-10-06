

import * as PIXI from 'pixi.js';
import { GameObject } from "./GameObject";
import { BallBehavior } from './BallBehavior'
import { Button1 } from './Button1';
import { GameApplication } from './GameApplication'
import { Button2 } from './Button2';



export class Game extends PIXI.Container {

    private gameObjects: Map<string, GameObject>;
    private ticker: PIXI.Ticker;

    private gameObjectContainer: PIXI.Container;
    private uiContainer: PIXI.Container;

    private changeBehaviorBtn: Button1;
    private initBehaviorBtn: Button2;
    private btnOnInitUp: boolean = false;
    private btnOnChangeUp: boolean = false;

    constructor() {
        super()
        this.init()
    }
    private init() {
        this.createTicker();
        this.createGameObjectList();
        this.createGameObjContaier();
        this.createUIContainer();
        this.createButton();
        this.createGameObject();

    }
    private createGameObjectList() {
        this.gameObjects = new Map<string, GameObject>();

    }
    private createGameObjContaier() {
        this.gameObjectContainer = new PIXI.Container();
        this.addChild(this.gameObjectContainer);
    }
    private createUIContainer() {
        this.uiContainer = new PIXI.Container();
        this.addChild(this.uiContainer);
    }
    private createButton() {
        this.changeBehaviorBtn = new Button1('Change Behavior');

        this.changeBehaviorBtn.x = 400;
        this.changeBehaviorBtn.y = GameApplication.getApp().view.height - this.changeBehaviorBtn.height - 10;
        this.changeBehaviorBtn.getDispacher().addListener('changeBtnUp', this.onChangeBtnUp, this);
        this.initBehaviorBtn = new Button2('Initial Behavior');
        this.initBehaviorBtn.x = 180;
        this.initBehaviorBtn.y = GameApplication.getApp().view.height - this.changeBehaviorBtn.height - 10;
        this.initBehaviorBtn.getDispacher().addListener('initBtnUp', this.onInitBtnUp, this);

        this.uiContainer.addChild(this.changeBehaviorBtn);
        this.uiContainer.addChild(this.initBehaviorBtn);
    }
    private createTicker() {
        this.ticker = new PIXI.Ticker();
        this.ticker.add(this.update, this);
        this.ticker.start();
    }
    private createGameObject() {
        this.createBallGameObj()
    }
    private createBallGameObj() {
        const ballGameObj: GameObject = new GameObject('gameObj1');
        this.gameObjectContainer.addChild(ballGameObj);

        this.gameObjects = this.gameObjects.set(ballGameObj.getId(), ballGameObj);



    }

    private update(delta: number) {

        this.gameObjects.forEach(gameObj => gameObj.update(delta));

    }
    private getGameObjbyId(id: string): GameObject {
        if (!this.gameObjects.has(id)) {
            return null;
        }
        return this.gameObjects.get(id);
    }
    private onInitBtnUp() {
        const gameObj: GameObject = this.getGameObjbyId('gameObj1');
        if (!gameObj) {
            return;
        }
        const ballBehavior: BallBehavior = new BallBehavior(gameObj);
        gameObj.addBehavior(ballBehavior);

    }
    private onChangeBtnUp() {
        this.btnOnChangeUp = true;
    }

}