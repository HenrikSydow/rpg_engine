import { Animation } from "./animation.js";
import { AnimationConstants } from "./animationConstants.js";

export abstract class AnimationFactory {

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
