import { FpsCounter } from "./fpsCounter.js";
import { GameObjectHandler } from "./gameObjects/gameObjectHandler.js";
import { GameTime } from "./gameTime.js";
import { KeyHandler } from "./keyHandler.js";
import { MouseHandler } from "./mouseHandler.js";
import { HudMessageDisplay } from "./hud/hudMessageDisplay.js";

export class Game {
    private static readonly canvas: HTMLCanvasElement = document.getElementById("gameCanvas") as HTMLCanvasElement;
    private static readonly ctx2d: CanvasRenderingContext2D = Game.canvas.getContext("2d") as CanvasRenderingContext2D;

    constructor() {
        // Bind mousehandler:
        document.onmousedown    = MouseHandler.handlePressed;
        document.onmouseup      = MouseHandler.handleReleased;
        document.onmouseleave   = MouseHandler.handleReleased;
        document.onmousemove    = MouseHandler.handleMoved;

        // Bind keyhandler:
        window.addEventListener("keydown", KeyHandler.handleKeyDown);
        window.addEventListener("keyup", KeyHandler.handleKeyUp);

        window.requestAnimationFrame(this.gameloop.bind(this));
    }

    public gameloop(): void {
        this.update();
        this.render();

        window.requestAnimationFrame(this.gameloop.bind(this));
    }

    private update(): void {
        GameTime.update();
        GameObjectHandler.update();
        HudMessageDisplay.update();
    }

    private render(): void {
        let ctx: CanvasRenderingContext2D = Game.ctx2d;
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;

        // Options:
        ctx.imageSmoothingEnabled = false; // <-- disables anti aliasing, necessary for pixelart

        // Background:
        ctx.fillStyle = "#111111";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Foreground:
        GameObjectHandler.render(ctx);

        // HUD:
        HudMessageDisplay.render(ctx);
        FpsCounter.render(ctx);

        // Cleanup:
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

}

// ENTRY POINT & Composition root: ===========================================
window.onload = () => {
    new Game();
}
// ===========================================================================
