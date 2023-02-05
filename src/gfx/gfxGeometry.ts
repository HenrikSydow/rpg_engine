
export abstract class GfxGeometry {

    public static fillCircle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number): void {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        ctx.fill();
    }

    public static traceCircle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number): void {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        ctx.stroke();
    }

}
