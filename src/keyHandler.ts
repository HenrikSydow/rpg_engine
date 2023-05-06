
/**
 * Handles all key events of the engine.
 */
export abstract class KeyHandler {
    private static KEYS: Array<string> = [];

    /**
     * Handles all key down events of the game engine.
     * @param event Any keyboard event.
     */
    public static handleKeyDown(event: KeyboardEvent): void {
        event.preventDefault();
        if (!KeyHandler.KEYS.includes(event.key)) {
            KeyHandler.KEYS.push(event.key);
        }
    }

    /**
     * Handles all key up events of the game engine.
     * @param event Any keyboard event.
     */
    public static handleKeyUp(event: KeyboardEvent): void {
        let keyIndex: number = KeyHandler.KEYS.indexOf(event.key);
        KeyHandler.KEYS.splice(keyIndex, 1);
    }

    /**
     * Returns an array containing the key codes of all currently
     * pressed keys.
     * @returns Pressed keys.
     */
    public static getKeys(): ReadonlyArray<string> {
        return KeyHandler.KEYS;
    }

    /**
     * Returns whether the key corresponding to the given
     * keyCode is currently pressed or not.
     * @param keyCode Any keycode.
     * @returns Is keyCode pressed?
     */
    public static isPressed(keyCode: string): boolean {
        return KeyHandler.getKeys().includes(keyCode);
    }
}
