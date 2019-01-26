import {Circle} from '../Entities/Circle';
import {CanvasDrawer} from './CanvasDrawer';
import {Tile} from '../Entities/Tiles/Tile';
import {Injectable} from '../Annotations/Annotations';

@Injectable()
export class ClockDrawer {
    constructor(private canvasDrawer: CanvasDrawer) {}

    public draw(x: number, y: number, seconds: number, minutes: number) {
        this.canvasDrawer.clear();
        const minutesDisplay = minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
        const secondsDisplay = seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
        const text = `${minutesDisplay}:${secondsDisplay}`;
        this.canvasDrawer.drawText(x, y, text);
    }
}
