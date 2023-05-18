
/**
 * An Animation consists out of an Array of HTMLImageElements
 * which can be cycled through. Should be added to an instance of {@link AnimationHandler}.
 */
export class Animation {

    /** All the frames of this animation. */
    private frames: Array<HTMLImageElement>;

    /** The x coordinate of this animation. */
    private x: number = 0;
    /** The y coordinate of this animation. */
    private y: number = 0;
    /** The x offset of this animation from its global x. */
    private xOffset: number = 0;
    /** The y offset of this animation from its global y. */
    private yOffset: number = 0;

    /** The index of the frame that is currently displayed. */
    private currentFrame: number = 0;
    /** The amount of milliseconds between each new frame. */
    private frameTime: number = 100;
    /** Timestamp of when the last frame was first displayed. */
    private lastFrameTime: number = Date.now();

    /** The start timestamp of this animation. */
    private startTime: number = Date.now();
    /** The total runtime of this animation. */
    private totalRuntime: number = 0;
    /** The target cycle time for exactly one iteration of the the frames. */
    private targetCycleTime: number;

    /** The scaling factor for this animation. */
    private scale: number = 1;
    /** Defines whether the animation shall be flipped on the x axis. */
    private flipOnX: boolean = false;
    /** Defines whether the animation shall be flipped on the y axis. */
    private flipOnY: boolean = false;

    /** The amount of times the animation has been played. */
    private playCount: number = 0;

    /**
     * The constructor.
     * @param frames An array containing all the frames for this animation.
     */
    constructor(frames: Array<HTMLImageElement>) {
        this.frames = frames;
        this.targetCycleTime = this.frames.length * this.frameTime;
    }

    /**
     * Updates the frame time property and calcultes a new targetCycleTime.
     * @param frameTime The new frame time.
     */
    public setFrameTime(frameTime: number): void {
        this.frameTime = frameTime;
        this.targetCycleTime = this.frames.length * this.frameTime;
    }

    /**
     * Restarts this animation and resets this following properties:
     * - currentFrame
     * - lastFrameTime
     * - startTime
     * - totalRuntime
     * - playCount
     */
    public restart(): void {
        this.currentFrame = 0;
        this.lastFrameTime = Date.now();
        this.startTime = Date.now();
        this.totalRuntime = 0;
        this.playCount = 0;
    }

    /**
     * Updates this animation. Iterates through the frames and calculates
     * the total runtime.
     */
    public update(): void {
        let currentTime: number = Date.now();
        if (currentTime - this.lastFrameTime >= this.frameTime) {
            this.currentFrame++;
            if (this.currentFrame == this.frames.length) {
                this.playCount++;
                this.currentFrame = 0;
            }
            this.lastFrameTime = currentTime;
        }
        this.totalRuntime = currentTime - this.startTime;
    }

    /**
     * Renders the current frame of this animation
     * and applies scaling and mirroring on x and y axis.
     * @param ctx A canvasRenderingContext.
     */
    public render(ctx: CanvasRenderingContext2D): void {
        let frame: HTMLImageElement = this.frames[this.currentFrame];
        let frameX: number = this.x + this.xOffset * this.scale;
        let frameY: number = this.y + this.yOffset * this.scale;
        let frameWidth: number = frame.width * this.scale;
        let frameHeight: number = frame.height * this.scale;
        // Save the initial tansform:
        let initialTansform: DOMMatrix = ctx.getTransform();

        if (this.flipOnY) {
            ctx.scale(-1, 1);
            frameX = -frameX - frameWidth;
        }
        if (this.flipOnX) {
            ctx.scale(1, -1);
            frameY = -frameY - frameHeight;
        }

        ctx.drawImage(frame, frameX, frameY, frameWidth, frameHeight);

        // If transform has been altered reset it:
        if (this.flipOnX || this.flipOnY)
            ctx.setTransform(initialTansform);
    }

    /** Setter for flipOnX. */
    public setFlipOnX(flip: boolean): void {
        this.flipOnX = flip;
    }

    /** Setter for flipOnY. */
    public setFlipOnY(flip: boolean): void {
        this.flipOnY = flip;
    }

    /** Setter for x coordinate. */
    public setX(x: number): void {
        this.x = x;
    }

    /** Setter for y coordinate. */
    public setY(y: number): void {
        this.y = y;
    }

    /** Setter for scale. */
    public setScale(scale: number): void {
        this.scale = scale;
    }

    /** Setter for x offset. */
    public setXOffset(offset: number): void {
        this.xOffset = offset;
    }

    /** Setter for y offset. */
    public setYOffset(offset: number): void {
        this.yOffset = offset;
    }

    /** Getter for playcount property. */
    public getPlayCount(): number {
        return this.playCount;
    }

    /** Getter for the current frame. */
    public getCurrentFrame(): HTMLImageElement {
        return this.frames[this.currentFrame];
    }

}
