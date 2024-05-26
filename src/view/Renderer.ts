import { Boat } from '../logic/Boat';

export class Renderer {
    private context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    }

    drawBoat(boat: Boat) {
        boat.draw(this.context);
    }
}
