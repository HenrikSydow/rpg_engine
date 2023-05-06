
/**
 * Simple FPS counter.
 */
export abstract class FpsCounter {
    private static LAST_TIME_STAMP: number = Date.now();

    /**
     * Renders the current framerate to the screen.
     * It will always be displayed at the top left corner of the
     * RenderingContext's corresponding Canvas.
     * @param ctx A rendering context.
     */
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
