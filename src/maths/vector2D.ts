
/**
 * This class provides an implementation of a 2D mathematical vector.
 */
export class Vector2D {

    /** Value on the x-axis. */
    protected x: number;
    /** Value on the y-axis. */
    protected y: number;

    /**
     * Creates a new Vector2D from point 1 to point 2.
     * @param x1 x coordinate of point 1
     * @param y1 y coordinate of point 1
     * @param x2 x coordinate of point 2
     * @param y2 y coordinate of point 2
     */
    constructor(x1: number, y1: number, x2: number, y2: number) {
        this.x = x2 - x1;
        this.y = y2 - y1;
    }

    /**
     * Calculates and returns the length of this vector.
     * @returns The length of this vector.
     */
    public getLength(): number {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    /**
     * Changing the length of this vector while keeping its direction.
     * @param length The new length.
     */
    public setLength(length: number): void {
        this.normalize();
        this.x *= length;
        this.y *= length;
    }

    /**
     * Normalizes this vector. / Sets it's length to 1.
     * Same as calling: setLength(1)
     */
    public normalize() {
        let length: number = this.getLength();
        this.x = (1 / length) * this.x;
        this.y = (1 / length) * this.y;
    }

}
