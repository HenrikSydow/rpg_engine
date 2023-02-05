
export abstract class StandardMaths {

    public static getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    public static getRandomDouble(min: number, max: number, precision: number = 3): number {
        precision = Math.pow(10, precision);
        return this.getRandomInt(min * precision, max * precision) / precision;
    }

    public static getRandomDoubleExcludeRange(min: number, max: number, excludeMin: number, excludeMax: number): number {
        if (excludeMin < min) {
            excludeMin = min;
        }
        if (excludeMax > max) {
            excludeMax = max;
        }
        return (this.getRandomInt(0, 2) == 0) ? this.getRandomDouble(min, excludeMin) : this.getRandomDouble(max, excludeMax);
    }

    public static flipRandom(num: number) {
        return (this.getRandomInt(0, 2) == 0) ? num : -num;
    }

}
