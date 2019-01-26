import {Timer} from '../Timer';
import {Injectable} from '../Annotations/Annotations';
import {Clock} from '../Entities/Clock';
import {appConfig} from '../appConfig';
import {ClockDrawer} from '../Drawers/ClockDrawer';

@Injectable()
export class ClockManager {
    private tileSize: number;
    constructor(private clock: Clock, private clockDrawer: ClockDrawer) {
        this.tileSize = appConfig.tileSize;
    }

    init(seconds: number) {
        this.clock.init(seconds);
    }

    prepare() {

    }
    tick() {
        if (this.clock.seconds === 0) {
            return;
        }
        this.clockDrawer.draw(25, 25, this.clock.getActualSeconds(), this.clock.minutes);
        this.clock.substact(1);
    }

}
