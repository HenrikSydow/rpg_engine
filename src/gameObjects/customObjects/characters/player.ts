import { GameTime } from "../../../gameTime.js";
import { AnimationConstants } from "../../../gfx/animationConstants.js";
import { AnimationHandler } from "../../../gfx/animationHandler.js";
import { ITrackable } from "../../../gfx/camera.js";
import { KeyHandler } from "../../../keyHandler.js";
import { HitboxHandler } from "../../../physics/hitboxes/hitboxHandler.js";
import { HitboxConstants } from "../../../physics/hitboxes/hitboxConstants.js";
import { Rectangle } from "../../../physics/shapes/rectangle.js";
import { GameObjectConstants } from "../../gameObjectConstants.js";
import { GameObjectHandler } from "../../gameObjectHandler.js";
import { PhysicalGameObject } from "../../physicalGameObject.js";

export class Player extends PhysicalGameObject implements ITrackable {

    private faceDirection: GameObjectConstants.FaceDirection = GameObjectConstants.FaceDirection.South;
    private actionState: GameObjectConstants.ActionState = GameObjectConstants.ActionState.Idle;

    public constructor(x: number, y: number, animationHandler: AnimationHandler, hitboxHandler: HitboxHandler) {
        super(x, y, animationHandler, hitboxHandler);
        this.velX = this.velY = 2.5;
    }

    public override update(): void {
        if (KeyHandler.isPressed("w")) {
            this.faceDirection = GameObjectConstants.FaceDirection.North;
            this.actionState = GameObjectConstants.ActionState.Walk;
        } else if (KeyHandler.isPressed("a")) {
            this.faceDirection = GameObjectConstants.FaceDirection.West;
            this.actionState = GameObjectConstants.ActionState.Walk;
        } else if (KeyHandler.isPressed("s")) {
            this.faceDirection = GameObjectConstants.FaceDirection.South;
            this.actionState = GameObjectConstants.ActionState.Walk;
        } else if (KeyHandler.isPressed("d")) {
            this.faceDirection = GameObjectConstants.FaceDirection.East;
            this.actionState = GameObjectConstants.ActionState.Walk;
        } else {
            this.actionState = GameObjectConstants.ActionState.Idle;
        }
        
        switch (this.actionState) {
            case GameObjectConstants.ActionState.Idle:
                this.idle();
                break;
            case GameObjectConstants.ActionState.Walk:
                this.walk();
                break;
        }

        super.update();
    }

    public override render(ctx: CanvasRenderingContext2D): void {
        this.animationHandler.render(ctx);
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

    private idle(): void {
        switch (this.faceDirection) {
            case GameObjectConstants.FaceDirection.North:
                this.animationHandler.setActiveAnimation(AnimationConstants.AnimationNames.PLAYER_IDLE_NORTH);
                break;
            case GameObjectConstants.FaceDirection.West:
                this.animationHandler.setActiveAnimation(AnimationConstants.AnimationNames.PLAYER_IDLE_EAST);
                this.animationHandler.getActiveAnimation().setFlipOnY(true);
                break;
            case GameObjectConstants.FaceDirection.East:
                this.animationHandler.setActiveAnimation(AnimationConstants.AnimationNames.PLAYER_IDLE_EAST);
                this.animationHandler.getActiveAnimation().setFlipOnY(false);
                break;
            case GameObjectConstants.FaceDirection.South:
                this.animationHandler.setActiveAnimation(AnimationConstants.AnimationNames.PLAYER_IDLE_SOUTH);
                break;
        }
    }

    private walk(): void {
        let newX: number = this.x;
        let newY: number = this.y;

        switch (this.faceDirection) {
            case GameObjectConstants.FaceDirection.North:
                this.animationHandler.setActiveAnimation(AnimationConstants.AnimationNames.PLAYER_WALK_NORTH);
                newY -= GameTime.normalize(this.velY);
                break;
            case GameObjectConstants.FaceDirection.West:
                this.animationHandler.setActiveAnimation(AnimationConstants.AnimationNames.PLAYER_WALK_EAST);
                this.animationHandler.getActiveAnimation().setFlipOnY(true);
                newX -= GameTime.normalize(this.velX);
                break;
            case GameObjectConstants.FaceDirection.East:
                this.animationHandler.setActiveAnimation(AnimationConstants.AnimationNames.PLAYER_WALK_EAST);
                this.animationHandler.getActiveAnimation().setFlipOnY(false);
                newX += GameTime.normalize(this.velX);
                break;
            case GameObjectConstants.FaceDirection.South:
                this.animationHandler.setActiveAnimation(AnimationConstants.AnimationNames.PLAYER_WALK_SOUTH);
                newY += GameTime.normalize(this.velY);
                break;
        }
        this.hitboxHandler.shift(newX - this.x, newY - this.y);

        if (!this.intersectsAnotherObject()) {
            this.x = newX;
            this.y = newY;
        } else {
            this.hitboxHandler.shift(this.x - newX, this.y - newY);
        }
    }

    private intersectsAnotherObject(): boolean {
        let intersects: boolean = false;
        GameObjectHandler.getAllObjects().forEach(obj => {
            if (!(obj instanceof Player) && obj instanceof PhysicalGameObject) {
                let physicalObj: PhysicalGameObject = obj as PhysicalGameObject;
                let objHBox = physicalObj.getHitboxHandler().getHitbox(HitboxConstants.HitboxType.GroundHitbox);
                let myHBox = this.hitboxHandler.getHitbox(HitboxConstants.HitboxType.GroundHitbox);
                if (objHBox != null && myHBox.intersects(objHBox)) {
                    intersects = true;
                    return;
                }
            }
        });
        return intersects;
    }
    
    public getCenter(): number[] {
        return [this.x + 150, this.y + 150];
    }

}
