import { Vector2 } from "./vector2.js";
import { BallEntity } from "./ballEntity.js";

//Setup

/** @type {HTMLCanvasElement} */
var canvas = document.getElementById("main-canvas");
/**@type {CanvasRenderingContext2D} */
var ctx = canvas.getContext('2d');
var canvasVec2;


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

let ball1 = new BallEntity(new Vector2(20, 0), "#00eecc", 20, new Vector2(0, 0), new Vector2(0, 0), 10, canvasVec2, 0.65)
console.log(ball1);
let f = 5000;

document.addEventListener('keypress', (e) =>{
    console.log(e.key);
    
    switch (e.key) {
        case 'a':
            ball1.addImpulse(new Vector2(-f, 0));
            break;
        case 'd':
            ball1.addImpulse(new Vector2(f, 0));
            break;
        case 'w':
            ball1.addImpulse(new Vector2(0, -f));
            break;   
        case 's':
            ball1.addImpulse(new Vector2(0, f));
            break;             
        default:
            break;
    }
    console.log(1);
    
});
function mainLoop(){
    ctx.clearRect(0,0, canvasVec2.x, canvasVec2.y);
    let currentTime = Date.now();
    elapsedTime = currentTime-startTime;
    deltaTime = (currentTime - lastFrameTime)/1000;
    lastFrameTime = currentTime;
    
    //physics
    

    ball1.update(deltaTime);
    ball1.render(ctx);

}

setInterval(() => {
    mainLoop();
}, 1000/60);