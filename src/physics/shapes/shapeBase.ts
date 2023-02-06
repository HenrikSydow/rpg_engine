
export abstract class ShapeBase {

    protected localX: number;
    protected localY: number;

    constructor(localX: number, localY: number) {
        this.localX = localX;
        this.localY = localY;
    }

    public setX(value: number): void {
        this.localX = value;
    }

    public setY(value: number): void {
        this.localY = value;
    }

}
