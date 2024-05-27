import { Parachutist } from './Parachutist';
import { DROP_INTERVAL } from '../config/constants';
import { CANVAS_HEIGHT, CANVAS_WIDTH, PLANE_IMAGE } from '../config/config';

export abstract class Plane {
    protected x: number;
    protected y: number;
    protected width: number;
    protected height: number;
    protected dropInterval: number;
    protected dropTimer: number;
    protected parachutists: Parachutist[];
    protected planeImage: HTMLImageElement;


    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dropInterval = DROP_INTERVAL;
        this.dropTimer = 0;
        this.parachutists = [];
        this.planeImage = new Image();
        this.planeImage.src = PLANE_IMAGE;

    }

    abstract dropParachutist(): void;

   update(deltaTime: number) {
          this.dropTimer += 10;

        while (this.dropTimer >= this.dropInterval) {
            this.dropParachutist();
            this.dropTimer -= this.dropInterval; // Correctly reduce by dropInterval
        }
        this.x -= 1;
        if (this.x < -this.width) {
            this.x = CANVAS_WIDTH;
        }
        this.parachutists.forEach(parachutist => parachutist.update(deltaTime));
    }

    draw(context: CanvasRenderingContext2D) {
        context.drawImage(this.planeImage, this.x, this.y, this.width, this.height);
        this.parachutists.forEach(parachutist => parachutist.draw(context));
        this.parachutists = this.parachutists.filter(parachutist => !parachutist.isOutOfBounds(CANVAS_HEIGHT-parachutist.getBounds().height) && !parachutist.isCaught());
    }

    getParachutists() {
        return this.parachutists;
    }
}
