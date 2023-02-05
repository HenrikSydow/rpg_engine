
export abstract class GameObject {
    protected x: number;
    protected y: number;
    protected velX: number = 0;
    protected velY: number = 0;
    
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public abstract update(): void;
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
