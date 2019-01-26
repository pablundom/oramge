import {Events} from '../Events';
import {AbstractHandler} from './AbstractHandler';
import {Handler} from '../Annotations/Annotations';
import {Canvas} from '../Canvas';
@Handler()
export class CanvasClickHandler extends AbstractHandler {
    public handlerName = 'canvas';
    constructor(events: Events, canvas: Canvas) {
        super(events, canvas);
    }

    register() {
       this.handleClick();
    }

    handleClick() {
        const key = this.generateKey('click');
        this.element.addEventListener('click', (event: Event) => {
            if (this.activated === false) {
                return;
            }
            this.events.emit(key, event);
        });
    }
}
@Handler()
export class CanvasKeyDownHandler extends AbstractHandler {
    public handlerName = 'canvas';
    constructor(events: Events, canvas: Canvas) {
        super(events, canvas);
    }

    register() {
        this.handleClick();
    }

    handleClick() {
        const key = this.generateKey('keydown');
        this.element.addEventListener('keydown', (event: KeyboardEvent) => {
            if (this.activated === false) {
                return;
            }
            this.events.emit(key, event);
        }, false);
    }
}
@Handler()
export class CanvasKeyUpHandler extends AbstractHandler {
    public handlerName = 'canvas';
    constructor(events: Events, canvas: Canvas) {
        super(events, canvas);
    }

    register() {
        this.handleClick();
    }

    handleClick() {
        const key = this.generateKey('keyup');
        this.element.addEventListener('keyup', (event: KeyboardEvent) => {
            if (this.activated === false) {
                return;
            }
            this.events.emit(key, event);
        }, false);
    }
}
@Handler()
export class CanvasDoubleClickHandler extends AbstractHandler {
    public handlerName = 'canvas';
    constructor(events: Events, canvas: Canvas) {
        super(events, canvas);
    }

    register() {
        this.handleDoubleClick();
    }

    private handleDoubleClick() {
        const key = this.generateKey('doubleclick');
        const alias = [this.generateKey('dblclick')];
        this.element.addEventListener('dblclick', (event: Event) => {
            if (this.activated === false) {
                return;
            }
            this.events.emit(key, event);
            this.events.addAlias(key, alias);
        });
    }
}
@Handler()
export class CanvasMouseDownHandler extends AbstractHandler {
   public handlerName = 'canvas';

    constructor(events: Events, canvas: Canvas) {
        super(events, canvas);
    }

    register() {
        this.handleClick();
    }

    handleClick() {
        const key = this.generateKey('mousedown');
        const alias = [this.generateKey('select')];
        this.element.addEventListener('mousedown', (event: Event) => {
            if (this.activated === false) {
                return;
            }
            this.events.emit(key, event);
            this.events.addAlias(key, alias);
        });
    }
}
@Handler()
export class CanvasMouseUpHandler extends AbstractHandler {
    public handlerName = 'canvas';
    constructor(events: Events, canvas: Canvas) {
        super(events, canvas);
    }

    register() {
        this.handleClick();
    }

    handleClick() {
        const key = this.generateKey('mouseup');
        this.element.addEventListener('mouseup', (event: Event) => {
            if (this.activated === false) {
                return;
            }
            this.events.emit(key, event);
        });
    }
}
@Handler()
export class CanvasMouseMoveHandler extends AbstractHandler {
    public handlerName = 'canvas';
    constructor(events: Events, canvas: Canvas) {
        super(events, canvas);
    }

    register() {
        this.handleClick();
    }

    handleClick() {
        const key = this.generateKey('mousemove');
        this.element.addEventListener('mousemove', (event: Event) => {
            if (this.activated === false) {
                return;
            }
            this.events.emit(key, event);
        });
    }
}
@Handler()
export class CanvasMouseWheelHandler extends AbstractHandler {
    public handlerName = 'canvas';
    constructor(events: Events, canvas: Canvas) {
        super(events, canvas);
    }

    register() {
        this.handleClick();
    }

    handleClick() {
        const key = this.generateKey('wheel');
        this.element.addEventListener('wheel', (event: Event) => {
            if (this.activated === false) {
                return;
            }
            this.events.emit(key, event);
        });
    }
}
