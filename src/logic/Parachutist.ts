import {
  PARACHUTIST_HEIGHT,
  PARACHUTIST_WIDTH,
  PARACHUTIST_SPEED,
} from "../config/constants";
import { PARACHUTIST_IMAGE } from "../config/config";
export class Parachutist {
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private speed: number;
  private caught: boolean;
  private parachutistImage: HTMLImageElement;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.width = PARACHUTIST_WIDTH;
    this.height = PARACHUTIST_HEIGHT;
    this.speed = PARACHUTIST_SPEED;
    this.caught = false;
    this.parachutistImage = new Image();
    this.parachutistImage.src = PARACHUTIST_IMAGE;
  }

  update(deltaTime: number) {
    if (!this.isCaught()) {

      this.y += (this.speed * deltaTime) / 1000;
    }
  }

  draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.parachutistImage, this.x, this.y, this.width, this.height);
  }

  getBounds() {
    return { x: this.x, y: this.y, width: this.width, height: this.height };
  }
  

  catch() {
    this.caught = true;
  }

  isOutOfBounds(canvasHeight: number) {
    return this.y > canvasHeight;
  }
  isCaught(): boolean {
    return this.caught;
}
  isCaughtByBoat(
    boatX: number,
    boatY: number,
    boatWidth: number,
    boatHeight: number
  ) {
    return (
      this.x < boatX + boatWidth &&
      this.x + this.width > boatX &&
      this.y < boatY + boatHeight &&
      this.y + this.height > boatY
    );
  }
}
