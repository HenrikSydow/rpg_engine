import { Animation } from "./animation.js";
import { AnimationConstants } from "./animationConstants.js";

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
        }

        return animation;
    }

}
