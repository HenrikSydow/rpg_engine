
/**
 * A class which defines standard methods for drawing various
 * geometric forms to the screen.
 */
export abstract class GfxGeometry {

    /**
     * Draws and fills a circle.
     * @param ctx A CanvasRenderingContext2D.
     * @param x The x coordinate.
     * @param y The y coordinate.
     * @param radius The circles radius.
     */
    public static fillCircle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number): void {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        ctx.fill();
    }

    /**
     * Traces the outline of a circle.
     * @param ctx A CanvasRenderingContext2D.
     * @param x The x coordinate.
     * @param y The y coordinate.
     * @param radius The circles radius.
     */
    public static traceCircle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number): void {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        ctx.stroke();
    }

}
