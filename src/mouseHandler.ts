
/**
 * The game engines mouse handler.
 */
export abstract class MouseHandler {

    private static BUTTONS: Array<number> = [];
    private static X: number;
    private static Y: number;

    /**
     * Handles all mouse pressed events of the game engine.
     * @param event Any MouseEvent.
     */
    public static handlePressed(event: MouseEvent): void {
        if (!MouseHandler.BUTTONS.includes(event.button)) {
            MouseHandler.BUTTONS.push(event.button);
        }
    }

    /**
     * Handles all mouse released events of the game engine.
     * @param event Any MouseEvent.
     */
    public static handleReleased(event: MouseEvent): void {
        let buttonIndex: number = MouseHandler.BUTTONS.indexOf(event.button);
        MouseHandler.BUTTONS.splice(buttonIndex, 1);
    }

    /**
     * Handles all mouse moved events of the game engine.
     * @param event Any MouseEvent.
     */
    public static handleMoved(event: MouseEvent): void {
        MouseHandler.X = event.pageX;
        MouseHandler.Y = event.pageY;
    }

    /**
     * Returns the mouse's x coordinate on the page.
     * @returns Mouse x coordinate.
     */
    public static getX(): number {
        return MouseHandler.X;
    }

    /**
     * Returns the mouse's y coordinate on the page.
     * @returns Mouse y coordinate.
     */
    public static getY(): number {
        return MouseHandler.Y;
    }

    /**
     * Returns whether a mouse button, corresponding to a value
     * from the MouseButton enum is pressed or not.
     * @param button Any MouseButton.
     * @returns Is the button pressed?
     */
    public static isPressed(button: MouseHandler.MouseButton): boolean {
        return MouseHandler.BUTTONS.includes(button);
    }
}

export namespace MouseHandler {
    /**
     * Enum containing all the mouse buttons that can be
     * used inside the game engine. May be used to identify / pass
     * buttons to other methods. Example: MouseHandler.isPressed( button )
     */
    export enum MouseButton {
        Left    = 0,
        Middle  = 1,
        Right   = 2
    }
}
