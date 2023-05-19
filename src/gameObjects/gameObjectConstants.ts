
/**
 * Contains constants to use with GameObjects.
 */
export namespace GameObjectConstants {

    /**
     * Contains the names / ids of GameObjects.
     */
    export enum GameObjectName {
        /*
        Example GameObject name / id:
        ExampleObject = "testObject",
        */
        Player      = "player",
        BigTree     = "bigTree",
        SmallTree   = "smallTree",
        TreeStump   = "treeStump",
    }

    export enum FaceDirection {
        North   = "north",
        East    = "east",
        South   = "south",
        West    = "west"
    }

    export enum ActionState {
        Idle    = "idle",
        Walk    = "walk",
        Attack  = "attack",
        Dead    = "dead"
    }

}
