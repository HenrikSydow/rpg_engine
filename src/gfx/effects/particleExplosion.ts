import { GameObject } from "../../gameObjects/gameObject.js";
import { GameObjectHandler } from "../../gameObjects/gameObjectHandler.js";
import { GameTime } from "../../gameTime.js";
import { StandardMaths } from "../../maths/standardMaths.js";
import { Vector2D } from "../../maths/vector2D.js";
import { Color } from "../color.js";
import { Particle } from "./particle.js";

/**
 * A gfx effect displaying particles in varying sizes and colors,
 * exploding into random directions from a given point.
 */
export class ParticleExplosion extends GameObject {

    private particles: Array<Particle> = [];
    private fadeSpeed: number = 0.03;
    private fadeDistance: number;
    private amount: number;

    /**
     * Creates a new ParticleExplosion.
     * @param x The explosions x coordinate.
     * @param y The explosions y coordinate.
     * @param amount The amount of particles to generate.
     * @param color The color of the generated particles.
     * @param fadeDistance The distance when particles should begin to fade out.
     * @param maxVelocity The maximum velocity of particles.
     * @param minParticleSize The minimum velocity of particles.
     * @param maxParticleSize The maximum size of particles.
     */
    constructor(
        x: number, y: number, amount: number, color: Color,
        fadeDistance: number = 100, maxVelocity: number = 4,
        minParticleSize: number = 5, maxParticleSize: number = 5
    ) {
        super(x, y);
        this.fadeDistance = fadeDistance;
        this.amount = amount;
        this.createParticles(minParticleSize, maxParticleSize, color, maxVelocity);
    }

    private createParticles(minParticleSize: number, maxParticleSize: number, color: Color, maxVelocity: number): void {
        for (let i = 0; i < this.amount; i++) {
            let size: number = StandardMaths.getRandomInt(minParticleSize, maxParticleSize);
            let particle: Particle = new Particle(this.x, this.y, size, color);
            let minVel: number = 0.01;  // make sure no particle is stationary, since it won't despawn
            let particleSpeed: number = StandardMaths.getRandomDouble(minVel, maxVelocity);
            let xVel: number = StandardMaths.getRandomDouble(minVel, particleSpeed);
            let yVel: number = Math.sqrt(Math.pow(particleSpeed, 2) - Math.pow(xVel, 2));

            particle.setVelX(StandardMaths.flipRandom(xVel));
            particle.setVelY(StandardMaths.flipRandom(yVel));

            this.particles.push(particle);
        }
    }

    private getParticleDistance(particle: Particle): number {
        return new Vector2D(this.x, this.y, particle.getX(), particle.getY()).getLength();
    }

    private isTotalAlphaZero(): boolean {
        return this.getParticlesPositiveAlpha().length <= 0;
    }

    private getParticlesPositiveAlpha(): Array<Particle> {
        let positiveParticles: Array<Particle> = [];
        this.particles.forEach(particle => {
            if (particle.getAlpha() > 0) {
                positiveParticles.push(particle);
            }
        });
        return positiveParticles;
    }

    /**
     * Updates this object.
     * Updates all particles belonging to this effect as well.
     */
    public override update(): void {
        this.particles.forEach( particle => {
            if (
                this.getParticleDistance(particle) >= this.fadeDistance ||
                1 - this.getParticlesPositiveAlpha().length / this.amount >= 0.7
            ) {
                particle.setAlpha(particle.getAlpha() - (0.4 * GameTime.normalize(this.fadeSpeed)));
            }
        });

        if (this.isTotalAlphaZero()) {
            GameObjectHandler.remove(this);
        }

        this.particles.forEach( particle => particle.update() );
    }

    /**
     * Renders this object.
     * @param ctx A rendering context.
     */
    public override render(ctx: CanvasRenderingContext2D): void {
        this.particles.forEach( particle => particle.render(ctx) );
    }

}
