import { BOAT_SPEED, BOAT_WIDTH, BOAT_HEIGHT } from "../config/constants";
import { BOAT_IMAGE } from "../config/config";
export class Boat {
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private speed: number;
  private boatImage: HTMLImageElement;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.width = BOAT_WIDTH;
    this.height = BOAT_HEIGHT;
    this.x = canvasWidth / 2 - this.width / 2;
    this.y = canvasHeight - this.height - 10;
    this.speed = BOAT_SPEED;
    this.boatImage = new Image();
    this.boatImage.src = BOAT_IMAGE;
  }

  move(direction: "left" | "right") {
    if (direction === "left") {
      this.x -= this.speed;
    } else if (direction === "right") {
      this.x += this.speed;
    }
  }

  draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.boatImage, this.x, this.y, this.width, this.height);
  }

  getBounds() {
    return { x: this.x, y: this.y, width: this.width, height: this.height };
  }
}
