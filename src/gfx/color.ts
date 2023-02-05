
export class Color {

    private red: number;
    private green: number;
    private blue: number;

    constructor(red: number = 0, green: number = 0, blue: number = 0) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    public getRGB(): Array<number> {
        return [this.red, this.green, this.blue];
    }

    public setRGB(rgb: Array<number>): Color {
        this.red    = rgb[0];
        this.green  = rgb[1];
        this.blue   = rgb[2];
        return this;
    }

    public toString(): string {
        return `rgb(${this.red}, ${this.green}, ${this.blue})`;
    }

    public brighten(increase: number): void {
        this.getRGB().forEach( value => {
            let tempIncrease: number = value + increase;
            if (tempIncrease > 255) {
                increase -= tempIncrease - 255;
            }
        });
        this.setRGB(
            [this.red + increase, this.green + increase, this.blue + increase]
        );
    }

}
