import { ShapeBase } from "./shapeBase.js";

export class Rectangle extends ShapeBase {

    protected width: number;
    protected height: number;

    constructor(localX: number, localY: number, width: number, height: number) {
        super(localX, localY);
        this.width = width;
        this.height = height;
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

}
