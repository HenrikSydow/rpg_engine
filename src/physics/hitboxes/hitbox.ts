import { Vector2D } from "../../maths/vector2D.js";
import { Circle } from "../shapes/circle.js";
import { Rectangle } from "../shapes/rectangle.js";
import { ShapeBase } from "../shapes/shapeBase.js";

/**
 * A class representing a 2D Hitbox.
 */
export class Hitbox {

    /** The x coordinate of the hitbox. */
    protected x: number;
    /** The y coordinate of the hitbox. */
    protected y: number;
    /** Sets the hitbox enabled or disabled. */
    protected enabled: boolean = true;

    /** Stores all shapes registered to this hitbox. */
    protected shapes: Array<ShapeBase>;

    /**
     * Creates a new Hitbox.
     * @param x The x coordinate.
     * @param y The y coordinate.
     * @param shapes The shapes that make up the hitbox.
     */
    constructor(x: number, y: number, shapes: Array<ShapeBase>) {
        this.setPosition(x, y);
        this.shapes = shapes;
    }

    /**
     * All the shapes that make up this hitbox.
     * @returns Array of shapes.
     */
    public getShapes(): Array<ShapeBase> {
        return this.shapes;
    }

    /**
     * Sets the new position of the hitbox.
     * @param x New x coordinate.
     * @param y New y coordinate.
     */
    public setPosition(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    /**
     * Returns the position of this hitbox.
     * @returns Array with x and y position.
     */
    public getPosition(): [number, number] {
        return [this.x, this.y];
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public isEnabled(): boolean {
        return this.enabled;
    }

    public setEnabled(value: boolean): void {
        this.enabled = value;
    }

    /**
     * Concludes whether this hitbox intersects with another
     * given hitbox.
     * @param hitbox Any hitbox.
     * @returns Do they intersect?
     */
    public intersects(hitbox: Hitbox): boolean {
        if (!this.isEnabled()) {
            return false;
        }

        let intersects: boolean = false;
        hitbox.getShapes().forEach((shape: ShapeBase) => {
            let globalCorShape: [number, number] = [
                hitbox.getX() + shape.getLocalX(),
                hitbox.getY() + shape.getLocalY()
            ];
            this.getShapes().forEach((thisShape: ShapeBase) => {
                let globalCorThisShape: [number, number] = [
                    this.getX() + thisShape.getLocalX(),
                    this.getY() + thisShape.getLocalY()
                ];
                // Check types and compare accordingly:
                if (shape instanceof Circle) {
                    let circleShape: Circle = shape as Circle;
                    if (thisShape instanceof Circle) {
                        let thisCircleShape: Circle = thisShape as Circle;
                        intersects = this.intersectsCircleCircle(globalCorShape, circleShape, globalCorThisShape, thisCircleShape);
                    } else if (thisShape instanceof Rectangle) {
                        let thisRectShape: Rectangle = thisShape as Rectangle;
                        intersects = this.intersectsRectangleCircle(globalCorThisShape, thisRectShape, globalCorShape, circleShape);
                    }
                } else if (shape instanceof Rectangle) {
                    let rectShape: Rectangle = shape as Rectangle;
                    if (thisShape instanceof Circle) {
                        let thisCircleShape: Circle = thisShape as Circle;
                        intersects = this.intersectsRectangleCircle(globalCorShape, rectShape, globalCorThisShape, thisCircleShape);
                    }
                    else if (thisShape instanceof Rectangle) {
                        let thisRectangleShape: Rectangle = thisShape as Rectangle;
                        intersects = this.intersectsRectangleRectangle(globalCorShape, rectShape, globalCorThisShape, thisRectangleShape);
                    }
                }
            });
        });
        return intersects;
    }

    private intersectsCircleCircle(globalCorOne: [number, number], circleOne: Circle, globalCorTwo: [number, number], circleTwo: Circle): boolean {
        let distance: number = new Vector2D(globalCorOne[0], globalCorOne[1], globalCorTwo[0], globalCorTwo[1]).getLength();
        return distance > (circleOne.getRadius() + circleTwo.getRadius());
    }

    private intersectsRectangleCircle(globalCorOne: [number, number], rect: Rectangle, globalCorTwo: [number, number], circle: Circle): boolean {
        throw new Error("method not implemented");
    }

    private intersectsRectangleRectangle(globalCorOne: [number, number], rectOne: Rectangle, globalCorTwo: [number, number], rectTwo: Rectangle) {
        return (globalCorOne[0] <= globalCorTwo[0] + rectTwo.getWidth() &&
                globalCorTwo[0] <= globalCorOne[0] + rectOne.getWidth() &&
                globalCorOne[1] <= globalCorTwo[1] + rectTwo.getHeight() &&
                globalCorTwo[1] <= globalCorOne[1] + rectOne.getHeight()
            );
    }

    /**
     * Concludes whether this hitbox contains another hitbox.
     * @param hitbox Any hitbox.
     * @returns Does this hitbox contain the given hitbox?
     */
    public contains(hitbox: Hitbox): boolean {
        if (!this.isEnabled()) {
            return false;
        }
        throw new Error("\"contains\" method is not implemented in hitbox.ts");
    }

}
