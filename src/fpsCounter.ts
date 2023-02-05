
export abstract class FpsCounter {
    private static LAST_TIME_STAMP: number = Date.now();

    public static render(ctx: CanvasRenderingContext2D): void {
        let timeStamp: number = Date.now();
        let secondsPassed: number = (timeStamp - FpsCounter.LAST_TIME_STAMP) / 1000;
        FpsCounter.LAST_TIME_STAMP = timeStamp;

        let fps: number = Math.ceil(1 / secondsPassed);

        ctx.font = '25px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText("FPS: " + fps, 10, 30);
    }
}
