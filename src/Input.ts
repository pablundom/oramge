import {Injectable} from './Annotations/Annotations';
import {Events} from './Events';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {distinctUntilChanged, filter} from 'rxjs/operators';


@Injectable()
export class Input {
    public lastKeyPressed;
    public keyspressed = [];
    public event;
    public coordinates = [0, 0];
    public mouseMove = false;
    public clicked;
    private input$: ReplaySubject<Input>;
    public constructor(private events: Events) {
        this.input$ = new ReplaySubject<any>();
        this.initListeners();
    }
    public getObserver(): Observable<Input> {
        return this.input$.asObservable().pipe(distinctUntilChanged());
    }
    public whenClicked(click = true): Observable<Input> {
        return this.input$.asObservable().pipe(filter((a) => {
            return a.clicked === click;
        }));
    }
    public whenMouseMove(moved = true): Observable<Input> {
        return this.input$.asObservable().pipe(filter((a) => {
            return a.mouseMove === moved;
        }));
    }
    public whenKeypressed(): Observable<Input> {
        return this.input$.asObservable().pipe(filter((a) => {
            return a.keyspressed.length > 0;
        }));
    }

    private initListeners() {
        this.events.get('canvas_keydown').subscribe((a: KeyboardEvent) => {
            this.lastKeyPressed = a.key;
            this.event = a;
            if (this.keyspressed.indexOf(a.key) === -1) {
                this.keyspressed.push(a.key);
            }
            this.emit();
        });
        this.events.get('canvas_keyup').subscribe((a: KeyboardEvent) => {
            const index = this.keyspressed.indexOf(a.key);
            this.event = a;
            if (index > -1) {
                this.keyspressed.splice(index, 1);
            }
            this.emit();
        });
        this.events.get('canvas_mousemove').subscribe((a: MouseEvent) => {
            this.event = a;
            this.checkMouseMove(a.offsetX, a.offsetY);
            this.emit();
        });
        this.events.get('canvas_mousedown').subscribe((a: MouseEvent) => {
            this.event = a;
            this.checkMouseMove(a.offsetX, a.offsetY);
            this.clicked = true;
            this.emit();
        });
        this.events.get('canvas_mouseup').subscribe((a: MouseEvent) => {
            this.event = a;
            this.checkMouseMove(a.offsetX, a.offsetY);
            this.clicked = false;
            this.emit();
        });
    }
    private checkMouseMove(x: number, y: number) {
        const lastX = this.coordinates[0];
        const lastY = this.coordinates[1];
        if (x !== lastX || y !== lastY) {
            this.coordinates = [x, y];
            this.mouseMove = true;
            return;
        }
        this.mouseMove = false;
    }

    public emit() {
        this.input$.next(this);
    }
}
