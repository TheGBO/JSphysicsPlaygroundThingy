import { Vector2 } from "./vector2.js";
import { gravity } from "./constants.js";

export class BallEntity {
    /**
     * @param {Vector2} pos - The position of the ball
     * @param {string} color - The color of the ball
     * @param {number} radius - The radius of the ball
     * @param {Vector2} vel - The velocity of the ball
     * @param {Vector2} acc - The acceleration of the ball
     * @param {number} mass - The mass of the ball
     * @param {Vector2} wDim - The world dimensions
     * @param {Vector2} damping - The ball damping

     */
    constructor(pos, color, radius, vel, acc, mass, wDim, damping) {
        this.pos = pos;
        this.color = color;
        this.vel = vel;
        this.acc = acc;
        this.mass = mass;
        this.radius = radius;
        this.wDim = wDim;
        this.damping = damping;

        this.forces = new Vector2(0,0);
    }
    
    addForce(force){
        this.forces = this.forces.add(force.mult(this.mass));
    }

    addImpulse(impulse){
        this.vel = this.vel.add(impulse.mult(1 / this.mass));
    }

    update(deltaTime){
        //detect world boundaries
        if((this.pos.y + this.radius > this.wDim.y))
        {
            this.vel.y = -this.vel.y*this.damping;
            this.pos.y = this.wDim.y - this.radius;
        }
        if((this.pos.y - this.radius < 0))
        {
            this.vel.y = -this.vel.y*this.damping;
            this.pos.y = this.radius;
        }
        
        if((this.pos.x + this.radius > this.wDim.x))
        {
            this.vel.x = -this.vel.x * this.damping;
            this.pos.x = this.wDim.x - this.radius;
        }
        if((this.pos.x - this.radius < 0))
        {
            this.vel.x = -this.vel.x*this.damping;
            this.pos.x = this.radius;
        }

        this.simulatePhysics(deltaTime);
    }

    simulatePhysics(deltaTime){
        let netAcceleration = this.forces.mult(1 / this.mass).add(this.acc);
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