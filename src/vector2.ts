export class Vector2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    // Add another Vector2
    add(vector: Vector2): Vector2 {
        return new Vector2(this.x + vector.x, this.y + vector.y);
    }

    // Subtract another Vector2
    subtract(vector: Vector2): Vector2 {
        return new Vector2(this.x - vector.x, this.y - vector.y);
    }

    // Multiply by a scalar or another Vector2
    mult(value: number | Vector2): Vector2 {
        if (value instanceof Vector2) {
            return new Vector2(this.x * value.x, this.y * value.y);
        }
        return new Vector2(this.x * value, this.y * value);
    }

    // Divide by a scalar or another Vector2
    divide(value: number | Vector2): Vector2 {
        if (value instanceof Vector2) {
            return new Vector2(this.x / value.x, this.y / value.y);
        }
        return new Vector2(this.x / value, this.y / value);
    }

    // Dot product with another Vector2
    dot(vector: Vector2): number {
        return this.x * vector.x + this.y * vector.y;
    }

    // Length (magnitude) of the vector
    magnitude(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    // Normalize the vector (make it unit length)
    normalize(): Vector2 {
        const mag = this.magnitude();
        if (mag === 0) return new Vector2(0, 0);
        return this.divide(mag);
    }

    // Custom string representation
    toString(): string {
        return `Vector2(${this.x}, ${this.y})`;
    }

    // Allow implicit casting to primitive for use in arithmetic
    [Symbol.toPrimitive](hint: string): number | string {
        if (hint === "number") {
            return this.magnitude();
        }
        return this.toString();
    }
}
