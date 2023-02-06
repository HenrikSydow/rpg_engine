
export abstract class HitboxBase {

    protected x: number;
    protected y: number;

    constructor(x: number, y:number) {
        this.setPosition(x, y);
    }

    public setPosition(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    public getPosition(): [number, number] {
        return [this.x, this.y];
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public abstract intersects(hitbox: HitboxBase): boolean;

}
