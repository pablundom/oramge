import {Circle} from '../Entities/Circle';
import {CircleDrawer} from '../Drawers/CircleDrawer';
import {Injectable, On} from '../Annotations/Annotations';
import {appConfig} from '../appConfig';
import {Manager} from './Manager';

@Injectable()
export class CircleManager extends Manager {
    private size: number;
    private circlePixelsSize: number;
    private subtraction: number;
    private tileSize: number;
    private seconds: number;
    constructor(private circle: Circle, private circleDrawer: CircleDrawer) {
        super();
        this.tileSize = appConfig.tileSize;
    }

    init(seconds: number, size: number) {
        this.circle.init();
        this.seconds = seconds;
        this.size = size;
    }
    prepare() {
        const circleSize = this.circle.size * this.tileSize;
        this.circlePixelsSize = circleSize;
        const toSize = this.size * this.tileSize;
        const deltaSize = circleSize - toSize;
        this.subtraction = deltaSize / this.seconds;
    }
    tick() {
        if (this.size >= this.circle.size) {
            return;
        }
        this.circlePixelsSize -= this.subtraction;
        this.draw();
    }
    draw() {
        this.circle.size = Math.floor((this.circlePixelsSize) / this.tileSize);
        this.circleDrawer.draw(this.circle.center, this.circlePixelsSize, this.tileSize);
    }

    @On('properties_tilesize_change')
    public setTileSize(tilesize: number) {
        this.tileSize = tilesize;
        this.draw();
    }

}
