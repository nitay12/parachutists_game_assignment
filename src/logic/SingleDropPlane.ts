import { Plane } from './Plane';
import { Parachutist } from './Parachutist';

export class SingleDropPlane extends Plane {
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
    }

    dropParachutist() {
        const parachutist = new Parachutist(this.x + this.width / 2, this.y + this.height);
        this.parachutists.push(parachutist);
    }
}
