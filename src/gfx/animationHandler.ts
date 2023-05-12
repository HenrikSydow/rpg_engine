import { Animation } from "./animation.js";

export class AnimationHandler {

    /** The animations added to this handler. */
    private animations: Map<String, Animation> = new Map();
    /** The currently active animation. */
    private activeAnimation: Animation;
    /** The previously active animation, relevant when invoking another animation once. */
    private previousAnimation: Animation;
    /** Tracks whether another animation is invoked once. */
    private invokingOnce: boolean = false;
    /** Tracks whether the handler is animating or currently paused. */
    private animating: boolean = true;
    /** Stores a callback function. See: {@link AnimationHandler.invokeAnimationOnceCallback} */
    private callbackFunction: Function = null;

    /**
     * Adds a key, value pair of an animation id and an animation
     * to this handler. If no animation has been added to this handler
     * before, the newly added animation will be set as active.
     * @param name The key or name of the animation.
     * @param animation An animation.
     */
    public addAnimation(name: String, animation: Animation): void {
        this.animations.set(name, animation);
        if (this.activeAnimation == undefined)
            this.setActiveAnimation(name);
    }

    /**
     * Removes an animation from this handler.
     * @param name The key of an animation handled by this handler.
     */
    public removeAnimation(name: String): void {
        this.animations.delete(name);
    }

    /**
     * Runs an animation added to this handler exactly once and then executes
     * a callback function. Also take a look at: {@link AnimationHandler.invokeAnimationOnce}
     * @param name The key of an animation.
     * @param callback A callback function.
     */
    public invokeAnimationOnceCallback(name: String, callback: Function): void {
        this.invokeAnimationOnce(name);
        this.callbackFunction = callback;
    }

    /**
     * Executes an animation added this handler exactly once,
     * then continues with the previous animation.
     * @param name Key of an animation.
     */
    public invokeAnimationOnce(name: String): void {
        this.previousAnimation = this.activeAnimation;
        this.setActiveAnimation(name);
        this.activeAnimation.restart();
        this.invokingOnce = true;
    }

    /**
     * Pauses all animations. Renders only a freeze frame.
     * Animations will not be updated.
     */
    public pauseAnimations(): void {
        this.animating = false;
    }

    /**
     * Restarts the current animation and unpauses
     * this handler / the animations.
     */
    public restartActiveAnimation(): void {
        this.animating = true;
        this.activeAnimation.restart();
    }

    /**
     * Sets the current active animation of this handler.
     * @param name The key of an animation previously added to this handler.
     */
    public setActiveAnimation(name: String): void {
        this.activeAnimation = this.animations.get(name);
    }

    /**
     * Getter for the current active animation.
     * @returns Active Animation
     */
    public getActiveAnimation(): Animation {
        return this.activeAnimation;
    }

    /**
     * Finds the key assigned to the given animation inside
     * this handler.
     * @param animation An animation added to this handler.
     * @returns The key of the animation.
     */
    public getAnimationKey(animation: Animation): String {
        return Object.keys(this.animations).find(
                key => this.animations[key] === animation
            );
    }

    /**
     * Getter for animating property.
     * @returns Whether handler is animating.
     */
    public isAnimating(): boolean {
        return this.animating;
    }

    /**
     * Getter for invokingOnce property.
     * @returns Whether handler is invoking once.
     */
    public isInvokingOnce(): boolean {
        return this.invokingOnce;
    }

    /**
     * Determines whether an animation, added to this handler and
     * identified by the given key, is currently the active animation
     * of this handler.
     * @param key Key of an animation added to this handler.
     * @returns Whether the animation is active.
     */
    public isActiveAnimation(key: String): boolean {
        return (this.getAnimationKey(this.getActiveAnimation()) == key);
    }

    /**
     * Updates the active animation, executes callback functions, etc.
     * @param x The global x coordinate of this handler.
     * @param y The global y coordinate of this handler.
     */
    public update(x: number, y: number): void {
        if (this.animations.size <= 0 || this.animations == undefined) {
            return;
        }

        // finished invoking an animation once:
        let activeAnimationFinished: boolean = (this.activeAnimation.getPlayCount() > 0);
        if (this.invokingOnce && activeAnimationFinished) {
            this.setActiveAnimation(
                this.getAnimationKey(this.previousAnimation)
            );
            this.invokingOnce = false;
            
            // do we have a callback function? yes, then execute and delete
            if (this.callbackFunction != null) {
                this.callbackFunction();
                this.callbackFunction = null;
            }
        }

        if (this.animating) {
            this.activeAnimation.update();
        }

        this.activeAnimation.setX(x);
        this.activeAnimation.setY(y);
    }

    /**
     * Renders the active animation.
     * @param ctx Canvas rendering context.
     */
    public render(ctx: CanvasRenderingContext2D): void {
        if (this.activeAnimation == undefined) {
            return;
        }

        this.activeAnimation.render(ctx);
    }

}
