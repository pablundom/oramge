import {Events} from '../Events';
import {AbstractHandler} from './AbstractHandler';
import {Handler} from '../Annotations/Annotations';
import {Canvas} from '../Canvas';
@Handler()
export class WindowsOnBlurHandler extends AbstractHandler {
    public handlerName = 'windows';
    constructor(events: Events, canvas: Canvas) {
        super(events, canvas);
    }

    register() {
       this.handleClick();
    }

    handleClick() {
        const key = this.generateKey('blur');
        window.onblur = () => {
            if (this.activated === false) {
                return;
            }
            this.events.emit(key, true);
        };
    }
}
@Handler()
export class WindowsOnFocusHandler extends AbstractHandler {
    public handlerName = 'windows';
    constructor(events: Events, canvas: Canvas) {
        super(events, canvas);
    }

    register() {
        this.handleClick();
    }

    handleClick() {
        window.focus();
        const key = this.generateKey('focus');
        window.addEventListener('focus', (event: Event) => {
            if (this.activated === false) {
                return;
            }
            this.events.emit(key, event);
        });
    }
}
