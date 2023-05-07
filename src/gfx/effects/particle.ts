import { GameObject } from "../../gameObjects/gameObject.js";
import { GameTime } from "../../gameTime.js";
import { Color } from "../color.js";
import { GfxGeometry } from "../gfxGeometry.js";

export class Particle extends GameObject {

    private alpha: number = 0.7;
    private radius: number;
    private color: Color;

    constructor(x: number, y: number, radius: number, color: Color) {
        super(x, y);
        this.radius = radius;
        this.color = color;
        this.velX = this.velY = 0;
    }

    /**
     * Updates this object. Sets the new x and y coordinates.
     */
    public override update(): void {
        this.x += GameTime.normalize(this.velX);
        this.y += GameTime.normalize(this.velY);
    }

    /**
     * Renders this object if this alpha value
     * is greater zero.
     * @param ctx A rendering context.
     */
    public override render(ctx: CanvasRenderingContext2D): void {
        if (this.alpha <= 0) {
            return;
        }

        let previousAlpha: number = ctx.globalAlpha;
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color.toString();
        GfxGeometry.fillCircle(ctx, this.x, this.y, this.radius);
        ctx.globalAlpha = previousAlpha;
    }

    /**
     * Returns this particles alpha value.
     * @returns alpha value
     */
    public getAlpha(): number {
        return this.alpha;
    }

    /**
     * Sets this particles alpha value.
     * @param value new alpha value
     */
    public setAlpha(value: number): void {
        this.alpha = value;
    }

}
