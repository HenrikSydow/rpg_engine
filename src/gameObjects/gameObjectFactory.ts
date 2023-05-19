import { AnimationConstants } from "../gfx/animationConstants.js";
import { AnimationFactory } from "../gfx/animationFactory.js";
import { AnimationHandler } from "../gfx/animationHandler.js";
import { HitboxConstants } from "../physics/hitboxes/hitboxConstants.js";
import { HitboxFactory } from "../physics/hitboxes/hitboxFactory.js";
import { HitboxHandler } from "../physics/hitboxes/hitboxHandler.js";
import { Player } from "./customObjects/characters/player.js";
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
            case GameObjectConstants.GameObjectName.Player:
                animationHandler.addAnimation(
                    AnimationConstants.AnimationNames.PLAYER_IDLE_SOUTH,
                    AnimationFactory.buildAnimation(AnimationConstants.AnimationNames.PLAYER_IDLE_SOUTH)
                );
                animationHandler.addAnimation(
                    AnimationConstants.AnimationNames.PLAYER_IDLE_NORTH,
                    AnimationFactory.buildAnimation(AnimationConstants.AnimationNames.PLAYER_IDLE_NORTH)
                );
                animationHandler.addAnimation(
                    AnimationConstants.AnimationNames.PLAYER_IDLE_EAST,
                    AnimationFactory.buildAnimation(AnimationConstants.AnimationNames.PLAYER_IDLE_EAST)
                );
                animationHandler.addAnimation(
                    AnimationConstants.AnimationNames.PLAYER_WALK_SOUTH,
                    AnimationFactory.buildAnimation(AnimationConstants.AnimationNames.PLAYER_WALK_SOUTH)
                );
                animationHandler.addAnimation(
                    AnimationConstants.AnimationNames.PLAYER_WALK_NORTH,
                    AnimationFactory.buildAnimation(AnimationConstants.AnimationNames.PLAYER_WALK_NORTH)
                );
                animationHandler.addAnimation(
                    AnimationConstants.AnimationNames.PLAYER_WALK_EAST,
                    AnimationFactory.buildAnimation(AnimationConstants.AnimationNames.PLAYER_WALK_EAST)
                );
                gameObject = new Player(x, y, animationHandler, hitboxHandler);
                break;
        }

        return gameObject;
    }

}
