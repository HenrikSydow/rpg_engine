import { ShapeBase } from "./shapeBase.js";

export class Circle extends ShapeBase {

    protected radius: number;

    constructor(localX: number, localY: number, radius: number) {
        super(localX, localY);
        this.radius = radius;
    }

}
