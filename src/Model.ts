export class Model {
    private score: number;
    private static instance: Model;
    constructor() {

        this.init();
    }
    private init() {
        this.score = 0;
    }
    public static getInstace(): Model {
        if (!this.instance) {
            this.instance = new Model();
        }
        return this.instance;
    }
    public setScore(score: number) {
        this.score = score;

    }
    public getScore(): number {
        return this.score;
    }
}