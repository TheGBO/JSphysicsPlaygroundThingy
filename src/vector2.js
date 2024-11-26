export class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // Add another Vector2
    add(vector) {
        return new Vector2(this.x + vector.x, this.y + vector.y);
    }

    // Subtract another Vector2
    subtract(vector) {
        return new Vector2(this.x - vector.x, this.y - vector.y);
    }

    // Multiply by a scalar or another Vector2
    mult(value) {
        if (value instanceof Vector2) {
            return new Vector2(this.x * value.x, this.y * value.y);
        }
        return new Vector2(this.x * value, this.y * value);
    }

    // Divide by a scalar or another Vector2
    divide(value) {
        if (value instanceof Vector2) {
            return new Vector2(this.x / value.x, this.y / value.y);
        }
        return new Vector2(this.x / value, this.y / value);
    }

    // Dot product with another Vector2
    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
    }

    // Length (magnitude) of the vector
    magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    // Normalize the vector (make it unit length)
    normalize() {
        const mag = this.magnitude();
        if (mag === 0) return new Vector2(0, 0);
        return this.divide(mag);
    }

    // Custom string representation
    toString() {
        return `Vector2(${this.x}, ${this.y})`;
    }

    // Allow implicit casting to primitive for use in arithmetic
    [Symbol.toPrimitive](hint) {
        if (hint === "number") {
            return this.magnitude();
        }
        return this.toString();
    }
}
