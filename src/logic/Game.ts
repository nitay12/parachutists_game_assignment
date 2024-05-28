import { Boat } from "./Boat";
import { Plane } from "./Plane";
import { SingleDropPlane } from "./SingleDropPlane";
import { Renderer } from "../view/Renderer";
import { NUM_OF_LIVES, PLANE_HEIGHT, PLANE_WIDTH, PLANE_INIT_Y, PLANE_INIT_X } from "../config/constants";

export class Game {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private boat: Boat;
  private plane: Plane;
  private renderer: Renderer;
  private lastTime: number;
  private score: number;
  private lives: number;
  private isGameOver: boolean;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.context = context;
    this.boat = new Boat(canvas.width, canvas.height);
    this.plane = new SingleDropPlane(PLANE_INIT_X, PLANE_INIT_Y, PLANE_WIDTH, PLANE_HEIGHT);
    this.renderer = new Renderer(this.context);
    this.lastTime = 0;
    this.score = 0;
    this.lives = NUM_OF_LIVES;
    this.isGameOver = false;
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
    if (this.isGameOver) {
      this.renderer.clearCanvas();
      this.renderer.drawGameOver();
      return;
    }
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
        this.score += 10;
      } else if (
        parachutist.isOutOfBounds(
          this.canvas.height - parachutist.getBounds().height
        )
      ) {
        this.lives -= 1;
        if (this.lives <= 0) {
          this.isGameOver = true;
        }
      }
    });
  }

  public draw() {
    this.renderer.clearCanvas();
    this.renderer.drawPlane(this.plane);
    this.renderer.drawBoat(this.boat);
    this.renderer.drawScore(this.score, this.lives);
    if (this.isGameOver) {
      this.renderer.clearCanvas();
      this.renderer.drawGameOver();
    }
  }

  

  moveBoatLeft() {
    this.boat.move("left");
  }

  moveBoatRight() {
    this.boat.move("right");
  }
}
