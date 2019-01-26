import {Circle} from '../Entities/Circle';
import {CanvasDrawer} from './CanvasDrawer';
import {Tile} from '../Entities/Tiles/Tile';
import {Injectable} from '../Annotations/Annotations';

@Injectable()
export class CircleDrawer {
    public scale = 1;
    constructor(private canvasDrawer: CanvasDrawer) {
    }

    public draw(center: Tile, sizeInPixels: number, tileSize: number) {
        this.canvasDrawer.clear();
        const x = center.x * tileSize * this.scale;
        const y = center.y * tileSize * this.scale;
        sizeInPixels = sizeInPixels * this.scale;
        this.canvasDrawer.drawFillSquare(0, 0, this.canvasDrawer.canvas.width, this.canvasDrawer.canvas.height, 'rgba(0, 1, 146, 0.6)');
        this.canvasDrawer.drawCircle(x, y, sizeInPixels, '#FFF', 'transparent', 'destination-out');
    }
}
