
/**
 * A simple timer.
 */
export class Timer {

    private startTime: number;

    /**
     * Starts and restarts the timer.
     */
    public start(): void {
        this.startTime = Date.now();
    }

    /**
     * Returns the elapsed time, since the timer was started.
     * @returns elapsed time in milliseconds
     */
    public getElapsedTime(): number {
        return Date.now() - this.startTime;
    }

}
