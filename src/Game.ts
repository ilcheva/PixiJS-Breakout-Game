

import * as PIXI from 'pixi.js';
import { GameObject } from "./GameObject";
import { BallBehavior } from './BallBehavior';
import { SquareBehavior } from './SquareBehavior';
import { BlueSquareBehavior } from './BlueSquareBehavior';
import { GameApplication } from './GameApplication';
import { Button1 } from './Button1';
import { Button2 } from './Button2';
import { EventDispacher } from './EventDispacher';
import { ScoreView } from './ScoreView';
import { Model } from './Model';
// using as Controller


export class Game extends PIXI.Container {

    private gameObjects: Map<string, GameObject>;
    private ticker: PIXI.Ticker;

    private gameObjectContainer: PIXI.Container;
    private uiContainer: PIXI.Container;

    private changeBehaviorBtn: Button1;
    private initBehaviorBtn: Button2;
    private scoreView: ScoreView;



    constructor() {
        super();
        this.init();
    }
    private init() {

        this.createTicker();
        this.createGameObjList();
        this.createGameObjContaier();
        this.createUIContainer();
        this.createButton();
        this.createGameObject();
        this.createScoreView();
    }
    private createScoreView() {
        this.scoreView = new ScoreView(0);
        this.scoreView.x = 50;
        this.scoreView.y = 10;
        this.uiContainer.addChild(this.scoreView);
    }
    private createGameObjList() {
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
        EventDispacher.getInstance().getDispacher().addListener('changeBtnUp', this.onChangeBtnUp, this);
        this.initBehaviorBtn = new Button2('Initial Behavior');
        this.initBehaviorBtn.x = 180;
        this.initBehaviorBtn.y = GameApplication.getApp().view.height - this.changeBehaviorBtn.height - 10;
        EventDispacher.getInstance().getDispacher().addListener('initBtnUp', this.onInitBtnUp, this);

        this.uiContainer.addChild(this.changeBehaviorBtn);
        this.uiContainer.addChild(this.initBehaviorBtn);
    }
    private createTicker() {
        this.ticker = new PIXI.Ticker();
        this.ticker.add(this.update, this);
        this.ticker.start();
    }
    private createGameObject() {
        this.createBallGameObj();
        this.createSquareGameObj();
    }
    private createBallGameObj() {
        const ballGameObj: GameObject = new GameObject('gameObj1');

        ballGameObj.x = 100;
        ballGameObj.y = 100;

        this.addGameObject(ballGameObj);
        const ballBehavior: BallBehavior = new BallBehavior(ballGameObj);       
        ballGameObj.addBehavior('ballBehavior', ballBehavior);


    }
    private createSquareGameObj() {
        const squareGameObj: GameObject = new GameObject('gameObj2');
        squareGameObj.x = 500;
        squareGameObj.y = 75;

        this.addGameObject(squareGameObj);
        const squareBehavior: SquareBehavior = new SquareBehavior(squareGameObj);

        squareBehavior.setBallObjRef(this.getGameObjById('gameObj1'));

        squareGameObj.addBehavior('squareBehavior', squareBehavior);
        EventDispacher.getInstance().getDispacher().addListener('updatescore', this.onScoreUpdate, this);

    }
    private addGameObject(gameObj: GameObject) {
        this.gameObjectContainer.addChild(gameObj);
        this.gameObjects.set(gameObj.getId(), gameObj);
    }

    private update(delta: number) {
        this.gameObjects.forEach(gameObj => {
            gameObj.update(delta);
        });
    }
    private getGameObjById(id: string): GameObject {
        if (!this.gameObjects.has(id)) {
            return null;
        }
        return this.gameObjects.get(id);
    }
    private onInitBtnUp() {

        console.log('oninit');

    }
    private onChangeBtnUp() {
        console.log('onchange');


    }
    private onScoreUpdate() {
        let currentScore: number = Model.getInstace().getScore() + 1;
        Model.getInstace().setScore(currentScore);
        this.scoreView.setScore(Model.getInstace().getScore());
        

        this.getGameObjById('gameObj2').removeBehavior('squareBehavior');
        this.getGameObjById('gameObj2').addBehavior('ballBehavior', new BlueSquareBehavior(this.getGameObjById('gameObj2')));
      
    }
}
/// ball hit square 
// square gets blue
// suare moves down
