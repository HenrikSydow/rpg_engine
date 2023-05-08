import { Hitbox } from "./hitbox.js";

/**
 * A handler for multiple {@link Hitbox}es.
 */
export class HitboxHandler {

    /** All added hitboxes. */
    protected hitboxes: Map<String, Hitbox>;
    /** Enables or disables this handler. */
    protected enabled: boolean;

    constructor() { }

    /**
     * Adds a hitbox to this handler.
     * @param name Identifier for the hitbox.
     * @param hitbox The hitbox.
     */
    public addHitbox(name: String, hitbox: Hitbox): void {
        this.hitboxes.set(name, hitbox);
    }

    /**
     * Returns a hitbox added to this handler
     * by its identifier.
     * @param name A hitboxes identifier.
     * @returns A hitbox.
     */
    public getHitbox(name: String): Hitbox {
        return this.hitboxes.get(name);
    }

    public getHitboxes(): Map<String, Hitbox> {
        return this.hitboxes;
    }

    /**
     * Sets all of the hitboxes added to this handler
     * either enabled (true) or disabled (false).
     * @param state true / false
     */
    public setEnabled(state: boolean): void {
        this.hitboxes.forEach( hitbox => {
            hitbox.setEnabled(state);
        });
    }

    public isEnabled(): boolean {
        return this.enabled;
    }

    /**
     * Moves all hitboxes added to this handler by the specified
     * amount.
     * @param xOffset Shift on x axis.
     * @param yOffset Shift on y axis.
     */
    public shift(xOffset: number, yOffset: number): void {
        this.hitboxes.forEach( hitbox => {
            hitbox.setPosition(
                hitbox.getX() + xOffset,
                hitbox.getY() + yOffset
            );
        });
    }

}
