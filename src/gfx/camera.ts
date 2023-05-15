import { GameObject } from "../gameObjects/gameObject.js";
import { GameTime } from "../gameTime.js";

/**
 * A camera which can be moved across the screen, track GameObjects
 * and zoom in and out.
 */
export class Camera extends GameObject {

    private trackedObject: GameObject;
    private zoom: number = 1;

    constructor() {
        super(0, 0);
    }

    /**
     * Moves the camera to a new location immediately.
     * @param x new x coordinate
     * @param y new y coordinate
     */
    public setLocation(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    /**
     * Shifts the camera on the x and y axis.
     * @param xShift The amount to shift on the x axis.
     * @param yShift The amount to shift on the y axis.
     */
    public shiftLocation(xShift: number, yShift: number): void {
        this.x += xShift;
        this.y += yShift;
    }

    /**
     * Pass a GameObject to be tracked by the camera.
     * @param gameObject An object to be tracked.
     */
    public trackObject(gameObject: GameObject): void {
        this.trackedObject = gameObject;
    }

    /**
     * Stops tracking the current object and returns it.
     * @returns The previously tracked object.
     */
    public releaseObject(): GameObject {
        let tempTracked: GameObject = this.trackedObject;
        this.trackedObject = null;
        return tempTracked;
    }

    /**
     * Increases the zoom factor by the given amount.
     * @param amount Zoom factor increase.
     */
    public zoomIn(amount: number = 1): void {
        this.zoom += amount;
    }

    /**
     * Decreases the zoom factor by the given amount.
     * @param amount Zoom factor decrease.
     */
    public zoomOut(amount: number = 1): void {
        this.zoom -= amount;
    }

    /**
     * Sets the zoom factor to the given amount.
     * @param amount The new zoom factor.
     */
    public setZoom(amount: number): void {
        this.zoom = this.zoom;
    }

    /**
     * Returns the current zoom factor.
     * @returns current zoom factor.
     */
    public getZoom(): number {
        return this.zoom;
    }

    /** Updates the camera. Handles movement by camera's velocity. */
    public update(): void {
        this.x += GameTime.normalize(this.velX);
        this.y += GameTime.normalize(this.velY);
        
        if (this.trackedObject != null) {
            let offsetX: number = window.innerWidth / 2;
            let offsetY: number = window.innerHeight / 2;
            this.setLocation(
                this.trackedObject.getX() - offsetX,
                this.trackedObject.getY() - offsetY
            );
        }
    }

    /** Renders the camera. */
    public render(cxt: CanvasRenderingContext2D): void {
        cxt.scale(this.zoom, this.zoom);
        cxt.translate(-this.x, -this.y);
    }

}
