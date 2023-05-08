import { ShapeBase } from "./shapeBase.js";

/**
 * A standard circle shape.
 */
export class Circle extends ShapeBase {

    /** The cricles radius. */
    protected radius: number;

    /**
     * Creates a new circle shape.
     * @param localX This circles local x.
     * @param localY This circles local y.
     * @param radius This circles radius.
     */
    constructor(localX: number, localY: number, radius: number) {
        super(localX, localY);
        this.radius = radius;
    }

    public getRadius(): number {
        return this.radius;
    }

}
