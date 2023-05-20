import { Rectangle } from "../../../../../physics/shapes/rectangle.js";
import { VegetationObject } from "../vegetationObject.js";

export class BigTree extends VegetationObject {
    public override render(ctx: CanvasRenderingContext2D): void {
        super.render(ctx);
        this.hitboxHandler.getHitboxes().forEach( hBox => {
            hBox.getShapes().forEach(shape => {
                let rect: Rectangle = shape as Rectangle;
                ctx.strokeStyle = "rgb(255, 0, 0)";
                ctx.strokeRect(
                    hBox.getX() + rect.getLocalX(),
                    hBox.getY() + rect.getLocalY(),
                    rect.getWidth(),
                    rect.getHeight()
                );
            });
        });
    }
}
