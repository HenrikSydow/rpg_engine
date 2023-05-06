import { FpsCounter } from "./fpsCounter.js";
import { GameObjectHandler } from "./gameObjects/gameObjectHandler.js";
import { GameTime } from "./gameTime.js";
import { KeyHandler } from "./keyHandler.js";
import { MouseHandler } from "./mouseHandler.js";
import { HudMessageDisplay } from "./hud/hudMessageDisplay.js";

/**
 * Main class of the engine.
 * Initializes all game components / gameObjects.
 */
export class Game {
    private static readonly canvas: HTMLCanvasElement = document.getElementById("gameCanvas") as HTMLCanvasElement;
    private static readonly ctx2d: CanvasRenderingContext2D = Game.canvas.getContext("2d") as CanvasRenderingContext2D;

    /**
     * The constructor for the Game class.
     */
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

    /**
     * The gameloop, which calls update and render methods.
     */
    public gameloop(): void {
        this.update();
        this.render();

        window.requestAnimationFrame(this.gameloop.bind(this));
    }

    /**
     * The main update method of the entire game engine.
     * Called by the gameloop.
     */
    private update(): void {
        GameTime.update();
        GameObjectHandler.update();
        HudMessageDisplay.update();
    }

    /**
     * The main render method of the entire game engine.
     * Called by the gameloop.
     */
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
/**
 * Entry point for the application / game engine and composition root.
 */
window.onload = () => {
    new Game();
}
// ===========================================================================
