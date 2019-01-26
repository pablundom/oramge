import {AbstractHandler} from './AbstractHandler';
import {Map} from '../Entities/Map/Map';
import {Events} from '../Events';
import {filter} from 'rxjs/operators';
import {Canvas} from '../Canvas';
import {Handler} from '../Annotations/Annotations';

@Handler()
export class MapClickHandler extends AbstractHandler {
    public handlerName = 'map';

    constructor(events: Events, canvas: Canvas, private map: Map) {
        super(events, canvas);
    }

    register() {
        this.handleClick();
    }

    handleClick() {
        const key = this.generateKey('click');
        this.events.get('canvas_click').subscribe((event: MouseEvent) => {
            if (this.activated === false) {
                return;
            }
            const tile = this.map.findTileByPixels(event.offsetX, event.offsetY);
            this.events.emit(key, tile);
        });
    }
}
@Handler()
export class MapDoubleClickHandler extends AbstractHandler {
    public handlerName = 'map';
    constructor(events: Events, canvas: Canvas, private mapInstance: Map) {
        super(events, canvas);
    }
    register() {
        this.handleDoubleClick();
    }
    handleDoubleClick() {
        this.events.get('canvas_doubleclick').subscribe((event: Event) => {
        });
    }
}
@Handler()
export class MapMouseSelectHandler extends AbstractHandler {
    public handlerName = 'map';
        private trigger = false;
    constructor(events: Events, canvas: Canvas,  private map: Map) {
        super(events, canvas);
    }
    register() {
        this.handleClick();
    }

    handleClick() {
        const key = this.generateKey('select');
        this.events.get('canvas_mousedown').subscribe((a) => {
            this.trigger = true;
        });
        this.events.get('canvas_mouseup').subscribe((a) => {
            this.trigger = false;
        });
        this.events.get('canvas_mousemove').pipe(filter((a) => {
            return this.activated && this.trigger;
        })).subscribe((event: MouseEvent) => {
            const tile = this.map.findTileByPixels(event.offsetX, event.offsetY);
            this.events.emit(key, tile);
        });
    }
}
@Handler()
export class MapMouseMoveHandler extends AbstractHandler {
    public handlerName = 'map';
    private trigger = false;
    constructor(events: Events, canvas: Canvas, private map: Map) {
        super(events, canvas);
    }
    register() {
        this.handleClick();
    }

    handleClick() {
        const key = this.generateKey('mousemove');
        this.events.get('canvas_mousemove').pipe(filter((a) => {
            return this.activated;
        } )).subscribe((event: MouseEvent) => {
            const tile = this.map.findTileByPixels(event.offsetX, event.offsetY);
            this.events.emit(key, tile);
        });
    }
}
