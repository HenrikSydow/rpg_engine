
/**
 * This class provides standard methods for
 * advanced mathematics and random number generation.
 */
export abstract class StandardMaths {

    /**
     * Gets a random integer with min inclusive and max exclusive.
     * @param min The minimum value to be generated. (inclusive)
     * @param max The maximum value to be generated. (exclusive)
     * @returns A random integer.
     */
    public static getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    /**
     * Returns a random double / floating point value.
     * @param min Minimum value. (inclusive)
     * @param max Maximum value. (exclusive)
     * @param precision The precision of the generated number. @defaultValue precision = 3
     * @returns A random double / float.
     */
    public static getRandomDouble(min: number, max: number, precision: number = 3): number {
        precision = Math.pow(10, precision);
        return this.getRandomInt(min * precision, max * precision) / precision;
    }

    /**
     * Returns a random double / floating point number from min to excludeMin or excludeMax to
     * max. [Min {excluded numbers} Max]
     * @param min The minimum value. (inclusive)
     * @param max The maximum value. (exclusive)
     * @param excludeMin Start of the exclude range. (inclusive)
     * @param excludeMax End of the exclude range. (exclusive)
     * @returns A random double / float.
     */
    public static getRandomDoubleExcludeRange(min: number, max: number, excludeMin: number, excludeMax: number): number {
        if (excludeMin < min) {
            excludeMin = min;
        }
        if (excludeMax > max) {
            excludeMax = max;
        }
        return (this.getRandomInt(0, 2) == 0) ? this.getRandomDouble(min, excludeMin) : this.getRandomDouble(max, excludeMax);
    }

    /**
     * Has a 50% chance of either making the given number
     * positive or negative.
     * @param num Any number.
     * @returns The flipped value.
     */
    public static flipRandom(num: number) {
        return (this.getRandomInt(0, 2) == 0) ? num : -num;
    }

}
