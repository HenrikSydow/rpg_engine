import { PhysicalGameObject } from "../../../physicalGameObject.js";

export class VegetationObject extends PhysicalGameObject {

    public override render(ctx: CanvasRenderingContext2D): void {
        this.animationHandler.render(ctx);
    }

}
