import { AnimationConstants } from "../gfx/animationConstants.js";
import { AnimationFactory } from "../gfx/animationFactory.js";
import { AnimationHandler } from "../gfx/animationHandler.js";
import { HitboxConstants, HitboxFactory, HitboxHandler } from "../physics/index.js";
import { GameObject } from "./gameObject.js";
import { GameObjectConstants } from "./gameObjectConstants.js";

export abstract class GameObjectFactory {

    public static buildGameObject(gameObjectName: GameObjectConstants.GameObjectName, x: number, y: number): GameObject {
        let gameObject: GameObject;

        let animationHandler: AnimationHandler = new AnimationHandler();
        let hitboxHandler: HitboxHandler = new HitboxHandler();

        switch (gameObjectName) {
            /*
            Create cases for each GameObject here.
            Example:
            ========================================
            case GameObjectConstants.GameObjectName.ExampleObject:
                animationHandler.addAnimation(
                    AnimationConstants.AnimationNames.ExampleAnimation,
                    AnimationFactory.buildAnimation(AnimationConstants.AnimationNames.ExampleAnimation)
                );
                hitboxHandler.addHitbox(
                    HitboxConstants.HitboxName.ExampleHitbox,
                    HitboxFactory.buildHitbox(HitboxConstants.HitboxName.ExampleHitbox, x, y)
                );
                gameObject = new ExampleGameObject(x, y, animationHandler, hitboxHandler);
                break;
            */
        }

        return gameObject;
    }

}
