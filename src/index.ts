import { Vector2 } from "./vector2";
import { BallEntity } from "./ballEntity";

// Setup
const canvas = document.getElementById("main-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
let canvasVec2: Vector2 = new Vector2(0,0);

function refreshCanvasSize(): void {
    canvasVec2 = new Vector2(document.documentElement.clientWidth, document.documentElement.clientHeight);
    canvas.width = canvasVec2.x;
    canvas.height = canvasVec2.y;
}

refreshCanvasSize();
window.addEventListener("resize", refreshCanvasSize);

// Loop variables
const startTime = Date.now();
let elapsedTime: number;
let deltaTime: number;
let lastFrameTime = Date.now();

const ball1 = new BallEntity(
    new Vector2(20, 0), 
    "#00eecc", 
    20, 
    new Vector2(0, 0), 
    new Vector2(0, 0), 
    10, 
    canvasVec2, 
    0.65
);
console.log(ball1);

const f = 5000;

document.addEventListener("keypress", (e: KeyboardEvent) => {
    console.log(e.key);

    switch (e.key) {
        case "a":
            ball1.addImpulse(new Vector2(-f, 0));
            break;
        case "d":
            ball1.addImpulse(new Vector2(f, 0));
            break;
        case "w":
            ball1.addImpulse(new Vector2(0, -f));
            break;
        case "s":
            ball1.addImpulse(new Vector2(0, f));
            break;
        default:
            break;
    }
    console.log(1);
});

function mainLoop(): void {
    ctx.clearRect(0, 0, canvasVec2.x, canvasVec2.y);
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    deltaTime = (currentTime - lastFrameTime) / 1000;
    lastFrameTime = currentTime;

    // Physics
    ball1.update(deltaTime);
    ball1.render(ctx);
}

setInterval(() => {
    mainLoop();
}, 1000 / 60);
