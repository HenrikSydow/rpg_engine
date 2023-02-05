
export abstract class KeyHandler {
    private static KEYS: Array<string> = [];

    public static handleKeyDown(event: KeyboardEvent): void {
        event.preventDefault();
        if (!KeyHandler.KEYS.includes(event.key)) {
            KeyHandler.KEYS.push(event.key);
        }
    }

    public static handleKeyUp(event: KeyboardEvent): void {
        let keyIndex: number = KeyHandler.KEYS.indexOf(event.key);
        KeyHandler.KEYS.splice(keyIndex, 1);
    }

    public static getKeys(): ReadonlyArray<string> {
        return KeyHandler.KEYS;
    }

    public static isPressed(keyCode: string): boolean {
        return KeyHandler.getKeys().includes(keyCode);
    }
}
