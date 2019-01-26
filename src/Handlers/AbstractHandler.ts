import {Events} from '../Events';
import {Canvas} from '../Canvas';
import {Handler} from './Handler';


export abstract class AbstractHandler implements Handler {
    public handlerName = '';
    public activated = true;
    protected element: HTMLElement;
    constructor(protected events: Events, protected canvas: Canvas) {
        this.element = document.getElementById('viewport');
    }

    public activate() {
        this.activated = true;
    }

    public deactivate() {
        this.activated = false;
    }
    public generateKey(key: string): string {
        return `${this.handlerName}_${key}`;
    }

    abstract register();
}
