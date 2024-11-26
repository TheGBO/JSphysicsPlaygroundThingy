import { Vector2 } from "./vector2.js";
import { BallEntity } from "./ballEntity.js";

//Setup

/** @type {HTMLCanvasElement} */
var canvas = document.getElementById("main-canvas");
/**@type {CanvasRenderingContext2D} */
var ctx = canvas.getContext('2d');
var canvasVec2;

//250px = 1 meter in this simulation because i want to
const meter = 250;

function refreshCanvasSize(){
    canvasVec2 = new Vector2(document.documentElement.clientWidth, document.documentElement.clientHeight);
    canvas.width = canvasVec2.x;
    canvas.height = canvasVec2.y;
}

refreshCanvasSize();
window.addEventListener('resize', refreshCanvasSize)

//loop
var startTime = Date.now();
var elapsedTime;
var deltaTime;
var lastFrameTime = Date.now();

let ball1 = new BallEntity(new Vector2(0,0), "#00eecc", 20, new Vector2(1110,0), new Vector2(0, 1980.8), 10)
console.log(ball1);

function mainLoop(){
    requestAnimationFrame(mainLoop);
    ctx.clearRect(0,0, canvasVec2.x, canvasVec2.y);
    let currentTime = Date.now();
    elapsedTime = currentTime-startTime;
    deltaTime = (currentTime - lastFrameTime)/1000;
    lastFrameTime = currentTime;
    
    ball1.update(deltaTime);
    ball1.render(ctx);

}

mainLoop();
