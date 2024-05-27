import { Boat } from '../logic/Boat';
import { Plane } from '../logic/Plane';
import { Parachutist } from '../logic/Parachutist';

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
    drawPlane(plane: Plane) {
        plane.draw(this.context)
    }
    drawParachutists(parachutists: Parachutist[]) {
        parachutists.forEach(parachutist => parachutist.draw(this.context));
    }
}
