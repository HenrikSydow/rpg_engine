
/**
 * The GameTime class keeps track of the global update time
 * and delta time between each update.
 * It needs to be updated inside the gameloop, at the
 * beginning of the update cycle.
 */
export abstract class GameTime {
    private static DELTA_TIME: number = 0;

    private static LAST_UPDATE_TIME: number = Date.now();

    /**
     * Updates the DELTA_TIME and LAST_UPDATE_TIME properties.
     * Needs to be called at the beginning of the game engines update cycle.
     */
    public static update(): void {
        let currentTime: number = Date.now();
        GameTime.DELTA_TIME = currentTime - GameTime.LAST_UPDATE_TIME;
        GameTime.LAST_UPDATE_TIME = currentTime;
    }

    /**
     * Returns the games delta time between updates in milliseconds.
     * @returns delta time
     */
    public static getDelta(): number {
        return GameTime.DELTA_TIME;
    }

    /**
     * Takes any number and normalizes it using the delta time,
     * to make values consistent during varying execution times.
     * Examples might be movement events of Sprites on the screen.
     * @param value A value to be normalized.
     * @returns The normalized value.
     */
    public static normalize(value: number): number {
        return value * (GameTime.DELTA_TIME / 10);
    }
}
