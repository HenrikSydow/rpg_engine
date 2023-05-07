
/**
 * Represents a color using rgb color channels.
 */
export class Color {

    private red: number;
    private green: number;
    private blue: number;

    constructor(red: number = 0, green: number = 0, blue: number = 0) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    /**
     * Returns this colors r,g,b channels.
     * @returns An array containing the r,g,b values.
     */
    public getRGB(): Array<number> {
        return [this.red, this.green, this.blue];
    }

    /**
     * Expects an array with three numbers,
     * representing rgb-channels with values from 0 to 255.
     * Updates / changes this color to the specified values.
     * @param rgb RGB values as array.
     * @returns This instance with updated colors.
     */
    public setRGB(rgb: Array<number>): Color {
        this.red    = rgb[0];
        this.green  = rgb[1];
        this.blue   = rgb[2];
        return this;
    }

    /**
     * Converts this color to a string in the following format:
     * "rgb( redValue, greenValue, blueValue )"
     * @returns A string containing this colors values.
     */
    public toString(): string {
        return `rgb(${this.red}, ${this.green}, ${this.blue})`;
    }

    /**
     * Increases this colors brightness by increasing
     * the value of each color channel by the specified amount.
     * The values are capped at 255.
     * @param increase The amount to increase by.
     */
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
