import { Animation } from "./animation.js";
import { AnimationConstants } from "./animationConstants.js";
import { GfxRegistry } from "./gfxRegistry.js";

/**
 * A factory class for all {@link Animation} instances.
 */
export abstract class AnimationFactory {

    /**
     * Builds an {@link Animation} with the given name / id. See: {@link AnimationConstants.AnimationNames}
     * @param animationId An animation id / name. See: {@link AnimationConstants.AnimationNames}
     * @returns A new animation.
     */
    static buildAnimation(animationId: String): Animation {
        let animation: Animation;

        switch (animationId) {
            /*
            Add a case for each animation here.
            Example:
            ========

            // Beginning of case for Player idle animation:
            case AnimationConstants.AnimationNames.PLAYER_IDLE:
                // create the animation:
                animation = new Animation(GfxRegistry.PLAYER_IDLE_ANIMATION_IMAGES);
                // change settings of the animation:
                animation.setScale(5);
                animation.setXOffset(-10);
                animation.setYOffset(-10);
                // do not forget to break after each case!
                break;
            */
            case AnimationConstants.AnimationNames.PLAYER_IDLE_SOUTH:
                animation = new Animation(GfxRegistry.PLAYER_IDLE_SOUTH_FRAMES);
                animation.setScale(5);
                break;
            case AnimationConstants.AnimationNames.PLAYER_IDLE_NORTH:
                animation = new Animation(GfxRegistry.PLAYER_IDLE_NORTH_FRAMES);
                animation.setScale(5);
                break;
            case AnimationConstants.AnimationNames.PLAYER_IDLE_EAST:
                animation = new Animation(GfxRegistry.PLAYER_IDLE_EAST_FRAMES);
                animation.setScale(5);
                break;
            case AnimationConstants.AnimationNames.PLAYER_WALK_SOUTH:
                animation = new Animation(GfxRegistry.PLAYER_WALK_SOUTH_FRAMES);
                animation.setScale(5);
                break;
            case AnimationConstants.AnimationNames.PLAYER_WALK_NORTH:
                animation = new Animation(GfxRegistry.PLAYER_WALK_NORTH_FRAMES);
                animation.setScale(5);
                break;
            case AnimationConstants.AnimationNames.PLAYER_WALK_EAST:
                animation = new Animation(GfxRegistry.PLAYER_WALK_EAST_FRAMES);
                animation.setScale(5);
                break;
        }

        return animation;
    }

}
