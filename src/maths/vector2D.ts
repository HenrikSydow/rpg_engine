
export class Vector2D {

    protected x: number;
    protected y: number;

    constructor(x1: number, y1: number, x2: number, y2: number) {
        this.x = x2 - x1;
        this.y = y2 - y1;
    }

    public getLength(): number {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    public setLength(length: number): void {
        this.normalize();
        this.x *= length;
        this.y *= length;
    }

    public normalize() {
        let length: number = this.getLength();
        this.x = (1 / length) * this.x;
        this.y = (1 / length) * this.y;
    }

}
