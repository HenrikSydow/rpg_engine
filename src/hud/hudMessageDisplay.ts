import { GameTime } from "../gameTime.js";
import { Color } from "../gfx/color.js";

export abstract class HudMessageDisplay {

    private static MESSAGES: Array<Message> = [];

    constructor() {
    }

    public static addMessage(text: string, type: HudMessage.Type): void {
        let newMessage: Message;
        switch (type) {
            case HudMessage.Type.CenterScreenBigMessage:
                newMessage = new CenterScreenBigMessage(text);
                break;
        }
        if (newMessage != undefined) {
            HudMessageDisplay.MESSAGES.push(newMessage);
        }
    }

    public static update(): void {
        HudMessageDisplay.MESSAGES.forEach(message => {
            if (Date.now() - message.getCreationTime() >= message.getFadeTime()) {
                message.setAlpha(message.getAlpha() - 0.1 * GameTime.getDelta() / 100);
                if (message.getAlpha() <= 0) {
                    let index = HudMessageDisplay.MESSAGES.indexOf(message);
                    HudMessageDisplay.MESSAGES.splice(index, 1);
                }
            }
        });
    }

    public static render(ctx: CanvasRenderingContext2D): void {
        // Save default settings: ======================
        let defaultTextAlign = ctx.textAlign;
        let defaultAlpha = ctx.globalAlpha;
        // =============================================

        HudMessageDisplay.MESSAGES.forEach(message => {
            ctx.textAlign = message.getAlignment() as CanvasTextDrawingStyles["textAlign"];
            ctx.font = message.getFont();
            ctx.fillStyle = new Color(255, 255, 255).toString();
            ctx.globalAlpha = message.getAlpha();
            ctx.fillText(message.getText(), message.getX(), message.getY());
        });

        // Restore default settings: ===================
        ctx.textAlign = defaultTextAlign;
        ctx.globalAlpha = defaultAlpha;
        // =============================================
    }

}

export namespace HudMessage {
    export enum Type {
        CenterScreenBigMessage
    }
}

abstract class Message {
    protected alpha: number = 1;
    protected text: string;
    protected x: number;
    protected y: number;
    protected creationTime: number;
    protected fadeTime: number;
    protected alignment: string;
    protected font: string;

    constructor(text: string, x: number, y: number, font: string, fadeTime: number, alignment: string) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.font = font;
        this.creationTime = Date.now();
        this.fadeTime = fadeTime;
        this.alignment = alignment;
    }

    public getText(): string {
        return this.text;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public getFont(): string {
        return this.font;
    }

    public getAlignment(): string {
        return this.alignment;
    }

    public getCreationTime(): number {
        return this.creationTime;
    }

    public getFadeTime(): number {
        return this.fadeTime;
    }

    public getAlpha(): number {
        return this.alpha;
    }

    public setAlpha(value: number): void {
        this.alpha = value;
    }
}

class CenterScreenBigMessage extends Message {
    constructor(text: string) {
        super(
            text,
            window.innerWidth / 2,
            window.innerHeight / 8,
            `bold 50px Arial`,
            2000,
            "center"
        );
    }
}
