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

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.context = context;
    this.boat = new Boat(canvas.width, canvas.height);
    this.plane = new SingleDropPlane(40, 40, 50, 30);
    this.renderer = new Renderer(this.context);
    this.lastTime = 0;
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
  }

  public draw() {
    this.renderer.clearCanvas();
    this.renderer.drawPlane(this.plane);
    this.renderer.drawBoat(this.boat);
  }

  moveBoatLeft() {
    this.boat.move("left");
  }

  moveBoatRight() {
    this.boat.move("right");
  }
}
