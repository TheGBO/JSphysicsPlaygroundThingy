import { Vector2 } from "./vector2.js";

export class BallEntity {
    /**
     * @param {Vector2} pos - The position of the ball
     * @param {string} color - The color of the ball
     * @param {number} radius - The radius of the ball
     * @param {Vector2} vel - The velocity of the ball
     * @param {Vector2} acc - The acceleration of the ball
     * @param {number} mass - The mass of the ball
     */
    constructor(pos, color, radius, vel, acc, mass) {
        this.pos = pos;
        this.color = color;
        this.vel = vel;
        this.acc = acc;
        this.mass = mass;
        this.radius = radius;
        this.forces = new Vector2(0,0);
    }

    update(deltaTime){
        let netAcceleration = this.forces.mult(1 / this.mass).add(this.acc);
        console.log(netAcceleration);
        
        this.vel = this.vel.add(netAcceleration.mult(deltaTime)); 
        this.pos = this.pos.add(this.vel.mult(deltaTime));      

        this.forces = new Vector2(0,0);
    }

    /**
     * @param {CanvasRenderingContext2D} ctx 
     * 
     */
    render(ctx){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI*2)
        ctx.fill();
        ctx.closePath();
    }
}