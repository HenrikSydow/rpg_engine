
export abstract class ShapeBase {

    protected localX: number;
    protected localY: number;

    constructor(localX: number, localY: number) {
        this.localX = localX;
        this.localY = localY;
    }

    public setLocalX(value: number): void {
        this.localX = value;
    }

    public setLocalY(value: number): void {
        this.localY = value;
    }

    public getLocalX(): number {
        return this.localX;
    }

    public getLocalY(): number {
        return this.localY;
    }

}
