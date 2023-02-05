import { GameObject } from "./gameObject.js";

export abstract class GameObjectHandler {
    private static GAME_OBJECTS_TO_ADD: Array<GameObject> = [];
    private static GAME_OBJECTS_TO_REMOVE: Array<GameObject> = [];
    private static GAME_OBJECTS_TO_PRIORITISE: Array<GameObject> = [];
    private static GAME_OBJECTS: Array<GameObject> = [];

    public static add(object: GameObject): void {
        GameObjectHandler.GAME_OBJECTS_TO_ADD.push(object);
    }

    public static remove(object: GameObject): void {
        GameObjectHandler.GAME_OBJECTS_TO_REMOVE.push(object);
    }

    public static clear(): void {
        GameObjectHandler.GAME_OBJECTS_TO_ADD = [];
        GameObjectHandler.GAME_OBJECTS_TO_REMOVE = [];
        GameObjectHandler.GAME_OBJECTS_TO_PRIORITISE = [];
        GameObjectHandler.GAME_OBJECTS = []
    }

    public static getAllObjects(): ReadonlyArray<GameObject> {
        return GameObjectHandler.GAME_OBJECTS;
    }

    public static getObjectsByType(type: any): Array<GameObject> {
        let objectsOfType: Array<GameObject> = [];
        GameObjectHandler.GAME_OBJECTS.forEach(object => {
            if (object instanceof type) {
                objectsOfType.push(object);
            }
        });
        return objectsOfType;
    }

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

    public static render(ctx: CanvasRenderingContext2D): void {
        GameObjectHandler.GAME_OBJECTS.forEach(
            object => object.render(ctx)
        );
    }

    public static prioritise(object: GameObject): void {
        this.GAME_OBJECTS_TO_PRIORITISE.push(object);
    }
}
