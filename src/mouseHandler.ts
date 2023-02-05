
export abstract class MouseHandler {

    private static BUTTONS: Array<number> = [];
    private static X: number;
    private static Y: number;

    public static handlePressed(event: MouseEvent): void {
        if (!MouseHandler.BUTTONS.includes(event.button)) {
            MouseHandler.BUTTONS.push(event.button);
        }
    }

    public static handleReleased(event: MouseEvent): void {
        let buttonIndex: number = MouseHandler.BUTTONS.indexOf(event.button);
        MouseHandler.BUTTONS.splice(buttonIndex, 1);
    }

    public static handleMoved(event: MouseEvent): void {
        MouseHandler.X = event.pageX;
        MouseHandler.Y = event.pageY;
    }

    public static getX(): number {
        return MouseHandler.X;
    }

    public static getY(): number {
        return MouseHandler.Y;
    }

    public static isPressed(button: MouseHandler.MouseButton): boolean {
        return MouseHandler.BUTTONS.includes(button);
    }
}

export namespace MouseHandler {
    export enum MouseButton {
        Left    = 0,
        Middle  = 1,
        Right   = 2
    }
}
