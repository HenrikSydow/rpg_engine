
/**
 * Contains constants to use with hitboxes and shapes.
 */
export namespace HitboxConstants {

    /**
     * Contains identifiers for different hitboxes.
     */
    export enum HitboxName {
        /*
        Add hitbox identifiers like this:
        ExampleHitboxId = "ChooseWhateverYouWant",
        */
        PlayerGround        = "player_ground",
        BigTreeGround       = "tree_ground",
        SmallTreeGround     = "small_tree_ground",
        TreeStumpGround     = "tree_stump_ground",
        BushGround          = "bush_ground",
    }

    export enum HitboxType {
        GroundHitbox        = "ground_hitbox",
    }

}
