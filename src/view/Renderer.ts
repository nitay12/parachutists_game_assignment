import { Boat } from "../logic/Boat";
import { Plane } from "../logic/Plane";
import { Parachutist } from "../logic/Parachutist";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../config/config";

export class Renderer {
  private context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  clearCanvas() {
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    );
  }

  drawBoat(boat: Boat) {
    boat.draw(this.context);
  }
  drawPlane(plane: Plane) {
    plane.draw(this.context);
  }
  drawParachutists(parachutists: Parachutist[]) {
    parachutists.forEach((parachutist) => parachutist.draw(this.context));
  }
  drawGameOver() {
    this.context.fillStyle = "red";
    this.context.font = "48px serif";
    this.context.fillText(
      "Game Over",
      CANVAS_WIDTH / 2 - 100,
      CANVAS_HEIGHT / 2
    );
  }
  drawScore(score: number, lives: number) {
    this.context.fillStyle = "black";
    this.context.font = "20px Arial";
    this.context.fillText(`Score: ${score}`, 10, 20);
    this.context.fillText(`Lives: ${lives}`, 10, 40);
  }
}
