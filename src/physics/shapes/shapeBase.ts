
/**
 * The base class for all shapes.
 */
export abstract class ShapeBase {

    /** This shapes local x coordinate. */
    protected localX: number;
    /** This shapes local y coordinate. */
    protected localY: number;

    /**
     * Creates a new shape with local coordinates.
     * @param localX This shapes local x.
     * @param localY This shapes local y.
     */
    constructor(localX: number, localY: number) {
        this.localX = localX;
        this.localY = localY;
    }

    public setLocalX(value: number): void {
        this.localX = value;
    }

    public setLocalY(value: number): void {
        this.localY = value;
    }

    public getLocalX(): number {
        return this.localX;
    }

    public getLocalY(): number {
        return this.localY;
    }

}
