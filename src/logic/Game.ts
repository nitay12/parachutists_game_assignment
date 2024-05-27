import { Boat } from "./Boat";
import { Plane } from "./Plane";
import { SingleDropPlane } from "./SingleDropPlane";
import { Renderer } from "../view/Renderer";

export class Game {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private boat: Boat;
  private plane: Plane;
  private renderer: Renderer;
  private lastTime: number;
  private score: number;
  private misses: number;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.context = context;
    this.boat = new Boat(canvas.width, canvas.height);
    this.plane = new SingleDropPlane(40, 40, 50, 30);
    this.renderer = new Renderer(this.context);
    this.lastTime = 0;
    this.score = 0;
    this.misses = 0;
  }

  start() {
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  private gameLoop(timestamp: number) {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;
    this.update(deltaTime);
    this.draw();
  
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  public update(deltaTime: number) {
    this.plane.update(deltaTime);
    this.plane.getParachutists().forEach((parachutist) => {
      parachutist.update(deltaTime);
      const boatBounds = this.boat.getBounds();
      if (
        parachutist.isCaughtByBoat(
          boatBounds.x,
          boatBounds.y,
          boatBounds.width,
          boatBounds.height
        )
      ) {
        parachutist.catch();
        this.score += 1;
      } else if (parachutist.isOutOfBounds(this.canvas.height-parachutist.getBounds().height)) {
        this.misses += 1;
      }
    });
  }

  public draw() {
    this.renderer.clearCanvas();
    this.renderer.drawPlane(this.plane);
    this.renderer.drawBoat(this.boat);
    this.drawScore();
  }

  private drawScore() {
      this.context.fillStyle = 'black';
      this.context.font = '20px Arial';
      this.context.fillText(`Score: ${this.score}`, 10, 20);
      this.context.fillText(`Misses: ${this.misses}`, 10, 40);
  }

  moveBoatLeft() {
    this.boat.move("left");
  }

  moveBoatRight() {
    this.boat.move("right");
  }
}
