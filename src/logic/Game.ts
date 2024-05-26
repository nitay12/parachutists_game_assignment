import { Boat } from "./Boat";
import { Renderer } from "../view/Renderer";

export class Game {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private boat: Boat;
  private renderer: Renderer;
  private lastTime: number;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.context = context;
    this.boat = new Boat(canvas.width, canvas.height);
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

  public update(deltaTime: number) {}

  public draw() {
    this.renderer.clearCanvas();
    this.renderer.drawBoat(this.boat);
  }

  moveBoatLeft() {
    this.boat.move("left");
  }

  moveBoatRight() {
    this.boat.move("right");
  }
}
