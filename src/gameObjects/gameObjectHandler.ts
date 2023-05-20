import { Hitbox } from "../physics/hitboxes/hitbox.js";
import { HitboxConstants } from "../physics/hitboxes/hitboxConstants.js";
import { Circle } from "../physics/shapes/circle.js";
import { Rectangle } from "../physics/shapes/rectangle.js";
import { GameObject } from "./gameObject.js";
import { PhysicalGameObject } from "./physicalGameObject.js";

/**
 * The GameObjectHandler handels the update and render
 * methods of all GameObjects in the game.
 * It is utilized by the Game-class.
 */
export abstract class GameObjectHandler {
    private static GAME_OBJECTS_TO_ADD: Array<GameObject> = [];
    private static GAME_OBJECTS_TO_REMOVE: Array<GameObject> = [];
    private static GAME_OBJECTS_TO_PRIORITISE: Array<GameObject> = [];
    private static GAME_OBJECTS: Array<GameObject> = [];

    /**
     * Adds a GameObject to the handler.
     * (Objects will be added during the next update cycle.)
     * @param object Any GameObject.
     */
    public static add(object: GameObject): void {
        GameObjectHandler.GAME_OBJECTS_TO_ADD.push(object);
    }

    /**
     * Removes a GameObject from the handler.
     * (Objects will be removed during the next update cycle.)
     * @param object Any GameObject.
     */
    public static remove(object: GameObject): void {
        GameObjectHandler.GAME_OBJECTS_TO_REMOVE.push(object);
    }

    /**
     * Resets the GameObjectHandler.
     * Removes all GameObjects.
     */
    public static clear(): void {
        GameObjectHandler.GAME_OBJECTS_TO_ADD = [];
        GameObjectHandler.GAME_OBJECTS_TO_REMOVE = [];
        GameObjectHandler.GAME_OBJECTS_TO_PRIORITISE = [];
        GameObjectHandler.GAME_OBJECTS = []
    }

    /**
     * Returns a readonly reference to an array containing
     * all GameObjects currently registered to this handler.
     * @returns An Array containing GameObjects.
     */
    public static getAllObjects(): ReadonlyArray<GameObject> {
        return GameObjectHandler.GAME_OBJECTS;
    }

    /**
     * Returns an array containing all the GameObjects of the given type,
     * registered to this handler.
     * @param type A class / type.
     * @returns An array containing GameObjects of the specified type.
     */
    public static getObjectsByType(type: any): Array<GameObject> {
        let objectsOfType: Array<GameObject> = [];
        GameObjectHandler.GAME_OBJECTS.forEach(object => {
            if (object instanceof type) {
                objectsOfType.push(object);
            }
        });
        return objectsOfType;
    }

    /**
     * The update method of this handler.
     * Calls the update methods of all added / registered objects,
     * adds and removes GameObjects to / from the handler.
     */
    public static update(): void {
        GameObjectHandler.GAME_OBJECTS_TO_ADD.forEach(
            object => GameObjectHandler.GAME_OBJECTS.push(object)
        );
        GameObjectHandler.GAME_OBJECTS_TO_ADD = [];

        GameObjectHandler.GAME_OBJECTS_TO_REMOVE.forEach(
            object => {
                let index: number = GameObjectHandler.GAME_OBJECTS.indexOf(object);
                if (index != -1) {
                    GameObjectHandler.GAME_OBJECTS.splice(index, 1);
                }
            }
        );
        GameObjectHandler.GAME_OBJECTS_TO_REMOVE = [];

        GameObjectHandler.GAME_OBJECTS_TO_PRIORITISE.forEach(object => {
            let index: number = GameObjectHandler.GAME_OBJECTS.indexOf(object);
            GameObjectHandler.GAME_OBJECTS.splice(index, 1);
            GameObjectHandler.GAME_OBJECTS.splice(0, 0, object);
        });
        GameObjectHandler.GAME_OBJECTS_TO_PRIORITISE = [];

        GameObjectHandler.GAME_OBJECTS.forEach(
            object => object.update()
        );
    }

    /**
     * Calls the render methods of all added / registered objects,
     * passing on the given CanvasRenderingContext2D.
     * @param ctx The rendering context of the game.
     */
    public static render(ctx: CanvasRenderingContext2D): void {
        GameObjectHandler.GAME_OBJECTS.sort(this.compareByHitbox);
        GameObjectHandler.GAME_OBJECTS.forEach(
            object => object.render(ctx)
        );
    }

    private static compareByHitbox(objectOne: GameObject, objectTwo: GameObject): number {
        if (!(objectOne instanceof PhysicalGameObject)) return -1;
        if (!(objectTwo instanceof PhysicalGameObject)) return 1;
        let firstHBox: Hitbox = objectOne.getHitboxHandler().getHitbox(HitboxConstants.HitboxType.GroundHitbox);
        let secondHBox: Hitbox = objectTwo.getHitboxHandler().getHitbox(HitboxConstants.HitboxType.GroundHitbox);
        if (firstHBox == null) return -1;
        if (secondHBox == null) return 1;
        let firstY: number = GameObjectHandler.getHighestShapeY(firstHBox);
        let secondY: number = GameObjectHandler.getHighestShapeY(secondHBox);
        if (firstY < secondY) return -1;
        if (firstY > secondY) return 1;
        return 0;
    }

    private static getHighestShapeY(hitbox: Hitbox): number {
        let highestY: number = null;
        hitbox.getShapes().forEach(shape => {
            let shapesY: number = hitbox.getY() + shape.getLocalY();
            if (shape instanceof Rectangle) {
                shapesY += shape.getHeight();
            } else if (shape instanceof Circle) {
                shapesY += (shape as Circle).getRadius();
            }

            if (highestY == null || shapesY > highestY) {
                highestY = shapesY;
            }
        });
        return highestY;
    }

    /**
     * Adds the specified GameObject to a list of objects,
     * which will be prioritized in the rendering order.
     * The prioritized objects will be rendered first.
     * Therefore the will appear in the background.
     * @param object Any GameObject.
     */
    public static prioritise(object: GameObject): void {
        this.GAME_OBJECTS_TO_PRIORITISE.push(object);
    }
}
