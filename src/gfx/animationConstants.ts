
/**
 * This namespace is reserved for all constants related to
 * the {@link Animation} and {@link AnimationHandler} classes.
 */
export namespace AnimationConstants {

    /**
     * The AnimationNames enum keeps track of all
     * the aliases / names of animations. These should be used to
     * identify {@link Animation} instances when adding them to an
     * instance of the {@link AnimationHandler}.
     */
    export enum AnimationNames {
        // example for adding an animation name:
        // PLAYER_IDLE = "player_idle",
        PLAYER_IDLE_SOUTH       = "player_idle_south",
        PLAYER_IDLE_NORTH       = "player_idle_north",
        PLAYER_IDLE_EAST        = "player_idle_east",
        PLAYER_WALK_SOUTH       = "player_walk_south",
        PLAYER_WALK_NORTH       = "player_walk_north",
        PLAYER_WALK_EAST        = "player_walk_east",
    }

}
