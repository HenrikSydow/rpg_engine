import { GameTime } from "../../../gameTime.js";
import { AnimationConstants } from "../../../gfx/animationConstants.js";
import { AnimationHandler } from "../../../gfx/animationHandler.js";
import { KeyHandler } from "../../../keyHandler.js";
import { HitboxHandler } from "../../../physics/hitboxes/hitboxHandler.js";
import { GameObjectConstants } from "../../gameObjectConstants.js";
import { PhysicalGameObject } from "../../physicalGameObject.js";

export class Player extends PhysicalGameObject {

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
        switch (this.faceDirection) {
            case GameObjectConstants.FaceDirection.North:
                this.animationHandler.setActiveAnimation(AnimationConstants.AnimationNames.PLAYER_WALK_NORTH);
                this.y -= GameTime.normalize(this.velY);
                break;
            case GameObjectConstants.FaceDirection.West:
                this.animationHandler.setActiveAnimation(AnimationConstants.AnimationNames.PLAYER_WALK_EAST);
                this.animationHandler.getActiveAnimation().setFlipOnY(true);
                this.x -= GameTime.normalize(this.velX);
                break;
            case GameObjectConstants.FaceDirection.East:
                this.animationHandler.setActiveAnimation(AnimationConstants.AnimationNames.PLAYER_WALK_EAST);
                this.animationHandler.getActiveAnimation().setFlipOnY(false);
                this.x += GameTime.normalize(this.velX);
                break;
            case GameObjectConstants.FaceDirection.South:
                this.animationHandler.setActiveAnimation(AnimationConstants.AnimationNames.PLAYER_WALK_SOUTH);
                this.y += GameTime.normalize(this.velY);
                break;
        }
    }

}
