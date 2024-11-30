import { Vector2 } from "./vector2";
import { gravity } from "./constants";

export class BallEntity {
    pos: Vector2;
    color: string;
    radius: number;
    vel: Vector2;
    acc: Vector2;
    mass: number;
    wDim: Vector2;
    damping: number;
    forces: Vector2;

    /**
     * @param pos - The position of the ball
     * @param color - The color of the ball
     * @param radius - The radius of the ball
     * @param vel - The velocity of the ball
     * @param acc - The acceleration of the ball
     * @param mass - The mass of the ball
     * @param wDim - The world dimensions
     * @param damping - The ball damping
     */
    constructor(
        pos: Vector2,
        color: string,
        radius: number,
        vel: Vector2,
        acc: Vector2,
        mass: number,
        wDim: Vector2,
        damping: number
    ) {
        this.pos = pos;
        this.color = color;
        this.vel = vel;
        this.acc = acc;
        this.mass = mass;
        this.radius = radius;
        this.wDim = wDim;
        this.damping = damping;

        this.forces = new Vector2(0, 0);
    }

    addForce(force: Vector2): void {
        this.forces = this.forces.add(force.mult(this.mass));
    }

    addImpulse(impulse: Vector2): void {
        this.vel = this.vel.add(impulse.mult(1 / this.mass));
    }

    update(deltaTime: number): void {
        // Detect world boundaries
        if (this.pos.y + this.radius > this.wDim.y) {
            this.vel.y = -this.vel.y * this.damping;
            this.pos.y = this.wDim.y - this.radius;
        }
        if (this.pos.y - this.radius < 0) {
            this.vel.y = -this.vel.y * this.damping;
            this.pos.y = this.radius;
        }

        if (this.pos.x + this.radius > this.wDim.x) {
            this.vel.x = -this.vel.x * this.damping;
            this.pos.x = this.wDim.x - this.radius;
        }
        if (this.pos.x - this.radius < 0) {
            this.vel.x = -this.vel.x * this.damping;
            this.pos.x = this.radius;
        }

        this.simulatePhysics(deltaTime);
    }

    simulatePhysics(deltaTime: number): void {
        const netAcceleration = this.forces.mult(1 / this.mass).add(this.acc);
        this.vel = this.vel.add(netAcceleration.mult(deltaTime));
        this.pos = this.pos.add(this.vel.mult(deltaTime));

        this.forces = new Vector2(0, 0);
    }

    render(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}
