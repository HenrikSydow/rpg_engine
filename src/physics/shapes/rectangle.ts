import { ShapeBase } from "./shapeBase.js";

/**
 * A standard rectangle shape.
 */
export class Rectangle extends ShapeBase {

    /** The width of this rectangle. */
    protected width: number;
    /** The height of this rectangle. */
    protected height: number;

    /**
     * Creates a new rectangle.
     * @param localX This rectangles local x.
     * @param localY This rectangles local y.
     * @param width This rectangles width.
     * @param height This rectangles height.
     */
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
