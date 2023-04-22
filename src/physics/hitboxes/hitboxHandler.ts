import { Hitbox } from "./hitbox.js";

export class HitboxHandler {

    protected hitboxes: Map<String, Hitbox>;
    protected enabled: boolean;

    constructor() { }

    public addHitbox(name: String, hitbox: Hitbox): void {
        this.hitboxes.set(name, hitbox);
    }

    public getHitbox(name: String): Hitbox {
        return this.hitboxes.get(name);
    }

    public getHitboxes(): Map<String, Hitbox> {
        return this.hitboxes;
    }

    public setEnabled(state: boolean): void {
        this.hitboxes.forEach( hitbox => {
            hitbox.setEnabled(state);
        });
    }

    public isEnabled(): boolean {
        return this.enabled;
    }

    public shift(xOffset: number, yOffset: number): void {
        this.hitboxes.forEach( hitbox => {
            hitbox.setPosition(
                hitbox.getX() + xOffset,
                hitbox.getY() + yOffset
            );
        });
    }

}
