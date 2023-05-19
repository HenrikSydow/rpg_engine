import { AnimationHandler } from "../gfx/animationHandler.js";
import { HitboxHandler } from "../physics/index.js";
import { GameObject } from "./gameObject.js";

export abstract class PhysicalGameObject extends GameObject {

    protected animationHandler: AnimationHandler;
    protected hitboxHandler: HitboxHandler;

    constructor(x: number, y: number, animationHandler: AnimationHandler, hitboxHandler: HitboxHandler) {
        super(x, y);
        this.animationHandler = animationHandler;
        this.hitboxHandler = hitboxHandler;
    }

    public override update(): void {
        this.animationHandler.update(this.x, this.y);
    }

}
