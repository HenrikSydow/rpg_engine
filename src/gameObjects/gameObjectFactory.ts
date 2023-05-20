import { AnimationConstants } from "../gfx/animationConstants.js";
import { AnimationFactory } from "../gfx/animationFactory.js";
import { AnimationHandler } from "../gfx/animationHandler.js";
import { HitboxConstants } from "../physics/hitboxes/hitboxConstants.js";
import { HitboxFactory } from "../physics/hitboxes/hitboxFactory.js";
import { HitboxHandler } from "../physics/hitboxes/hitboxHandler.js";
import { Player } from "./customObjects/characters/player.js";
import { Bush } from "./customObjects/scenery/vegetation/bush.js";
import { BigTree } from "./customObjects/scenery/vegetation/trees/bigTree.js";
import { SmallTree } from "./customObjects/scenery/vegetation/trees/smallTree.js";
import { TreeStump } from "./customObjects/scenery/vegetation/trees/treeStump.js";
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
                animationHandler.addAnimations(new Map([
                    [
                        AnimationConstants.AnimationNames.PLAYER_IDLE_SOUTH,
                        AnimationFactory.buildAnimation(AnimationConstants.AnimationNames.PLAYER_IDLE_SOUTH)
                    ],
                    [
                        AnimationConstants.AnimationNames.PLAYER_IDLE_NORTH,
                        AnimationFactory.buildAnimation(AnimationConstants.AnimationNames.PLAYER_IDLE_NORTH)
                    ],
                    [
                        AnimationConstants.AnimationNames.PLAYER_IDLE_EAST,
                        AnimationFactory.buildAnimation(AnimationConstants.AnimationNames.PLAYER_IDLE_EAST)
                    ],
                    [
                        AnimationConstants.AnimationNames.PLAYER_WALK_SOUTH,
                        AnimationFactory.buildAnimation(AnimationConstants.AnimationNames.PLAYER_WALK_SOUTH)
                    ],
                    [
                        AnimationConstants.AnimationNames.PLAYER_WALK_NORTH,
                        AnimationFactory.buildAnimation(AnimationConstants.AnimationNames.PLAYER_WALK_NORTH)
                    ],
                    [
                        AnimationConstants.AnimationNames.PLAYER_WALK_EAST,
                        AnimationFactory.buildAnimation(AnimationConstants.AnimationNames.PLAYER_WALK_EAST)
                    ],
                ]));
                gameObject = new Player(x, y, animationHandler, hitboxHandler);
                break;
            case GameObjectConstants.GameObjectName.BigTree:
                animationHandler.addAnimation(
                    AnimationConstants.AnimationNames.VEGETATION_BIG_TREE,
                    AnimationFactory.buildAnimation(AnimationConstants.AnimationNames.VEGETATION_BIG_TREE)
                );
                gameObject = new BigTree(x, y, animationHandler, hitboxHandler);
                break;
            case GameObjectConstants.GameObjectName.SmallTree:
                animationHandler.addAnimation(
                    AnimationConstants.AnimationNames.VEGETATION_SMALL_TREE,
                    AnimationFactory.buildAnimation(AnimationConstants.AnimationNames.VEGETATION_SMALL_TREE)
                );
                gameObject = new SmallTree(x, y, animationHandler, hitboxHandler);
                break;
            case GameObjectConstants.GameObjectName.TreeStump:
                animationHandler.addAnimation(
                    AnimationConstants.AnimationNames.VEGETATION_TREE_STUMP,
                    AnimationFactory.buildAnimation(AnimationConstants.AnimationNames.VEGETATION_TREE_STUMP)
                );
                gameObject = new TreeStump(x, y, animationHandler, hitboxHandler);
                break;
            case GameObjectConstants.GameObjectName.Bush:
                animationHandler.addAnimation(
                    AnimationConstants.AnimationNames.VEGETATION_BUSH,
                    AnimationFactory.buildAnimation(AnimationConstants.AnimationNames.VEGETATION_BUSH)
                );
                gameObject = new Bush(x, y, animationHandler, hitboxHandler);
                break;
        }

        return gameObject;
    }

}
