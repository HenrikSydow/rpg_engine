
/**
 * The base class for all objects present in the game.
 * All instances of this type should be added to the GameObjectHandler.
 */
export abstract class GameObject {
    /**
     * The GameObject's x coordinate.
     */
    protected x: number;

    /**
     * The GameObject's y coordinate.
     */
    protected y: number;

    /**
     * The GameObject's x velocity.
     */
    protected velX: number = 0;

    /**
     * The GameObject's y velocity.
     */
    protected velY: number = 0;
    
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /**
     * The update method of each GameObject will be called by it's
     * GameObjectHandler.
     * Must be implemented by child classes.
     */
    public abstract update(): void;

    /**
     * The render method of each GameObject will be called by it's
     * GameObjectHandler.
     * Must be implemented by child classes.
     */
    public abstract render(ctx: CanvasRenderingContext2D): void;

    public setVelX(velX: number): void {
        this.velX = velX;
    }

    public setVelY(velY: number): void {
        this.velY = velY;
    }

    public getVelX(): number {
        return this.velX;
    }

    public getVelY(): number {
        return this.velY;
    }

    public setX(value: number): void {
        this.x = value;
    }

    public setY(value: number): void {
        this.y = value;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }
}
