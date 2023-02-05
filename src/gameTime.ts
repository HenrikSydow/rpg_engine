
export abstract class GameTime {
    private static DELTA_TIME: number = 0;

    private static LAST_UPDATE_TIME: number = Date.now();

    public static update(): void {
        let currentTime: number = Date.now();
        GameTime.DELTA_TIME = currentTime - GameTime.LAST_UPDATE_TIME;
        GameTime.LAST_UPDATE_TIME = currentTime;
    }

    public static getDelta(): number {
        return GameTime.DELTA_TIME;
    }

    public static normalize(value: number): number {
        return value * (GameTime.DELTA_TIME / 10);
    }
}
