import { Vector2D } from "../../maths/vector2D.js";
import { HitboxBase } from "./hitboxBase.js";

export class CircleHitbox extends HitboxBase {

    protected radius: number;

    constructor(x: number, y: number, radius: number) {
        super(x, y);
        this.radius = radius;
    }

    public intersects(hitbox: CircleHitbox): boolean {
        let distance: number = new Vector2D(this.x, this.y, hitbox.getX(), hitbox.getY()).getLength();
        return (this.radius + hitbox.getRadius() >= distance);
    }

    public setRadius(value: number): void {
        this.radius = value;
    }

    public getRadius(): number {
        return this.radius;
    }

}
